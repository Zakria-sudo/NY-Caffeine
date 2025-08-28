"use client";
import { useState } from "react";
import { eyeIcon, eyeOffIcon } from "@/lib/links/linkicons";

function PasswordInput({ label, name }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <label className="block mt-10 text-[14px] font-medium text-[#111827]">
        {label}
      </label>
      <div className="mt-2 relative">
        <input
          name={name}
          type={show ? "text" : "password"}
          className="w-full h-[44px] rounded-lg border border-[#e5e7eb] pl-4 pr-12 text-[15px] outline-none focus:border-[#b77a2b] transition"
        />
        <button
          type="button"
          aria-label={show ? "Hide password" : "Show password"}
          aria-pressed={show}
          onClick={() => setShow(v => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 grid place-items-center text-[#9ca3af] hover:text-[#6b7280]"
        >
          {show ? eyeOffIcon : eyeIcon}
        </button>
      </div>
    </>
  );
}

export default function NewPass() {
  return (
    <form className="w-full max-w-[420px]">
      <div className="text-center">
        <h2 className="text-[24px] md:text-[26px] font-semibold text-[#111827]">
          Reset Password
        </h2>
        <p className="mt-2 text-[15px] text-[#6b7280]">Create a new password</p>
      </div>

      {/* Use the reusable component */}
      <PasswordInput label="New Password" name="newPassword" />
      <PasswordInput label="Confirm Password" name="confirmPassword" />

      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="mt-10 w-sm h-[48px] rounded-lg bg-[#7a4500] text-white text-[16px] font-medium tracking-wide shadow-md hover:opacity-95 active:translate-y-[1px] transition"
        >
          Reset Password
        </button>
      </div>
    </form>
  );
}
