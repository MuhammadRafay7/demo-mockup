window.LEGACY = window.LEGACY || {};
window.LEGACY["tiktok"] = () => {
  const fmt = (n) => (n === 0 ? "0" : n.toLocaleString("en-US"));
  const glyphs = ["▁", "▂", "▃", "▄", "▅", "▆", "▇", "█"];
  const sparkline = (values) => {
    const max = Math.max(...values, 1);
    return values
      .map((v) => glyphs[Math.min(7, Math.max(0, Math.round((v / max) * 7)))])
      .join("");
  };

  const videos = [
    { t: "Five pantry pastas in 20 minutes", d: "2026-09-02", id: "7414820193756204321", v: 181600, wv: 148200, l: 11240, wl: 9120, c: 508, wc: 412, s: 26, ph: 0.2 },
    { t: "Pickled red onions, the fast way", d: "2025-11-03", id: "7433019827465510912", imp: true, v: 229400, wv: 8700, l: 15820, wl: 402, c: 611, wc: 17, s: 30, ph: 3.4 },
    { t: "Cast-iron care in 60 seconds", d: "2026-08-30", id: "7413692057718390018", v: 104200, wv: 82600, l: 6910, wl: 5380, c: 254, wc: 197, s: 29, ph: 0.7 },
    { t: "Sheet-pan chicken, three ways", d: "2026-09-09", id: "7417421930027761920", v: 58400, wv: 58400, l: 3610, wl: 3610, c: 140, wc: 140, s: 18, ph: 1.9 },
    { t: "Brown butter banana bread", d: "2026-09-16", id: "7420018463251109121", v: 41700, wv: 41700, l: 2980, wl: 2980, c: 121, wc: 121, s: 11, ph: 2.6 },
    { t: "Sourdough starter, day one", d: "2026-08-24", id: "7411433802194470146", v: 38200, wv: 21900, l: 2440, wl: 1310, c: 309, wc: 144, s: 30, ph: 1.1 },
    { t: "Market haul: September", d: "2026-09-23", id: "7422611097328455938", v: 16800, wv: 16800, l: 1190, wl: 1190, c: 64, wc: 64, s: 4, ph: 0.9 },
    { t: "Knife skills: the claw grip", d: "2026-06-14", id: "7380562104837129473", imp: true, v: 47300, wv: 1900, l: 2810, wl: 88, c: 97, wc: 3, s: 30, ph: 2.2 },
    { t: "Untitled TikTok post", d: "2026-09-25", id: "7423004418830917890", v: 2100, wv: 2100, l: 144, wl: 144, c: 6, wc: 6, s: 2, ph: 0.4 },
  ];
  videos.sort((a, b) => b.v - a.v);
  const series = (r) => {
    const n = Math.min(30, r.s);
    return Array.from({ length: n }, (_, i) =>
      Math.max(0, (n - i) * 0.7 + 5 * Math.sin(i / 2 + r.ph) + (i < 2 ? 18 : 7)),
    );
  };

  const totals = videos.reduce(
    (a, r) => ({
      v: a.v + r.v,
      l: a.l + r.l,
      c: a.c + r.c,
      wv: a.wv + r.wv,
      wl: a.wl + r.wl,
      wc: a.wc + r.wc,
    }),
    { v: 0, l: 0, c: 0, wv: 0, wl: 0, wc: 0 },
  );
  const engagement = (((totals.l + totals.c) / totals.v) * 100).toFixed(2);

  const header = L.header({
    eyebrow: "analytics · tiktok",
    title: "TikTok analytics",
    info: true,
    actions: `
      <div class="flex items-center gap-1">
        ${[7, 14, 30, 60, 90]
          .map(
            (r) =>
              `<button type="button" title="Change the time window shown for these metrics" class="px-2 py-1 rounded-sm text-[11px] font-mono ring-1 ${
                r === 30
                  ? "bg-primary/10 text-primary ring-primary/30"
                  : "bg-panel-2 text-muted-foreground ring-border hover:text-foreground"
              }">${r}d</button>`,
          )
          .join("")}
      </div>`,
  });

  const cards = [
    { k: "Videos tracked", v: fmt(videos.length), sub: "last 30d activity" },
    { k: "Views", v: fmt(totals.v), sub: `+${fmt(totals.wv)} in window` },
    { k: "Likes", v: fmt(totals.l), sub: `+${fmt(totals.wl)} in window` },
    { k: "Comments", v: fmt(totals.c), sub: `+${fmt(totals.wc)} in window` },
  ];
  const kpis = `
    <div class="grid gap-4 md:grid-cols-4">
      ${cards
        .map(
          (c) => `
      <section class="panel rounded-sm">
        <div class="p-4">
          <div class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">${c.k}</div>
          <div class="text-2xl font-semibold tabular-nums mt-1">${c.v}</div>
          <div class="text-[11px] text-muted-foreground mt-1">${c.sub}</div>
        </div>
      </section>`,
        )
        .join("")}
    </div>`;

  const queue = L.panel({
    collapsible: true,
    open: false,
    flush: true,
    eyebrow: "publishing · scheduled vs published",
    title: "TikTok scheduled vs published",
    actions: `
      <div class="flex items-center gap-1">
        ${[
          ["upcoming", "scheduled 3", true],
          ["published", "published 18", false],
          ["problems", "problems 1", false],
        ]
          .map(
            ([key, lbl, on]) =>
              `<button type="button" title="Show ${key} posts" class="px-1.5 py-0.5 rounded-sm text-[10px] font-mono uppercase ring-1 ${
                on
                  ? "bg-primary/10 text-primary ring-primary/30"
                  : "bg-panel-2 text-muted-foreground ring-border hover:text-foreground"
              }">${lbl}</button>`,
          )
          .join("")}
      </div>`,
    body: "",
  });

  const rows = videos
    .map(
      (r) => `
    <tr class="border-b border-border/60 hover:bg-panel-2/60 cursor-pointer">
      <td class="px-3 py-2 max-w-[22rem]">
        <div class="flex items-center gap-1">
          <span class="text-muted-foreground shrink-0">${L.icon("ChevronRight", "size-3")}</span>
          <span class="truncate">${r.t}</span>
        </div>
        <div class="text-[11px] text-muted-foreground">${r.d}${r.imp ? " · imported" : ""}</div>
      </td>
      <td class="px-3 py-2 font-mono text-[11px]">
        <a href="#" class="text-primary hover:underline">${r.id}</a>
      </td>
      <td class="px-3 py-2 text-right tabular-nums">${fmt(r.v)}<span class="text-[11px] text-muted-foreground ml-1">+${fmt(r.wv)}</span></td>
      <td class="px-3 py-2 text-right tabular-nums">${fmt(r.l)}<span class="text-[11px] text-muted-foreground ml-1">+${fmt(r.wl)}</span></td>
      <td class="px-3 py-2 text-right tabular-nums">${fmt(r.c)}<span class="text-[11px] text-muted-foreground ml-1">+${fmt(r.wc)}</span></td>
      <td class="px-3 py-2 font-mono text-primary/80 text-xs">${sparkline(series(r))}</td>
      <td class="px-3 py-2 text-right tabular-nums text-muted-foreground">${fmt(r.s)}</td>
    </tr>`,
    )
    .join("");

  const table = L.panel({
    flush: true,
    eyebrow: "per-video · views / likes / comments",
    title: "TikTok post performance · last 30d",
    actions: `
      <div class="flex items-center gap-2">
        ${L.pill("success", `engagement ${engagement}%`)}
        <div class="flex items-center gap-1">
          ${[
            ["views", true],
            ["likes", false],
            ["comments", false],
            ["newest", false],
          ]
            .map(
              ([lbl, on]) =>
                `<button type="button" title="Sort the video table by this metric" class="px-1.5 py-0.5 rounded-sm text-[10px] font-mono uppercase ring-1 ${
                  on
                    ? "bg-primary/10 text-primary ring-primary/30"
                    : "bg-panel-2 text-muted-foreground ring-border hover:text-foreground"
                }">${lbl}</button>`,
            )
            .join("")}
        </div>
      </div>`,
    body: `
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground border-b border-border">
              <th class="text-left font-normal px-3 py-2">Video</th>
              <th class="text-left font-normal px-3 py-2">Video ID</th>
              <th class="text-right font-normal px-3 py-2">Views</th>
              <th class="text-right font-normal px-3 py-2">Likes</th>
              <th class="text-right font-normal px-3 py-2">Comments</th>
              <th class="text-left font-normal px-3 py-2">Views / day</th>
              <th class="text-right font-normal px-3 py-2">Snapshots</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`,
  });

  return L.page(
    `
    ${header}
    <div class="space-y-4">
      ${kpis}
      ${queue}
      ${table}
    </div>
  `,
    "",
  );
};
