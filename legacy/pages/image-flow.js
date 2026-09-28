window.LEGACY = window.LEGACY || {};
window.LEGACY["image-flow"] = () => {
  const label = "text-[10px] font-mono uppercase tracking-widest text-muted-foreground";
  const tag = (t) =>
    `<span class="inline-block rounded border border-border/60 bg-muted/30 px-1.5 py-0.5 text-[11px]">${t}</span>`;
  const field = (l, v) => `
    <div class="space-y-1">
      <div class="${label}">${l}</div>
      <div class="text-sm">${v}</div>
    </div>`;
  const tags = (arr, prefix = "") =>
    `<span class="flex flex-wrap gap-1">${arr.map((t) => tag(prefix + t)).join("")}</span>`;

  const rows = [
    ["Five pantry pastas — flat lay", "ready · drafted", "text-success", true],
    ["Sourdough starter jar, day one", "ready", "text-success", false],
    ["Cast-iron skillet on the hob", "ready · drafted", "text-success", false],
    ["Sheet-pan chicken, three trays", "analyzing", "text-warn", false],
    ["brown-butter-banana-bread.jpg", "pending", "text-muted-foreground", false],
    ["Weeknight dal, overhead", "ready", "text-success", false],
    ["market-haul-sept-stall.jpg", "failed", "text-danger", false],
  ];

  const platforms = ["Instagram", "Facebook", "Pinterest", "Threads", "YouTube"];
  const on = ["Instagram", "Facebook"];

  return `
<div class="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
  <header class="space-y-1">
    <div class="${label}">module · image flow</div>
    <h1 class="text-xl font-semibold">Image Flow</h1>
    <p class="max-w-2xl text-sm text-muted-foreground">Upload a photo. The system reads what is actually in it — subjects, setting, mood, any visible words, search phrases and story angles — then drafts posts and a blog article about that image in your brand voice.</p>
  </header>

  <div class="panel space-y-3 p-4">
    <div class="${label}">upload</div>
    <input type="file" accept="image/*" multiple class="block w-full max-w-md text-sm" />
    <p class="text-xs text-muted-foreground">JPG, PNG, WebP or GIF up to 15 MB each. Images stay private to this brand.</p>
  </div>

  <div class="grid gap-4 lg:grid-cols-[280px_1fr]">
    <div class="panel p-1">
      <button type="button" aria-expanded="true" class="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-muted/40">
        ${L.icon("ChevronDown", "h-3.5 w-3.5 shrink-0 text-muted-foreground")}
        <span class="min-w-0 truncate ${label}">images</span>
        <span class="ml-auto shrink-0 text-[10px] font-mono text-muted-foreground">${rows.length}</span>
      </button>
      <div class="space-y-2 p-2 pt-0">
        ${rows
          .map(
            ([name, status, tone, sel]) => `
        <button title="View this image" class="flex w-full items-center gap-2 rounded border p-2 text-left transition ${
          sel ? "border-primary/60 bg-primary/5" : "border-border/60 hover:bg-muted/30"
        }">
          <span class="size-10 shrink-0 rounded bg-muted/40 flex items-center justify-center text-muted-foreground/50">${L.icon("Image", "size-4")}</span>
          <span class="min-w-0 flex-1">
            <span class="block truncate text-sm">${name}</span>
            <span class="block text-[10px] font-mono uppercase tracking-widest ${tone}">${status}</span>
          </span>
        </button>`,
          )
          .join("")}
      </div>
    </div>

    <div class="space-y-4">
      <div class="panel space-y-3 p-4">
        <div class="flex flex-wrap items-start gap-4">
          <div class="h-56 w-72 max-h-56 rounded border border-border/60 bg-muted/30 flex items-center justify-center text-muted-foreground/50">${L.icon("Image", "size-10")}</div>
          <div class="min-w-[240px] flex-1 space-y-2">
            <input value="Five pantry pastas — flat lay" placeholder="Name this image" class="w-full rounded border border-border/60 bg-background px-2 py-1 text-sm" />
            <textarea rows="3" placeholder="Context the system should know: what this is, where it was taken, what it's for." class="w-full rounded border border-border/60 bg-background px-2 py-1 text-sm">Hero shot for the "Five pantry pastas in 20 minutes" video. Shot in the Northwind test kitchen, Sept 2026.</textarea>
            <div class="flex flex-wrap gap-2">
              <button class="btn-ghost text-xs" title="Save this image's title and notes">Save details</button>
              <button class="btn-primary text-xs" title="Analyze what is in this image">Re-analyze</button>
              <button class="btn-ghost text-xs text-danger" title="Delete this image and its drafts">Remove</button>
            </div>
            <div class="text-[11px] text-muted-foreground">pantry-pastas-flatlay.jpg · 2,418 KB</div>
          </div>
        </div>
      </div>

      <div class="panel space-y-4 p-4">
        <div class="${label}">what the system sees</div>
        ${field("description", "An overhead flat lay of five shallow bowls of pasta on a worn oak table: cacio e pepe, a tomato-anchovy puttanesca, lemon-garlic spaghetti, a white-bean orecchiette and a chilli-crisp noodle dish. A cast-iron skillet, a wedge of pecorino and a jar of chilli crisp sit around the bowls.")}
        <div class="grid gap-4 sm:grid-cols-2">
          ${field("subjects", tags(["pasta bowls", "cast-iron skillet", "pecorino", "chilli crisp jar", "fresh basil"]))}
          ${field("setting", "Home test kitchen, oak table, natural window light")}
          ${field("mood", "Warm, abundant, weeknight-easy")}
          ${field("colours", tags(["tomato red", "butter yellow", "oak brown", "basil green"]))}
          ${field("composition", "Top-down grid, bowls evenly spaced, negative space top right")}
          ${field("words in image", tags(["NORTHWIND", "Chilli Crisp"]))}
        </div>
        ${field("brand relevance", "Matches the pantry pasta series and the brand's fast, budget-friendly weeknight positioning.")}
        ${field(
          "story angles",
          `<ul class="list-disc space-y-1 pl-4">
            <li>Five dinners from one shelf of the pantry</li>
            <li>Which pasta shape goes with which sauce</li>
            <li>The 20-minute rule: boil, sauce, toss</li>
          </ul>`,
        )}
        <div class="grid gap-4 sm:grid-cols-2">
          ${field("search phrases", tags(["pantry pasta recipes", "20 minute pasta", "easy weeknight pasta", "cacio e pepe"]))}
          ${field("hashtags", tags(["pantrypasta", "weeknightdinner", "pastanight", "northwindkitchen"], "#"))}
        </div>
        ${field("alt text", "Five bowls of different pasta dishes arranged on a wooden table, seen from above.")}
        ${field(
          "check before publishing",
          `<ul class="list-disc space-y-1 pl-4 text-warn"><li>Chilli crisp jar label shows a third-party brand name.</li></ul>`,
        )}
      </div>

      <div class="panel space-y-3 p-4">
        <div class="${label}">draft content</div>
        <div class="flex flex-wrap gap-2">
          ${platforms
            .map(
              (p) =>
                `<button class="rounded border px-2 py-1 text-xs transition ${
                  on.includes(p) ? "border-primary/60 bg-primary/10" : "border-border/60 hover:bg-muted/30"
                }">${p}</button>`,
            )
            .join("")}
          <label class="flex items-center gap-1 text-xs"><input type="checkbox" checked /> Blog article</label>
        </div>
        <input placeholder="Optional: the angle to lead with" class="w-full max-w-lg rounded border border-border/60 bg-background px-2 py-1 text-sm" />
        <button class="btn-primary text-xs" title="Generate posts and/or a blog article for this image">Regenerate content</button>
      </div>

      <div class="space-y-3">
        <div class="panel space-y-2 p-4">
          <div class="flex items-center justify-between">
            <div class="${label}">Instagram</div>
            <button class="btn-ghost text-[11px]">Copy</button>
          </div>
          <div class="whitespace-pre-wrap text-sm">Five dinners. One pantry shelf. Twenty minutes each.

Cacio e pepe, puttanesca, lemon-garlic, white-bean orecchiette and a chilli-crisp number for when you want heat. Full recipes on the blog — link in bio.</div>
          <div class="flex flex-wrap gap-1">${["pantrypasta", "weeknightdinner", "pastanight", "northwindkitchen"].map((h) => tag("#" + h)).join("")}</div>
        </div>
        <div class="panel space-y-2 p-4">
          <div class="flex items-center justify-between">
            <div class="${label}">Facebook</div>
            <button class="btn-ghost text-[11px]">Copy</button>
          </div>
          <div class="whitespace-pre-wrap text-sm">What's in your pantry right now? Odds are it's enough for one of these five pastas. We cooked all five in a single afternoon and none took longer than 20 minutes. Which one are you making tonight?</div>
          <div class="flex flex-wrap gap-1">${["pantrypasta", "easydinner"].map((h) => tag("#" + h)).join("")}</div>
        </div>
        <div class="panel space-y-2 p-4">
          <div class="flex items-center justify-between">
            <div class="${label}">blog draft</div>
            <button class="btn-ghost text-[11px]">Copy</button>
          </div>
          <div class="text-base font-semibold">Five Pantry Pastas You Can Make in 20 Minutes</div>
          <div class="text-xs text-muted-foreground">/five-pantry-pastas-20-minutes · Five fast weeknight pastas built from pantry staples, from cacio e pepe to chilli-crisp noodles.</div>
          <div class="whitespace-pre-wrap text-sm">Some nights the fridge is bare and the pantry is all you have. Good news: that is plenty.

## 1. Cacio e pepe
Pecorino, black pepper and starchy pasta water. That's it.

## 2. Tomato-anchovy puttanesca
A tin of tomatoes, a tin of anchovies, olives and capers…</div>
          <div class="flex flex-wrap gap-1">${["pasta", "weeknight", "pantry", "20-minute meals"].map(tag).join("")}</div>
        </div>
      </div>
    </div>
  </div>
</div>`;
};
