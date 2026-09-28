window.LEGACY = window.LEGACY || {};
window.LEGACY["thumbnail-audit"] = () => {
  const btnBase =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";
  const outlineSm = `${btnBase} border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs`;
  const defaultSm = `${btnBase} bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 rounded-md px-3 text-xs`;
  const checkbox = `<button type="button" role="checkbox" aria-checked="false" data-state="unchecked" class="grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground bg-background"></button>`;

  const filters = ["All videos", "Custom cover", "YouTube frame", "Unknown"];
  const sorts = ["Newest first", "Oldest first", "Title A–Z", "Highest CTR", "Lowest CTR"];

  const cards = [
    { t: "Five pantry pastas in 20 minutes", d: "Sep 23, 2026", ctr: "CTR 6.8%", cover: "custom", count: 4, state: "attached" },
    { t: "Sourdough starter, day one", d: "Sep 19, 2026", ctr: "CTR 4.1%", cover: "frame", count: 4, state: "review" },
    { t: "Cast-iron care in 60 seconds", d: "Sep 16, 2026", ctr: "CTR —", cover: "short", count: 4, state: "selected-short" },
    { t: "Sheet-pan chicken, three ways", d: "Sep 12, 2026", ctr: "CTR 5.2%", cover: "custom", count: 4, state: "selected" },
    { t: "Brown butter banana bread", d: "Sep 8, 2026", ctr: "CTR 3.6%", cover: "frame", count: 0, state: "genError" },
    { t: "Weeknight dal", d: "Sep 4, 2026", ctr: "CTR 4.9%", cover: "custom", count: 0, state: "" },
    { t: "Market haul: September", d: "Sep 1, 2026", ctr: "CTR 2.7%", cover: "unknown", count: 0, state: "building" },
    { t: "Lemon-garlic spaghetti", d: "Aug 28, 2026", ctr: "CTR 5.5%", cover: "custom", count: 4, state: "deployError" },
  ];

  const coverPill = (c) =>
    c === "short"
      ? L.pill("warn", "Shorts · set cover in Studio")
      : c === "custom"
        ? L.pill("success", "custom cover")
        : c === "frame"
          ? L.pill("danger", "YouTube frame")
          : L.pill("warn", "unknown");

  const studioLinks = `
    <div class="flex items-center justify-end gap-3 text-[11px]">
      <a href="#" class="inline-flex items-center gap-1 text-primary hover:underline">${L.icon("Download", "size-3")} Download cover</a>
      <a href="#" class="inline-flex items-center gap-1 text-primary hover:underline">YouTube Studio ${L.icon("ExternalLink", "size-3")}</a>
    </div>`;

  const card = (v) => {
    const chosen = v.state === "attached" || v.state === "selected" || v.state === "selected-short";
    const ready = v.count > 0 && !chosen;
    const isShort = v.cover === "short";
    return `
    <div role="button" tabindex="0" title="Review this video's covers" class="space-y-2 rounded-sm border border-border bg-panel-2/40 p-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary">
      <div class="relative aspect-video overflow-hidden rounded-sm bg-muted">
        <div class="grid h-full w-full place-content-center text-muted-foreground/50">${L.icon("Image", "size-8")}</div>
        <div class="absolute left-1.5 top-1.5">${checkbox}</div>
        ${v.state === "building" ? `<div class="absolute bottom-1.5 right-1.5">${L.pill("warn", "building…")}</div>` : ""}
      </div>
      <div class="space-y-1">
        <div class="line-clamp-2 text-xs font-medium">${v.t}</div>
        <div class="font-mono text-[10px] text-muted-foreground">${v.d} · ${v.ctr}</div>
        <div class="flex flex-wrap items-center gap-1">
          ${coverPill(v.cover)}
          ${ready ? L.pill("warn", `${v.count} new covers — review`) : v.count > 0 ? L.pill("muted", `${v.count} options`) : ""}
          ${
            v.state === "attached"
              ? `<span class="inline-flex items-center gap-1 text-[10px] text-success">${L.icon("CheckCircle2", "size-3")} deployed</span>`
              : v.state === "selected"
                ? L.pill("muted", "cover chosen — deploy")
                : v.state === "selected-short"
                  ? L.pill("muted", "cover chosen · download")
                  : ""
          }
        </div>
        <button class="${ready ? defaultSm : outlineSm} h-7 w-full text-[10px]">${L.icon("Eye", "mr-1 size-3")}${v.count > 0 ? `Review covers (${v.count})` : "Review covers"}</button>
        ${isShort ? studioLinks : ""}
        ${
          v.state === "genError"
            ? `<div class="space-y-1 border-t border-danger/30 pt-2 text-[10px] text-danger">
                <div class="flex items-center gap-1 font-medium">${L.icon("AlertCircle", "size-3")} Generation failed</div>
                <div class="line-clamp-2">The image model returned no usable cover for this video. Try again or pick a different hook.</div>
                <button class="${outlineSm} h-7 text-[10px]">${L.icon("RefreshCw", "mr-1 size-3")}Retry generation</button>
              </div>`
            : ""
        }
        ${
          v.state === "deployError"
            ? `<div class="space-y-1 border-t border-danger/30 pt-2 text-[10px] text-danger">
                <div class="flex items-center gap-1 font-medium">${L.icon("AlertCircle", "size-3")} Deploy failed</div>
                <div class="line-clamp-2">YouTube did not confirm the new cover within 2 minutes.</div>
                <button class="${outlineSm} h-7 text-[10px]">${L.icon("UploadCloud", "mr-1 size-3")}Retry deploy</button>
              </div>`
            : ""
        }
      </div>
    </div>`;
  };

  return L.page(
    `
  ${L.header({
    eyebrow: "module · thumbnail audit",
    title: "Thumbnail Audit",
    info: true,
    actions: `
      <div class="flex flex-wrap gap-2">
        <a href="#" class="${outlineSm}">${L.icon("History", "mr-1.5 size-3.5")}Batch history</a>
        <button class="${outlineSm}">${L.icon("RefreshCw", "mr-1.5 size-3.5")}Refresh</button>
      </div>`,
  })}

  <div class="panel space-y-2 p-3">
    <div class="flex flex-wrap items-center justify-between gap-2 text-xs">
      <div class="flex items-center gap-2">
        ${L.pill("success", "complete")}
        <span class="text-muted-foreground">12 of 12 processed · 0 remaining · 1 need attention</span>
      </div>
      <span class="text-[11px] text-muted-foreground">Finished. A summary email was sent to whoever started the batch.</span>
    </div>
    <div class="h-1.5 w-full overflow-hidden rounded-full bg-muted">
      <div class="h-full rounded-full bg-primary transition-all" style="width: 100%"></div>
    </div>
  </div>

  <div class="panel flex flex-wrap items-center gap-2 p-3">
    <div class="flex flex-wrap gap-1">
      ${filters
        .map(
          (f, i) =>
            `<button type="button" class="rounded-sm border px-2.5 py-1 text-[11px] ${
              i === 0 ? "border-primary text-primary" : "border-border text-muted-foreground hover:text-foreground"
            }">${f}</button>`,
        )
        .join("")}
    </div>
    <select aria-label="Sort thumbnails" class="rounded-sm border border-border bg-background px-2 py-1 text-[11px]">
      ${sorts.map((s) => `<option>${s}</option>`).join("")}
    </select>
    <div class="relative min-w-[180px] flex-1">
      <input placeholder="Search title or video id" class="w-full rounded-sm border border-border bg-background px-2 py-1 pr-7 text-[11px]" />
    </div>
    <div class="ml-auto flex flex-wrap items-center gap-2">
      <span class="text-[11px] text-muted-foreground">0 selected</span>
      <button disabled class="${outlineSm}">${L.icon("Sparkles", "mr-1.5 size-3.5")}Generate 4 covers</button>
      <button disabled class="${outlineSm}">${L.icon("UploadCloud", "mr-1.5 size-3.5")}Deploy selected</button>
    </div>
  </div>

  ${L.panel({
    title: "Channel covers",
    flush: true,
    body: `<div class="grid gap-3 p-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">${cards.map(card).join("")}</div>`,
  })}
`,
    "",
  );
};
