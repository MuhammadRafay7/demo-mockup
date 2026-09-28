window.LEGACY = window.LEGACY || {};
window.LEGACY["takeout"] = () => {
  const BASE =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";
  const VARIANT = {
    default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
    outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };
  const btn = (variant, inner, disabled = false) =>
    `<button type="button" class="${BASE} ${VARIANT[variant]} h-8 rounded-md px-3 text-xs"${disabled ? " disabled" : ""}>${inner}</button>`;
  const checkbox = (checked) =>
    `<button type="button" role="checkbox" aria-checked="${checked}" data-state="${checked ? "checked" : "unchecked"}" class="grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground">${
      checked ? `<span class="grid place-content-center text-current">${L.icon("Check", "h-4 w-4")}</span>` : ""
    }</button>`;

  const importPanel = L.panel({
    eyebrow: "Brand knowledge",
    title: "Google Takeout import (YouTube)",
    actions: `
      <div class="flex flex-wrap items-center gap-2">
        ${btn("ghost", `${L.icon("Link", "size-3.5")}Repair reply links`)}
        ${btn("outline", `${L.icon("Play", "size-3.5")}Run ingest now`)}
      </div>`,
    body: `
      <div class="space-y-4">
        <p class="text-xs text-muted-foreground leading-relaxed max-w-3xl">
          Export YouTube from
          <a class="text-primary hover:underline" href="#">Google Takeout</a>
          as <strong>.zip</strong> (or <strong>.tgz</strong>) and select the archive parts below
          — split 10 GB parts work well. The archive is unpacked here in your browser and only
          the useful entries (video metadata, captions, comments) are uploaded, so nothing is
          limited by server memory and no YouTube API quota is used. Imports merge into existing
          knowledge: re-running never duplicates rows, and a Takeout caption never overwrites a
          transcript you already have.
        </p>

        <div class="flex flex-wrap items-center gap-3">
          <input type="file" multiple class="text-xs file:mr-3 file:rounded-sm file:border-0 file:bg-panel-2 file:px-3 file:py-1.5 file:text-xs file:text-foreground" />
          <label class="flex items-center gap-2 text-xs text-muted-foreground">
            ${checkbox(false)}
            Also upload video files (large — usually unnecessary)
          </label>
          <label class="flex items-center gap-2 text-xs text-muted-foreground">
            ${checkbox(true)}
            Skip files already uploaded for this brand
          </label>
        </div>

        <p class="text-[11px] text-muted-foreground">
          You can select archive parts and standalone MP4 files together or add them in separate
          selections. The picker intentionally shows all file types; unsupported files are
          flagged before upload.
        </p>

        <div class="space-y-1.5">
          <div class="flex items-center gap-2">
            ${btn("default", `${L.icon("Upload", "size-3.5")}Start import`, true)}
          </div>
          <p class="text-[11px] text-muted-foreground">
            Start import uploads the selected files and then ingests them automatically. "Run
            ingest now" only processes data that has already been uploaded.
          </p>
        </div>
      </div>`,
  });

  const rows = [
    {
      started: "Sep 22, 2026, 2:10 PM",
      archives: "4 parts · 38.6 GB",
      names: "takeout-20260922T140211Z-001.zip, takeout-20260922T140211Z-002.zip, takeout-20260922T140211Z-003.zip, takeout-20260922T140211Z-004.zip",
      phase: ["success", "done"],
      uploaded: 12480,
      seen: 16902,
      ingested: 12480,
      pending: 0,
      stored: 312,
      videos: 148,
      transcripts: 131,
      comments: 9842,
      actions: [btn("ghost", `${L.icon("Eye", "size-3.5")} 4422 skipped`)],
    },
    {
      started: "Sep 12, 2026, 9:34 AM",
      archives: "1 part · 9.8 GB",
      names: "takeout-20260912T093012Z-001.zip",
      phase: ["warn", "uploaded"],
      uploaded: 3204,
      seen: 3910,
      ingested: 2100,
      pending: 1104,
      stored: 0,
      videos: 41,
      transcripts: 36,
      comments: 1987,
      actions: [
        btn("ghost", `${L.icon("Eye", "size-3.5")} 700 skipped`),
        btn("ghost", `${L.icon("AlertTriangle", "size-3.5 text-warn")}6`),
        btn("ghost", `${L.icon("RefreshCw", "size-3.5")} Retry`),
        btn("ghost", `${L.icon("UploadCloud", "size-3.5")} Retry uploads`),
      ],
    },
    {
      started: "Aug 30, 2026, 4:52 PM",
      archives: "2 parts · 19.1 GB",
      names: "takeout-20260830T164801Z-001.zip, takeout-20260830T164801Z-002.zip",
      phase: ["muted", "cancelled"],
      uploaded: 812,
      seen: 1030,
      ingested: 812,
      pending: 0,
      stored: 0,
      videos: 12,
      transcripts: 9,
      comments: 604,
      actions: [
        btn("ghost", `${L.icon("Eye", "size-3.5")} 218 skipped`),
        btn("ghost", `${L.icon("UploadCloud", "size-3.5")} Resume`),
      ],
    },
  ];

  const history = L.panel({
    eyebrow: "History",
    title: "Imports",
    flush: true,
    body: `
      <div class="overflow-x-auto">
        <table class="data-table w-full text-xs">
          <thead>
            <tr>
              <th>Started</th>
              <th>Archives</th>
              <th>Phase</th>
              <th>Uploaded</th>
              <th>Ingested</th>
              <th>Videos</th>
              <th>Transcripts</th>
              <th>Comments</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${rows
              .map(
                (r) => `
            <tr>
              <td class="whitespace-nowrap">${r.started}</td>
              <td class="max-w-[220px] truncate" title="${r.names}">${r.archives}</td>
              <td>${L.pill(r.phase[0], r.phase[1])}</td>
              <td>${r.uploaded}<span class="text-muted-foreground"> / ${r.seen} seen</span></td>
              <td>${r.ingested}${r.pending ? `<span class="text-muted-foreground"> · ${r.pending} pending</span>` : ""}${
                  r.stored ? `<span class="text-muted-foreground" title="Uploaded to storage; no knowledge parser for this file type."> · ${r.stored} stored</span>` : ""
                }</td>
              <td>${r.videos}</td>
              <td>${r.transcripts}</td>
              <td>${r.comments}</td>
              <td class="whitespace-nowrap text-right">${r.actions.join("")}</td>
            </tr>`,
              )
              .join("")}
          </tbody>
        </table>
      </div>`,
  });

  return L.page(importPanel + history, "");
};
