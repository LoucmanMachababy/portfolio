import { NextResponse } from "next/server";
import {
  STAFF_COOKIE,
  staffCookieValue,
  verifyStaffPassword,
} from "@/lib/staff-auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { password?: string } | null;
  const password = body?.password ?? "";

  if (!process.env.STAFF_PASSWORD) {
    return NextResponse.json(
      { ok: false, error: "STAFF_PASSWORD non configuré sur le serveur." },
      { status: 503 },
    );
  }

  if (!verifyStaffPassword(password)) {
    return NextResponse.json({ ok: false, error: "Mot de passe incorrect." }, { status: 401 });
  }

  const token = staffCookieValue();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(STAFF_COOKIE, token!, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return res;
}
