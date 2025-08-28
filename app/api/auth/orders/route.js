// app/api/auth/orders/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic"; // ← important

export async function GET() {
  const auth = cookies().get("auth")?.value;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/orders`;

  const r = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(auth ? { Authorization: `Bearer ${auth}` } : {}),
    },
    cache: "no-store", // ← avoid 304 from upstream
  });

  const data = await r.json().catch(() => ({}));
  return NextResponse.json(data, { status: r.status });
}
