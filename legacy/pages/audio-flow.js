window.LEGACY = window.LEGACY || {};
window.LEGACY["audio-flow"] = () => {
  const label = "text-[10px] font-mono uppercase tracking-widest text-muted-foreground";
  const tag = (t) =>
    `<span class="inline-block rounded border border-border/60 bg-muted/30 px-1.5 py-0.5 text-[11px]">${t}</span>`;
  const planCard = (p, index) => `
    <div class="rounded border border-border/60 bg-muted/10 p-3 space-y-2">
      <div class="text-sm font-medium">${index !== undefined ? `${index + 1}. ` : ""}${p.title}</div>
      <div class="text-xs text-muted-foreground">${p.angle}</div>
      <ul class="list-disc pl-4 text-xs text-muted-foreground space-y-0.5">${p.points.map((k) => `<li>${k}</li>`).join("")}</ul>
      <div class="flex flex-wrap gap-1">${p.keywords.map(tag).join("")}</div>
    </div>`;

  const rows = [
    ["Pantry pasta podcast — episode 12", "Drafts ready", "text-success", true],
    ["Sourdough Q&amp;A with Sam", "Recommendation ready", "text-accent", false],
    ["Cast-iron myths voice memo", "Sent to blog", "text-success", false],
    ["Sheet-pan chicken walkthrough", "Transcribed", "text-foreground", false],
    ["Banana bread outtakes", "Transcribing", "text-warn", false],
    ["Market haul: September — voiceover", "Uploaded", "text-muted-foreground", false],
    ["dal-recording-take-2.m4a", "Failed", "text-danger", false],
  ];

  const single = {
    title: "Five Pantry Pastas and the Shelf That Makes Them",
    angle: "One long read covering the whole episode, organised by pasta.",
    points: [
      "The eight pantry staples behind every recipe",
      "Five pastas, each under 20 minutes",
      "Listener swaps and substitutions",
    ],
    keywords: ["pantry pasta", "easy pasta recipes", "weeknight dinner"],
  };
  const multiple = [
    {
      title: "The Eight-Item Pantry That Feeds a Week of Pasta",
      angle: "A stocking guide pulled from the first third of the episode.",
      points: ["Which tins earn their space", "Dried shapes worth keeping", "What to skip"],
      keywords: ["pantry staples", "stocking a pantry"],
    },
    {
      title: "Cacio e Pepe Without the Clumps",
      angle: "Alex's pasta-water method, step by step.",
      points: ["Why the cheese seizes", "Temperature and timing", "Rescue if it splits"],
      keywords: ["cacio e pepe", "pecorino pasta"],
    },
    {
      title: "Listener Questions: Swaps for Every Pantry Pasta",
      angle: "The Q&amp;A segment turned into a reference post.",
      points: ["Gluten-free shapes", "No anchovies? Try this", "Making it vegan"],
      keywords: ["pasta substitutions", "vegan pasta"],
    },
  ];

  const drafts = [
    ["The Eight-Item Pantry That Feeds a Week of Pasta", true],
    ["Cacio e Pepe Without the Clumps", true],
    ["Listener Questions: Swaps for Every Pantry Pasta", false],
  ];

  return `
<div class="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
  <header class="space-y-1">
    <div class="${label}">module · audio flow</div>
    <h1 class="text-xl font-semibold">Audio Flow</h1>
    <p class="max-w-2xl text-sm text-muted-foreground">Upload a recording. It is transcribed with the same pipeline used for video, then Octaneon reviews the transcript and recommends whether it should become one blog article or several. You pick, and the drafts are written in your brand voice.</p>
  </header>

  <div class="panel space-y-3 p-4">
    <div class="${label}">upload recording</div>
    <div class="grid gap-3 sm:grid-cols-2">
      <label class="space-y-1 text-xs">
        <span class="text-muted-foreground">Name (optional)</span>
        <input class="w-full rounded border border-border bg-background px-2 py-1.5 text-sm" placeholder="Internal name for this recording" value="Pantry pasta podcast — episode 12" />
      </label>
      <label class="space-y-1 text-xs">
        <span class="text-muted-foreground">Note for the writer (optional)</span>
        <input class="w-full rounded border border-border bg-background px-2 py-1.5 text-sm" placeholder="Anything the drafts should keep in mind" value="Link each post to the matching YouTube video." />
      </label>
    </div>
    <input type="file" accept="audio/*" class="block w-full text-sm" />
    <div class="flex flex-wrap items-center gap-3">
      <button type="button" class="btn-primary text-xs" title="Start transcribing the uploaded recording">Submit for transcription</button>
      <span class="text-xs text-muted-foreground">MP3, M4A, WAV, WebM, OGG, FLAC and AAC are supported.</span>
    </div>
  </div>

  <div class="grid gap-4 lg:grid-cols-[280px_1fr]">
    <div class="panel divide-y divide-border/60 p-0">
      <button type="button" aria-expanded="true" class="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-muted/40">
        ${L.icon("ChevronDown", "h-3.5 w-3.5 shrink-0 text-muted-foreground")}
        <span class="min-w-0 truncate ${label}">recordings</span>
        <span class="ml-auto shrink-0 text-[10px] font-mono text-muted-foreground">${rows.length}</span>
      </button>
      ${rows
        .map(
          ([name, stage, tone, sel]) => `
      <button type="button" title="View this recording" class="block w-full px-3 py-2 text-left text-sm hover:bg-muted/20 ${sel ? "bg-muted/30" : ""}">
        <div class="truncate">${name}</div>
        <div class="text-[10px] font-mono uppercase tracking-widest ${tone}">${stage}</div>
      </button>`,
        )
        .join("")}
    </div>

    <div class="space-y-4">
      <div class="panel space-y-3 p-4">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div class="text-sm font-medium">Pantry pasta podcast — episode 12</div>
            <div class="text-xs text-muted-foreground">Drafts ready · 38,412 transcript characters · 41 min</div>
          </div>
          <div class="flex flex-wrap gap-2">
            <button type="button" class="btn-ghost text-xs" title="Save the recording's name and note">Save name &amp; note</button>
            <button type="button" class="btn-ghost text-xs" title="Retry transcribing this recording">Transcribe</button>
            <button type="button" class="btn-ghost text-xs text-danger" title="Delete this recording and its drafts">Remove</button>
          </div>
        </div>
      </div>

      <div class="panel space-y-3 p-4">
        <div class="${label}">recommendation</div>
        <div class="space-y-4">
          <div class="rounded border border-accent/40 bg-accent/5 p-3 text-sm">
            <span class="font-medium">Octaneon recommends </span>3 separate blog posts — the episode covers three distinct topics that each carry their own search intent.
          </div>
          <p class="text-xs text-muted-foreground">Alex and Sam walk through stocking a pantry for pasta night, break down a clump-free cacio e pepe, then answer listener questions about swaps.</p>
          <div class="flex flex-wrap gap-1">${["pantry staples", "cacio e pepe", "substitutions", "weeknight cooking"].map(tag).join("")}</div>

          <div class="grid gap-3 md:grid-cols-2">
            <label class="cursor-pointer space-y-2 rounded border p-3 border-border/60">
              <div class="flex items-center gap-2 text-sm font-medium">
                <input type="radio" name="af-choice" />
                One blog post
              </div>
              ${planCard(single)}
            </label>
            <label class="cursor-pointer space-y-2 rounded border p-3 border-accent">
              <div class="flex items-center gap-2 text-sm font-medium">
                <input type="radio" name="af-choice" checked />
                3 blog posts
                <span class="text-[10px] uppercase text-accent">recommended</span>
              </div>
              <div class="space-y-2">${multiple.map((p, i) => planCard(p, i)).join("")}</div>
            </label>
          </div>

          <div class="flex flex-wrap gap-2">
            <button type="button" class="btn-primary text-xs" title="Generate the blog draft(s) for the chosen option">Create the separate posts</button>
            <button type="button" class="btn-ghost text-xs" title="Ask Octaneon to review the recommendation again">Review again</button>
          </div>
        </div>
      </div>

      <div class="panel space-y-3 p-4">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div class="${label}">drafts · 3 · separate posts</div>
          <div class="flex flex-wrap items-center gap-2">
            <select class="rounded border border-border bg-background px-2 py-1 text-xs">
              <option>https://northwindkitchen.example</option>
            </select>
            <button type="button" class="btn-primary text-xs" title="Push the drafts to the connected blog">Save to blog as drafts</button>
          </div>
        </div>
        <div class="space-y-3">
          ${drafts
            .map(
              ([t, inBlog]) => `
          <details class="rounded border border-border/60 p-3">
            <summary class="cursor-pointer text-sm font-medium">${t}${inBlog ? `<span class="ml-2 text-[10px] uppercase text-success">in blog</span>` : ""}</summary>
          </details>`,
            )
            .join("")}
        </div>
      </div>
    </div>
  </div>
</div>`;
};
