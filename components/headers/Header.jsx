"use client";

import { settingsIcon } from "@/lib/links/linkicons";
import { sidebarLinks } from "@/lib/links/links";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname() || "/";

  // match item if pathname starts with link, but treat "/" as exact
  const matched =
    sidebarLinks.find((l) =>
      l.href === "/" ? pathname === "/" : pathname.startsWith(l.href)
    ) ?? { label: "Settings", desc: "Manage your profile here", icon: null, href: "/" };

  return (
    <div className="bg-[#F5F6F8] p-4 sm:p-6">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-[22px] sm:text-[26px] font-semibold text-gray-900">
            {matched.label}
          </h1>
          <p className="text-gray-500 text-[13px] sm:text-[14px]">
            {matched.desc}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/settings")}
            aria-label="Settings"
            className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 active:scale-95"
          >
            <Image src="/settings.png" alt="Settings" width={18} height={18} />
          </button>

          <Image
            src="/avatar.png"
            alt="Profile"
            width={36}
            height={36}
            className="rounded-full ring-1 ring-black/5"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
