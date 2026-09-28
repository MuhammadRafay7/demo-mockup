window.LEGACY = window.LEGACY || {};
window.LEGACY["video-performance"] = () => {
  const fmt = (n) => {
    if (Math.abs(n) >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (Math.abs(n) >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
    return String(Math.round(n));
  };
  const money = (n) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const groups = [
    { t: "Five pantry pastas in 20 minutes", pl: "YouTube · Instagram · Facebook · TikTok", posts: 4, views: 412800, likes: 23100, comments: 1480, shares: 3920, rev: 612.4, first: "2026-09-02" },
    { t: "Summer tomato galette", pl: "YouTube · Instagram · Facebook", posts: 3, views: 318400, likes: 19700, comments: 1120, shares: 2410, rev: 544.18, first: "2025-07-11" },
    { t: "Sheet-pan chicken, three ways", pl: "YouTube · Instagram · TikTok", posts: 3, views: 288400, likes: 16900, comments: 942, shares: 2210, rev: 438.15, first: "2026-09-09" },
    { t: "Cast-iron care in 60 seconds", pl: "Instagram · Facebook · TikTok", posts: 3, views: 241600, likes: 14200, comments: 611, shares: 3380, rev: 128.9, first: "2026-08-30" },
    { t: "Holiday stuffing, make-ahead", pl: "YouTube · Facebook", posts: 2, views: 229700, likes: 9800, comments: 702, shares: 1830, rev: 391.62, first: "2024-11-19" },
    { t: "Pickled red onions, the fast way", pl: "Instagram · TikTok", posts: 2, views: 204300, likes: 13600, comments: 488, shares: 2940, rev: 41.2, first: "2025-11-03" },
    { t: "Brown butter banana bread", pl: "YouTube · Instagram · Facebook · TikTok", posts: 4, views: 196300, likes: 12800, comments: 804, shares: 1720, rev: 341.07, first: "2026-09-16" },
    { t: "Sourdough starter, day one", pl: "YouTube · TikTok", posts: 2, views: 142900, likes: 8700, comments: 1210, shares: 960, rev: 219.33, first: "2026-08-24" },
    { t: "Weeknight dal", pl: "YouTube · Instagram · Facebook", posts: 3, views: 88200, likes: 5100, comments: 392, shares: 540, rev: 154.8, first: "2026-09-20" },
    { t: "Knife skills: the claw grip", pl: "YouTube · TikTok", posts: 2, views: 63900, likes: 3900, comments: 214, shares: 610, rev: 38.55, first: "2026-06-14" },
    { t: "Market haul: September", pl: "Instagram · TikTok", posts: 2, views: 51700, likes: 3300, comments: 188, shares: 270, rev: 22.46, first: "2026-09-23" },
    { t: "Untitled video", pl: "Facebook", posts: 1, views: 4100, likes: 212, comments: 9, shares: 14, rev: 0, first: "2026-05-02" },
  ];

  const rows = groups
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

  const panel = L.panel({
    flush: true,
    eyebrow: "videos · cross-platform",
    title: "Cross-platform video performance",
    actions: `
      <div class="flex items-center gap-2">
        ${L.info()}
        <button title="Re-scan posts to rebuild cross-platform video groupings" class="px-2 py-1 rounded-sm ring-1 ring-border text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground hover:ring-primary/50 disabled:opacity-40 inline-flex items-center gap-1">${L.icon("RefreshCw", "size-3")}regroup</button>
        ${L.pill("success", `${groups.length} videos`)}
      </div>`,
    body: `
      <div class="px-3 py-2 border-b border-border/60 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] font-mono text-muted-foreground">
        <span>grouping ran <span class="text-foreground">2026-09-26</span></span>
        <span>outcome <span class="text-foreground">ok</span></span>
        <span>tracked posts <span class="text-foreground">41</span></span>
        <span>grouped <span class="text-foreground">31</span></span>
        <span>awaiting review <span class="text-foreground">10</span></span>
      </div>
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
          <tbody>${rows}</tbody>
        </table>
      </div>`,
  });

  return L.page(
    `
    ${L.header({ eyebrow: "Functions · videos", title: "Videos", info: true })}
    ${panel}
  `,
    "max-w-[1300px]",
  );
};
