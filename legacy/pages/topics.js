window.LEGACY = window.LEGACY || {};
window.LEGACY["topics"] = () => {
  const themes = [
    { slug: "weeknight-pasta", theme: "Weeknight pasta", kids: 4, demand: 0.91, coverage: 0.38, rev: "high", src: "measured", perf: "6 measured answers · strong" },
    { slug: "sourdough-starter", theme: "Sourdough starter troubleshooting", kids: 4, demand: 0.84, coverage: 0.12, rev: "medium", src: "estimated", perf: "2 measured answers · mixed" },
    { slug: "cast-iron-care", theme: "Cast-iron care", kids: 3, demand: 0.72, coverage: 0.55, rev: "high", src: "measured", perf: "4 measured answers · strong" },
    { slug: "sheet-pan-dinners", theme: "Sheet-pan dinners", kids: 4, demand: 0.66, coverage: 0.41, rev: "medium", src: "estimated", perf: "3 measured answers · mixed" },
    { slug: "baking-substitutions", theme: "Baking substitutions", kids: 3, demand: 0.58, coverage: 0, rev: "medium", src: "estimated", perf: null },
    { slug: "lentils-and-dal", theme: "Lentils & dal", kids: 2, demand: 0.47, coverage: 0.29, rev: "low", src: "estimated", perf: "1 measured answer · weak" },
    { slug: "pantry-stocking", theme: "Pantry stocking on a budget", kids: 3, demand: 0.39, coverage: 0.33, rev: "medium", src: "estimated", perf: null },
    { slug: "seasonal-market", theme: "Seasonal market produce", kids: 2, demand: 0.31, coverage: 0.08, rev: "low", src: "estimated", perf: null },
    { slug: "knife-skills", theme: "Knife skills basics", kids: 0, demand: 0.22, coverage: 0.26, rev: "low", src: "estimated", perf: "2 measured answers · mixed" },
  ];

  const bar = (value, tone) => {
    const pct = Math.max(0, Math.min(1, value)) * 100;
    const color = tone === "gap" ? "bg-primary" : tone === "demand" ? "bg-blue-500/70" : "bg-emerald-500/60";
    return `
      <div class="flex items-center gap-2">
        <div class="h-1.5 w-24 bg-panel-2 rounded-full overflow-hidden">
          <div class="h-full ${color}" style="width: ${pct}%"></div>
        </div>
        <span class="font-mono text-[11px] text-muted-foreground w-10">${value.toFixed(2)}</span>
      </div>`;
  };

  const th = (inner) =>
    `<th class="p-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">${inner}</th>`;

  const rows = themes
    .map((t, idx) => {
      const id = `7c1e4a92-${t.slug}-${idx}`;
      const gap = Math.max(0, t.demand - t.coverage);
      return `
        <tr role="button" tabindex="0" aria-expanded="false" class="hover:bg-panel-2/40 cursor-pointer outline-none focus-visible:bg-panel-2/50">
          <td class="p-3 w-6 text-muted-foreground align-top">
            <span aria-hidden class="inline-block transition-transform text-[10px]">${L.icon("ChevronRight", "h-3 w-3")}</span>
          </td>
          <td class="p-3">
            <div class="flex items-center gap-2">
              <div class="font-medium">${t.theme}</div>
              ${t.kids > 0 ? `<span class="text-[10px] font-mono text-muted-foreground">${t.kids} subtopics</span>` : ""}
              ${
                t.coverage === 0 && t.demand > 0
                  ? `<span class="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-sm bg-primary/10 text-primary ring-1 ring-primary/30">no coverage · draft now</span>`
                  : ""
              }
            </div>
            <div class="text-[10px] font-mono text-muted-foreground">${id}</div>
          </td>
          <td class="p-3">${bar(t.demand, "demand")}</td>
          <td class="p-3">${bar(t.coverage, "coverage")}</td>
          <td class="p-3">${bar(gap, "gap")}</td>
          <td class="p-3 font-mono">
            <div>${t.rev}</div>
            <div class="text-[10px] text-muted-foreground normal-case">${t.src}${t.perf ? ` · ${t.perf}` : ""}</div>
          </td>
        </tr>`;
    })
    .join("");

  return L.page(
    `
    ${L.header({ title: "Topics", info: true })}

    ${L.panel({
      eyebrow: "topic_clusters",
      title: "Coverage graph",
      actions: `
        <div class="flex items-center gap-2">
          ${L.pill("primary", "live · from brand knowledge")}
          <label class="flex items-center gap-1.5 text-[10px] font-mono uppercase text-muted-foreground">
            detail
            <select title="Themes split into up to 4 specific subtopics each." class="bg-panel-2 text-foreground ring-1 ring-border rounded-sm px-1.5 py-1 text-[10px] font-mono">
              <option value="broad">Broad</option>
              <option value="balanced" selected>Balanced</option>
              <option value="granular">Granular</option>
            </select>
          </label>
          <button type="button" title="Re-cluster asks and answers into topics from the latest brand knowledge" class="text-[10px] font-mono px-2.5 py-1 rounded-sm bg-primary/10 text-primary ring-1 ring-primary/30 uppercase hover:bg-primary/20 transition-colors disabled:opacity-60">rebuild topics</button>
        </div>`,
      body: `
        <p class="text-xs text-muted-foreground mb-4">
          Every topic is a cluster of asks (comments / emails) matched against answers (posts /
          videos) already in your Brand Voice &amp; Knowledge base.
        </p>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead>
              <tr class="border-b border-border">
                ${th(`<span class="sr-only">expand</span>`)}
                ${th("topic")}
                ${th(`<span class="inline-flex items-center gap-1">demand ${L.info()}</span>`)}
                ${th(`<span class="inline-flex items-center gap-1">coverage ${L.info()}</span>`)}
                ${th(`<span class="inline-flex items-center gap-1">gap ${L.info()}</span>`)}
                ${th("priority")}
              </tr>
            </thead>
            <tbody class="divide-y divide-border">${rows}</tbody>
          </table>
        </div>`,
    })}
  `,
    "max-w-[1200px]",
  );
};
