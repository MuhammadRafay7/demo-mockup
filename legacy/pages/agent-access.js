window.LEGACY = window.LEGACY || {};
window.LEGACY["agent-access"] = () => {
  const btnBase =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-8 px-3 text-xs";
  const btnOutline = `${btnBase} border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground`;
  const btnDefault = `${btnBase} bg-primary text-primary-foreground shadow hover:bg-primary/90`;
  const badgeBase =
    "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  const selectTrigger = (w, label) =>
    `<button type="button" class="flex h-8 ${w} items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-xs shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"><span>${label}</span>${L.icon("ChevronDown", "h-4 w-4 opacity-50")}</button>`;

  const endpoint = "https://octaneon.ai/mcp";

  const tools = [
    ["list_brands", "List brands", "r", "List all Octaneon brands the signed-in operator has access to (their own memberships plus platform-owner access). Returns id, name, and slug. Use find_brand when you only know a brand's name."],
    ["find_brand", "Find a brand", "r", "Look up a brand by name, slug or id and return its exact id for use in other tools. Call this first whenever the person names a brand in plain language. With no query it lists every brand this account can access."],
    ["ask_brand_analyst", "Ask the brand analyst", "r", "Answer a strategy question about one brand using everything in Octaneon: brand knowledge base, brand voice, measured post performance, learned engagement priors per platform, topic gaps, open content ideas and reply-queue health. Use this for questions like 'what content will get the most engagement on Facebook?' or 'what should we publish next?'. Returns a synthesized recommendation plus the evidence it used. When the brand's knowledge base does not cover the question, it does not guess: it returns clarifying questions to put back to the operator plus the sources that would close the gap, and you can retry with answer_anyway=true to get an ungrounded answer that is clearly labelled as such."],
    ["search_brand_knowledge", "Search brand knowledge", "r", "Semantic search over a brand's knowledge base (site pages, blog posts, transcripts, social content, comments). Returns the most relevant passages with source titles, URLs and similarity scores. Use this to ground any factual claim about the brand."],
    ["get_brand_voice", "Get brand voice", "r", "Return the brand's voice profile: representative voice samples used to steer generation plus any per-platform prompt overrides the operator configured. Use this before writing copy so the wording matches the brand."],
    ["get_engagement_performance", "Get engagement performance", "r", "Return what has actually driven engagement for a brand on one platform: the platform's optimisation goal, time-weighted performance of recent posts, and learned priors (this brand, same topic, same industry, all brands) with concrete lessons. This is the evidence to cite when recommending what to post."],
    ["get_platform_priorities", "Get platform priorities", "r", "Return the brand's configured per-platform priorities: how much focus each platform gets (0-100), its primary and secondary engagement objectives, the engagement metrics this brand judges that platform by (with weights), and any operator instruction. Read this before giving cross-platform advice so each platform's recommendation follows its own objective — a Facebook recommendation must not be an Instagram recommendation reworded."],
    ["list_top_posts", "List top posts", "r", "List a brand's published posts ranked by measured engagement over a recent window, with per-day deltas for views, likes, comments, shares and click-throughs. Use it to point at specific posts that worked."],
    ["list_topic_gaps", "List topic gaps", "r", "List the brand's topic map: granular subtopics with demand, coverage and gap scores, each naming its parent theme. Subtopics are the actionable unit — propose content against a subtopic, not a broad theme. Coverage is weighted by how the existing answering posts actually performed, so a topic answered only by weak posts still shows a high gap. High gap score means the audience asks about it but the brand has little (or only under-performing) content on it — the strongest candidates for new content. revenue_source tells you whether revenue_potential is measured from real metrics or an estimate."],
    ["list_content_ideas", "List content ideas", "r", "List saved content ideas for a brand, including where each idea came from (a viewer comment, a topic gap, or an operator) and its current status."],
    ["list_content_drafts", "List content drafts", "r", "List recent generated content drafts for a brand. Returns platform, title, body, hashtags, status, and recommended_at."],
    ["list_production_videos", "List production videos", "r", "List uploaded production videos for a brand, including filename, status, duration, and whether a transcript is present."],
    ["get_reply_queue_status", "Get reply queue status", "r", "Return the brand's comment-reply health: unanswered inbound comments, drafted / scheduled / posted / failed reply counts, inbound volume over the last 30 days, and how far ahead replies are scheduled."],
    ["recall_session_memory", "Recall this session", "r", "Return what this working session already covered: earlier questions and answers, pinned constraints and decisions, and the acting tool calls made (ideas created, drafts generated, posts scheduled or published, replies queued). Call it when you resume a conversation or need to check whether something was already done before repeating it."],
    ["read_agent_stream", "Read a live agent stream", "r", "Read the current state of a stream started by ask_brand_analyst or generate_content_drafts (use the stream_token those tools return). Returns the progress stages so far, the text produced so far, and whether the work is still running. Use this to show partial output while a long generation is in flight."],
    ["remember_session_note", "Remember a constraint or decision", "w", "Pin a constraint, preference or decision for the rest of this working session (e.g. 'no discount offers', 'focus on avocado care', 'operator approved the Aug 20 schedule'). Later ask_brand_analyst turns in the same session automatically honour what is pinned here. Use it whenever the person states a rule or makes a decision you will need again."],
    ["create_content_idea", "Create content idea", "w", "Immediately save an operator's stated content idea to the named brand's Content Ideas list. Use this when the operator says 'I have a content idea', 'add an idea', or 'save this idea'; do not search posts or run brand analysis first unless required fields are missing."],
    ["generate_content_drafts", "Generate content drafts", "w", "Run Octaneon's content generation for one transcribed production video: produces per-platform drafts using the brand voice, learned engagement priors and the configured publication flow. The video must already have a transcript. Drafts land unapproved for operator review."],
    ["schedule_content_draft", "Schedule content draft", "w", "Schedule one existing content draft to go live at a specific time. When the platform supports native scheduling the post is handed off to it, otherwise Octaneon publishes it at that time."],
    ["publish_content_draft", "Publish content draft now", "d", "Publish one existing content draft to its platform immediately. This is irreversible — the post goes live. Prefer schedule_content_draft unless the user asked to post now."],
    ["draft_comment_reply", "Draft comment reply", "w", "Save a reply draft for one inbound comment into the brand's reply queue. The draft is not posted — an operator approves or schedules it in Octaneon. Use the platform + source comment id from the reply queue."],
    ["list_dev_pipeline", "List dev pipeline", "r", "List Octaneon development-pipeline items so they can be reviewed and built. Merges the curated roadmap checklist (with any status overrides) and feedback/bug submissions that were promoted to the dev pipeline. Platform-owner access only."],
    ["get_dev_pipeline_item", "Get dev pipeline item", "r", "Fetch full detail for one Octaneon dev-pipeline item. Pass a roadmap item key (from list_dev_pipeline) to get its long-form implementation note, or a feedback submission UUID to get the description, severity, group, and generated implementation plan. Platform-owner access only."],
    ["update_dev_pipeline_item", "Update dev pipeline item", "w", "Update the status of one Octaneon dev-pipeline item after reviewing or building it. Accepts a roadmap item key (stores a status override) or a feedback submission UUID (updates its pipeline status). Platform-owner access only; no data is deleted."],
  ];

  const toolBadge = (kind) =>
    kind === "d"
      ? `<span class="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border border-destructive/50 text-destructive">Publishes immediately</span>`
      : kind === "r"
        ? `<span class="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border border-border text-muted-foreground">Read only</span>`
        : `<span class="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border border-primary/50 text-primary">Writes data</span>`;

  const connection = L.panel({
    title: "Connection details",
    body: `
      <p class="text-sm text-muted-foreground mb-4">Octaneon exposes its brand intelligence to AI agents over the Model Context Protocol (MCP). An agent connects to the address below and signs in with your own Octaneon account, so it can only reach the brands you can already open.</p>
      ${L.kv([
        { k: "Server", v: "Octaneon" },
        { k: "Version", v: `<span class="font-mono text-xs">0.5.0</span>` },
        {
          k: "Address",
          v: `<span class="flex items-center gap-2 min-w-0"><span class="font-mono text-xs truncate">${endpoint}</span><button class="${btnOutline}">Copy</button></span>`,
        },
        { k: "Sign-in", v: "Your Octaneon account (approval screen on first connect)" },
        { k: "Tools", v: `${tools.length} available` },
      ])}
    `,
  });

  const clients = ["Claude", "ChatGPT", "Cursor", "Custom agent", "Local proxy", "Other MCP client"];
  const setup = L.panel({
    title: "Connect an agent",
    body: `
      <div class="flex flex-wrap gap-1 mb-4">
        ${clients
          .map(
            (c) =>
              `<button class="px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                c === "Claude"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }">${c}</button>`,
          )
          .join("")}
      </div>
      <ol class="space-y-2 text-sm list-decimal pl-5">
        <li>Open Settings → Connectors and choose “Add custom connector”.</li>
        <li>Paste the address: https://octaneon.ai/mcp</li>
        <li>Save, then click Connect — a browser window opens Octaneon's sign-in.</li>
        <li>Sign in and approve the connection. Claude then lists Octaneon's tools.</li>
      </ol>
      <p class="text-xs text-muted-foreground mt-4">Every agent action runs as you and is recorded the same way as work done in the app. Publishing tools act immediately — there is no second approval step inside Octaneon.</p>
    `,
  });

  const filters = [
    ["all", "All"],
    ["read", "Read only"],
    ["write", "Changes data"],
  ];
  const catalog = L.panel({
    title: "What an agent can do",
    actions: `<div class="flex gap-1">${filters
      .map(
        ([id, label]) =>
          `<button class="px-2 py-1 text-[11px] rounded border ${
            id === "all"
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border text-muted-foreground hover:text-foreground"
          }">${label}</button>`,
      )
      .join("")}</div>`,
    body: `
      <ul class="divide-y divide-border">
        ${tools
          .map(
            ([name, title, kind, desc]) => `
          <li class="py-3 first:pt-0 last:pb-0">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-sm font-medium">${title}</span>
              <span class="text-[11px] font-mono text-muted-foreground">${name}</span>
              ${toolBadge(kind)}
            </div>
            <p class="text-xs text-muted-foreground mt-1">${desc}</p>
          </li>`,
          )
          .join("")}
      </ul>
    `,
  });

  const streams = [
    ["What should we post on Facebook next week?", "Analyst answer", "9/26/2026, 10:42:18 AM"],
    ["Drafts for “Five pantry pastas in 20 minutes”", "Draft generation", "9/25/2026, 4:07:51 PM"],
    ["Which recipe topics are we under-covering on YouTube?", "Analyst answer", "9/24/2026, 11:15:03 AM"],
    ["Reply draft", "Reply draft", "9/23/2026, 9:31:40 AM"],
  ];
  const live = L.panel({
    title: "Live agent activity",
    actions: `<button class="${btnOutline}">Refresh</button>`,
    body: `
      <p class="text-sm text-muted-foreground">Answers and draft runs an agent started for this brand. Open one to watch it being written instead of waiting for the agent to finish.</p>
      <ul class="mt-3 divide-y divide-border rounded-md border border-border">
        ${streams
          .map(
            ([label, kind, when]) => `
          <li class="flex items-center gap-3 px-3 py-2">
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm">${label}</p>
              <p class="text-xs text-muted-foreground">${kind} · ${when}</p>
            </div>
            <div class="${badgeBase} border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">Done</div>
            <button class="${btnOutline}">Open</button>
          </li>`,
          )
          .join("")}
      </ul>
    `,
  });

  const health = L.panel({
    title: "Connection health",
    actions: `<button class="${btnDefault}">Test connection</button>`,
    body: `<p class="text-sm text-muted-foreground">Calls the agent endpoint the way an agent would and reports whether the address answers, whether sign-in is enforced, and whether agents can discover where to sign in.</p>`,
  });

  const agents = [
    ["Claude", "https://claude.ai", "9/12/2026, 2:18:44 PM"],
    ["Cursor", "https://cursor.com", "8/30/2026, 9:02:10 AM"],
  ];
  const connected = L.panel({
    title: "Your connected agents",
    flush: true,
    body: `
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground border-b border-border">
              <th class="text-left px-4 py-2">Agent</th>
              <th class="text-left px-4 py-2">Connected</th>
              <th class="text-left px-4 py-2">Status</th>
              <th class="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            ${agents
              .map(
                ([name, uri, when]) => `
            <tr class="border-b border-border/60">
              <td class="px-4 py-2">
                <div class="font-medium">${name}</div>
                <div class="text-xs text-muted-foreground truncate max-w-[280px]">${uri}</div>
              </td>
              <td class="px-4 py-2 text-muted-foreground">${when}</td>
              <td class="px-4 py-2"><span class="text-xs text-emerald-500">Active</span></td>
              <td class="px-4 py-2 text-right"><button class="${btnOutline}">Revoke</button></td>
            </tr>`,
              )
              .join("")}
          </tbody>
        </table>
      </div>
      <p class="px-4 py-3 text-xs text-muted-foreground border-t border-border">Revoking stops that agent from acting on your behalf. It can reconnect later by signing in and approving again.</p>
    `,
  });

  const disposition = {
    published: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
    scheduled: "bg-sky-500/15 text-sky-500 border-sky-500/30",
    queued: "bg-amber-500/15 text-amber-500 border-amber-500/30",
    created: "bg-muted text-muted-foreground border-border",
    updated: "bg-muted text-muted-foreground border-border",
  };
  const actionPill = (d, entity, platform) =>
    `<span class="inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[11px] ${disposition[d]}"><span class="uppercase tracking-wide">${d}</span><span class="opacity-80">${entity}</span>${platform ? `<span class="opacity-60">· ${platform}</span>` : ""}</span>`;

  const audit = [
    { tool: "ask_brand_analyst", when: "9/26/2026, 10:42:18 AM", client: "Claude", ro: true, actions: [] },
    { tool: "get_platform_priorities", when: "9/26/2026, 10:41:55 AM", client: "Claude", ro: true, actions: [] },
    { tool: "schedule_content_draft", when: "9/25/2026, 4:22:09 PM", client: "Claude", ro: false, actions: [["scheduled", "content draft", "instagram"]] },
    { tool: "generate_content_drafts", when: "9/25/2026, 4:07:51 PM", client: "Claude", ro: false, actions: [["created", "content drafts", null]] },
    { tool: "publish_content_draft", when: "9/24/2026, 1:10:36 PM", client: "Claude", ro: false, destructive: true, actions: [["published", "content draft", "facebook"]] },
    { tool: "draft_comment_reply", when: "9/23/2026, 9:31:40 AM", client: "Cursor", ro: false, actions: [["queued", "reply draft", "youtube"]] },
    { tool: "create_content_idea", when: "9/22/2026, 3:48:12 PM", client: "Claude", ro: false, actions: [["created", "content idea", null]] },
    { tool: "list_topic_gaps", when: "9/22/2026, 3:46:57 PM", client: "Claude", ro: true, actions: [] },
    { tool: "search_brand_knowledge", when: "9/21/2026, 11:03:29 AM", client: "Cursor", ro: true, ok: false, actions: [] },
  ];
  const auditLog = L.panel({
    title: "Agent audit log",
    actions: `<button class="${btnOutline}">Refresh</button>`,
    body: `
      <p class="text-sm text-muted-foreground">Every call an agent made, kept for review: the request, the brand evidence behind it, the answer it produced, and whether anything went live, was scheduled, or is queued for approval.</p>
      <div class="mt-3 flex flex-wrap items-center gap-2">
        ${selectTrigger("w-[190px]", "All calls")}
        ${selectTrigger("w-[220px]", "All tools")}
        ${selectTrigger("w-[150px]", "Last 30 days")}
        <span class="text-xs text-muted-foreground">9 calls</span>
      </div>
      <ul class="mt-3 divide-y divide-border rounded-md border border-border">
        ${audit
          .map(
            (e) => `
          <li class="px-3 py-2">
            <div class="flex flex-wrap items-center gap-2">
              <button type="button" class="min-w-0 flex-1 text-left">
                <span class="font-mono text-sm">${e.tool}</span>
                ${e.ro ? "" : `<div class="${badgeBase} text-foreground ml-2 text-[10px]">${e.destructive ? "IRREVERSIBLE" : "CHANGES DATA"}</div>`}
                ${e.ok === false ? `<div class="${badgeBase} border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80 ml-2 text-[10px]">FAILED</div>` : ""}
                <span class="ml-2 text-xs text-muted-foreground">${e.when} · ${e.client}</span>
              </button>
              <div class="flex flex-wrap items-center gap-1">
                ${e.actions.map((a) => actionPill(...a)).join("")}
              </div>
              <button class="${btnOutline}">Review</button>
            </div>
          </li>`,
          )
          .join("")}
      </ul>
    `,
  });

  return `
    ${L.page(
      `
      ${L.header({ eyebrow: "Settings", title: "Agent Access (MCP)", info: true })}
      ${connection}
      ${setup}
      ${catalog}
      ${live}
      ${health}
      ${connected}
      ${auditLog}
    `,
      "max-w-5xl",
    )}
  `;
};
