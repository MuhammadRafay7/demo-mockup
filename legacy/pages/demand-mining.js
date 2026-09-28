window.LEGACY = window.LEGACY || {};
window.LEGACY["demand-mining"] = () => {
  const btn =
    "text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-sm ring-1 ring-border hover:bg-panel-2 disabled:opacity-50";

  const sources = [
    { label: "Budget Bytes", kind: "YouTube channel", origin: "suggested", approved: true },
    { label: "Pro Home Cooks", kind: "YouTube channel", origin: "suggested", approved: true },
    { label: "Joshua Weissman", kind: "YouTube channel", origin: "suggested", approved: false },
    { label: "@TheSourdoughJourney", kind: "YouTube channel", origin: "you added", approved: true },
    { label: "cast iron cleaning mistakes", kind: "Topic search", origin: "you added", approved: true },
    { label: "cheap weeknight dinners for two", kind: "Topic search", origin: "you added", approved: false },
  ];
  const approvedCount = sources.filter((s) => s.approved).length;

  const sourceRows = sources
    .map(
      (s) => `
      <div class="p-4 flex items-center justify-between gap-4">
        <div class="min-w-0">
          <div class="text-sm truncate">${s.label}</div>
          <div class="mt-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">${s.kind} · ${s.origin}</div>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          ${L.pill(s.approved ? "success" : "muted", s.approved ? "approved" : "not approved")}
          <button title="${s.approved ? "Stop analysing this source" : "Include this source in the next run"}" class="${btn}">${s.approved ? "pause" : "approve"}</button>
          <button title="Remove this source" class="${btn}">remove</button>
        </div>
      </div>`,
    )
    .join("");

  const themes = [
    {
      title: "Rescuing a sluggish sourdough starter",
      summary: "Beginners are unsure whether a smelly, flat or liquid-topped starter is dead, and what to change in their feeding routine.",
      demand: 86,
      format: "video",
      ideaId: null,
      questions: [
        "Is it normal for a starter to smell like nail polish remover in the first week?",
        "Should I pour off the grey liquid on top or stir it back in?",
        "How warm does the kitchen need to be for the starter to double?",
      ],
      mentions: 142,
      src: ["The Sourdough Journey", "Pro Home Cooks", "sourdough for beginners"],
    },
    {
      title: "Cast iron that keeps rusting",
      summary: "Viewers wash, dry and oil their pans but still see rust spots and sticky patches.",
      demand: 74,
      format: "short",
      ideaId: "saved",
      questions: [
        "Can I use dish soap on cast iron or does it strip the seasoning?",
        "Why is my pan sticky after I oil it?",
        "Is a little rust dangerous to cook on?",
      ],
      mentions: 97,
      src: ["cast iron cleaning mistakes", "Pro Home Cooks"],
    },
    {
      title: "Cheap dinners that feed two without leftovers",
      summary: "Couples want budget recipes scaled down, and ask how to halve sheet-pan and one-pot meals.",
      demand: 58,
      format: "blog",
      ideaId: null,
      questions: [
        "How do I halve a sheet-pan recipe without everything burning?",
        "What can I cook for two for under $10?",
      ],
      mentions: 61,
      src: ["Budget Bytes", "cheap weeknight dinners for two"],
    },
    {
      title: "Gluten-free swaps for pantry pastas",
      summary: "People ask which gluten-free pastas hold up when finished in the sauce.",
      demand: 33,
      format: "video",
      ideaId: null,
      questions: ["Which gluten-free spaghetti doesn't turn to mush?"],
      mentions: 18,
      src: ["Budget Bytes"],
    },
  ];

  const tone = (score) => (score >= 70 ? "success" : score >= 40 ? "warn" : "muted");

  const themeRows = themes
    .map(
      (t) => `
      <div class="p-4">
        <div class="flex items-start justify-between gap-4">
          <div class="min-w-0">
            <div class="text-sm font-medium">${t.title}</div>
            <p class="mt-1 text-sm text-muted-foreground">${t.summary}</p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            ${L.pill(tone(t.demand), `demand ${t.demand}`)}
            ${L.pill("muted", t.format)}
            <button ${t.ideaId ? "disabled " : ""}title="Save this theme as a content idea" class="${btn}">${t.ideaId ? "saved" : "save as idea"}</button>
          </div>
        </div>
        <ul class="mt-3 space-y-1 text-sm">
          ${t.questions.map((q) => `<li class="text-muted-foreground">— ${q}</li>`).join("")}
        </ul>
        <div class="mt-3 flex flex-wrap gap-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          <span>asked ${t.mentions}×</span>
          ${t.src.map((s) => `<span><a href="#" class="hover:text-foreground underline">${s}</a></span>`).join("")}
        </div>
      </div>`,
    )
    .join("");

  const runs = [
    { at: "9/25/2026, 8:14:02 AM", status: "done", sources: 4, scanned: 1284, themes: 9 },
    { at: "9/18/2026, 7:52:40 AM", status: "done", sources: 3, scanned: 906, themes: 7 },
    { at: "9/11/2026, 9:03:17 AM", status: "error", sources: 3, scanned: 0, themes: 0 },
  ];
  const runRows = runs
    .map(
      (r) => `
      <tr>
        <td class="p-3">${r.at}</td>
        <td class="p-3">${L.pill(r.status === "done" ? "success" : r.status === "error" ? "danger" : "warn", r.status)}</td>
        <td class="p-3 text-right font-mono">${r.sources}</td>
        <td class="p-3 text-right font-mono">${r.scanned}</td>
        <td class="p-3 text-right font-mono">${r.themes}</td>
      </tr>`,
    )
    .join("");

  return L.page(
    `
    ${L.header({ eyebrow: "Analysis", title: "Audience Demand Mining", info: true })}

    ${L.panel({
      title: "Channels &amp; topics to analyse",
      body: `
        <div class="p-4 flex flex-wrap items-center gap-2 border-b border-border">
          <button title="Let Octaneon propose channels in this brand's industry" class="${btn}">suggest channels for me</button>
          <button title="Read the approved channels and topics and build content themes" class="${btn}">run analysis (${approvedCount} approved)</button>
          <span class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">last run ${runs[0].at} · done</span>
        </div>
        <div class="divide-y divide-border">${sourceRows}</div>
        <div class="p-4 border-t border-border grid grid-cols-1 md:grid-cols-4 gap-3 items-start">
          <select class="bg-panel-2 ring-1 ring-border rounded-sm px-3 py-2 text-sm focus:ring-primary focus:outline-none">
            <option value="youtube_channel" selected>YouTube channel</option>
            <option value="youtube_topic">Topic search</option>
          </select>
          <div class="relative md:col-span-2">
            <input maxlength="120" placeholder="Channel name, @handle or channel id" class="w-full bg-panel-2 ring-1 ring-border rounded-sm px-3 py-2 pb-6 text-sm focus:ring-primary focus:outline-none" />
            <span aria-live="polite" class="pointer-events-none select-none tabular-nums text-[10px] leading-none text-muted-foreground absolute bottom-1.5 right-2 z-10">0 / 120</span>
          </div>
          <button disabled title="Add this channel or topic to the list" class="text-[10px] font-mono uppercase tracking-widest px-2 py-2 rounded-sm ring-1 ring-border hover:bg-panel-2 disabled:opacity-50">add</button>
        </div>`,
    })}

    ${L.panel({
      title: "What the audience is asking",
      body: `
        <div class="divide-y divide-border">${themeRows}</div>
        <div class="p-4 border-t border-border text-xs text-muted-foreground">
          Public videos and public comments only. Questions shown here are paraphrased — Octaneon
          never stores another channel's comments, commenter names or profiles.
        </div>`,
    })}

    ${L.panel({
      title: "Recent runs",
      body: `
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                <th class="text-left p-3">started</th>
                <th class="text-left p-3">status</th>
                <th class="text-right p-3">sources</th>
                <th class="text-right p-3">questions read</th>
                <th class="text-right p-3">themes</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">${runRows}</tbody>
          </table>
        </div>`,
    })}
  `,
    "max-w-6xl",
  );
};
