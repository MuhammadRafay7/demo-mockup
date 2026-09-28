const BRAND = "Northwind Kitchen";

const state = {
  view: "overview",
  current: "brand-settings",
  proposed: "brand",
  tabs: { "p-agencies": "list", "p-requests": "accounts", "p-integrations": "health", knowledge: "review", tiktok: "videos", ytblog: "write", thumbs: "covers", recipeblog: "write", brand: "profile", captions: "youtube", logs: "activity", content: "upload", ideas: "saved", analysis: "overview" },
  ideaCat: "all",
  platform: "all",
  range: "30d",
  openVideo: 0,
  mediaSource: "all",
  mediaStatus: "needs",
  selectedMedia: 0,
  selectedImage: 0,
  selectedAudio: 0,
  audioOption: "several",
  objective: "creator",
  priorsPlatform: "all",
  recipeFilter: "nopost",
  selectedRecipe: 0,
  publishMode: "draft",
  thumbFilter: "all",
  thumbSort: "low",
  thumbSel: {},
  reviewThumb: 1,
  pickedCover: 0,
  selectedYb: 0,
  ybStage: "outline",
  ybEmbed: "after_intro",
  kStatus: "pending",
  kSel: {},
  replyStatus: "draft",
  helpSection: "",
  helpArticle: 0,
  console: "brand",
  platformPage: "p-dashboard",
  createBrand: false,
  accessFilter: "pending",
  logFilters: { q: "", source: "all", channel: "all", level: "all", range: "7d" },
  genFilter: "all",
  selectedRun: 0,
  topicFilter: "all",
  gran: "balanced",
  pages: {},
  folded: {},
  notes: true,
  navOpen: false,
};

const ICONS = {
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  note: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/></svg>',
  chev: '<svg class="chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>',
};

const panel = (title, body, o = {}) => `
  <section class="panel ${o.cls || ""}">
    <header class="panel-head">
      <div>
        ${o.eyebrow ? `<div class="eyebrow">${o.eyebrow}</div>` : ""}
        <h3>${title}</h3>
        ${o.sub ? `<p class="muted">${o.sub}</p>` : ""}
      </div>
      ${o.actions || ""}
    </header>
    <div class="panel-body">${body}</div>
  </section>`;

const flushPanel = (title, body, o = {}) => panel(title, body, { ...o, cls: `flush ${o.cls || ""}` });
const btn = (label, kind = "") => `<button class="btn ${kind}" type="button">${label}</button>`;
const tag = (label, tone = "") => `<span class="tag ${tone}">${label}</span>`;
const dot = (tone = "") => `<span class="status-dot ${tone}"></span>`;
const field = (label, value, hint = "") =>
  `<label class="field"><span>${label}</span><input class="input" value="${value}" />${hint ? `<small>${hint}</small>` : ""}</label>`;
const toggle = (label, on, hint = "") => `
  <div class="row-between">
    <div><div class="strong">${label}</div>${hint ? `<div class="muted small">${hint}</div>` : ""}</div>
    <span class="switch ${on ? "on" : ""}" role="switch" aria-checked="${on}" aria-label="${label}" tabindex="0"></span>
  </div>`;
const meter = (pct, tone = "") => `<div class="meter ${tone}"><span style="width:${pct}%"></span></div>`;
const note = (html) => `<aside class="note"><span class="note-label">Note</span><div>${html}</div></aside>`;
const stats = (items) =>
  `<div class="panel stats">${items
    .map(
      ([label, value, tone = ""]) =>
        `<div class="stat ${tone}"><div class="muted small">${label}</div><div class="value">${value}</div></div>`,
    )
    .join("")}</div>`;
const table = (headers, rows, numericCols = []) => `
  <div class="table-wrap"><table>
    <thead><tr>${headers.map((h, i) => `<th style="${numericCols.includes(i) ? "text-align:right" : ""}">${h}</th>`).join("")}</tr></thead>
    <tbody>${rows
      .map((r) => `<tr>${r.map((c, i) => `<td class="${numericCols.includes(i) ? "num" : ""}">${c}</td>`).join("")}</tr>`)
      .join("")}</tbody>
  </table></div>`;
const tabs = (key, list) => `
  <div class="tabs" role="tablist">${list
    .map(
      (t) =>
        `<button class="tab ${state.tabs[key] === t.id ? "active" : ""}" role="tab" aria-selected="${state.tabs[key] === t.id}" data-tab="${key}:${t.id}">${t.label}${t.count ? `<span class="count">${t.count}</span>` : ""}${t.lock ? `<span class="lock">admin</span>` : ""}</button>`,
    )
    .join("")}</div>`;
const pageHead = (title, sub, eyebrow = "Settings", actions = "") => `
  <div class="page-head">
    <div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1>${sub ? `<p class="muted">${sub}</p>` : ""}</div>
    ${actions}
  </div>`;

const CURRENT = [
  {
    id: "content-upload",
    group: "Functions",
    label: "Content Upload",
    sub: "Add videos, transcribe them, and send them on to generation.",
    panels: ["Video upload & transcript generation", "Videos & transcripts", "Subtitle status", "Auto-name videos"],
  },
  {
    id: "content-generation",
    group: "Functions",
    label: "Content Generation",
    sub: "Per-platform drafts from video and brand voice, on a separate page from the upload.",
    panels: ["Per-platform drafts from video + brand voice", "Recent generations", "Status filter", "Draft editor", "Publish / schedule"],
  },
  {
    id: "content-calendar",
    group: "Functions",
    label: "Content Calendar",
    sub: "Scheduled and published posts by week, on a third page.",
    panels: ["Content calendar", "Week navigation"],
  },
  {
    id: "topics",
    group: "Functions",
    label: "Topics",
    sub: "What the audience asks about, compared with what has already been published.",
    panels: ["Coverage graph", "Detail level & rebuild", "Topic table (demand · coverage · gap)", "Asks vs published answers", "Generated drafts"],
  },
  {
    id: "content-ideas",
    group: "Functions",
    label: "Content Ideas",
    sub: "Saved ideas and gap-driven suggestions, stacked on one page.",
    panels: ["Saved ideas", "Idea categories", "Zero-coverage & top gaps", "Generated drafts"],
  },
  {
    id: "video-performance",
    group: "Functions",
    label: "Video Performance",
    sub: "One row per video with every platform's numbers folded together.",
    panels: ["Video groups", "Per-post breakdown", "Link / unlink posts", "Regroup"],
  },
  {
    id: "benchmarking",
    group: "Functions",
    label: "Competitor Benchmarking",
    sub: "Compare the brand with competitor Pages, accounts and hashtags.",
    panels: ["Tracked competitors", "Cadence & engagement comparison"],
  },
  {
    id: "demand-mining",
    group: "Functions",
    label: "Audience Demand Mining",
    sub: "What people ask on channels like yours, turned into themes.",
    panels: ["Channels & topics to analyse", "What the audience is asking", "Recent runs"],
  },
  {
    id: "analysis",
    group: "Functions",
    label: "Analysis",
    sub: "Warehouse metrics with cross-filtering: 14 panels on one scroll.",
    panels: ["Daily views by platform", "Publication funnel", "Top videos across platforms", "Volume × reply coverage", "YouTube analytics", "Views & watch minutes", "Likes · Comments · Shares", "Daily subs gained vs lost", "Traffic sources", "Viewer % by age & gender", "Daily revenue · creator vs site"],
  },
  {
    id: "media-library",
    group: "Functions",
    label: "Media Library",
    sub: "Every brand image, identified by AI, with a review queue.",
    panels: ["Sources & sync", "Identification queue", "Image grid", "File details", "Training review", "Brand glossary"],
  },
  {
    id: "image-flow",
    group: "Functions",
    label: "Image Flow",
    sub: "Upload a photo, read it, write posts and a blog article.",
    panels: ["Upload images", "Image analysis", "Generated posts", "Blog draft"],
  },
  {
    id: "audio-flow",
    group: "Functions",
    label: "Audio Flow",
    sub: "Upload a recording, transcribe it, turn it into blog drafts.",
    panels: ["Upload recording", "Transcript", "Recommendation", "Drafts", "Push to blog"],
  },
  {
    id: "recipe-blog",
    group: "Functions",
    label: "Recipe Blog Generator",
    sub: "Learns the blog's recipe-post format and drafts posts for recipes without one.",
    panels: ["Site & recipe plugin", "Style template", "Categories to sample", "Custom prompt instructions", "Recipe status filter", "Recipes", "Draft preview", "Clone skeleton from", "Categories", "Publish status"],
  },
  {
    id: "thumbnail-audit",
    group: "Functions",
    label: "Thumbnail Audit",
    sub: "YouTube covers in a grid, generate options, deploy; history on a second page.",
    panels: ["Channel covers", "Filters & sort", "Generate 4 covers", "Review covers dialog", "Deploy selected", "Retry generation / deploy", "Batch history (separate page)"],
  },
  {
    id: "youtube-blog",
    group: "Functions",
    label: "YouTube Blog Generator",
    sub: "Video → outline → article → WordPress draft, with prompt and formatting setup on the same page.",
    panels: ["Video search", "Videos with transcripts", "Generation prompt & formatting (collapsible)", "Learn formatting from categories", "Outline", "Article editor", "Embed position", "Push to WordPress"],
  },
  {
    id: "video-content-flow",
    group: "Functions",
    label: "Video Content Flow",
    sub: "A board mirroring the pipeline: Ideas, Production, Generation, Publishing.",
    panels: ["Ideas", "Production", "Generation", "Publishing"],
  },
  {
    id: "priors",
    group: "Functions",
    label: "Priors vs Performance",
    sub: "What the generator learned vs what published cohorts actually did.",
    panels: ["Filters", "Learned priors", "Trend", "Slice detail"],
  },
  {
    id: "knowledge",
    group: "Functions",
    label: "Brand Voice & Knowledge",
    sub: "Twelve stacked panels: totals, curation queue, ingestion, documents, rules, archive and more.",
    panels: ["Knowledge base totals", "Knowledge items (curation queue)", "Ingestion Progress", "Brand documents", "Intake rules", "Raw archive", "Transcript backlog", "Embedding coverage", "YouTube quota", "Job notifications"],
  },
  {
    id: "reply-generation",
    group: "Functions",
    label: "Reply Generation",
    sub: "Reply queue with filters, drafts and pacing settings.",
    panels: ["Reply queue", "Platform / status / type / category filters", "Drafted replies", "Featured resources", "Reply settings (pacing)"],
  },
  {
    id: "tiktok",
    group: "Functions",
    label: "TikTok Analytics",
    sub: "Per-video TikTok totals and the TikTok publish queue.",
    panels: ["Per-video views / likes / comments", "Time window", "TikTok scheduled vs published"],
  },
  {
    id: "help",
    group: "Help",
    label: "Help Center (5 guide pages)",
    sub: "Help Center plus separate Dashboard, What's New, Settings, Functions and Support guide pages.",
    panels: ["Help Center", "Dashboard Guide", "What's New Guide", "Settings Guide", "Functions Guide", "Support Guide"],
  },
  {
    id: "brand-settings",
    label: "Brand Settings",
    sub: "Workspace identity, voice, prompts and automation, on one long page.",
    panels: [
      "Workspace identity",
      "Brand contact & identity",
      "Timezone",
      "Handles roster",
      "Brand voice interview",
      "Vocabulary list",
      "Brand Voice & Knowledge purity policy",
      "Brand voice weighting (per platform)",
      "Platform prompts (per platform)",
      "Per-platform priorities & goals",
      "Content generation cadence",
      "Kill-switch flags",
      "Danger zone",
    ],
  },
  {
    id: "visual-identity",
    label: "Visual Identity",
    sub: "The look of every image Octaneon makes, then training it on real covers.",
    panels: ["Tell us how it should look", "Brand documents for the look", "Enough to go on", "Your look", "Style reference", "Train the look"],
  },
  {
    id: "look-analytics",
    label: "Look Training Analytics",
    sub: "Charts about the training that happens on the Visual Identity page.",
    panels: ["Where the look stands", "Convergence", "Rounds over time", "Which looks you approve", "Time and cost per round"],
  },
  {
    id: "integrations",
    label: "Integrations",
    sub: "Connect channels, pick pages, run backfills and diagnostics.",
    panels: ["Social accounts", "Channel pickers", "Backfill Facebook & Instagram history", "Backfill YouTube history", "Backfill WordPress history", "WordPress sites", "Webhook diagnostics"],
  },
  {
    id: "youtube-audit",
    label: "YouTube Audit & Optimization",
    sub: "Captions for the YouTube library, with the pipeline shown in full.",
    panels: ["Knowledge seeding", "Live pipeline status", "Gemini batches", "Needs media", "Transcript review", "YouTube daily allowance"],
    logs: true,
  },
  {
    id: "instagram-audit",
    label: "Instagram Audit & Optimization",
    sub: "Posts missing caption text, a transcript or hashtags.",
    panels: ["Missing caption text", "Missing transcript", "Missing hashtags", "Media supply", "Transcript review"],
    logs: true,
  },
  {
    id: "facebook-audit",
    label: "Facebook Audit & Optimization",
    sub: "Posts missing caption text, a transcript or hashtags.",
    panels: ["Missing caption text", "Missing transcript", "Missing hashtags", "Media supply", "Transcript review"],
    logs: true,
  },
  { id: "takeout", label: "Google Takeout Import", sub: "Old YouTube comments from a Google export.", panels: ["Google Takeout import", "Imports", "Failed entries"] },
  { id: "instagram-archive", label: "Instagram Archive Import", sub: "Instagram history from a Meta download.", panels: ["Upload ZIP parts", "Import progress", "Imported items"] },
  { id: "facebook-archive", label: "Facebook Archive Import", sub: "Facebook history from a Meta download.", panels: ["Upload ZIP parts", "Import progress", "Imported items"] },
  { id: "members", label: "Members & Invites", sub: "Who can see and operate this brand.", panels: ["Members", "Pending invitations", "Invite by email"] },
  { id: "agent-access", label: "Agent Access (MCP)", sub: "Connect AI agents to this brand.", panels: ["Connection details", "Connect an agent", "Your connected agents", "Live agent activity", "Agent audit log", "Tool list"] },
  { id: "account", label: "My Account", sub: "Your own profile. Sits among brand settings in the menu.", panels: ["Photo", "My profile", "Contact & details", "Notifications"] },
];

const PROPOSED = [
  { id: "knowledge", group: "Plan", label: "Brand Voice & Knowledge", from: ["knowledge"], restyled: true, badge: "214" },
  { id: "topics", group: "Plan", label: "Topics", from: ["topics"], restyled: true },
  { id: "ideas", group: "Plan", label: "Content Ideas", from: ["content-ideas"], restyled: true },
  { id: "demand", group: "Plan", label: "Audience Demand Mining", from: ["demand-mining"], restyled: true },
  { id: "benchmark", group: "Plan", label: "Competitor Benchmarking", from: ["benchmarking"], restyled: true },
  { id: "content", group: "Create", label: "Content", from: ["content-upload", "content-generation", "content-calendar"] },
  { id: "media", group: "Create", label: "Media Library", from: ["media-library"], restyled: true },
  { id: "imageflow", group: "Create", label: "Image Flow", from: ["image-flow"], restyled: true },
  { id: "audioflow", group: "Create", label: "Audio Flow", from: ["audio-flow"], restyled: true },
  { id: "thumbs", group: "Create", label: "Thumbnail Audit", from: ["thumbnail-audit"], restyled: true },
  { id: "replies", group: "Create", label: "Reply Generation", from: ["reply-generation"], restyled: true, badge: "42" },
  { id: "ytblog", group: "Create", label: "YouTube Blog Generator", from: ["youtube-blog"], restyled: true },
  { id: "recipeblog", group: "Create", label: "Recipe Blog Generator", from: ["recipe-blog"], restyled: true },
  { id: "videos", group: "Measure", label: "Video Performance", from: ["video-performance"], restyled: true },
  { id: "analysis", group: "Measure", label: "Analysis", from: ["analysis"], restyled: true },
  { id: "tiktok", group: "Measure", label: "TikTok Analytics", from: ["tiktok"], restyled: true },
  { id: "priors", group: "Measure", label: "Priors vs Performance", from: ["priors"], restyled: true },
  { id: "brand", label: "Brand & Account", from: ["brand-settings", "visual-identity", "look-analytics", "account"] },
  { id: "integrations", label: "Integrations", from: ["integrations"] },
  { id: "imports", label: "Imports", from: ["takeout", "instagram-archive", "facebook-archive"] },
  { id: "captions", label: "Captions & Transcripts", from: ["youtube-audit", "instagram-audit", "facebook-audit"], badge: "11" },
  { id: "team", label: "Team", from: ["members"] },
  { id: "agents", label: "AI Agents", from: ["agent-access"] },
  { id: "logs", label: "Activity & Logs", from: [] },
  { id: "help", group: "Help", label: "Help Center", from: ["help"] },
];

const proposedFor = (currentId) => PROPOSED.find((p) => p.from.includes(currentId));

function legacyPage(page) {
  const dest = proposedFor(page.id);
  if (!dest) return removedPage(page);
  const logBlock = page.logs
    ? flushPanel(
        "Pipeline log",
        `<pre class="log">${LOG_LINES}</pre>`,
        { sub: "Batch-by-batch technical detail, shown open by default." },
      )
    : "";
  return `
    <div class="page">
      ${pageHead(page.label, page.sub, `${page.group || "Settings"} · today`)}
      <div class="legacy-banner">
        <span>${tag(`${page.panels.length} sections`, "")} on this page</span>
        <span class="muted">In the proposal this moves to</span>
        <button class="link" data-go="proposed:${dest.id}">${dest.label} →</button>
      </div>
      <div class="stack">
        ${page.panels
          .map((p, i) =>
            panel(
              p,
              `<div class="skeleton"><i style="width:${70 - ((i * 13) % 35)}%"></i><i style="width:${90 - ((i * 7) % 30)}%"></i><i style="width:${50 + ((i * 11) % 30)}%"></i></div>`,
              { cls: "legacy-panel" },
            ),
          )
          .join("")}
        ${logBlock}
      </div>
    </div>`;
}

function removedPage(page) {
  return `
    <div class="page">
      ${pageHead(page.label, page.sub, `${page.group} · today`)}
      <div class="legacy-banner">${tag("Removed in the proposal", "danger")}<span class="muted">The Content page's progress strip (Videos ready → Drafts to review → Scheduled) shows the same pipeline, and the calendar shows publishing.</span><button class="link" data-go="proposed:content">Content →</button></div>
      <div class="stack">${page.panels.map((p) => panel(p, `<div class="skeleton"><i style="width:60%"></i><i style="width:80%"></i></div>`, { cls: "legacy-panel" })).join("")}</div>
    </div>`;
}

const LOG_LINES = [
  "08:14:02  batch b-7f21  building    12 videos grouped",
  "08:14:40  batch b-7f21  submitted   sent to transcription service",
  "08:22:11  batch b-7f21  returned    11 transcripts, 1 empty",
  "08:22:12  video 3Fq…    retry       no usable transcript, re-queued",
  "08:31:55  worker        idle        last pass finished cleanly",
  "08:36:02  batch b-7f22  building    3 videos grouped",
  "08:36:03  video KmG…    needs_media file not found in Takeout or uploads",
].join("\n");

function brandPage() {
  const t = state.tabs.brand;
  const tabList = [
    { id: "profile", label: "Profile", lock: true },
    { id: "voice", label: "Voice", lock: true },
    { id: "publishing", label: "Publishing", lock: true },
    { id: "look", label: "Look", lock: true },
    { id: "account", label: "My account" },
  ];
  const body = { profile: brandProfile, voice: brandVoice, publishing: brandPublishing, look: brandLook, account: myAccount }[t]();
  return `
    <div class="page">
      ${pageHead("Brand & Account", "Everything about who the brand is, how it sounds, how it looks, and your own profile. One page, five tabs.")}
      ${tabs("brand", tabList)}
      <div class="stack">
        ${note("Replaces <b>Brand Settings</b>, <b>Visual Identity</b>, <b>Look Training Analytics</b> and <b>My Account</b>. The four brand tabs are admin-only; every member sees <b>My account</b>.")}
        ${body}
      </div>
    </div>`;
}

function brandProfile() {
  return `
    ${panel(
      "Brand profile",
      `<div class="fields two">
        ${field("Brand name", BRAND)}
        ${field("Web address", "northwind-kitchen", "Used in links and invitations.")}
        ${field("Time zone", "Europe/London", "Schedules, send windows and calendars follow this.")}
        ${field("Contact email", "hello@northwindkitchen.example")}
        ${field("Website", "https://northwindkitchen.example")}
        ${field("Industry", "Food & recipes")}
      </div>
      <div class="btn-row" style="margin-top:14px">${btn("Save changes", "primary")}${btn("Discard", "ghost")}</div>`,
    )}
    ${panel(
      "Handles",
      `<div class="tags">${["YouTube @northwindkitchen", "Instagram @northwind.kitchen", "Facebook /northwindkitchen", "TikTok @northwindkitchen", "LinkedIn /company/northwind"].map((h) => tag(h)).join("")}</div>`,
      { sub: "How the brand is named on each channel, so mentions and replies are recognised." },
    )}
    ${panel(
      "Delete this brand",
      `<div class="row-between"><p class="muted">Permanently removes the brand, its members and everything it has collected.</p>${btn("Delete brand", "danger")}</div>`,
      { cls: "danger" },
    )}`;
}

function brandVoice() {
  return `
    <div class="split">
      <div class="stack">
        ${panel(
          "Brand voice",
          `<div class="stack" style="gap:12px">
            <div class="tags">${["warm", "practical", "unfussy", "curious", "quietly confident"].map((w) => tag(w, "primary")).join("")}</div>
            <div><div class="small strong">Sounds like</div><p class="muted">A friend who cooks well and explains why, without showing off.</p></div>
            <div><div class="small strong">Never sounds like</div><p class="muted">Hype, clickbait, diet-culture language, restaurant snobbery.</p></div>
            <div class="btn-row">${btn("Edit interview answers")}${btn("Retake interview", "ghost")}</div>
          </div>`,
          { sub: "Generated from the 15-question interview and the brand's own posts.", actions: tag("Up to date", "success") },
        )}
        ${panel(
          "Words we use",
          `<div class="tags" style="margin-bottom:12px">${["weeknight", "one-pan", "pantry staples", "batch cook", "Northwind", "sourdough starter", "sheet-pan"].map((w) => tag(w)).join("")}</div>
          <div class="btn-row">${btn("Add words")}${btn("Fix old transcripts with this list", "ghost")}</div>`,
          { sub: "Correct spellings for names and terms. Transcripts and drafts use these." },
        )}
        ${flushPanel(
          "Writing instructions per channel",
          `<div class="list">${[
            ["YouTube", "Custom"],
            ["Instagram", "Default"],
            ["Facebook", "Default"],
            ["TikTok", "Default"],
            ["LinkedIn", "Custom"],
            ["WordPress", "Default"],
          ]
            .map(
              ([p, kind]) =>
                `<div class="row-between"><span>${p}</span><span class="dest">${tag(kind, kind === "Custom" ? "primary" : "")}${btn("Edit", "ghost")}</span></div>`,
            )
            .join("")}</div>`,
          { sub: "Only open this to override Octaneon's standard instructions for a channel." },
        )}
      </div>
      <div class="stack">
        ${panel(
          "What teaches the voice",
          `<div class="stack" style="gap:14px">
            ${toggle("Only approved transcripts", false, "Unreviewed transcripts are left out until someone approves them.")}
            ${toggle("Ignore other people's words", true, "Comments and posts by others never shape the brand voice.")}
            ${toggle("Include old imported history", true)}
          </div>`,
        )}
        ${note("Brand Settings today has <b>13 sections on one scroll</b>. Voice-related ones (interview, vocabulary, purity policy, weighting, prompts) are grouped here; weighting and prompts collapse into one list.")}
      </div>
    </div>`;
}

function brandPublishing() {
  const rows = [
    ["YouTube", tag("High", "primary"), "Watch time", "Views, watch time, subscribers"],
    ["Instagram", tag("Medium"), "New followers", "Follows, saves"],
    ["Facebook", tag("Medium"), "Earnings", "Watch time, payouts"],
    ["WordPress", tag("High", "primary"), "Search traffic", "Visitors, time on page"],
    ["TikTok", tag("Low"), "Reach", "Views, shares"],
    ["LinkedIn", tag("Paused", "warn"), "n/a", "n/a"],
  ];
  return `
    ${flushPanel(
      "Channel priorities",
      table(["Channel", "Focus", "Main goal", "Success measured by"], rows.map((r) => [...r])),
      { sub: "What each channel is for. Drafts, recommendations and reports follow this.", actions: btn("Edit", "") },
    )}
    <div class="grid-2">
      ${panel(
        "Spacing between posts",
        `<div class="fields two">${field("At least", "45 minutes")}${field("At most", "3 hours")}</div>
        <p class="muted small" style="margin-top:10px">One video never lands on every channel at the same moment.</p>`,
      )}
      ${panel(
        "Automation",
        `<div class="stack" style="gap:14px">
          ${toggle("Write drafts automatically", true, "New uploads become drafts without anyone pressing a button.")}
          ${toggle("Suggest replies to new comments", true)}
          ${toggle("Add subtitles to published videos", true)}
          ${toggle("Pause all publishing", false, "Emergency stop for every channel.")}
        </div>`,
        { sub: "Switch parts of Octaneon on or off for this brand." },
      )}
    </div>`;
}

function brandLook() {
  const approvals = [40, 55, 48, 62, 70, 78];
  return `
    <div class="steps">
      <div class="step"><span class="num">✓</span><div><div class="strong">Describe it</div><div class="muted small">Questionnaire and brand guide</div></div></div>
      <div class="step"><span class="num">✓</span><div><div class="strong">Your look</div><div class="muted small">Colours, type, photo style</div></div></div>
      <div class="step current"><span class="num">3</span><div><div class="strong">Train it</div><div class="muted small">Approve or reject sample covers</div></div></div>
    </div>
    <div class="split">
      <div class="stack">
        ${panel(
          "Your look",
          `<div class="stack" style="gap:16px">
            <div class="swatches">
              <div class="swatch"><i style="background:#1f3d2b"></i>Forest</div>
              <div class="swatch"><i style="background:#f2e8d5"></i>Oat</div>
              <div class="swatch"><i style="background:#d9772b"></i>Paprika</div>
              <div class="swatch"><i style="background:#2b2b2b"></i>Char</div>
            </div>
            <div class="grid-2">
              <div><div class="small strong">Type</div><p class="muted">Bold rounded headlines, plain body text</p></div>
              <div><div class="small strong">Photography</div><p class="muted">Overhead, natural light, hands in frame</p></div>
            </div>
            <div><div class="small strong">Rules</div><p class="muted">Never cover the food with text. Max five words on a cover. No arrows or circles.</p></div>
            <div class="btn-row">${btn("Edit look")}${btn("Learn from a cover I like", "ghost")}</div>
          </div>`,
          { actions: tag("Enough to go on", "success") },
        )}
        ${panel(
          "Brand documents",
          `<div class="row-between"><span>📄 Northwind brand guide 2026.pdf</span><span class="muted small">Uploaded Aug 12</span></div>
          <div class="dropzone" style="margin-top:12px"><span class="strong">Drop a brand guide or style sheet</span><span class="muted small">What it says outranks anything Octaneon guesses.</span></div>`,
        )}
      </div>
      <div class="stack">
        ${panel(
          "Training progress",
          `<div class="stack" style="gap:12px">
            <div class="row-between"><span class="muted small">Approval rate per round</span>${tag("Settling", "primary")}</div>
            <div class="bars">${approvals.map((v, i) => `<div><span style="height:${v}px"></span>R${i + 1}</div>`).join("")}</div>
            <div class="row-between small"><span class="muted">Rounds run</span><b>6</b></div>
            <div class="row-between small"><span class="muted">Latest approval rate</span><b>78%</b></div>
            ${btn("Run next round", "primary")}
          </div>`,
        )}
        ${note("<b>Look Training Analytics</b> had its own page with five charts for one question: <i>is the look settled yet?</i> It becomes this card, next to the training it measures.")}
      </div>
    </div>`;
}

function myAccount() {
  return `
    <div class="split">
      <div class="stack">
        ${panel(
          "Your profile",
          `<div class="person" style="margin-bottom:16px"><div class="avatar lg">AK</div><div>${btn("Change photo")}</div></div>
          <div class="fields two">
            ${field("Display name", "Alex Kim")}
            ${field("Job title", "Content lead")}
            ${field("Email", "alex@northwindkitchen.example")}
            ${field("Your time zone", "Europe/London")}
          </div>
          <div class="btn-row" style="margin-top:14px">${btn("Save", "primary")}</div>`,
          { sub: "Teammates see your name and photo on drafts and replies." },
        )}
      </div>
      <div class="stack">
        ${panel(
          "Email me about",
          `<div class="stack" style="gap:14px">
            ${toggle("Posts that failed", true)}
            ${toggle("Comments waiting for a reply", true)}
            ${toggle("New Octaneon features", false)}
          </div>`,
        )}
        ${note("Personal settings, not brand settings, so this is the only tab a regular member sees.")}
      </div>
    </div>`;
}

function integrationsPage() {
  const channels = [
    ["YT", "YouTube", "Northwind Kitchen", "success", "Connected", 100],
    ["IG", "Instagram", "@northwind.kitchen", "warn", "Reconnect needed", 82],
    ["FB", "Facebook", "Northwind Kitchen", "success", "Connected", 100],
    ["WP", "WordPress", "northwindkitchen.example", "success", "Connected", 64],
    ["TT", "TikTok", "", "", "Not connected", 0],
    ["IN", "LinkedIn", "Northwind Kitchen", "success", "Connected", 100],
  ];
  return `
    <div class="page">
      ${pageHead("Integrations", "The channels Octaneon reads from and posts to.", "Settings", `<button class="btn" type="button" data-logs="ingestion:all">See import progress →</button>`)}
      <div class="stack">
        ${note("Kept as its own page. Page pickers and webhook diagnostics move behind <b>Advanced</b> on each card. Detailed history-import progress moves to <b>Activity &amp; Logs › Ingestion progress</b>.")}
        <div class="grid-3">
          ${channels
            .map(
              ([ab, name, acct, tone, status, pct]) => `
            <section class="panel source-card" style="padding:16px">
              <div class="platform"><span class="platform-icon">${ab}</span><div><div class="strong">${name}</div><div class="muted small">${acct || "—"}</div></div></div>
              <div class="row-between small"><span class="dest">${dot(tone)} ${status}</span>${pct ? `<span class="muted">History ${pct}%</span>` : ""}</div>
              ${pct ? meter(pct, pct === 100 ? "success" : "") : ""}
              <div class="btn-row">${
                status === "Not connected"
                  ? btn("Connect", "primary")
                  : status === "Reconnect needed"
                    ? btn("Reconnect", "primary") + btn("Advanced", "ghost")
                    : btn("Manage") + btn("Advanced", "ghost")
              }</div>
            </section>`,
            )
            .join("")}
        </div>
      </div>
    </div>`;
}

function importsPage() {
  const sources = [
    ["YT", "YouTube comments", "From Google Takeout", "Last import Aug 3 · 12,480 comments matched", "success", "Imported"],
    ["IG", "Instagram history", "From Meta “Download Your Information”", "Last import Jul 28 · 1,204 posts", "success", "Imported"],
    ["FB", "Facebook history", "From Meta “Download Your Information”", "Not imported yet", "", "Not started"],
  ];
  const history = [
    ["Aug 3, 2026", "YouTube comments", "1 file", "12,611", "12,480", tag("Done", "success")],
    ["Jul 28, 2026", "Instagram history", "4 ZIP parts", "1,318", "1,204", tag("Done", "success")],
    ["Jul 27, 2026", "Instagram history", "1 ZIP part", "0", "0", tag("Wrong file: Facebook export", "danger")],
  ];
  return `
    <div class="page">
      ${pageHead("Imports", "Bring in the brand's history that the live connections can't reach. Imported items teach the brand voice. Nothing here is ever posted.")}
      <div class="stack">
        <section class="panel dropzone big">
          <span class="strong">Drop any export here</span>
          <span class="muted small">Google Takeout or Meta ZIP files. Octaneon works out which one it is.</span>
          ${btn("Choose files")}
        </section>
        <div class="grid-3">
          ${sources
            .map(
              ([ab, name, src, last, tone, status]) => `
            <section class="panel source-card" style="padding:16px">
              <div class="platform"><span class="platform-icon">${ab}</span><div><div class="strong">${name}</div><div class="muted small">${src}</div></div></div>
              <div class="row-between small"><span class="dest">${dot(tone)} ${status}</span></div>
              <p class="muted small">${last}</p>
              <div class="btn-row">${btn("How to get this file", "ghost")}</div>
            </section>`,
            )
            .join("")}
        </div>
        ${flushPanel("Import history", table(["Date", "Source", "Files", "Read", "Matched", "Result"], history, [3, 4]) + pager("imports", 14, 3))}
        ${note("Replaces <b>three separate import pages</b> with one. The Instagram and Facebook importers already detect the wrong export; one drop zone uses that to route files automatically. <b>Open question:</b> keep three buttons as well, for people who prefer to choose?")}
      </div>
    </div>`;
}

function captionsPage() {
  const t = state.tabs.captions;
  const tabList = [
    { id: "youtube", label: "YouTube", count: 3 },
    { id: "instagram", label: "Instagram", count: 5 },
    { id: "facebook", label: "Facebook", count: 3 },
  ];
  const data = {
    youtube: {
      stats: [["Needs a video file", "3", "warn"], ["Being transcribed", "12", "primary"], ["Waiting for review", "8", "warn"], ["Live on YouTube", "214", "success"]],
      review: ["Five pantry pastas in 20 minutes", "Sourdough starter, day one", "Sheet-pan chicken, three ways"],
      media: ["Brown butter banana bread", "Cast-iron care in 60 seconds", "Weeknight dal"],
      extra: panel(
        "YouTube daily limit",
        `<div class="stack" style="gap:8px">${meter(62)}<div class="row-between small"><span class="muted">Used today</span><b>62%</b></div><p class="muted small">YouTube caps how much any tool can do per day. Work continues tomorrow if it runs out.</p></div>`,
      ),
    },
    instagram: {
      stats: [["Needs a video file", "2", "warn"], ["Missing transcript", "9", "primary"], ["Missing hashtags", "3", "warn"], ["Complete", "388", "success"]],
      review: ["Reel: knife skills", "Reel: 3-ingredient dressing"],
      media: ["Reel: market haul", "Story: kitchen tour"],
      extra: panel(
        "Good to know",
        `<p class="muted small">Instagram captions can't be edited after posting. Approved transcripts are offered as text to paste into a comment.</p>`,
      ),
    },
    facebook: {
      stats: [["Needs a video file", "1", "warn"], ["Missing transcript", "4", "primary"], ["Missing hashtags", "2", "warn"], ["Complete", "256", "success"]],
      review: ["Live: Sunday roast Q&A", "Video: freezer meal prep"],
      media: ["Video: holiday cookie box"],
      extra: "",
    },
  }[t];

  const reviewList = data.review
    .map((v) => `<div class="row-between"><span>${v}</span>${btn("Review")}</div>`)
    .join("");
  const mediaList = data.media
    .map((v) => `<div class="row-between"><span>${v}</span><span class="btn-row">${btn("Upload file")}${btn("Paste link", "ghost")}</span></div>`)
    .join("");

  return `
    <div class="page">
      ${pageHead(
        "Captions & Transcripts",
        "Make sure every video has accurate captions and a transcript. Approved transcripts also teach the brand voice.",
        "Settings",
        btn("Transcribe missing videos", "primary"),
      )}
      ${tabs("captions", tabList)}
      <div class="stack">
        ${stats(data.stats)}
        <div class="split">
          <div class="stack">
            ${flushPanel("Waiting for your review", `<div class="list">${reviewList}</div>${pager("review-" + t, Number(data.stats[2][1]), 3)}`, { sub: "Check the transcript, fix names or terms, approve." })}
            ${flushPanel(
              `Needs a video file (${data.media.length})`,
              `<div class="list">${mediaList}${pager("media-" + t, data.media.length, 5)}<div><div class="dropzone"><span class="strong">Drop several files at once</span><span class="muted small">Matched to videos by title</span></div></div></div>`,
              { sub: "Octaneon can't find these videos' files. Upload or link them to continue." },
            )}
            ${panel(
              "Technical details",
              `<div class="row-between"><p class="muted small">Batch-by-batch pipeline logs for this channel.</p><button class="btn" type="button" data-logs="captions:${t}">Open in Activity &amp; Logs →</button></div>`,
            )}
          </div>
          <div class="stack">
            ${panel(
              "Settings",
              toggle("Teach the voice before approval", true, "Transcripts shape the brand voice as drafts straight away, then update once approved."),
            )}
            ${data.extra}
            ${note("The three Audit pages aren't only logs: they hold <b>transcript review</b>, <b>missing video files</b>, the <b>knowledge-seeding switch</b> and the <b>YouTube daily limit</b>. Those stay, merged into one page with a tab per channel. The logs move to <b>Activity &amp; Logs</b>.")}
          </div>
        </div>
      </div>
    </div>`;
}

function teamPage() {
  const people = [
    ["AK", "Alex Kim", "alex@northwindkitchen.example", tag("Admin", "primary"), "Active"],
    ["SR", "Sam Rivera", "sam@northwindkitchen.example", tag("Member"), "Active"],
    ["JP", "Jo Patel", "jo@agency.example", tag("Member"), tag("Invite sent", "warn")],
  ];
  return `
    <div class="page">
      ${pageHead("Team", "Who can see and work on this brand.", "Settings", btn("Invite someone", "primary"))}
      <div class="stack">
        ${flushPanel(
          "Members",
          table(
            ["Person", "Role", "Status", ""],
            people.map(([ini, name, email, role, status]) => [
              `<div class="person"><div class="avatar">${ini}</div><div><div class="strong">${name}</div><div class="muted small">${email}</div></div></div>`,
              role,
              status,
              btn("Manage", "ghost"),
            ]),
          ) + pager("team", 3, 10),
        )}
        ${panel(
          "What each role can do",
          `<div class="grid-2"><div><div class="strong">Admin</div><p class="muted small">Everything a member can do, plus brand settings, connected channels and the team.</p></div><div><div class="strong">Member</div><p class="muted small">Day-to-day content and replies, and their own account.</p></div></div>`,
        )}
        ${note("Renamed from <b>Members & Invites</b>; pending invitations sit in the same list instead of a separate section.")}
      </div>
    </div>`;
}

function agentsPage() {
  return `
    <div class="page">
      ${pageHead("AI Agents", "Let an AI assistant such as Claude or ChatGPT work on this brand as you.")}
      <div class="stack">
        <div class="grid-2">
          ${panel(
            "Connect an agent",
            `<div class="stack" style="gap:12px">${field("Connection address", "https://octaneon.ai/mcp")}<div class="btn-row">${btn("Copy address", "primary")}${btn("Test connection", "ghost")}</div></div>`,
            { sub: "Paste this into your agent, then sign in and approve." },
          )}
          ${flushPanel(
            "Your connected agents",
            `<div class="list">
              <div class="row-between"><div><div class="strong">Claude</div><div class="muted small">Connected Sep 12 · last used today</div></div>${btn("Revoke", "danger")}</div>
              <div class="row-between"><div><div class="strong">ChatGPT</div><div class="muted small">Connected Aug 30 · last used Sep 20</div></div>${btn("Revoke", "danger")}</div>
            </div>`,
          )}
        </div>
        ${panel(
          "Important",
          `<p>Posts published by an agent go live <b>immediately</b>, with no second approval. Comment replies from an agent always wait for your approval.</p>`,
          { cls: "" },
        )}
        ${panel("Activity", `<div class="row-between"><p class="muted">Every agent action, with what it relied on and whether it changed anything.</p><button class="btn" type="button" data-logs="agents:all">Open in Activity &amp; Logs →</button></div>`)}
        ${note("Renamed from <b>Agent Access (MCP)</b>; “MCP” means nothing to customers. The tool list moves behind the activity log.")}
      </div>
    </div>`;
}

const LOG_PAGE_SIZE = 6;

function pager(key, total, size) {
  const pages = Math.max(1, Math.ceil(total / size));
  const page = Math.min(state.pages[key] || 1, pages);
  const from = total ? (page - 1) * size + 1 : 0;
  const to = Math.min(page * size, total);
  const nums = [];
  for (let p = 1; p <= pages; p++) {
    if (p === 1 || p === pages || Math.abs(p - page) <= 1) nums.push(p);
    else if (nums[nums.length - 1] !== "…") nums.push("…");
  }
  return `
    <nav class="pager" aria-label="Pagination">
      <span class="muted small">Showing <b>${from}–${to}</b> of <b>${total.toLocaleString()}</b></span>
      <div class="pager-controls">
        <button type="button" class="btn pg" data-page="${key}:${page - 1}" ${page === 1 ? "disabled" : ""} aria-label="Previous page">‹</button>
        ${nums
          .map((n) =>
            n === "…"
              ? `<span class="muted pg-gap">…</span>`
              : `<button type="button" class="btn pg ${n === page ? "active" : ""}" data-page="${key}:${n}" aria-current="${n === page ? "page" : "false"}">${n}</button>`,
          )
          .join("")}
        <button type="button" class="btn pg" data-page="${key}:${page + 1}" ${page === pages ? "disabled" : ""} aria-label="Next page">›</button>
      </div>
    </nav>`;
}

const seg = (key, list, cls = "") =>
  `<div class="segmented ${cls}" role="tablist">${list
    .map(
      ([id, label]) =>
        `<button type="button" role="tab" aria-selected="${state.tabs[key] === id}" class="${state.tabs[key] === id ? "active" : ""}" data-tab="${key}:${id}">${label}</button>`,
    )
    .join("")}</div>`;

const chips = (attr, current, list) =>
  `<div class="chips">${list
    .map(
      ([id, label, count]) =>
        `<button type="button" class="chip ${current === id ? "active" : ""}" data-${attr}="${id}">${label}${count !== undefined ? ` <span class="chip-count">${count}</span>` : ""}</button>`,
    )
    .join("")}</div>`;

const CHANNEL_MARK = { YouTube: "YT", Instagram: "IG", Facebook: "FB", WordPress: "WP", LinkedIn: "IN", TikTok: "TT" };
const chan = (c) => `<span class="chan"><span class="chan-mark">${CHANNEL_MARK[c]}</span>${c}</span>`;

const VIDEOS = [
  ["Five pantry pastas in 20 minutes", "8:42", ["Ready", "success"], ["On YouTube", "success"], true],
  ["Sourdough starter, day one", "12:05", ["Needs review", "warn"], ["Confirming", "warn"], true],
  ["Sheet-pan chicken, three ways", "6:18", ["Transcribing…", "primary"], ["—", ""], false],
  ["Brown butter banana bread", "4:51", ["Ready", "success"], ["On YouTube", "success"], true],
  ["Weeknight dal", "7:33", ["Waiting for file", "warn"], ["—", ""], false],
];

const RUNS = [
  { title: "Five pantry pastas in 20 minutes", when: "Today, 09:12", status: ["Needs review", "warn"], group: "review" },
  { title: "Brown butter banana bread", when: "Yesterday", status: ["Scheduled", "primary"], group: "scheduled" },
  { title: "Cast-iron care in 60 seconds", when: "Sep 22", status: ["Published", "success"], group: "published" },
  { title: "Market haul: September", when: "Sep 20", status: ["1 failed", "danger"], group: "error" },
];

const DRAFTS = [
  ["WordPress", "Five pantry pastas you can make on a Tuesday", "A tin of tomatoes, a jar of anchovies and whatever pasta is in the cupboard. Here are the five we make most, and why each one works…", ["#weeknight", "#pantrystaples"], ["Draft", ""]],
  ["YouTube", "5 Pantry Pastas in 20 Minutes (No Shopping Needed)", "Five pastas from the cupboard, each under 20 minutes. Recipes and timings in the description. Full write-up on the blog.", ["#pasta", "#weeknightdinner"], ["Draft", ""]],
  ["Instagram", "", "No shopping, no fuss: five pantry pastas in 20 minutes 🍝 Which one are you making tonight? Full recipes at the link in bio.", ["#pantrypasta", "#weeknight", "#onepan"], ["Edited", "primary"]],
  ["Facebook", "", "Five pastas, one cupboard, twenty minutes. We've written up all five on the blog. Link below.", ["#weeknightdinner"], ["Draft", ""]],
];

const WEEK = [
  ["Mon 21", [["09:00", "YouTube", "Cast-iron care", "success"], ["18:00", "Instagram", "Cast-iron care", "success"]]],
  ["Tue 22", [["12:00", "WordPress", "Cast-iron care", "success"]]],
  ["Wed 23", [["10:30", "Facebook", "Market haul", "danger"], ["17:00", "TikTok", "Market haul", "success"]]],
  ["Thu 24", []],
  ["Fri 25", [["08:00", "WordPress", "Banana bread", "primary"], ["11:00", "YouTube", "Banana bread", "primary"]]],
  ["Sat 26", [["09:30", "Instagram", "Banana bread", "primary"], ["15:00", "Facebook", "Banana bread", "primary"]]],
  ["Sun 27", [["10:00", "LinkedIn", "Banana bread", "primary"]]],
];

function contentPage() {
  const mode = state.tabs.content;
  const action = { upload: btn("Add videos", "primary"), generate: btn("New generation", "primary"), calendar: btn("Schedule a post", "primary") }[mode];
  const body = { upload: contentUpload, generate: contentGenerate, calendar: contentCalendar }[mode]();
  const step = (id, label, value, tone) =>
    `<button type="button" class="flow-step ${mode === id ? "active" : ""}" data-tab="content:${id}"><span class="muted small">${label}</span><span class="flow-value ${tone}">${value}</span></button>`;
  return `
    <div class="page wide">
      <div class="page-head">
        <div><div class="eyebrow">Create</div><h1>Content</h1><p class="muted">Upload a video, turn it into posts for every channel, and see when they go out, all in one place.</p></div>
        <div class="btn-row">${action}</div>
      </div>
      <div class="content-bar">
        ${seg("content", [["upload", "Upload"], ["generate", "Generate"], ["calendar", "Calendar"]], "big")}
        <div class="flow">
          ${step("upload", "Videos ready", "18", "")}
          <span class="flow-arrow">→</span>
          ${step("generate", "Drafts to review", "7", "warn")}
          <span class="flow-arrow">→</span>
          ${step("calendar", "Scheduled this week", "9", "primary")}
        </div>
      </div>
      <div class="stack">
        ${body}
        ${note("Replaces <b>Content Upload</b>, <b>Content Generation</b> and <b>Content Calendar</b>: three menu items for one job. The switch keeps its place in the link, so a teammate can be sent straight to “Generate”.")}
      </div>
    </div>`;
}

function contentUpload() {
  return `
    <section class="panel dropzone compact">
      <span class="strong">Drop videos here</span>
      <span class="muted small">MP4 or MOV. Octaneon writes the transcript and subtitles for each one.</span>
    </section>
    ${flushPanel(
      "Videos",
      table(
        ["Video", "Length", "Transcript", "Subtitles", ""],
        VIDEOS.map(([title, len, [ts, tt], [ss, st], ready]) => [
          `<span class="strong">${title}</span>`,
          `<span class="muted mono small">${len}</span>`,
          tag(ts, tt),
          st ? tag(ss, st) : `<span class="muted">—</span>`,
          ready
            ? `<button class="btn" type="button" data-tab="content:generate">Create posts →</button>`
            : `<span class="muted small">Not ready</span>`,
        ]),
      ) + pager("videos", 42, 5),
      { sub: "Newest first.", actions: `<input class="input search" placeholder="Search videos" aria-label="Search videos" />` },
    )}`;
}

function contentGenerate() {
  const counts = { all: RUNS.length, review: 1, scheduled: 1, published: 1, error: 1 };
  const runs = RUNS.map((r, i) => ({ ...r, i })).filter((r) => state.genFilter === "all" || r.group === state.genFilter);
  const run = RUNS[state.selectedRun];
  return `
    ${chips("gen", state.genFilter, [
      ["all", "All", counts.all],
      ["review", "Needs review", counts.review],
      ["scheduled", "Scheduled", counts.scheduled],
      ["published", "Published", counts.published],
      ["error", "Failed", counts.error],
    ])}
    <div class="gen-split">
      <section class="panel flush">
        <div class="list">${runs
          .map(
            (r) =>
              `<button type="button" class="run ${r.i === state.selectedRun ? "active" : ""}" data-run="${r.i}"><span><span class="strong">${r.title}</span><span class="muted small">${r.when}</span></span>${tag(r.status[0], r.status[1])}</button>`,
          )
          .join("") || `<div class="muted small">Nothing here.</div>`}</div>
        ${pager("runs", state.genFilter === "all" ? 27 : runs.length, 4)}
      </section>
      <div class="stack">
        <div class="row-between"><div><h2>${run.title}</h2><p class="muted small">Posts in publishing order. Each one goes out after the one before it.</p></div>${tag(run.status[0], run.status[1])}</div>
        ${DRAFTS.map(
          ([c, title, text, hashtags, [st, tone]], i) => `
          <section class="panel draft">
            <header class="draft-head"><span class="dest"><span class="order">${i + 1}</span>${chan(c)}</span>${tag(st, tone)}</header>
            <div class="panel-body stack" style="gap:10px">
              ${title ? `<input class="input strong" value="${title}" aria-label="${c} title" />` : ""}
              <textarea class="input" rows="3" aria-label="${c} text">${text}</textarea>
              <div class="row-between"><div class="tags">${hashtags.map((h) => tag(h)).join("")}</div>
              <div class="btn-row">${btn("Save", "ghost")}${btn("Schedule")}${btn("Post now", "primary")}</div></div>
            </div>
          </section>`,
        ).join("")}
      </div>
    </div>`;
}

function contentCalendar() {
  return `
    <section class="panel flush">
      <header class="cal-head">
        <div class="btn-row"><button class="btn" type="button" aria-label="Previous week">←</button><button class="btn" type="button">Today</button><button class="btn" type="button" aria-label="Next week">→</button></div>
        <h2>Sep 21 – 27, 2026</h2>
        <div class="legend"><span>${dot("success")} Published</span><span>${dot("primary")} Scheduled</span><span>${dot("danger")} Failed</span></div>
      </header>
      <div class="cal-scroll"><div class="cal">
        ${WEEK.map(
          ([day, posts], i) => `
          <div class="cal-day ${i === 5 ? "today" : ""}">
            <div class="cal-date">${day}</div>
            ${posts
              .map(
                ([time, c, title, tone]) =>
                  `<div class="cal-post ${tone}"><div class="row-between"><span class="mono small">${time}</span>${dot(tone)}</div><div class="small strong">${c}</div><div class="muted small">${title}</div></div>`,
              )
              .join("") || `<div class="muted small cal-empty">Nothing planned</div>`}
          </div>`,
        ).join("")}
      </div></div>
    </section>`;
}

const TOPICS = [
  { name: "Sourdough troubleshooting", sub: 4, asks: 86, demand: 92, cover: 30, asksList: [["Instagram", "Why is my starter not rising after a week?"], ["YouTube", "Can you do a video on dense crumb?"], ["Facebook", "What flour do you use for the starter?"]], answers: [["YouTube", "Sourdough starter, day one"]] },
  { name: "Weeknight dinners", sub: 6, asks: 64, demand: 70, cover: 72, asksList: [["Instagram", "More 20 minute meals please!"], ["YouTube", "Can this be made the night before?"]], answers: [["YouTube", "Five pantry pastas in 20 minutes"], ["WordPress", "Sheet-pan chicken, three ways"], ["Instagram", "Reel: 3-ingredient dressing"]] },
  { name: "Freezer & batch cooking", sub: 3, asks: 41, demand: 48, cover: 0, asksList: [["Facebook", "Which of these freeze well?"], ["Instagram", "Do you have a batch cooking plan?"]], answers: [] },
  { name: "Cast-iron care", sub: 2, asks: 28, demand: 30, cover: 34, asksList: [["YouTube", "How do I get rust off?"]], answers: [["YouTube", "Cast-iron care in 60 seconds"], ["WordPress", "The only cast-iron guide you need"]] },
  { name: "Baking substitutions", sub: 5, asks: 37, demand: 40, cover: 12, asksList: [["Instagram", "Can I use oil instead of butter?"], ["YouTube", "Egg-free version?"]], answers: [["WordPress", "Brown butter banana bread"]] },
  { name: "Kitchen equipment", sub: 3, asks: 19, demand: 22, cover: 0, asksList: [["YouTube", "Which knife is that?"]], answers: [] },
];

function topicsPage() {
  const withGap = TOPICS.map((t) => ({ ...t, gap: Math.max(0, t.demand - t.cover) })).sort((a, b) => b.gap - a.gap);
  const shown = withGap.filter((t) => state.topicFilter === "all" || (state.topicFilter === "gaps" ? t.gap > 15 : t.gap <= 15));
  const bar = (label, value, tone) =>
    `<div class="mini"><span class="muted small">${label}</span><div class="meter ${tone}"><span style="width:${value}%"></span></div><span class="mono small">${value}</span></div>`;
  return `
    <div class="page wide">
      <div class="page-head">
        <div><div class="eyebrow">Plan</div><h1>Topics</h1><p class="muted">What your audience asks about, compared with what you've already published. The biggest gaps are the best next pieces of content.</p></div>
        <div class="btn-row">
          <div class="segmented" role="radiogroup" aria-label="Detail">${["broad", "balanced", "granular"]
            .map((g) => `<button type="button" class="${state.gran === g ? "active" : ""}" data-gran="${g}">${g[0].toUpperCase() + g.slice(1)}</button>`)
            .join("")}</div>
          ${btn("Rebuild topics")}
        </div>
      </div>
      <div class="stack">
        ${stats([["Topics", "18"], ["Asked about most", "Sourdough", "primary"], ["No coverage yet", "4", "warn"], ["Overall coverage", "64%", "success"]])}
        <div class="row-between wrap">
          ${chips("topic", state.topicFilter, [["all", "All topics"], ["gaps", "Biggest gaps"], ["covered", "Well covered"]])}
          <span class="muted small">Sorted by gap · live from brand knowledge</span>
        </div>
        <div class="stack" style="gap:10px">
          ${shown
            .map(
              (t, i) => `
            <details class="panel topic" ${i === 0 ? "open" : ""}>
              <summary>
                <div class="topic-name">
                  <span class="strong">${t.name}</span>
                  <span class="muted small">${t.sub} subtopics · ${t.asks} questions</span>
                  ${t.cover === 0 ? tag("No coverage · write now", "warn") : ""}
                </div>
                <div class="topic-bars">
                  ${bar("Demand", t.demand, "")}
                  ${bar("Covered", t.cover, "success")}
                  ${bar("Gap", t.gap, "warn")}
                </div>
                ${ICONS.chev}
              </summary>
              <div class="topic-body">
                <div>
                  <div class="eyebrow">What people ask</div>
                  <div class="stack" style="gap:8px">${t.asksList.map(([c, q]) => `<div class="ask">“${q}”<span class="muted small">${c}</span></div>`).join("")}</div>
                </div>
                <div>
                  <div class="eyebrow">What you've published</div>
                  <div class="stack" style="gap:8px">${
                    t.answers.map(([c, a]) => `<div class="ask">${a}<span class="muted small">${c}</span></div>`).join("") ||
                    `<div class="muted small">Nothing yet.</div>`
                  }</div>
                </div>
                <div class="btn-row topic-actions">${btn("Draft an article", "primary")}${btn("Save as idea")}</div>
              </div>
            </details>`,
            )
            .join("")}
        </div>
        <section class="panel">${pager("topics", 18, 6)}</section>
        ${note("Same content and actions as today. What changes: plain labels instead of terms like <i>topic_clusters</i>, the biggest gaps first, one summary strip, and expandable rows instead of a wide table.")}
      </div>
    </div>`;
}

const LOG_SOURCES = {
  captions: "Captions pipeline",
  agents: "AI agents",
  publishing: "Publishing",
  imports: "Imports",
  sync: "Channel sync",
  team: "Team & settings",
};

const LOGS = [
  [0.2, "Today 09:41", "info", "publishing", "Instagram", "Post scheduled", "“Five pantry pastas” for Sat 09:30 by Alex Kim"],
  [0.5, "Today 09:14", "info", "agents", "—", "Claude drafted 4 posts", "From “Five pantry pastas”. Nothing published."],
  [0.9, "Today 08:52", "warn", "sync", "Instagram", "Access expires in 3 days", "Reconnect Instagram to keep comments flowing."],
  [1.2, "Today 08:36", "warn", "captions", "YouTube", "Video file missing", "“Weeknight dal”: not in Takeout or uploads."],
  [1.3, "Today 08:22", "info", "captions", "YouTube", "11 transcripts ready", "Batch b-7f21 returned 11 of 12. One re-queued."],
  [1.6, "Today 08:14", "info", "captions", "YouTube", "Batch started", "12 videos sent for transcription."],
  [3, "Today 06:30", "info", "sync", "YouTube", "Comments synced", "38 new comments across 12 videos."],
  [5, "Today 04:00", "info", "sync", "WordPress", "History import running", "64% · 412 of 640 posts."],
  [20, "Yesterday 13:10", "error", "publishing", "Facebook", "Post failed", "“Market haul”: video format not accepted. Retry after re-encoding."],
  [22, "Yesterday 11:02", "info", "agents", "—", "ChatGPT asked a question", "“Which topics have no coverage?” Answered from brand knowledge."],
  [26, "Yesterday 07:45", "info", "team", "—", "Jo Patel invited", "Role: Member. Invited by Alex Kim."],
  [30, "Sep 24 21:00", "info", "publishing", "YouTube", "Subtitles confirmed", "“Cast-iron care in 60 seconds”."],
  [50, "Sep 24 09:00", "error", "captions", "Instagram", "Transcription failed", "Reel “market haul”: audio track empty."],
  [70, "Sep 23 15:20", "info", "team", "—", "Brand voice updated", "Interview re-submitted by Alex Kim."],
  [96, "Sep 22 12:00", "info", "publishing", "WordPress", "Article published", "“The only cast-iron guide you need”."],
  [120, "Sep 21 10:00", "warn", "sync", "LinkedIn", "Rate limited", "Paused 15 minutes, then resumed."],
  [200, "Sep 17 18:40", "info", "imports", "Instagram", "Archive imported", "4 ZIP parts · 1,204 posts matched."],
  [205, "Sep 17 18:10", "error", "imports", "Instagram", "Wrong file", "That was a Facebook export. Use Facebook history."],
  [520, "Sep 4 22:05", "info", "imports", "YouTube", "Takeout imported", "12,480 comments matched to 311 videos."],
];

const RANGE_HOURS = { "24h": 24, "7d": 168, "30d": 720 };

function filteredLogs() {
  const f = state.logFilters;
  const q = f.q.trim().toLowerCase();
  return LOGS.filter(
    ([ago, , level, source, channel, event, detail]) =>
      ago <= RANGE_HOURS[f.range] &&
      (f.level === "all" || f.level === level) &&
      (f.source === "all" || f.source === source) &&
      (f.channel === "all" || f.channel === channel) &&
      (!q || `${event} ${detail} ${channel}`.toLowerCase().includes(q)),
  );
}

const LEVEL_TAG = { error: ["Error", "danger"], warn: ["Warning", "warn"], info: ["Info", ""] };

function logRows() {
  const all = filteredLogs();
  const page = Math.min(state.pages.logs || 1, Math.max(1, Math.ceil(all.length / LOG_PAGE_SIZE)));
  const rows = all.slice((page - 1) * LOG_PAGE_SIZE, page * LOG_PAGE_SIZE);
  if (!rows.length) return `<tr><td colspan="5" class="muted" style="text-align:center;padding:28px">No entries match these filters.</td></tr>`;
  return rows
    .map(
      ([, when, level, source, channel, event, detail]) => `<tr>
        <td class="mono small muted nowrap">${when}</td>
        <td>${tag(...LEVEL_TAG[level])}</td>
        <td class="nowrap">${LOG_SOURCES[source]}</td>
        <td class="nowrap">${channel === "—" ? `<span class="muted">—</span>` : channel}</td>
        <td><div class="strong">${event}</div><div class="muted small">${detail}</div></td>
      </tr>`,
    )
    .join("");
}

function logCount() {
  const rows = filteredLogs();
  const errs = rows.filter((r) => r[2] === "error").length;
  return `${rows.length} entries${errs ? ` · <span class="text-danger">${errs} error${errs > 1 ? "s" : ""}</span>` : ""}`;
}

function select(name, value, options) {
  return `<select class="input select" data-filter="${name}" aria-label="${name}">${options
    .map(([v, l]) => `<option value="${v}" ${v === value ? "selected" : ""}>${l}</option>`)
    .join("")}</select>`;
}

function activityLog() {
  const f = state.logFilters;
  return `
    <section class="panel filters">
      <input class="input search" data-filter="q" placeholder="Search events" value="${f.q}" aria-label="Search events" />
      ${select("source", f.source, [["all", "All sources"], ...Object.entries(LOG_SOURCES)])}
      ${select("channel", f.channel, [["all", "All channels"], ...["YouTube", "Instagram", "Facebook", "WordPress", "LinkedIn", "TikTok"].map((c) => [c, c])])}
      ${select("range", f.range, [["24h", "Last 24 hours"], ["7d", "Last 7 days"], ["30d", "Last 30 days"]])}
      <button class="btn ghost" type="button" data-action="reset-filters">Reset</button>
    </section>
    <div class="row-between wrap">
      ${chips("level", f.level, [["all", "All levels"], ["error", "Errors"], ["warn", "Warnings"], ["info", "Info"]])}
      <div class="dest"><span class="muted small" id="log-count">${logCount()}</span>${btn("Export CSV", "ghost")}</div>
    </div>
    <section class="panel flush">
      <div class="table-wrap"><table>
        <thead><tr><th>When</th><th>Level</th><th>Source</th><th>Channel</th><th>Event</th></tr></thead>
        <tbody id="log-rows">${logRows()}</tbody>
      </table></div>
      <div id="log-pager">${pager("logs", filteredLogs().length, LOG_PAGE_SIZE)}</div>
    </section>`;
}

function ingestion() {
  const rows = [
    ["YouTube", 100, "success", "1,284 videos · 48,210 comments", "Live", "4 min ago"],
    ["Instagram", 82, "warn", "1,318 posts · 9,870 comments", "Paused: reconnect", "3 days ago"],
    ["Facebook", 100, "success", "912 posts · 6,044 comments", "Live", "12 min ago"],
    ["WordPress", 64, "", "412 of 640 posts", "Importing", "Running now"],
    ["LinkedIn", 100, "success", "188 posts", "Live", "1 hour ago"],
    ["TikTok", 0, "", "Not connected", "—", "—"],
  ];
  return `
    ${stats([["Items in brand knowledge", "68,838"], ["Channels fully imported", "3 of 6", "success"], ["Importing now", "1", "primary"], ["Need attention", "1", "warn"]])}
    ${flushPanel(
      "History & ongoing sync",
      table(
        ["Channel", "History imported", "", "Collected", "Ongoing sync", "Last synced"],
        rows.map(([c, pct, tone, collected, sync, last]) => [
          `<span class="strong">${c}</span>`,
          pct ? `<div style="min-width:120px">${meter(pct, pct === 100 ? "success" : tone)}</div>` : `<span class="muted">—</span>`,
          `<span class="mono small">${pct ? pct + "%" : ""}</span>`,
          `<span class="muted">${collected}</span>`,
          sync === "Live" ? tag("Live", "success") : sync === "—" ? `<span class="muted">—</span>` : tag(sync, tone || "primary"),
          `<span class="muted small">${last}</span>`,
        ]),
      ) + pager("ingest", 6, 10),
      { sub: "How much of each channel's past Octaneon has read, and whether new posts and comments are still arriving." },
    )}`;
}

function logsPage() {
  const t = state.tabs.logs;
  return `
    <div class="page wide">
      ${pageHead("Activity & Logs", "One place for everything Octaneon did for this brand: publishing, captions, imports, AI agents and team changes.")}
      ${tabs("logs", [{ id: "activity", label: "Activity log" }, { id: "ingestion", label: "Ingestion progress" }])}
      <div class="stack">
        ${t === "activity" ? activityLog() : ingestion()}
        ${note("New page. Collects the <b>captions pipeline logs</b> (from the three Audit pages), the <b>AI agent audit log</b>, publishing results and import history, plus <b>Ingestion Progress</b> from Brand Voice &amp; Knowledge. Other pages link here with the right filter already set.")}
      </div>
    </div>`;
}

const IDEAS = [
  ["Freezer meal plan for a busy week", "Article", "Batch cooking", "From a topic gap", "Today"],
  ["Sourdough: why your starter isn't rising", "Video", "Baking", "From 12 comments", "Today"],
  ["Knife guide for home cooks", "Article", "Equipment", "From a topic gap", "Yesterday"],
  ["Autumn soup series", "Video", "Seasonal", "Added by Alex Kim", "Sep 22"],
  ["Egg-free banana bread", "Post", "Baking", "From 5 comments", "Sep 21"],
  ["Cast-iron myths, busted", "Video", "Equipment", "Added by Sam Rivera", "Sep 19"],
];

function ideasPage() {
  const t = state.tabs.ideas;
  const cats = ["all", "Baking", "Batch cooking", "Equipment", "Seasonal"];
  const shown = IDEAS.filter((i) => state.ideaCat === "all" || i[2] === state.ideaCat);
  const saved = `
    <div class="row-between wrap">
      ${chips("cat", state.ideaCat, cats.map((c) => [c, c === "all" ? "All categories" : c]))}
      <div class="btn-row">${btn("New category", "ghost")}${btn("Add idea", "primary")}</div>
    </div>
    <section class="panel flush">
      <div class="list">${shown
        .map(
          ([title, type, cat, source, when]) => `
        <div class="idea">
          <div class="idea-main"><span class="strong">${title}</span><span class="muted small">${source} · ${when}</span></div>
          <div class="tags">${tag(type, type === "Video" ? "danger" : type === "Article" ? "primary" : "")}${tag(cat)}</div>
          <div class="btn-row">${btn("Edit", "ghost")}<button class="btn" type="button" data-go="proposed:content">Create content →</button></div>
        </div>`,
        )
        .join("") || `<div class="muted">No ideas in this category yet.</div>`}</div>
      ${pager("ideas", state.ideaCat === "all" ? 23 : shown.length, 6)}
    </section>`;
  const gaps = TOPICS.map((x) => ({ ...x, gap: Math.max(0, x.demand - x.cover) }))
    .filter((x) => x.gap > 15)
    .sort((a, b) => b.gap - a.gap);
  const suggested = `
    <div class="row-between wrap"><p class="muted small">Topics people ask about that you've barely covered. Suggestions refresh every hour.</p>${tag("Next refresh in 42 min")}</div>
    <div class="grid-2">${gaps
      .map(
        (g) => `
      <section class="panel" style="padding:16px">
        <div class="stack" style="gap:10px">
          <div class="row-between"><span class="strong">${g.name}</span>${g.cover === 0 ? tag("No coverage", "warn") : tag(`Gap ${g.gap}`, "warn")}</div>
          <div class="muted small">${g.asks} questions · ${g.cover}% covered</div>
          ${g.asksList.slice(0, 2).map(([, q]) => `<div class="ask">“${q}”</div>`).join("")}
          <div class="btn-row">${btn("Write a blog draft", "primary")}${btn("Save idea", "ghost")}</div>
        </div>
      </section>`,
      )
      .join("")}</div>
    <section class="panel">${pager("gaps", gaps.length, 6)}</section>`;
  return `
    <div class="page wide">
      ${pageHead("Content Ideas", "Your saved ideas, plus suggestions from what your audience asks about most.", "Plan")}
      ${tabs("ideas", [{ id: "saved", label: "Saved ideas" }, { id: "suggested", label: "Suggested", count: gaps.length }])}
      <div class="stack">
        ${t === "saved" ? saved : suggested}
        ${note("Today both lists are stacked on one long page. Tabs separate <b>your ideas</b> from <b>Octaneon's suggestions</b>; “Create content” hands an idea straight to the Content page.")}
      </div>
    </div>`;
}

function demandPage() {
  const sources = [
    ["YouTube channel", "Home Bakers Weekly", true],
    ["YouTube channel", "Weeknight Kitchen Co.", true],
    ["Topic", "sourdough for beginners", true],
    ["Topic", "freezer meals", false],
  ];
  const themes = [
    ["Beginner sourdough failures", 142, ["Why is my loaf flat?", "How warm should the starter be?"]],
    ["Cheap weeknight protein", 97, ["Budget chicken ideas?", "Best beans for one-pot meals?"]],
    ["Kid-friendly batch cooking", 64, ["What freezes well for lunchboxes?", "Hidden-veg sauces?"]],
  ];
  return `
    <div class="page wide">
      ${pageHead("Audience Demand Mining", "See what people ask on channels like yours, then turn the questions into things to film or write. Built for brands without a big audience yet.", "Plan", btn("Run analysis", "primary"))}
      <div class="steps" style="margin-bottom:16px">
        <div class="step"><span class="num">✓</span><div><div class="strong">Pick channels &amp; topics</div><div class="muted small">3 approved</div></div></div>
        <div class="step"><span class="num">✓</span><div><div class="strong">Read the questions</div><div class="muted small">Last run Sep 24</div></div></div>
        <div class="step current"><span class="num">3</span><div><div class="strong">Turn themes into ideas</div><div class="muted small">3 themes found</div></div></div>
      </div>
      <div class="split">
        <div class="stack">
          <div class="stack" style="gap:10px">${themes
            .map(
              ([name, n, qs]) => `
            <section class="panel" style="padding:16px">
              <div class="row-between"><div><div class="strong">${name}</div><div class="muted small">${n} questions found</div></div><button class="btn" type="button" data-go="proposed:ideas">Save as idea</button></div>
              <div class="stack" style="gap:6px;margin-top:10px">${qs.map((q) => `<div class="ask">“${q}”</div>`).join("")}</div>
            </section>`,
            )
            .join("")}</div>
          ${flushPanel(
            "Recent runs",
            table(
              ["When", "Sources", "Questions read", "Themes", "Result"],
              [
                ["Sep 24", "3", "1,204", "3", tag("Done", "success")],
                ["Sep 10", "2", "860", "4", tag("Done", "success")],
                ["Aug 28", "2", "0", "0", tag("Channel private", "danger")],
              ],
              [2, 3],
            ) + pager("runs-demand", 9, 3),
          )}
        </div>
        <div class="stack">
          ${flushPanel(
            "Channels & topics",
            `<div class="list">${sources
              .map(
                ([type, name, on]) =>
                  `<div class="row-between"><div><div class="strong small">${name}</div><div class="muted small">${type}</div></div><span class="switch ${on ? "on" : ""}" role="switch" aria-checked="${on}" aria-label="Include ${name}" tabindex="0"></span></div>`,
              )
              .join("")}<div class="stack" style="gap:8px"><input class="input" placeholder="Add a channel link or topic" aria-label="Add a channel or topic" />${btn("Suggest channels for my industry", "ghost")}</div></div>`,
          )}
          ${note("Same three sections as today. The steps strip tells a new brand what to do next, and themes, the useful output, move to the top.")}
        </div>
      </div>
    </div>`;
}

function benchmarkPage() {
  const rows = [
    ["You · Northwind Kitchen", "Instagram + Facebook", "5.2", "3.8%", "Reels", true],
    ["Home Bakers Weekly", "Instagram", "7.0", "4.6%", "Reels", false],
    ["Weeknight Kitchen Co.", "Facebook", "3.1", "2.2%", "Video", false],
    ["#sourdoughbeginner", "Hashtag", "210", "5.1%", "Carousel", false],
  ];
  return `
    <div class="page wide">
      ${pageHead("Competitor Benchmarking", "How often you post and how people respond, compared with the accounts and hashtags you choose. Public information only.", "Plan", btn("Refresh", ""))}
      <div class="stack">
        ${stats([["Your posts per week", "5.2", "success"], ["Competitor average", "5.1"], ["Your engagement", "3.8%", "success"], ["Competitor average", "3.4%"]])}
        <div class="split">
          ${flushPanel(
            "Posting & engagement",
            table(
              ["Account", "Where", "Posts / week", "Engagement", "Best format"],
              rows.map(([name, where, ppw, eng, fmt, you]) => [
                you ? `<span class="strong">${name}</span> ${tag("You", "primary")}` : name,
                `<span class="muted">${where}</span>`,
                ppw,
                eng,
                fmt,
              ]),
              [2, 3],
            ) + pager("bench", rows.length, 10),
            { sub: "Last 30 days." },
          )}
          <div class="stack">
            ${flushPanel(
              "Tracked accounts",
              `<div class="list">${rows
                .slice(1)
                .map(([name, where]) => `<div class="row-between"><div><div class="strong small">${name}</div><div class="muted small">${where}</div></div>${btn("Remove", "ghost")}</div>`)
                .join("")}<div class="stack" style="gap:8px"><input class="input" placeholder="Page, @account or #hashtag" aria-label="Add competitor" />${btn("Track", "primary")}</div></div>`,
            )}
            ${note("A summary strip answers “are we ahead or behind?” before the detail table. Your own row is always first and marked.")}
          </div>
        </div>
      </div>
    </div>`;
}

const VIDEO_ROWS = [
  ["Five pantry pastas in 20 minutes", ["YouTube", "Instagram", "Facebook", "TikTok"], "184,210", "6.2%", 4],
  ["Cast-iron care in 60 seconds", ["YouTube", "Instagram", "TikTok"], "96,540", "7.9%", 3],
  ["Sourdough starter, day one", ["YouTube", "Facebook"], "71,002", "4.1%", 2],
  ["Brown butter banana bread", ["Instagram", "Facebook"], "38,915", "5.5%", 2],
  ["Market haul: September", ["TikTok", "Instagram"], "22,380", "3.0%", 2],
];

function videosPage() {
  return `
    <div class="page wide">
      ${pageHead("Video Performance", "One row per video, with its numbers from every platform added together, including imported history.", "Measure", btn("Regroup after import", ""))}
      <div class="stack">
        ${stats([["Videos", "311"], ["Views, last 30 days", "1.2M", "primary"], ["Best video", "Pantry pastas"], ["Posts left unmatched", "6", "warn"]])}
        <section class="panel filters">
          <input class="input search" placeholder="Search videos" aria-label="Search videos" />
          ${select("vplatform", "all", [["all", "All platforms"], ["YouTube", "YouTube"], ["Instagram", "Instagram"], ["Facebook", "Facebook"], ["TikTok", "TikTok"]])}
          ${select("vsort", "views", [["views", "Most views"], ["eng", "Best engagement"], ["new", "Newest"]])}
        </section>
        <section class="panel flush">
          <div class="list">${VIDEO_ROWS.map(
            ([title, plats, views, eng, posts], i) => `
            <div class="video-row ${state.openVideo === i ? "open" : ""}">
              <button type="button" class="video-sum" data-video="${i}" aria-expanded="${state.openVideo === i}">
                <span class="strong">${title}</span>
                <span class="marks">${plats.map((p) => `<span class="chan-mark" title="${p}">${CHANNEL_MARK[p]}</span>`).join("")}</span>
                <span class="mono">${views}</span>
                <span class="mono muted">${eng}</span>
                ${ICONS.chev}
              </button>
              ${
                state.openVideo === i
                  ? `<div class="video-detail">${table(
                      ["Post", "Views", "Engagement", "Matched by", ""],
                      plats.map((p, j) => [chan(p), (Math.round(Number(views.replace(/,/g, "")) / (j + 1.6))).toLocaleString(), eng, j === 0 ? "Same upload" : "Title & length", btn("Unlink", "ghost")]),
                      [1],
                    )}<div class="btn-row" style="padding:10px 16px">${btn("Link another post")}${btn("Rename video", "ghost")}</div></div>`
                  : ""
              }
            </div>`,
          ).join("")}</div>
          ${pager("videos-perf", 311, 5)}
        </section>
        ${note("Same data and actions. Rows open in place to show each post and how it was matched, instead of a second table below.")}
      </div>
    </div>`;
}

const DAYS = [42, 38, 51, 47, 60, 72, 66, 58, 63, 80, 77, 71, 69, 85];
const PLATFORM_SHARE = { YouTube: 0.45, Instagram: 0.25, Facebook: 0.2, TikTok: 0.1 };

function analysisPage() {
  const t = state.tabs.analysis;
  const p = state.platform;
  const share = p === "all" ? 1 : PLATFORM_SHARE[p];
  const k = (n) =>
    n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` : n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : String(Math.round(n));
  const platformChips = chips("platform", p, [["all", "All platforms"], ...Object.keys(PLATFORM_SHARE).map((x) => [x, x])]);
  const top = VIDEO_ROWS.map(([title, , views, eng]) => [title, Math.round(Number(views.replace(/,/g, "")) * share).toLocaleString(), eng]);
  const overview = `
    ${stats([["Views", k(1210000 * share), "primary"], ["Watch minutes", k(3400000 * share)], ["Engagement", "5.1%"], ["Replies sent", k(1840 * share), "success"]])}
    <div class="grid-2">
      ${panel(
        "Daily views",
        `<div class="bars tall">${DAYS.map((v, i) => `<div><span style="height:${Math.round(v * share * 1.4)}px"></span>${i % 2 ? "" : i + 12}</div>`).join("")}</div>`,
        { sub: `Sep 12 – 25 · ${p === "all" ? "all platforms" : p}` },
      )}
      ${panel(
        "Publishing funnel",
        `<div class="stack" style="gap:10px">${[["Ideas", 120], ["Drafts", 86], ["Scheduled", 52], ["Published", 47]]
          .map(([label, n]) => `<div class="mini wide"><span class="muted small">${label}</span>${meter(Math.round((n / 120) * 100))}<span class="mono small">${Math.round(n * share)}</span></div>`)
          .join("")}</div>`,
      )}
    </div>
    <div class="grid-2">
      ${flushPanel("Top videos", table(["Video", "Views", "Engagement"], top, [1, 2]) + pager("top-videos", 311, 5))}
      ${panel(
        "Comments by topic",
        `<div class="stack" style="gap:10px">${[["Sourdough", 92, 80], ["Weeknight dinners", 70, 95], ["Batch cooking", 48, 40], ["Equipment", 22, 60]]
          .map(([topic, vol, cov]) => `<div class="mini wide"><span class="muted small">${topic}</span>${meter(vol)}<span class="mono small">${cov}%</span></div>`)
          .join("")}<p class="muted small">Bar: how many comments. Number: share of them answered.</p></div>`,
      )}
    </div>`;
  const youtube = `
    ${stats([["Subscribers gained", "+2,140", "success"], ["Subscribers lost", "−310", "warn"], ["Avg view duration", "4:12"], ["Click-through rate", "6.8%", "primary"]])}
    <div class="grid-2">
      ${panel("Where viewers come from", `<div class="stack" style="gap:10px">${[["Browse", 38], ["Suggested videos", 29], ["Search", 21], ["External", 8], ["Other", 4]].map(([l, v]) => `<div class="mini wide"><span class="muted small">${l}</span>${meter(v * 2)}<span class="mono small">${v}%</span></div>`).join("")}</div>`)}
      ${panel("Who watches", `<div class="stack" style="gap:10px">${[["18–24", 14], ["25–34", 36], ["35–44", 27], ["45–54", 15], ["55+", 8]].map(([l, v]) => `<div class="mini wide"><span class="muted small">${l}</span>${meter(v * 2.5)}<span class="mono small">${v}%</span></div>`).join("")}</div>`)}
    </div>`;
  const revenue = `
    ${stats([["Total, last 30 days", "$3,480", "success"], ["Creator payouts", "$2,110"], ["Website ads", "$1,370"], ["vs previous 30 days", "+12%", "primary"]])}
    ${panel("Daily revenue", `<div class="bars tall">${DAYS.map((v, i) => `<div><span style="height:${Math.round(v * 1.2)}px"></span>${i % 2 ? "" : i + 12}</div>`).join("")}</div>`, { sub: "Creator payouts and website ads combined." })}`;
  return `
    <div class="page wide">
      ${pageHead("Analysis", "How your content is doing. Pick a platform to narrow every chart at once.", "Measure", `<div class="btn-row"><div class="segmented" role="radiogroup" aria-label="Date range">${["7d", "30d", "90d"].map((r) => `<button type="button" class="${state.range === r ? "active" : ""}" data-range="${r}">${r.replace("d", " days")}</button>`).join("")}</div>${btn("Export CSV", "ghost")}</div>`)}
      ${tabs("analysis", [{ id: "overview", label: "Overview" }, { id: "youtube", label: "YouTube" }, { id: "revenue", label: "Revenue" }])}
      <div class="stack">
        ${t === "overview" ? platformChips : ""}
        ${{ overview, youtube, revenue }[t]}
        ${note("Today this is <b>11 panels on one scroll</b>, labelled with terms like <i>youtube · snowflake</i>. Three tabs split it by question: how is everything doing, how is YouTube doing, and what did we earn.")}
      </div>
    </div>`;
}

const MEDIA = [
  ["Sourdough loaf, overhead on linen", "WordPress", 64, "needs"],
  ["Pantry pasta, cast-iron pan", "Instagram", 97, "done"],
  ["Market stall, pumpkins", "Instagram", 58, "needs"],
  ["Banana bread slices", "Upload", 92, "done"],
  ["Hands kneading dough", "Facebook", 71, "needs"],
  ["Dal in blue bowl", "WordPress", 0, "todo"],
  ["Knife set on board", "Upload", 88, "done"],
  ["Soup pot, steam", "Facebook", 0, "todo"],
];

function mediaPage() {
  const shown = MEDIA.map((m, i) => ({ m, i })).filter(
    ({ m }) => (state.mediaSource === "all" || m[1] === state.mediaSource) && (state.mediaStatus === "all" || m[3] === state.mediaStatus),
  );
  const sel = MEDIA[state.selectedMedia];
  const statusTag = (s, c) => (s === "done" ? tag("Identified", "success") : s === "needs" ? tag(`Check · ${c}%`, "warn") : tag("Not identified"));
  return `
    <div class="page wide">
      ${pageHead("Media Library", "Every image the brand has, from WordPress, connected channels and uploads. Octaneon labels each one; anything it isn't sure about comes to you, and every correction teaches the next batch.", "Create", `<div class="btn-row">${btn("Sync all sources")}${btn("Identify next batch", "primary")}</div>`)}
      <div class="stack">
        ${stats([["Images", "2,418"], ["Waiting for your check", "37", "warn"], ["Identified", "91%", "success"], ["Not identified yet", "182"]])}
        <div class="row-between wrap">
          ${chips("mstat", state.mediaStatus, [["needs", "Needs your check"], ["done", "Identified"], ["todo", "Not identified"], ["all", "All"]])}
          <div class="btn-row">${select("msort", "least", [["least", "Least confident first"], ["most", "Most confident first"], ["new", "Newest first"]])}</div>
        </div>
        ${chips("msrc", state.mediaSource, [["all", "All sources"], ["WordPress", "WordPress"], ["Instagram", "Instagram"], ["Facebook", "Facebook"], ["Upload", "Uploads"]])}
        <div class="split">
          <section class="panel flush">
            <div class="media-grid">${shown
              .map(
                ({ m: [name, src, conf, st], i }) => `
              <button type="button" class="media-tile ${i === state.selectedMedia ? "active" : ""}" data-media="${i}">
                <span class="thumb t${i % 4}"></span>
                <span class="small strong clamp">${name}</span>
                <span class="row-between"><span class="muted small">${src}</span>${statusTag(st, conf)}</span>
              </button>`,
              )
              .join("") || `<div class="muted" style="padding:16px">Nothing matches these filters.</div>`}</div>
            ${pager("media", state.mediaStatus === "needs" ? 37 : 2418, 8)}
          </section>
          <div class="stack">
            ${panel(
              "Selected image",
              `<div class="stack" style="gap:12px">
                <span class="thumb big t${state.selectedMedia % 4}"></span>
                ${field("What's in it", sel[0])}
                <div class="row-between small"><span class="muted">Confidence</span><b>${sel[2] ? sel[2] + "%" : "—"}</b></div>
                ${sel[2] ? meter(sel[2], sel[2] >= 80 ? "success" : "warn") : ""}
                <div class="btn-row">${btn("Approve", "primary")}${btn("Reject", "ghost")}${btn("Group with others", "ghost")}</div>
              </div>`,
              { sub: sel[1] },
            )}
            ${note("Same functions as today: sync, identify, review, group, glossary. The review queue is the default view, because checking the AI's uncertain labels is the job people come here for.")}
          </div>
        </div>
      </div>
    </div>`;
}

const IMAGES = [
  ["Pumpkin stall at the market", "Sep 24", "Drafts ready"],
  ["Sourdough crumb shot", "Sep 22", "Analysed"],
  ["Kitchen at golden hour", "Sep 18", "Uploaded"],
];

function imageFlowPage() {
  const img = IMAGES[state.selectedImage];
  const analysed = img[2] !== "Uploaded";
  return `
    <div class="page wide">
      ${pageHead("Image Flow", "Upload a photo. Octaneon reads what's in it, then writes posts and a blog article about it in your voice.", "Create", btn("Upload images", "primary"))}
      <div class="gen-split">
        <section class="panel flush">
          <div class="list">${IMAGES.map(
            ([name, when, st], i) =>
              `<button type="button" class="run ${i === state.selectedImage ? "active" : ""}" data-img="${i}"><span class="dest"><span class="thumb sm t${i}"></span><span><span class="strong small">${name}</span><br><span class="muted small">${when}</span></span></span>${tag(st, st === "Drafts ready" ? "success" : st === "Analysed" ? "primary" : "")}</button>`,
          ).join("")}</div>
          ${pager("images", 14, 3)}
        </section>
        <div class="stack">
          <div class="steps">
            <div class="step"><span class="num">✓</span><div class="strong">Upload</div></div>
            <div class="step ${analysed ? "" : "current"}"><span class="num">${analysed ? "✓" : "2"}</span><div class="strong">Read the image</div></div>
            <div class="step ${img[2] === "Analysed" ? "current" : ""}"><span class="num">${img[2] === "Drafts ready" ? "✓" : "3"}</span><div class="strong">Write posts</div></div>
          </div>
          ${
            analysed
              ? panel(
                  "What Octaneon sees",
                  `<div class="grid-2">
                    <div><div class="small strong">In the picture</div><div class="tags" style="margin-top:6px">${["pumpkins", "market stall", "chalkboard sign", "autumn"].map((x) => tag(x)).join("")}</div></div>
                    <div><div class="small strong">Mood</div><p class="muted">Warm, seasonal, busy morning</p></div>
                    <div><div class="small strong">Words in the image</div><p class="muted">“Squash £2 each”</p></div>
                    <div><div class="small strong">Story angles</div><p class="muted">What to cook with a market squash · Buying seasonal on a budget</p></div>
                  </div>`,
                  { actions: btn("Read again", "ghost") },
                )
              : panel("Not read yet", `<div class="row-between"><p class="muted">Octaneon hasn't looked at this image yet.</p>${btn("Read this image", "primary")}</div>`)
          }
          ${
            img[2] === "Drafts ready"
              ? ["Instagram", "Facebook", "WordPress"]
                  .map(
                    (c) => `<section class="panel draft"><header class="draft-head">${chan(c)}${btn("Copy", "ghost")}</header><div class="panel-body"><p>${{ WordPress: "<b>Five things to cook with a market squash.</b> The stall had them at two pounds each, so we bought four…", Instagram: "Squash season is here 🎃 £2 at the market this morning. What would you make first?", Facebook: "Found these at the market for £2 each. We're planning soup, a roast and a risotto. What's your favourite way to cook squash?" }[c]}</p></div></section>`,
                  )
                  .join("")
              : analysed
                ? panel("Write posts", `<div class="row-between"><p class="muted">Choose posts, a blog article, or both.</p>${btn("Write posts", "primary")}</div>`)
                : ""
          }
          ${note("A list-and-detail layout with a three-step strip, so it's always clear what happens next for each image.")}
        </div>
      </div>
    </div>`;
}

const RECORDINGS = [
  ["Podcast ep. 12: batch cooking", "42:10", "Recommendation ready"],
  ["Voice note: autumn menu", "6:02", "Transcribed"],
  ["Interview with a baker", "28:45", "Drafts on blog"],
];

function audioFlowPage() {
  const rec = RECORDINGS[state.selectedAudio];
  const opt = state.audioOption;
  const option = (id, title, desc) =>
    `<button type="button" class="option ${opt === id ? "active" : ""}" data-aopt="${id}"><span class="strong">${title}</span><span class="muted small">${desc}</span></button>`;
  return `
    <div class="page wide">
      ${pageHead("Audio Flow", "Upload a recording. Octaneon types it out and suggests whether it should become one blog article or several, then writes them in your voice.", "Create", btn("Upload recording", "primary"))}
      <div class="gen-split">
        <section class="panel flush">
          <div class="list">${RECORDINGS.map(
            ([name, len, st], i) =>
              `<button type="button" class="run ${i === state.selectedAudio ? "active" : ""}" data-audio="${i}"><span><span class="strong small">${name}</span><span class="muted small mono">${len}</span></span>${tag(st, st === "Drafts on blog" ? "success" : st === "Transcribed" ? "" : "primary")}</button>`,
          ).join("")}</div>
          ${pager("audio", 8, 3)}
        </section>
        <div class="stack">
          ${panel("Transcript", `<p class="muted">“…the trick with batch cooking is to cook components, not meals. Grains on Sunday, a big tray of roast veg, two sauces, and then every night is ten minutes…”</p>`, { sub: rec[0], actions: btn("Open full transcript", "ghost") })}
          ${panel(
            "Octaneon recommends",
            `<div class="stack" style="gap:12px">
              <div class="options">
                ${option("one", "One article", "A single long guide to batch cooking.")}
                ${option("several", "Three articles", "Components · Sauces · A week's plan. Recommended: three distinct topics.")}
              </div>
              <div class="btn-row">${btn("Write drafts", "primary")}${btn("Ask again", "ghost")}</div>
            </div>`,
          )}
          ${panel("Send to the blog", `<div class="row-between"><p class="muted">Drafts are saved to WordPress as drafts. Nothing is published automatically.</p>${btn("Send drafts to WordPress")}</div>`)}
          ${note("Same steps as today, one recording at a time: transcript, recommendation, drafts, blog.")}
        </div>
      </div>
    </div>`;
}

const PRIORS = [
  ["Sourdough", "YouTube", 72, 88],
  ["Weeknight dinners", "Instagram", 80, 76],
  ["Batch cooking", "Facebook", 55, 81],
  ["Equipment", "YouTube", 60, 41],
  ["Baking substitutions", "WordPress", 48, 52],
  ["Cast-iron care", "TikTok", 66, 90],
];

function priorsPage() {
  const rows = PRIORS.filter((r) => state.priorsPlatform === "all" || r[1] === state.priorsPlatform);
  const diff = (e, a) => {
    const d = a - e;
    return d >= 10 ? tag(`+${d} better than expected`, "success") : d <= -10 ? tag(`${d} worse than expected`, "danger") : tag("About as expected");
  };
  return `
    <div class="page wide">
      ${pageHead(
        "Priors vs Performance",
        "What Octaneon expected to work for each topic and platform, compared with how the posts actually did. Big surprises are where its predictions are still learning.",
        "Measure",
        `<div class="segmented" role="radiogroup" aria-label="Goal">${[["creator", "Creator earnings"], ["site", "Website earnings"]].map(([id, l]) => `<button type="button" class="${state.objective === id ? "active" : ""}" data-obj="${id}">${l}</button>`).join("")}</div>`,
      )}
      <div class="stack">
        ${stats([["Topic × platform pairs", "42"], ["Predicted well", "71%", "success"], ["Better than expected", "9", "primary"], ["Worse than expected", "5", "warn"]])}
        <div class="row-between wrap">
          ${chips("pplat", state.priorsPlatform, [["all", "All platforms"], ["YouTube", "YouTube"], ["Instagram", "Instagram"], ["Facebook", "Facebook"], ["TikTok", "TikTok"], ["WordPress", "WordPress"]])}
          ${select("page-age", "30", [["7", "Posts older than 7 days"], ["30", "Posts older than 30 days"], ["90", "Posts older than 90 days"]])}
        </div>
        <section class="panel flush">
          <div class="table-wrap"><table>
            <thead><tr><th>Topic</th><th>Platform</th><th>Expected</th><th>Actual</th><th>Result</th></tr></thead>
            <tbody>${rows
              .map(
                ([topic, plat, e, a]) => `<tr>
                <td class="strong">${topic}</td>
                <td>${chan(plat)}</td>
                <td><div class="score"><span class="mono small">${e}</span>${meter(e)}</div></td>
                <td><div class="score"><span class="mono small">${a}</span>${meter(a, a >= e ? "success" : "warn")}</div></td>
                <td>${diff(e, a)}</td>
              </tr>`,
              )
              .join("")}</tbody>
          </table></div>
          ${pager("priors", state.priorsPlatform === "all" ? 42 : rows.length, 6)}
        </section>
        ${note("Scores are 0–100 for the chosen goal. Today the page talks about <i>cohorts</i>, <i>grain</i> and <i>learned priors</i>; here every row is a plain sentence: expected this, got that.")}
      </div>
    </div>`;
}

const RECIPES = [
  ["Brown butter banana bread", "No blog post", "nopost"],
  ["One-pan lemon orzo", "No blog post", "nopost"],
  ["Roast squash & sage risotto", "No blog post", "nopost"],
  ["Weeknight chicken dal", "Draft post", "draft"],
  ["Classic sourdough loaf", "Published", "publish"],
];

function recipeBlogPage() {
  const t = state.tabs.recipeblog;
  const shown = RECIPES.map((r, i) => ({ r, i })).filter(({ r }) => state.recipeFilter === "all" || r[2] === state.recipeFilter);
  const recipe = RECIPES[state.selectedRecipe];
  const write = `
    <div class="gen-split">
      <section class="panel flush">
        <div style="padding:12px 12px 0" class="stack">
          <input class="input" placeholder="Search recipes" aria-label="Search recipes" />
          ${chips("rfilter", state.recipeFilter, [["nopost", "Without a post"], ["draft", "Draft"], ["publish", "Published"], ["all", "All"]])}
        </div>
        <div class="list" style="margin-top:8px">${shown
          .map(
            ({ r: [name, st, key], i }) =>
              `<button type="button" class="run ${i === state.selectedRecipe ? "active" : ""}" data-recipe="${i}"><span><span class="strong small">${name}</span><span class="muted small">${st}</span></span>${key === "nopost" ? tag("Ready", "primary") : key === "draft" ? tag("Draft") : tag("Live", "success")}</button>`,
          )
          .join("") || `<div class="muted small">No recipes here.</div>`}</div>
        ${pager("recipes", state.recipeFilter === "nopost" ? 38 : 214, 5)}
      </section>
      <div class="stack">
        <div class="row-between wrap"><div><h2>${recipe[0]}</h2><p class="muted small">Written in your blog's style, around the existing recipe card.</p></div>${btn("Write again", "ghost")}</div>
        <section class="panel">
          <div class="panel-body stack" style="gap:12px">
            ${field("Title", recipe[0] === "Brown butter banana bread" ? "Brown Butter Banana Bread (The One We Always Make)" : recipe[0])}
            <label class="field"><span>Excerpt</span><textarea class="input" rows="2">Nutty brown butter and very ripe bananas make the loaf we bake most weeks. Here's why it works, and how to get it right first time.</textarea></label>
            <div class="post-preview">
              <p>We make this most Sundays, usually because three bananas have gone past the point of eating…</p>
              <h4>Why this works</h4>
              <p class="muted">Browning the butter first adds a toasty depth that plain melted butter can't…</p>
              <div class="recipe-card">Recipe card: ${recipe[0]}<span class="muted small">Your existing recipe, placed where your posts usually put it</span></div>
              <h4>Can I freeze it?</h4>
              <p class="muted">Yes. Wrap slices individually…</p>
            </div>
          </div>
        </section>
        <div class="grid-2">
          ${panel("Categories", `<div class="tags">${["Baking", "Breakfast", "Weekend"].map((c, i) => `<span class="tag ${i < 2 ? "primary" : ""}">${c}</span>`).join("")}</div>`)}
          ${panel(
            "When saved",
            `<div class="stack" style="gap:12px">
              <div class="segmented" role="radiogroup" aria-label="Publish status">${[["draft", "Save as draft"], ["publish", "Publish now"]].map(([id, l]) => `<button type="button" class="${state.publishMode === id ? "active" : ""}" data-pmode="${id}">${l}</button>`).join("")}</div>
              ${toggle("Use the recipe photo as the featured image", true)}
            </div>`,
          )}
        </div>
        <div class="btn-row">${btn(state.publishMode === "draft" ? "Save draft to WordPress" : "Publish to WordPress", "primary")}${btn("Discard", "ghost")}</div>
      </div>
    </div>`;
  const style = `
    <div class="split">
      <div class="stack">
        ${panel(
          "Your blog's recipe-post style",
          `<div class="stack" style="gap:14px">
            <div><div class="small strong">Usual outline</div><div class="tags" style="margin-top:6px">${["Personal intro", "Why this works", "Ingredient notes", "Step photos", "Recipe card", "FAQ"].map((x) => tag(x)).join("")}</div></div>
            <div class="grid-2">
              <div class="row-between small"><span class="muted">Typical length</span><b>1,450 words</b></div>
              <div class="row-between small"><span class="muted">Recipe card placed</span><b>About 60% down</b></div>
              <div class="row-between small"><span class="muted">Photos per post</span><b>6</b></div>
              <div class="row-between small"><span class="muted">Featured image</span><b>Recipe hero shot</b></div>
            </div>
          </div>`,
          { sub: "Learned from 24 published recipe posts · updated Sep 20", actions: btn("Learn again") },
        )}
        ${panel(
          "Posts to learn from",
          `<div class="tags">${["Baking", "Weeknight", "Soups", "Breakfast"].map((c, i) => `<span class="tag ${i < 3 ? "primary" : ""}">${c}</span>`).join("")}</div><p class="muted small" style="margin-top:10px">Leave all off to use every post that contains a recipe card.</p>`,
        )}
      </div>
      <div class="stack">
        ${panel(
          "Extra instructions",
          `<textarea class="input" rows="6" aria-label="Extra instructions">Open with a short personal story. Use British spellings. Never say "delicious" or "yummy". Include a "Why this works" section. Suggest two drinks to go with it at the end.</textarea><div class="btn-row" style="margin-top:10px">${btn("Save instructions", "primary")}</div>`,
          { sub: "Followed on top of the learned style for every new draft." },
        )}
      </div>
    </div>`;
  return `
    <div class="page wide">
      ${pageHead(
        "Recipe Blog Generator",
        "Writes blog posts for recipes that don't have one yet, in the same style as your existing recipe posts.",
        "Create",
        `<div class="site-pill">${dot("success")}<span><span class="strong small">northwindkitchen.example</span><span class="muted small">Recipe plugin found · 214 recipes</span></span></div>`,
      )}
      <div class="steps" style="margin-bottom:16px">
        <div class="step"><span class="num">✓</span><div><div class="strong">Learn your style</div><div class="muted small">From 24 posts</div></div></div>
        <div class="step current"><span class="num">2</span><div><div class="strong">Pick a recipe</div><div class="muted small">38 without a post</div></div></div>
        <div class="step"><span class="num" style="background:var(--panel-2);color:var(--muted-foreground)">3</span><div><div class="strong">Review &amp; save</div><div class="muted small">Draft by default</div></div></div>
      </div>
      ${tabs("recipeblog", [{ id: "write", label: "Write posts" }, { id: "style", label: "Blog style" }])}
      <div class="stack">
        ${t === "write" ? write : style}
        ${note("Same controls as today, split into two tabs: <b>Write posts</b> for the daily job and <b>Blog style</b> for the one-off setup. Terms like <i>WPRM</i>, <i>shortcode</i> and <i>Divi skeleton</i> become plain words. <b>Save as draft</b> stays the default.")}
      </div>
    </div>`;
}

const THUMBS = [
  ["Five pantry pastas in 20 minutes", 7.4, "Custom cover", "live", false],
  ["Sourdough starter, day one", 2.9, "YouTube frame", "ready", false],
  ["Cast-iron care in 60 seconds", 3.6, "YouTube frame", "short", true],
  ["Brown butter banana bread", 3.1, "Custom cover", "ready", false],
  ["Weeknight dal", 2.4, "YouTube frame", "none", false],
  ["Sheet-pan chicken, three ways", 5.8, "Custom cover", "waiting", false],
  ["Market haul: September", 1.9, "YouTube frame", "failed", false],
  ["Knife skills for beginners", 4.2, "Custom cover", "none", false],
];

const THUMB_STATUS = {
  live: ["New cover live", "success"],
  ready: ["4 options ready", "primary"],
  short: ["Short: set in YouTube Studio", "warn"],
  waiting: ["Waiting for YouTube to confirm", ""],
  failed: ["Upload failed", "danger"],
  none: ["", ""],
};

function thumbsPage() {
  const t = state.tabs.thumbs;
  const f = state.thumbFilter;
  const shown = THUMBS.map((v, i) => ({ v, i }))
    .filter(({ v }) => f === "all" || (f === "low" && v[1] < 3.5) || (f === "custom" && v[2] === "Custom cover") || (f === "frame" && v[2] === "YouTube frame") || (f === "shorts" && v[4]))
    .sort((a, b) => (state.thumbSort === "low" ? a.v[1] - b.v[1] : 0));
  const selected = Object.keys(state.thumbSel).filter((k) => state.thumbSel[k]);
  const review = THUMBS[state.reviewThumb];
  const card = ({ v: [title, ctr, src, st, short], i }) => {
    const [label, tone] = THUMB_STATUS[st];
    const action =
      st === "ready"
        ? `<button class="btn primary" type="button" data-review="${i}">Compare covers</button>`
        : st === "failed"
          ? btn("Try again")
          : st === "short"
            ? btn("Download cover")
            : "";
    return `
      <div class="thumb-card ${state.reviewThumb === i && st === "ready" ? "active" : ""}">
        <label class="thumb-check"><input type="checkbox" data-tsel="${i}" ${state.thumbSel[i] ? "checked" : ""} ${short ? "disabled" : ""} aria-label="Select ${title}" /></label>
        <span class="thumb t${i % 4} ${short ? "tall" : ""}"><span class="thumb-ctr ${ctr < 3.5 ? "low" : ""}">${ctr.toFixed(1)}% clicks</span></span>
        <div class="stack" style="gap:6px">
          <span class="small strong clamp">${title}</span>
          <div class="tags">${tag(short ? "Short" : src)}${label ? tag(label, tone) : ""}</div>
          ${action ? `<div class="btn-row">${action}</div>` : ""}
        </div>
      </div>`;
  };
  const covers = `
    ${stats([["Videos", "311"], ["Low click rate (under 3.5%)", "42", "warn"], ["Options waiting for you", "6", "primary"], ["New covers live", "18", "success"]])}
    <section class="panel filters">
      <input class="input search" placeholder="Search title or video link" aria-label="Search videos" />
      ${select("tsort", state.thumbSort, [["low", "Lowest click rate first"], ["high", "Highest click rate first"], ["new", "Newest first"], ["az", "Title A–Z"]])}
    </section>
    ${chips("tfilter", f, [["all", "All videos"], ["low", "Low click rate"], ["custom", "Custom cover"], ["frame", "YouTube frame"], ["shorts", "Shorts"]])}
    ${
      selected.length
        ? `<div class="select-bar"><span><b>${selected.length}</b> selected</span><div class="btn-row">${btn(`Make 4 covers for each`, "primary")}<button class="btn ghost" type="button" data-action="clear-thumbs">Clear</button></div></div>`
        : `<p class="muted small">Tick videos to make new cover options for them. Shorts can't be changed from here.</p>`
    }
    <section class="panel flush">
      <div class="thumb-grid">${shown.map(card).join("") || `<div class="muted" style="padding:16px">No videos match.</div>`}</div>
      ${pager("thumbs", f === "all" ? 311 : shown.length, 8)}
    </section>
    ${
      review && review[3] === "ready"
        ? panel(
            `Compare covers · ${review[0]}`,
            `<div class="compare">
              <div class="cover-opt current"><span class="thumb t${state.reviewThumb % 4}"></span><span class="small"><b>Current</b> · ${review[1].toFixed(1)}% clicks</span></div>
              ${[0, 1, 2, 3]
                .map(
                  (o) =>
                    `<button type="button" class="cover-opt ${state.pickedCover === o ? "picked" : ""}" data-pick="${o}"><span class="thumb t${(o + 1) % 4}"><span class="cover-words">${["STARTER NOT RISING?", "DAY ONE", "FIX YOUR STARTER", "7 DAYS TO BREAD"][o]}</span></span><span class="small"><b>Option ${o + 1}</b> · ${["Headline readable", "Headline readable", "Headline readable", "Text too small on phones"][o]}</span></button>`,
                )
                .join("")}
            </div>
            <div class="row-between wrap" style="margin-top:14px"><p class="muted small">The chosen cover replaces the current one on YouTube. Octaneon checks it went live.</p><div class="btn-row">${btn("Make 4 more", "ghost")}${btn(`Use option ${state.pickedCover + 1} on YouTube`, "primary")}</div></div>`,
            { sub: "Pick the strongest option. Covers follow your brand's visual identity." },
          )
        : ""
    }`;
  const runs = [
    ["Sep 24, 09:10", "12", "48", "9", tag("Finished", "success")],
    ["Sep 17, 14:02", "8", "32", "6", tag("Finished", "success")],
    ["Sep 10, 11:45", "20", "76", "0", tag("2 need a retry", "warn")],
  ];
  const history = `
    ${flushPanel(
      "Past runs",
      table(["Started", "Videos", "Covers made", "Put live", "Result", ""], runs.map((r) => [...r, `<button class="btn" type="button" data-tab="thumbs:covers">Reopen</button>`]), [1, 2, 3]) + pager("thumb-runs", 14, 3),
      { sub: "A summary email goes to whoever started each run." },
    )}`;
  return `
    <div class="page wide">
      ${pageHead("Thumbnail Audit", "Every YouTube video with the cover it uses now. Make stronger options, compare them side by side, and put the best one live.", "Create")}
      ${tabs("thumbs", [{ id: "covers", label: "Covers", count: 6 }, { id: "history", label: "Past runs" }])}
      <div class="stack">
        ${t === "covers" ? covers : history}
        ${note("Batch history moves from its own page into the <b>Past runs</b> tab. Each card says what to do next. Low click rates come first, and Shorts are clearly marked because YouTube only lets you change their cover in YouTube Studio.")}
      </div>
    </div>`;
}

const YB_VIDEOS = [
  ["Five pantry pastas in 20 minutes", "8:42", "Outline ready", "primary"],
  ["Sourdough starter, day one", "12:05", "No article yet", ""],
  ["Cast-iron care in 60 seconds", "1:02", "Draft saved", "warn"],
  ["Sheet-pan chicken, three ways", "6:18", "On WordPress as draft", "success"],
  ["Brown butter banana bread", "4:51", "No article yet", ""],
];

function youtubeBlogPage() {
  const t = state.tabs.ytblog;
  const v = YB_VIDEOS[state.selectedYb];
  const stage = state.ybStage;
  const embedBlock = `<div class="recipe-card">▶ ${v[0]}<span class="muted small">YouTube video embedded here</span></div>`;
  const outline = `
    ${panel(
      "Outline",
      `<div class="stack" style="gap:12px">
        ${field("Working title", "Five Pantry Pastas You Can Make in 20 Minutes")}
        <ol class="outline">
          <li><b>Why pantry pasta works</b><span class="muted small">Tins, jars and dried pasta as a weeknight system</span></li>
          <li><b>The five pastas</b><span class="muted small">Puttanesca · Anchovy & breadcrumb · Chickpea · Tuna & lemon · Cacio e pepe</span></li>
          <li><b>What to keep in the cupboard</b><span class="muted small">A short shopping list</span></li>
          <li><b>FAQ</b><span class="muted small">Gluten-free swaps, making it ahead</span></li>
        </ol>
        <div><div class="small strong">Key takeaways</div><div class="tags" style="margin-top:6px">${["Under 20 minutes", "No fresh shopping", "Five variations"].map((x) => tag(x)).join("")}</div></div>
      </div>`,
      { sub: "Built from the video's transcript and your brand knowledge. Change it before the article is written.", actions: btn("Make a new outline", "ghost") },
    )}
    <div class="btn-row"><button class="btn primary" type="button" data-ybstage="article">Write the article →</button></div>`;
  const article = `
    <section class="panel">
      <div class="panel-body stack" style="gap:12px">
        ${field("Article title", "Five Pantry Pastas You Can Make in 20 Minutes")}
        ${field("Search description", "Five quick pastas from tins, jars and dried pasta. No shopping, all under 20 minutes.", "Shown under the title in Google results.")}
        <div class="post-preview">
          ${state.ybEmbed === "top" ? embedBlock : ""}
          <p>Some nights the fridge is empty and the shops are shut. That's when the cupboard earns its keep…</p>
          ${state.ybEmbed === "after_intro" ? embedBlock : ""}
          <h4>Why pantry pasta works</h4>
          <p class="muted">A tin of tomatoes, a jar of anchovies and a bag of spaghetti are a whole dinner…</p>
          <h4>The five pastas</h4>
          <p class="muted">1. Puttanesca in the time it takes to boil the water…</p>
          ${state.ybEmbed === "bottom" ? embedBlock : ""}
        </div>
      </div>
    </section>
    <div class="grid-2">
      ${panel(
        "Where the video goes",
        `<div class="segmented" role="radiogroup" aria-label="Video position">${[["top", "Top"], ["after_intro", "After the intro"], ["bottom", "Bottom"]].map(([id, l]) => `<button type="button" class="${state.ybEmbed === id ? "active" : ""}" data-ybembed="${id}">${l}</button>`).join("")}</div>`,
      )}
      ${panel("Categories", `<div class="tags">${["Weeknight", "Pasta", "Pantry"].map((c, i) => `<span class="tag ${i < 2 ? "primary" : ""}">${c}</span>`).join("")}</div>`)}
    </div>
    <div class="row-between wrap">
      <button class="btn ghost" type="button" data-ybstage="outline">← Back to outline</button>
      <div class="btn-row">${btn("Save")}${btn("Send to WordPress as draft", "primary")}</div>
    </div>`;
  const write = `
    <div class="gen-split">
      <section class="panel flush">
        <div style="padding:12px 12px 0" class="stack">
          <input class="input" placeholder="Search video titles" aria-label="Search videos" />
          <p class="muted small">Only videos with a transcript are listed.</p>
        </div>
        <div class="list" style="margin-top:4px">${YB_VIDEOS.map(
          ([name, len, st, tone], i) =>
            `<button type="button" class="run ${i === state.selectedYb ? "active" : ""}" data-yb="${i}"><span class="dest" style="flex-wrap:nowrap"><span class="thumb sm t${i % 4}"></span><span class="yb-meta"><span class="strong small">${name}</span><span class="dest"><span class="muted small mono">${len}</span>${tag(st, tone)}</span></span></span></button>`,
        ).join("")}</div>
        ${pager("ybvideos", 186, 5)}
      </section>
      <div class="stack">
        <div class="row-between wrap">
          <div><h2>${v[0]}</h2><p class="muted small">Outline first, then the full article.</p></div>
          <div class="segmented" role="tablist" aria-label="Stage">${[["outline", "1 · Outline"], ["article", "2 · Article"]].map(([id, l]) => `<button type="button" class="${stage === id ? "active" : ""}" data-ybstage="${id}">${l}</button>`).join("")}</div>
        </div>
        ${stage === "outline" ? outline : article}
      </div>
    </div>`;
  const style = `
    <div class="split">
      <div class="stack">
        ${panel(
          "Your blog's formatting",
          `<div class="stack" style="gap:14px">
            <div class="grid-2">
              <div class="row-between small"><span class="muted">Typical length</span><b>1,200 words</b></div>
              <div class="row-between small"><span class="muted">Headings</span><b>4–6 sections</b></div>
              <div class="row-between small"><span class="muted">Lists</span><b>Often</b></div>
              <div class="row-between small"><span class="muted">Ends with</span><b>FAQ</b></div>
            </div>
          </div>`,
          { sub: "Learned from posts in the categories below · updated Sep 18", actions: btn("Learn again") },
        )}
        ${panel(
          "Learn from these categories",
          `<div class="tags">${["Weeknight", "Guides", "Pasta", "Baking"].map((c, i) => `<span class="tag ${i < 2 ? "primary" : ""}">${c}</span>`).join("")}</div>`,
        )}
      </div>
      <div class="stack">
        ${panel(
          "Writing instructions",
          `<textarea class="input" rows="7" aria-label="Writing instructions">Write for home cooks, not chefs. Keep paragraphs short. Link to related recipes where it helps. Always end with a short FAQ.</textarea><div class="btn-row" style="margin-top:10px">${btn("Save", "primary")}${btn("Reset to default", "ghost")}</div>`,
          { sub: "Used for both the outline and the article." },
        )}
      </div>
    </div>`;
  return `
    <div class="page wide">
      ${pageHead(
        "YouTube Blog Generator",
        "Turns your YouTube videos into blog articles with the video embedded, written from the transcript in your blog's format. Always saved to WordPress as a draft.",
        "Create",
        `<div class="site-pill">${dot("success")}<span><span class="strong small">northwindkitchen.example</span><span class="muted small">Drafts only, never published automatically</span></span></div>`,
      )}
      ${tabs("ytblog", [{ id: "write", label: "Write articles" }, { id: "style", label: "Blog style" }])}
      <div class="stack">
        ${t === "write" ? write : style}
        ${note("Same flow as today, laid out like the Recipe Blog Generator so the two feel like one family. The <b>Outline → Article</b> switch shows where you are, and the preview moves the video as you change its position.")}
      </div>
    </div>`;
}

const KNOWLEDGE = [
  ["YouTube", "Transcript", "Five pantry pastas in 20 minutes", "A tin of tomatoes, a jar of anchovies and whatever pasta is in the cupboard…", "pending"],
  ["Instagram", "Caption", "Reel: 3-ingredient dressing", "Three ingredients, one jar, shake. That's the whole recipe…", "pending"],
  ["WordPress", "Article", "The only cast-iron guide you need", "Cast iron isn't fussy. It just wants to be used…", "approved"],
  ["Facebook", "Your comment", "Reply on “Sunday roast Q&A”", "Yes! Rest it for at least 20 minutes before carving…", "pending"],
  ["Document", "Brand guide", "Northwind brand guide 2026.pdf", "We write like a friend who cooks well and explains why…", "approved"],
  ["YouTube", "Transcript", "Market haul: September", "[music] okay so we're at the market this morning…", "rejected"],
];

function knowledgePage() {
  const t = state.tabs.knowledge;
  const f = state.kStatus;
  const rows = KNOWLEDGE.map((k, i) => ({ k, i })).filter(({ k }) => f === "all" || k[4] === f);
  const sel = Object.keys(state.kSel).filter((x) => state.kSel[x]).length;
  const review = `
    ${stats([["Items in knowledge", "68,838"], ["Waiting for review", "214", "warn"], ["Approved", "61,902", "success"], ["Rejected", "6,722"]])}
    <div class="row-between wrap">
      ${chips("kstatus", f, [["pending", "Waiting for review"], ["approved", "Approved"], ["rejected", "Rejected"], ["all", "All"]])}
      <div class="btn-row"><input class="input search" placeholder="Search knowledge" aria-label="Search knowledge" />${select("ksource", "all", [["all", "All sources"], ["YouTube", "YouTube"], ["Instagram", "Instagram"], ["Facebook", "Facebook"], ["WordPress", "WordPress"], ["Document", "Documents"]])}</div>
    </div>
    ${sel ? `<div class="select-bar"><span><b>${sel}</b> selected</span><div class="btn-row">${btn("Approve", "primary")}${btn("Reject")}<button class="btn ghost" type="button" data-action="clear-k">Clear</button></div></div>` : ""}
    <section class="panel flush">
      <div class="list">${rows
        .map(
          ({ k: [src, kind, title, text, st], i }) => `
        <div class="k-row">
          <input type="checkbox" data-ksel="${i}" ${state.kSel[i] ? "checked" : ""} aria-label="Select ${title}" />
          <div class="k-main">
            <div class="dest"><span class="strong">${title}</span>${tag(kind)}<span class="muted small">${src}</span></div>
            <p class="muted small clamp">${text}</p>
          </div>
          <div class="btn-row">${
            st === "pending"
              ? btn("Approve", "primary") + btn("Reject", "ghost")
              : st === "approved"
                ? tag("Approved", "success") + btn("Undo", "ghost")
                : tag("Rejected", "danger") + btn("Undo", "ghost")
          }</div>
        </div>`,
        )
        .join("") || `<div class="muted">Nothing here.</div>`}</div>
      ${pager("knowledge", f === "pending" ? 214 : 68838, 6)}
    </section>`;
  const sources = [
    ["YouTube", "48,210 comments · 1,284 transcripts", "success", "Live"],
    ["Instagram", "9,870 comments · 1,318 posts", "warn", "Reconnect"],
    ["Facebook", "6,044 comments · 912 posts", "success", "Live"],
    ["WordPress", "412 articles", "primary", "Importing"],
    ["LinkedIn", "188 posts", "success", "Live"],
    ["Documents", "3 files", "success", "Added by hand"],
  ];
  const sourcesTab = `
    <div class="grid-3">${sources
      .map(
        ([name, what, tone, st]) => `
      <section class="panel source-card" style="padding:16px">
        <div class="platform"><span class="platform-icon">${name === "Documents" ? "DOC" : CHANNEL_MARK[name]}</span><div><div class="strong">${name}</div><div class="muted small">${what}</div></div></div>
        <div class="row-between small"><span class="dest">${dot(tone)} ${st}</span></div>
      </section>`,
      )
      .join("")}</div>
    <div class="grid-2">
      ${panel("Add a document", `<div class="dropzone"><span class="strong">Drop a PDF, Word file or text</span><span class="muted small">Policies, product facts, menus: anything the channels don't cover.</span></div>`)}
      ${panel("Add a fact by hand", `<div class="stack" style="gap:10px">${field("Title", "", "")}<textarea class="input" rows="3" placeholder="e.g. All our recipes are tested in a standard home oven." aria-label="Fact"></textarea><div class="btn-row">${btn("Add to knowledge", "primary")}</div></div>`)}
    </div>
    <div class="row-between wrap"><p class="muted small">Import progress for each channel is on Activity &amp; Logs.</p><button class="btn" type="button" data-logs="ingestion:all">See import progress →</button></div>`;
  const rules = `
    <div class="split">
      <div class="stack">
        ${flushPanel(
          "Never learn from",
          `<div class="list">${[
            ["Posts written by Octaneon's AI", "Always excluded. Can't be changed."],
            ["Comments by other people", "Only the brand's own words shape the voice."],
            ["Giveaway and competition posts", "Added by Alex Kim"],
            ["Anything containing “sponsored”", "Added by Alex Kim"],
          ]
            .map(([r, why], i) => `<div class="row-between"><div><div class="strong small">${r}</div><div class="muted small">${why}</div></div>${i === 0 ? tag("Locked") : btn("Remove", "ghost")}</div>`)
            .join("")}<div class="stack" style="gap:8px"><input class="input" placeholder="Add a rule, e.g. posts tagged #ad" aria-label="New rule" /></div></div>`,
          { sub: "Material matching these rules stays out of the brand voice." },
        )}
      </div>
      <div class="stack">
        ${panel(
          "Review settings",
          `<div class="stack" style="gap:14px">
            ${toggle("Approve new transcripts automatically", false, "Off: every new transcript waits for review.")}
            ${toggle("Tell me when an import finishes", true)}
          </div>`,
        )}
      </div>
    </div>`;
  return `
    <div class="page wide">
      ${pageHead("Brand Voice & Knowledge", "Everything Octaneon has learned about your brand. Only approved items shape drafts and replies, so reviewing here is the biggest lever on quality.", "Plan", btn("Add knowledge", "primary"))}
      ${tabs("knowledge", [{ id: "review", label: "Review", count: 214 }, { id: "sources", label: "Sources" }, { id: "rules", label: "Rules" }])}
      <div class="stack">
        ${{ review, sources: sourcesTab, rules }[t]}
        ${note("Today this page stacks <b>12 panels</b>. The customer's job, reviewing what Octaneon learned, becomes the first tab. <b>Ingestion Progress</b>, job alerts and the raw archive move to <b>Activity &amp; Logs</b>; transcript backlog and the YouTube allowance live on <b>Captions &amp; Transcripts</b>.")}
      </div>
    </div>`;
}

const COMMENTS = [
  ["Instagram", "@maria.bakes", "Reel: 3-ingredient dressing", "Could I use lime instead of lemon?", "Absolutely. Lime gives it a sharper, fresher edge. Start with a little less and taste as you go 🍋", "draft"],
  ["YouTube", "Tom H.", "Sourdough starter, day one", "Mine smells like nail polish on day 4, is that normal??", "Totally normal! That's a hungry starter. Feed it twice a day for a few days and the smell will mellow.", "draft"],
  ["Facebook", "Priya S.", "Sunday roast Q&A", "What temperature for the potatoes?", "We roast them at 200°C (180°C fan) for about 45 minutes. Full method is on the blog, just search “roast potatoes”.", "scheduled"],
  ["TikTok", "@kitchenkid", "Market haul: September", "where is this market", "", "new"],
];

function repliesPage() {
  const f = state.replyStatus;
  const rows = COMMENTS.map((c, i) => ({ c, i })).filter(({ c }) => f === "all" || c[5] === f);
  return `
    <div class="page wide">
      ${pageHead("Reply Generation", "Comments from every channel, each with a reply drafted in your brand voice. Edit, approve, and Octaneon sends them at a natural pace.", "Create", btn("Draft replies for new comments", "primary"))}
      <div class="stack">
        ${stats([["New comments", "128", "warn"], ["Drafts ready", "42", "primary"], ["Scheduled to send", "17"], ["Sent today", "36", "success"]])}
        <div class="split">
          <div class="stack">
            <section class="panel filters">
              <input class="input search" placeholder="Search comments" aria-label="Search comments" />
              ${select("rplatform", "all", [["all", "All channels"], ["YouTube", "YouTube"], ["Instagram", "Instagram"], ["Facebook", "Facebook"], ["TikTok", "TikTok"], ["LinkedIn", "LinkedIn"]])}
              ${select("rsort", "new", [["new", "Newest first"], ["old", "Oldest first"]])}
            </section>
            ${chips("rstatus", f, [["draft", "Draft ready"], ["new", "No draft yet"], ["scheduled", "Scheduled"], ["all", "All"]])}
            <div class="stack" style="gap:10px">${rows
              .map(
                ({ c: [ch, who, post, comment, reply, st] }) => `
              <section class="panel reply-card">
                <header class="reply-head"><span class="dest">${chan(ch)}<span class="muted small">${who} · on “${post}”</span></span>${st === "scheduled" ? tag("Sends 14:20", "primary") : st === "new" ? tag("No draft yet") : tag("Draft ready", "warn")}</header>
                <div class="panel-body stack" style="gap:10px">
                  <blockquote class="comment">${comment}</blockquote>
                  ${
                    reply
                      ? `<textarea class="input" rows="2" aria-label="Reply">${reply}</textarea>
                  <div class="row-between wrap">
                    <div class="segmented" role="radiogroup" aria-label="Where to reply"><button type="button" class="active">Reply in thread</button><button type="button">New comment</button></div>
                    <div class="btn-row">${btn("Don't reply", "ghost")}${st === "scheduled" ? btn("Cancel schedule") : btn("Schedule")}${btn("Send now", "primary")}</div>
                  </div>`
                      : `<div class="row-between"><span class="muted small">No reply drafted yet.</span>${btn("Draft a reply", "primary")}</div>`
                  }
                </div>
              </section>`,
              )
              .join("") || `<div class="muted">Nothing here.</div>`}</div>
            <section class="panel">${pager("replies", f === "draft" ? 42 : 128, 4)}</section>
          </div>
          <div class="stack">
            ${panel(
              "Pacing",
              `<div class="stack" style="gap:12px">
                <div class="fields two">${field("Min gap", "4 min")}${field("Max gap", "12 min")}</div>
                <div class="fields two">${field("From", "08:00")}${field("Until", "21:00")}</div>
                <div class="row-between small"><span class="muted">About</span><b>95 replies a day</b></div>
                ${btn("Save")}
              </div>`,
              { sub: "Replies go out spaced apart, inside these hours, so they read like a person wrote them." },
            )}
            ${flushPanel(
              "Links replies can use",
              `<div class="list">${[["Roast potato method", "Blog"], ["Sourdough starter guide", "Blog"], ["Weeknight meal plan", "Free download"]]
                .map(([n, k]) => `<div class="row-between"><div><div class="strong small">${n}</div><div class="muted small">${k}</div></div>${btn("Remove", "ghost")}</div>`)
                .join("")}<div>${btn("Pin a link")}</div></div>`,
              { sub: "Octaneon suggests these when a comment asks for them." },
            )}
            ${note("A comment already answered is never offered again. If Octaneon can't confirm whether you replied, it waits instead of risking a double reply.")}
          </div>
        </div>
      </div>
    </div>`;
}

const TT_VIDEOS = [
  ["Market haul: September", "7384…201", 22380, 1490, 2140, 88, 61],
  ["Cast-iron care in 60 seconds", "7381…998", 18040, 820, 1720, 64, 140],
  ["3-ingredient dressing", "7379…450", 12900, 510, 990, 41, 77],
  ["Knife skills: dicing an onion", "7377…118", 9870, 280, 610, 22, 35],
];

function tiktokPage() {
  const t = state.tabs.tiktok;
  const videos = `
    ${stats([["Views", "63.2k", "primary"], ["Likes", "5.5k"], ["Comments", "215"], ["Shares", "313", "success"]])}
    ${flushPanel(
      "Videos",
      table(
        ["Video", "Views", "Views / day", "Likes", "Comments", "Shares"],
        TT_VIDEOS.map(([title, id, views, vpd, likes, comments, shares]) => [
          `<div><div class="strong">${title}</div><div class="muted small mono">${id}</div></div>`,
          views.toLocaleString(),
          vpd.toLocaleString(),
          likes.toLocaleString(),
          comments,
          shares,
        ]),
        [1, 2, 3, 4, 5],
      ) + pager("tiktok", 46, 4),
      { sub: "Totals since each video was posted. Click a column name to sort." },
    )}`;
  const publishing = `
    ${stats([["Scheduled", "3", "primary"], ["Published this month", "11", "success"], ["Failed", "0"], ["Avg. time to live", "2 min"]])}
    ${flushPanel(
      "Scheduled and published",
      table(
        ["When", "Video", "Status"],
        [
          ["Sat 26, 17:00", "Banana bread in 45 seconds", tag("Scheduled", "primary")],
          ["Wed 23, 17:00", "Market haul: September", tag("Published", "success")],
          ["Mon 21, 17:00", "Cast-iron care in 60 seconds", tag("Published", "success")],
        ],
      ) + pager("tiktok-pub", 14, 3),
    )}`;
  return `
    <div class="page wide">
      ${pageHead("TikTok Analytics", "How each TikTok video is doing, and what is scheduled to go out.", "Measure", `<div class="segmented" role="radiogroup" aria-label="Date range">${["7d", "30d", "90d"].map((r) => `<button type="button" class="${state.range === r ? "active" : ""}" data-range="${r}">${r.replace("d", " days")}</button>`).join("")}</div>`)}
      ${tabs("tiktok", [{ id: "videos", label: "Videos" }, { id: "publishing", label: "Publishing" }])}
      <div class="stack">
        ${t === "videos" ? videos : publishing}
        ${note("Same numbers as today. The summary strip answers “how are we doing?” first, and the publishing queue gets its own tab instead of sharing the scroll.")}
      </div>
    </div>`;
}

const HELP = {
  dashboard: {
    label: "Dashboard",
    blurb: "Your daily starting point and switching between brands.",
    articles: [
      ["The daily overview", "The dashboard summarises your brand across every connected channel so you can decide where to spend the next hour.", ["Check the counters at the top: content waiting for you, comments awaiting a reply, and anything that failed to publish.", "Click any counter to jump straight to the screen that clears it.", "Scan the recent activity list to confirm the posts and replies that went out since you last looked."]],
      ["Setup progress bar", "While your brand is still being set up, a strip above the page shows which steps remain.", ["Click a remaining step to open the screen that completes it.", "The strip disappears once every required step is done."]],
      ["Switching brands", "If you belong to more than one brand, the switcher decides which brand every screen shows.", ["Open the switcher and choose a brand.", "Every page, counter and queue reloads for that brand."]],
      ["Notification bell", "The bell lights up when something new is worth reading.", ["Open the bell to see the unread items.", "Pick an item to open the page it refers to."]],
    ],
  },
  whatsnew: {
    label: "What's New",
    blurb: "Release notes and choosing what you're told about.",
    articles: [
      ["Reading release notes", "Every Octaneon build publishes a plain-English note describing what changed.", ["Open What's New to read the latest note.", "Features roll out gradually. You only see notes for features your brand has been given."]],
      ["Choosing what you're told about", "The preferences panel decides which announcements light up your bell.", ["Turn a category on to be notified about it, off to keep it out of the bell.", "Changes save as you make them."]],
    ],
  },
  settings: {
    label: "Settings",
    blurb: "Brand identity, channels, imports, your team and your account.",
    articles: [
      ["Brand Settings", "The brand's identity: name, time zone, voice guidance, and the preferences that shape every draft and reply.", ["Set the time zone first. Schedules, send windows and calendars all follow it.", "Fill in the voice guidance so drafts sound like your brand.", "Save. New drafts pick the settings up immediately."]],
      ["Integrations", "Connect the channels Octaneon reads from and posts to.", ["Choose a channel and click connect.", "Once connected, Octaneon starts pulling in your existing posts and comments.", "Only brand admins can connect, reconnect or disconnect a channel."]],
      ["Members & Invites", "Who can see and operate this brand, and at what level.", ["Invite a teammate by email and choose their role: admin or member.", "Admins can change settings, connections and membership. Members work the day-to-day queues."]],
      ["Agent Access", "Connect an AI agent to this brand so it can read your knowledge and help you create work.", ["Copy the connection address.", "Sign in with your own account and approve the connection.", "Publishing through an agent posts straight away. Comment replies always wait for your approval."]],
    ],
  },
  functions: {
    label: "Functions",
    blurb: "Teaching your voice, making content, publishing and replying.",
    articles: [
      ["Brand Voice & Knowledge", "Everything the platform has learned about your brand.", ["Review what has been collected from your connected channels.", "Add a knowledge item by hand for anything the channels don't cover.", "Better knowledge is the single biggest lever on draft quality."]],
      ["Content Generation", "Turns one video or idea into a set of platform-ready posts.", ["Generate from an asset, an idea or a topic.", "Edit the text, hashtags and first comment on a card.", "Schedule, or use Post Now to send it immediately."]],
      ["Reply Generation", "Your comments from every channel, each with a suggested reply.", ["Edit or rewrite a reply, then approve it to send, or skip the comment.", "Approved replies are sent inside your send window rather than all at once."]],
      ["Topics", "The subjects your brand covers, and where the gaps are.", ["Review the topic list to see coverage and gaps.", "Start a draft directly from a topic that needs attention."]],
    ],
  },
  support: {
    label: "Support",
    blurb: "Reporting bugs, asking for features and fixing agent connections.",
    articles: [
      ["Feedback & Bugs", "Report anything that looks wrong, and request features you need.", ["Choose whether you're reporting a bug or requesting a feature.", "Describe what you expected and what happened instead, and attach a screenshot.", "Follow the conversation in the comments on your submission."]],
      ["Agent connection troubleshooting", "What to try when an AI agent won't connect, or can't see your work.", ["Sign in to Octaneon in the same browser first, then start the connection again.", "The address must be exactly https://octaneon.ai/mcp.", "A revoked connection has to be approved again from the agent side."]],
      ["The quick feedback button", "Every screen has a feedback button so you can report a problem without losing your place.", ["Click it, describe the issue, and submit.", "The screen you were on is recorded with the report."]],
    ],
  },
};

function helpPage() {
  const sec = state.helpSection;
  if (!sec) {
    return `
      <div class="page wide">
        <section class="help-hero">
          <div class="eyebrow">Help Center</div>
          <h1>How can we help?</h1>
          <label class="help-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.3-4.3"/></svg>
            <input placeholder="Search the guides, e.g. “reconnect Instagram”" aria-label="Search help" />
          </label>
        </section>
        <div class="stack">
          <div class="grid-3">${Object.entries(HELP)
            .map(
              ([id, s]) => `
            <button type="button" class="panel help-card" data-help="${id}">
              <span class="strong">${s.label}</span>
              <span class="muted small">${s.blurb}</span>
              <span class="small link-like">${s.articles.length} guides →</span>
            </button>`,
            )
            .join("")}
            <button type="button" class="panel help-card accent" data-go="proposed:logs"><span class="strong">Something not working?</span><span class="muted small">Check Activity &amp; Logs for errors, or tell us through Feedback &amp; Bugs.</span><span class="small link-like">Report a problem →</span></button>
          </div>
          ${flushPanel(
            "Popular guides",
            `<div class="list">${[["functions", 1], ["settings", 1], ["support", 1], ["dashboard", 0]]
              .map(([s, a]) => `<button type="button" class="help-link" data-help="${s}:${a}"><span>${HELP[s].articles[a][0]}</span><span class="muted small">${HELP[s].label}</span></button>`)
              .join("")}</div>`,
          )}
          ${note("Today the Help Center is five separate pages in the menu (Dashboard Guide, What's New Guide, Settings Guide, Functions Guide, Support Guide). It becomes <b>one page</b> with search. The guides only show features your brand actually has, just like today.")}
        </div>
      </div>`;
  }
  const s = HELP[sec];
  const art = s.articles[state.helpArticle] || s.articles[0];
  return `
    <div class="page wide">
      <div class="crumbs"><button class="link" type="button" data-help="">Help Center</button><span class="muted">/</span><span>${s.label}</span></div>
      <div class="gen-split">
        <section class="panel flush">
          <div class="list">${s.articles
            .map(([title], i) => `<button type="button" class="run ${i === state.helpArticle ? "active" : ""}" data-help="${sec}:${i}"><span class="strong small">${title}</span></button>`)
            .join("")}</div>
        </section>
        <article class="panel help-article">
          <div class="panel-body stack" style="gap:14px">
            <div class="eyebrow">${s.label}</div>
            <h1>${art[0]}</h1>
            <p class="muted">${art[1]}</p>
            <ol class="help-steps">${art[2].map((x) => `<li>${x}</li>`).join("")}</ol>
            <div class="row-between wrap help-foot"><span class="muted small">Was this helpful?</span><div class="btn-row">${btn("Yes", "ghost")}${btn("No", "ghost")}</div></div>
          </div>
        </article>
      </div>
    </div>`;
}

const PROPOSED_RENDER = {
  knowledge: knowledgePage,
  replies: repliesPage,
  tiktok: tiktokPage,
  help: helpPage,
  ytblog: youtubeBlogPage,
  thumbs: thumbsPage,
  recipeblog: recipeBlogPage,
  media: mediaPage,
  imageflow: imageFlowPage,
  audioflow: audioFlowPage,
  priors: priorsPage,
  ideas: ideasPage,
  demand: demandPage,
  benchmark: benchmarkPage,
  videos: videosPage,
  analysis: analysisPage,
  content: contentPage,
  topics: topicsPage,
  logs: logsPage,
  brand: brandPage,
  integrations: integrationsPage,
  imports: importsPage,
  captions: captionsPage,
  team: teamPage,
  agents: agentsPage,
};

function overviewPage() {
  const mapping = CURRENT.map((c) => {
    const dest = proposedFor(c.id);
    if (!dest)
      return `<tr class="map-row"><td><button class="link" data-go="current:${c.id}" style="color:inherit">${c.label}</button></td><td class="arrow">→</td><td>${tag("removed", "danger")} <span class="muted small">covered by Content</span></td></tr>`;
    const tabName =
      dest.id === "brand"
        ? { "brand-settings": "Profile · Voice · Publishing", "visual-identity": "Look", "look-analytics": "Look", account: "My account" }[c.id]
        : dest.id === "captions"
          ? c.label.split(" ")[0] + " tab"
          : dest.id === "content"
            ? { "content-upload": "Upload", "content-generation": "Generate", "content-calendar": "Calendar" }[c.id]
            : "";
    const changed = dest.from.length > 1 || dest.label !== c.label;
    const status = dest.restyled ? tag("cleaner layout", "primary") : changed ? "" : tag("unchanged");
    return `<tr class="map-row">
      <td><button class="link" data-go="current:${c.id}" style="color:inherit">${c.label}</button></td>
      <td class="arrow">→</td>
      <td><span class="dest"><button class="link" data-go="proposed:${dest.id}">${dest.label}</button>${tabName ? `<span class="muted small">${tabName}</span>` : ""}${status}</span></td>
    </tr>`;
  }).join("") + `<tr class="map-row">
      <td class="muted">Pipeline logs, agent audit log, Ingestion Progress</td>
      <td class="arrow">→</td>
      <td><span class="dest"><button class="link" data-go="proposed:logs">Activity &amp; Logs</button>${tag("new page", "success")}</span></td>
    </tr>`;

  return `
    <div class="page">
      <section class="hero">
        <div class="eyebrow">Proposal · Content &amp; Settings</div>
        <h1>A simpler console</h1>
        <p class="muted">Today, making content takes three menu items, Settings has 13 pages, and logs are spread across five of them. The proposal groups pages by what the customer is trying to do, puts every log in one place, and removes nothing anyone relies on.</p>
      </section>
      <div class="stack" style="margin-top:20px">
        <div class="grid-3">
          <section class="panel" style="padding:18px"><div class="muted small">Pages in Settings</div><div class="big-number"><span class="from">13</span><span class="to">7</span></div></section>
          <section class="panel" style="padding:18px"><div class="muted small">Upload, generate and calendar pages</div><div class="big-number"><span class="from">3</span><span class="to">1</span></div></section>
          <section class="panel" style="padding:18px"><div class="muted small">Import and audit pages</div><div class="big-number"><span class="from">6</span><span class="to">2</span></div></section>
        </div>
        <div class="split">
          ${flushPanel(
            "Where every page goes",
            `<div class="table-wrap"><table><thead><tr><th>Today</th><th></th><th>Proposed</th></tr></thead><tbody>${mapping}</tbody></table></div>`,
            { sub: "Click any name to open it." },
          )}
          <div class="stack">
            ${panel(
              "Principles",
              `<ol class="principles">
                <li><span>One place per job. Upload, generation and calendar become one page; three imports become one; three audits become one.</span></li>
                <li><span>Customer work first. Logs, backfills and diagnostics are tucked away, not deleted.</span></li>
                <li><span>Personal and brand settings are clearly separate. <b>My account</b> is the only tab every member sees.</span></li>
                <li><span>Every log in one place, with search, filters and pages, linked from wherever it came from.</span></li>
                <li><span>Functions follow the work: <b>Plan</b> what to make, <b>Create</b> it, <b>Measure</b> how it did.</span></li>
                <li><span>Plain names. “Agent Access (MCP)” becomes “AI Agents”.</span></li>
              </ol>`,
            )}
            ${panel(
              "Open questions",
              `<div class="stack" style="gap:12px">
                <div class="question"><span class="q">1</span><span>Should regular members see Brand &amp; Account at all, or only their own <b>My account</b> tab?</span></div>
                <div class="question"><span class="q">2</span><span>Should brand admins see every entry in <b>Activity &amp; Logs</b>, or only customer-facing events, with technical ones for Octaneon staff?</span></div>
                <div class="question"><span class="q">3</span><span>One “drop any export” box for imports, or keep a separate button per source as well?</span></div>
              </div>`,
            )}
          </div>
        </div>
        ${flushPanel(
          "Platform console (Octaneon staff)",
          `<div class="table-wrap"><table><thead><tr><th>Today</th><th></th><th>Proposed</th></tr></thead><tbody>${[
            ["Platform Dashboard + All Brands", "p-dashboard", "Dashboard"],
            ["Agencies + Agency Tiers", "p-agencies", "Agencies"],
            ["Account Approvals + Deletion Requests", "p-requests", "Access &amp; Deletions"],
            ["Integrations + Integration Health", "p-integrations", "Integrations"],
          ]
            .map(([from, id, to]) => `<tr class="map-row"><td>${from}</td><td class="arrow">→</td><td><span class="dest"><button class="link" data-go="platform:${id}">${to}</button>${tag("merged", "success")}</span></td></tr>`)
            .join("")}</tbody></table></div>`,
          { sub: "Reached with the Brand / Platform switch in the top bar. 8 pages become 4; the rest stay as today for now." },
        )}
        <div class="btn-row">
          <button class="btn primary" data-go="proposed:content" type="button">Walk through the proposal →</button>
          <button class="btn" data-go="platform:p-dashboard" type="button">Open the Platform console</button>
          <button class="btn" data-go="current:brand-settings" type="button">See today's menu</button>
        </div>
      </div>
    </div>`;
}

const NAV_ICONS = {
  topics: "M4 9h16M4 15h16M10 3 8 21M16 3l-2 18",
  ideas: "M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V16h8v-1.3A7 7 0 0 0 12 2z",
  demand: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.3-4.3",
  benchmark: "M18 20V10M12 20V4M6 20v-6",
  content: "M3 8h18v12H3zM3 8l4-4h14l-4 4M10 4 7 8M16 4l-3 4",
  media: "M3 5h18v14H3zM3 16l5-5 5 5M14 14l2-2 5 5M15.5 8.5h.01",
  imageflow: "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 16v5M16.5 18.5h5",
  audioflow: "M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM19 11a7 7 0 0 1-14 0M12 18v3",
  videos: "M3 5h18v14H3zM10 9l5 3-5 3z",
  analysis: "M3 3v18h18M7 14l4-4 3 3 5-6",
  priors: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM12 11.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1z",
  brand: "M4 21V5l8-3 8 3v16M9 21v-5h6v5M8 9h.01M12 9h.01M16 9h.01M8 13h.01M16 13h.01",
  integrations: "M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0zM12 18v4",
  imports: "M12 3v12M7 10l5 5 5-5M4 21h16",
  captions: "M3 5h18v14H3zM7 12h3M14 12h3M7 15h10",
  team: "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21a7 7 0 0 1 14 0M16 3.1a4 4 0 0 1 0 7.8M22 21a7 7 0 0 0-4-6.3",
  agents: "M5 8h14v11H5zM12 4v4M9 13h.01M15 13h.01M2 13h3M19 13h3",
  thumbs: "M3 5h18v14H3zM7 15l3-3 2 2 3-3 2 2M8 9h.01",
  ytblog: "M4 4h11l5 5v11H4zM14 4v6h6M9 12l4 2.5L9 17z",
  knowledge: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5",
  replies: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2zM8 9h8M8 13h5",
  tiktok: "M9 12a4 4 0 1 0 4 4V3c.5 2.5 2.5 4.5 5 5",
  help: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01",
  recipeblog: "M4 3v7a3 3 0 0 0 6 0V3M7 3v18M17 3c-2 2-3 4.5-3 8h3v10",
  logs: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
};

const navIcon = (id) =>
  `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${NAV_ICONS[id] || "M12 12h.01"}"/></svg>`;

function sidebar() {
  if (state.view === "overview") return "";
  if (state.view === "proposed" && state.console === "platform") return platformSidebar();
  const isCurrent = state.view === "current";
  const source = isCurrent ? CURRENT : PROPOSED;
  const active = isCurrent ? state.current : state.proposed;
  const item = (p) =>
    `<button class="nav-item ${active === p.id ? "active" : ""}" data-go="${state.view}:${p.id}" data-label="${p.label.toLowerCase()}" ${active === p.id ? 'aria-current="page"' : ""}>${isCurrent ? '<span class="dot"></span>' : navIcon(p.id)}<span class="nav-text">${p.label}</span>${p.badge ? `<span class="nav-badge">${p.badge}</span>` : ""}</button>`;
  const groups = (isCurrent ? ["Functions", "Settings", "Help"] : ["Plan", "Create", "Measure", "Settings", "Help"]).map((g) => {
    const items = source.filter((p) => (p.group || "Settings") === g);
    const folded = !!state.folded[g] && !items.some((p) => p.id === active);
    return `<div class="nav-group ${folded ? "folded" : ""}" data-group="${g}">
      <button type="button" class="nav-label" data-fold="${g}" aria-expanded="${!folded}"><span>${g}</span>${ICONS.chev}</button>
      <div class="nav-items">${items.map(item).join("")}</div>
    </div>`;
  });
  return `
    ${state.navOpen ? '<div class="scrim" data-action="close-nav"></div>' : ""}
    <aside class="sidebar ${state.navOpen ? "open" : ""}" aria-label="Navigation">
      <button type="button" class="brand-switch" aria-label="Switch brand">
        <span class="brand-avatar">NK</span>
        <span class="brand-meta"><span class="strong">${BRAND}</span><span class="muted small">Food &amp; recipes</span></span>
        <svg class="updown" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>
      </button>
      <label class="jump">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.3-4.3"/></svg>
        <input type="search" data-nav-search placeholder="Jump to…" aria-label="Jump to a page" />
        <kbd>/</kbd>
      </label>
      <nav class="nav-scroll">
        ${groups.join("")}
        <p class="muted small nav-empty" hidden>No page matches.</p>
      </nav>
      <div class="nav-user">
        <span class="avatar">AK</span>
        <span class="brand-meta"><span class="strong small">Alex Kim</span><span class="muted small">Brand admin</span></span>
        <button type="button" class="icon-btn ghost" data-go="proposed:brand" aria-label="My account">${ICONS.gear}</button>
      </div>
    </aside>`;
}

function filterNav(query) {
  const q = query.trim().toLowerCase();
  let any = false;
  document.querySelectorAll(".sidebar .nav-group").forEach((group) => {
    let visible = 0;
    group.querySelectorAll(".nav-item").forEach((el) => {
      const match = !q || el.dataset.label.includes(q);
      el.hidden = !match;
      if (match) visible++;
    });
    group.hidden = visible === 0;
    group.classList.toggle("searching", !!q);
    if (visible) any = true;
  });
  const empty = document.querySelector(".sidebar .nav-empty");
  if (empty) empty.hidden = any;
}

const PLATFORM = [
  { id: "p-dashboard", group: "Overview", label: "Dashboard", icon: "M3 3h8v8H3zM13 3h8v5h-8zM13 10h8v11h-8zM3 13h8v8H3z", merged: ["Platform Dashboard", "All Brands"] },
  { id: "p-agencies", group: "Customers", label: "Agencies", icon: "M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6", merged: ["Agencies", "Agency Tiers"] },
  { id: "p-requests", group: "Customers", label: "Access & Deletions", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4", merged: ["Account Approvals", "Deletion Requests"], badge: "4" },
  { id: "p-onboarding", group: "Customers", label: "Onboarding Overview", desc: "Setup progress for every brand." },
  { id: "p-impersonate", group: "Customers", label: "Impersonate Operator", desc: "See the console exactly as a given user sees it." },
  { id: "p-integrations", group: "Connections", label: "Integrations", icon: "M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0zM12 18v4", merged: ["Integrations", "Integration Health"], badge: "1" },
  { id: "p-oauth", group: "Connections", label: "OAuth Setup Guide", desc: "How each provider's sign-in app is configured." },
  { id: "p-domain", group: "Connections", label: "Domain Status", desc: "DNS, certificates and email domain checks." },
  { id: "p-linkedin", group: "Connections", label: "LinkedIn Debug", desc: "LinkedIn API troubleshooting." },
  { id: "p-modules", group: "Product", label: "Custom Modules", desc: "Switch add-ons on for individual brands." },
  { id: "p-releases", group: "Product", label: "Releases", desc: "Release notes and feature roll-out." },
  { id: "p-visibility", group: "Product", label: "Section Visibility", desc: "Which roles see which panels." },
  { id: "p-notifications", group: "Product", label: "Notifications", desc: "Which emails go to whom." },
  { id: "p-mcp", group: "Product", label: "MCP Server", desc: "Every connected AI agent across all users." },
  { id: "p-costing", group: "Quality & cost", label: "Costing", desc: "AI and running costs per brand." },
  { id: "p-accuracy", group: "Quality & cost", label: "Generation Accuracy", desc: "How good the AI's drafts are." },
  { id: "p-thumbs", group: "Quality & cost", label: "Thumbnail Performance", desc: "How generated covers perform." },
  { id: "p-look", group: "Quality & cost", label: "Look Training", desc: "Look training across every brand." },
  { id: "p-time", group: "Quality & cost", label: "Time on Platform", desc: "Hands-on time per brand and function." },
  { id: "p-diagnostics", group: "Operations", label: "Diagnostics", desc: "System checks." },
  { id: "p-logs", group: "Operations", label: "Logs", desc: "Platform-wide logs." },
  { id: "p-feedback", group: "Operations", label: "Feedback & Bugs", desc: "Every report from every brand." },
  { id: "p-support", group: "Operations", label: "Support Inbox", desc: "Customer support conversations." },
  { id: "p-devproject", group: "Internal", label: "Development Project", desc: "The platform's build log." },
  { id: "p-board", group: "Internal", label: "Project Board", desc: "Internal task board." },
  { id: "p-business", group: "Internal", label: "Octaneon Business", desc: "Sales and pricing research." },
];

const P_BRANDS = [
  ["Northwind Kitchen", "Direct", 6, 2, 5, "Mar 2026"],
  ["Holloway Garden Co.", "Greenleaf Agency", 4, 1, 3, "Apr 2026"],
  ["Pharmabuilt", "Direct", 9, 3, 7, "Jan 2026"],
  ["Local Proof Digital", "Greenleaf Agency", 3, 1, 2, "Jun 2026"],
  ["Title Case Studio", "Brightside Media", 5, 2, 4, "Jul 2026"],
];

function platformDashboard() {
  return `
    <div class="page wide">
      ${pageHead("Platform dashboard", "Every brand on Octaneon in one place. Jump into any brand, or create, rename and remove brands.", "Platform", `<button class="btn primary" type="button" data-action="toggle-create-brand">${state.createBrand ? "Close" : "Create brand"}</button>`)}
      <div class="stack">
        ${stats([["Brands", "48"], ["Members", "212"], ["Brand admins", "61"], ["Pending invites", "7", "warn"]])}
        <div class="grid-3">
          <button type="button" class="panel attention" data-go="platform:p-requests"><span class="muted small">Waiting for approval</span><span class="flow-value warn">3 new accounts</span></button>
          <button type="button" class="panel attention" data-go="platform:p-requests"><span class="muted small">Data deletion requests</span><span class="flow-value warn">1 pending</span></button>
          <button type="button" class="panel attention" data-go="platform:p-integrations"><span class="muted small">Services with problems</span><span class="flow-value text-danger">1 down</span></button>
        </div>
        ${
          state.createBrand
            ? panel("Create a brand", `<div class="fields two">${field("Brand name", "")}${field("Agency", "Direct (no agency)")}</div><div class="btn-row" style="margin-top:12px">${btn("Create", "primary")}</div>`)
            : ""
        }
        <section class="panel filters">
          <input class="input search" placeholder="Search brands" aria-label="Search brands" />
          ${select("pagency", "all", [["all", "All agencies"], ["direct", "Direct"], ["greenleaf", "Greenleaf Agency"], ["brightside", "Brightside Media"]])}
        </section>
        ${flushPanel(
          "All brands",
          table(
            ["Brand", "Agency", "Members", "Admins", "Add-ons", "Since", ""],
            P_BRANDS.map(([name, agency, m, a, mods, since]) => [
              `<div class="person"><span class="brand-avatar sm">${name.split(" ").map((w) => w[0]).join("").slice(0, 2)}</span><span class="strong">${name}</span></div>`,
              agency === "Direct" ? `<span class="muted">Direct</span>` : agency,
              m,
              a,
              mods,
              `<span class="muted small">${since}</span>`,
              `<div class="btn-row nowrap">${btn("Enter")}${btn("Rename", "ghost")}${btn("Delete", "ghost danger-text")}</div>`,
            ]),
            [2, 3, 4],
          ) + pager("p-brands", 48, 5),
        )}
        ${note("Merges <b>Platform Dashboard</b> and <b>All Brands</b>. The dashboard only had totals and a “jump into a brand” picker; the full brand list with create, rename and delete now lives here. Items needing action link straight to their page.")}
      </div>
    </div>`;
}

const P_AGENCIES = [
  ["Greenleaf Agency", "Growth", 7, 10, 3, true],
  ["Brightside Media", "Starter", 2, 3, 2, true],
  ["Northstar Collective", "Scale", 0, 25, 1, false],
];
const P_TIERS = [
  ["Starter", 3, "$900", "12 months", "$25", true],
  ["Growth", 10, "$2,400", "12 months", "$20", true],
  ["Scale", 25, "$4,500", "12 months", "$15", true],
  ["Pilot", 2, "$0", "3 months", "$0", false],
];

function platformAgencies() {
  const t = state.tabs["p-agencies"];
  const agencies = `
    <div class="row-between wrap"><input class="input search" placeholder="Search agencies" aria-label="Search agencies" />${btn("New agency", "primary")}</div>
    <div class="stack" style="gap:10px">${P_AGENCIES.map(
      ([name, tier, used, cap, members, active], i) => `
      <details class="panel topic" ${i === 0 ? "open" : ""}>
        <summary>
          <div class="topic-name"><span class="strong">${name}</span>${tag(tier, "primary")}${active ? tag("Active", "success") : tag("Inactive")}<span class="muted small">${members} ${members === 1 ? "member" : "members"}</span></div>
          <div class="topic-bars"><div class="mini wide"><span class="muted small">Brands used</span>${meter(Math.round((used / cap) * 100), used / cap > 0.8 ? "warn" : "")}<span class="mono small">${used}/${cap}</span></div></div>
          ${ICONS.chev}
        </summary>
        <div class="topic-body">
          <div>
            <div class="eyebrow">Members</div>
            <div class="stack" style="gap:6px">${["Dana Lee · Admin", "Sam Ortiz · Member", "Kai Brooks · Member"].slice(0, members).map((m) => `<div class="ask">${m}<button class="btn ghost" type="button">Remove</button></div>`).join("")}
              <div class="btn-row"><input class="input" placeholder="Add by account email" aria-label="Member email" style="flex:1" />${btn("Add")}</div></div>
          </div>
          <div>
            <div class="eyebrow">Brands</div>
            <div class="stack" style="gap:6px">${(i === 0 ? ["Holloway Garden Co.", "Local Proof Digital"] : i === 1 ? ["Title Case Studio"] : []).map((b) => `<div class="ask">${b}<button class="btn ghost" type="button">Unassign</button></div>`).join("") || `<div class="muted small">No brands yet.</div>`}</div>
          </div>
          <div class="btn-row topic-actions">${btn("Change tier")}${btn("Delete agency", "ghost danger-text")}</div>
        </div>
      </details>`,
    ).join("")}</div>
    <section class="panel">${pager("p-agencies", 3, 10)}</section>`;
  const tiers = `
    ${flushPanel(
      "Tiers",
      table(
        ["Tier", "Brands included", "Price", "Term", "Octaneon cost / brand / month", "Status", ""],
        P_TIERS.map(([n, b, p, term, cost, on]) => [`<span class="strong">${n}</span>`, b, p, term, cost, on ? tag("Offered", "success") : tag("Retired"), btn("Edit", "ghost")]),
        [1, 2, 4],
      ) + pager("p-tiers", 4, 10),
      { sub: "Cost per brand = price ÷ months in the term ÷ brands included. Agencies see this on their billing page.", actions: btn("New tier", "primary") },
    )}`;
  return `
    <div class="page wide">
      ${pageHead("Agencies", "Agencies sit between Octaneon and brands. Their tier sets how many brands they can run and what they pay.", "Platform")}
      ${tabs("p-agencies", [{ id: "list", label: "Agencies" }, { id: "tiers", label: "Tiers" }])}
      <div class="stack">
        ${t === "list" ? agencies : tiers}
        ${note("Merges <b>Agencies</b> and <b>Agency Tiers</b>. Each agency shows how much of its tier's brand allowance it has used, so the two pages no longer need to be read side by side.")}
      </div>
    </div>`;
}

function platformRequests() {
  const t = state.tabs["p-requests"];
  const signups = [
    ["Jordan Mills", "jordan@hollowaygarden.example", "Google", "Today, 08:41"],
    ["Ana Ruiz", "ana@brightside.example", "Email", "Yesterday"],
    ["Chris Park", "chris.park@example.com", "Google", "Sep 23"],
  ];
  const accounts = `
    ${chips("areq", state.accessFilter, [["pending", "Waiting", 3], ["approved", "Approved"], ["declined", "Declined"]])}
    ${flushPanel(
      "New accounts",
      `<div class="list">${signups
        .map(
          ([n, e, how, when]) => `<div class="row-between wrap"><div class="person"><span class="avatar">${n.split(" ").map((w) => w[0]).join("")}</span><div><div class="strong">${n}</div><div class="muted small">${e} · signed up with ${how} · ${when}</div></div></div><div class="btn-row">${btn("Decline", "ghost")}${btn("Approve", "primary")}</div></div>`,
        )
        .join("")}</div>${pager("p-signups", 3, 10)}`,
      { sub: "Nobody reaches the console until they're approved. They get an email when you do." },
    )}`;
  const deletions = `
    <div class="legacy-banner">${dot("warn")}<span>Access is revoked before a request reaches this page. Approving removes the brand's copy of that person's content: it is de-identified and never shown again.</span></div>
    ${flushPanel(
      "Data deletion requests",
      table(
        ["Received", "From", "Brand", "Status", ""],
        [
          ["Today, 07:12", "Meta (Facebook user)", "Holloway Garden Co.", tag("Waiting", "warn"), `<div class="btn-row nowrap">${btn("Decline", "ghost")}${btn("Approve removal", "primary")}</div>`],
          ["Sep 19", "Meta (Instagram user)", "Northwind Kitchen", tag("Done", "success"), `<span class="muted small">Removed Sep 19</span>`],
          ["Sep 12", "Meta (Facebook user)", "Pharmabuilt", tag("Partly done", "warn"), btn("Close by hand", "ghost")],
        ],
      ) + pager("p-deletions", 9, 3),
      { sub: "Declining needs a written reason." },
    )}
    <details class="panel">
      <summary><span><span class="strong">Tools</span> <span class="muted small">· fix Meta user IDs so requests can be matched</span></span>${ICONS.chev}</summary>
      <div class="panel-body row-between wrap"><p class="muted small">Some older connections are missing the Meta user ID, so a deletion request can't find them. This fills them in.</p>${btn("Fill in missing IDs")}</div>
    </details>`;
  return `
    <div class="page wide">
      ${pageHead("Access & Deletions", "Who gets into Octaneon, and requests to remove someone's data.", "Platform")}
      ${tabs("p-requests", [{ id: "accounts", label: "New accounts", count: 3 }, { id: "deletions", label: "Data deletions", count: 1 }])}
      <div class="stack">
        ${t === "accounts" ? accounts : deletions}
        ${note("Merges <b>Account Approvals</b> and <b>Deletion Requests</b>: both are queues of people waiting on an Octaneon decision. The counts on each tab show what's waiting.")}
      </div>
    </div>`;
}

const SERVICES = [
  ["YouTube Data API", "Publishing, comments, captions", "success", "182 ms", "Up"],
  ["Meta Graph (Facebook)", "Pages, comments, webhooks", "success", "240 ms", "Up"],
  ["Instagram", "Posts, comments", "warn", "1.9 s", "Slow"],
  ["TikTok", "Publishing, analytics", "success", "310 ms", "Up"],
  ["LinkedIn", "Company pages", "danger", "—", "Down"],
  ["WordPress sites", "Drafts, media", "success", "420 ms", "Up"],
  ["Google Analytics", "Website traffic", "success", "205 ms", "Up"],
  ["AI models", "Drafts, transcripts, images", "success", "1.1 s", "Up"],
  ["Data warehouse", "Metrics, knowledge", "success", "96 ms", "Up"],
  ["Email", "Notifications, sign-in", "success", "88 ms", "Up"],
];

function platformIntegrations() {
  const t = state.tabs["p-integrations"];
  const health = `
    ${stats([["Services", "10"], ["Up", "8", "success"], ["Slow", "1", "warn"], ["Down", "1", "danger"]])}
    <div class="grid-3">${SERVICES.map(
      ([name, use, tone, lat, st]) => `
      <section class="panel source-card" style="padding:16px">
        <div class="row-between"><span class="strong">${name}</span>${tag(st, tone)}</div>
        <div class="muted small">${use}</div>
        <div class="row-between small"><span class="muted">Response time</span><span class="mono">${lat}</span></div>
        <div class="row-between small"><span class="muted">Checked</span><span>1 min ago</span></div>
      </section>`,
    ).join("")}</div>
    <section class="panel">${pager("p-services", 10, 12)}</section>`;
  const map = flushPanel(
    "How the systems connect",
    table(
      ["From", "To", "How", "Why"],
      [
        ["Octaneon", "YouTube", "Sign-in token", "Publish videos, read comments, add captions"],
        ["Octaneon", "Meta", "Sign-in token + webhooks", "Facebook and Instagram posts and comments"],
        ["Octaneon", "WordPress", "Application password", "Save drafts, read recipes and media"],
        ["Octaneon", "AI models", "API key", "Drafts, transcripts, image reading"],
        ["Octaneon", "Data warehouse", "Scheduled load", "Metrics and brand knowledge"],
        ["AI agents", "Octaneon", "Agent connection (MCP)", "Let customers' assistants work on their brand"],
      ],
    ) + pager("p-map", 22, 6),
    { sub: "Every outside system Octaneon talks to, and what for." },
  );
  const shared = `
    ${panel(
      "Connected to more than one brand",
      `<div class="stack" style="gap:8px"><div class="ask"><span><b>Holloway Garden</b> Facebook Page</span><span class="muted small">Holloway Garden Co. · Local Proof Digital</span></div><p class="muted small">A Page or Instagram account should belong to exactly one brand. Disconnect it on the brand that shouldn't own it.</p></div>`,
    )}
    <details class="panel">
      <summary><span><span class="strong">Tools</span> <span class="muted small">· re-run an Instagram comment import</span></span>${ICONS.chev}</summary>
      <div class="panel-body row-between wrap"><p class="muted small">Re-reads comments for one connection, including replies that were skipped. Optional date range.</p>${btn("Choose connection")}</div>
    </details>`;
  return `
    <div class="page wide">
      ${pageHead("Integrations", "Every outside service Octaneon depends on: whether it's working right now, and what it's used for.", "Platform", btn("Check all now"))}
      ${tabs("p-integrations", [{ id: "health", label: "Health", count: 2 }, { id: "map", label: "Connection map" }, { id: "shared", label: "Shared accounts", count: 1 }])}
      <div class="stack">
        ${{ health, map, shared }[t]}
        ${note("Merges <b>Integrations</b> (the connection map) and <b>Integration Health</b> (live status). Health comes first because it's what you open this page for. Repair tools sit behind <b>Tools</b>.")}
      </div>
    </div>`;
}

function platformPlaceholder(p) {
  return `
    <div class="page">
      ${pageHead(p.label, p.desc, "Platform")}
      <section class="panel" style="padding:28px;text-align:center">
        <div class="stack" style="gap:8px;justify-items:center">
          ${tag("As today", "")}
          <p class="muted">This page isn't part of the redesign yet. It stays as it is in the current console.</p>
        </div>
      </section>
    </div>`;
}

const PLATFORM_RENDER = {
  "p-dashboard": platformDashboard,
  "p-agencies": platformAgencies,
  "p-requests": platformRequests,
  "p-integrations": platformIntegrations,
};

function platformSidebar() {
  const groups = [...new Set(PLATFORM.map((p) => p.group))];
  const item = (p) =>
    `<button class="nav-item ${state.platformPage === p.id ? "active" : ""}" data-go="platform:${p.id}" data-label="${p.label.toLowerCase()}" ${state.platformPage === p.id ? 'aria-current="page"' : ""}><svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${p.icon || "M12 12h.01"}"/></svg><span class="nav-text">${p.label}</span>${p.badge ? `<span class="nav-badge">${p.badge}</span>` : p.merged ? "" : `<span class="nav-dim">as today</span>`}</button>`;
  return `
    ${state.navOpen ? '<div class="scrim" data-action="close-nav"></div>' : ""}
    <aside class="sidebar ${state.navOpen ? "open" : ""}" aria-label="Platform navigation">
      <div class="brand-switch platform-badge">
        <span class="brand-avatar platform">O</span>
        <span class="brand-meta"><span class="strong">Octaneon Platform</span><span class="muted small">Platform owner</span></span>
      </div>
      <label class="jump">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.3-4.3"/></svg>
        <input type="search" data-nav-search placeholder="Jump to…" aria-label="Jump to a page" />
        <kbd>/</kbd>
      </label>
      <nav class="nav-scroll">
        ${groups
          .map((g) => {
            const items = PLATFORM.filter((p) => p.group === g);
            const folded = !!state.folded["p:" + g] && !items.some((p) => p.id === state.platformPage);
            return `<div class="nav-group ${folded ? "folded" : ""}"><button type="button" class="nav-label" data-fold="p:${g}" aria-expanded="${!folded}"><span>${g}</span>${ICONS.chev}</button><div class="nav-items">${items.map(item).join("")}</div></div>`;
          })
          .join("")}
        <p class="muted small nav-empty" hidden>No page matches.</p>
      </nav>
      <div class="nav-user">
        <span class="avatar">AN</span>
        <span class="brand-meta"><span class="strong small">Arslan N.</span><span class="muted small">Platform owner</span></span>
      </div>
    </aside>`;
}

function mainContent() {
  if (state.view === "overview") return overviewPage();
  if (state.view === "current") return legacyPage(CURRENT.find((c) => c.id === state.current));
  if (state.console === "platform") {
    const p = PLATFORM.find((x) => x.id === state.platformPage);
    return (PLATFORM_RENDER[p.id] || (() => platformPlaceholder(p)))();
  }
  return PROPOSED_RENDER[state.proposed]();
}

function isDark() {
  const forced = document.documentElement.dataset.theme;
  if (forced) return forced === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function render() {
  document.body.classList.toggle("show-notes", state.notes);
  document.getElementById("app").innerHTML = `
    <header class="topbar">
      ${state.view !== "overview" ? `<button class="icon-btn menu-btn" data-action="toggle-nav" aria-label="Open menu">${ICONS.menu}</button>` : ""}
      <div class="logo"><span class="logo-mark">O</span><span>Octaneon</span></div>
      ${
        state.view === "proposed"
          ? `<div class="segmented console-switch" role="tablist" aria-label="Console">${[["brand", "Brand"], ["platform", "Platform"]].map(([id, l]) => `<button type="button" role="tab" aria-selected="${state.console === id}" class="${state.console === id ? "active" : ""}" data-console="${id}">${l}</button>`).join("")}</div>`
          : ""
      }
      ${state.view === "overview" ? `<span class="brand-chip">${dot("success")} ${BRAND}</span>` : ""}
      <div class="spacer"></div>
      <select class="input view-select" data-view aria-label="View">${[["overview", "Overview"], ["current", "Today"], ["proposed", "Proposed"]].map(([v, l]) => `<option value="${v}" ${state.view === v ? "selected" : ""}>${l}</option>`).join("")}</select>
      <div class="segmented view-seg" role="tablist" aria-label="View">
        ${[
          ["overview", "Overview"],
          ["current", "Today"],
          ["proposed", "Proposed"],
        ]
          .map(([v, l]) => `<button class="${state.view === v ? "active" : ""}" data-go="${v}">${l}</button>`)
          .join("")}
      </div>
      <button class="icon-btn" data-action="notes" aria-pressed="${state.notes}" aria-label="Show presenter notes" title="Presenter notes">${ICONS.note}</button>
      <button class="icon-btn" data-action="theme" aria-label="Toggle dark mode" title="Light / dark">${isDark() ? ICONS.sun : ICONS.moon}</button>
    </header>
    ${
      state.view === "current"
        ? `<iframe class="legacy-frame" title="Current Octaneon console" src="legacy/index.html?theme=${isDark() ? "dark" : "light"}#${state.current}"></iframe>`
        : `<div class="layout">
      ${sidebar()}
      <main class="main">${mainContent()}</main>
    </div>`
    }`;
}

window.addEventListener("message", (e) => {
  if (!e.data || e.data.type !== "legacy-nav" || state.view !== "current") return;
  state.current = e.data.id;
  writeHash();
});

function readHash() {
  const [view, page, tab] = location.hash.replace(/^#\/?/, "").split("/");
  if (view === "platform") {
    state.view = "proposed";
    state.console = "platform";
    if (PLATFORM.some((p) => p.id === page)) state.platformPage = page;
    if (tab && state.tabs[state.platformPage] !== undefined) state.tabs[state.platformPage] = tab;
  } else if (view === "current" && page) {
    state.view = "current";
    state.current = page;
  } else if (view === "proposed") {
    state.view = "proposed";
    state.console = "brand";
    if (PROPOSED_RENDER[page]) state.proposed = page;
    if (tab && state.tabs[state.proposed] !== undefined) state.tabs[state.proposed] = tab;
  } else {
    state.view = "overview";
  }
}

function writeHash() {
  let hash = "#/overview";
  if (state.view === "current") hash = `#/current/${state.current}`;
  if (state.view === "proposed" && state.console === "platform") {
    const tab = state.tabs[state.platformPage];
    hash = `#/platform/${state.platformPage}${tab ? `/${tab}` : ""}`;
  } else if (state.view === "proposed") {
    const tab = state.tabs[state.proposed];
    hash = `#/proposed/${state.proposed}${tab ? `/${tab}` : ""}`;
  }
  if (location.hash !== hash) history.replaceState(null, "", hash);
}

function go(target) {
  let [view, page] = target.split(":");
  if (view === "platform") {
    view = "proposed";
    state.console = "platform";
    if (page) state.platformPage = page;
  } else if (view === "proposed") {
    state.console = "brand";
  }
  state.view = view;
  if (view === "current" && page) state.current = page;
  if (view === "proposed" && page) state.proposed = page;
  if (page === "help") state.helpSection = "";
  state.navOpen = false;
  writeHash();
  render();
  window.scrollTo({ top: 0 });
}

document.addEventListener("click", (e) => {
  const goEl = e.target.closest("[data-go]");
  if (goEl) return go(goEl.dataset.go);

  const tabEl = e.target.closest("[data-tab]");
  if (tabEl) {
    const [key, id] = tabEl.dataset.tab.split(":");
    state.tabs[key] = id;
    writeHash();
    return render();
  }

  const foldEl = e.target.closest("[data-fold]");
  if (foldEl) {
    const g = foldEl.dataset.fold;
    state.folded[g] = !state.folded[g];
    return render();
  }

  const pageEl = e.target.closest("[data-page]");
  if (pageEl) {
    if (pageEl.disabled) return;
    const [key, n] = pageEl.dataset.page.split(":");
    state.pages[key] = Number(n);
    return render();
  }

  const logsEl = e.target.closest("[data-logs]");
  if (logsEl) {
    const [source, channel] = logsEl.dataset.logs.split(":");
    resetLogFilters();
    if (source === "ingestion") state.tabs.logs = "ingestion";
    else {
      state.tabs.logs = "activity";
      state.logFilters.source = source;
      if (channel !== "all") state.logFilters.channel = channel[0].toUpperCase() + channel.slice(1);
    }
    return go("proposed:logs");
  }

  const pick = (attr, apply) => {
    const el = e.target.closest(`[data-${attr}]`);
    if (!el) return false;
    apply(el.dataset[attr]);
    render();
    return true;
  };
  if (pick("gen", (v) => { state.genFilter = v; state.pages.runs = 1; })) return;
  if (pick("run", (v) => (state.selectedRun = Number(v)))) return;
  if (pick("topic", (v) => { state.topicFilter = v; state.pages.topics = 1; })) return;
  if (pick("gran", (v) => (state.gran = v))) return;
  if (pick("cat", (v) => { state.ideaCat = v; state.pages.ideas = 1; })) return;
  if (pick("platform", (v) => (state.platform = v))) return;
  if (pick("range", (v) => (state.range = v))) return;
  if (pick("video", (v) => (state.openVideo = state.openVideo === Number(v) ? -1 : Number(v)))) return;
  if (pick("mstat", (v) => { state.mediaStatus = v; state.pages.media = 1; })) return;
  if (pick("msrc", (v) => { state.mediaSource = v; state.pages.media = 1; })) return;
  if (pick("media", (v) => (state.selectedMedia = Number(v)))) return;
  if (pick("img", (v) => (state.selectedImage = Number(v)))) return;
  if (pick("audio", (v) => (state.selectedAudio = Number(v)))) return;
  if (pick("aopt", (v) => (state.audioOption = v))) return;
  if (pick("rfilter", (v) => { state.recipeFilter = v; state.pages.recipes = 1; })) return;
  if (pick("recipe", (v) => (state.selectedRecipe = Number(v)))) return;
  if (pick("pmode", (v) => (state.publishMode = v))) return;
  if (pick("kstatus", (v) => { state.kStatus = v; state.pages.knowledge = 1; })) return;
  if (pick("rstatus", (v) => { state.replyStatus = v; state.pages.replies = 1; })) return;
  if (pick("console", (v) => { state.console = v; state.navOpen = false; writeHash(); window.scrollTo({ top: 0 }); })) return;
  if (pick("areq", (v) => (state.accessFilter = v))) return;
  if (pick("help", (v) => { const [sec, a] = v.split(":"); state.helpSection = sec; state.helpArticle = Number(a || 0); })) return;
  if (pick("yb", (v) => { state.selectedYb = Number(v); state.ybStage = "outline"; })) return;
  if (pick("ybstage", (v) => (state.ybStage = v))) return;
  if (pick("ybembed", (v) => (state.ybEmbed = v))) return;
  if (pick("tfilter", (v) => { state.thumbFilter = v; state.pages.thumbs = 1; })) return;
  if (pick("review", (v) => { state.reviewThumb = Number(v); state.pickedCover = 0; })) return;
  if (pick("pick", (v) => (state.pickedCover = Number(v)))) return;
  if (pick("obj", (v) => (state.objective = v))) return;
  if (pick("pplat", (v) => { state.priorsPlatform = v; state.pages.priors = 1; })) return;
  if (pick("level", (v) => { state.logFilters.level = v; state.pages.logs = 1; })) return;

  const sw = e.target.closest(".switch");
  if (sw) {
    const on = sw.classList.toggle("on");
    sw.setAttribute("aria-checked", String(on));
    return;
  }

  const action = e.target.closest("[data-action]")?.dataset.action;
  if (action === "toggle-nav") state.navOpen = !state.navOpen;
  if (action === "close-nav") state.navOpen = false;
  if (action === "notes") state.notes = !state.notes;
  if (action === "theme") {
    document.documentElement.dataset.theme = isDark() ? "light" : "dark";
    const frame = document.querySelector(".legacy-frame");
    if (frame) {
      frame.contentWindow.postMessage({ type: "legacy-theme", theme: isDark() ? "dark" : "light" }, "*");
      document.querySelector('[data-action="theme"]').innerHTML = isDark() ? ICONS.sun : ICONS.moon;
      return;
    }
  }
  if (action === "reset-filters") resetLogFilters();
  if (action === "clear-thumbs") state.thumbSel = {};
  if (action === "clear-k") state.kSel = {};
  if (action === "toggle-create-brand") state.createBrand = !state.createBrand;
  if (action) render();
});

function resetLogFilters() {
  state.logFilters = { q: "", source: "all", channel: "all", level: "all", range: "7d" };
  state.pages.logs = 1;
}

function refreshLogResults() {
  document.getElementById("log-rows").innerHTML = logRows();
  document.getElementById("log-pager").innerHTML = pager("logs", filteredLogs().length, LOG_PAGE_SIZE);
  document.getElementById("log-count").innerHTML = logCount();
}

document.addEventListener("input", (e) => {
  if (e.target.matches?.("[data-nav-search]")) return filterNav(e.target.value);
  if (e.target.dataset?.filter !== "q") return;
  state.logFilters.q = e.target.value;
  state.pages.logs = 1;
  refreshLogResults();
});

document.addEventListener("change", (e) => {
  if (e.target.matches?.("[data-view]")) return go(e.target.value);
  if (e.target.dataset?.ksel !== undefined) {
    state.kSel[e.target.dataset.ksel] = e.target.checked;
    return render();
  }
  if (e.target.dataset?.tsel !== undefined) {
    state.thumbSel[e.target.dataset.tsel] = e.target.checked;
    return render();
  }
  if (e.target.dataset?.filter === "tsort") {
    state.thumbSort = e.target.value;
    return render();
  }
  const key = e.target.dataset?.filter;
  if (!key || key === "q" || !(key in state.logFilters)) return;
  state.logFilters[key] = e.target.value;
  state.pages.logs = 1;
  refreshLogResults();
});

document.addEventListener("keydown", (e) => {
  const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || "");
  if (e.key === "/" && !typing) {
    const box = document.querySelector("[data-nav-search]");
    if (box) {
      e.preventDefault();
      if (!document.querySelector(".sidebar.open") && window.innerWidth < 1024) {
        state.navOpen = true;
        render();
      }
      document.querySelector("[data-nav-search]").focus();
    }
  }
  if (e.key === "Escape" && e.target.matches?.("[data-nav-search]")) {
    e.target.value = "";
    filterNav("");
    e.target.blur();
  }
  if ((e.key === " " || e.key === "Enter") && e.target.classList?.contains("switch")) {
    e.preventDefault();
    e.target.click();
  }
});

window.addEventListener("hashchange", () => {
  readHash();
  render();
});

readHash();
render();
