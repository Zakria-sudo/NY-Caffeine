"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProfileSettings() {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <main className="bg-[#F5F6F8] p-4 sm:p-6">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-5">
        {/* Left column: profile card */}
        <aside className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5">
          <div className="text-center">
            <div className="text-[18px] font-semibold text-[#1A1A1F]">Amna Emad</div>
            <div className="mt-1 text-[14px] text-[#8F8F94]">amnaemad@gmail.com</div>

            <div className="mt-4 mx-auto h-24 w-24 overflow-hidden rounded-full ring-1 ring-black/5">
              <Image src="/settingspfp.png" alt="Profile" width={96} height={96} className="h-full w-full object-cover" />
            </div>

            <label
              htmlFor="upload"
              className="mt-4 inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-4 font-medium py-2 text-[11px] text-[#545454] hover:bg-gray-50 cursor-pointer"
            >
              Upload New Photo
            </label>
            <input id="upload" type="file" className="sr-only" />

            <div className="mt-4 rounded-lg border border-gray-200 bg-[#AEC4E438] px-4 py-3 text-left">
              <div className="text-[12px] text-[#6B7280]">Upload avatar: Larger image will be resized automatically</div>
              <div className="mt-2 text-[12px] text-[#A0A0A5]">Maximum size is 1MB</div>
            </div>

            <div className="mt-6 text-[12px] text-[#8F8F94]">
              Joined on <span className="font-medium text-[#6B6B73]">29 September, 2025</span>
            </div>
          </div>
        </aside>

        {/* Right column: form */}
        <section className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[20px] font-semibold text-[#1A1A1F]">Profile Information</h2>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-[14px] text-[#6B6B73] hover:bg-gray-50"
            >
              <Image src="/edit.png" alt="" width={16} height={16} />
              Edit Profile
            </button>
          </div>

          {/* Two-column form row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="mb-1 block text-[14px] text-[#6B6B73]">First Name</label>
              <input
                placeholder="Amna"
                autoComplete="given-name"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-[14px] text-gray-800 outline-none focus:ring-2 focus:ring-gray-200 placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="mb-1 block text-[14px] text-[#6B6B73]">Email</label>
              <input
                type="email"
                placeholder="amnaemad@gmail.com"
                autoComplete="email"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-[14px] text-gray-800 outline-none focus:ring-2 focus:ring-gray-200 placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="mb-1 block text-[14px] text-[#6B6B73]">Phone Number</label>
              <input
                type="tel"
                placeholder="+44 768 8876220"
                autoComplete="tel"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-[14px] text-gray-800 outline-none focus:ring-2 focus:ring-gray-200 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Account Settings */}
          <div className="mt-8">
            <h3 className="text-[16px] font-semibold text-[#1A1A1F]">Account Settings</h3>

            <div className="mt-4">
              <div className="text-[14px] font-medium text-[#1A1A1F]">Change Password</div>
              <p className="mt-1 text-[14px] text-[#8F8F94]">
                You will be logged out of all active sessions. Re-login required.
              </p>

              <div className="mt-4 space-y-4">
                {/* Old password */}
               {/* Password fields block */}
<div className="space-y-4 w-full sm:max-w-[380px]">  {/* ← controls the width */}
  {/* Old Password */}
  <div className="relative">
    <input
      type={showOld ? "text" : "password"}
      placeholder="Old Password"
      autoComplete="current-password"
      className="block w-full h-12 rounded-[10px] border border-[#E6E6EB] bg-white
                 px-4 pr-10 text-[14px] text-[#1A1A1F] placeholder:text-[#9AA0A6]
                 outline-none focus:ring-0 focus:border-[#D9D9E3]"
    />
    <button
      type="button"
      onClick={() => setShowOld(v => !v)}
      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:text-gray-700"
      aria-label="Toggle old password visibility"
    >
      <Image src="/eye.png" alt="" width={18} height={18} />
    </button>
  </div>

  {/* New Password */}
  <div className="relative">
    <input
      type={showNew ? "text" : "password"}
      placeholder="New Password"
      autoComplete="new-password"
      className="block w-full h-12 rounded-[10px] border border-[#E6E6EB] bg-white
                 px-4 pr-10 text-[14px] text-[#1A1A1F] placeholder:text-[#9AA0A6]
                 outline-none focus:ring-0 focus:border-[#D9D9E3]"
    />
    <button
      type="button"
      onClick={() => setShowNew(v => !v)}
      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:text-gray-700"
      aria-label="Toggle new password visibility"
    >
      <Image src="/eye.png" alt="" width={18} height={18} />
    </button>
  </div>

  {/* Confirm Password */}
  <div className="relative">
    <input
      type={showConfirm ? "text" : "password"}
      placeholder="Confirm Password"
      autoComplete="new-password"
      className="block w-full h-12 rounded-[10px] border border-[#E6E6EB] bg-white
                 px-4 pr-10 text-[14px] text-[#1A1A1F] placeholder:text-[#9AA0A6]
                 outline-none focus:ring-0 focus:border-[#D9D9E3]"
    />
    <button
      type="button"
      onClick={() => setShowConfirm(v => !v)}
      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:text-gray-700"
      aria-label="Toggle confirm password visibility"
    >
      <Image src="/eye.png" alt="" width={18} height={18} />
    </button>
  </div>
</div>

              </div>

              {/* Actions */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-[14px] text-[#6B6B73] hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="rounded-xl bg-[#4C8DF6] px-4 py-2 text-[14px] font-medium text-white hover:bg-[#3B7CEB]"
                >
                  Save Changes
                </button>
              </div>
            </div>

            {/* Disable account */}
            <div className="mt-10 flex justify-between">
              <div className="text-[16px] font-semibold text-[#1A1A1F]">
                <h1>Disable Account</h1>
              <p className="mt-1 text-[13px] text-[#8F8F94]">
                All the data will be lost. Non revertible action
              </p>
            </div>
              <div className="">
                <button
                  type="button"
                  className="rounded-xl border border-rose-200 bg-white px-4 py-2 text-[14px] font-medium text-rose-600 hover:bg-rose-50"
                >
                  Disable Account
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
