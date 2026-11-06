import type { Metadata } from "next";
import { StaffGate } from "@/components/staff/StaffGate";
import { RncpBlocks } from "@/components/staff/RncpBlocks";
import { isStaffAuthenticated } from "@/lib/staff-auth";

export const metadata: Metadata = {
  title: "Staff RNCP | Loucman Machababy",
  robots: { index: false, follow: false },
};

export default async function StaffPage() {
  const ok = await isStaffAuthenticated();
  return (
    <main className="page page--staff">
      {ok ? <RncpBlocks /> : <StaffGate />}
    </main>
  );
}
