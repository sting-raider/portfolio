import Image from "next/image";

export function Dashboard({ shareUrl }: { shareUrl: string }) {
  return (
    <main className="dashboard-shell">
      <div className="scanlines" aria-hidden="true" />

      <header className="dashboard-header">
        <div>
          <p className="eyebrow">TRUE LAB // OBSERVATION DECK</p>
          <h1>PORTFOLIO SIGNAL MONITOR</h1>
        </div>
        <div className="header-actions">
          <div className="live-chip">
            <span className="status-light status-light--live" />
            SHARE LINK ONLINE
          </div>
          <form action="/api/logout" method="post">
            <button className="logout-button" type="submit">
              LOG OUT
            </button>
          </form>
        </div>
      </header>

      <section className="lab-dialogue">
        <Image
          src="/alphys-face.png"
          alt="Alphys"
          width={104}
          height={104}
          priority
          className="alphys-image"
        />
        <div className="dialogue">
          <span className="speaker">ALPHYS</span>
          <p>* F-free data tunnel established! The complete read-only report is inside the lab console.</p>
        </div>
      </section>

      <section className="share-panel">
        <header>
          <div>
            <span className="panel-index">01</span>
            <h2>UMAMI OBSERVATION WINDOW</h2>
          </div>
          <a href={shareUrl} rel="noreferrer" target="_blank">
            OPEN FULLSCREEN &gt;
          </a>
        </header>
        <iframe
          className="umami-share-frame"
          src={shareUrl}
          title="Ali Portfolio analytics on Umami"
          loading="eager"
          referrerPolicy="no-referrer"
          sandbox="allow-forms allow-popups allow-same-origin allow-scripts"
        />
      </section>

      <footer className="dashboard-footer">
        <span>PRIVACY MODE: COOKIE-FREE // NO SESSION REPLAY</span>
        <span>DATA SOURCE: FREE UMAMI SHARE</span>
      </footer>
    </main>
  );
}
