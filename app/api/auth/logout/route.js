// /app/api/auth/logout/route.js
import { NextResponse } from "next/server";


export async function POST() {
  const res = NextResponse.json({ success: true });
  

  // clear the auth cookie
  res.cookies.set("auth", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return res;
}
