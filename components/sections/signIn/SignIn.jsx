"use client";
import api from "@/utils/axios";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { eyeOffIcon, eyeIcon, loader } from "@/lib/links/linkicons";

export default function SignIn() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();


const handleSignIn = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    // ⬇️ Call Next.js proxy, NOT backend
    const res = await axios.post("/api/auth/login", { email, password, fcmToken: "fcmToken" });

    if (!res.data.success) {
      toast.error(res.data.message || "Sign in failed");
      return;
    }

    toast.success("Signed in successfully!");
    router.push("/");
  } catch (err) {
    toast.error(err.response?.data?.message || "Error signing in");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="w-full">
      <div className="text-center">
        <h2 className="text-[24px] md:text-[26px] font-semibold text-[#111827]">
          Welcome Back!
        </h2>
        <p className="mt-2 text-[15px] text-[#6b7280]">Let’s Sign You In</p>
      </div>

      {/* Email */}
      <label className="block mt-10 text-[14px] font-medium text-[#111827]">
        Branch Email
      </label>
      <input
        type="email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
        disabled={loading}
        className={`mt-2 w-full h-[44px] rounded-lg border px-4 text-[15px] outline-none transition ${
          errors.email
            ? "border-red-500"
            : "border-[#e5e7eb] focus:border-[#b77a2b]"
        } ${loading ? "opacity-80 cursor-not-allowed" : ""}`}
        placeholder="Enter your email"
      />
      {errors.email && (
        <p className="mt-1 text-[13px] text-red-500">{errors.email}</p>
      )}

      {/* Password */}
      <label className="block mt-6 text-[14px] font-medium text-[#111827]">
        Password
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          disabled={loading}
          className={`mt-2 w-full h-[44px] rounded-lg border px-4 pr-10 text-[15px] outline-none transition ${
            errors.password
              ? "border-red-500"
              : "border-[#e5e7eb] focus:border-[#b77a2b]"
          } ${loading ? "opacity-80 cursor-not-allowed" : ""}`}
          placeholder="Enter your password"
        />

        <button
          type="button"
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-3 top-5.5 text-gray-500 hover:text-[#b77a2b] focus:outline-none cursor-pointer"
          onClick={() => setShowPassword((v) => !v)}
          disabled={loading}
        >
          {showPassword ? eyeOffIcon : eyeIcon}
        </button>
      </div>
      {errors.password && (
        <p className="mt-1 text-[13px] text-red-500">{errors.password}</p>
      )}

      {/* Forgot password */}
      <div className="mt-2 text-right">
        <Link
          href="/passwordreset"
          className="text-[13.5px] text-[#b77a2b] hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      {/* Button with loader */}
      <button
        type="submit"
        onClick={handleSignIn}
        disabled={loading}
        aria-busy={loading}
        className={`mt-10 w-full h-[48px] rounded-lg bg-[#7a4500] text-white text-[16px] font-medium tracking-wide shadow-md hover:opacity-95 active:translate-y-[1px] transition cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            {/* Tailwind spinner */}
            {loader}
            Signing in...
          </span>
        ) : (
          "Sign In"
        )}
      </button>
    </div>
  );
}
