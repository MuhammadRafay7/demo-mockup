window.LEGACY = window.LEGACY || {};
window.LEGACY["account"] = () => {
  const inputCls =
    "mt-1 w-full bg-panel-2 ring-1 ring-border rounded-sm px-3 py-2 text-sm focus:ring-primary focus:outline-none";
  const field = (label, control) => `
    <label class="block">
      <span class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">${label}</span>
      ${control}
    </label>`;
  const toggle = () => `
    <button type="button" role="switch" aria-checked="true" data-state="checked" class="peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input">
      <span data-state="checked" class="pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"></span>
    </button>`;

  const zones = [
    "America/Chicago (UTC−5)",
    "America/Denver (UTC−6)",
    "America/Los_Angeles (UTC−7)",
    "America/New_York (UTC−4)",
    "Europe/London (UTC+1)",
  ];

  const categories = [
    ["Post failures", "A scheduled or queued post could not be published to a connected platform."],
    ["Backfill & sync results", "A historical import or sync finished, failed, or was cancelled."],
    ["Transcript runs ready for review", "A batch of video transcripts came back and needs a decision."],
    ["Content generation complete", "Copy for a video finished writing and the drafts are ready to review."],
    ["Thumbnail generation complete", "Cover images finished building and are ready for you to pick from."],
    ["Thumbnail problems", "A cover image could not be made, or could not be put on a post that is already live."],
    ["Connected account needs re-authorizing", "A connected account (YouTube, Instagram, Facebook…) lost permission and has to be reconnected before data collection or posting can continue."],
  ];

  const photo = L.panel({
    title: "Photo",
    eyebrow: "avatar",
    flush: true,
    body: `
      <div class="p-4 flex items-center gap-4">
        <div class="size-16 rounded-full bg-panel-2 ring-1 ring-border overflow-hidden">
          <div class="w-full h-full flex items-center justify-center text-xs font-mono text-muted-foreground">AL</div>
        </div>
        <button class="text-[11px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-sm bg-primary/10 text-primary ring-1 ring-primary/30 hover:bg-primary/20">upload photo</button>
      </div>`,
  });

  const contact = L.panel({
    title: "Contact & details",
    eyebrow: "profile",
    flush: true,
    body: `
      <div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        ${field("Display name", `<input value="Alex Kim" class="${inputCls}">`)}
        ${field("Email", `<input value="alex@northwindkitchen.example" disabled class="${inputCls} opacity-60">`)}
        ${field("Phone", `<input value="+1 503 555 0142" placeholder="+1 555 555 5555" class="${inputCls}">`)}
        ${field(
          "Timezone",
          `<select class="mt-1 w-full bg-panel-2 ring-1 ring-border rounded-sm px-3 py-2 text-sm focus:ring-primary focus:outline-none disabled:opacity-50">${zones
            .map((z) => `<option${z.startsWith("America/Los_Angeles") ? " selected" : ""}>${z}</option>`)
            .join("")}</select>
          <span class="mt-1 block text-[10px] font-mono text-muted-foreground">All dates and times across Octaneon render in this timezone.</span>`,
        )}
        ${field("Job title", `<input value="Head of content" placeholder="Marketing lead" class="${inputCls}">`)}
      </div>
      <div class="border-t border-border p-4 flex items-center justify-between">
        <div></div>
        <button class="text-[11px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-sm bg-primary text-primary-foreground disabled:opacity-50">save profile</button>
      </div>`,
  });

  const notifications = L.panel({
    title: "Notifications",
    eyebrow: "alerts",
    flush: true,
    body: `
      <div class="p-4 space-y-3">
        <p class="text-xs text-muted-foreground">Choose which operational alerts for <span class="font-medium">Northwind Kitchen</span> reach you, and how. These are per brand — set them again after switching brands.</p>
        <div class="space-y-2">
          ${categories
            .map(
              ([label, hint]) => `
          <div class="rounded-sm ring-1 ring-border px-3 py-2 space-y-2">
            <div>
              <div class="text-xs font-medium">${label}</div>
              <p class="text-[11px] text-muted-foreground mt-0.5">${hint}</p>
            </div>
            <div class="flex flex-wrap items-center gap-6">
              <label class="flex items-center gap-2">
                ${L.icon("Bell", "h-3.5 w-3.5 text-muted-foreground")}
                <span class="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">in-app</span>
                ${toggle()}
              </label>
              <label class="flex items-center gap-2">
                ${L.icon("Mail", "h-3.5 w-3.5 text-muted-foreground")}
                <span class="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">email</span>
                ${toggle()}
              </label>
            </div>
          </div>`,
            )
            .join("")}
        </div>
      </div>`,
  });

  return L.page(
    `
    ${L.header({ eyebrow: "Account", title: "My profile", info: true })}
    <div class="space-y-6">
      ${photo}
      ${contact}
      ${notifications}
    </div>
  `,
    "max-w-3xl",
  );
};
