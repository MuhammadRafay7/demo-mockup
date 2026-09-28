window.LEGACY = window.LEGACY || {};
window.LEGACY["recipe-blog"] = () => {
  const label = "text-[10px] font-mono uppercase tracking-widest text-muted-foreground";
  const btn =
    "text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-sm bg-primary/20 ring-1 ring-primary/40 hover:bg-primary/30 disabled:opacity-50";
  const smile = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>`;
  const emojiTextarea = (cls, attrs, value = "") => `
    <div class="relative">
      <textarea ${attrs} class="pr-9 ${cls}">${value}</textarea>
      <div class="absolute bottom-1.5 right-1.5">
        <button type="button" aria-label="Insert emoji" class="inline-flex items-center justify-center rounded-md size-7 text-muted-foreground hover:text-foreground gap-0.5">${smile}${L.icon("ChevronDown", "size-2.5 opacity-60")}</button>
      </div>
    </div>`;

  const cats = [
    ["Dinner", 184, true],
    ["Pasta", 62, true],
    ["Baking", 97, false],
    ["Bread &amp; Sourdough", 41, false],
    ["Weeknight", 128, true],
    ["Vegetarian", 76, false],
    ["Cast Iron", 23, false],
    ["Kitchen Tips", 58, false],
    ["Uncategorized", 4, false],
  ];
  const catList = (withCount, checkedFn, pad) =>
    cats
      .map(
        ([n, c, on]) => `
      <label class="flex items-center gap-2 px-2 ${pad} text-xs hover:bg-panel cursor-pointer">
        <input type="checkbox" ${checkedFn(on) ? "checked" : ""} />
        <span class="flex-1 truncate">${n}</span>
        ${withCount ? `<span class="text-[9px] font-mono text-muted-foreground">${c}</span>` : ""}
      </label>`,
      )
      .join("");

  const recipes = [
    [4821, "Sheet-Pan Chicken, Three Ways", "draft", "2026-09-24", null, 6, true],
    [4818, "Brown Butter Banana Bread", "draft", "2026-09-22", null, 4, true],
    [4809, "Weeknight Dal", "draft", "2026-09-19", null, 3, true],
    [4802, "Sourdough Starter: Day One", "draft", "2026-09-15", null, 0, true],
    [4797, "Cast-Iron Cornbread", "draft", "2026-09-11", null, 5, false],
    [4790, "Lemon-Garlic Spaghetti", "draft", "2026-09-08", null, 2, true],
    [4786, "White Bean Orecchiette", "draft", "2026-09-05", null, 0, false],
    [4779, "Chilli-Crisp Noodles", "draft", "2026-09-02", null, 3, true],
  ];

  const exemplars = [
    ["Five Pantry Pastas in 20 Minutes", 1840, "Some nights the fridge is bare and the pantry is all you have. Good news: that is plenty. These five pastas each come together in the time it takes the water to boil and the sauce to reduce, and every one of them leans on the same shelf of tins and jars"],
    ["Cast-Iron Care in 60 Seconds", 1120, "If your skillet looks dull and patchy, it is not ruined — it is thirsty. Here is the one-minute routine we use after every cook in the Northwind test kitchen, plus the three things you should never do to seasoned cast iron"],
    ["One-Pot Tomato Orzo", 1530, "This is the dinner we make when nobody wants to do dishes. Orzo cooks right in the sauce, soaking up tomato and garlic until it turns creamy without a drop of cream"],
  ];

  return `
<div class="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
  <header class="space-y-1">
    <div class="${label}">module · recipe blog generator</div>
    <h1 class="text-xl font-semibold">Recipe Blog Generator</h1>
    <p class="text-sm text-muted-foreground max-w-2xl">Studies your existing published recipe posts to learn the format you use, then drafts new blog posts around draft WPRM recipes in that same style. Save as a WordPress draft for review, or publish live.</p>
  </header>

  <section class="panel p-3 space-y-2">
    <div class="flex flex-wrap items-center gap-2">
      <label class="${label}">site</label>
      <select class="text-xs bg-panel-2 ring-1 ring-border rounded-sm px-2 py-1">
        <option>https://northwindkitchen.example</option>
      </select>
    </div>
    <div class="text-[10px] font-mono text-muted-foreground">wprm: detected · total recipes: 412 · meta shape: wprm-v9</div>
  </section>

  <section class="panel p-3 space-y-3">
    <div class="flex items-center justify-between">
      <div>
        <div class="${label}">style template</div>
        <div class="text-sm">Learned from <strong>8</strong> published posts · categories: Dinner, Pasta, Weeknight<span class="text-muted-foreground"> · updated 9/21/2026</span></div>
      </div>
    </div>

    <div class="grid gap-3 md:grid-cols-2">
      <div class="space-y-1">
        <div class="${label}">categories to sample</div>
        <div class="max-h-40 overflow-y-auto ring-1 ring-border rounded-sm bg-panel-2 p-1">
          ${catList(true, (on) => on, "py-1")}
        </div>
        <div class="text-[10px] text-muted-foreground">Leave empty to auto-detect posts containing a WPRM shortcode.</div>
      </div>

      <div class="space-y-2">
        <div>
          <div class="${label}">sample size: 8</div>
          <input type="range" min="4" max="15" value="8" class="w-full" />
        </div>
        <button title="Analyze sampled posts to learn this blog's writing style" class="${btn}">re-learn template</button>
        <div class="text-[11px] space-y-1 font-mono">
          <div>outline: intro → why this works → ingredients → step-by-step → tips &amp; swaps → recipe card</div>
          <div>avg length: 1480 words · card position: end · images/post: 7.4 · featured img: 100%</div>
        </div>
      </div>
    </div>

    <details class="text-xs">
      <summary class="cursor-pointer text-muted-foreground">exemplar snippets (${exemplars.length})</summary>
      <div class="mt-2 space-y-2">
        ${exemplars
          .map(
            ([t, w, s]) => `
        <div class="ring-1 ring-border rounded-sm p-2 bg-panel-2">
          <div class="text-[10px] font-mono text-muted-foreground truncate"><a href="#" class="underline">${t}</a> · ${w} words</div>
          <div class="mt-1 text-xs">${s}…</div>
        </div>`,
          )
          .join("")}
      </div>
    </details>
  </section>

  <section class="panel p-3 space-y-2">
    <div class="flex items-center justify-between">
      <div>
        <div class="${label}">custom prompt instructions</div>
        <div class="text-xs text-muted-foreground max-w-2xl">Extra guidance layered on top of the learned template when drafting new posts — tone, structure preferences, phrases to avoid, SEO angles, disclaimers, etc. Highest priority in the prompt, but can't override the WPRM shortcode rule or JSON output contract.</div>
      </div>
    </div>
    ${emojiTextarea(
      "w-full text-xs bg-panel-2 ring-1 ring-border rounded-sm px-2 py-2 font-mono leading-relaxed",
      `rows="6" placeholder="e.g. Open with a short personal story. Use British spellings. Never say 'delicious' or 'yummy'. Include a 'Why this works' H2. Suggest 2 wine pairings at the end."`,
      "Open with a one-line kitchen moment from Alex. Keep paragraphs under 60 words. Never say &quot;cheap&quot; — say &quot;budget-friendly&quot;. Always include a &quot;Tips &amp; swaps&quot; H2 before the recipe card. Link the matching YouTube video near the top.",
    )}
    <div class="flex items-center gap-2">
      <button disabled title="Save these custom instructions for future draft generation" class="${btn}">save instructions</button>
      <span class="text-[10px] font-mono text-muted-foreground">214/4000 · saved</span>
    </div>
  </section>

  <section class="panel p-3 space-y-2">
    <div class="flex flex-wrap items-center gap-2">
      <label class="${label}">status</label>
      <select class="text-xs bg-panel-2 ring-1 ring-border rounded-sm px-2 py-1">
        <option>any</option>
        <option>unpublished (draft)</option>
        <option>published</option>
      </select>
      <label class="flex items-center gap-1 ${label}">
        <input type="checkbox" checked />
        only recipes with no blog post
      </label>
      <button title="Fetch recipes matching the selected filters" class="ml-auto ${btn}">load recipes</button>
    </div>
  </section>

  <div class="grid gap-4 lg:grid-cols-2">
    <section class="panel p-3">
      <div class="${label} mb-2">recipes · ${recipes.length}</div>
      <div class="space-y-1 max-h-[60vh] overflow-y-auto">
        ${recipes
          .map(
            ([id, t, st, mod, parent, steps, hero], i) => `
        <button title="Generate blog draft" class="w-full text-left px-2 py-1.5 rounded-sm text-xs hover:bg-panel-2 disabled:opacity-50 disabled:cursor-not-allowed ${i === 0 ? "bg-panel-2 ring-1 ring-primary/40" : ""}">
          <div class="flex items-center gap-2">
            <span class="flex-1 truncate">${t}</span>
            <span class="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">${st}</span>
          </div>
          <div class="text-[9px] font-mono text-muted-foreground">#${id} · modified ${mod}${parent ? ` · in post #${parent}` : " · no parent post"}${steps ? ` · ${steps} step img` : ""}${hero ? " · hero" : ""}</div>
        </button>`,
          )
          .join("")}
      </div>
    </section>

    <section class="panel p-3 space-y-2">
      <div class="flex items-center justify-between gap-2">
        <div class="${label}">draft preview</div>
        <div class="flex items-center gap-1.5">
          <label class="${label}">clone skeleton from</label>
          <select class="text-xs bg-panel-2 ring-1 ring-border rounded-sm px-2 py-0.5 max-w-[16rem]">
            <option>auto-pick best</option>
            ${exemplars.map(([t]) => `<option>${t}</option>`).join("")}
          </select>
        </div>
      </div>
      <div class="text-[10px] text-muted-foreground leading-relaxed">Divi 5 blocks from the chosen exemplar are preserved verbatim; only text and images are swapped. This keeps the post rendering correctly in the Divi builder.</div>
      <div class="text-[10px] font-mono text-muted-foreground">cloned from: Five Pantry Pastas in 20 Minutes</div>
      <input class="w-full text-sm bg-panel-2 ring-1 ring-border rounded-sm px-2 py-1" value="Sheet-Pan Chicken, Three Ways (One Tray, Zero Stress)" />
      ${emojiTextarea(
        "w-full text-xs bg-panel-2 ring-1 ring-border rounded-sm px-2 py-1 h-20",
        `placeholder="Excerpt"`,
        "One tray, three flavour directions: lemon-herb, harissa-honey and miso-butter. Dinner in 35 minutes with almost no washing up.",
      )}
      ${emojiTextarea(
        "w-full text-xs font-mono bg-panel-2 ring-1 ring-border rounded-sm px-2 py-1 h-64",
        "",
        `&lt;!-- wp:divi/section {&quot;module&quot;:{&quot;meta&quot;:{&quot;adminLabel&quot;:&quot;Intro&quot;}}} --&gt;
&lt;!-- wp:divi/text --&gt;
&lt;p&gt;Tuesday, 6:40pm, and the only thing in the fridge is a pack of chicken thighs. This is the tray we reach for.&lt;/p&gt;
&lt;!-- /wp:divi/text --&gt;
&lt;!-- wp:divi/heading --&gt;
&lt;h2&gt;Why this works&lt;/h2&gt;
&lt;!-- /wp:divi/heading --&gt;
&lt;!-- wp:divi/text --&gt;
&lt;p&gt;High heat, a single layer and skin-side up — the fat renders and bastes the vegetables underneath…&lt;/p&gt;
&lt;!-- /wp:divi/text --&gt;
[wprm-recipe id=&quot;4821&quot;]`,
      )}

      <div class="grid gap-2 md:grid-cols-2 pt-1">
        <div>
          <div class="${label}">categories</div>
          <div class="max-h-28 overflow-y-auto ring-1 ring-border rounded-sm bg-panel-2 p-1">
            ${catList(false, (on) => on, "py-0.5")}
          </div>
        </div>
        <div class="space-y-2">
          <div>
            <div class="${label}">publish status</div>
            <div class="flex gap-2 text-xs">
              <label class="flex items-center gap-1"><input type="radio" name="rbg-status" checked /> Draft</label>
              <label class="flex items-center gap-1"><input type="radio" name="rbg-status" /> Publish now</label>
            </div>
          </div>
          <label class="flex items-center gap-2 text-xs">
            <input type="checkbox" checked />
            Use recipe hero image as featured image
          </label>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-2 pt-1">
        <button title="Save or publish this draft to WordPress" class="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-sm ring-1 disabled:opacity-50 bg-success/20 ring-success/40 hover:bg-success/30">save as WordPress draft</button>
        <button title="Generate a new draft for this recipe, discarding current one" class="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-sm ring-1 ring-border hover:bg-panel-2">regenerate</button>
      </div>
    </section>
  </div>
</div>`;
};
