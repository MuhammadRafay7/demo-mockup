window.LEGACY = window.LEGACY || {};
window.LEGACY["facebook-audit"] = () => {
  const P = {
    label: "Facebook",
    subtitle:
      "Caption, transcript and hashtag coverage across every Facebook post Octaneon knows about.",
    counts: { total: 243, caption: 11, transcript: 6, hashtags: 38 },
    stages: { queued: 0, uploaded: 0, batched: 1, review: 1, approved: 0, transcribed: 2, failed: 0 },
    worker: "last ran 4m ago · ok",
    nextRun: "next run in 6m (Sep 26, 2026, 10:52 AM)",
    nextUp: "1 video(s) are being transcribed by Gemini.",
    progress: { pct: 75, done: 2, total: 4, eta: "38m" },
    batches: [
      ["muted", "Running at Gemini", 1, "c63b0e5d"],
      ["success", "Captions returned", 3, "0f47a2e8"],
    ],
    rows: [
      { id: "104829371155820_917", type: "video", title: "Five pantry pastas in 20 minutes", url: 1, published: "Aug 12, 2026, 7:00 PM", failures: ["transcript", "hashtags"], hasMedia: true, isVideo: true, job: "review" },
      { id: "104829371155820_902", type: "video", title: "Sheet-pan chicken, three ways", url: 1, published: "Jul 2, 2026, 7:00 PM", failures: ["transcript"], hasMedia: true, isVideo: true, job: "batched" },
      { id: "104829371155820_888", type: "reel", title: "Brown butter banana bread", url: 1, published: "Jun 20, 2026, 7:00 PM", failures: ["transcript"], hasMedia: false, isVideo: true, job: null },
      { id: "104829371155820_871", type: "reel", title: "Weeknight dal in one pot", url: 1, published: "Jun 6, 2026, 7:00 PM", failures: ["transcript", "hashtags"], hasMedia: true, isVideo: true, job: null },
      { id: "104829371155820_930", type: "post", title: "Market haul: September — what we are cooking this month", url: 1, published: "Sep 3, 2026, 1:00 PM", failures: ["hashtags"], hasMedia: true, isVideo: false, job: null },
      { id: "104829371155820_926", type: "post", title: "New recipe up on the blog: tomato galette", url: 1, published: "Aug 27, 2026, 1:00 PM", failures: ["hashtags"], hasMedia: true, isVideo: false, job: null },
      { id: "104829371155820_921", type: "post", title: null, url: 1, published: "Aug 18, 2026, 9:40 AM", failures: ["caption", "hashtags"], hasMedia: true, isVideo: false, job: null },
      { id: "104829371155820_913", type: "post", title: null, url: 1, published: "Aug 9, 2026, 9:40 AM", failures: ["caption"], hasMedia: true, isVideo: false, job: null },
      { id: "104829371155820_895", type: "video", title: "Sourdough starter, day one", url: 1, published: "Jul 30, 2026, 7:00 PM", failures: ["hashtags"], hasMedia: true, isVideo: true, hasTranscript: true, job: null },
      { id: "104829371155820_880", type: "video", title: "Cast-iron care in 60 seconds", url: 1, published: "Jul 18, 2026, 7:00 PM", failures: ["hashtags"], hasMedia: true, isVideo: true, hasTranscript: true, job: null },
      { id: "104829371155820_860", type: "video", title: "Knife skills: the claw grip", url: null, published: null, failures: [], hasMedia: true, isVideo: true, job: "transcribed" },
      { id: "104829371155820_842", type: "video", title: "Pantry staples tour", url: null, published: null, failures: [], hasMedia: true, isVideo: true, job: "transcribed" },
    ],
  };
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
  const checkbox = (checked = false, disabled = false) =>
    `<button type="button" role="checkbox" aria-checked="${checked}" data-state="${checked ? "checked" : "unchecked"}"${disabled ? " disabled" : ""} class="grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground">${
      checked ? `<span class="grid place-content-center text-current">${L.icon("Check", "h-4 w-4")}</span>` : ""
    }</button>`;
  const metric = (label, value, hint) => `
    <div class="rounded border border-border bg-panel-2/40 p-2">
      <div class="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
        ${label}${hint ? L.info() : ""}
      </div>
      <div class="text-lg font-semibold tabular-nums">${value}</div>
    </div>`;
  const stageTile = (label, value) => `
    <div class="rounded border border-border bg-panel-2/40 px-2 py-1">
      <div class="text-[10px] font-mono uppercase tracking-wide text-muted-foreground">${label}</div>
      <div class="text-sm font-semibold tabular-nums">${value}</div>
    </div>`;
  const batchRow = ([tone, label, count, id]) => `
    <div class="space-y-1 rounded border border-border bg-panel-2/30 p-2">
      <button type="button" class="flex w-full flex-wrap items-center gap-2 text-left text-[11px]">
        ${L.icon("ChevronRight", "size-3.5 shrink-0 text-muted-foreground")}
        ${L.pill(tone, label)}
        <span class="text-foreground">${count} video(s)</span>
        <span class="font-mono text-[10px] text-muted-foreground">batch ${id}</span>
      </button>
    </div>`;

  const header = `
    <header class="min-w-0">
      <h1 class="text-lg font-semibold tracking-tight">${P.label} Audit &amp; Optimization</h1>
      <p class="mt-1 text-xs text-muted-foreground">${P.subtitle}</p>
    </header>`;

  const metrics = `
    <div class="grid grid-cols-2 gap-2 md:grid-cols-4">
      ${metric("Items audited", P.counts.total)}
      ${metric("Missing caption", P.counts.caption, true)}
      ${metric("Missing transcript", P.counts.transcript, true)}
      ${metric("No hashtags", P.counts.hashtags, true)}
    </div>`;

  const s = P.stages;
  const pipeline = L.panel({
    title: "Live pipeline status",
    actions: `
      <div class="flex items-center gap-2">
        <span class="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wide text-muted-foreground" title="Realtime connected">
          ${L.icon("Wifi", "size-3.5 text-primary")}live
        </span>
        <button type="button" class="text-[10px] font-mono uppercase tracking-wide text-primary underline underline-offset-2 hover:text-primary/80 disabled:cursor-not-allowed disabled:opacity-50">recover drafts</button>
        ${btn("ghost", "text-[10px] font-mono uppercase tracking-wide text-destructive", `Cancel queued (${s.queued})`, s.queued === 0)}
        ${btn("ghost", "", L.icon("RefreshCw", "size-3.5 "))}
      </div>`,
    body: `
      <div class="flex flex-wrap items-start justify-between gap-2 border-b border-border p-3 text-[11px] ">
        <div class="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          ${L.icon("CheckCircle2", "size-3.5 text-success")}
          <span class="font-mono uppercase tracking-wide text-muted-foreground">Worker</span>
          <span class="text-muted-foreground">${P.worker}</span>
          <span class="text-muted-foreground">${P.nextRun}</span>
          <span class="text-foreground">${P.nextUp}</span>
        </div>
        <div class="flex shrink-0 flex-col items-end gap-1">
          <div class="flex items-center gap-2">
            ${btn("default", "h-7 px-2 text-[10px] font-mono uppercase tracking-wide", `${L.icon("Play", "mr-1 size-3.5")}Run now`)}
          </div>
          <span class="text-[10px] font-mono text-muted-foreground">0 approved · ${s.review} awaiting review</span>
        </div>
      </div>

      <div class="space-y-1.5 border-b border-border p-3">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wide text-muted-foreground">
            Overall audit run progress
            ${L.info()}
          </div>
          <div class="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
            <span class="text-sm font-semibold tabular-nums text-foreground">${P.progress.pct}%</span>
            <span class="tabular-nums">${P.progress.done}/${P.progress.total} complete</span>
            <span>ETA ${P.progress.eta}</span>
            ${s.failed > 0 ? `<span class="text-destructive">${s.failed} failed</span>` : ""}
          </div>
        </div>
        <div class="h-2 w-full overflow-hidden rounded bg-panel-2" role="progressbar" aria-valuenow="${P.progress.pct}" aria-valuemin="0" aria-valuemax="100">
          <div class="h-full rounded bg-primary transition-all duration-500" style="width: ${P.progress.pct}%"></div>
        </div>
      </div>

      <div class="flex flex-wrap gap-3 border-b border-border p-3">
        ${stageTile("Queued", s.queued)}
        ${stageTile("Media uploaded", s.uploaded)}
        ${stageTile("Gemini batch", s.batched)}
        ${stageTile("Awaiting review", s.review)}
        ${stageTile("Approved", s.approved)}
        ${stageTile("Transcribed", s.transcribed)}
        ${s.review > 0 ? btn("outline", "h-6 px-2 text-[10px] font-mono uppercase tracking-wide", "Review") : ""}
        <div class="rounded border border-destructive/40 bg-panel-2/40 px-2 py-1">
          <div class="text-[10px] font-mono uppercase tracking-wide text-muted-foreground">Failed</div>
          <div class="text-sm font-semibold tabular-nums text-destructive">${s.failed}</div>
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
          Gemini batches (${P.batches.length})
        </button>
        ${P.batches.map(batchRow).join("")}
      </div>`,
  });

  const small = "h-6 px-2 text-[10px] font-mono uppercase tracking-wide";
  const mutedText = (t) => `<span class="font-mono text-[10px] text-muted-foreground">${t}</span>`;
  const TONE = { queued: "muted", batched: "muted", needs_media: "muted", review: "warn", transcribed: "success", failed: "danger" };
  const LABEL = {
    queued: "Queued",
    batched: "Gemini batch",
    needs_media: "Needs media",
    review: "Awaiting review",
    transcribed: "Transcribed",
    failed: "Failed",
  };
  const nextStep = (r) => {
    if (!r.job) {
      if (r.hasTranscript) return btn("outline", small, `${L.icon("Copy", "mr-1 size-3")} Copy transcript`);
      if (!r.isVideo) return mutedText("no video media");
      return btn("outline", small, r.hasMedia ? "Transcribe" : "Supply media", !r.hasMedia);
    }
    if (r.job === "needs_media") return btn("outline", small, `${L.icon("UploadCloud", "mr-1 size-3")} Supply media`);
    if (r.job === "review") return btn("default", small, "Review");
    if (r.job === "failed") return btn("outline", small, `${L.icon("RefreshCw", "mr-1 size-3")} Retry`);
    return mutedText("in progress");
  };

  const tabs = ["All rows", "Missing caption text", "Missing transcript", "No hashtags"]
    .map(
      (label, i) => `
      <button type="button" title="Filter findings to ${label.toLowerCase()}" class="rounded border px-2 py-1 text-[10px] font-mono uppercase tracking-wide ${
        i === 0 ? "border-primary text-primary" : "border-border text-muted-foreground hover:text-foreground"
      }">${label}</button>`,
    )
    .join("");

  const selectCls =
    "h-7 rounded border border-border bg-panel-2/40 px-1 text-[11px] normal-case tracking-normal text-foreground outline-none focus:border-primary";
  const stageOptions = [
    "Any",
    "Not started",
    "Queued",
    "Needs media",
    "Media uploaded",
    "Gemini batch",
    "Awaiting review",
    "Approved",
    "On YouTube",
    "Rejected",
    "Failed",
  ]
    .map((o) => `<option>${o}</option>`)
    .join("");

  const tableRows = P.rows
    .map(
      (r) => `
      <tr class="border-t border-border/60">
        <td class="p-2">${checkbox(false, !r.hasMedia && r.job !== "review")}</td>
        <td class="p-2">
          <button type="button" class="text-muted-foreground hover:text-foreground">${L.icon("ChevronRight", "size-3.5")}</button>
        </td>
        <td class="p-2">
          <div class="max-w-[22rem] truncate">${r.title ?? `<span class="text-muted-foreground">Untitled</span>`}</div>
          <div class="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
            ${r.type} · ${r.id.slice(0, 18)}
            ${r.url ? `<a href="#">${L.icon("ExternalLink", "size-3")}</a>` : ""}
          </div>
        </td>
        <td class="p-2 font-mono text-[10px] text-muted-foreground">${r.published ?? "—"}</td>
        <td class="p-2">${
          r.failures.length === 0
            ? L.icon("CheckCircle2", "size-3.5 text-primary")
            : `<span class="font-mono text-[10px] text-muted-foreground">${r.failures.join(", ")}</span>`
        }</td>
        <td class="p-2">${
          r.job
            ? L.pill(TONE[r.job], LABEL[r.job])
            : r.hasTranscript
              ? L.pill("success", "transcript stored")
              : `<span class="font-mono text-[10px] text-muted-foreground">—</span>`
        }</td>
        <td class="p-2">${nextStep(r)}</td>
      </tr>`,
    )
    .join("");

  const findings = L.panel({
    title: `${P.label} findings`,
    actions: `
      <div class="flex flex-wrap items-center gap-2">
        <div class="relative">
          ${L.icon("Search", "pointer-events-none absolute left-2 top-1/2 size-3 -translate-y-1/2 text-muted-foreground")}
          <input placeholder="Search id or title" class="h-7 w-44 rounded border border-border bg-panel-2/40 pl-7 pr-2 text-[11px] outline-none focus:border-primary" />
        </div>
        ${btn("outline", "h-7 px-2 text-[10px] font-mono uppercase tracking-wide", "Transcribe selected (0)", true)}
        ${btn("outline", "h-7 px-2 text-[10px] font-mono uppercase tracking-wide", `${L.icon("CheckCircle2", "mr-1 size-3")}Approve selected (0)`, true)}
        ${btn("outline", "h-7 px-2 text-[10px] font-mono uppercase tracking-wide", `${L.icon("X", "mr-1 size-3")}Reject selected (0)`, true)}
        ${btn("default", "h-7 px-2 text-[10px] font-mono uppercase tracking-wide", "Transcribe all missing")}
      </div>`,
    body: `
      <div class="mb-2 flex flex-wrap gap-1">${tabs}</div>
      <div class="mb-2 flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-wide text-muted-foreground">
        <label class="flex items-center gap-1">
          Result
          <select class="${selectCls}"><option>Any</option><option>Failing checks</option><option>Passing</option></select>
        </label>
        <label class="flex items-center gap-1">
          Stage
          <select class="${selectCls}">${stageOptions}</select>
        </label>
        <span class="normal-case tracking-normal">${P.rows.length} of ${P.rows.length} shown</span>
      </div>
      <table class="w-full text-left text-[11px]">
        <thead class="text-[10px] font-mono uppercase tracking-wide text-muted-foreground">
          <tr>
            <th class="w-6 p-2">${checkbox(false)}</th>
            <th class="w-6 p-2"></th>
            <th class="p-2">Item</th>
            <th class="p-2">Published</th>
            <th class="p-2">Gaps</th>
            <th class="p-2">Stage</th>
            <th class="p-2">Next step</th>
          </tr>
        </thead>
        <tbody>${tableRows}</tbody>
      </table>`,
  });

  const media = `
    <div>
      <button type="button" class="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground hover:text-foreground">
        ${L.icon("ChevronRight", "size-3.5")}
        Media supply
      </button>
    </div>`;

  return L.page(header + `<div class="space-y-3">${metrics}${pipeline}${findings}${media}</div>`, "");
};
