window.LEGACY = window.LEGACY || {};
window.LEGACY["priors"] = () => {
  const LABELS = {
    youtube: "YouTube",
    facebook: "Facebook",
    instagram: "Instagram",
    tiktok: "TikTok",
    linkedin: "LinkedIn",
    wordpress: "WordPress",
  };
  const label = (p) => LABELS[p] ?? p;
  const money = (n) =>
    `$${n.toLocaleString("en-US", { maximumFractionDigits: n < 100 ? 2 : 0 })}`;
  const score = (n) => n.toFixed(2);
  const deltaChip = (cur, prev) => {
    let text;
    let tone;
    if (prev <= 0) {
      text = cur > 0 ? "new" : "—";
      tone = cur > 0 ? "up" : "flat";
    } else {
      const pct = ((cur - prev) / prev) * 100;
      text = `${pct >= 0 ? "+" : ""}${pct.toFixed(0)}%`;
      tone = pct >= 2 ? "up" : pct <= -2 ? "down" : "flat";
    }
    const cls = tone === "up" ? "text-success" : tone === "down" ? "text-danger" : "text-muted-foreground";
    return `<span class="font-mono text-[10px] ${cls}">${text}</span>`;
  };

  const rows = [
    { topic: "Quick weeknight pasta", platform: "tiktok", posts: 9, pp: 6, cs: 0.82, cps: 0.71, cr: 412.6, ss: 0.44, sps: 0.47, sr: 188.2 },
    { topic: "Quick weeknight pasta", platform: "youtube", posts: 4, pp: 3, cs: 0.78, cps: 0.62, cr: 684.1, ss: 0.51, sps: 0.43, sr: 261.4 },
    { topic: "Sheet-pan dinners", platform: "instagram", posts: 7, pp: 7, cs: 0.74, cps: 0.76, cr: 208.9, ss: 0.39, sps: 0.36, sr: 142.7 },
    { topic: "Baking basics", platform: "youtube", posts: 5, pp: 4, cs: 0.71, cps: 0.58, cr: 522.3, ss: 0.62, sps: 0.49, sr: 318.5 },
    { topic: "Cast-iron & kitchen care", platform: "tiktok", posts: 6, pp: 2, cs: 0.69, cps: 0.54, cr: 98.4, ss: 0.21, sps: 0.19, sr: 34.1 },
    { topic: "Sourdough", platform: "youtube", posts: 3, pp: 0, cs: 0.66, cps: 0, cr: 301.7, ss: 0.58, sps: 0, sr: 207.9 },
    { topic: "Baking basics", platform: "instagram", posts: 6, pp: 5, cs: 0.61, cps: 0.64, cr: 144.2, ss: 0.47, sps: 0.41, sr: 176.3 },
    { topic: "Sheet-pan dinners", platform: "facebook", posts: 5, pp: 6, cs: 0.57, cps: 0.6, cr: 86.3, ss: 0.33, sps: 0.35, sr: 94.8 },
    { topic: "Market & seasonal", platform: "instagram", posts: 4, pp: 3, cs: 0.52, cps: 0.49, cr: 41.9, ss: 0.28, sps: 0.31, sr: 22.6 },
    { topic: "Recipe roundups", platform: "wordpress", posts: 6, pp: 5, cs: 0.49, cps: 0.44, cr: 0, ss: 0.73, sps: 0.66, sr: 612.4 },
    { topic: "Weeknight dal & curries", platform: "youtube", posts: 2, pp: 1, cs: 0.46, cps: 0.51, cr: 154.8, ss: 0.38, sps: 0.4, sr: 71.2 },
    { topic: "Quick weeknight pasta", platform: "facebook", posts: 3, pp: 4, cs: 0.42, cps: 0.5, cr: 52.7, ss: 0.29, sps: 0.33, sr: 48.9 },
    { topic: "Kitchen tools & gear", platform: "linkedin", posts: 2, pp: 2, cs: 0.21, cps: 0.24, cr: 0, ss: 0.18, sps: 0.2, sr: 12.4 },
  ];
  const platforms = [...new Set(rows.map((r) => r.platform))].sort();
  const topics = [...new Set(rows.map((r) => r.topic))].sort((a, b) => a.localeCompare(b));

  const chip = (text, active = false, extra = "uppercase tracking-widest") =>
    `<button class="rounded-sm ring-1 px-2 py-1 text-[10px] font-mono ${extra} ${
      active ? "ring-primary/60 bg-primary/15 text-primary" : "ring-border text-muted-foreground hover:text-foreground"
    }">${text}</button>`;

  const header = L.header({
    eyebrow: "Function D · priors",
    title: "Priors vs Performance",
    info: true,
    actions: `
      <div class="flex items-center gap-2">
        <div class="flex rounded-sm ring-1 ring-border overflow-hidden">
          ${[30, 60, 90, 180]
            .map(
              (r) =>
                `<button title="Change the lookback window for this chart" class="px-2 py-1 text-[10px] font-mono uppercase tracking-widest ${
                  r === 90 ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"
                }">${r}d</button>`,
            )
            .join("")}
        </div>
        ${L.pill("success", `${rows.length} slices`)}
      </div>`,
  });

  const objectives = `
    <div class="flex flex-wrap gap-2">
      <button title="Score priors against this objective" class="text-left rounded-sm ring-1 px-3 py-2 transition-colors ring-primary/60 bg-primary/10">
        <div class="text-[11px] font-mono uppercase tracking-widest text-primary">Creator revenue</div>
        <div class="text-[10px] font-mono text-muted-foreground">platform payouts — watch duration, completion, advertiser-safe copy</div>
      </button>
      <button title="Score priors against this objective" class="text-left rounded-sm ring-1 px-3 py-2 transition-colors ring-border hover:ring-primary/40">
        <div class="text-[11px] font-mono uppercase tracking-widest text-foreground">Site revenue</div>
        <div class="text-[10px] font-mono text-muted-foreground">off-platform purchases — click-through, single clear CTA</div>
      </button>
    </div>`;

  const filters = L.panel({
    eyebrow: "filters",
    title: "Narrow the cohort",
    body: `
      <div class="space-y-4">
        <div class="space-y-2">
          <div class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">publish age</div>
          <div class="flex flex-wrap gap-1.5">
            ${["any age", "0–7d", "7–30d", "30–90d", "90d+"].map((a, i) => chip(a, i === 0)).join("")}
          </div>
        </div>
        <div class="space-y-2">
          <div class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">target platform </div>
          <div class="flex flex-wrap gap-1.5">
            ${platforms.map((p) => chip(label(p))).join("")}
          </div>
        </div>
        <div class="space-y-2">
          <div class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">topic </div>
          <div class="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
            ${topics.map((t) => chip(t, false, "max-w-[240px] truncate")).join("")}
          </div>
        </div>
      </div>`,
  });

  let cur = 0;
  let prev = 0;
  let w = 0;
  let pw = 0;
  let rev = 0;
  let posts = 0;
  for (const r of rows) {
    cur += r.cs * r.posts;
    w += r.posts;
    prev += r.cps * r.pp;
    pw += r.pp;
    rev += r.cr;
    posts += r.posts;
  }
  const summaryCards = [
    { k: "objective score", v: score(cur / w), d: deltaChip(cur / w, prev / pw) },
    { k: "creator revenue", v: money(rev), d: deltaChip(rev, 2231.4) },
    { k: "measured posts", v: String(posts), d: "" },
    { k: "slices", v: String(rows.length), d: "" },
  ];
  const summary = `
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      ${summaryCards
        .map(
          (c) => `
      <div class="rounded-sm ring-1 ring-border p-3">
        <div class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">${c.k}</div>
        <div class="text-lg font-mono text-foreground">${c.v}</div>
        ${c.d}
      </div>`,
        )
        .join("")}
    </div>`;

  const chartSvg = (() => {
    const data = rows.slice(0, 10).map((r) => ({
      name: `${r.topic.slice(0, 22)} · ${label(r.platform)}`,
      previous: r.cps,
      current: r.cs,
    }));
    const W = 1200;
    const H = 296;
    const Lx = 64;
    const R = W - 8;
    const T = 8;
    const B = H - 78;
    const yMax = 1;
    const y = (v) => B - (v / yMax) * (B - T);
    const bw = (R - Lx) / data.length;
    let out = "";
    for (const t of [0, 0.25, 0.5, 0.75, 1]) {
      out += `<line x1="${Lx}" x2="${R}" y1="${y(t)}" y2="${y(t)}" class="stroke-border" />`;
      out += `<text x="${Lx - 6}" y="${y(t) + 3}" text-anchor="end" font-size="9" class="fill-muted-foreground">${t}</text>`;
    }
    out += `<line x1="${Lx}" x2="${Lx}" y1="${T}" y2="${B}" class="stroke-muted-foreground" stroke-opacity="0.6" />`;
    out += `<line x1="${Lx}" x2="${R}" y1="${B}" y2="${B}" class="stroke-muted-foreground" stroke-opacity="0.6" />`;
    data.forEach((d, i) => {
      const cx = Lx + bw * (i + 0.5);
      const slot = (bw * 0.8 - 4) / 2;
      const x0 = cx - bw * 0.4;
      out += `<rect x="${x0}" y="${y(d.previous)}" width="${slot}" height="${B - y(d.previous)}" class="fill-muted-foreground" />`;
      out += `<rect x="${x0 + slot + 4}" y="${y(d.current)}" width="${slot}" height="${B - y(d.current)}" class="fill-primary" />`;
      out += `<text x="${cx}" y="${B + 12}" text-anchor="end" font-size="9" class="fill-muted-foreground" transform="rotate(-30 ${cx} ${B + 12})">${d.name.replace(/&/g, "&amp;")}</text>`;
    });
    return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" class="w-full flex-1 min-h-0">${out}</svg>`;
  })();

  const chart = L.panel({
    eyebrow: "trend",
    title: "Objective score by slice — Creator revenue",
    body: `
      <div class="h-[320px]">
        <div class="h-full flex flex-col">
          ${chartSvg}
          <div class="flex justify-center gap-3 pt-1 text-[10px] shrink-0">
            <span class="inline-flex items-center gap-1 text-muted-foreground"><span class="inline-block size-2.5 bg-muted-foreground"></span>previous window</span>
            <span class="inline-flex items-center gap-1 text-primary"><span class="inline-block size-2.5 bg-primary"></span>current window</span>
          </div>
        </div>
      </div>`,
  });

  const detail = L.panel({
    flush: true,
    eyebrow: "topic × platform",
    title: "Slice detail",
    body: `
      <div class="overflow-x-auto">
        <table class="w-full text-[11px] font-mono">
          <thead class="text-muted-foreground">
            <tr class="border-b border-border">
              <th class="text-left px-3 py-2">Topic</th>
              <th class="text-left px-3 py-2">Platform</th>
              <th class="text-right px-3 py-2">Posts</th>
              <th class="text-right px-3 py-2">Creator score</th>
              <th class="text-right px-3 py-2">Creator rev</th>
              <th class="text-right px-3 py-2">Site score</th>
              <th class="text-right px-3 py-2">Site rev</th>
            </tr>
          </thead>
          <tbody>
            ${rows
              .map(
                (r) => `
            <tr class="border-b border-border/50 hover:bg-muted/30">
              <td class="px-3 py-2 max-w-[280px] truncate text-foreground">${r.topic}</td>
              <td class="px-3 py-2">${label(r.platform)}</td>
              <td class="px-3 py-2 text-right">${r.posts} ${deltaChip(r.posts, r.pp)}</td>
              <td class="px-3 py-2 text-right">${score(r.cs)} ${deltaChip(r.cs, r.cps)}</td>
              <td class="px-3 py-2 text-right">${money(r.cr)}</td>
              <td class="px-3 py-2 text-right">${score(r.ss)} ${deltaChip(r.ss, r.sps)}</td>
              <td class="px-3 py-2 text-right">${money(r.sr)}</td>
            </tr>`,
              )
              .join("")}
          </tbody>
        </table>
      </div>`,
  });

  const priors = [
    {
      platform: "tiktok",
      scopes: [
        { scope: "brand", n: 38, summary: "Short, hands-first openers hold viewers past the 3-second mark; full-recipe cuts under 45s complete best.", lessons: ["open on the finished dish, then rewind", "keep on-screen text under 8 words", "avoid brand names in the first caption line"] },
        { scope: "vertical", n: 1240, summary: "Food creators see payouts track completion rate more than raw views.", lessons: ["loop the final plating shot", "one technique per video"] },
      ],
    },
    {
      platform: "youtube",
      scopes: [
        { scope: "brand", n: 24, summary: "Long-form (8–12 min) weeknight recipes earn the most per view; pantry framing lifts CTR.", lessons: ["title with time + ingredient count", "chapter markers at each step", "mid-roll after the first taste"] },
        { scope: "topic", n: 9, summary: "Baking content keeps viewers longer but earns less per 1k views than dinners.", lessons: ["pair bakes with a dinner in the same week"] },
        { scope: "global", n: 18400, summary: "Advertiser-safe copy and steady upload cadence correlate with higher RPM.", lessons: ["avoid alcohol in thumbnails", "post Tue–Thu mornings"] },
      ],
    },
    {
      platform: "instagram",
      scopes: [
        { scope: "brand", n: 31, summary: "Carousel recipes save well but Reels drive the bonus payouts.", lessons: ["reel first, carousel as follow-up", "cover frame shows the pan, not a face"] },
      ],
    },
    {
      platform: "facebook",
      scopes: [
        { scope: "brand", n: 17, summary: "Older audience responds to slower pacing and spoken instructions.", lessons: ["voice-over every step", "3–5 minute cuts"] },
      ],
    },
  ];
  const evidence = L.panel({
    eyebrow: "learned priors",
    title: "Prior evidence — Creator revenue",
    body: `
      <div class="grid gap-3 md:grid-cols-2">
        ${priors
          .map(
            (p) => `
        <div class="rounded-sm ring-1 ring-border p-3 space-y-2">
          <div class="flex items-center justify-between">
            <div class="text-[11px] font-mono uppercase tracking-widest text-primary">${label(p.platform)}</div>
            ${L.pill("muted", `${p.scopes.length} scopes`)}
          </div>
          ${p.scopes
            .map(
              (s) => `
          <div class="space-y-1">
            <div class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">${s.scope} · n=${s.n}</div>
            <div class="text-[11px] text-foreground/80">${s.summary}</div>
            <ul class="space-y-0.5">
              ${s.lessons.map((l) => `<li class="text-[10px] font-mono text-muted-foreground">• ${l}</li>`).join("")}
            </ul>
          </div>`,
            )
            .join("")}
        </div>`,
          )
          .join("")}
      </div>`,
  });

  return L.page(
    `
    ${header}
    ${objectives}
    ${filters}
    ${summary}
    ${chart}
    ${detail}
    ${evidence}
  `,
    "max-w-[1300px]",
  );
};
