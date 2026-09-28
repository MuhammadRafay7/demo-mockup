window.LEGACY = window.LEGACY || {};
window.LEGACY["reply-generation"] = () => {
  const SELECT_CLASS =
    "text-[10px] font-mono uppercase tracking-widest px-2 py-1.5 rounded-sm bg-panel-2 text-foreground ring-1 ring-border hover:bg-panel-2/80 focus:outline-none focus:ring-primary/50";

  const svg = (paths) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  const messageSquare = svg(`<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>`);
  const cornerDownRight = svg(`<polyline points="15 10 20 15 15 20"/><path d="M4 4v7a4 4 0 0 0 4 4h12"/>`);

  const rows = [
    ["youtube", "comment", "@bakeswithbea", "Sep 26, 9:14 AM · 12m ago", "How long can the brown butter sit before I use it? Mine solidified a bit while the bananas were mashing.", null, true],
    ["instagram", "comment", "@mira.cooks", "Sep 26, 8:52 AM · 34m ago", "Can I swap the all-purpose flour for whole wheat in the banana bread? 🍌", "draft", true],
    ["facebook", "comment", "Dana Whitfield", "Sep 26, 8:40 AM · 46m ago", "Made the sheet-pan chicken last night — the lemon version was a hit! Does it work with thighs instead of breasts?", null, false],
    ["youtube", "reply", "@kitchenkev", "Sep 26, 8:03 AM · 1h ago", "@Northwind Kitchen thanks! follow up — what temp for a convection oven?", null, true],
    ["email", "email", "jordan.p@mailbox.example", "Sep 26, 7:31 AM · 1h ago", "Hi! Do you have a printable version of the five pantry pastas? I'd love to keep it on the fridge.", "draft", false],
    ["instagram", "comment", "@thefloured", "Sep 26, 6:55 AM · 2h ago", "What size loaf pan are you using here?", "scheduled", true],
    ["youtube", "comment", "@saltandsourdough", "Sep 25, 11:48 PM · 9h ago", "Day one and my starter already has bubbles — is that normal or is something off?", null, true],
    ["facebook", "comment", "Priya Raman", "Sep 25, 10:12 PM · 11h ago", "Is the cast-iron oil trick safe for enameled pans too?", null, false],
    ["youtube", "comment", "@weeknightwill", "Sep 25, 9:30 PM · 11h ago", "Please do a vegetarian version of the sheet-pan dinner 🙏", "draft", true],
    ["instagram", "reply", "@heyitsnoor", "Sep 25, 8:17 PM · 13h ago", "@northwindkitchen where did you get that cutting board??", null, true],
    ["facebook", "comment", "Mark Oyelaran", "Sep 25, 6:44 PM · 15h ago", "My banana bread always sinks in the middle. Any tips?", null, false],
    ["youtube", "comment", "@frugalfoodie", "Sep 25, 5:20 PM · 16h ago", "Which of the five pastas freezes best for meal prep?", "scheduled", true],
    ["instagram", "comment", "@lena.bakes", "Sep 25, 3:02 PM · 18h ago", "Brown butter changed my life. Do you add it warm or cooled?", null, true],
    ["youtube", "comment", "@castironcarl", "Sep 25, 1:46 PM · 19h ago", "Should I be using flaxseed oil for seasoning or is that a myth?", null, true],
    ["facebook", "reply", "Sam O'Connell", "Sep 25, 12:10 PM · 21h ago", "Same question as above — can you use frozen bananas?", "draft", false],
    ["email", "email", "hello@greenleafmarket.example", "Sep 25, 10:37 AM · 22h ago", "We'd love to feature your market haul video in our newsletter. Who's the best person to talk to?", null, false],
    ["instagram", "comment", "@tinykitchentales", "Sep 25, 9:15 AM · 1d ago", "Recipe please!!! 😍", null, true],
    ["youtube", "comment", "@dalqueen", "Sep 24, 11:02 PM · 1d ago", "Excited for the dal video! Will you be using a pressure cooker or stovetop?", null, true],
    ["facebook", "comment", "Hannah Liu", "Sep 24, 8:39 PM · 1d ago", "Can the sheet-pan chicken be made the night before and reheated?", null, false],
    ["youtube", "comment", "@newbaker22", "Sep 24, 7:15 PM · 1d ago", "My starter smells like nail polish remover — help?", null, true],
    ["instagram", "comment", "@spoonandspice", "Sep 24, 5:48 PM · 1d ago", "Is there a gluten-free option for the pantry pasta?", null, true],
    ["facebook", "comment", "Luis Ortega", "Sep 24, 3:30 PM · 1d ago", "Where can I find the full written recipe?", null, false],
    ["youtube", "reply", "@pastapete", "Sep 24, 1:12 PM · 2d ago", "@Northwind Kitchen what brand of canned tomatoes do you use?", null, true],
    ["instagram", "comment", "@ovenmitts.and.more", "Sep 24, 11:54 AM · 2d ago", "How do you store the banana bread so it doesn't dry out?", null, true],
    ["youtube", "comment", "@quickbites", "Sep 24, 10:21 AM · 2d ago", "Do you have a version of this with less sugar?", null, true],
  ];

  const row = ([platform, kind, author, when, body, draft, hasUrl]) => `
    <li class="first:pt-0 last:pb-0 py-1">
      <div class="flex items-center gap-2">
        <button type="button" aria-expanded="false" aria-label="Expand comment" class="flex-1 min-w-0 text-left flex items-center gap-2 hover:bg-panel-2/30 rounded-sm px-1 -mx-1 py-1">
          <span class="text-muted-foreground font-mono text-[10px] w-3 shrink-0">${L.icon("ChevronRight", "h-3 w-3")}</span>
          ${
            kind === "reply"
              ? `<span class="shrink-0 text-primary" title="Reply within a thread">${cornerDownRight}</span>`
              : `<span class="shrink-0 text-muted-foreground" title="Top-level comment on the post">${messageSquare}</span>`
          }
          <span class="truncate text-xs text-foreground/90">${body}</span>
        </button>
        <div class="flex items-center gap-2 shrink-0 text-[10px] font-mono">
          <span class="hidden sm:inline max-w-[140px] truncate text-muted-foreground">${author}</span>
          <span class="hidden md:inline text-muted-foreground whitespace-nowrap">${when}</span>
          ${L.pill("muted", platform)}
          ${draft === "scheduled" ? L.pill("warn", "scheduled") : ""}
          <button type="button" title="${draft ? "Open the drafted reply for this comment" : "Draft an AI reply for this comment"}" class="px-2.5 py-1 rounded-sm ring-1 uppercase transition-colors disabled:opacity-60 bg-primary/10 text-primary ring-primary/30 hover:bg-primary/20">${draft ? "view draft" : "generate reply"}</button>
          ${
            hasUrl
              ? `<a href="#" class="px-2.5 py-1 rounded-sm ring-1 uppercase transition-colors bg-panel-2 text-muted-foreground ring-border hover:bg-panel-2/80 hover:text-foreground inline-flex items-center gap-1">view <span aria-hidden="true">↗</span></a>`
              : ""
          }
        </div>
      </div>
    </li>`;

  const pendingCount = rows.filter((r) => !r[5]).length;

  return L.page(
    `
    ${L.header({
      eyebrow: "Function C",
      title: "Reply Generation",
      info: true,
      actions: L.pill("primary", "next refresh · in 42m"),
    })}

    ${L.panel({
      eyebrow: "settings",
      title: "Settings",
      actions: `
        <div class="flex items-center gap-2">
          ${L.pill("muted", "3 sources · 7 link platforms · 9 reply platforms · 20–90m · 8a–8p · ±10m jitter")}
          <button type="button" aria-expanded="false" title="Expand reply settings" class="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1.5 rounded-sm bg-panel-2 text-foreground ring-1 ring-border hover:bg-panel-2/70 inline-flex items-center gap-1.5">expand ${L.icon("ChevronDown", "h-3 w-3")}</button>
        </div>`,
      body: "",
    })}

    ${L.panel({
      eyebrow: "reply_queue",
      title: "Platform-aware replies",
      actions: L.pill("primary", "live · from brand knowledge"),
      body: `
        <p class="text-xs text-muted-foreground mb-4">Recent audience comments and inbound emails the brand hasn't replied to yet — on Octaneon or directly on the platform. Filter by platform or keyword; expand a row to draft a reply.</p>

        <div class="mb-4 flex flex-wrap items-center gap-2">
          <div class="relative"><button type="button" aria-label="Platform filter" class="${SELECT_CLASS} inline-flex items-center gap-1.5">All platforms ${L.icon("ChevronDown", "h-3 w-3")}</button></div>
          <div class="relative"><button type="button" aria-label="Reply status filter" class="${SELECT_CLASS} inline-flex items-center gap-1.5">Not replied ${L.icon("ChevronDown", "h-3 w-3")}</button></div>
          <div class="relative"><button type="button" aria-label="Sort order" class="${SELECT_CLASS} inline-flex items-center gap-1.5">Newest first ${L.icon("ChevronDown", "h-3 w-3")}</button></div>
          <input type="search" placeholder="Search comments or authors…" class="flex-1 min-w-[200px] text-xs font-mono px-2.5 py-1.5 rounded-sm bg-panel-2 text-foreground ring-1 ring-border placeholder:text-muted-foreground focus:outline-none focus:ring-primary/50" />
          <button type="button" disabled title="No filter changes to apply" class="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1.5 rounded-sm ring-1 transition-colors bg-panel-2 text-muted-foreground ring-border cursor-not-allowed">apply filters</button>
          <button type="button" title="Clear all filters back to the defaults" class="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1.5 rounded-sm bg-panel-2 text-muted-foreground ring-1 ring-border hover:text-foreground">reset</button>
          <span class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground ml-auto">showing 1–25 of 143</span>
          <button type="button" title="Pull any comments that arrived since the last sync" class="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1.5 rounded-sm ring-1 hover:text-foreground disabled:opacity-50 bg-panel-2 text-muted-foreground ring-border">synced 12m ago</button>
          <span title="Background drafting queue. Last worker run: 9/26/2026, 9:20:04 AM" class="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1.5 rounded-sm ring-1 bg-panel-2 text-muted-foreground ring-border">pre-draft · 6 queued · 2 drafting</span>
          <button type="button" title="Draft replies for ${pendingCount} row(s)" class="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1.5 rounded-sm bg-primary/10 text-primary ring-1 ring-primary/30 hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed">generate all · ${pendingCount}</button>
        </div>

        <ul class="divide-y divide-border">${rows.map(row).join("")}</ul>

        <div class="mt-4 pt-3 border-t border-border flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          <span>page 1 of 6</span>
          <div class="ml-auto flex items-center gap-2">
            <div class="relative"><button type="button" aria-label="Rows per page" class="${SELECT_CLASS} inline-flex items-center gap-1.5">25 / page ${L.icon("ChevronDown", "h-3 w-3")}</button></div>
            <button type="button" disabled title="Go to the previous page of replies" class="px-2.5 py-1.5 rounded-sm bg-panel-2 text-muted-foreground ring-1 ring-border hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed">prev</button>
            <button type="button" title="Go to the next page of replies" class="px-2.5 py-1.5 rounded-sm bg-panel-2 text-muted-foreground ring-1 ring-border hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed">next</button>
          </div>
        </div>`,
    })}
  `,
    "max-w-[1200px]",
  );
};
