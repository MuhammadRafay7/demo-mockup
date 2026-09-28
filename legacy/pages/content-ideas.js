window.LEGACY = window.LEGACY || {};
window.LEGACY["content-ideas"] = () => {
  const ideas = [
    { summary: "Why is my sourdough starter smelling like nail polish on day four?", at: "Sep 25, 2026, 6:42 PM" },
    { summary: "Five pantry pastas, part two: viewers want a gluten-free version", at: "Sep 24, 2026, 11:08 AM" },
    { summary: "Can I use cast iron on a glass-top stove without scratching it?", at: "Sep 22, 2026, 9:31 PM" },
    { summary: "Brown butter banana bread with oat flour — test batch", at: "Sep 19, 2026, 2:15 PM" },
    { summary: "Sheet-pan chicken for two: halve the recipe without drying it out", at: "Sep 17, 2026, 8:04 AM" },
    { summary: "Weeknight dal in the Instant Pot — timings people keep asking for", at: "Sep 12, 2026, 4:50 PM" },
  ];

  const ideaRows = ideas
    .map(
      (i) => `
      <li class="py-2">
        <button type="button" aria-expanded="false" title="Expand this idea to see details" class="w-full flex items-center gap-2 text-left hover:text-foreground">
          <span class="shrink-0 text-muted-foreground">${L.icon("ChevronRight", "h-3.5 w-3.5")}</span>
          <span class="min-w-0 flex-1 text-xs text-foreground/90 truncate">${i.summary}</span>
          <span class="shrink-0 text-[10px] font-mono text-muted-foreground text-right">${i.at}</span>
        </button>
      </li>`,
    )
    .join("");

  const selectCls = "rounded-sm bg-panel-2 ring-1 ring-border px-2 py-1 text-foreground";

  const gaps = [
    { theme: "Sourdough starter troubleshooting › Hooch and acetone smell", demand: 0.62 },
    { theme: "Baking substitutions › Egg-free banana bread", demand: 0.54 },
    { theme: "Sourdough starter troubleshooting › Starter not rising after feeding", demand: 0.49 },
    { theme: "Baking substitutions › Oat flour swaps", demand: 0.37, rev: "medium" },
    { theme: "Seasonal market produce › What to do with too many zucchini", demand: 0.28 },
  ];

  const gapRows = gaps
    .map(
      (t) => `
      <li class="py-4 first:pt-0 last:pb-0 space-y-3">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <div class="font-medium">${t.theme}</div>
              <span class="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-sm bg-primary/10 text-primary ring-1 ring-primary/30">no coverage · draft now</span>
            </div>
            <div class="text-[11px] font-mono text-muted-foreground">
              demand ${t.demand.toFixed(2)} · coverage 0.00 · gap
              <span class="text-primary">${t.demand.toFixed(2)}</span>${t.rev ? ` · priority ${t.rev} (estimated)` : " · priority medium (estimated)"}
            </div>
          </div>
          <button type="button" title="Generate a WordPress-first draft that answers this topic's gap" class="text-[10px] font-mono px-3 py-1.5 rounded-sm bg-primary/10 text-primary ring-1 ring-primary/30 uppercase hover:bg-primary/20 transition-colors disabled:opacity-60">generate draft</button>
        </div>
      </li>`,
    )
    .join("");

  return L.page(
    `
    ${L.header({
      eyebrow: "Function C",
      title: "Content Ideas",
      info: true,
      actions: L.pill("primary", "next refresh · in 42m"),
    })}

    ${L.panel({
      title: "Saved ideas",
      eyebrow: `Your ideas plus audience questions you flagged as future content · ${ideas.length} ideas`,
      actions: `<button type="button" title="Create a new content idea from scratch" class="px-2.5 py-1 rounded-sm ring-1 text-[10px] font-mono uppercase tracking-widest bg-primary/10 text-primary ring-primary/30 hover:bg-primary/20">+ new idea</button>`,
      body: `
        <div class="flex flex-wrap items-center gap-2 pb-3 text-[10px] font-mono uppercase tracking-widest">
          <select aria-label="Filter by status" class="${selectCls}">
            <option value="open" selected>Open</option>
            <option value="in_progress">In progress</option>
            <option value="done">Done</option>
            <option value="dismissed">Dismissed</option>
            <option value="all">All statuses</option>
          </select>
          <select aria-label="Filter by category" class="${selectCls}">
            <option value="all">All categories</option>
            <option>Recipe</option><option>Explainer</option><option>How-to</option>
            <option>Product</option><option>FAQ</option><option>Story</option>
          </select>
          <select aria-label="Filter by content type" class="${selectCls}">
            <option value="all">All types</option>
            <option>Video</option><option>Blog post</option><option>Short / Reel</option>
            <option>Email</option><option>Podcast</option><option>Social post</option><option>Other</option>
          </select>
        </div>
        <ul class="divide-y divide-border">${ideaRows}</ul>`,
    })}

    <div class="space-y-4">
      ${L.panel({
        eyebrow: "content_gaps",
        title: "Zero-coverage &amp; top gaps",
        actions: L.pill("primary", "live · from brand knowledge"),
        body: `
          <div class="flex items-center justify-between mb-4 gap-3 flex-wrap">
            <p class="text-xs text-muted-foreground">
              ${gaps.length} topics with real audience demand and no published coverage. Generate a WordPress-first draft that answers the clustered questions directly.
            </p>
            <button type="button" title="Also show topics that already have some coverage, ranked by gap" class="text-[10px] font-mono px-2.5 py-1 rounded-sm bg-panel-2 text-muted-foreground ring-1 ring-border uppercase hover:text-foreground transition-colors">include ranked gaps · 17</button>
          </div>
          <ul class="divide-y divide-border">${gapRows}</ul>`,
      })}
    </div>
  `,
    "max-w-[1200px]",
  );
};
