import type {
  DashboardData,
  ExpandedMetricRow,
  MetricRow,
  TimePoint,
} from "@/lib/umami";
import Image from "next/image";
import Link from "next/link";

const ranges = [
  { key: "7d", label: "7 DAYS" },
  { key: "30d", label: "30 DAYS" },
  { key: "90d", label: "90 DAYS" },
  { key: "365d", label: "1 YEAR" },
];

function compactNumber(value: number) {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

function duration(totalSeconds: number) {
  if (!totalSeconds) return "0:00";
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function percentage(value: number) {
  return `${Math.round(value * 100)}%`;
}

function alphysLine(data: DashboardData) {
  if (data.error) return "* U-um... the signal is fuzzy. Check the API console?";
  if (!data.configured) return "* Once the tracking keys are connected, all the readings show up here!";
  if (data.active > 0) return `* Th-there ${data.active === 1 ? "is" : "are"} ${data.active} human${data.active === 1 ? "" : "s"} on the site right now!`;
  if (data.resumeDownloads > 0) return `* Your résumé was extracted ${data.resumeDownloads} time${data.resumeDownloads === 1 ? "" : "s"} in this range. Nice!`;
  return "* Everything is stable. I'm keeping an eye on the cameras!";
}

function Bars({
  rows,
  emptyLabel,
}: {
  rows: MetricRow[];
  emptyLabel: string;
}) {
  const maximum = Math.max(...rows.map((row) => row.y), 1);
  if (!rows.length) return <p className="empty-reading">* {emptyLabel}</p>;

  return (
    <ol className="bars">
      {rows.map((row) => (
        <li key={row.x || "(direct)"}>
          <div className="bar-label">
            <span>{row.x || "DIRECT / NONE"}</span>
            <strong>{row.y}</strong>
          </div>
          <div className="bar-track">
            <span style={{ width: `${Math.max((row.y / maximum) * 100, 2)}%` }} />
          </div>
        </li>
      ))}
    </ol>
  );
}

function Timeline({ points }: { points: TimePoint[] }) {
  const maximum = Math.max(...points.map((point) => point.y), 1);
  if (!points.length) return <p className="empty-reading">* NO TEMPORAL READINGS YET.</p>;

  return (
    <div className="timeline" aria-label="Daily pageviews">
      {points.map((point) => {
        const date = new Date(point.x);
        return (
          <div
            className="timeline-column"
            key={point.x}
            title={`${date.toLocaleDateString("en-IN")}: ${point.y} pageviews`}
          >
            <span style={{ height: `${Math.max((point.y / maximum) * 100, 3)}%` }} />
          </div>
        );
      })}
    </div>
  );
}

function RouteTable({ rows }: { rows: ExpandedMetricRow[] }) {
  if (!rows.length) return <p className="empty-reading">* NO ROUTE SIGNALS YET.</p>;
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ROUTE</th>
            <th>VIEWS</th>
            <th>HUMANS</th>
            <th>VISITS</th>
            <th>BOUNCE</th>
            <th>AVG. TIME</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td>{row.name}</td>
              <td>{row.pageviews}</td>
              <td>{row.visitors}</td>
              <td>{row.visits}</td>
              <td>{percentage(row.visits ? row.bounces / row.visits : 0)}</td>
              <td>{duration(row.visits ? row.totaltime / row.visits : 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Dashboard({
  data,
  selectedRange,
}: {
  data: DashboardData;
  selectedRange: string;
}) {
  const bounceRate = data.stats.visits ? data.stats.bounces / data.stats.visits : 0;
  const averageVisit = data.stats.visits ? data.stats.totaltime / data.stats.visits : 0;

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
            <span className={data.active ? "status-light status-light--live" : "status-light"} />
            {data.active} LIVE
          </div>
          <form action="/api/logout" method="post">
            <button className="logout-button" type="submit">LOG OUT</button>
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
          <p>{alphysLine(data)}</p>
        </div>
      </section>

      <nav className="range-switcher" aria-label="Analytics date range">
        {ranges.map((range) => (
          <Link
            className={selectedRange === range.key ? "is-active" : ""}
            href={`/?range=${range.key}`}
            key={range.key}
          >
            {range.label}
          </Link>
        ))}
      </nav>

      {!data.configured ? (
        <section className="signal-notice">
          <strong>WAITING FOR CALIBRATION</strong>
          <p>Add the Umami website ID and API key to the deployment environment. No placeholder numbers are shown.</p>
        </section>
      ) : null}

      {data.error ? (
        <section className="signal-notice signal-notice--error">
          <strong>SIGNAL INTERRUPTED</strong>
          <p>{data.error}</p>
        </section>
      ) : null}

      <section className="metric-grid" aria-label="Headline analytics">
        <article className="metric-card metric-card--cyan">
          <span>PAGE VIEWS</span>
          <strong>{compactNumber(data.stats.pageviews)}</strong>
          <small>ALL ROUTE SIGNALS</small>
        </article>
        <article className="metric-card metric-card--yellow">
          <span>HUMANS</span>
          <strong>{compactNumber(data.stats.visitors)}</strong>
          <small>UNIQUE VISITORS</small>
        </article>
        <article className="metric-card metric-card--magenta">
          <span>RÉSUMÉ EXTRACTS</span>
          <strong>{compactNumber(data.resumeDownloads)}</strong>
          <small>DOWNLOAD CLICKS</small>
        </article>
        <article className="metric-card metric-card--green">
          <span>AVG. VISIT</span>
          <strong>{duration(averageVisit)}</strong>
          <small>{percentage(bounceRate)} BOUNCE RATE</small>
        </article>
      </section>

      <section className="dashboard-grid">
        <article className="panel panel--wide">
          <header>
            <div>
              <span className="panel-index">01</span>
              <h2>TEMPORAL SIGNAL</h2>
            </div>
            <small>DAILY PAGEVIEWS</small>
          </header>
          <Timeline points={data.pageviews} />
        </article>

        <article className="panel">
          <header>
            <div>
              <span className="panel-index">02</span>
              <h2>ENTRY SOURCES</h2>
            </div>
          </header>
          <Bars rows={data.referrers} emptyLabel="NO REFERRER READINGS YET." />
        </article>

        <article className="panel">
          <header>
            <div>
              <span className="panel-index">03</span>
              <h2>EVENT LOG</h2>
            </div>
          </header>
          <Bars rows={data.events} emptyLabel="NO CUSTOM EVENTS YET." />
        </article>

        <article className="panel panel--full">
          <header>
            <div>
              <span className="panel-index">04</span>
              <h2>ROUTE INSPECTION</h2>
            </div>
            <small>EACH PORTFOLIO PAGE</small>
          </header>
          <RouteTable rows={data.paths} />
        </article>

        <article className="panel">
          <header>
            <div>
              <span className="panel-index">05</span>
              <h2>GEOGRAPHY</h2>
            </div>
          </header>
          <Bars rows={data.countries} emptyLabel="NO COUNTRY READINGS YET." />
        </article>

        <article className="panel">
          <header>
            <div>
              <span className="panel-index">06</span>
              <h2>TERMINALS</h2>
            </div>
          </header>
          <Bars rows={data.devices} emptyLabel="NO DEVICE READINGS YET." />
        </article>

        <article className="panel">
          <header>
            <div>
              <span className="panel-index">07</span>
              <h2>BROWSERS</h2>
            </div>
          </header>
          <Bars rows={data.browsers} emptyLabel="NO BROWSER READINGS YET." />
        </article>

        <article className="panel">
          <header>
            <div>
              <span className="panel-index">08</span>
              <h2>OPERATING SYSTEMS</h2>
            </div>
          </header>
          <Bars rows={data.operatingSystems} emptyLabel="NO OS READINGS YET." />
        </article>
      </section>

      <footer className="dashboard-footer">
        <span>PRIVACY MODE: COOKIE-FREE // NO SESSION REPLAY</span>
        <span>DATA SOURCE: UMAMI</span>
      </footer>
    </main>
  );
}
