// /middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("auth")?.value; // read the cookie
  const { pathname } = req.nextUrl;

  const protectedRoutes = [
    "/",
    "/orders",
    "/menu/items",
    "/menu/categories",
    "/menu/modifiers",
    "/rewards",
  ];

  // 1) If not signed in and trying to access "/" → redirect to /signin
  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // 2) If signed in and trying to access "/signin" → redirect to /
  if (token && pathname === "/signin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 3) Allow all other requests
  return NextResponse.next();
}

// Run middleware only on these paths
export const config = {
  matcher: [
    "/",
    "/signin",
    "/orders",
    "/menu/items",
    "/menu/categories",
    "/menu/modifiers",
    "/rewards",
  ], // you can add "/dashboard/:path*" etc if needed
};
