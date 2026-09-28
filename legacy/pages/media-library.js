window.LEGACY = window.LEGACY || {};
window.LEGACY["media-library"] = () => {
  const label = "text-[10px] font-mono uppercase tracking-widest text-muted-foreground";
  const stat = (l, v, h) => `
    <div class="panel p-3">
      <div class="${label}">${l}</div>
      <div class="mt-1 text-lg font-semibold tabular-nums">${v}</div>
      <div class="text-[11px] text-muted-foreground">${h}</div>
    </div>`;
  const chip = (text, active = false) => `
    <button type="button" class="rounded border px-2 py-1 text-[11px] transition-colors ${
      active
        ? "border-primary/60 bg-primary/15 text-foreground"
        : "border-border/60 bg-muted/20 text-muted-foreground hover:text-foreground"
    }">${text}</button>`;

  const syncSources = [
    ["WordPress media", 1284],
    ["WordPress post image", 412],
    ["Instagram", 0],
    ["Facebook", 236],
    ["YouTube thumbnail", 188],
    ["Image Flow", 64],
  ];
  const statuses = [
    "Not identified",
    "Identifying",
    "Identified",
    "Needs review",
    "Approved",
    "Rejected",
    "Failed",
    "Not an image",
  ];
  const sourceLabels = [
    "Direct upload",
    "WordPress media",
    "WordPress post image",
    "Instagram",
    "Facebook",
    "YouTube thumbnail",
    "Image Flow",
    "Video still",
  ];

  const tiles = [
    ["pantry-pasta-hero-1920.jpg", "Identified", "text-success", "97%", "WordPress media", "Master copy · 3 other versions share this reading"],
    ["sourdough-starter-day-one.jpg", "Needs review", "text-warn", "81%", "WordPress post image", ""],
    ["cast-iron-care-thumb.jpg", "Identified", "text-success", "96%", "YouTube thumbnail", ""],
    ["sheet-pan-chicken-overhead.jpg", "Approved", "text-success", "99%", "WordPress media", ""],
    ["brown-butter-banana-bread-slice.jpg", "Needs review", "text-warn", "88%", "Facebook", ""],
    ["weeknight-dal-bowl-1200x800.jpg", "Identified", "text-success", "95%", "WordPress media", "Another version of a picture already identified"],
    ["market-haul-september-01.jpg", "Not identified", "text-muted-foreground", "", "Direct upload", ""],
    ["market-haul-september-02.jpg", "Not identified", "text-muted-foreground", "", "Direct upload", ""],
    ["pantry-pasta-hero-768.jpg", "Identified", "text-success", "97%", "WordPress media", "Another version of a picture already identified"],
    ["sourdough-crumb-closeup.jpg", "Needs review", "text-warn", "76%", "Image Flow", ""],
    ["cast-iron-seasoning-step-3.jpg", "Identified", "text-success", "98%", "WordPress post image", ""],
    ["northwind-logo-stacked.png", "Rejected", "text-danger", "62%", "Direct upload", "Excluded — not identified or in knowledge"],
  ];

  const tile = ([name, status, tone, conf, source, extra], i) => `
    <button type="button" title="Select this file to view and edit its details" class="group relative overflow-hidden rounded border text-left transition-colors border-border/60 hover:border-primary/40 ${extra.startsWith("Excluded") ? "opacity-60" : ""}">
      <span role="checkbox" class="absolute left-1.5 top-1.5 z-10 flex h-4 w-4 items-center justify-center rounded border text-[10px] border-border/80 bg-background/80"></span>
      <div class="aspect-square bg-muted/30">
        ${
          i === 7
            ? `<div class="flex h-full flex-col items-center justify-center gap-1 px-2 text-center text-[10px] text-muted-foreground">
                <span class="text-amber-400">preview unavailable</span>
                <span class="leading-tight">the original link expired — re-sync to restore it</span>
                <span role="button" class="mt-1 inline-flex items-center gap-1 rounded border border-amber-500/50 px-2 py-0.5 text-[10px] text-amber-300 transition-colors hover:bg-amber-500/10">Re-sync</span>
              </div>`
            : `<div class="flex h-full w-full items-center justify-center text-muted-foreground/50">${L.icon("Image", "size-8")}</div>`
        }
      </div>
      <div class="space-y-0.5 p-2">
        <div class="truncate text-[11px]">${name}</div>
        <div class="text-[10px] ${tone}">${status}${conf ? ` · ${conf}` : ""}</div>
        <div class="truncate text-[10px] text-muted-foreground">${source}</div>
        ${extra ? `<div class="text-[10px] text-muted-foreground">${extra}</div>` : ""}
      </div>
    </button>`;

  const glossary = [
    ["Northwind Kitchen", "product", "The brand name — always two words, never NW Kitchen."],
    ["Alex Kim", "person", "Founder and on-camera host; usually in a green apron."],
    ["Sam Rivera", "person", "Co-host and food stylist."],
    ["Lodge 12-inch skillet", "product", "The black cast-iron pan in most overhead shots."],
    ["pantry pasta", "phrasing", "Lowercase series name, not “store-cupboard pasta”."],
    ["cheap", "banned", "Say “budget-friendly” instead."],
  ];

  return `
<div class="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
  <header class="space-y-1">
    <div class="${label}">module · media library</div>
    <h1 class="text-xl font-semibold">Media Library</h1>
    <p class="max-w-3xl text-sm text-muted-foreground">One library for every image your brand has — WordPress media, images already pulled in from connected platforms, and direct uploads — identified by AI, corrected by you, and getting better every batch.</p>
  </header>

  <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
    ${stat("files", "2,184", "1,512 in brand knowledge")}
    ${stat("identified", "1,796", "84% accepted without review")}
    ${stat("needs review", "143", "below your confidence bar")}
    ${stat("accuracy", "91%", "318 reviewed · 29 corrected")}
    ${stat("avg confidence", "93%", "edited at 82% · kept at 96%")}
  </div>

  <div class="panel space-y-3 p-4">
    <div class="${label}">collect</div>
    <div class="flex flex-wrap gap-2">
      <button type="button" title="Sync media from every connected source now" class="rounded border border-primary/50 bg-primary/10 px-2.5 py-1.5 text-xs font-medium hover:border-primary disabled:opacity-50">Sync all connections</button>
      ${syncSources
        .map(
          ([s, n]) => `<button type="button" title="Sync media from this source now" class="rounded border border-border/60 bg-muted/20 px-2.5 py-1.5 text-xs hover:border-primary/50 disabled:opacity-50">Sync ${s}${n ? `<span class="ml-1 text-muted-foreground">(${n})</span>` : ""}</button>`,
        )
        .join("")}
    </div>
    <div class="flex flex-wrap items-center gap-3 border-t border-border/40 pt-3">
      <input type="file" accept="image/*" multiple class="block max-w-xs text-sm" />
      <button type="button" class="rounded border border-primary/50 bg-primary/15 px-3 py-1.5 text-xs disabled:opacity-50">Identify next batch (24)</button>
      <button type="button" class="rounded border border-border/60 px-3 py-1.5 text-xs hover:border-primary/50 disabled:opacity-50">Start training session</button>
      <button type="button" class="rounded border border-border/60 px-3 py-1.5 text-xs hover:border-primary/50 disabled:opacity-50">Group variants</button>
    </div>
    <p class="text-xs text-muted-foreground">Every file has a visual fingerprint — duplicates are grouped.</p>
  </div>

  <div class="panel flex flex-wrap items-end gap-4 p-4">
    <label class="text-xs">
      <div class="mb-1 ${label}">confidence needed to skip review</div>
      <input type="range" min="0.7" max="0.99" step="0.01" value="0.95" class="w-52" />
      <span class="ml-2 tabular-nums">95%</span>
    </label>
    <label class="flex items-center gap-2 text-xs">
      <input type="checkbox" checked />
      Add confident identifications to brand knowledge automatically
    </label>
  </div>

  <div class="panel space-y-3 p-4">
    <div class="flex flex-wrap items-center gap-2">
      <input placeholder="Search filename, alt text, caption…" class="w-full max-w-sm rounded border border-border/60 bg-background px-2 py-1.5 text-sm" />
      <select class="rounded border border-border/60 bg-background px-2 py-1.5 text-xs">
        <option>Newest first</option>
        <option>Oldest first</option>
        <option>Least confident first</option>
        <option>Most confident first</option>
      </select>
    </div>
    <div class="flex flex-wrap gap-1.5">
      ${statuses.map((s) => chip(s)).join("")}
      ${chip("Broken previews")}
      ${chip("Excluded only")}
      ${chip("Hide excluded")}
    </div>
    <div class="flex flex-wrap gap-1.5">
      ${sourceLabels.map((s) => chip(s)).join("")}
    </div>
  </div>

  <div class="panel p-1">
    <button type="button" aria-expanded="false" class="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-muted/40">
      ${L.icon("ChevronRight", "h-3.5 w-3.5 shrink-0 text-muted-foreground")}
      <span class="min-w-0 truncate ${label}">broken previews</span>
      <span class="ml-auto shrink-0 text-[10px] font-mono text-muted-foreground">7</span>
    </button>
  </div>

  <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
    <div class="panel p-1">
      <button type="button" aria-expanded="true" class="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-muted/40">
        ${L.icon("ChevronDown", "h-3.5 w-3.5 shrink-0 text-muted-foreground")}
        <span class="min-w-0 truncate ${label}">library</span>
        <span class="ml-auto shrink-0 text-[10px] font-mono text-muted-foreground">2184</span>
      </button>
      <div class="flex flex-wrap items-center gap-2 px-3 pb-2 text-xs">
        <button type="button" class="rounded border border-border/60 px-2 py-0.5">Select all on page</button>
        <span class="text-muted-foreground">0 selected</span>
        <button type="button" disabled class="rounded border border-primary/60 bg-primary/10 px-2 py-0.5 text-primary disabled:opacity-40">Identify selected now</button>
        <button type="button" disabled class="rounded border border-border/60 px-2 py-0.5 disabled:opacity-40">Group as one picture</button>
        <button type="button" disabled class="rounded border border-border/60 px-2 py-0.5 disabled:opacity-40">Exclude from AI &amp; knowledge</button>
        <button type="button" disabled class="rounded border border-border/60 px-2 py-0.5 disabled:opacity-40">Include again</button>
      </div>
      <div class="grid grid-cols-2 gap-2 p-2 pt-0 sm:grid-cols-3 lg:grid-cols-4">
        ${tiles.map(tile).join("")}
      </div>
      <div class="flex items-center justify-between px-3 pb-2 text-xs">
        <button type="button" disabled class="rounded border border-border/60 px-2 py-0.5 disabled:opacity-40">Previous</button>
        <span class="text-muted-foreground">1–48 of 2184</span>
        <button type="button" class="rounded border border-border/60 px-2 py-0.5 disabled:opacity-40">Next</button>
      </div>
    </div>

    <div class="space-y-4">
      <div class="panel p-4 text-xs text-muted-foreground">Pick a file to see what the system read in it — and to correct anything it got wrong.</div>

      <div class="panel space-y-3 p-4">
        <div class="${label}">brand glossary</div>
        <p class="text-xs text-muted-foreground">Names the system should use — products, people, places, phrasing to avoid. Treated as fact everywhere: media identification, comment replies, and content generation.</p>
        <div class="flex flex-wrap gap-2">
          <input placeholder="Term" class="w-32 rounded border border-border/60 bg-background px-2 py-1 text-xs" />
          <select class="rounded border border-border/60 bg-background px-2 py-1 text-xs">
            ${["product", "person", "place", "phrasing", "banned", "other"].map((k) => `<option>${k}</option>`).join("")}
          </select>
          <input placeholder="What it means / how to spot it" class="min-w-[10rem] flex-1 rounded border border-border/60 bg-background px-2 py-1 text-xs" />
          <button type="button" disabled class="rounded border border-border/60 px-2 py-1 text-xs hover:border-primary/50 disabled:opacity-50">Add</button>
        </div>
        <div class="space-y-1">
          ${glossary
            .map(
              ([t, k, d]) => `
          <div class="flex items-start justify-between gap-2 text-xs">
            <div>
              <span class="font-medium">${t}</span> <span class="text-muted-foreground">(${k})</span>
              <div class="text-[11px] text-muted-foreground">${d}</div>
            </div>
            <button type="button" class="text-muted-foreground hover:text-danger disabled:opacity-50">Remove</button>
          </div>`,
            )
            .join("")}
        </div>
      </div>
    </div>
  </div>
</div>`;
};
