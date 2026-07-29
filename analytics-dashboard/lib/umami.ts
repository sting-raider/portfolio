export type MetricRow = { x: string; y: number };
export type ExpandedMetricRow = {
  name: string;
  pageviews: number;
  visitors: number;
  visits: number;
  bounces: number;
  totaltime: number;
};
export type TimePoint = { x: string; y: number };
export type Stats = {
  pageviews: number;
  visitors: number;
  visits: number;
  bounces: number;
  totaltime: number;
};

export type DashboardData = {
  configured: boolean;
  active: number;
  stats: Stats;
  pageviews: TimePoint[];
  sessions: TimePoint[];
  paths: ExpandedMetricRow[];
  referrers: MetricRow[];
  countries: MetricRow[];
  devices: MetricRow[];
  browsers: MetricRow[];
  operatingSystems: MetricRow[];
  events: MetricRow[];
  resumeDownloads: number;
  error?: string;
};

const emptyStats: Stats = {
  pageviews: 0,
  visitors: 0,
  visits: 0,
  bounces: 0,
  totaltime: 0,
};

export const emptyDashboard: DashboardData = {
  configured: false,
  active: 0,
  stats: emptyStats,
  pageviews: [],
  sessions: [],
  paths: [],
  referrers: [],
  countries: [],
  devices: [],
  browsers: [],
  operatingSystems: [],
  events: [],
  resumeDownloads: 0,
};

async function umamiFetch<T>(path: string, params?: Record<string, string | number>) {
  const apiKey = process.env.UMAMI_API_KEY;
  const base = process.env.UMAMI_API_BASE ?? "https://api.umami.is/v1";
  if (!apiKey) throw new Error("UMAMI_API_KEY is not configured.");

  const url = new URL(`${base.replace(/\/$/, "")}${path}`);
  for (const [key, value] of Object.entries(params ?? {})) {
    url.searchParams.set(key, String(value));
  }

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "x-umami-api-key": apiKey,
    },
    cache: "no-store",
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok) {
    throw new Error(`Umami returned ${response.status}.`);
  }
  return (await response.json()) as T;
}

export async function getDashboardData(startAt: number, endAt: number) {
  const websiteId = process.env.UMAMI_WEBSITE_ID;
  const apiKey = process.env.UMAMI_API_KEY;

  if (!websiteId || !apiKey) {
    return emptyDashboard;
  }

  const prefix = `/websites/${websiteId}`;
  const common = { startAt, endAt };

  try {
    const [
      active,
      stats,
      series,
      paths,
      referrers,
      countries,
      devices,
      browsers,
      operatingSystems,
      events,
      eventSeries,
    ] = await Promise.all([
      umamiFetch<{ visitors: number }>(`${prefix}/active`),
      umamiFetch<Stats>(`${prefix}/stats`, common),
      umamiFetch<{ pageviews: TimePoint[]; sessions: TimePoint[] }>(
        `${prefix}/pageviews`,
        { ...common, unit: "day", timezone: "Asia/Calcutta" },
      ),
      umamiFetch<ExpandedMetricRow[]>(`${prefix}/metrics/expanded`, {
        ...common,
        type: "path",
        limit: 50,
      }),
      umamiFetch<MetricRow[]>(`${prefix}/metrics`, {
        ...common,
        type: "referrer",
        limit: 8,
      }),
      umamiFetch<MetricRow[]>(`${prefix}/metrics`, {
        ...common,
        type: "country",
        limit: 8,
      }),
      umamiFetch<MetricRow[]>(`${prefix}/metrics`, {
        ...common,
        type: "device",
        limit: 8,
      }),
      umamiFetch<MetricRow[]>(`${prefix}/metrics`, {
        ...common,
        type: "browser",
        limit: 8,
      }),
      umamiFetch<MetricRow[]>(`${prefix}/metrics`, {
        ...common,
        type: "os",
        limit: 8,
      }),
      umamiFetch<MetricRow[]>(`${prefix}/metrics`, {
        ...common,
        type: "event",
        limit: 50,
      }),
      umamiFetch<Array<{ x: string; t: string; y: number }>>(
        `${prefix}/events/series`,
        {
          ...common,
          unit: "day",
          timezone: "Asia/Calcutta",
          event: "resume-download",
        },
      ),
    ]);

    return {
      configured: true,
      active: active.visitors ?? 0,
      stats,
      pageviews: series.pageviews ?? [],
      sessions: series.sessions ?? [],
      paths,
      referrers,
      countries,
      devices,
      browsers,
      operatingSystems,
      events,
      resumeDownloads: eventSeries
        .filter((event) => event.x === "resume-download")
        .reduce((total, event) => total + event.y, 0),
    } satisfies DashboardData;
  } catch (error) {
    return {
      ...emptyDashboard,
      configured: true,
      error: error instanceof Error ? error.message : "Analytics signal unavailable.",
    } satisfies DashboardData;
  }
}
