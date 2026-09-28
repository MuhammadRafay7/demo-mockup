window.LEGACY = window.LEGACY || {};
window.LEGACY["analysis"] = () => {
  const fmt = (n) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
    return String(n);
  };
  const loc = (n) => n.toLocaleString("en-US");
  const money = (n) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const niceStep = (max) => {
    const raw = Math.max(max, 1) / 4;
    const p = 10 ** Math.floor(Math.log10(raw));
    const m = raw / p;
    return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10) * p;
  };
  const tickText = (v) => (Number.isInteger(v) ? String(v) : v.toFixed(1));

  const legendHtml = (items) => `
    <div class="flex flex-wrap justify-center gap-x-3 gap-y-1 pt-1 text-[10px] shrink-0">
      ${items
        .map(
          (s) => `<span class="inline-flex items-center gap-1 text-${s.tone}">${
            s.kind === "bar"
              ? `<span class="inline-block size-2.5 bg-${s.tone}" style="opacity:${s.op ?? 1}"></span>`
              : `<span class="inline-block w-3.5 h-0.5 bg-${s.tone}"></span>`
          }${s.name}</span>`,
        )
        .join("")}
    </div>`;

  const chart = ({ w, h, labels, series, band = false, xEvery = 1, legend = false, yFmt = tickText }) => {
    const hasR = series.some((s) => s.axis === "r");
    const L = 60;
    const R = w - (hasR ? 72 : 12);
    const T = 8;
    const B = h - 30;
    const n = labels.length;
    const bw = (R - L) / n;
    const cx = (i) => (band ? L + bw * (i + 0.5) : L + ((R - L) * i) / Math.max(1, n - 1));
    const maxFor = (axis) => {
      let m = 0;
      const acc = {};
      for (const s of series.filter((s) => (s.axis ?? "l") === axis)) {
        s.values.forEach((v, i) => {
          if (s.stack) {
            const k = `${s.stack}:${i}`;
            acc[k] = (acc[k] ?? 0) + v;
            m = Math.max(m, acc[k]);
          } else m = Math.max(m, v);
        });
      }
      return m;
    };
    const stepL = niceStep(maxFor("l"));
    const stepR = hasR ? niceStep(maxFor("r")) : 1;
    const y = (v, axis) => B - (v / ((axis === "r" ? stepR : stepL) * 4)) * (B - T);
    const shownX = labels.map((_, i) => i).filter((i) => i % xEvery === 0);

    let out = "";
    for (let t = 0; t <= 4; t++) {
      const yy = y(stepL * t, "l");
      out += `<line x1="${L}" x2="${R}" y1="${yy}" y2="${yy}" class="stroke-border" stroke-dasharray="3 3" />`;
      out += `<text x="${L - 6}" y="${yy + 3}" text-anchor="end" font-size="10" class="fill-muted-foreground">${yFmt(stepL * t)}</text>`;
      if (hasR) {
        const yr = y(stepR * t, "r");
        out += `<text x="${R + 6}" y="${yr + 3}" text-anchor="start" font-size="10" class="fill-muted-foreground">${tickText(stepR * t)}</text>`;
      }
    }
    for (const i of shownX) {
      out += `<line x1="${cx(i)}" x2="${cx(i)}" y1="${T}" y2="${B}" class="stroke-border" stroke-dasharray="3 3" />`;
      out += `<text x="${cx(i)}" y="${B + 15}" text-anchor="middle" font-size="10" class="fill-muted-foreground">${labels[i]}</text>`;
    }
    out += `<line x1="${L}" x2="${R}" y1="${B}" y2="${B}" class="stroke-muted-foreground" stroke-opacity="0.6" />`;
    out += `<line x1="${L}" x2="${L}" y1="${T}" y2="${B}" class="stroke-muted-foreground" stroke-opacity="0.6" />`;
    if (hasR)
      out += `<line x1="${R}" x2="${R}" y1="${T}" y2="${B}" class="stroke-muted-foreground" stroke-opacity="0.6" />`;

    const bars = series.filter((s) => s.kind === "bar");
    const slots = [...new Set(bars.map((s) => s.stack ?? s.name))];
    const gap = slots.length > 1 ? 4 : 0;
    const slotW = (bw * 0.8 - gap * (slots.length - 1)) / Math.max(1, slots.length);
    const barBase = {};
    for (const s of bars) {
      const slot = slots.indexOf(s.stack ?? s.name);
      s.values.forEach((v, i) => {
        const key = `${s.stack ?? s.name}:${i}`;
        const base = barBase[key] ?? 0;
        const x = cx(i) - (bw * 0.8) / 2 + slot * (slotW + gap);
        const y1 = y(base + v, s.axis);
        const y0 = y(base, s.axis);
        out += `<rect x="${x}" y="${y1}" width="${slotW}" height="${Math.max(0, y0 - y1)}" class="fill-${s.tone}" fill-opacity="${s.op ?? 1}" />`;
        barBase[key] = base + v;
      });
    }
    const areaBase = {};
    for (const s of series.filter((s) => s.kind === "area")) {
      const tops = s.values.map((v, i) => {
        const b = s.stack ? (areaBase[`${s.stack}:${i}`] ?? 0) : 0;
        return [cx(i), y(b + v, s.axis), y(b, s.axis), b + v];
      });
      tops.forEach((p, i) => {
        if (s.stack) areaBase[`${s.stack}:${i}`] = p[3];
      });
      const top = tops.map((p) => `${p[0]},${p[1]}`).join(" L");
      const bottom = [...tops]
        .reverse()
        .map((p) => `${p[0]},${p[2]}`)
        .join(" L");
      out += `<path d="M${top} L${bottom} Z" class="fill-${s.tone}" fill-opacity="${s.fillOp ?? 0.2}" />`;
      out += `<path d="M${top}" fill="none" class="stroke-${s.tone}" stroke-width="1.5" />`;
    }
    for (const s of series.filter((s) => s.kind === "line")) {
      const d = s.values.map((v, i) => `${cx(i)},${y(v, s.axis)}`).join(" L");
      out += `<path d="M${d}" fill="none" class="stroke-${s.tone}" stroke-width="1.5" />`;
    }
    const svg = `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet" class="w-full flex-1 min-h-0">${out}</svg>`;
    return `<div class="h-full flex flex-col">${svg}${legend ? legendHtml(series) : ""}</div>`;
  };

  const hbar = ({ w, h, rows }) => {
    const L = 60 + 110;
    const R = w - 12;
    const T = 8;
    const B = h - 30;
    const step = niceStep(Math.max(...rows.map((r) => r.v)));
    const x = (v) => L + (v / (step * 4)) * (R - L);
    const bh = (B - T) / rows.length;
    let out = "";
    for (let t = 0; t <= 4; t++) {
      const xx = x(step * t);
      out += `<line x1="${xx}" x2="${xx}" y1="${T}" y2="${B}" class="stroke-border" stroke-dasharray="3 3" />`;
      out += `<text x="${xx}" y="${B + 15}" text-anchor="middle" font-size="10" class="fill-muted-foreground">${tickText(step * t)}</text>`;
    }
    rows.forEach((r, i) => {
      const cy = T + bh * (i + 0.5);
      out += `<line x1="${L}" x2="${R}" y1="${cy}" y2="${cy}" class="stroke-border" stroke-dasharray="3 3" />`;
      out += `<text x="${L - 6}" y="${cy + 3}" text-anchor="end" font-size="10" class="fill-muted-foreground">${r.k}</text>`;
      out += `<rect x="${L}" y="${cy - bh * 0.4}" width="${x(r.v) - L}" height="${bh * 0.8}" class="fill-primary" />`;
    });
    out += `<line x1="${L}" x2="${R}" y1="${B}" y2="${B}" class="stroke-muted-foreground" stroke-opacity="0.6" />`;
    out += `<line x1="${L}" x2="${L}" y1="${T}" y2="${B}" class="stroke-muted-foreground" stroke-opacity="0.6" />`;
    return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet" class="w-full h-full">${out}</svg>`;
  };

  const days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(Date.UTC(2026, 7, 28 + i));
    return d.toISOString().slice(0, 10);
  });
  const shortDays = days.map((d) => d.slice(5).replace("-", "/"));
  const wave = (i, base, amp, ph, trend = 0) =>
    Math.max(0, Math.round(base + amp * Math.sin(i / 2.3 + ph) + amp * 0.45 * Math.sin(i * 1.7 + ph * 2) + trend * i));

  const platforms = [
    { p: "facebook", label: "Facebook", tone: "primary", base: 6200, amp: 1800 },
    { p: "instagram", label: "Instagram", tone: "warn", base: 9800, amp: 2600 },
    { p: "linkedin", label: "LinkedIn", tone: "muted-foreground", base: 900, amp: 300 },
    { p: "tiktok", label: "TikTok", tone: "success", base: 14800, amp: 5200 },
    { p: "wordpress", label: "WordPress", tone: "foreground", base: 3100, amp: 700 },
    { p: "youtube", label: "YouTube", tone: "danger", base: 8600, amp: 2400 },
  ];
  const trendSeries = platforms.map((pl, k) => ({
    kind: "line",
    name: pl.label,
    tone: pl.tone,
    values: days.map((_, i) => wave(i, pl.base, pl.amp, k * 1.3, pl.base / 400)),
  }));

  const header = L.header({
    eyebrow: "Function D · performance",
    title: "Analysis",
    info: true,
    actions: `
      <div class="flex items-center gap-2">
        <div class="flex rounded-sm ring-1 ring-border overflow-hidden">
          ${[7, 14, 30, 60, 90]
            .map(
              (r) =>
                `<button title="Show the last ${r} days" class="px-2 py-1 text-[10px] font-mono uppercase tracking-widest ${
                  r === 30 ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"
                }">${r}d</button>`,
            )
            .join("")}
        </div>
        <button title="Download the current metrics as a CSV file" class="px-2 py-1 rounded-sm ring-1 ring-border text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground hover:ring-primary/50 disabled:opacity-40 disabled:hover:text-muted-foreground">export csv</button>
        ${L.pill("warn", "1 platform behind · 2h ago")}
      </div>`,
  });

  const filterBar = `
    <div class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70">
      no filter · all platforms · all topics
    </div>`;

  const freshRows = [
    { p: "facebook", status: "complete", tone: "success", bar: "bg-success", snap: "2026-09-26T05:48:11", age: "3h ago", cov: "30/30 (100%)", snaps: 2184, pubs: 71, detail: "Collected 3h ago with 30/30 days covered." },
    { p: "instagram", status: "lagging", tone: "warn", bar: "bg-warn", snap: "2026-09-24T16:02:37", age: "41h ago", cov: "28/30 (93%)", snaps: 1906, pubs: 64, detail: "Last snapshot 41h ago; today's numbers are incomplete." },
    { p: "linkedin", status: "complete", tone: "success", bar: "bg-success", snap: "2026-09-26T04:15:52", age: "4h ago", cov: "27/30 (90%)", snaps: 388, pubs: 18, detail: "Collected 4h ago with 27/30 days covered." },
    { p: "tiktok", status: "complete", tone: "success", bar: "bg-success", snap: "2026-09-26T06:12:04", age: "2h ago", cov: "30/30 (100%)", snaps: 2612, pubs: 83, detail: "Collected 2h ago with 30/30 days covered." },
    { p: "wordpress", status: "complete", tone: "success", bar: "bg-success", snap: "2026-09-26T05:30:40", age: "3h ago", cov: "30/30 (100%)", snaps: 942, pubs: 36, detail: "Collected 3h ago with 30/30 days covered." },
    { p: "youtube", status: "complete", tone: "success", bar: "bg-success", snap: "2026-09-26T06:01:19", age: "2h ago", cov: "30/30 (100%)", snaps: 1744, pubs: 52, detail: "Collected 2h ago with 30/30 days covered." },
  ];
  const field = (k, v) => `
    <div>
      <div class="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">${k}</div>
      <div class="text-[11px] font-mono text-foreground">${v}</div>
    </div>`;
  const freshness = L.panel({
    flush: true,
    eyebrow: "warehouse freshness",
    title: "Snapshot age & completeness by platform",
    actions: `
      <div class="flex items-center gap-2">
        <span class="text-[10px] font-mono text-muted-foreground">latest snapshot 2026-09-26T06:12:04 UTC</span>
        ${L.pill("warn", "lagging data")}
      </div>`,
    body: `
      <div class="divide-y divide-border/60">
        ${freshRows
          .map(
            (f) => `
          <div class="px-4 py-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            <div class="flex items-center gap-2 min-w-[150px]">
              <span class="h-2 w-2 rounded-full shrink-0 ${f.bar}"></span>
              <span class="text-[11px] font-mono text-foreground capitalize">${f.p}</span>
              ${L.pill(f.tone, f.status)}
            </div>
            <div class="flex flex-wrap items-center gap-x-4 gap-y-1 flex-1 min-w-[240px]">
              ${field("snapshot", f.snap)}
              ${field("age", f.age)}
              ${field("day coverage", f.cov)}
              ${field("snapshots", loc(f.snaps))}
              ${field("publications", loc(f.pubs))}
            </div>
            <div class="w-full sm:w-auto sm:max-w-[340px] text-[10px] font-mono text-muted-foreground whitespace-normal">${f.detail}</div>
          </div>`,
          )
          .join("")}
      </div>`,
  });

  const kpi = (label, value, delta, positive) => `
    <div class="panel rounded-sm p-4">
      <div class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">${label}</div>
      <div class="mt-1 font-mono text-2xl">${value}</div>
      <div class="mt-1 text-[10px] font-mono ${positive ? "text-success" : "text-danger"}">${delta}</div>
    </div>`;
  const kpis = `
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      ${kpi("views", "1.3M", "+12.4% vs prev period", true)}
      ${kpi("engagement", "4.87%", "62.5k interactions / views", true)}
      ${kpi("revenue", "$3,418.62", "+8.1% vs prev period", true)}
      ${kpi("replies_sent", "214", "-6.2% vs prev period", false)}
    </div>`;

  const recLines = [
    { kpi: "views", formula: "SUM(VIEWS delta) over day × platform rows in the current window", value: "1,284,310", rec: "1,284,310", rows: "178 / 171", days: 30, plats: 6, src: "publication_metrics" },
    { kpi: "engagement", formula: "(likes + comments + shares + saves) ÷ views, same rows as views", value: "4.87%", rec: "62,547 / 1,284,310", rows: "178 / 171", days: 30, plats: 6, src: "publication_metrics" },
    { kpi: "revenue", formula: "SUM(CREATOR_REVENUE_USD delta) + SUM(SITE_REVENUE_USD delta)", value: "$3,418.62", rec: "$3,418.62", rows: "178 / 171", days: 30, plats: 6, src: "publication_metrics" },
    { kpi: "replies_sent", formula: "COUNT(*) of brand_reply knowledge items, summed over day × platform rows", value: "214", rec: "214", rows: "96 / 101", days: 29, plats: 5, src: "brand_replies" },
  ];
  const sources = [
    { key: "publication_metrics", table: "PROVENTEXT.PRODUCTION.PUBLICATION_METRICS", rows: 349 },
    { key: "brand_replies", table: "PROVENTEXT.BRAND_VOICE.KNOWLEDGE_ITEMS", rows: 197 },
    { key: "publication_funnel", table: "PROVENTEXT.PRODUCTION.PUBLICATIONS", rows: 6 },
    { key: "reply_topics", table: "PROVENTEXT.BRAND_VOICE.TOPICS ⋈ TOPIC_ITEMS ⋈ KNOWLEDGE_ITEMS", rows: 58 },
  ];
  const windowLine = (k, v) => `
    <div>
      <div class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">${k}</div>
      <div class="text-[11px] font-mono text-foreground break-words">${v}</div>
    </div>`;
  const reconciliation = L.panel({
    flush: true,
    eyebrow: "reconciliation",
    title: "KPI inputs — rows, windows, filters",
    actions: `<div class="flex items-center gap-2">${L.pill("success", "ties out")}</div>`,
    body: `
      <div class="px-4 py-3 grid gap-2 sm:grid-cols-2 border-b border-border">
        ${windowLine("current window", "2026-08-28 → 2026-09-26 (30d, inclusive, UTC)")}
        ${windowLine("previous window", "2026-07-29 → 2026-08-27 (30d, inclusive, UTC)")}
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-[11px] font-mono">
          <thead class="text-muted-foreground">
            <tr class="border-b border-border">
              <th class="text-left px-3 py-2">KPI</th>
              <th class="text-right px-3 py-2">Displayed</th>
              <th class="text-right px-3 py-2">Recomputed from rows</th>
              <th class="text-right px-3 py-2">Rows (cur / prev)</th>
              <th class="text-right px-3 py-2">Days</th>
              <th class="text-right px-3 py-2">Platforms</th>
              <th class="text-left px-3 py-2">Source</th>
            </tr>
          </thead>
          <tbody>
            ${recLines
              .map(
                (l) => `
            <tr class="border-b border-border/50 align-top">
              <td class="px-3 py-2 text-foreground">${l.kpi}
                <div class="text-[10px] text-muted-foreground whitespace-normal max-w-[280px]">${l.formula}</div>
              </td>
              <td class="px-3 py-2 text-right text-foreground">${l.value}</td>
              <td class="px-3 py-2 text-right text-success">${l.rec}</td>
              <td class="px-3 py-2 text-right">${l.rows}</td>
              <td class="px-3 py-2 text-right">${l.days}</td>
              <td class="px-3 py-2 text-right">${l.plats}</td>
              <td class="px-3 py-2">
                <button title="Show the ${l.src} warehouse source details for this KPI" class="inline-flex items-center gap-1 text-primary/80 hover:text-primary">${L.icon("ChevronRight", "size-3")}${l.src}</button>
              </td>
            </tr>`,
              )
              .join("")}
          </tbody>
        </table>
      </div>
      <div class="border-t border-border divide-y divide-border/60">
        ${sources
          .map(
            (s) => `
        <div class="px-4 py-3 space-y-1">
          <button title="Expand ${s.key} source details" class="w-full flex items-center gap-1.5 text-left">
            <span class="text-muted-foreground shrink-0">${L.icon("ChevronRight", "size-3.5")}</span>
            <span class="text-[11px] font-mono text-foreground">${s.key}<span class="text-muted-foreground"> · ${s.table}</span></span>
            <span class="flex items-center gap-2 shrink-0">
              ${L.pill("muted", `${s.rows} rows`)}
              <span class="text-[10px] font-mono text-muted-foreground">+</span>
            </span>
          </button>
        </div>`,
          )
          .join("")}
      </div>`,
  });

  const videos = [
    { t: "Five pantry pastas in 20 minutes", pl: "YouTube · Instagram · Facebook · TikTok", posts: 4, views: 412800, likes: 23100, comments: 1480, shares: 3920, rev: 612.4, first: "2026-09-02" },
    { t: "Sheet-pan chicken, three ways", pl: "YouTube · Instagram · TikTok", posts: 3, views: 288400, likes: 16900, comments: 942, shares: 2210, rev: 438.15, first: "2026-09-09" },
    { t: "Cast-iron care in 60 seconds", pl: "Instagram · Facebook · TikTok", posts: 3, views: 241600, likes: 14200, comments: 611, shares: 3380, rev: 128.9, first: "2026-08-30" },
    { t: "Brown butter banana bread", pl: "YouTube · Instagram · Facebook · TikTok", posts: 4, views: 196300, likes: 12800, comments: 804, shares: 1720, rev: 341.07, first: "2026-09-16" },
    { t: "Sourdough starter, day one", pl: "YouTube · TikTok", posts: 2, views: 142900, likes: 8700, comments: 1210, shares: 960, rev: 219.33, first: "2026-08-24" },
    { t: "Weeknight dal", pl: "YouTube · Instagram · Facebook", posts: 3, views: 88200, likes: 5100, comments: 392, shares: 540, rev: 154.8, first: "2026-09-20" },
    { t: "Market haul: September", pl: "Instagram · TikTok", posts: 2, views: 51700, likes: 3300, comments: 188, shares: 270, rev: 22.46, first: "2026-09-23" },
  ];
  const videoRows = videos
    .map(
      (g) => `
    <tr class="border-b border-border/40 hover:bg-panel-2 cursor-pointer">
      <td class="px-3 py-2 max-w-[320px]">
        <span class="inline-flex items-center gap-1">${L.icon("ChevronRight", "size-3 shrink-0")}<span class="truncate">${g.t}</span></span>
      </td>
      <td class="px-3 py-2 text-muted-foreground">${g.pl}</td>
      <td class="px-3 py-2 text-right">${g.posts}</td>
      <td class="px-3 py-2 text-right">${fmt(g.views)}</td>
      <td class="px-3 py-2 text-right">${fmt(g.likes)}</td>
      <td class="px-3 py-2 text-right">${fmt(g.comments)}</td>
      <td class="px-3 py-2 text-right">${fmt(g.shares)}</td>
      <td class="px-3 py-2 text-right">$${money(g.rev)}</td>
      <td class="px-3 py-2 text-right text-muted-foreground">${g.first}</td>
    </tr>`,
    )
    .join("");
  const videoGroups = L.panel({
    flush: true,
    eyebrow: "videos · cross-platform",
    title: "Top videos across platforms",
    actions: `<div class="flex items-center gap-2">${L.info()}${L.pill("success", "7 videos")}</div>`,
    body: `
      <div class="overflow-x-auto">
        <table class="w-full text-[11px] font-mono">
          <thead class="text-muted-foreground">
            <tr class="border-b border-border/60">
              <th class="text-left px-3 py-2 font-normal">video</th>
              <th class="text-left px-3 py-2 font-normal">platforms</th>
              <th class="text-right px-3 py-2 font-normal">posts</th>
              <th class="text-right px-3 py-2 font-normal">views</th>
              <th class="text-right px-3 py-2 font-normal">likes</th>
              <th class="text-right px-3 py-2 font-normal">comments</th>
              <th class="text-right px-3 py-2 font-normal">shares</th>
              <th class="text-right px-3 py-2 font-normal">revenue</th>
              <th class="text-right px-3 py-2 font-normal">first posted</th>
            </tr>
          </thead>
          <tbody>${videoRows}</tbody>
        </table>
      </div>`,
  });

  const glyphs = ["▁", "▂", "▃", "▄", "▅", "▆", "▇", "█"];
  const sparkline = (values) => {
    const max = Math.max(...values, 1);
    return values
      .map((v) => glyphs[Math.min(7, Math.max(0, Math.round((v / max) * 7)))])
      .join("");
  };
  const posts = [
    { t: "Five pantry pastas in 20 minutes", p: "tiktok", d: "2026-09-02", imp: false, v: 148200, i: 201400, l: 9120, c: 412, life: 181600, ph: 0.2 },
    { t: "Five pantry pastas in 20 minutes", p: "youtube", d: "2026-09-02", imp: false, v: 96400, i: 311800, l: 5210, c: 604, life: 118900, ph: 1.1 },
    { t: "Sheet-pan chicken, three ways", p: "instagram", d: "2026-09-09", imp: false, v: 88100, i: 132700, l: 6040, c: 288, life: 91300, ph: 2.4 },
    { t: "Cast-iron care in 60 seconds", p: "tiktok", d: "2026-08-30", imp: false, v: 82600, i: 109900, l: 5380, c: 197, life: 104200, ph: 0.7 },
    { t: "Brown butter banana bread", p: "youtube", d: "2026-09-16", imp: false, v: 61800, i: 188200, l: 3920, c: 341, life: 61800, ph: 3.1 },
    { t: "Sheet-pan chicken, three ways", p: "tiktok", d: "2026-09-09", imp: false, v: 58400, i: 77200, l: 3610, c: 140, life: 58400, ph: 1.9 },
    { t: "Sourdough starter, day one", p: "youtube", d: "2026-08-24", imp: false, v: 44900, i: 140300, l: 2870, c: 522, life: 97500, ph: 2.8 },
    { t: "Brown butter banana bread", p: "instagram", d: "2026-09-16", imp: false, v: 39700, i: 64100, l: 3110, c: 176, life: 39700, ph: 0.4 },
    { t: "Weeknight dal", p: "facebook", d: "2026-09-20", imp: false, v: 21300, i: 48800, l: 1040, c: 96, life: 21300, ph: 1.5 },
    { t: "Summer tomato galette", p: "youtube", d: "2025-07-11", imp: true, v: 12400, i: 51200, l: 610, c: 38, life: 486200, ph: 2.2 },
    { t: "Market haul: September", p: "instagram", d: "2026-09-23", imp: false, v: 11900, i: 22400, l: 880, c: 51, life: 11900, ph: 0.9 },
    { t: "Pickled red onions, the fast way", p: "tiktok", d: "2025-11-03", imp: true, v: 8700, i: 10300, l: 402, c: 17, life: 229400, ph: 3.4 },
    { t: "Cast-iron care in 60 seconds", p: "facebook", d: "2026-08-30", imp: false, v: 7600, i: 19800, l: 318, c: 22, life: 12400, ph: 1.2 },
    { t: "Holiday stuffing, make-ahead", p: "youtube", d: "2024-11-19", imp: true, v: 5200, i: 20700, l: 188, c: 14, life: 312700, ph: 2.6 },
  ];
  const postRows = posts
    .map((r) => {
      const age = Math.max(1, Math.round((Date.UTC(2026, 8, 26) - Date.parse(r.d)) / 86400000));
      const n = Math.min(30, age);
      const series = Array.from({ length: n }, (_, i) =>
        Math.max(0, (n - i) * 0.6 + 4 * Math.sin(i / 2 + r.ph) + (i === 0 ? 20 : 8)),
      );
      return `
    <tr class="cursor-pointer border-b border-border/60 hover:bg-muted/40">
      <td class="max-w-[320px] px-3 py-2">
        <div class="flex items-center gap-1">
          <span class="text-muted-foreground shrink-0">${L.icon("ChevronRight", "size-3")}</span>
          <span class="truncate font-medium">${r.t}</span>
        </div>
        <div class="flex items-center gap-2 text-xs text-muted-foreground">
          <span>${r.p}</span><span>· ${r.d}</span>${r.imp ? `<span class="text-warn">· imported</span>` : ""}
        </div>
      </td>
      <td class="px-3 py-2 font-mono text-xs text-muted-foreground">${sparkline(series)}</td>
      <td class="px-3 py-2 text-right tabular-nums">${loc(r.v)}</td>
      <td class="px-3 py-2 text-right tabular-nums">${loc(r.i)}</td>
      <td class="px-3 py-2 text-right tabular-nums">${loc(r.l)}</td>
      <td class="px-3 py-2 text-right tabular-nums">${loc(r.c)}</td>
      <td class="px-3 py-2 text-right tabular-nums">${loc(r.life)}</td>
    </tr>`;
    })
    .join("");
  const postDeltas = L.panel({
    flush: true,
    eyebrow: "per-post · daily deltas",
    title: "Post performance by day · last 30d",
    actions: L.pill("success", `${posts.length} tracked · 3 imported`),
    body: `
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="text-xs uppercase tracking-wide text-muted-foreground">
            <tr class="border-b border-border">
              <th class="px-3 py-2 text-left font-medium">Post</th>
              <th class="px-3 py-2 text-left font-medium">Trend</th>
              <th class="px-3 py-2 text-right font-medium">Views Δ</th>
              <th class="px-3 py-2 text-right font-medium">Impr. Δ</th>
              <th class="px-3 py-2 text-right font-medium">Likes Δ</th>
              <th class="px-3 py-2 text-right font-medium">Comments Δ</th>
              <th class="px-3 py-2 text-right font-medium">Lifetime views</th>
            </tr>
          </thead>
          <tbody>${postRows}</tbody>
        </table>
      </div>`,
  });

  const trend = L.panel({
    eyebrow: "trend · views",
    title: "Daily views by platform",
    actions: `
      <div class="flex flex-wrap gap-1">
        ${platforms
          .map(
            (pl) => `<button title="Filter all panels to ${pl.label}" class="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-sm ring-1 flex items-center gap-1.5 transition-opacity ring-border text-foreground hover:bg-panel-2/60"><span class="w-2 h-2 rounded-sm bg-${pl.tone}"></span>${pl.label}</button>`,
          )
          .join("")}
      </div>`,
    body: `<div class="h-[320px] p-4">${chart({ w: 1170, h: 288, labels: shortDays, series: trendSeries })}</div>`,
  });

  const funnelRows = [
    { label: "Facebook", v: [22, 18, 17, 17] },
    { label: "Instagram", v: [31, 26, 24, 21] },
    { label: "LinkedIn", v: [9, 7, 6, 6] },
    { label: "TikTok", v: [34, 30, 29, 29] },
    { label: "WordPress", v: [12, 10, 10, 9] },
    { label: "YouTube", v: [18, 15, 14, 14] },
  ];
  const stageTones = [
    { name: "created", tone: "muted-foreground", op: 0.6 },
    { name: "scheduled", tone: "primary", op: 0.5 },
    { name: "published", tone: "primary", op: 0.8 },
    { name: "measured", tone: "primary", op: 1 },
  ];
  const funnel = L.panel({
    eyebrow: "throughput",
    title: "Publication funnel · items",
    actions: `<span class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">click a bar to filter</span>`,
    body: `<div class="h-[280px] p-4">${chart({
      w: 520,
      h: 224,
      band: true,
      legend: true,
      labels: funnelRows.map((r) => r.label),
      series: stageTones.map((s, k) => ({ kind: "bar", ...s, values: funnelRows.map((r) => r.v[k]) })),
    })}</div>`,
  });

  const revenue = L.panel({
    flush: true,
    eyebrow: "revenue",
    title: "Daily revenue · creator vs site",
    body: `<div class="h-[280px] p-4">${chart({
      w: 552,
      h: 224,
      legend: true,
      xEvery: 3,
      labels: shortDays,
      series: [
        { kind: "area", name: "creator", tone: "primary", stack: "r", fillOp: 0.25, values: days.map((_, i) => wave(i, 72, 22, 0.6, 0.4)) },
        { kind: "area", name: "site", tone: "success", stack: "r", fillOp: 0.15, values: days.map((_, i) => wave(i, 38, 14, 2.1, 0.2)) },
      ],
    })}</div>`,
  });

  const topics = [
    { topic: "substitutions", volume: 64, responded: 58, gap: 0.09 },
    { topic: "gluten-free swaps", volume: 47, responded: 22, gap: 0.53 },
    { topic: "sourdough troubleshooting", volume: 41, responded: 12, gap: 0.71 },
    { topic: "cast-iron rust", volume: 33, responded: 29, gap: 0.12 },
    { topic: "freezer storage", volume: 28, responded: 15, gap: 0.46 },
    { topic: "wprm recipe card", volume: 22, responded: 21, gap: 0.05 },
    { topic: "spice levels", volume: 19, responded: 6, gap: 0.68 },
    { topic: "meal prep timing", volume: 17, responded: 11, gap: 0.35 },
    { topic: "kid-friendly", volume: 13, responded: 3, gap: 0.77 },
    { topic: "equipment links", volume: 11, responded: 10, gap: 0.09 },
    { topic: "vegan options", volume: 9, responded: 4, gap: 0.56 },
    { topic: "oven temps", volume: 7, responded: 7, gap: 0.0 },
  ].map((t) => ({ ...t, coverage: Math.round((t.responded / t.volume) * 100) }));

  const scatter = (() => {
    const w = 1170;
    const h = 288;
    const Lx = 60;
    const R = w - 20;
    const T = 8;
    const B = h - 38;
    const step = niceStep(Math.max(...topics.map((t) => t.volume)));
    const x = (v) => Lx + (v / 100) * (R - Lx);
    const y = (v) => B - (v / (step * 4)) * (B - T);
    const maxR = Math.max(...topics.map((t) => t.responded));
    const minR = Math.min(...topics.map((t) => t.responded));
    const rad = (v) => Math.sqrt((80 + ((v - minR) / Math.max(1, maxR - minR)) * 520) / Math.PI);
    let out = "";
    for (let t = 0; t <= 4; t++) {
      out += `<line x1="${Lx}" x2="${R}" y1="${y(step * t)}" y2="${y(step * t)}" class="stroke-border" stroke-dasharray="3 3" />`;
      out += `<text x="${Lx - 6}" y="${y(step * t) + 3}" text-anchor="end" font-size="10" class="fill-muted-foreground">${tickText(step * t)}</text>`;
    }
    for (const v of [0, 25, 50, 75, 100]) {
      out += `<line x1="${x(v)}" x2="${x(v)}" y1="${T}" y2="${B}" class="stroke-border" stroke-dasharray="3 3" />`;
      out += `<text x="${x(v)}" y="${B + 15}" text-anchor="middle" font-size="10" class="fill-muted-foreground">${v}</text>`;
    }
    out += `<line x1="${Lx}" x2="${R}" y1="${B}" y2="${B}" class="stroke-muted-foreground" stroke-opacity="0.6" />`;
    out += `<line x1="${Lx}" x2="${Lx}" y1="${T}" y2="${B}" class="stroke-muted-foreground" stroke-opacity="0.6" />`;
    out += `<text x="${(Lx + R) / 2}" y="${B + 30}" text-anchor="middle" font-size="10" class="fill-muted-foreground">reply coverage %</text>`;
    out += `<text x="${14}" y="${(T + B) / 2}" text-anchor="middle" font-size="10" class="fill-muted-foreground" transform="rotate(-90 14 ${(T + B) / 2})">asks</text>`;
    for (const t of topics) {
      const tone = t.coverage >= 80 ? "success" : t.coverage >= 40 ? "warn" : "danger";
      out += `<circle cx="${x(t.coverage)}" cy="${y(t.volume)}" r="${rad(t.responded)}" class="fill-${tone}" fill-opacity="0.8" />`;
    }
    return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet" class="w-full h-full">${out}</svg>`;
  })();

  const replyTopics = L.panel({
    eyebrow: "reply topics",
    title: "Volume × reply coverage",
    actions: `<span class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">click a bubble · size = replied</span>`,
    body: `
      <div class="h-[320px] p-4">${scatter}</div>
      <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-px bg-border border-t border-border text-[10px] font-mono">
        ${topics
          .map(
            (t) => `
        <button title="Filter all panels to the &quot;${t.topic}&quot; topic" class="bg-panel p-2 space-y-1 text-left hover:bg-panel-2/60 transition-opacity">
          <div class="text-foreground truncate">${t.topic}</div>
          <div class="text-muted-foreground">asks ${t.volume} · ${t.coverage}%</div>
          <div class="text-muted-foreground">gap ${t.gap.toFixed(2)}</div>
        </button>`,
          )
          .join("")}
      </div>`,
  });

  const ytDays = days;
  const ytViews = ytDays.map((_, i) => wave(i, 8600, 2400, 0.3, 30));
  const ytWatch = ytDays.map((_, i) => wave(i, 21400, 5200, 0.9, 60));
  const ytGained = ytDays.map((_, i) => wave(i, 58, 18, 1.4, 0.6));
  const ytLost = ytDays.map((_, i) => wave(i, 9, 4, 2.2));
  const ytLikes = ytDays.map((_, i) => wave(i, 420, 120, 0.5, 2));
  const ytComments = ytDays.map((_, i) => wave(i, 46, 16, 1.7));
  const ytShares = ytDays.map((_, i) => wave(i, 38, 12, 2.9));
  const ytLabels = ytDays;

  const ytKpis = `
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      ${kpi("yt_views", "284.6k", "30d", true)}
      ${kpi("watch_min", "712.9k", "30d", true)}
      ${kpi("subs_net", "+1.6k", "30d", true)}
      ${kpi("engage", "15.6k", "likes+cmts+shares", true)}
    </div>`;

  const ytTrend = L.panel({
    flush: true,
    eyebrow: "youtube · trend",
    title: "Views &amp; watch minutes",
    body: `<div class="h-[280px] p-4">${chart({
      w: 552,
      h: 224,
      legend: true,
      xEvery: 5,
      labels: ytLabels,
      series: [
        { kind: "line", name: "views", tone: "danger", values: ytViews },
        { kind: "line", name: "watchMinutes", tone: "primary", axis: "r", values: ytWatch },
      ],
    })}</div>`,
  });
  const ytSubs = L.panel({
    flush: true,
    eyebrow: "youtube · subscribers",
    title: "Daily subs gained vs lost",
    body: `<div class="h-[280px] p-4">${chart({
      w: 552,
      h: 224,
      band: true,
      legend: true,
      xEvery: 5,
      labels: ytLabels,
      series: [
        { kind: "bar", name: "subsGained", tone: "success", stack: "s", values: ytGained },
        { kind: "bar", name: "subsLost", tone: "danger", stack: "s", values: ytLost },
      ],
    })}</div>`,
  });
  const ytEngage = L.panel({
    flush: true,
    eyebrow: "youtube · engagement",
    title: "Likes · Comments · Shares",
    body: `<div class="h-[280px] p-4">${chart({
      w: 552,
      h: 224,
      legend: true,
      xEvery: 5,
      labels: ytLabels,
      series: [
        { kind: "area", name: "likes", tone: "primary", fillOp: 0.25, values: ytLikes },
        { kind: "line", name: "comments", tone: "success", values: ytComments },
        { kind: "line", name: "shares", tone: "warn", values: ytShares },
      ],
    })}</div>`,
  });
  const ytTraffic = L.panel({
    flush: true,
    eyebrow: "youtube · traffic",
    title: "Traffic sources",
    body: `<div class="h-[280px] p-4">${hbar({
      w: 552,
      h: 248,
      rows: [
        { k: "SUGGESTED", v: 104200 },
        { k: "BROWSE", v: 71800 },
        { k: "YT_SEARCH", v: 48300 },
        { k: "SHORTS", v: 32900 },
        { k: "EXT_URL", v: 14100 },
        { k: "PLAYLIST", v: 8200 },
        { k: "NOTIFICATION", v: 5100 },
      ],
    })}</div>`,
  });

  const demo = [
    { a: "age13-17", m: 0.8, f: 1.4, o: 0.1 },
    { a: "age18-24", m: 6.2, f: 9.8, o: 0.3 },
    { a: "age25-34", m: 13.4, f: 21.7, o: 0.4 },
    { a: "age35-44", m: 9.1, f: 16.2, o: 0.2 },
    { a: "age45-54", m: 4.3, f: 8.6, o: 0.1 },
    { a: "age55-64", m: 2.1, f: 4.2, o: 0 },
    { a: "age65-", m: 0.9, f: 1.9, o: 0 },
  ];
  const ytDemo = L.panel({
    flush: true,
    eyebrow: "youtube · demographics",
    title: "Viewer % by age &amp; gender",
    body: `<div class="h-[260px] p-4">${chart({
      w: 1170,
      h: 204,
      band: true,
      legend: true,
      yFmt: (v) => `${tickText(v)}%`,
      labels: demo.map((d) => d.a),
      series: [
        { kind: "bar", name: "male", tone: "primary", stack: "d", values: demo.map((d) => d.m) },
        { kind: "bar", name: "female", tone: "warn", stack: "d", values: demo.map((d) => d.f) },
        { kind: "bar", name: "other", tone: "muted-foreground", stack: "d", values: demo.map((d) => d.o) },
      ],
    })}</div>`,
  });

  const topVideos = [
    ["Five pantry pastas in 20 minutes", 96400, 248100, 5210, 604, 812],
    ["Brown butter banana bread", 61800, 171300, 3920, 341, 402],
    ["Sourdough starter, day one", 44900, 139800, 2870, 522, 288],
    ["Sheet-pan chicken, three ways", 31200, 84600, 1940, 173, 219],
    ["Weeknight dal", 18700, 52900, 1120, 96, 104],
    ["Summer tomato galette", 12400, 30100, 610, 38, 41],
    ["Holiday stuffing, make-ahead", 5200, 12800, 188, 14, 22],
    ["Cast-iron care in 60 seconds", 4800, 3900, 402, 19, 66],
    ["Market haul: September", 3600, 7400, 214, 21, 9],
    ["Knife skills: the claw grip", 2900, 6100, 131, 12, 7],
  ];
  const ytTop = L.panel({
    flush: true,
    eyebrow: "youtube · top videos",
    title: `Top ${topVideos.length} videos by views`,
    body: `
      <div class="overflow-x-auto">
        <table class="w-full text-[11px] font-mono">
          <thead class="bg-panel-2/60 text-muted-foreground uppercase tracking-widest text-[10px]">
            <tr>
              <th class="text-left px-3 py-2">video</th>
              <th class="text-right px-3 py-2">views</th>
              <th class="text-right px-3 py-2">watch_min</th>
              <th class="text-right px-3 py-2">likes</th>
              <th class="text-right px-3 py-2">comments</th>
              <th class="text-right px-3 py-2">shares</th>
            </tr>
          </thead>
          <tbody>
            ${topVideos
              .map(
                (v) => `
            <tr class="border-t border-border hover:bg-panel-2/40">
              <td class="px-3 py-2 max-w-[420px] truncate"><a href="#" class="text-foreground hover:text-primary">${v[0]}</a></td>
              <td class="px-3 py-2 text-right">${fmt(v[1])}</td>
              <td class="px-3 py-2 text-right">${fmt(v[2])}</td>
              <td class="px-3 py-2 text-right">${fmt(v[3])}</td>
              <td class="px-3 py-2 text-right">${fmt(v[4])}</td>
              <td class="px-3 py-2 text-right">${fmt(v[5])}</td>
            </tr>`,
              )
              .join("")}
          </tbody>
        </table>
      </div>`,
  });

  const youtube = `
    <div class="space-y-4">
      ${ytKpis}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">${ytTrend}${ytSubs}</div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">${ytEngage}${ytTraffic}</div>
      ${ytDemo}
      ${ytTop}
    </div>`;

  return L.page(
    `
    ${header}
    ${filterBar}
    ${freshness}
    ${kpis}
    ${reconciliation}
    ${videoGroups}
    ${postDeltas}
    ${trend}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">${funnel}${revenue}</div>
    ${replyTopics}
    ${youtube}
  `,
    "max-w-[1300px]",
  );
};
