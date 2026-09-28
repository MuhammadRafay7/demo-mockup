window.LEGACY = window.LEGACY || {};
window.LEGACY["brand-settings"] = () => {
  const monoLabel = "text-[10px] font-mono uppercase tracking-widest text-muted-foreground";
  const inputCls =
    "mt-1 w-full bg-panel-2 ring-1 ring-border rounded-sm px-3 py-2 text-sm focus:ring-primary focus:outline-none disabled:opacity-60";
  const btnCore =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-8 rounded-md px-3 text-xs";
  const badgeBase =
    "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  const textareaCls =
    "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-sm bg-panel-2";

  const zones = [
    "America/Chicago (UTC−5)",
    "America/Denver (UTC−6)",
    "America/Los_Angeles (UTC−7)",
    "America/New_York (UTC−4)",
    "Europe/London (UTC+1)",
  ];

  const publishingFlow = L.panel({
    collapsible: true,
    open: false,
    eyebrow: "settings",
    title: "Content publication flow",
    body: "",
    actions: `<div class="flex items-center gap-2"><button disabled class="text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-sm bg-primary text-primary-foreground disabled:opacity-50">save flow</button></div>`,
  });

  const brandProfile = L.panel({
    flush: true,
    title: "Brand profile",
    body: `
      <div class="p-4 space-y-4">
        <label class="block">
          <span class="${monoLabel}">brand name</span>
          <input value="Northwind Kitchen" class="mt-1 w-full bg-panel-2 ring-1 ring-border rounded-sm px-3 py-2 text-sm focus:ring-primary focus:outline-none">
        </label>
        <label class="block">
          <span class="${monoLabel}">slug</span>
          <div class="mt-1 flex items-center gap-2">
            <input value="northwind-kitchen" class="flex-1 bg-panel-2 ring-1 ring-border rounded-sm px-3 py-2 text-sm font-mono focus:ring-primary focus:outline-none">
            <button class="text-[10px] font-mono uppercase tracking-widest px-2 py-2 rounded-sm ring-1 ring-border hover:bg-panel-2">from name</button>
          </div>
          <span class="text-[10px] font-mono text-muted-foreground">lowercase, letters/numbers/dashes only</span>
        </label>
        <div class="grid grid-cols-2 gap-3 text-[10px] font-mono text-muted-foreground pt-2 border-t border-border">
          <div>brand id · <span class="text-foreground">7c1e4b9a…</span></div>
          <div>created · <span class="text-foreground">Mar 14, 2026</span></div>
        </div>
        <div class="flex items-center gap-3 pt-2">
          <button disabled class="text-[11px] font-mono uppercase tracking-widest px-4 py-2 rounded-sm bg-primary text-primary-foreground disabled:opacity-50">save changes</button>
        </div>
      </div>`,
  });

  const verticals = [
    ["", "Auto-detect from industry"],
    ["food_beverage", "Food & Beverage"],
    ["home_services", "Home & Trade Services"],
    ["health_wellness", "Health & Wellness"],
    ["beauty_personal_care", "Beauty & Personal Care"],
    ["retail_ecommerce", "Retail & E-commerce"],
    ["b2b_saas", "B2B Software & SaaS"],
    ["professional_services", "Professional Services"],
    ["finance_insurance", "Finance & Insurance"],
    ["real_estate", "Real Estate & Property"],
    ["travel_hospitality", "Travel & Hospitality"],
    ["education", "Education & Training"],
    ["media_entertainment", "Media & Entertainment"],
    ["nonprofit", "Nonprofit & Community"],
    ["automotive", "Automotive & Transport"],
    ["manufacturing", "Manufacturing & Industrial"],
    ["agriculture", "Agriculture & Outdoors"],
    ["fitness_sports", "Fitness & Sports"],
    ["pets", "Pets & Animals"],
    ["technology_hardware", "Technology & Hardware"],
    ["other", "Other"],
  ];
  const vocab = "Northwind Kitchen\nnorthwindkitchen.example\nAlex Kim\ncast-iron\nsourdough\ndal\nbrown butter";

  const contact = L.panel({
    flush: true,
    title: "Brand contact & identity",
    body: `
      <div class="p-4 space-y-4">
        <div class="flex items-center gap-4">
          <div class="size-16 rounded-sm bg-panel-2 ring-1 ring-border overflow-hidden">
            <div class="w-full h-full flex items-center justify-center text-[10px] font-mono text-muted-foreground">no logo</div>
          </div>
          <label class="text-[11px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-sm cursor-pointer bg-primary/10 text-primary ring-1 ring-primary/30 hover:bg-primary/20">upload logo<input type="file" class="hidden"></label>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label class="block">
            <span class="${monoLabel}">website</span>
            <input value="https://northwindkitchen.example" placeholder="https://example.com" class="${inputCls}">
          </label>
          <label class="block">
            <span class="${monoLabel}">industry</span>
            <input value="Food & recipes" placeholder="e.g. Home services" class="${inputCls}">
          </label>
          <label class="block">
            <span class="${monoLabel}">support email</span>
            <input value="hello@northwindkitchen.example" class="${inputCls}">
          </label>
          <label class="block">
            <span class="${monoLabel}">support phone</span>
            <input value="+1 503 555 0199" class="${inputCls}">
          </label>
          <label class="block md:col-span-2">
            <span class="${monoLabel}">address</span>
            <input value="2140 SE Division St, Portland, OR 97202" class="${inputCls}">
          </label>
          <label class="block md:col-span-2">
            <span class="${monoLabel}">description</span>
            <textarea rows="3" class="${inputCls}">Northwind Kitchen makes fast, honest weeknight cooking videos and recipes — pantry pastas, sheet-pan dinners, sourdough and cast-iron basics — for home cooks who want dinner on the table in 30 minutes.</textarea>
          </label>
          <label class="block md:col-span-2">
            <span class="${monoLabel}">transcription vocabulary</span>
            <textarea rows="4" placeholder="One term per line, spelled exactly as it should appear" class="${inputCls}">${vocab}</textarea>
            <span class="mt-1 block text-[11px] text-muted-foreground">Brand name, website and connected handles above are always used. Add product names, people, places and common mishearings here — transcripts are rewritten to match this exact spelling and casing.</span>
            <button type="button" class="mt-2 text-[11px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-sm ring-1 ring-border hover:bg-panel-2 disabled:opacity-50">fix existing transcripts</button>
          </label>
          <label class="block">
            <span class="${monoLabel}">vertical (benchmark cohort)</span>
            <select class="${inputCls}">${verticals
              .map(([slug, label]) => `<option${slug === "food_beverage" ? " selected" : ""}>${label}</option>`)
              .join("")}</select>
          </label>
          <label class="block">
            <span class="${monoLabel}">anonymous benchmarking</span>
            <div class="mt-1 flex items-start gap-2 rounded-sm bg-panel-2 ring-1 ring-border px-3 py-2">
              <input type="checkbox" checked class="mt-0.5">
              <span class="text-xs text-muted-foreground">Contribute anonymized structural patterns (post length, opener style, timing, approval rates) to industry benchmarks. No content, audience data, or brand identity ever leaves this brand.</span>
            </div>
          </label>
        </div>
        <div class="flex items-center justify-between border-t border-border pt-3">
          <div></div>
          <button class="text-[11px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-sm bg-primary text-primary-foreground disabled:opacity-50">save</button>
        </div>
      </div>`,
  });

  const timezone = L.panel({
    flush: true,
    title: "Timezone",
    eyebrow: "brand default",
    body: `
      <div class="p-4 space-y-3">
        <div class="text-xs text-muted-foreground">Stored on this brand as scheduling context (posting cadence, approvals gate). Every date and time you see in Octaneon uses <span class="font-mono">your account</span> timezone from <a href="#" class="underline">My Account</a>, not this one.</div>
        <label class="block max-w-md">
          <span class="${monoLabel}">brand timezone</span>
          <select class="mt-1 w-full bg-panel-2 ring-1 ring-border rounded-sm px-3 py-2 text-sm focus:ring-primary focus:outline-none disabled:opacity-50"><option>Select a timezone…</option>${zones
            .map((z) => `<option${z.startsWith("America/Los_Angeles") ? " selected" : ""}>${z}</option>`)
            .join("")}</select>
        </label>
        <div class="flex items-center gap-3">
          <button disabled class="text-[11px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-sm bg-primary text-primary-foreground disabled:opacity-50">save timezone</button>
        </div>
      </div>`,
  });

  const workspace = L.panel({
    eyebrow: "brand profile",
    title: "Workspace identity",
    body: L.kv([
      { k: "brand", v: "Northwind Kitchen" },
      { k: "niche", v: "American-made goods & DTC brands" },
      { k: "language", v: "en-US" },
      { k: "timezone", v: "America/Los_Angeles" },
      { k: "website", v: `<span class="font-mono text-xs">https://northwind-kitchen.example.com</span>` },
      { k: "wordpress_base", v: `<span class="font-mono text-xs">https://northwind-kitchen.example.com/wp-json</span>` },
    ]),
  });

  const handles = [
    ["YouTube", "@NorthwindKitchen", "success", "connected"],
    ["Instagram", "@northwindkitchen", "danger", "error"],
    ["Facebook", "@northwindkitchen", "success", "connected"],
    ["TikTok", "@northwind.kitchen", "success", "connected"],
    ["LinkedIn", "@northwind-kitchen", "success", "connected"],
  ];
  const roster = L.panel({
    eyebrow: "social channels",
    title: "Handles roster",
    body: `
      <div class="divide-y divide-border">
        ${handles
          .map(
            ([platform, handle, tone, label]) => `
        <div class="grid grid-cols-[200px_1fr_auto] gap-4 items-center px-4 py-3">
          <div class="text-sm font-medium">${platform}</div>
          <div class="font-mono text-xs text-muted-foreground truncate">${handle}</div>
          ${L.pill(tone, label)}
        </div>`,
          )
          .join("")}
      </div>
      <div class="px-4 pt-3 pb-3 text-[11px] text-muted-foreground">Handles reflect the live records in <a href="#" class="underline">Integrations</a>. Disconnect or reconnect there to update this roster.</div>`,
  });

  const flags = [
    ["auto_generate_posts", "Auto-create draft variants (not public by itself)."],
    ["auto_post_posts", "Publish via API on calendar schedule without per-item click."],
    ["auto_generate_replies", "Auto-draft comment replies (still human-sent)."],
    ["auto_post_replies", "Send replies via API without per-reply click."],
  ];
  const killSwitch = L.panel({
    eyebrow: "automation",
    title: "Kill-switch flags",
    body: `
      <div class="divide-y divide-border">
        ${flags
          .map(
            ([k, d]) => `
        <div class="grid grid-cols-[1fr_auto_auto] gap-4 items-center px-4 py-3">
          <div>
            <div class="text-sm font-mono">${k}</div>
            <div class="text-xs text-muted-foreground">${d}</div>
          </div>
          ${L.pill("muted", "off")}
          <button class="text-[10px] font-mono px-2 py-1 rounded-sm ring-1 ring-border hover:bg-panel-2 uppercase tracking-widest">toggle</button>
        </div>`,
          )
          .join("")}
      </div>`,
  });

  const purity = L.panel({
    eyebrow: "AI & Brand Voice & Knowledge",
    title: "Brand Voice & Knowledge purity policy",
    body: L.kv([
      { k: "use_for_voice", v: "human_approved_only" },
      { k: "use_for_kb", v: "human_approved_only" },
      { k: "ai_auto_posted", v: L.pill("warn", "analytics only · never indexed") },
      { k: "min_post_offset", v: "45m per platform" },
      { k: "cascade_default", v: "opt-in per reschedule" },
    ]),
  });

  const delayRow = (label, value, unit) => `
    <label class="block">
      <span class="${monoLabel}">${label}</span>
      <div class="mt-1 flex items-center gap-2">
        <input type="number" value="${value}" class="w-28 bg-panel-2 ring-1 ring-border rounded-sm px-3 py-2 text-sm font-mono focus:ring-primary focus:outline-none">
        <select class="bg-panel-2 ring-1 ring-border rounded-sm px-2 py-2 text-sm font-mono focus:ring-primary focus:outline-none">${["minutes", "hours", "days"]
          .map((u) => `<option${u === unit ? " selected" : ""}>${u}</option>`)
          .join("")}</select>
      </div>
    </label>`;
  const cadence = L.panel({
    flush: true,
    title: "Content generation cadence",
    body: `
      <div class="p-4 space-y-4">
        ${delayRow("minimum delay between platforms", 30, "minutes")}
        ${delayRow("maximum delay between platforms", 2, "hours")}
        <div class="flex items-center gap-2">
          <button class="text-[10px] font-mono uppercase tracking-widest px-3 py-2 rounded-sm bg-primary text-primary-foreground disabled:opacity-50">save</button>
        </div>
        <p class="text-[10px] font-mono text-muted-foreground">Scheduler spaces recommended post times across platforms by a gap between the min and max. Set min = max for a fixed interval.</p>
      </div>`,
  });

  const promptPlatforms = [
    ["WordPress", false],
    ["LinkedIn", false],
    ["YouTube", true],
    ["Facebook", false],
    ["Instagram", true],
    ["TikTok", false],
    ["X (Twitter)", false],
    ["Threads", false],
    ["Bluesky", false],
    ["Reddit", false],
    ["Pinterest", false],
  ];
  const prompts = L.panel({
    flush: true,
    title: "Platform prompts",
    body: `
      <div class="p-4 space-y-3">
        <div class="text-xs text-muted-foreground">Customize the AI prompt used to generate posts for each connected platform. The video transcript is appended automatically after the prompt. Leave a prompt matching the default to fall back to Octaneon's built-in template.</div>
        <div class="space-y-2">
          ${promptPlatforms
            .map(
              ([label, custom]) => `
          <div class="ring-1 ring-border rounded-sm bg-panel-2/40">
            <button type="button" class="w-full flex items-center justify-between gap-3 px-3 py-2 text-left hover:bg-panel-2">
              <div class="flex items-center gap-2">
                <span class="text-sm">${label}</span>
                ${L.pill(custom ? "success" : "muted", custom ? "custom" : "default")}
              </div>
              <span class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground inline-flex items-center gap-1">edit ${L.icon("ChevronDown", "h-3 w-3")}</span>
            </button>
          </div>`,
            )
            .join("")}
        </div>
      </div>`,
  });

  const interviewQs = [
    ["Brand name and tagline", "Your brand name and the one-line tagline you want readers to remember.", "Octaneon — Human-in-the-loop content operations for lean brands.", 2, "Northwind Kitchen — real dinners, real fast."],
    ["What do you do?", "Describe your product or service as if you were explaining it to a stranger in one paragraph.", "We help small marketing teams turn one video into a month of platform-ready content...", 4, "We make short, no-nonsense cooking videos and printable recipes that get a good dinner on the table in 20 to 30 minutes, mostly from what's already in your pantry."],
    ["Who is your ideal customer?", "Demographics, job title, pain points, and what they care about most.", "Solo founders and marketing leads at B2B SaaS companies who need consistent content...", 4, "Busy home cooks, 25–45, often with kids, who are tired of takeout but don't have time for fussy recipes. They care about cost, speed and fewer dishes."],
    ["What problem do you solve for them?", "The before-state and the after-state your customers experience.", "They waste hours repurposing content manually and still sound inconsistent across channels...", 4, "Before: staring at the fridge at 6pm and ordering in again. After: a handful of go-to meals they can cook without a recipe card."],
    ["What makes you different from competitors?", "Your unique angle, methodology, or proof that sets you apart.", "Every public action is gated by human approval, so nothing off-brand ships automatically.", 3, "Every recipe is tested three times in a normal home kitchen, and we always show the mistakes."],
    ["Brand personality (5 adjectives)", "If your brand were a person, how would you describe them? List 5 adjectives.", "pragmatic, warm, precise, quietly confident, curious", 2, "warm, practical, unfussy, generous, a little cheeky"],
    ["Desired tone of voice", "How should your content feel? (e.g., professional, casual, playful, authoritative.)", "Conversational but expert — like a smart colleague who actually explains things.", 3, "Like a friend who cooks well talking you through it at the counter — relaxed, encouraging, specific."],
    ["Tone to avoid", "What voice or style do you definitely NOT want in your content?", "No corporate jargon, no hype, no talking down to the reader.", 3, "No food snobbery, no 'hacks' clickbait, no diet talk or guilt."],
    ["Key phrases and vocabulary", "10–20 words, phrases, or terminology your audience uses or you want to own.", "content operations, brand voice, human-in-the-loop, approval gate, repurposing, content flywheel", 3, "weeknight, pantry, one-pan, sheet-pan, cast-iron, 20 minutes, leftovers, batch cook, starter, crispy bits"],
    ["Top content pillars", "3–5 topics you want to be known for. These guide topic clustering and generation.", "1. Content strategy for small teams 2. AI-assisted workflows 3. Brand voice consistency 4. Measurement without vanity metrics", 4, "1. Weeknight dinners 2. Pantry cooking 3. Bread and sourdough 4. Kitchen basics and cast-iron care"],
    ["Common customer questions", "Questions your audience asks most often. These become reply and content seeds.", "How do I keep content consistent across platforms? What does human-in-the-loop actually mean?", 4, "Can I swap the pasta shape? How do I revive a sluggish starter? Can this be made ahead? Is my cast iron ruined?"],
    ["Customer success story or transformation", "A concrete example of how a customer went from before to after. Keep anonymized if needed.", "One customer cut their content production time from 20 hours to 4 hours per week...", 4, "A subscriber went from ordering takeout four nights a week to cooking five nights, and says the pantry pasta series paid for her new pan in a month."],
    ["Brand values and mission", "What you stand for and why you exist beyond making money.", "We believe content should be owned by the brand, not the algorithm. Our mission is to make consistent, on-brand content achievable for lean teams.", 4, "Home cooking should be for everyone. We want to make the everyday dinner feel doable, cheap and a bit joyful."],
    ["Calls to action and offers", "What do you want readers to do? (Book a call, visit a page, download a guide, etc.)", "Visit our website to book a 15-minute workflow audit. Download the free Content Ops Checklist.", 3, "Get the full recipe on northwindkitchen.example. Join the Sunday meal-plan email."],
    ["Brands you admire for voice", "2–3 brands whose content voice feels right. This helps calibrate tone.", "Basecamp for clarity, HubSpot for helpfulness, Notion for utility.", 2, "Serious Eats for rigor, Bon Appétit for warmth, Budget Bytes for practicality."],
  ];

  const badge = (variant, text, extra = "") => {
    const v = {
      default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
      secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline: "text-foreground",
    }[variant];
    return `<div class="${badgeBase} ${v} ${extra}">${text}</div>`;
  };
  const artifactField = (label, content) => `
    <div>
      <span class="text-xs font-mono uppercase text-muted-foreground">${label}</span>
      ${content}
    </div>`;

  const voiceInterview = L.panel({
    title: "Brand Voice Interview",
    eyebrow: "voice",
    body: `
      <div class="p-4 space-y-4">
        <div class="flex items-center justify-between gap-3">
          <div class="text-sm text-muted-foreground">100% answered · ${badge("default", "Processed")}</div>
          <div class="text-xs text-muted-foreground" aria-live="polite">Drafts save automatically</div>
        </div>
        <div class="space-y-4">
          ${interviewQs
            .map(
              ([label, desc, placeholder, rows, answer]) => `
          <div class="space-y-1.5">
            <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm">${label}<span class="text-muted-foreground font-normal"> — ${desc}</span></label>
            <textarea rows="${rows}" placeholder="${placeholder}" class="${textareaCls}">${answer}</textarea>
          </div>`,
            )
            .join("")}
        </div>
        <div class="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div class="text-xs text-muted-foreground" aria-live="polite">Your answers save automatically</div>
          <div class="flex flex-wrap items-center gap-2">
            <button class="${btnCore} border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground">Save draft</button>
            <button class="${btnCore} bg-primary text-primary-foreground shadow hover:bg-primary/90">Process &amp; seed voice</button>
            <button class="${btnCore} hover:bg-accent hover:text-accent-foreground text-destructive hover:text-destructive">Delete</button>
          </div>
        </div>
        <div class="border-t border-border pt-4 space-y-4">
          <div class="text-sm font-medium">Generated brand voice</div>
          <div class="text-sm bg-panel-2 p-3 rounded-sm space-y-2">
            ${artifactField("Summary", `<p class="text-sm">A warm, practical home-cooking voice that talks the viewer through fast weeknight meals like a friend at the counter — specific, encouraging and never precious.</p>`)}
            ${artifactField("Personality", `<div class="flex flex-wrap gap-1 mt-1">${["warm", "practical", "unfussy", "generous", "cheeky"].map((p) => badge("secondary", p, "text-[10px]")).join("")}</div>`)}
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              ${artifactField("Tone", `<p class="text-sm">Relaxed, encouraging and concrete — short sentences, real quantities, honest about shortcuts.</p>`)}
              ${artifactField("Avoid", `<p class="text-sm">Food snobbery, clickbait "hacks", diet talk and guilt.</p>`)}
            </div>
            ${artifactField("Key phrases", `<p class="text-sm">weeknight · pantry · one-pan · sheet-pan · cast-iron · 20 minutes · leftovers · crispy bits</p>`)}
            ${artifactField("Pillars", `<div class="flex flex-wrap gap-1 mt-1">${["Weeknight dinners", "Pantry cooking", "Bread and sourdough", "Kitchen basics"].map((p) => badge("outline", p, "text-[10px]")).join("")}</div>`)}
            ${artifactField("Audience", `<p class="text-sm">Busy home cooks, 25–45, who want cheap, fast dinners with fewer dishes.</p>`)}
            ${artifactField("Differentiator", `<p class="text-sm">Every recipe tested three times in a normal kitchen, mistakes included.</p>`)}
            ${artifactField("Values", `<p class="text-sm">Home cooking should be doable, cheap and a bit joyful for everyone.</p>`)}
            ${artifactField("CTA", `<p class="text-sm">Get the full recipe on northwindkitchen.example and join the Sunday meal-plan email.</p>`)}
            <div class="text-[10px] text-muted-foreground pt-2">Processed 9/19/2026, 3:42:10 PM</div>
          </div>
        </div>
      </div>`,
  });

  const danger = L.panel({
    flush: true,
    title: "Danger zone",
    body: `
      <div class="p-4 flex items-center justify-between gap-4">
        <div class="text-sm text-muted-foreground">Delete this brand workspace. All members and pending invitations will be removed. This cannot be undone.</div>
        <button class="shrink-0 text-[10px] font-mono uppercase tracking-widest px-3 py-2 rounded-sm ring-1 ring-danger/30 text-danger hover:bg-danger/10 disabled:opacity-50">delete brand</button>
      </div>`,
  });

  return L.page(
    `
    ${L.header({
      eyebrow: "Northwind Kitchen · settings",
      title: "Brand settings",
      info: true,
      actions: L.pill("success", "admin"),
    })}
    ${publishingFlow}
    ${brandProfile}
    ${contact}
    ${timezone}
    ${workspace}
    ${roster}
    ${killSwitch}
    ${purity}
    ${cadence}
    ${prompts}
    ${voiceInterview}
    ${danger}
  `,
    "max-w-[900px]",
  );
};
