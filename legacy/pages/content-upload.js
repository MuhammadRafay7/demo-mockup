window.LEGACY = window.LEGACY || {};
window.LEGACY["content-upload"] = () => {
  const videos = [
    {
      title: "Market haul: September",
      meta: "market-haul-sept_v3.mp4 · 1.2 GB · 14:08 · 262 cues · source: gemini · 9/26/2026, 9:41:17 AM",
      pill: ["warn", "transcribing"],
      action: null,
      generate: null,
    },
    {
      title: "Weeknight dal",
      meta: "weeknight-dal_final.mp4 · 486.3 MB · 9:52 · 188 cues · source: gemini · 9/25/2026, 4:02:55 PM",
      pill: ["success", "ready"],
      action: "re-transcribe",
      generate: "generate posts",
    },
    {
      title: "Brown butter banana bread",
      meta: "brown-butter-banana-bread.mov · 742.9 MB · 11:37 · 214 cues · source: gemini · 9/23/2026, 11:18:40 AM",
      pill: ["warn", "needs review"],
      action: "re-transcribe",
      generate: "regenerate posts",
    },
    {
      title: "Sheet-pan chicken, three ways",
      meta: "sheetpan-chicken-3ways_FINAL2.mp4 · 618.4 MB · 12:24 · 231 cues · source: gemini · 9/21/2026, 2:47:09 PM",
      pill: ["primary", "scheduled"],
      action: "re-transcribe",
      generate: "regenerate posts",
    },
    {
      title: "Cast-iron care in 60 seconds",
      meta: "castiron-60s_vertical.mp4 · 88.2 MB · 1:02 · 24 cues · source: gemini · 9/18/2026, 10:05:33 AM",
      pill: ["primary", "posting"],
      action: "re-transcribe",
      generate: "regenerate posts",
    },
    {
      title: "Sourdough starter, day one",
      meta: "sourdough-starter-day1.mp4 · 534.0 MB · 10:15 · 197 cues · source: gemini · 9/14/2026, 5:21:48 PM",
      pill: ["success", "published"],
      action: "re-transcribe",
      generate: "regenerate posts",
    },
    {
      title: "Five pantry pastas in 20 minutes",
      meta: "five-pantry-pastas_final.mp4 · 412.3 MB · 8:42 · 164 cues · source: gemini · 9/9/2026, 3:12:08 PM",
      pill: ["success", "published"],
      action: "re-transcribe",
      generate: "regenerate posts",
    },
  ];

  const row = (v) => `
    <li class="p-4 space-y-3">
      <div class="flex items-center gap-3">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 min-w-0">
            <div class="text-base sm:text-lg truncate">${v.title}</div>
            <button title="Rename this video" class="shrink-0 text-[10px] font-mono uppercase px-2 py-1 rounded-sm ring-1 ring-border bg-panel-2 text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors">rename</button>
          </div>
          <div class="text-[10px] font-mono text-muted-foreground mt-0.5">${v.meta}</div>
        </div>
        ${L.pill(v.pill[0], v.pill[1])}
        ${
          v.action
            ? `<button title="Re-run transcription for this video" class="text-[10px] font-mono px-2 py-1 rounded-sm ring-1 ring-border uppercase disabled:opacity-40">${v.action}</button>`
            : ""
        }
        <button title="Show or hide this video's transcript and details" class="text-[10px] font-mono px-2 py-1 rounded-sm ring-1 ring-border uppercase inline-flex items-center gap-1">open ${L.icon("ChevronDown", "h-3 w-3")}</button>
        ${
          v.generate
            ? `<button title="Generate platform drafts from transcript + brand voice" class="text-[10px] font-mono px-2 py-1 rounded-sm bg-accent/10 text-accent ring-1 ring-accent/30 uppercase disabled:opacity-40">${v.generate}</button>`
            : ""
        }
        <button title="Permanently delete this video" class="text-[10px] font-mono px-2 py-1 rounded-sm ring-1 ring-border uppercase text-destructive disabled:opacity-40">delete</button>
      </div>
    </li>`;

  return L.page(
    `
    ${L.header({
      eyebrow: "Production",
      title: "Video upload & transcript generation",
      info: true,
      actions: `${L.pill("muted", `${videos.length} in library`)}${L.pill("muted", "timed SRT · no size cap")}`,
    })}

    ${L.panel({
      flush: true,
      eyebrow: "upload",
      title: "Add videos",
      body: `
        <div class="p-6 space-y-4">
          <label class="block border border-dashed rounded-sm p-8 text-center cursor-pointer transition border-border hover:border-primary/60">
            <input type="file" accept="video/*,audio/*" multiple class="hidden" />
            <div class="text-sm">Drop videos here or click to browse</div>
            <div class="text-[11px] font-mono text-muted-foreground mt-1">Multiple files supported · MP4/MOV/WebM/MP3/WAV</div>
          </label>
        </div>`,
    })}

    ${L.panel({
      eyebrow: "library",
      title: "Videos & transcripts",
      actions: `
        <div class="flex items-center gap-2">
          <button title="Auto-name videos that don't have a title yet" class="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-sm ring-1 ring-border text-muted-foreground disabled:opacity-50">name untitled videos</button>
        </div>`,
      body: `<ul class="divide-y divide-border">${videos.map(row).join("")}</ul>`,
    })}
  `,
    "max-w-[1200px]",
  );
};
