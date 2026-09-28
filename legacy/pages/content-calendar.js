window.LEGACY = window.LEGACY || {};
window.LEGACY["content-calendar"] = () => {
  const outlineSm =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs";

  const days = [
    { label: "Mon, Sep 21", items: [["12:00 PM", "youtube", "Cast-Iron Care in 60 Seconds #shorts", false]] },
    {
      label: "Tue, Sep 22",
      items: [["9:00 AM", "wordpress", "Sheet-Pan Chicken, Three Ways (One Pan, Three Dinners)", false]],
    },
    { label: "Wed, Sep 23", items: [] },
    {
      label: "Thu, Sep 24",
      items: [["10:30 AM", "facebook", "Your cast-iron pan isn't ruined. Sixty seconds, three steps,", false]],
    },
    {
      label: "Fri, Sep 25",
      items: [["6:00 PM", "instagram", "Rust spot on your skillet? Don't panic. 🍳 Scrub, dry on the", false]],
    },
    { label: "Sat, Sep 26", today: true, items: [] },
    {
      label: "Sun, Sep 27",
      items: [
        ["12:00 PM", "youtube", "Sheet-Pan Chicken 3 Ways | Weeknight Dinners Made Easy", true],
        ["6:30 PM", "wordpress", "Weeknight Dal: Red Lentils, 30 Minutes, One Pot", true],
      ],
    },
  ];

  const block = ([time, platform, title, movable]) => `
    <button type="button" title="${movable ? "Click to view · drag to reschedule" : "Click to view"}" class="w-full text-left rounded-sm border-l-2 ring-1 ring-border/60 transition-colors px-2 py-1.5 border-l-border bg-panel-2 hover:brightness-125 ${movable ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"}">
      <div class="flex items-center gap-1.5 min-w-0">
        <span class="inline-block size-2.5 shrink-0 rounded-[2px] bg-muted-foreground/50"></span>
        <span class="text-[9px] font-mono text-muted-foreground shrink-0">${time}</span>
        <span class="text-[9px] font-mono uppercase tracking-tight text-foreground/80 shrink-0 truncate">${platform}</span>
      </div>
      <div class="text-[11px] leading-tight text-foreground truncate">${title}</div>
    </button>`;

  const cell = (d) => `
    <div class="p-1.5 space-y-1 ring-1 ring-border/60 bg-panel transition-colors min-h-64">
      <div class="text-[10px] font-mono uppercase tracking-tight pb-1 ${d.today ? "text-primary" : "text-muted-foreground"}">${d.label}</div>
      ${d.items.map(block).join("")}
      ${d.items.length ? "" : `<div class="text-[10px] font-mono text-muted-foreground/50">—</div>`}
    </div>`;

  const total = days.reduce((n, d) => n + d.items.length, 0);

  const views = ["day", "week", "month"]
    .map(
      (v) =>
        `<button title="Switch to ${v} view" class="px-3 py-1.5 ${
          v === "week" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-panel-2"
        }">${v}</button>`,
    )
    .join("");

  const platformChips = ["facebook", "instagram", "wordpress", "youtube"]
    .map(
      (p) =>
        `<button title="Show only ${p} posts" class="text-[11px] px-2 py-1 rounded-sm font-mono uppercase tracking-tight ring-1 bg-panel ring-border text-muted-foreground hover:text-primary">${p}</button>`,
    )
    .join("");

  const queueTabs = [
    ["upcoming", "scheduled 5", true],
    ["published", "published 14", false],
    ["problems", "problems 1", false],
  ]
    .map(
      ([key, lbl, on]) =>
        `<button type="button" title="Show ${key} posts" class="px-1.5 py-0.5 rounded-sm text-[10px] font-mono uppercase ring-1 ${
          on ? "bg-primary/10 text-primary ring-primary/30" : "bg-panel-2 text-muted-foreground ring-border hover:text-foreground"
        }">${lbl}</button>`,
    )
    .join("");

  return L.page(
    `
    ${L.header({
      eyebrow: "Publication schedule",
      title: "Content calendar",
      info: true,
      actions: `
        <div class="flex rounded-sm ring-1 ring-border overflow-hidden text-[10px] font-mono">${views}</div>
        ${L.pill("muted", `${total} posts`)}`,
    })}

    <div class="flex flex-wrap items-center gap-2">
      <div class="flex items-center gap-1">
        <button class="${outlineSm}">‹</button>
        <button class="${outlineSm}">today</button>
        <button class="${outlineSm}">›</button>
      </div>
      <div class="text-sm font-medium">Sep 21 – 27, 2026</div>
      <div class="text-[10px] font-mono text-muted-foreground">America/New_York</div>
      <div class="ml-auto flex flex-wrap gap-1.5">${platformChips}</div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-7 gap-1">${days.map(cell).join("")}</div>

    ${L.panel({
      collapsible: true,
      open: false,
      flush: true,
      eyebrow: "publishing · scheduled vs published",
      title: "Publish queue",
      actions: `<div class="flex items-center gap-1">${queueTabs}</div>`,
      body: "",
    })}
  `,
    "max-w-[1400px]",
  );
};
