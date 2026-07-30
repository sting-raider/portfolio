import { Dashboard } from "@/components/dashboard";
import { getSessionUser, requestIsAllowed } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

function getShareUrl() {
  const configured = process.env.UMAMI_SHARE_URL?.trim();

  if (!configured) {
    return null;
  }

  try {
    const url = new URL(configured);

    const isValidUmamiShareUrl =
      url.protocol === "https:" &&
      url.hostname === "cloud.umami.is" &&
      url.pathname.startsWith("/share/");

    return isValidUmamiShareUrl ? url.toString() : null;
  } catch {
    return null;
  }
}

export default async function Home() {
  if (!(await requestIsAllowed())) {
    redirect("/login?error=access");
  }

  if (!(await getSessionUser())) {
    redirect("/login");
  }

  const shareUrl = getShareUrl();

  if (!shareUrl) {
    return (
      <main className="dashboard-shell">
        <div className="scanlines" aria-hidden="true" />

        <header className="dashboard-header">
          <div>
            <p className="eyebrow">TRUE LAB // CONFIGURATION</p>
            <h1>PORTFOLIO SIGNAL MONITOR</h1>
          </div>

          <div className="header-actions">
            <form action="/api/logout" method="post">
              <button className="logout-button" type="submit">
                LOG OUT
              </button>
            </form>
          </div>
        </header>

        <section className="lab-dialogue">
          <div className="dialogue">
            <span className="speaker">ALPHYS</span>
            <p>
              * T-the Umami tunnel is missing! Set UMAMI_SHARE_URL in
              Vercel and redeploy.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return <Dashboard shareUrl={shareUrl} />;
}
