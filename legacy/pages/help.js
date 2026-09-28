window.LEGACY = window.LEGACY || {};
window.LEGACY["help"] = () => {
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const sections = [
  {
    "id": "dashboard",
    "title": "Dashboard",
    "blurb": "Reading the daily numbers, the onboarding bar, the brand switcher and the alert bell.",
    "count": 4,
    "route": "/help/dashboard"
  },
  {
    "id": "whats-new",
    "title": "What's New",
    "blurb": "Release notes, the build number, and choosing which announcements reach you.",
    "count": 2,
    "route": "/help/whats-new"
  },
  {
    "id": "settings",
    "title": "Settings",
    "blurb": "Brand profile, channel connections, imports, members and your personal account.",
    "count": 12,
    "route": "/help/settings"
  },
  {
    "id": "functions",
    "title": "Functions",
    "blurb": "Brand voice, production, content generation and publishing, topics, replies and ideas.",
    "count": 12,
    "route": "/help/functions"
  },
  {
    "id": "support",
    "title": "Help",
    "blurb": "How to report a bug, request a feature, and follow what happens next.",
    "count": 4,
    "route": "/help/support"
  }
];
  return L.page(
    `
    ${L.header({ title: "Help Center", info: true })}
    <div class="grid gap-3 sm:grid-cols-2">
      ${sections
        .map(
          (s) => `
        <a href="#" class="panel p-4 block transition-colors hover:border-primary/60">
          <div class="text-sm font-semibold text-foreground">${esc(s.title)}</div>
          <p class="mt-1 text-xs text-muted-foreground">${esc(s.blurb)}</p>
          <div class="mt-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">${s.count} topics</div>
        </a>`,
        )
        .join("")}
    </div>
  `,
    "max-w-3xl",
  );
};
