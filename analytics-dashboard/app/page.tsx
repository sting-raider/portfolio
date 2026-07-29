import { Dashboard } from "@/components/dashboard";
import { getSessionUser, requestIsAllowed } from "@/lib/auth";
import { getDashboardData } from "@/lib/umami";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const day = 24 * 60 * 60 * 1000;
const rangeDays: Record<string, number> = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
  "365d": 365,
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  if (!(await requestIsAllowed())) redirect("/login?error=access");
  if (!(await getSessionUser())) redirect("/login");

  const query = await searchParams;
  const selectedRange = query.range && rangeDays[query.range] ? query.range : "30d";
  const endAt = Date.now();
  const startAt = endAt - rangeDays[selectedRange] * day;
  const data = await getDashboardData(startAt, endAt);

  return <Dashboard data={data} selectedRange={selectedRange} />;
}
