window.LEGACY = window.LEGACY || {};
window.LEGACY["youtube-audit"] = () => {
  const BASE =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";
  const VARIANT = {
    default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
    outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };
  const btnCls = (variant, extra = "") => {
    const ex = extra.split(/\s+/).filter(Boolean);
    let size = ["h-8", "rounded-md", "px-3", "text-xs"];
    if (ex.some((c) => /^h-/.test(c))) size = size.filter((c) => !/^h-/.test(c));
    if (ex.some((c) => /^px-/.test(c))) size = size.filter((c) => !/^px-/.test(c));
    if (ex.some((c) => /^text-\[\d/.test(c))) size = size.filter((c) => c !== "text-xs");
    return [BASE, VARIANT[variant], ...size, ...ex].join(" ");
  };
  const btn = (variant, extra, inner, disabled = false) =>
    `<button type="button" class="${btnCls(variant, extra)}"${disabled ? " disabled" : ""}>${inner}</button>`;
  const checkbox = (checked = false) =>
    `<button type="button" role="checkbox" aria-checked="${checked}" data-state="${checked ? "checked" : "unchecked"}" class="grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground">${
      checked ? `<span class="grid place-content-center text-current">${L.icon("Check", "h-4 w-4")}</span>` : ""
    }</button>`;
  const metric = (label, value, hint) => `
    <div class="rounded border border-border bg-panel-2/40 p-2">
      <div class="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wide text-muted-foreground">
        ${label}${hint ? L.info() : ""}
      </div>
      <div class="text-lg font-semibold tabular-nums">${value}</div>
    </div>`;

  const header = `
    <header class="flex flex-wrap items-center justify-between gap-3">
      <div class="min-w-0">
        <h1 class="text-lg font-semibold tracking-tight">YouTube Audit &amp; Optimization</h1>
        <p class="text-xs text-muted-foreground">
          Audit Every YouTube video Octaneon knows about — synced, backfilled, or imported from
          Google Takeout. To ensure that every video is using best practices and is up to date
          with all necessary settings. This will generate all of the transcripts for your videos
          and seed yoru brand voice and knowledebase and then upload them to each video in the
          proper SRT format while simultaneously updating other variables for each video. The
          update portion may take a long time depending on how many videos you have.
        </p>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        ${btn("outline", "", `${L.icon("Search", "mr-1.5 size-3.5")}Run audit`)}
        ${btn("outline", "", `${L.icon("Play", "mr-1.5 size-3.5")}Advance pipeline`)}
      </div>
    </header>`;

  const seeding = L.panel({
    title: "Knowledge seeding",
    body: `
      <div class="flex flex-wrap items-start justify-between gap-3 p-3">
        <div class="min-w-0 max-w-xl">
          <div class="flex items-center gap-1.5 text-xs font-medium">
            Seed Brand Voice &amp; Knowledge before approval
            ${L.info()}
          </div>
          <p class="mt-1 text-[11px] text-muted-foreground">Generated transcripts seed Brand Voice &amp; Knowledge immediately as drafts, then upsert on approval.</p>
        </div>
        <button type="button" role="switch" aria-checked="true" data-state="checked" class="peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input">
          <span data-state="checked" class="pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"></span>
        </button>
      </div>`,
  });

  const summary = L.panel({
    title: "Audit summary",
    body: `
      <div class="grid gap-3 p-3 sm:grid-cols-2 lg:grid-cols-4">
        ${metric("Videos audited", 148)}
        ${metric("Fully passing", 61)}
        ${metric("Missing title", 1)}
        ${metric("Missing description", 14)}
        ${metric("Missing human captions", 79, true)}
        ${metric("Missing custom thumbnail", 22, true)}
      </div>`,
  });

  const stageTile = (label, value) => `
    <div class="rounded border border-border bg-panel-2/40 px-2 py-1">
      <div class="text-[10px] font-mono uppercase tracking-wide text-muted-foreground">${label}</div>
      <div class="text-sm font-semibold tabular-nums">${value}</div>
    </div>`;
  const batchRow = (tone, label, count, id) => `
    <div class="space-y-1 rounded border border-border bg-panel-2/30 p-2">
      <button type="button" class="flex w-full flex-wrap items-center gap-2 text-left text-[11px]">
        ${L.icon("ChevronRight", "size-3.5 shrink-0 text-muted-foreground")}
        ${L.pill(tone, label)}
        <span class="text-foreground">${count} video(s)</span>
        <span class="font-mono text-[10px] text-muted-foreground">batch ${id}</span>
      </button>
    </div>`;

  const pipeline = L.panel({
    title: "Live pipeline status",
    actions: `
      <div class="flex items-center gap-2">
        <span class="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wide text-muted-foreground" title="Realtime connected">
          ${L.icon("Wifi", "size-3.5 text-primary")}live
        </span>
        <button type="button" class="text-[10px] font-mono uppercase tracking-wide text-primary underline underline-offset-2 hover:text-primary/80 disabled:cursor-not-allowed disabled:opacity-50">recover drafts</button>
        ${btn("ghost", "text-[10px] font-mono uppercase tracking-wide text-destructive", "Cancel queued (1)")}
        ${btn("ghost", "", L.icon("RefreshCw", "size-3.5 "))}
      </div>`,
    body: `
      <div class="flex flex-wrap items-start justify-between gap-2 border-b border-border p-3 text-[11px] ">
        <div class="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          ${L.icon("CheckCircle2", "size-3.5 text-success")}
          <span class="font-mono uppercase tracking-wide text-muted-foreground">Worker</span>
          <span class="text-muted-foreground">last ran 3m ago · ok</span>
          <span class="text-muted-foreground">next run in 7m (Sep 26, 2026, 10:52 AM)</span>
          <span class="text-foreground">1 video(s) need a media file before captions can be generated.</span>
          <span class="text-muted-foreground">~24 caption publish(es) left today · 400/10,000 units used (400 per publish).</span>
        </div>
        <div class="flex shrink-0 flex-col items-end gap-1">
          <div class="flex items-center gap-2">
            ${btn("default", "h-7 px-2 text-[10px] font-mono uppercase tracking-wide", `${L.icon("Play", "mr-1 size-3.5")}Run now`)}
          </div>
          <span class="text-[10px] font-mono text-muted-foreground">0 approved · 1 awaiting review</span>
        </div>
      </div>

      <div class="space-y-1.5 border-b border-border p-3">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wide text-muted-foreground">
            Overall audit run progress
            ${L.info()}
          </div>
          <div class="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
            <span class="text-sm font-semibold tabular-nums text-foreground">47%</span>
            <span class="tabular-nums">1/6 published</span>
            <span>ETA 2h 10m</span>
            <span class="text-destructive">1 failed</span>
          </div>
        </div>
        <div class="h-2 w-full overflow-hidden rounded bg-panel-2" role="progressbar" aria-valuenow="47" aria-valuemin="0" aria-valuemax="100">
          <div class="h-full rounded bg-primary transition-all duration-500" style="width: 47%"></div>
        </div>
      </div>

      <div class="flex flex-wrap gap-3 border-b border-border p-3">
        ${stageTile("Queued", 1)}
        ${stageTile("Media uploaded", 0)}
        ${stageTile("Gemini batch", 1)}
        ${stageTile("Awaiting review", 1)}
        ${stageTile("Approved", 1)}
        ${stageTile("On YouTube", 1)}
        ${btn("outline", "h-6 px-2 text-[10px] font-mono uppercase tracking-wide", "Review")}
        <div class="rounded border border-destructive/40 bg-panel-2/40 px-2 py-1">
          <div class="text-[10px] font-mono uppercase tracking-wide text-muted-foreground">Failed</div>
          <div class="text-sm font-semibold tabular-nums text-destructive">1</div>
        </div>
        <div class="rounded border border-border bg-panel-2/40 px-2 py-1">
          <div class="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wide text-muted-foreground">
            Retrying
            ${L.info()}
          </div>
          <div class="text-sm font-semibold tabular-nums">0</div>
        </div>
      </div>

      <div class="space-y-1.5 border-b border-border p-3">
        <button type="button" class="flex w-full items-center gap-1.5 text-[10px] font-mono uppercase tracking-wide text-muted-foreground hover:text-foreground">
          ${L.icon("ChevronDown", "size-3.5")}
          Gemini batches (3)
        </button>
        ${batchRow("muted", "Running at Gemini", 1, "7c1e02ab")}
        ${batchRow("success", "Captions returned", 2, "3f9ad514")}
        ${batchRow("warn", "No captions returned", 1, "b04e6c90")}
      </div>`,
  });

  const CHECK_TABS = [
    "All failing",
    "Missing title",
    "Missing description",
    "Missing human captions",
    "Missing custom thumbnail",
  ];
  const checkTabs = CHECK_TABS.map(
    (label, i) => `
      <button type="button" title="Filter findings to ${label}" class="rounded px-2 py-1 text-[11px] font-mono uppercase tracking-wide transition-colors ${
        i === 0 ? "bg-panel-2 text-foreground ring-1 ring-border" : "text-muted-foreground hover:text-foreground"
      }">${label}</button>`,
  ).join("");

  const STAGE_FILTERS = [
    ["All stages", 9],
    ["Queued", 1],
    ["Needs media", 1],
    ["Media uploaded", 0],
    ["Gemini batch", 1],
    ["Awaiting review", 1],
    ["Approved", 1],
    ["On YouTube", 1],
    ["Failed", 1],
    ["Retrying", 0],
  ];
  const stageChips = STAGE_FILTERS.map(
    ([label, n], i) => `
      <button type="button" title="Filter to ${label}" class="rounded px-2 py-1 text-[10px] font-mono uppercase tracking-wide ring-1 transition ${
        i === 0 ? "bg-primary/15 text-foreground ring-primary/40" : "text-muted-foreground ring-border hover:text-foreground"
      }">${label} (${n})</button>`,
  ).join("");

  const small = "h-6 px-2 text-[10px] font-mono uppercase tracking-wide";
  const muted = (t) => `<span class="font-mono text-[10px] text-muted-foreground">${t}</span>`;
  const thumbCell = (state, candidates = 0, building = false) => {
    const pill =
      state === "custom" ? L.pill("success", "custom") : state === "auto" ? L.pill("danger", "auto frame") : L.pill("warn", "unknown");
    const img = state === "unknown" ? "" : `<div class="mb-1 w-16 aspect-video rounded-sm border border-border bg-muted object-cover"></div>`;
    return `
      <button type="button" class="block w-full text-left">
        ${img}${pill}
        ${candidates > 0 ? `<div class="mt-1 font-mono text-[10px] text-muted-foreground">${candidates} candidate${candidates === 1 ? "" : "s"}</div>` : ""}
        ${building ? `<div class="mt-1 font-mono text-[10px] text-muted-foreground">building…</div>` : ""}
      </button>`;
  };

  const rows = [
    {
      id: "KmGtDU4xQ8s",
      title: "Five pantry pastas in 20 minutes",
      published: "Aug 12, 2026, 9:00 AM",
      clock: "18:42 · 284 cues",
      failures: ["captions"],
      auto: true,
      draft: true,
      thumb: ["custom", 0],
      stage: [["warn", "Awaiting review"]],
      waiting: "ready for your review — approve or edit the transcript",
      updated: "Sep 26, 2026, 9:18 AM",
      next: btn("default", small, "Review"),
    },
    {
      id: "p0RrS7vYc2E",
      title: "Sourdough starter, day one",
      published: "Jul 30, 2026, 9:00 AM",
      clock: "11:05 · 162 cues",
      failures: ["captions"],
      auto: true,
      thumb: ["custom", 0],
      stage: [["warn", "Approved"]],
      waiting: "waiting to publish to YouTube",
      updated: "Sep 26, 2026, 8:51 AM",
      next: btn("default", small, `${L.icon("UploadCloud", "mr-1 size-3")} Publish to YouTube`),
    },
    {
      id: "Zx93LmQ0aTw",
      title: "Cast-iron care in 60 seconds",
      published: "Jul 18, 2026, 12:00 PM",
      clock: "0:58 · 21 cues",
      failures: [],
      thumb: ["custom", 0],
      stage: [["success", "On YouTube"]],
      updated: "Sep 25, 2026, 4:07 PM",
      next: `<a href="#" class="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wide text-muted-foreground hover:text-foreground">${L.icon("CheckCircle2", "size-3.5 text-primary")} published ${L.icon("ExternalLink", "size-3")}</a>`,
    },
    {
      id: "c4HqW1nNe7k",
      title: "Sheet-pan chicken, three ways",
      published: "Jul 2, 2026, 9:00 AM",
      failures: ["captions", "thumbnail"],
      auto: true,
      thumb: ["auto", 3],
      stage: [["muted", "Gemini batch"]],
      waiting: "Gemini is transcribing",
      updated: "Sep 26, 2026, 10:12 AM",
      next: muted("in progress"),
    },
    {
      id: "Rt5bE8uJk1o",
      title: "Brown butter banana bread",
      published: "Jun 20, 2026, 9:00 AM",
      failures: ["captions"],
      thumb: ["custom", 0],
      stage: [["muted", "Needs media"]],
      waiting: "needs a media file — supply it to continue",
      updated: "Sep 26, 2026, 7:40 AM",
      next: btn("outline", small, `${L.icon("UploadCloud", "mr-1 size-3")} Supply media`),
    },
    {
      id: "Wd8aN2fPq5y",
      title: "Weeknight dal",
      published: "Jun 6, 2026, 9:00 AM",
      failures: ["description", "captions", "thumbnail"],
      auto: true,
      thumb: ["auto", 0, true],
      stage: null,
      updated: "—",
      next: btn("outline", small, "Generate captions"),
    },
    {
      id: "Hm2VtY9cL0b",
      title: "Market haul: September",
      published: "Sep 3, 2026, 9:00 AM",
      failures: ["captions"],
      thumb: ["custom", 0],
      stage: [["danger", "Failed"]],
      error: "Gemini returned no transcript for this video (empty response) after 3 attempts",
      updated: "Sep 25, 2026, 11:26 PM",
      next: btn("outline", small, `${L.icon("RefreshCw", "mr-1 size-3")} Retry`),
    },
    {
      id: "yQ7uB3sXe4r",
      title: "Knife skills: the claw grip",
      published: "May 22, 2026, 9:00 AM",
      failures: ["captions"],
      auto: true,
      thumb: ["custom", 0],
      stage: [["muted", "Queued"]],
      waiting: "waiting for media (Takeout match or manual upload)",
      updated: "Sep 26, 2026, 10:31 AM",
      next: muted("in progress"),
    },
    {
      id: "fL1oPz6Tg9m",
      title: null,
      published: "Apr 9, 2026, 9:00 AM",
      failures: ["title", "description", "captions", "thumbnail"],
      thumb: ["unknown", 0],
      stage: null,
      updated: "—",
      next: btn("outline", small, "Generate captions"),
    },
  ];

  const bodyRows = rows
    .map(
      (r) => `
      <tr class="align-top hover:bg-panel-2/40">
        <td class="p-2">
          <button type="button" aria-label="Expand details" class="text-muted-foreground hover:text-foreground">${L.icon("ChevronRight", "size-3.5")}</button>
        </td>
        <td class="p-2">${checkbox(false)}</td>
        <td class="p-2">
          <button type="button" class="text-left">
            <div class="text-xs font-medium break-words">${r.title || `<span class="text-destructive">(no title)</span>`}</div>
            <div class="font-mono text-[10px] text-muted-foreground break-all">${r.id} · ${r.published}</div>
          </button>
          ${r.clock ? `<div class="font-mono text-[10px] text-muted-foreground">${r.clock}</div>` : ""}
          <div class="mt-1 flex flex-wrap gap-1">
            ${r.failures.map((f) => L.pill("danger", f)).join("")}
            ${r.auto ? L.pill("warn", "auto captions only") : ""}
            ${r.draft ? L.pill("warn", "draft transcript — awaiting review") : ""}
          </div>
          ${r.error ? `<div class="mt-1 text-[10px] break-words text-destructive">${r.error}</div>` : ""}
        </td>
        <td class="p-2">${thumbCell(r.thumb[0], r.thumb[1], r.thumb[2])}</td>
        <td class="p-2">
          ${
            r.stage
              ? `<div class="flex flex-wrap items-center gap-1.5">${r.stage.map(([t, l]) => L.pill(t, l)).join("")}</div>`
              : `<span class="font-mono text-[10px] text-muted-foreground">not queued</span>`
          }
          ${r.waiting ? `<div class="mt-1 text-[10px] text-muted-foreground break-words">${r.waiting}</div>` : ""}
        </td>
        <td class="p-2 font-mono text-[10px] text-muted-foreground break-words">${r.updated}</td>
        <td class="p-2">${r.next}</td>
      </tr>`,
    )
    .join("");

  const th = (cls, label) =>
    `<th class="${cls} p-2 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">${label}</th>`;

  const findings = L.panel({
    title: "Findings",
    actions: `
      <div class="flex flex-wrap items-center gap-2">
        <span class="font-mono text-[10px] text-muted-foreground">9 of 9 videos</span>
        ${btn("outline", "", "Generate captions (0)", true)}
        ${btn("outline", "", "Queue all missing captions")}
        ${btn("outline", "", `${L.icon("Image", "mr-1.5 size-3.5")}Generate thumbnails (0)`, true)}
      </div>`,
    body: `
      <div class="flex flex-wrap items-center gap-2 border-b border-border p-2">${checkTabs}</div>
      <div class="flex flex-wrap items-center gap-2 border-b border-border p-2">
        ${stageChips}
        <input placeholder="search title or video id" class="h-7 min-w-[180px] flex-1 rounded border border-border bg-panel-2/40 px-2 text-[11px] outline-none focus:ring-1 focus:ring-primary/40" />
      </div>
      <table class="w-full table-fixed text-left text-xs">
        <thead>
          <tr class="border-b border-border">
            <th class="w-8 p-2"></th>
            <th class="w-8 p-2"></th>
            ${th("", "video")}
            ${th("w-24", "thumbnail")}
            ${th("w-[20%]", "stage")}
            ${th("w-28", "updated")}
            ${th("w-40", "next step")}
          </tr>
        </thead>
        <tbody class="divide-y divide-border">${bodyRows}</tbody>
      </table>`,
  });

  const media = `
    <div>
      <button type="button" class="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wide text-muted-foreground hover:text-foreground">
        ${L.icon("ChevronRight", "size-3.5")}
        Media supply
      </button>
    </div>`;

  return L.page(header + seeding + summary + pipeline + findings + media, "");
};
