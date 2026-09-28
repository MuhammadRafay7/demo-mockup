window.LEGACY = window.LEGACY || {};

const ICON_PATHS = {
  ChevronDown: "M6 9l6 6 6-6",
  ChevronRight: "M9 6l6 6-6 6",
  ChevronLeft: "M15 6l-6 6 6 6",
  ChevronUp: "M18 15l-6-6-6 6",
  Info: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 16v-4M12 8h.01",
  RefreshCw: "M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5",
  Download: "M12 3v12M7 10l5 5 5-5M4 21h16",
  Upload: "M12 21V9M7 14l5-5 5 5M4 3h16",
  UploadCloud: "M12 13v8M8 17l4-4 4 4M20 16.6A5 5 0 0 0 18 7h-1.3A8 8 0 1 0 4 15.3",
  ExternalLink: "M15 3h6v6M10 14L21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
  Sparkles: "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 16v5M16.5 18.5h5",
  Loader2: "M21 12a9 9 0 1 1-6.2-8.6",
  Check: "M20 6L9 17l-5-5",
  CheckCircle2: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM9 12l2 2 4-4",
  X: "M18 6L6 18M6 6l12 12",
  Plus: "M12 5v14M5 12h14",
  Trash2: "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6",
  Search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.3-4.3",
  AlertCircle: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8v4M12 16h.01",
  AlertTriangle: "M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01",
  Copy: "M9 9h11v11H9zM5 15H4V4h11v1",
  Play: "M6 4l14 8-14 8z",
  Pencil: "M17 3l4 4L7 21H3v-4z",
  Eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  EyeOff: "M17.9 17.9A10 10 0 0 1 12 20C5 20 1 12 1 12a18 18 0 0 1 5.1-5.9M9.9 4.2A9 9 0 0 1 12 4c7 0 11 8 11 8a18 18 0 0 1-2.2 3.2M1 1l22 22",
  History: "M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 7v5l4 2",
  Filter: "M22 3H2l8 9.5V19l4 2v-8.5z",
  Calendar: "M3 5h18v16H3zM16 3v4M8 3v4M3 10h18",
  Clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  Link: "M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7",
  Mail: "M3 5h18v14H3zM3 7l9 6 9-6",
  Settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1L7 17M17 7l2.1-2.1",
  Image: "M3 5h18v14H3zM3 16l5-5 5 5M14 14l2-2 5 5M15.5 8.5h.01",
  Mic: "M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM19 11a7 7 0 0 1-14 0M12 18v3",
  FileText: "M14 2H6v20h12V6zM14 2v4h4M8 13h8M8 17h8M8 9h2",
  Video: "M3 6h13v12H3zM16 10l5-3v10l-5-3",
  Users: "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21a7 7 0 0 1 14 0M16 3.1a4 4 0 0 1 0 7.8M22 21a7 7 0 0 0-4-6.3",
  Bot: "M5 8h14v11H5zM12 4v4M9 13h.01M15 13h.01M2 13h3M19 13h3",
  ArrowRight: "M5 12h14M13 5l7 7-7 7",
  ArrowUpDown: "M7 3v18M3 7l4-4 4 4M17 21V3M13 17l4 4 4-4",
  MoreHorizontal: "M5 12h.01M12 12h.01M19 12h.01",
  Save: "M5 3h11l5 5v13H3V3zM7 3v6h8V3M7 21v-8h10v8",
  Send: "M22 2L11 13M22 2l-7 20-4-9-9-4z",
  Bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0",
  ThumbsUp: "M7 10v12M15 5.9L14 10h5.8a2 2 0 0 1 2 2.3l-1.4 8A2 2 0 0 1 18.4 22H7V10l4-8a3 3 0 0 1 4 3.9z",
  ThumbsDown: "M17 14V2M9 18.1L10 14H4.2a2 2 0 0 1-2-2.3l1.4-8A2 2 0 0 1 5.6 2H17v12l-4 8a3 3 0 0 1-4-3.9z",
  Smile: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01",
  MessageSquare: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  CornerDownRight: "M15 10l5 5-5 5M4 4v7a4 4 0 0 0 4 4h12",
  PartyPopper: "M5.8 11.3L2 22l10.7-3.8M4 3h.01M22 8h.01M15 2h.01M22 20h.01M9 7l8 8",
  Wifi: "M5 12.6a10 10 0 0 1 14 0M8.5 16.1a5 5 0 0 1 7 0M2 8.8a15 15 0 0 1 20 0M12 20h.01",
  Merge: "M8 6l4-4 4 4M12 2v10.3a4 4 0 0 1-1.2 2.9L4 22M20 22l-5-5",
  Wand2: "M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8L19 13M17.8 6.2L19 5M3 21l9-9M12.2 6.2L11 5",
};

const L = {
  icon(name, cls = "size-3.5") {
    const d = ICON_PATHS[name] || "M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z";
    return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d}"/></svg>`;
  },

  info() {
    return `<button type="button" aria-label="More info" class="inline-flex items-center justify-center size-5 rounded-full text-muted-foreground hover:text-foreground hover:bg-panel-2 ring-1 ring-border/60 hover:ring-border transition-colors align-middle">${L.icon("Info")}</button>`;
  },

  header({ eyebrow, title, info = false, actions = "" }) {
    return `<div class="flex items-end justify-between gap-6 pb-6 mb-6 border-b border-border">
      <div class="min-w-0">
        ${eyebrow ? `<div class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">${eyebrow}</div>` : ""}
        <div class="flex items-center gap-2 min-w-0">
          <h1 class="text-2xl font-semibold tracking-tight truncate">${title}</h1>
          ${info ? L.info() : ""}
        </div>
      </div>
      ${actions ? `<div class="flex items-center gap-2 shrink-0">${actions}</div>` : ""}
    </div>`;
  },

  panel({ title, eyebrow, actions = "", flush = false, body = "", className = "", bodyClassName = "", collapsible = false, open = false }) {
    const hasHeader = Boolean(title || eyebrow || actions);
    const inner = `
      <div class="min-w-0 flex items-center gap-2">
        ${collapsible ? `<svg class="size-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-90" : ""}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>` : ""}
        <div class="min-w-0">
          ${eyebrow ? `<div class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">${eyebrow}</div>` : ""}
          ${title ? `<div class="text-sm font-medium flex items-center gap-2"><span class="truncate">${title}</span></div>` : ""}
        </div>
      </div>
      <div class="flex items-center gap-2 shrink-0">${actions}</div>`;
    const header = !hasHeader
      ? ""
      : collapsible
        ? `<header role="button" tabindex="0" aria-expanded="${open}" class="flex items-center justify-between px-4 py-3 cursor-pointer select-none hover:bg-panel-2/60 ${open ? "border-b border-border" : ""}">${inner}</header>`
        : `<header class="flex items-center justify-between px-4 py-3 border-b border-border">${inner}</header>`;
    const content = flush ? body : `<div class="p-4 ${bodyClassName}">${body}</div>`;
    const showBody = collapsible && hasHeader ? open : true;
    return `<section class="panel rounded-sm ${className}">${header}${showBody ? content : ""}</section>`;
  },

  pill(tone, text) {
    const map = {
      success: "bg-success/10 text-success ring-success/30",
      warn: "bg-warn/10 text-warn ring-warn/30",
      danger: "bg-danger/10 text-danger ring-danger/30",
      muted: "bg-panel-2 text-muted-foreground ring-border",
      primary: "bg-primary/10 text-primary ring-primary/30",
    };
    return `<span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm text-[10px] font-mono uppercase tracking-tight ring-1 ${map[tone] || map.muted}"><span class="status-dot bg-current"></span>${text}</span>`;
  },

  kv(items) {
    return `<dl class="divide-y divide-border text-sm">${items
      .map(
        (row) =>
          `<div class="grid grid-cols-[180px_1fr] gap-4 px-4 py-3"><dt class="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">${row.k}</dt><dd class="text-foreground">${row.v}</dd></div>`,
      )
      .join("")}</dl>`;
  },

  page(inner, maxWidth = "") {
    return `<div class="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 ${maxWidth}">${inner}</div>`;
  },
};

window.L = L;

const NAV = [
  { label: "Dashboard", standalone: true, items: [["Dashboard", null]] },
  { label: "What's New", standalone: true, items: [["What's New", null]] },
  {
    label: "Settings",
    items: [
      ["Brand Settings", "brand-settings"],
      ["Visual Identity", "visual-identity"],
      ["Look Training Analytics", "look-analytics"],
      ["Integrations", "integrations"],
      ["YouTube Audit & Optimization", "youtube-audit"],
      ["Instagram Audit & Optimization", "instagram-audit"],
      ["Facebook Audit & Optimization", "facebook-audit"],
      ["Google Takeout Import", "takeout"],
      ["Instagram Archive Import", "instagram-archive"],
      ["Facebook Archive Import", "facebook-archive"],
      ["Members & Invites", "members"],
      ["Agent Access (MCP)", "agent-access"],
      ["My Account", "account"],
    ],
  },
  {
    label: "Functions",
    items: [
      ["Brand Voice & Knowledge", "knowledge"],
      ["Topics", "topics"],
      ["Content Upload", "content-upload"],
      ["Content Generation", "content-generation"],
      ["Content Calendar", "content-calendar"],
      ["Reply Generation", "reply-generation"],
      ["Content Ideas", "content-ideas"],
      ["Video Performance", "video-performance"],
      ["Competitor Benchmarking", "benchmarking"],
      ["Audience Demand Mining", "demand-mining"],
      ["Analysis", "analysis"],
      ["Priors vs Performance", "priors"],
      ["TikTok Analytics", "tiktok"],
      ["Recipe Blog Generator", "recipe-blog", true],
      ["YouTube Blog Generator", "youtube-blog", true],
      ["Recipe Planner", null, true],
      ["Image Flow", "image-flow", true],
      ["Audio Flow", "audio-flow", true],
      ["Media Library", "media-library", true],
      ["Video Content Flow", "video-content-flow", true],
      ["Thumbnail Audit", "thumbnail-audit", true],
    ],
  },
  {
    label: "Help",
    items: [
      ["Help Center", "help"],
      ["Dashboard Guide", null],
      ["What's New Guide", null],
      ["Settings Guide", null],
      ["Functions Guide", "help-functions"],
      ["Support Guide", null],
      ["Workflow Map", null],
      ["Feedback & Bugs", null],
    ],
  },
  {
    label: "Legal",
    items: [["Privacy", null], ["Terms", null], ["Cookies", null], ["Privacy Choices", null], ["Accessibility", null], ["Data Deletion", null], ["Cookie Preferences", null]],
  },
  {
    label: "Platform",
    items: [
      ["Platform Dashboard", "p-dashboard"],
      ["All Brands", "p-brands"],
      ["Agencies", "p-agencies"],
      ["Agency Tiers", "p-agency-tiers"],
      ["Account Approvals", "p-approvals"],
      ["Deletion Requests", "p-deletions"],
      ["Integration Health", "p-integration-health"],
      ["Integrations", "p-integrations"],
      ["OAuth Setup Guide", null],
      ["Domain Status", null],
      ["LinkedIn Debug", null],
      ["Impersonate Operator", null],
      ["Onboarding Overview", null],
      ["Feedback & Bugs", null],
      ["Notifications", null],
      ["Costing", null],
      ["Generation Accuracy", null],
      ["Thumbnail Performance", null],
      ["Look Training", null],
      ["Development Project", null],
      ["Custom Modules", null],
      ["Releases", null],
      ["Section Visibility", null],
      ["MCP Server", null],
      ["Time on Platform", null],
      ["Diagnostics", null],
      ["Logs", null],
    ],
  },
  { label: "Support", items: [["Support Inbox", null]] },
  { label: "Project", items: [["Project Board", null], ["Board Lists", null], ["Board Access", null]] },
  { label: "Octaneon Business", items: [["Sales & Cycle", null], ["Costing Research", null], ["Business Access", null]] },
];

const openGroups = {};

function currentId() {
  return decodeURIComponent(location.hash.replace(/^#/, "")) || "brand-settings";
}

function moduleDot() {
  return `<span class="inline-block size-1.5 rounded-full bg-primary/70" title="Custom module"></span>`;
}

function sidebarHtml(active) {
  const groups = NAV.map((g) => {
    const containsActive = g.items.some(([, id]) => id && id === active);
    if (g.standalone) {
      const [label, id] = g.items[0];
      const on = id && id === active;
      return `<div class="px-3 mb-3"><a href="#${id || ""}" data-stub="${id ? "" : label}" class="flex items-center gap-2 px-3 py-1.5 text-xs font-mono uppercase tracking-widest rounded-sm transition-colors ${on ? "bg-primary/10 text-primary ring-1 ring-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-panel"}"><span class="status-dot bg-current opacity-60"></span><span class="flex-1 truncate">${label}</span></a></div>`;
    }
    const isOpen = openGroups[g.label] ?? containsActive;
    return `<div class="px-3 mb-3">
      <button type="button" data-group="${g.label}" aria-expanded="${isOpen}" class="w-full flex items-center gap-2 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground rounded-sm">
        <span class="inline-block text-[9px] transition-transform ${isOpen ? "rotate-90" : "rotate-0"}" aria-hidden="true">▶</span>
        <span class="flex-1 text-left">${g.label}</span>
      </button>
      ${
        isOpen
          ? `<div class="space-y-0.5 mt-1">${g.items
              .map(([label, id, isModule]) => {
                const on = id && id === active;
                return `<a href="#${id || ""}" data-stub="${id ? "" : label}" class="w-full flex items-center gap-2 px-3 py-1.5 text-xs rounded-sm transition-colors ${on ? "bg-primary/10 text-primary ring-1 ring-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-panel"}"><span class="status-dot bg-current opacity-60"></span><span class="flex-1 truncate">${label}</span>${isModule ? moduleDot() : ""}</a>`;
              })
              .join("")}</div>`
          : ""
      }
    </div>`;
  }).join("");
  return `
    <nav class="hidden md:flex w-64 shrink-0 border-r border-border flex-col">
      <div class="px-5 py-5 border-b border-border grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <div></div>
        <div class="flex items-center justify-center gap-2 min-w-0"><img src="octaneon-logo.png" alt="Octaneon" class="h-7 w-auto shrink-0 rounded-sm" /></div>
        <div></div>
      </div>
      <div class="flex-1 overflow-y-auto py-4">${groups}</div>
      <div class="border-t border-border p-4 space-y-2">
        <a class="flex items-center gap-2 text-[10px] font-mono text-muted-foreground hover:text-foreground"><span>build 2026.09.25-1</span></a>
        <div class="text-[10px] font-mono text-muted-foreground truncate">operator: arslan@octaneon.ai</div>
        <div class="text-[10px] font-mono text-muted-foreground truncate">role: platform_owner</div>
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-success"><span class="status-dot bg-success"></span>verified</div>
          <div class="flex items-center gap-1">
            <button type="button" class="p-1.5 rounded-sm ring-1 ring-border text-muted-foreground hover:text-foreground" aria-label="Toggle theme"><svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg></button>
            <button type="button" class="p-1.5 rounded-sm ring-1 ring-border text-muted-foreground hover:text-foreground" aria-label="Switch skin">${L.icon("Sparkles", "size-3.5")}</button>
          </div>
        </div>
        <button class="w-full text-[10px] font-mono uppercase tracking-widest px-2 py-1.5 rounded-sm ring-1 ring-border hover:bg-panel-2 text-muted-foreground hover:text-foreground">sign out</button>
        <div class="text-[9px] font-mono uppercase tracking-widest text-muted-foreground pt-1">© 2026 Octaneon</div>
      </div>
    </nav>`;
}

function topbarHtml() {
  const burger = `<span class="flex flex-col gap-[3px]"><span class="block w-4 h-px bg-current"></span><span class="block w-4 h-px bg-current"></span><span class="block w-4 h-px bg-current"></span></span>`;
  return `
    <header class="shrink-0 border-b border-border min-w-0">
      <div class="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 min-w-0">
        <button class="md:hidden shrink-0 p-2 -ml-1 rounded-sm ring-1 ring-border hover:bg-panel-2 text-muted-foreground" aria-label="Open navigation">${burger}</button>
        <button class="hidden md:inline-flex shrink-0 p-2 -ml-1 rounded-sm ring-1 ring-border hover:bg-panel-2 text-muted-foreground hover:text-foreground" aria-label="Hide navigation">${burger}</button>
        <div class="relative shrink-0">
          <button class="flex items-center gap-2 px-2.5 py-1.5 rounded-sm ring-1 ring-border hover:bg-panel-2">
            <span class="status-dot bg-primary"></span>
            <div class="flex flex-col leading-tight text-left min-w-0">
              <span class="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">active brand</span>
              <span class="text-[11px] font-mono truncate max-w-[120px] sm:max-w-[180px]">Northwind Kitchen</span>
            </div>
            ${L.icon("ChevronDown", "h-3 w-3 text-muted-foreground")}
          </button>
        </div>
        <div class="hidden lg:flex flex-col leading-tight shrink-0 min-w-0">
          <span class="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">workspace</span>
          <span class="text-[11px] font-mono truncate">ws_northwind-kitchen</span>
        </div>
        <div class="ml-auto flex items-center gap-2 shrink-0">
          <button class="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-sm ring-1 transition-colors bg-panel text-muted-foreground ring-border hover:text-foreground hover:ring-primary/50">demo</button>
          <button class="relative p-2 rounded-sm ring-1 ring-border hover:bg-panel-2 text-muted-foreground hover:text-foreground" aria-label="Notifications">
            <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            <span class="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-primary text-primary-foreground text-[9px] font-mono leading-4 text-center">3</span>
          </button>
        </div>
      </div>
    </header>`;
}

function stubPage(label) {
  return L.page(
    `${L.header({ title: label })}
    <div class="panel rounded-sm p-8 text-center">
      <div class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">not part of this comparison</div>
      <p class="text-sm text-muted-foreground mt-2">This page exists in the current console but is not copied into the mockup.</p>
    </div>`,
    "max-w-[900px]",
  );
}

function loadingPage() {
  return `<div class="p-8 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">loading…</div>`;
}

const requested = {};

function ensurePage(id, done) {
  if (window.LEGACY[id] || requested[id] === "missing") return done();
  if (requested[id]) return;
  requested[id] = "loading";
  const s = document.createElement("script");
  s.src = `pages/${id}.js?v=${Date.now()}`;
  s.onload = () => {
    requested[id] = "loaded";
    done();
  };
  s.onerror = () => {
    requested[id] = "missing";
    done();
  };
  document.head.appendChild(s);
}

let stubLabel = "";

function render() {
  const id = currentId();
  const page = stubLabel
    ? stubPage(stubLabel)
    : window.LEGACY[id]
      ? window.LEGACY[id]()
      : requested[id] === "missing"
        ? stubPage(labelFor(id))
        : loadingPage();
  document.getElementById("legacy-root").innerHTML = `
    <div class="relative flex h-screen w-full bg-background text-foreground font-sans overflow-hidden">
      ${sidebarHtml(stubLabel ? "" : id)}
      <main class="flex-1 flex flex-col min-w-0">
        ${topbarHtml()}
        <div class="relative flex-1 overflow-y-auto overflow-x-hidden" id="legacy-scroll">${page}</div>
      </main>
    </div>`;
}

function labelFor(id) {
  for (const g of NAV) for (const [label, pid] of g.items) if (pid === id) return label;
  return id;
}

function show() {
  stubLabel = "";
  const id = currentId();
  if (!window.LEGACY[id] && requested[id] !== "missing") ensurePage(id, render);
  render();
  const scroller = document.getElementById("legacy-scroll");
  if (scroller) scroller.scrollTop = 0;
  try {
    window.parent.postMessage({ type: "legacy-nav", id }, "*");
  } catch (_) {}
}

document.addEventListener("click", (e) => {
  const group = e.target.closest("[data-group]");
  if (group) {
    const g = group.dataset.group;
    const containsActive = NAV.find((x) => x.label === g).items.some(([, id]) => id === currentId());
    openGroups[g] = !(openGroups[g] ?? containsActive);
    return render();
  }
  const stub = e.target.closest("[data-stub]");
  if (stub && stub.dataset.stub) {
    e.preventDefault();
    stubLabel = stub.dataset.stub;
    render();
    return;
  }
  const inPage = e.target.closest("#legacy-scroll a, #legacy-scroll button");
  if (inPage && !inPage.closest("[data-stub]")) e.preventDefault();
});

function applyTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

window.addEventListener("message", (e) => {
  if (e.data && e.data.type === "legacy-theme") applyTheme(e.data.theme);
});

window.addEventListener("hashchange", show);

applyTheme(new URLSearchParams(location.search).get("theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
show();
