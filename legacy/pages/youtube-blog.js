window.LEGACY = window.LEGACY || {};
window.LEGACY["youtube-blog"] = () => {
  const smile = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>`;
  const prompt = `You are a senior content editor writing SEO-optimised blog articles for {{brand}}.

Turn the YouTube transcript into a written article that stands on its own — do not narrate the video ("in this video he says..."), write the substance directly.

Rules:
- Keep the brand's own voice and vocabulary; never invent facts the transcript does not support.
- Match the learned formatting profile below for length, structure and section rhythm.
- Open with a short hook intro, then the outlined H2 sections, then a "Key takeaways" list, then a brief closing paragraph.
- Write for a reader who has not watched the video.`;

  const cats = [
    ["Dinner", 184, true],
    ["Pasta", 62, true],
    ["Baking", 97, false],
    ["Bread &amp; Sourdough", 41, false],
    ["Weeknight", 128, true],
    ["Vegetarian", 76, false],
    ["Cast Iron", 23, false],
    ["Kitchen Tips", 58, true],
    ["Videos", 112, false],
    ["Uncategorized", 4, false],
  ];

  const videos = [
    ["Five pantry pastas in 20 minutes", "KmGtDU3xq8c", "2026-09-23", 18412, "pushed", true],
    ["Sourdough starter, day one", "p9LrT0aWv2E", "2026-09-19", 14203, "generated", false],
    ["Cast-iron care in 60 seconds", "Zc4nQe7Hh1s", "2026-09-16", 2140, "outlined", false],
    ["Sheet-pan chicken, three ways", "bR2yXk8dLmU", "2026-09-12", 11876, null, false],
    ["Brown butter banana bread", "Hq6wVn1pPzo", "2026-09-08", 9954, "error", false],
    ["Weeknight dal", "tE5sJc9gRaY", "2026-09-04", 8120, null, false],
    ["Market haul: September", "Wd7uLb3kFxN", "2026-09-01", 12688, null, false],
  ];
  const statusCls = (s) => (s === "pushed" ? "text-success" : s === "error" ? "text-danger" : "text-warn");
  const btn = "text-[11px] border border-border rounded-sm px-2 py-1 hover:bg-muted disabled:opacity-50";

  return `
<div class="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
  <header class="space-y-1">
    <div class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
      module · youtube blog generator <span role="img" aria-label="Custom module" title="Custom module" class="inline-block rounded-full shrink-0 size-1.5 bg-[oklch(0.68_0.17_240)] shadow-[0_0_6px_oklch(0.68_0.17_240/0.6)]"></span>
    </div>
    <h1 class="text-xl font-semibold">YouTube Blog Generator</h1>
    <p class="text-sm text-muted-foreground max-w-3xl">Uses YouTube videos and transcripts already ingested into this brand's knowledge base. The system returns an outline first, then writes the article against it — formatted like the blog categories you select. Articles embed the source video and are saved to WordPress as drafts, never published automatically.</p>
  </header>

  <section class="panel p-4 space-y-4">
    <button title="Show or hide the generation prompt and formatting setup" class="w-full flex items-center justify-between text-left">
      <span class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">generation setup · prompt &amp; formatting</span>
      <span class="text-[10px] font-mono text-muted-foreground inline-flex items-center gap-1">hide ${L.icon("ChevronUp", "h-3 w-3")}</span>
    </button>

    <div class="space-y-4">
      <div class="space-y-1">
        <div class="flex items-center justify-between gap-2">
          <label class="text-xs font-medium">Generation prompt</label>
          <button title="Reset the generation prompt to the default text" class="text-[10px] border border-border rounded-sm px-2 py-1 hover:bg-muted">Reset to default</button>
        </div>
        <div class="relative">
          <textarea rows="10" class="pr-9 w-full text-xs font-mono bg-background border border-border rounded-sm p-2">${prompt}</textarea>
          <div class="absolute bottom-1.5 right-1.5">
            <button type="button" aria-label="Insert emoji" class="inline-flex items-center justify-center rounded-md size-7 text-muted-foreground hover:text-foreground gap-0.5">${smile}${L.icon("ChevronDown", "size-2.5 opacity-60")}</button>
          </div>
        </div>
        <p class="text-[10px] text-muted-foreground">Placeholders: <code>{{brand}}</code>, <code>{{video_title}}</code>, <code>{{style}}</code> (the learned formatting profile). This prompt drives both the outline and the article.</p>
      </div>

      <div class="space-y-2">
        <label class="text-xs font-medium">Learn formatting from these blog categories</label>
        <div class="flex flex-wrap items-center gap-2">
          <select class="text-xs bg-background border border-border rounded-sm px-2 py-1 max-w-[18rem]">
            <option>https://northwindkitchen.example</option>
          </select>
          <label class="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
            sample
            <input type="number" min="2" max="20" value="8" class="w-14 text-xs bg-background border border-border rounded-sm px-1 py-1" />
            posts
          </label>
          <button title="Analyze sampled posts to learn the blog's formatting style" class="text-xs border border-border rounded-sm px-3 py-1.5 hover:bg-muted disabled:opacity-50">Learn formatting</button>
          <button title="Save the current prompt and category setup" class="text-xs border border-primary text-primary rounded-sm px-3 py-1.5 hover:bg-primary/10 disabled:opacity-50">Save setup</button>
        </div>

        <div class="max-h-52 overflow-y-auto rounded-sm border border-border p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
          ${cats
            .map(
              ([n, c, on]) => `
          <label class="flex items-center gap-2 text-[11px] cursor-pointer">
            <input type="checkbox" ${on ? "checked" : ""} />
            <span class="truncate">${n}</span>
            <span class="text-[9px] font-mono text-muted-foreground">${c}</span>
          </label>`,
            )
            .join("")}
        </div>

        <div class="text-[10px] font-mono text-muted-foreground">learned profile · 8 posts · ~1480 words · ~6 H2 sections · lists in 88% · learned 9/21/2026</div>
      </div>
    </div>
  </section>

  <section class="space-y-2">
    <div class="flex items-center gap-2 flex-wrap">
      <input placeholder="Search video titles…" class="text-xs bg-background border border-border rounded-sm px-2 py-1.5 w-64" />
      <button title="Search for videos matching the entered title" class="text-xs border border-border rounded-sm px-3 py-1.5 hover:bg-muted">Search</button>
      <select class="text-xs bg-background border border-border rounded-sm px-2 py-1.5">
        <option>Embed at top</option>
        <option selected>Embed after intro</option>
        <option>Embed at bottom</option>
      </select>
      <span class="text-[10px] font-mono text-muted-foreground">${videos.length} videos with transcripts</span>
    </div>

    <div class="panel overflow-x-auto">
      <table class="w-full text-xs">
        <thead>
          <tr class="border-b border-border">
            ${["video", "published", "transcript", "status", ""]
              .map((h) => `<th class="text-left px-3 py-2 font-mono uppercase tracking-widest text-[10px] text-muted-foreground">${h}</th>`)
              .join("")}
          </tr>
        </thead>
        <tbody>
          ${videos
            .map(
              ([t, id, pub, ch, st, wp]) => `
          <tr class="border-b border-border/50 align-top">
            <td class="px-3 py-2 max-w-md">
              <div class="font-medium truncate">${t}</div>
              <div class="text-[10px] font-mono text-muted-foreground truncate">${id}</div>
            </td>
            <td class="px-3 py-2 text-muted-foreground whitespace-nowrap">${pub}</td>
            <td class="px-3 py-2 text-muted-foreground whitespace-nowrap">${ch.toLocaleString("en-US")} ch</td>
            <td class="px-3 py-2 whitespace-nowrap">${st ? `<span class="${statusCls(st)}">${st}</span>` : `<span class="text-muted-foreground">—</span>`}</td>
            <td class="px-3 py-2 whitespace-nowrap space-x-2">
              <button title="Generate an article outline from this video's transcript" class="${btn}">Outline</button>
              <button title="Generate a full outline and article from this video" class="${btn}">${st === "generated" || st === "pushed" ? "Regenerate" : "Outline + article"}</button>
              ${st ? `<button title="Open this video's generated draft for editing" class="${btn}">Open</button>` : ""}
              ${wp ? `<a href="#" class="text-[11px] text-primary underline">WP draft</a>` : ""}
            </td>
          </tr>`,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  </section>
</div>`;
};
