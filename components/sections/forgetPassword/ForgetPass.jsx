"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { eyeOffIcon, eyeIcon } from "@/lib/links/linkicons";
import {toast } from "react-hot-toast";           // or your toast lib
import api from "@/utils/axios";  

const ForgetPass = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  // track errors for each field
  const [errors, setErrors] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const handleReset = async(e) => {
    e.preventDefault();
    const newErrors = { email: "", oldPassword: "", newPassword: "" };

    if (!email.trim()) newErrors.email = "Email is required";
    if (!oldPassword.trim()) newErrors.oldPassword = "Old password is required";
    if (!newPassword.trim()) newErrors.newPassword = "New password is required";

    setErrors(newErrors);


    if (newErrors.email || newErrors.oldPassword || newErrors.newPassword) {
      return;
    }

    // router.push("/otp");
    try{
       const response = await api.post("/users/resetPassword/admin", {
        email,
        oldPassword,
        newPassword,
        fcmToken: "fcmToken",
      });
      if(response.status === 201) {
        toast.success("Password reset successfull");
      }
    }
    catch(err){
      toast.error(err.response?.data?.message || "Error signing in");
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-[24px] md:text-[26px] font-semibold text-[#111827]">
          Reset Your Password
        </h2>
        <p className="mt-2 text-[15px] text-[#6b7280]">
          An email will be sent to the email you provide
        </p>
      </div>

      {/* Email */}
      <label className="block mt-10 text-[14px] font-medium text-[#111827]">
        Enter Email
      </label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`mt-2 w-full h-[44px] rounded-lg border px-4 text-[15px] outline-none transition ${
          errors.email ? "border-red-500 focus:border-red-500" : "border-[#e5e7eb] focus:border-[#b77a2b]"
        }`}
        placeholder="name@company.com"
      />
      {errors.email && (
        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
      )}

      {/* Old Password */}
      <label className="block mt-6 text-[14px] font-medium text-[#111827]">
        Old Password
      </label>
      <div className="relative">
        <input
          type={showOld ? "text" : "password"}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className={`mt-2 w-full h-[44px] rounded-lg border pr-10 px-4 text-[15px] outline-none transition ${
            errors.oldPassword ? "border-red-500 focus:border-red-500" : "border-[#e5e7eb] focus:border-[#b77a2b]"
          }`}
          placeholder="Enter old password"
        />
        <button
          type="button"
          aria-label={showOld ? "Hide password" : "Show password"}
          className="absolute right-3 top-5.5 text-gray-500 hover:text-[#b77a2b] focus:outline-none cursor-pointer"
          onClick={() => setShowOld((v) => !v)}
        >
          {showOld ? eyeOffIcon : eyeIcon}
        </button>
      </div>
      {errors.oldPassword && (
        <p className="mt-1 text-sm text-red-500">{errors.oldPassword}</p>
      )}

      {/* New Password */}
      <label className="block mt-6 text-[14px] font-medium text-[#111827]">
        New Password
      </label>
      <div className="relative">
        <input
          type={showNew ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className={`mt-2 w-full h-[44px] rounded-lg border pr-10 px-4 text-[15px] outline-none transition ${
            errors.newPassword ? "border-red-500 focus:border-red-500" : "border-[#e5e7eb] focus:border-[#b77a2b]"
          }`}
          placeholder="Enter new password"
        />
        <button
          type="button"
          aria-label={showNew ? "Hide password" : "Show password"}
          className="absolute right-3 top-5.5 text-gray-500 hover:text-[#b77a2b] focus:outline-none cursor-pointer"
          onClick={() => setShowNew((v) => !v)}
        >
          {showNew ? eyeOffIcon : eyeIcon}
        </button>
      </div>
      {errors.newPassword && (
        <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>
      )}

      {/* Submit */}
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={handleReset}
          className="mt-10 w-full h-[48px] rounded-lg bg-[#7a4500] text-white text-[16px] font-medium tracking-wide shadow-md hover:opacity-95 active:translate-y-[1px] transition"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ForgetPass;
