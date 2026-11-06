import { cookies } from "next/headers";
import { createHash, timingSafeEqual } from "crypto";

export const STAFF_COOKIE = "auteuil_staff";

function sessionToken(password: string) {
  const secret = process.env.STAFF_SESSION_SECRET || password;
  return createHash("sha256")
    .update(`auteuil-staff:${password}:${secret}`)
    .digest("hex");
}

export function verifyStaffPassword(input: string) {
  const expected = process.env.STAFF_PASSWORD;
  if (!expected) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function staffCookieValue() {
  const password = process.env.STAFF_PASSWORD;
  if (!password) return null;
  return sessionToken(password);
}

export async function isStaffAuthenticated() {
  const expected = staffCookieValue();
  if (!expected) return false;
  const jar = await cookies();
  const value = jar.get(STAFF_COOKIE)?.value;
  if (!value || value.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(value), Buffer.from(expected));
  } catch {
    return false;
  }
}
