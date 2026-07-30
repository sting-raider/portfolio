import { Dashboard } from "@/components/dashboard";
import { getSessionUser, requestIsAllowed } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const defaultShareUrl = "https://cloud.umami.is/share/zLSiKOzucLSGnNZz";

function getShareUrl() {
  const configured = process.env.UMAMI_SHARE_URL?.trim() || defaultShareUrl;

  try {
    const url = new URL(configured);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return defaultShareUrl;
    }
    return url.toString();
  } catch {
    return defaultShareUrl;
  }
}

export default async function Home() {
  if (!(await requestIsAllowed())) redirect("/login?error=access");
  if (!(await getSessionUser())) redirect("/login");

  return <Dashboard shareUrl={getShareUrl()} />;
}
