window.LEGACY = window.LEGACY || {};
window.LEGACY["content-generation"] = () => {
  const runs = [
    {
      name: "Brown butter banana bread",
      platforms: 4,
      when: "9/23/2026, 11:42:10 AM",
      segments: ["pending", "pending", "pending", "pending"],
    },
    {
      name: "Sheet-pan chicken, three ways",
      platforms: 4,
      when: "9/21/2026, 3:05:51 PM",
      segments: ["published", "scheduled", "scheduled", "scheduled"],
    },
    {
      name: "Cast-iron care in 60 seconds",
      platforms: 4,
      when: "9/18/2026, 10:31:02 AM",
      segments: ["published", "published", "pending", "pending"],
    },
    {
      name: "Sourdough starter, day one",
      platforms: 4,
      when: "9/14/2026, 5:58:27 PM",
      segments: ["published", "published", "published", "published"],
    },
    {
      name: "Five pantry pastas in 20 minutes",
      platforms: 4,
      when: "9/9/2026, 3:40:16 PM",
      segments: ["published", "published", "published", "published"],
    },
  ];

  const tone = { published: "bg-success", scheduled: "bg-warn", error: "bg-destructive", pending: "bg-muted" };
  const platformOrder = ["wordpress", "youtube", "facebook", "instagram"];
  const bar = (segs) => `
    <div class="flex h-1.5 w-full overflow-hidden rounded-full bg-panel-2 mt-1.5">
      ${segs
        .map(
          (s, i) =>
            `<div title="${platformOrder[i]}: ${s}" class="h-full flex-1 ${tone[s]} ${i > 0 ? "border-l border-panel" : ""}"></div>`,
        )
        .join("")}
    </div>`;

  const runRow = (g, i) => `
    <li class="relative group">
      <div class="absolute right-2 top-2 z-10 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
        <button title="Rename this video" class="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-sm ring-1 ring-border bg-panel text-muted-foreground">rename</button>
        ${
          g.segments.includes("published")
            ? ""
            : `<button title="Delete this generation and its unpublished posts" class="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-sm ring-1 ring-border bg-panel text-destructive">delete</button>`
        }
      </div>
      <button title="Open this generation run and its platform drafts" class="w-full text-left p-3 hover:bg-panel-2/60 transition ${i === 0 ? "bg-panel-2/60" : ""}">
        <div class="text-xs truncate pr-16">${g.name}</div>
        <div class="flex items-center gap-2 text-[10px] font-mono text-muted-foreground mt-0.5">
          <span>${g.platforms} platforms</span>
          <span class="ml-auto shrink-0">${g.when}</span>
        </div>
        ${bar(g.segments)}
      </button>
    </li>`;

  const filters = [
    ["All", 5, true],
    ["Published", 2, false],
    ["Scheduled", 1, false],
    ["Need review", 1, false],
  ];

  const label = (text) =>
    `<span class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">${text}</span>`;
  const inputCls =
    "mt-1 w-full bg-panel-2 ring-1 ring-border rounded-sm px-3 py-2 text-sm focus:ring-primary focus:outline-none";
  const monoInputCls =
    "mt-1 w-full bg-panel-2 ring-1 ring-border rounded-sm px-3 py-2 text-sm font-mono focus:ring-primary focus:outline-none";

  const drafts = [
    {
      platform: "wordpress",
      label: "WordPress",
      title: "Brown Butter Banana Bread (One Bowl, No Mixer)",
      status: ["success", "approved"],
      edited: true,
      recommended: "recommended · 9/28/2026, 9:00:00 AM",
      when: "2026-09-28T09:00",
      body: `<p>Brown butter is the one step that turns an everyday banana loaf into the one people ask you to bring back. It takes five minutes, one pan, and a little patience while the milk solids go from pale to hazelnut.</p>

<h2>Why brown the butter</h2>
<p>Cooking the butter past melted drives off water and toasts the milk proteins, so the loaf tastes nutty and caramel-deep without any extra sugar.</p>

<h2>What you need</h2>
<ul>
<li>3 very ripe bananas (the spottier the better)</li>
<li>115 g unsalted butter, browned and cooled</li>
<li>150 g light brown sugar</li>
<li>2 eggs, 1 tsp vanilla, 1 tsp baking soda, ½ tsp salt</li>
<li>190 g all-purpose flour</li>
</ul>

[YTID]`,
      hashtags: "#bananabread #brownbutter #baking #weekendbaking",
      comment: "",
      cta: "https://northwindkitchen.example/recipes/brown-butter-banana-bread",
      category: true,
      mediaHint: "hero shot of the sliced loaf on the wire rack",
      notes: "Embeds the YouTube video once it goes live.",
      limitsLabel: "WordPress limits",
      pills: [],
      rules: ["Supports native scheduling via future post status."],
    },
    {
      platform: "youtube",
      label: "YouTube",
      title: "Brown Butter Banana Bread | The 5-Minute Step That Changes Everything",
      status: ["warn", "draft"],
      edited: false,
      recommended: "recommended · 9/28/2026, 12:00:00 PM",
      when: "2026-09-28T12:00",
      body: `Brown butter is the one step that turns a regular banana loaf into the one everybody asks for. In this video I show you exactly when to pull the butter off the heat, how ripe your bananas really need to be, and how to get that crackly sugar top.

Full written recipe: https://northwindkitchen.example/recipes/brown-butter-banana-bread

00:00 Why brown butter
01:12 Browning the butter (what to look for)
03:40 Mashing the bananas
05:05 Mixing — one bowl, no mixer
07:30 The crackly top trick
09:48 Slicing and storing

New videos every week from Northwind Kitchen — subscribe so you don't miss the next one.`,
      hashtags: "#bananabread #brownbutter #bakingtutorial #northwindkitchen",
      comment: "What should I bake next — pumpkin loaf or chocolate zucchini bread? 👇",
      cta: null,
      youtube: true,
      mediaHint: "thumbnail: butter foaming in the pan, bold text 'THE 5-MIN STEP'",
      limitsLabel: "YouTube limits",
      pills: [["muted", "caption 1184/5000"]],
      rules: [
        "Description limit 5000 characters, title limit 100 characters.",
        "Supports native scheduling via private + publishAt.",
      ],
    },
    {
      platform: "facebook",
      label: "Facebook",
      title: null,
      status: ["warn", "draft"],
      edited: false,
      recommended: "recommended · 9/29/2026, 10:30:00 AM",
      when: "2026-09-29T10:30",
      body: `The five-minute step that makes this banana bread taste like it came from a bakery: brown the butter first. 🧈🍌

One bowl, no mixer, and a crackly sugar top that shatters when you slice it. We walk through exactly when to pull the butter off the heat so it goes nutty, not burnt.

Full recipe and video 👇`,
      hashtags: "#bananabread #brownbutter #homebaking",
      comment: "Freezes beautifully — wrap slices individually and toast straight from frozen.",
      cta: "https://northwindkitchen.example/recipes/brown-butter-banana-bread",
      mediaHint: "square crop of the sliced loaf, steam visible",
      limitsLabel: "Facebook limits",
      pills: [["muted", "caption 612/63206"]],
      rules: ["Supports native scheduling — future posts are handed to Facebook."],
    },
    {
      platform: "instagram",
      label: "Instagram",
      title: null,
      status: ["warn", "draft"],
      edited: false,
      recommended: "recommended · 9/30/2026, 6:00:00 PM",
      when: "2026-09-30T18:00",
      body: `Brown the butter. That's it. That's the secret. 🧈

Five minutes in a pan turns a regular banana loaf into the one everybody asks you to bring back — nutty, caramel-deep, with a crackly sugar top.

Recipe is at the link in our bio. Save this for your spottiest bananas 🍌`,
      hashtags: "#bananabread #brownbutter #bakingreels #homebaker #bakefromscratch #comfortbaking #easybaking #weekendbaking #northwindkitchen",
      comment: "Tag someone who always has overripe bananas on the counter 👀",
      cta: null,
      mediaHint: "vertical reel: butter foaming → batter → slice",
      limitsLabel: "Instagram limits",
      pills: [
        ["muted", "caption 498/2200"],
        ["success", "9 hashtags / 30"],
      ],
      rules: ["Caption limit 2200 characters, max 30 hashtags.", "Links are not clickable in captions."],
    },
  ];

  const card = (d) => {
    const body = `
      <div class="p-4 space-y-3">
        <div class="flex items-center gap-2 flex-wrap">
          ${L.pill(d.status[0], d.status[1])}
          ${d.edited ? L.pill("muted", "edited") : ""}
          <span class="text-[10px] font-mono text-muted-foreground ml-auto">${d.recommended}</span>
        </div>

        ${
          d.title
            ? `<label class="block">${label("title")}<input value="${d.title.replace(/"/g, "&quot;")}" class="${inputCls}" /></label>`
            : ""
        }

        <label class="block">
          ${label("body")}
          <textarea class="mt-1 w-full min-h-[160px] text-sm p-3 bg-panel-2 rounded-sm ring-1 ring-border font-mono resize-y focus:ring-primary focus:outline-none">${d.body.replace(/</g, "&lt;")}</textarea>
          <span class="text-[10px] font-mono text-muted-foreground">${d.body.length} chars</span>
        </label>

        <div class="grid grid-cols-2 gap-3">
          <label class="block">
            <span class="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">hashtags ${L.info()}</span>
            <input value="${d.hashtags}" placeholder="#hashtag1 #hashtag2 #hashtag3" class="${monoInputCls}" />
          </label>
          <label class="block">
            ${label("recommended time")}
            <input type="datetime-local" value="${d.when}" class="${monoInputCls}" />
          </label>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <label class="block">
            ${label("first comment")}
            <input value="${d.comment}" class="${inputCls}" />
          </label>
          ${
            d.cta !== null
              ? `<label class="block">${label("CTA URL")}<input value="${d.cta}" placeholder="https://…" class="${monoInputCls}" /></label>`
              : ""
          }
        </div>

        ${
          d.category
            ? `<label class="block">
            <span class="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">blog category ${L.info()}</span>
            <select class="${inputCls}">
              <option value="">— uncategorized —</option>
              <option>Breakfast &amp; Brunch (38)</option>
              <option selected>Baking (61)</option>
              <option>Weeknight Dinners (84)</option>
              <option>Pantry Basics (27)</option>
              <option>Kitchen Skills (19)</option>
            </select>
            <span class="mt-1 block text-[10px] font-mono uppercase tracking-widest text-muted-foreground">ai recommended · baking</span>
          </label>`
            : ""
        }

        ${
          d.youtube
            ? `<div class="rounded-sm ring-1 ring-border">
            <button type="button" class="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-muted/40">
              ${L.icon("ChevronRight", "h-3.5 w-3.5 text-muted-foreground")}
              <span class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Advanced options</span>
              <span class="ml-auto text-[10px] font-mono text-muted-foreground">brand defaults</span>
            </button>
          </div>`
            : ""
        }

        <label class="block">
          ${label("media hint")}
          <input value="${d.mediaHint}" placeholder="suggested image or clip" class="${inputCls}" />
        </label>

        ${
          d.notes
            ? `<div class="text-[11px] font-mono text-muted-foreground italic border-l-2 border-border pl-2">note · ${d.notes}</div>`
            : ""
        }

        <div class="flex items-center gap-2 pt-2 border-t border-border">
          <button title="Rewrite this draft with your feedback" class="text-[10px] font-mono uppercase tracking-widest px-3 py-2 rounded-sm ring-1 ring-border disabled:opacity-50">regenerate</button>
        </div>

        <div class="pt-2 border-t border-border space-y-2">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">${d.limitsLabel} ${L.info()}</span>
            ${d.pills.map((p) => L.pill(p[0], p[1])).join("")}
          </div>
          <ul class="text-[10px] font-mono text-muted-foreground space-y-1">
            ${d.rules.map((r) => `<li>· ${r}</li>`).join("")}
          </ul>
        </div>

        <div class="flex items-center gap-2 flex-wrap pt-2 border-t border-border">
          <button title="Save your edits to this platform draft" class="text-[10px] font-mono uppercase tracking-widest px-3 py-2 rounded-sm bg-primary text-primary-foreground disabled:opacity-50">save</button>
          <div class="inline-flex rounded-sm ring-1 ring-border overflow-hidden">
            <button title="Switch to publishing immediately" aria-pressed="true" class="text-[10px] font-mono uppercase tracking-widest px-3 py-2 disabled:opacity-50 bg-secondary text-secondary-foreground">post now</button>
            <button title="Pick a future date and time to publish" aria-pressed="false" class="text-[10px] font-mono uppercase tracking-widest px-3 py-2 disabled:opacity-50 text-muted-foreground">schedule</button>
          </div>
          <button title="Confirm and publish or schedule this post to the platform" class="text-[10px] font-mono uppercase tracking-widest px-3 py-2 rounded-sm bg-primary text-primary-foreground disabled:opacity-50">post now</button>
        </div>
      </div>`;
    return L.panel({ flush: true, eyebrow: d.label, title: d.title || "(no title)", body });
  };

  return L.page(
    `
    ${L.header({
      eyebrow: "Content Generation",
      title: "Per-platform drafts from video + brand voice",
      info: true,
      actions: L.pill("muted", "5 generation runs"),
    })}

    <div class="space-y-0">
      ${L.panel({
        collapsible: true,
        open: false,
        flush: true,
        eyebrow: "publishing · per platform",
        title: "Created, queued, live",
        body: "",
      })}
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <span class="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">filter runs</span>
      ${filters
        .map(
          ([l, n, on]) =>
            `<button title="Show only generation runs in this state" class="rounded-md border px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider transition ${
              on ? "border-primary bg-primary/15 text-foreground" : "border-border text-muted-foreground hover:bg-panel-2/60"
            }">${l} · ${n}</button>`,
        )
        .join("")}
    </div>

    <div class="grid grid-cols-[320px_1fr] gap-6">
      ${L.panel({
        eyebrow: "runs",
        title: "Recent generations",
        body: `<ul class="divide-y divide-border">${runs.map(runRow).join("")}</ul>`,
      })}

      <div class="space-y-4">
        ${L.panel({
          flush: true,
          collapsible: true,
          open: false,
          eyebrow: "this item · per platform",
          title: "Publish status",
          body: "",
        })}
        ${L.panel({
          flush: true,
          body: `
            <div class="flex flex-wrap items-center justify-between gap-3 p-4">
              <div class="text-xs text-muted-foreground">Missing a platform that is connected now? Add posts for it without touching the drafts below.</div>
              <button type="button" title="Generate drafts for connected platforms missing from this run" class="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted disabled:opacity-50">Generate missing platform posts</button>
            </div>`,
        })}
        ${drafts.map(card).join("")}
      </div>
    </div>
  `,
    "max-w-[1400px]",
  );
};
