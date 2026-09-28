window.LEGACY = window.LEGACY || {};
window.LEGACY["video-content-flow"] = () => {
  const TONE = {
    success: "text-success",
    warn: "text-warn",
    danger: "text-danger",
    muted: "text-muted-foreground",
    primary: "text-primary",
  };
  const COLUMNS = [
    ["ideas", "Ideas", "Content ideas captured for this brand."],
    ["production", "Production", "Uploaded videos with nothing published yet."],
    ["generation", "Generation", "Generated posts still waiting on review."],
    ["publishing", "Publishing", "Scheduled or published posts."],
  ];
  const LABEL = { wordpress: "WordPress", youtube: "YouTube", facebook: "Facebook", instagram: "Instagram" };
  const four = (tones, labels) =>
    ["wordpress", "youtube", "facebook", "instagram"].map((p, i) => ({ platform: p, tone: tones[i], label: labels[i] }));

  const cards = {
    ideas: [
      { title: "Pumpkin loaf vs. chocolate zucchini bread", status: "open", tone: "primary", meta: ["Baking", "video", "youtube"] },
      { title: "Knife skills: dicing an onion without tears", status: "open", tone: "primary", meta: ["Kitchen Skills", "short", "tiktok"] },
      { title: "What to cook when the fridge is almost empty", status: "in progress", tone: "warn", meta: ["Pantry Basics", "video", "instagram"] },
    ],
    production: [
      { title: "Apple cider donuts", status: "awaiting edited video", tone: "warn", meta: ["no video yet", "raw uploaded"] },
      { title: "Market haul: September", status: "transcribing", tone: "warn", meta: ["transcribing", "848s", "named by operator"] },
      { title: "Weeknight dal", status: "transcript ready", tone: "success", meta: ["ready", "592s", "named by operator"] },
    ],
    generation: [
      {
        title: "Brown butter banana bread",
        status: "3 of 4 awaiting review",
        tone: "primary",
        meta: ["4 posts", "ready"],
        platforms: four(["muted", "primary", "primary", "primary"], ["created", "needs review", "needs review", "needs review"]),
      },
    ],
    publishing: [
      {
        title: "Sheet-pan chicken, three ways",
        status: "1 live · 3 scheduled",
        tone: "warn",
        meta: ["4 posts", "ready"],
        platforms: four(["success", "warn", "warn", "warn"], ["live", "scheduled", "scheduled", "scheduled"]),
      },
      {
        title: "Cast-iron care in 60 seconds",
        status: "2 live · 0 scheduled",
        tone: "warn",
        meta: ["4 posts", "ready"],
        platforms: four(["success", "success", "primary", "primary"], ["live", "live", "needs review", "needs review"]),
      },
      {
        title: "Sourdough starter, day one",
        status: "all published",
        tone: "success",
        meta: ["4 posts", "ready"],
        platforms: four(["success", "success", "success", "success"], ["live", "live", "live", "live"]),
      },
      {
        title: "Five pantry pastas in 20 minutes",
        status: "all published",
        tone: "success",
        meta: ["4 posts", "ready"],
        platforms: four(["success", "success", "success", "success"], ["live", "live", "live", "live"]),
      },
    ],
  };

  const stageSelect = (colId) => `
    <select aria-label="Stage" class="w-full rounded-sm border border-border bg-background px-1.5 py-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
      ${COLUMNS.map(([id, label]) => `<option value="${id}" ${id === colId ? "selected" : ""}>${label}</option>`).join("")}
    </select>`;

  const cardHtml = (colId, c) => `
    <div class="space-y-2">
      <div role="button" tabindex="0" draggable="true" title="Open &quot;${c.title}&quot;" class="w-full text-left rounded-sm border border-border bg-card p-2.5 space-y-1.5 hover:border-primary/60">
        <div class="text-xs font-semibold leading-snug">${c.title}</div>
        <div class="text-[10px] font-mono uppercase tracking-widest ${TONE[c.tone]}">${c.status}</div>
        ${
          c.meta.length
            ? `<div class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground truncate">${c.meta.join(" · ")}</div>`
            : ""
        }
        ${
          c.platforms && c.platforms.length
            ? `<div class="flex flex-wrap gap-1">${c.platforms
                .map(
                  (p) =>
                    `<span title="${LABEL[p.platform]} — ${p.label}" class="text-[10px] font-mono uppercase border border-border rounded-sm px-1 py-0.5 ${TONE[p.tone]}">${p.platform.slice(0, 2)}</span>`,
                )
                .join("")}</div>`
            : ""
        }
      </div>
      <div class="flex items-center gap-1.5">
        <div class="min-w-0 flex-1">${stageSelect(colId)}</div>
        <button type="button" title="Rename &quot;${c.title}&quot;" aria-label="Rename ${c.title}" class="shrink-0 rounded-sm border border-border p-1 text-muted-foreground hover:border-primary hover:text-primary">${L.icon("Pencil", "h-3.5 w-3.5")}</button>
        <button type="button" title="Delete &quot;${c.title}&quot; permanently" aria-label="Delete ${c.title}" class="shrink-0 rounded-sm border border-border p-1 text-muted-foreground hover:border-danger hover:text-danger">${L.icon("Trash2", "h-3.5 w-3.5")}</button>
      </div>
    </div>`;

  const column = ([id, label, hint]) => {
    const list = cards[id];
    return `
      <div class="w-full min-w-0 md:w-[280px] md:shrink-0 rounded-md border p-2 space-y-2 border-border bg-muted/30">
        <button type="button" title="${hint}" aria-expanded="true" class="flex w-full items-center gap-2 px-1 text-left">
          ${L.icon("ChevronDown", "h-3.5 w-3.5 shrink-0 text-muted-foreground")}
          <span class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">${label}</span>
          <span class="ml-auto text-[10px] font-mono text-muted-foreground">${list.length}</span>
        </button>
        ${list.length ? list.map((c) => cardHtml(id, c)).join("") : `<div class="px-1 pb-1 text-[11px] text-muted-foreground">nothing here</div>`}
      </div>`;
  };

  const total = Object.values(cards).reduce((n, l) => n + l.length, 0);

  const partyPopper = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5" aria-hidden="true"><path d="M5.8 11.3 2 22l10.7-3.79"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/><path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"/><path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17"/><path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7"/><path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"/></svg>`;

  const viewToggle = ["card", "list"]
    .map(
      (v) =>
        `<button title="Switch to ${v} view" class="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1.5 ${
          v === "card" ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-muted"
        }">${v} view</button>`,
    )
    .join("");

  return L.page(
    `
    ${L.header({
      title: "Video Content Flow",
      info: true,
      actions: `
        <div class="flex flex-wrap items-center gap-2">
          ${L.pill("primary", `${total} items`)}
          <div class="flex rounded-sm border border-border overflow-hidden">${viewToggle}</div>
          <button title="Start a new content card by writing its content idea first" class="text-xs border border-primary text-primary rounded-sm px-3 py-1.5 hover:bg-primary/10 disabled:opacity-50 inline-flex items-center gap-1.5">${L.icon("Plus", "h-3.5 w-3.5")}Create New Content</button>
          <button title="Skip the idea and create an empty production card to upload a video into" class="text-xs border border-border rounded-sm px-3 py-1.5 hover:bg-muted disabled:opacity-50">Start without an idea</button>
          <button title="Reload the board from the latest data" class="text-xs border border-border rounded-sm px-3 py-1.5 hover:bg-muted">Refresh</button>
          <button aria-pressed="true" title="Turn off the confetti when a card reaches Publishing" class="text-xs border rounded-sm px-3 py-1.5 inline-flex items-center gap-1.5 border-primary text-primary hover:bg-primary/10">${partyPopper}Confetti on</button>
        </div>`,
    })}

    <div class="pb-4 md:overflow-x-auto">
      <div class="flex flex-col gap-3 md:flex-row md:min-w-max md:items-start">
        ${COLUMNS.map(column).join("")}
      </div>
    </div>
  `,
    "",
  );
};
