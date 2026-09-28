window.LEGACY = window.LEGACY || {};
window.LEGACY["facebook-archive"] = () => {
  const A = {
    label: "Facebook",
    steps: [
      "Open Facebook → Settings &amp; privacy → Accounts Centre → Your information and permissions → Download your information.",
      "Choose “Download or transfer information”, pick the brand Page or profile, then “Some of your information”.",
      "Select Posts, Reels, Comments and reactions, Stories and Messages. Set Format to JSON and Date range to All time.",
      "When the export is ready, download every ZIP part and select them all below.",
    ],
    reconcile: {
      pending: 0,
      lastRun: "Sep 26, 2026, 6:00 AM",
      message: "matched 341, folded 341, superseded 2, remaining 0",
    },
    transcripts: {
      summary: { total: 38, withTranscript: 35, inFlight: 2, awaitingMedia: 1, failed: 0 },
      rows: [
        { id: "104829371155820_917", media: "meta-archive · 96.4 MB", status: "review", cues: 284, source: "gemini", model: "gemini-2.5-flash", lang: "en", len: "18:42", chars: "14,902", updated: "3h ago" },
        { id: "104829371155820_902", media: "meta-archive · 71.0 MB", status: "batched", cues: 0, source: null, model: null, len: null, chars: null, updated: "40m ago" },
        { id: "104829371155820_888", media: null, status: "needs_media", cues: 0, source: null, model: null, len: null, chars: null, updated: "2d ago" },
        { id: "104829371155820_860", media: "meta-archive · 34.8 MB", status: "transcribed", cues: 88, source: "gemini", model: "gemini-2.5-flash", lang: "en", len: "4:05", chars: "3,318", updated: "2d ago", approved: "2d ago" },
        { id: "104829371155820_842", media: "meta-archive · 52.2 MB", status: "transcribed", cues: 131, source: "gemini", model: "gemini-2.5-flash", lang: "en", len: "6:20", chars: "5,074", updated: "4d ago", approved: "4d ago" },
        { id: "104829371155820_811", media: "meta-archive · 19.6 MB", status: "transcribed", cues: 40, source: "gemini", model: "gemini-2.5-flash", lang: "en", len: "1:48", chars: "1,392", updated: "6d ago", approved: "6d ago" },
      ],
    },
    history: [
      { started: "Sep 18, 2026, 10:05 AM", phase: "done", tone: "success", up: 5120, skip: 0, fail: 2, posts: 604, comments: 2311, pending: 0 },
    ],
  };
  const BASE =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";
  const VARIANT = {
    default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
    outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };
  const SIZE = { default: "h-9 px-4 py-2 text-sm", sm: "h-8 rounded-md px-3 text-xs" };
  const btn = (variant, size, inner, disabled = false) =>
    `<button type="button" class="${BASE} ${VARIANT[variant]} ${SIZE[size]}"${disabled ? " disabled" : ""}>${inner}</button>`;
  const checkbox = (checked) =>
    `<button type="button" role="checkbox" aria-checked="${checked}" data-state="${checked ? "checked" : "unchecked"}" class="grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground">${
      checked ? `<span class="grid place-content-center text-current">${L.icon("Check", "h-4 w-4")}</span>` : ""
    }</button>`;
  const refresh = btn("ghost", "sm", L.icon("RefreshCw", "h-4 w-4"));

  const header = `
    <header class="space-y-1">
      <h1 class="text-xl font-semibold tracking-tight">${A.label} Archive Import</h1>
      <p class="text-sm text-muted-foreground">
        Load a ${A.label} “Download Your Information” export into brand knowledge — posts, reels,
        stories, your own comments and brand-sent messages — without spending API quota.
      </p>
    </header>`;

  const howTo = L.panel({
    title: `How to export from ${A.label}`,
    body: `
      <ol class="list-decimal space-y-1.5 pl-5 text-sm text-muted-foreground">
        ${A.steps.map((s) => `<li>${s}</li>`).join("")}
      </ol>
      <p class="mt-3 text-xs text-muted-foreground">
        Only brand-sent direct messages are stored. Messages from other people are discarded
        during parsing and never reach the knowledge store.
      </p>`,
  });

  const scope = L.panel({
    title: "What gets imported",
    body: `
      <div class="flex flex-wrap gap-2 text-xs">
        ${["Posts &amp; reels", "Stories", "Comments", "Direct messages"]
          .map((c) => `<span class="rounded border border-border px-2 py-1 text-muted-foreground">${c}</span>`)
          .join("")}
      </div>
      <label class="mt-4 flex items-center gap-2 text-sm">
        ${checkbox(false)}
        Also upload photo and video files (large — only needed for transcription later)
      </label>
      <label class="mt-2 flex items-center gap-2 text-sm">
        ${checkbox(true)}
        Skip files already uploaded by an earlier ${A.label} import
      </label>`,
  });

  const select = L.panel({
    title: "Select archive",
    body: `
      <input type="file" multiple accept=".zip,.json" class="text-sm" />
      <div class="mt-4 flex items-center gap-2">
        ${btn("default", "default", `${L.icon("UploadCloud", "mr-2 h-4 w-4")}Start import and Ingestion`, true)}
      </div>`,
  });

  const reconcile = L.panel({
    title: "Archive / API sync",
    actions: `
      <div class="flex items-center gap-2">
        ${btn("outline", "sm", `${L.icon("Merge", "mr-1.5 h-4 w-4")}Run merge`)}
        ${refresh}
      </div>`,
    body: `
      <p class="mb-3 text-xs text-muted-foreground">
        Archive posts are merged into their ${A.label} API records so nothing is overwritten and no
        post is counted twice.
      </p>
      <div class="flex flex-wrap items-center gap-4 text-sm">
        <div>
          <div class="text-xs uppercase tracking-wide text-muted-foreground">Archive posts to check</div>
          <div class="text-lg font-semibold tabular-nums">${A.reconcile.pending}</div>
        </div>
        <div>
          <div class="text-xs uppercase tracking-wide text-muted-foreground">Last merge</div>
          <div class="text-sm">${A.reconcile.lastRun}</div>
        </div>
        ${L.pill("success", "Last run ok")}
      </div>
      <p class="mt-2 text-xs text-muted-foreground">${A.reconcile.message}</p>`,
  });

  const TONE = { transcribed: "success", review: "primary", batched: "primary", queued: "muted", needs_media: "warn", failed: "danger" };
  const LABEL = { transcribed: "Transcribed", review: "Awaiting review", batched: "Transcribing", queued: "Queued", needs_media: "Needs media", failed: "Failed" };
  const t = A.transcripts;
  const chip = (text) => `<span class="rounded border border-border px-2 py-0.5">${text}</span>`;
  const transcripts = L.panel({
    title: "Transcripts",
    actions: refresh,
    body: `
      <div class="mb-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
        ${chip(`${t.summary.total} videos`)}
        ${chip(`${t.summary.withTranscript} with transcript`)}
        ${chip(`${t.summary.inFlight} in progress`)}
        ${chip(`${t.summary.awaitingMedia} awaiting media`)}
        ${chip(`${t.summary.failed} failed`)}
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="text-xs uppercase text-muted-foreground">
            <tr>
              <th class="py-2">Item</th>
              <th>Transcript</th>
              <th>Source / model</th>
              <th>Length</th>
              <th>Words</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            ${t.rows
              .map(
                (r) => `
            <tr class="border-t border-border/60 align-top">
              <td class="py-2">
                <div class="max-w-[22rem] truncate font-mono text-xs">${r.id}</div>
                <div class="text-xs text-muted-foreground">${r.media ?? "no media"}</div>
                ${r.error ? `<div class="max-w-[22rem] text-xs text-destructive">${r.error}</div>` : ""}
              </td>
              <td>
                ${L.pill(TONE[r.status], LABEL[r.status])}
                <div class="mt-1 text-xs text-muted-foreground">${r.cues > 0 ? `${r.cues} cues` : "no cues yet"}</div>
              </td>
              <td class="text-xs text-muted-foreground">
                <div>${r.source ?? "—"}</div>
                <div>${r.model ?? "—"}</div>
                ${r.lang ? `<div>${r.lang}</div>` : ""}
              </td>
              <td class="text-xs text-muted-foreground">${r.len ?? "—"}</td>
              <td class="text-xs text-muted-foreground">${r.chars ?? "—"} chars</td>
              <td class="text-xs text-muted-foreground">
                <div>${r.updated}</div>
                ${r.approved ? `<div>approved ${r.approved}</div>` : ""}
              </td>
            </tr>`,
              )
              .join("")}
          </tbody>
        </table>
      </div>`,
  });

  const history = L.panel({
    title: "Import history",
    actions: refresh,
    body: `
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="text-xs uppercase text-muted-foreground">
            <tr>
              <th class="py-2">Started</th>
              <th>Phase</th>
              <th>Entries</th>
              <th>Posts / stories</th>
              <th>Comments</th>
              <th>Pending</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${A.history
              .map(
                (r) => `
            <tr class="border-t border-border/60">
              <td class="py-2">${r.started}</td>
              <td>${L.pill(r.tone, r.phase)}</td>
              <td>${r.up} up · ${r.skip} skip · ${r.fail} fail</td>
              <td>${r.posts}</td>
              <td>${r.comments}</td>
              <td>${r.pending}</td>
              <td class="text-right">
                <div class="flex items-center justify-end gap-1">
                  ${btn("ghost", "sm", L.icon("Trash2", "h-4 w-4"))}
                </div>
              </td>
            </tr>`,
              )
              .join("")}
          </tbody>
        </table>
      </div>`,
  });

  return L.page(header + howTo + scope + select + reconcile + transcripts + history, "");
};
