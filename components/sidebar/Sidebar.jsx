"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/lib/links/links";
import toast from "react-hot-toast";
import axios from "axios"

const Chevron = ({ open }) => (
  <svg
    viewBox="0 0 24 24"
    className={`ml-auto h-4 w-4 transition-transform ${
      open ? "rotate-90" : ""
    }`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M9 6l6 6-6 6" />
  </svg>
);

const Sidebar = () => {
  const pathname = usePathname();

 const SignOut = async () => {
  try {
    await axios.post("/api/auth/logout");
    toast.success("Signed out successfully!");
    window.location.href = "signin";
  } catch (err) {
    toast.error("Error signing out");
  }
};

  // Drawer (mobile)
  const [drawerOpen, setDrawerOpen] = useState(false);
  useEffect(() => setDrawerOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href) =>
    pathname === href || pathname.startsWith(`${href}/`);

  // Track expanded groups (by parent href)
  const [expanded, setExpanded] = useState({});
  // Auto-open any group whose route is active
  useEffect(() => {
    const next = {};
    for (const item of sidebarLinks) {
      if (item.children?.length) {
        next[item.href] =
          isActive(item.href) ||
          item.children.some((c) => isActive(c.href)) ||
          expanded[item.href];
      }
    }
    setExpanded((prev) => ({ ...prev, ...next }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const containerCls = useMemo(
    () =>
      [
        "fixed left-0 top-0 z-50 h-full w-72 transform bg-white",
        "border-r border-gray-100 shadow-lg transition-transform duration-300",
        drawerOpen ? "translate-x-0" : "-translate-x-full",
        "md:w-60 md:translate-x-0",
      ].join(" "),
    [drawerOpen]
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={() => setDrawerOpen(true)}
        aria-label="Open menu"
        aria-expanded={drawerOpen}
        className="md:hidden fixed top-3 left-3 z-50 inline-flex items-center justify-center rounded-xl p-2 border border-gray-200 bg-white text-gray-700 shadow"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M4 7h16v2H4zm0 4h16v2H4zm0 4h16v2H4z" />
        </svg>
      </button>

      {/* Mobile overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[1px] md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        aria-label="Sidebar"
        className={containerCls}
        role={drawerOpen ? "dialog" : undefined}
        aria-modal={drawerOpen ? "true" : undefined}
      >
        {/* Close (mobile) */}
        <button
          type="button"
          onClick={() => setDrawerOpen(false)}
          aria-label="Close menu"
          className="md:hidden absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M6.4 5l12.6 12.6-1.4 1.4L5 6.4z" />
            <path d="M18 6.4L5.4 19 4 17.6 16.6 5z" />
          </svg>
        </button>

        {/* Logo */}
        <div className="px-4 pt-6 pb-4 flex items-center justify-center">
          <div className="h-16 w-16 rounded-full grid place-items-center bg-[#7B4606] border-gray-200 shadow-sm">
            <Image
              src="/coffeecup.png"
              alt="Logo"
              width={48}
              height={48}
              priority
            />
          </div>
        </div>

        {/* Nav */}
        <nav className="px-3 mt-2">
          <ul className="flex flex-col gap-2">
            {sidebarLinks.map((item) => {
              const parentActive =
                isActive(item.href) ||
                (item.children?.length &&
                  item.children.some((c) => isActive(c.href)));
              const hasChildren = !!item.children?.length;
              const isOpen = hasChildren ? !!expanded[item.href] : false;

              return (
                <li key={item.href}>
                  {hasChildren ? (
                    <>
                      {/* Parent as a toggle button */}
                      <button
                        type="button"
                        onClick={() =>
                          setExpanded((s) => ({
                            ...s,
                            [item.href]: !isOpen,
                          }))
                        }
                        aria-expanded={isOpen}
                        aria-controls={`sect-${item.href}`}
                        className={`group w-full flex items-center gap-3 rounded-xl px-3 py-2 transition ${
                          parentActive || isOpen
                            ? "bg-[#7B4606] text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {item.icon}
                        <span className="leading-none">{item.label}</span>
                        <Chevron open={isOpen} />
                      </button>

                      {/* Children list (animated) */}
                      <div
                        id={`sect-${item.href}`}
                        className={`overflow-hidden transition-all ${
                          isOpen ? "max-h-48" : "max-h-0"
                        }`}
                      >
                        <ul className="mt-1 pl-10 pr-2 py-2 space-y-1 text-decoration-none">
                          {item.children.map((child) => {
                            const active = isActive(child.href);
                            return (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className={`flex items-center gap-2 text-sm rounded-md px-2 py-1.5 transition ${
                                    active
                                      ? "text-[#7B4606] font-medium bg-[#7B4606]/10"
                                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                                  }`}
                                >
                                  <span>{child.label}</span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      aria-current={parentActive ? "page" : undefined}
                      className={`group flex items-center gap-3 rounded-xl px-3 py-2 transition ${
                        parentActive
                          ? "bg-[#7B4606] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {item.icon}
                      <span className="leading-none">{item.label}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer action */}
        <div className="mt-auto px-3 pb-6 pt-4">
          <button
            type="button"
            className="w-full flex items-center gap-3 rounded-xl px-3 py-2 text-gray-700 hover:bg-gray-100 transition"
            onClick={() => {
              SignOut();
            }}
          >
            <Image
              src="/signout.png"
              alt=""
              width={18}
              height={18}
              className="opacity-70"
            />
            <span className="text-[15px] leading-none">Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
