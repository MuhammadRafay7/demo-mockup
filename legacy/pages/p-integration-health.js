window.LEGACY = window.LEGACY || {};
window.LEGACY["p-integration-health"] = () => {
  const integrations = [
    { name: "Zernio", detail: "unified social API", status: "healthy", latency: "142ms" },
    { name: "WordPress", detail: "site ingest + publish", status: "healthy", latency: "88ms" },
    { name: "Deepgram", detail: "transcription", status: "healthy", latency: "212ms" },
    { name: "LLM Provider", detail: "gpt-4o / claude sonnet", status: "healthy", latency: "980ms" },
    { name: "Snowflake", detail: "analytics SoR", status: "healthy", latency: "310ms" },
    { name: "S3", detail: "media / raw / exports", status: "healthy", latency: "44ms" },
    { name: "DynamoDB", detail: "settings / jobs / schedules", status: "degraded", latency: "612ms" },
    { name: "Secrets Manager", detail: "OAuth + API keys", status: "healthy", latency: "51ms" },
    { name: "YouTube $", detail: "monetary scopes", status: "healthy", latency: "402ms" },
  ];
  const dot = (s) =>
    s === "healthy" ? "bg-success animate-pulse" : s === "degraded" ? "bg-warn" : "bg-danger";
  const smButton = (label, disabled = false) =>
    `<button ${disabled ? "disabled" : ""} class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 rounded-md px-3 text-xs">${label}</button>`;
  const card = (title, desc, rest) => `
    <div class="ring-1 ring-border rounded-sm bg-panel p-4 space-y-3">
      <div>
        <div class="text-sm font-medium">${title}</div>
        <div class="text-xs text-muted-foreground">${desc}</div>
      </div>
      ${rest}
    </div>`;
  const field = "w-full bg-background ring-1 ring-border rounded-sm px-2 py-1 text-sm";

  return L.page(
    `
    ${L.header({
      eyebrow: "Platform · superuser",
      title: "Integration health matrix",
      info: true,
      actions: L.pill("danger", "platform owner"),
    })}

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-border ring-1 ring-border rounded-sm overflow-hidden">
      ${integrations
        .map(
          (i) => `
        <div class="bg-panel p-4 flex flex-col gap-2 min-h-[96px]">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium">${i.name}</span>
            <span class="status-dot ${dot(i.status)}"></span>
          </div>
          <div class="text-xs text-muted-foreground">${i.detail}</div>
          <div class="text-[10px] font-mono text-muted-foreground mt-auto">p50 ${i.latency}</div>
        </div>`,
        )
        .join("")}
    </div>

    ${card(
      "Shared Meta assets across brands",
      "A Facebook Page or Instagram account should belong to exactly one brand. Anything listed here is connected twice — disconnect it on the brand that should not own it.",
      `<div class="text-[11px] font-mono text-success">No shared assets — every Page and Instagram account belongs to one brand.</div>`,
    )}

    ${card(
      "Re-run Instagram comments backfill",
      "Forces the IG comments phase for the selected connection and clears the page cursor so previously-skipped nested replies (including brand replies) get re-ingested. Optional date range narrows the sweep.",
      `
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <label class="text-xs space-y-1">
          <span class="text-muted-foreground">Facebook connection</span>
          <select class="${field}">
            <option value="">Select…</option>
            <option>northwindkitchen · 4f1c9a2e</option>
            <option>hollowaygardenco · 9b27d0c4</option>
            <option>pharmabuilt · c83e51a7</option>
          </select>
        </label>
        <label class="text-xs space-y-1">
          <span class="text-muted-foreground">Since (optional)</span>
          <input type="datetime-local" class="${field}" />
        </label>
        <label class="text-xs space-y-1">
          <span class="text-muted-foreground">Until (optional)</span>
          <input type="datetime-local" class="${field}" />
        </label>
      </div>
      <span class="inline-flex cursor-not-allowed">${smButton("Re-run IG comments", true)}</span>`,
    )}

    ${card(
      "Retag Meta brand authors",
      "One-time backfill for existing Snowflake rows: promotes comments authored by each brand's connected Facebook Page or Instagram account to <code>brand_reply</code>. Matches on account ID and username/handle.",
      smButton("Run retag"),
    )}

    ${card(
      "Repair YouTube brand-reply links",
      "Backfills the <code>parentId</code> field on historical YouTube <code>brand_reply</code> rows so already-answered comments drop out of the Reply Generation queue. Fetches parents 50 at a time from the YouTube API and merges them into <code>RAW</code>. Skips top-level comments (no parent).",
      smButton("Run repair"),
    )}
  `,
    "max-w-[1200px]",
  );
};
