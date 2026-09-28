window.LEGACY = window.LEGACY || {};
window.LEGACY["visual-identity"] = () => {
  const btnCore =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";
  const variants = {
    default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
    outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };
  const btn = (label, { variant = "default", size = "sm", cls = "", disabled = false } = {}) =>
    `<button${disabled ? " disabled" : ""} class="${btnCore} ${variants[variant]} ${
      size === "sm" ? "h-8 px-3 text-xs" : "h-9 px-4 py-2 text-sm"
    } ${cls}">${label}</button>`;

  const textareaCls =
    "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pb-6";
  const inputCls =
    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";
  const counter = (value, limit) =>
    `<span aria-live="polite" class="pointer-events-none select-none tabular-nums text-[10px] leading-none text-muted-foreground absolute bottom-1.5 right-2 z-10">${value.length} / ${limit}</span>`;
  const limitedTextarea = (value, limit, placeholder = "", rows = 2) =>
    `<div class="relative"><textarea rows="${rows}" placeholder="${placeholder}" class="${textareaCls}">${value}</textarea>${counter(value, limit)}</div>`;

  const readinessSignals = [
    { ok: true, label: "Your answers about the look", detail: "6 of 8 answered — 3 is enough" },
    { ok: true, label: "Brand documents uploaded", detail: "2 read and indexed" },
    { ok: true, label: "Your own pictures and stills", detail: "47 in the media library — 8 is enough" },
    { ok: true, label: "Your website reviewed", detail: "reviewed" },
  ];

  const readiness = L.panel({
    title: "Enough to go on",
    eyebrow: "ready",
    actions: `<div class="flex items-center gap-2">${L.pill("success", "ready")}${btn("Review my website", { variant: "outline" })}</div>`,
    body: `
      <div class="space-y-3">
        <p class="text-sm text-muted-foreground">Octaneon will not invent a look. It needs something you told it, and something it can look at.</p>
        <ul class="space-y-1.5">
          ${readinessSignals
            .map(
              (s) => `
          <li class="flex items-start gap-2 text-sm">
            <span aria-hidden="true" class="${s.ok ? "text-success" : "text-muted-foreground"}">${s.ok ? "✓" : "○"}</span>
            <span><span class="${s.ok ? "" : "text-muted-foreground"}">${s.label}</span> <span class="text-xs text-muted-foreground">— ${s.detail}</span></span>
          </li>`,
            )
            .join("")}
        </ul>
      </div>`,
  });

  const colors = [
    ["bg-orange-700", "Primary", "paprika", "#c2410c"],
    ["bg-amber-400", "Accent", "brown-butter gold", "#fbbf24"],
    ["bg-stone-800", "Text", "cast-iron charcoal", "#292524"],
    ["bg-stone-100", "Background", "flour-dusted linen", "#f5f5f4"],
  ];
  const describe = [
    ["Type feel", 400, "Chunky rounded sans for the headline, set tight — friendly and confident, never script or handwritten.", "your answers and 12 cover stills"],
    ["Text treatment", 400, "Two to four words, upper case, sitting on a soft cream band along the bottom third; never over the food itself.", "your answers"],
    ["Photography style", 600, "Overhead and three-quarter shots of the finished dish on a worn wooden board, warm window light from the left, visible steam and crumbs left in.", "47 library photos"],
    ["Framing habits", 400, "Food fills about two thirds of the frame; hands welcome at the edge, faces rarely.", "47 library photos"],
  ];
  const rules = [
    ["do", "Show the finished dish, not the raw ingredients"],
    ["dont", "Put text over the food"],
    ["dont", "Use red arrows, circles or shocked faces"],
    ["do", "Keep the Northwind wordmark in the top-left corner"],
  ];

  const summary =
    "Warm, overhead kitchen-table photography with chunky rounded type on a cream band.";

  const identity = L.panel({
    title: "Your look",
    eyebrow: "last rebuilt 9/18/2026",
    actions: `<div class="flex items-center gap-2">${L.pill("primary", "learning")}${btn("Export guidelines", { variant: "outline" })}${btn("Rebuild from my brand", { variant: "outline" })}</div>`,
    body: `
      <div class="space-y-6">
        <div class="space-y-1.5">
          <label class="text-sm font-medium">In one line</label>
          ${limitedTextarea(summary, 600, "Warm, sun-lit farm photography with blunt condensed type.")}
        </div>

        <div>
          <div class="text-sm font-medium mb-2">Colours</div>
          <div class="space-y-2">
            ${colors
              .map(
                ([swatch, role, name, hex]) => `
            <div class="flex items-center gap-2">
              <span class="h-7 w-7 shrink-0 rounded-sm ring-1 ring-border ${swatch}" aria-hidden="true"></span>
              <span class="w-24 shrink-0 text-xs text-muted-foreground">${role}</span>
              <input value="${name}" class="${inputCls}">
              <input value="${hex}" class="${inputCls.replace("w-full", "")} w-28 font-mono">
            </div>`,
              )
              .join("")}
          </div>
        </div>

        ${describe
          .map(
            ([label, limit, value, source]) => `
        <div class="space-y-1.5">
          <label class="text-sm font-medium">${label}</label>
          ${limitedTextarea(value, limit)}
          <p class="text-xs text-muted-foreground">Where this came from: ${source}</p>
        </div>`,
          )
          .join("")}

        <div class="space-y-1.5">
          <label class="text-sm font-medium">Mood words</label>
          <input value="warm, generous, unfussy, homemade" placeholder="warm, hard-working, honest" class="${inputCls}">
        </div>

        <div>
          <div class="text-sm font-medium mb-2">Rules</div>
          <div class="space-y-2">
            ${rules
              .map(
                ([kind, text]) => `
            <div class="flex items-start gap-2">
              ${btn(kind === "do" ? "Always" : "Never", { variant: kind === "dont" ? "destructive" : "outline", cls: "w-20 shrink-0" })}
              <div class="relative flex-1">
                <input value="${text}" class="${inputCls} pr-16">
                ${counter(text, 240)}
              </div>
              ${btn("×", { variant: "ghost" })}
            </div>`,
              )
              .join("")}
            ${btn("Add a rule", { variant: "outline" })}
          </div>
        </div>

        <div class="flex items-center gap-3 border-t border-border pt-4">
          ${btn("Save look", { size: "default" })}
          <div class="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Earlier versions:</span>
            ${["v6", "v5", "v4", "v3", "v2"].map((v) => btn(v, { variant: "ghost" })).join("")}
          </div>
        </div>
      </div>`,
  });

  const docs = [
    ["Northwind Kitchen brand guide 2026.pdf", "pdf", "4.2 MB", "12d ago"],
    ["Logo usage and clear space.docx", "docx", "318 KB", "12d ago"],
  ];
  const documents = L.panel({
    title: "Brand documents for the look",
    flush: true,
    body: `
      <div class="p-4 border-b border-border grid grid-cols-2 md:grid-cols-4 gap-4">
        ${[
          ["documents", "2"],
          ["indexed", "2"],
          ["processing", "0"],
          ["scope", "Northwind Kitchen"],
        ]
          .map(
            ([k, v]) => `
        <div>
          <div class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">${k}</div>
          <div class="mt-1 text-sm font-medium truncate">${v}</div>
        </div>`,
          )
          .join("")}
      </div>
      <div class="p-4 border-b border-border flex flex-col md:flex-row md:items-center gap-3">
        <input type="file" multiple class="text-xs font-mono file:mr-3 file:text-[10px] file:uppercase file:tracking-widest file:font-mono file:bg-primary file:text-primary-foreground file:border-0 file:rounded-sm file:px-3 file:py-1.5 file:cursor-pointer disabled:opacity-50">
        <span class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Upload a brand guide, style sheet or logo usage document (pdf, docx, md, txt, csv). What it says outranks anything we guess.</span>
      </div>
      <div class="divide-y divide-border">
        <div class="px-4 py-2 grid grid-cols-12 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          <div class="col-span-5">document</div>
          <div class="col-span-2">tag</div>
          <div class="col-span-1">kind</div>
          <div class="col-span-1">size</div>
          <div class="col-span-2">uploaded</div>
          <div class="col-span-1 text-right">status</div>
        </div>
        ${docs
          .map(
            ([name, kind, size, when]) => `
        <div class="px-4 py-3 grid grid-cols-12 items-center text-sm">
          <div class="col-span-5 truncate">${name}</div>
          <div class="col-span-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">brand look</div>
          <div class="col-span-1 text-[10px] font-mono text-muted-foreground uppercase">${kind}</div>
          <div class="col-span-1 text-[10px] font-mono text-muted-foreground">${size}</div>
          <div class="col-span-2 text-[10px] font-mono text-muted-foreground">${when}</div>
          <div class="col-span-1 flex justify-end items-center gap-2">
            ${L.pill("success", "indexed")}
            <button class="inline-flex items-center justify-center size-6 rounded-sm text-muted-foreground hover:text-danger hover:bg-danger/10 transition-colors" aria-label="remove ${name}">${L.icon("Trash2", "size-3.5")}</button>
          </div>
        </div>`,
          )
          .join("")}
      </div>`,
  });

  const styleRef = `
    <div class="panel p-4 space-y-3">
      <div>
        <h2 class="text-sm font-medium">Learn from a cover you like</h2>
        <p class="text-xs text-muted-foreground mt-1">Point at any thumbnail — yours or anyone's — and Octaneon writes down the look in plain English and fills anything this brand has not settled yet. Nothing already agreed is changed, and the picture itself is never kept.</p>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <input placeholder="Paste a YouTube link" class="input-base flex-1 min-w-[16rem]">
        <button disabled class="text-xs border border-primary text-primary rounded-sm px-3 py-2 hover:bg-primary/10 disabled:opacity-50 inline-flex items-center gap-1.5">Learn from link</button>
        <button class="text-xs border border-border rounded-sm px-3 py-2 hover:bg-muted disabled:opacity-50 inline-flex items-center gap-1.5">${L.icon("Upload", "h-3.5 w-3.5")}Upload a cover</button>
      </div>
    </div>`;

  const questions = [
    ["Whose covers do you admire?", "Channels, brands or magazines whose look you'd be happy to be compared with.", "e.g. Kurzgesagt for colour discipline, Bon Appétit for food close-ups", 600, "Bon Appétit and Serious Eats for honest close-ups; Half Baked Harvest for warm light."],
    ["What do you never want to see?", "The looks that would embarrass you — be blunt.", "e.g. red arrows, shocked faces, purple gradients, stock-photo handshakes", 600, "Red arrows, shocked faces, neon outlines, anything that looks like a stock photo."],
    ["How bold should the words be?", "Huge shouty type, or restrained and editorial?", "e.g. big and blunt, two or three words max, always upper case", 400, "Big and friendly, three or four words, never a full sentence."],
    ["How much should people fill the frame?", "Faces front and centre, hands and work, or scenery only?", "e.g. real farm hands doing real work, faces welcome but never posed", 400, "Hands stirring or plating are great; faces only when it's Alex tasting."],
    ["What should the colour feel like?", "Warm or cool, saturated or muted, bright or moody.", "e.g. warm afternoon light, sun-bleached greens, nothing neon", 400, "Warm and golden, like a weekend morning kitchen. Nothing blue or cold."],
    ["Where do your pictures belong?", "The places and materials that say this is your brand.", "e.g. the grove, the packing shed, the farmers market table", 400, "Our butcher-block counter, the cast-iron pan, the market stall on Saturdays."],
    ["Does the look shift through the year?", "Harvest, holidays, campaigns — anything that should change the palette or mood.", "e.g. harvest months go golden, spring goes bright green", 400, ""],
    ["Anything else about how it should look?", "Rules, logos, legal wording, whatever else matters.", "e.g. never cover a face, never put text over the fruit", 600, ""],
  ];
  const interview = L.panel({
    title: "Tell us how it should look",
    eyebrow: "6 of 8 answered",
    collapsible: true,
    open: true,
    body: `
      <div class="space-y-5">
        <p class="text-sm text-muted-foreground">Your answers outrank anything guessed from your photos. Everything saves on its own.</p>
        ${questions
          .map(
            ([label, help, placeholder, limit, value]) => `
        <div class="space-y-1.5">
          <label class="text-sm font-medium">${label}</label>
          <p class="text-xs text-muted-foreground">${help}</p>
          ${limitedTextarea(value, limit, placeholder)}
        </div>`,
          )
          .join("")}
      </div>`,
  });

  const covers = [
    ["PANTRY PASTA", "liked"],
    ["20-MINUTE DINNER", null],
    ["FIVE PASTAS", "rejected"],
    ["NO-SHOP PASTA", null],
  ];
  const training = L.panel({
    title: "Train the look",
    eyebrow: "2 rounds done",
    actions: `<div class="flex items-center gap-2">${L.pill("warn", "waiting on you")}</div>`,
    body: `
      <div class="space-y-6">
        <p class="text-sm text-muted-foreground">Each round builds four covers on one of your real videos, each with a deliberately different look. Say which ones you'd publish. After a few rounds the choices stop changing and the look is locked in.</p>

        <div class="space-y-4">
          <div class="text-xs text-muted-foreground">Round 3 · built on “Five pantry pastas in 20 minutes”</div>
          <div class="grid gap-4 sm:grid-cols-2">
            ${covers
              .map(
                ([hook, verdict]) => `
            <div class="rounded-md border border-border p-3 space-y-2">
              <div class="aspect-video w-full rounded-sm bg-panel-2"></div>
              <div class="text-sm font-medium">${hook}</div>
              <div class="flex gap-2">
                ${btn("I'd publish this", { variant: verdict === "liked" ? "default" : "outline" })}
                ${btn("Not this", { variant: verdict === "rejected" ? "destructive" : "outline" })}
              </div>
              ${limitedTextarea(verdict === "rejected" ? "Too much text, and it covers the pasta." : "", 400, "Optional: what's wrong or right about it")}
            </div>`,
              )
              .join("")}
          </div>
          <div class="flex items-center gap-3 border-t border-border pt-4">
            ${btn("Save my choices", { size: "default" })}
            <span class="text-xs text-muted-foreground">2 of 4 judged</span>
          </div>
        </div>

        <div class="border-t border-border pt-4 space-y-3">
          <div>
            <div class="text-sm font-medium">Was the look from round 2 right?</div>
            <p class="text-xs text-muted-foreground">Say why in your own words — later covers are asked to respect it.</p>
          </div>
          <div class="flex gap-2">
            ${btn(`${L.icon("ThumbsUp", "mr-1.5 h-4 w-4")}Approved`, { variant: "default" })}
            ${btn(`${L.icon("ThumbsDown", "mr-1.5 h-4 w-4")}Rejected`, { variant: "outline" })}
          </div>
          ${limitedTextarea("The cream band and the overhead shot felt like us. Keep the type chunkier though.", 600, "Why did this look work, or not?", 3)}
          <div class="flex items-center gap-3">
            ${btn("Save reason")}
            <span class="text-xs text-muted-foreground">Recorded as approved.</span>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 border-t border-border pt-4">
          <div>
            <div class="text-sm font-medium mb-1">What you keep choosing</div>
            <ul class="text-sm text-muted-foreground space-y-0.5">
              <li>headline placement: bottom</li>
              <li>picture source: real photo</li>
              <li>headline length: short</li>
              <li>framing: close up</li>
            </ul>
          </div>
          <div>
            <div class="text-sm font-medium mb-1">What you keep rejecting</div>
            <ul class="text-sm text-muted-foreground space-y-0.5">
              <li>picture source: painted background</li>
              <li>headline length: long</li>
              <li>support line: kept</li>
            </ul>
          </div>
        </div>

        <div class="border-t border-border pt-4">
          <div class="text-sm font-medium mb-1">Earlier rounds</div>
          <ul class="text-sm text-muted-foreground space-y-0.5">
            <li>Round 2: 2 liked · Sourdough starter, day one · 👍 — The cream band and the overhead shot felt like us. Keep the type chunkier though.</li>
            <li>Round 1: 1 liked · Sheet-pan chicken, three ways · 👎 — Too dark and moody, reads like a restaurant not a home kitchen.</li>
          </ul>
        </div>
      </div>`,
  });

  return L.page(
    `
    ${L.header({
      eyebrow: "Brand",
      title: "Visual Identity",
      info: true,
      actions: `<a href="#" class="text-sm underline">Training analytics</a>`,
    })}
    <div class="space-y-6 sm:space-y-8">
      ${readiness}
      ${identity}
      ${documents}
      ${styleRef}
      ${interview}
      ${training}
    </div>
  `,
    "max-w-5xl",
  );
};
