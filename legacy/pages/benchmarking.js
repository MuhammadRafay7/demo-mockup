window.LEGACY = window.LEGACY || {};
window.LEGACY["benchmarking"] = () => {
  const targets = [
    { prefix: "", identifier: "smittenkitchen", kind: "Facebook Page" },
    { prefix: "@", identifier: "halfbakedharvest", kind: "Instagram business account" },
    { prefix: "@", identifier: "budgetbytes", kind: "Instagram business account" },
    { prefix: "#", identifier: "weeknightdinner", kind: "Instagram hashtag" },
  ];

  const targetRows = targets
    .map(
      (t) => `
      <div class="p-4 flex items-center justify-between gap-4">
        <div class="min-w-0">
          <div class="text-sm truncate">${t.prefix}${t.identifier}</div>
          <div class="mt-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">${t.kind}</div>
        </div>
        <button title="Stop tracking this competitor" class="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-sm ring-1 ring-border hover:bg-panel-2 shrink-0">remove</button>
      </div>`,
    )
    .join("");

  const rows = [
    { label: "Northwind Kitchen", self: true, posts: 48, ppw: 3.7, avg: 214, med: 162, mix: "video 58% · photo 31% · text 11%" },
    { label: "@northwindkitchen", self: true, posts: 50, ppw: 3.9, avg: 486, med: 311, mix: "reels 62% · carousel_album 24% · image 14%" },
    {
      label: "smittenkitchen",
      platform: "facebook",
      error:
        "Graph refused this Page's feed. Before approval, Page Public Content Access only reaches Pages whose admin also holds an admin, developer or tester role on the Meta app — check App Roles for that person. Any other Page needs PPCA approved for live mode.",
    },
    { label: "@halfbakedharvest", platform: "instagram", posts: 50, ppw: 6.2, avg: 18430, med: 12904, mix: "reels 48% · carousel_album 40% · image 12%" },
    { label: "@budgetbytes", platform: "instagram", posts: 50, ppw: 5.1, avg: 3112, med: 2260, mix: "reels 71% · image 18% · carousel_album 11%" },
    { label: "#weeknightdinner", platform: "instagram", posts: 50, ppw: 212.4, avg: 941, med: 188, mix: "reels 55% · image 30% · carousel_album 15%" },
  ];

  const tableRows = rows
    .map(
      (r) => `
      <tr${r.self ? ` class="bg-panel-2/50"` : ""}>
        <td class="p-3">
          <div class="truncate max-w-[220px]">${r.label}</div>
          ${r.error ? `<div class="mt-1 max-w-[320px] text-[11px] leading-snug text-danger">${r.error}</div>` : ""}
        </td>
        <td class="p-3">${r.self ? L.pill("success", "this brand") : L.pill("muted", r.platform)}</td>
        <td class="p-3 text-right font-mono">${r.posts ?? "—"}</td>
        <td class="p-3 text-right font-mono">${r.ppw ?? "—"}</td>
        <td class="p-3 text-right font-mono">${r.avg ?? "—"}</td>
        <td class="p-3 text-right font-mono">${r.med ?? "—"}</td>
        <td class="p-3 text-[11px] font-mono">${r.mix ?? "—"}</td>
      </tr>`,
    )
    .join("");

  return L.page(
    `
    ${L.header({ eyebrow: "Analysis", title: "Competitor Benchmarking", info: true })}

    ${L.panel({
      title: "Tracked competitors",
      body: `
        <div class="divide-y divide-border">${targetRows}</div>
        <div class="p-4 border-t border-border grid grid-cols-1 md:grid-cols-4 gap-3">
          <select class="bg-panel-2 ring-1 ring-border rounded-sm px-3 py-2 text-sm focus:ring-primary focus:outline-none">
            <option value="page" selected>Facebook Page</option>
            <option value="ig_account">Instagram business account</option>
            <option value="hashtag">Instagram hashtag</option>
          </select>
          <input placeholder="Facebook Page name or ID (e.g. californiaavocados)" class="md:col-span-2 bg-panel-2 ring-1 ring-border rounded-sm px-3 py-2 text-sm focus:ring-primary focus:outline-none" />
          <button disabled title="Add this account or hashtag to the tracked competitors" class="text-[10px] font-mono uppercase tracking-widest px-2 py-2 rounded-sm ring-1 ring-border hover:bg-panel-2 disabled:opacity-50">add competitor</button>
        </div>`,
    })}

    ${L.panel({
      title: "Cadence &amp; engagement comparison",
      body: `
        <div class="p-4 flex items-center justify-between gap-4">
          <div class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">aggregates only · nothing stored</div>
          <button title="Reload the competitor comparison data" class="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-sm ring-1 ring-border hover:bg-panel-2">refresh</button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                <th class="text-left p-3">account</th>
                <th class="text-left p-3">type</th>
                <th class="text-right p-3">posts read</th>
                <th class="text-right p-3">posts / week</th>
                <th class="text-right p-3">avg engagement</th>
                <th class="text-right p-3">median</th>
                <th class="text-left p-3">format mix</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">${tableRows}</tbody>
          </table>
        </div>
        <div class="p-4 border-t border-border text-xs text-muted-foreground">
          Public fields only, aggregated in memory. No third-party post, comment, commenter or follower record is stored by Octaneon.
        </div>`,
    })}
  `,
    "max-w-6xl",
  );
};
