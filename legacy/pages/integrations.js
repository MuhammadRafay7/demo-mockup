window.LEGACY = window.LEGACY || {};
window.LEGACY["integrations"] = () => {
  const chip =
    "text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-sm ring-1 ring-border hover:bg-panel-2 disabled:opacity-50";
  const monoLabel = "text-[10px] font-mono uppercase tracking-widest text-muted-foreground";
  const chevron = (cls = "h-3 w-3") => L.icon("ChevronDown", cls);

  const header = L.header({
    eyebrow: "Northwind Kitchen · integrations",
    title: "Brand integrations",
    info: true,
    actions: L.pill("success", "admin"),
  });

  const wordpress = L.panel({
    title: "WordPress sites",
    body: `
      <div class="divide-y divide-border">
        <div class="p-4 space-y-3">
          <div class="flex items-center justify-between gap-4">
            <div class="min-w-0">
              <div class="text-sm font-medium truncate">https://northwindkitchen.example</div>
              <div class="mt-1 ${monoLabel}">user · alex@northwindkitchen.example</div>
            </div>
            <div class="flex items-center gap-3 shrink-0">
              ${L.pill("success", "connected")}
              <button title="Run a quick connectivity test against this site" class="${chip}">quick test</button>
              <button title="Disconnect this WordPress site" class="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-sm ring-1 ring-border hover:bg-panel-2">disconnect</button>
            </div>
          </div>
          <div class="border-t border-border pt-3 mt-3">
            <div class="flex items-center gap-2">
              <button title="Run a diagnostic test on this connection" class="${chip} inline-flex items-center gap-1">run diagnostics</button>
              <span class="${monoLabel} ml-auto">wordpress</span>
            </div>
          </div>
        </div>
      </div>
      <div class="p-4 border-t border-border grid grid-cols-1 md:grid-cols-4 gap-3">
        <input placeholder="https://site.com" class="md:col-span-2 bg-panel-2 ring-1 ring-border rounded-sm px-3 py-2 text-sm focus:ring-primary focus:outline-none" />
        <input placeholder="username or email" class="bg-panel-2 ring-1 ring-border rounded-sm px-3 py-2 text-sm font-mono focus:ring-primary focus:outline-none" />
        <input placeholder="application password" type="password" class="bg-panel-2 ring-1 ring-border rounded-sm px-3 py-2 text-sm font-mono focus:ring-primary focus:outline-none" />
        <div class="md:col-span-4 flex items-center justify-between gap-4">
          <span class="${monoLabel}">
            uses WordPress application passwords (
            <a href="#" class="underline hover:text-foreground">See More</a>
            ) — verified before saving · stored encrypted
          </span>
          <button disabled title="Verify and connect this WordPress site" class="text-[11px] font-mono uppercase tracking-widest px-4 py-2 rounded-sm bg-primary text-primary-foreground disabled:opacity-50 shrink-0">connect site</button>
        </div>
      </div>`,
  });

  const attribution = (who, at, events) => `
    <div class="mt-1 space-y-1">
      <div class="${monoLabel} truncate">connected by ${who} · ${at}</div>
      <details class="text-[10px] font-mono text-muted-foreground">
        <summary class="cursor-pointer uppercase tracking-widest">connection history</summary>
        <ul class="mt-1 space-y-0.5">
          ${events.map((e) => `<li class="truncate">${e}</li>`).join("")}
        </ul>
      </details>
    </div>`;

  const diagnostics = (platform) => `
    <div class="border-t border-border pt-3">
      <div class="flex items-center gap-2">
        <button title="Run a diagnostic test on this connection" class="${chip} inline-flex items-center gap-1">test connection</button>
        <span class="${monoLabel} ml-auto">${platform}</span>
      </div>
    </div>`;

  const picker = (label, extra = "") => `
    <div class="border-t border-border pt-3">
      <div class="flex items-center gap-2">
        <button class="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-sm ring-1 ring-border hover:bg-panel-2 inline-flex items-center gap-1.5">
          ${label}
          ${chevron("h-3 w-3 text-muted-foreground")}
        </button>
        ${extra}
      </div>
    </div>`;

  const insights = (platform) => `
    <div class="border-t border-border pt-3">
      <div class="flex items-center gap-2">
        ${["comments", "analytics", "monetization"]
          .map(
            (t) =>
              `<button title="Show the ${platform} ${t} panel" class="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-sm ring-1 inline-flex items-center gap-1 ring-border hover:bg-panel-2">${t}${chevron()}</button>`,
          )
          .join("")}
        <span class="${monoLabel} ml-auto">${platform}</span>
      </div>
    </div>`;

  const cardHead = (label, handle, extra) => `
    <div class="flex items-center justify-between gap-4">
      <div class="min-w-0">
        <div class="text-sm font-medium">${label}</div>
        <div class="mt-1 ${monoLabel} truncate">${handle}</div>
        ${extra}
      </div>
      <div class="flex items-center gap-2 shrink-0">
        ${L.pill("success", "connected")}
        <button title="Run a quick connectivity test" class="${chip}">test</button>
        <button title="Disconnect ${label}" class="${chip}">disconnect</button>
      </div>
    </div>`;

  const subRow = (platform, account, detail) => `
    <div class="flex items-start gap-2 p-2 ring-1 ring-border rounded-sm">
      <span class="text-sm font-mono text-success">●</span>
      <div class="min-w-0 flex-1">
        <div class="text-xs font-medium truncate">
          ${platform}
          <span class="ml-2 ${monoLabel}">${account}</span>
        </div>
        <div class="text-[11px] text-muted-foreground break-words">${detail}</div>
      </div>
    </div>`;

  const webhook = `
    <div class="mt-2 pt-3 border-t border-border space-y-3">
      <div class="flex items-center justify-between gap-4">
        <div class="min-w-0">
          <div class="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
            webhook setup
            ${L.info()}
          </div>
        </div>
        ${L.pill("success", "live")}
      </div>
      <div class="space-y-1">
        <div class="${monoLabel}">callback URL</div>
        <div class="flex items-center gap-2">
          <input readonly value="https://octaneon.ai/api/public/hooks/meta-webhooks" class="flex-1 min-w-0 bg-panel-2 ring-1 ring-border rounded-sm px-3 py-2 text-sm font-mono focus:outline-none" />
          <button title="Copy the webhook callback URL to your clipboard" class="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-sm ring-1 ring-border hover:bg-panel-2 shrink-0">copy</button>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div class="flex items-center justify-between gap-2 p-2 ring-1 ring-border rounded-sm">
          <span class="${monoLabel}">verify token</span>
          <span class="text-[10px] font-mono uppercase tracking-widest text-success">configured</span>
        </div>
        <div class="flex items-center justify-between gap-2 p-2 ring-1 ring-border rounded-sm">
          <span class="${monoLabel}">app secret</span>
          <span class="text-[10px] font-mono uppercase tracking-widest text-success">configured</span>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button title="Re-register webhook assets with the platform" class="${chip}">re-register assets</button>
        <span class="${monoLabel}">last registered 9/2/2026, 10:15:41 AM</span>
      </div>
      <div class="space-y-1">
        ${subRow("facebook", "104829371155820", "registered 1 asset(s) · feed, mention")}
        ${subRow("instagram", "17841405822304914", "registered 1 asset(s) · comments, mentions")}
      </div>
    </div>`;

  const statGrid = (items) => `
    <div class="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-sm overflow-hidden">
      ${items
        .map(
          ([k, v]) => `
        <div class="bg-background p-2">
          <div class="${monoLabel}">${k}</div>
          <div class="text-sm tabular-nums">${v}</div>
        </div>`,
        )
        .join("")}
    </div>`;

  const metaSync = `
    <div class="mt-2 pt-3 border-t border-border space-y-3">
      <div class="flex items-center justify-between gap-4">
        <div class="min-w-0">
          <div class="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
            manual sync
            ${L.info()}
          </div>
          <div class="mt-1 text-sm truncate">14 comments staged · oldest 9/26/2026, 7:02:18 AM</div>
        </div>
        ${L.pill("muted", "14 staged")}
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <label class="${monoLabel}">lookback</label>
        <div class="flex items-center gap-px bg-border rounded-sm overflow-hidden">
          ${["24h", "3d", "7d", "30d"]
            .map(
              (l) =>
                `<button class="text-[10px] font-mono uppercase tracking-widest px-2 py-1 disabled:opacity-50 ${
                  l === "3d" ? "bg-panel-2 text-foreground" : "bg-background text-muted-foreground hover:bg-panel-2"
                }">${l}</button>`,
            )
            .join("")}
        </div>
        <button title="Poll Meta for missed comments, then push all staged rows to the warehouse now" class="${chip}">reconcile + push now</button>
        <button title="Push everything already staged into the warehouse without polling Meta" class="${chip}">push staged only</button>
      </div>
      <div class="mt-2 pt-3 border-t border-border space-y-2">
        <div class="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
          comment coverage
          ${L.info()}
        </div>
        <div class="space-y-2">
          <div class="space-y-1">
            <div class="flex items-center justify-between gap-3">
              <span class="text-[11px] font-mono uppercase tracking-widest">facebook</span>
              ${L.pill("success", "71% of posts have comments")}
            </div>
            ${statGrid([
              ["posts", "604"],
              ["posts w/ comments", "429 / 604"],
              ["comments", "2,311"],
              ["brand replies", "388"],
            ])}
            <div class="${monoLabel}">newest stored comment · 2026-09-26 06:48</div>
          </div>
          <div class="space-y-1">
            <div class="flex items-center justify-between gap-3">
              <span class="text-[11px] font-mono uppercase tracking-widest">instagram</span>
              ${L.pill("success", "84% of posts have comments")}
            </div>
            ${statGrid([
              ["posts", "412"],
              ["posts w/ comments", "346 / 412"],
              ["comments", "1,876"],
              ["brand replies", "501"],
            ])}
            <div class="${monoLabel}">newest stored comment · 2026-09-19 21:12</div>
          </div>
        </div>
      </div>
    </div>`;

  const metaCard = `
    <div id="meta-connect-card" class="bg-background p-4 flex flex-col gap-3 transition-shadow">
      ${cardHead(
        "Meta (Facebook &amp; Instagram)",
        "Northwind Kitchen",
        attribution("Alex Kim", "9/2/2026, 10:14:03 AM", [
          "9/2/2026, 10:14:03 AM · authorized · Alex Kim",
          "6/11/2026, 3:40:22 PM · reauthorized · Alex Kim",
          "3/18/2026, 9:02:10 AM · authorized · Sam Rivera",
        ]),
      )}
      ${diagnostics("facebook")}
      ${picker("select page to manage")}
      <div id="meta-instagram-block" class="mt-2 pt-3 border-t border-border space-y-3">
        <div class="flex items-center justify-between gap-4">
          <div class="min-w-0">
            <div class="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">instagram (via meta)</div>
            <div class="mt-1 text-sm truncate">Instagram authorization expired — reconnect Meta to resume collection</div>
          </div>
          ${L.pill("muted", "needs_reconnect")}
        </div>
        ${picker("select instagram account to manage")}
      </div>
      ${webhook}
      ${metaSync}
      ${insights("facebook")}
    </div>`;

  const youtubeCard = `
    <div class="bg-background p-4 flex flex-col gap-3 transition-shadow">
      ${cardHead(
        "YouTube",
        "@northwindkitchen",
        attribution("Alex Kim", "8/28/2026, 4:51:37 PM", ["8/28/2026, 4:51:37 PM · authorized · Alex Kim"]),
      )}
      ${diagnostics("youtube")}
      ${picker("select channel to manage", `<span class="${monoLabel} truncate">using @northwindkitchen</span>`)}
      <div class="mt-3 rounded-sm ring-1 ring-border">
        <button type="button" aria-expanded="false" class="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-muted/40">
          ${L.icon("ChevronRight", "h-3.5 w-3.5 shrink-0 text-muted-foreground")}
          <span class="min-w-0 truncate ${monoLabel}">youtube publishing defaults</span>
        </button>
      </div>
      ${insights("youtube")}
    </div>`;

  const social = L.panel({
    title: "Social accounts",
    body: `<div class="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">${metaCard}${youtubeCard}</div>`,
  });

  const windsorRows = [
    ["Instagram", "connected", "northwindkitchen"],
    ["Facebook (organic)", "not_connected"],
    ["TikTok (organic)", "not_connected"],
    ["LinkedIn Page (organic)", "not_connected"],
    ["YouTube", "not_connected"],
    ["Threads", "not_connected"],
    ["X (Twitter) (organic)", "not_connected"],
    ["Pinterest (organic)", "not_connected"],
  ]
    .map(
      ([label, state, account]) => `
      <div class="p-4 space-y-3">
        <div class="flex items-start justify-between gap-4">
          <div class="min-w-0">
            <div class="text-sm font-medium">${label}</div>
            <div class="mt-0.5 text-sm text-muted-foreground">${state === "connected" ? account : "Not connected"}</div>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            ${state === "connected" ? L.pill("success", "connected") : L.pill("muted", "not connected")}
            ${
              state === "connected"
                ? `<button title="Show confirmation to release the ${label} connection" class="${chip}">disconnect</button>`
                : `<button title="Open Windsor.ai to authorise ${label} for analytics" class="${chip}">connect</button>`
            }
          </div>
        </div>
        ${state === "connected" ? `<div class="text-xs text-muted-foreground max-w-[70ch]">Octaneon can read this account's performance data through Windsor.</div>` : ""}
      </div>`,
    )
    .join("");

  const coverageRow = (title, platform, have, total) => `
    <div class="flex items-center gap-3 p-2.5 text-xs">
      <div class="min-w-0 flex-1">
        <div class="truncate text-foreground">${title}</div>
        <div class="text-muted-foreground">${platform} · ${have} of ${total} comments</div>
      </div>
      <button type="button" title="Fetch this post's comments from the native platform" class="shrink-0 text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-sm bg-panel-2 text-foreground ring-1 ring-border hover:bg-panel disabled:opacity-50">re-walk</button>
    </div>`;

  const windsor = L.panel({
    title: "Analytics sources",
    actions: L.pill("success", "1 connected"),
    flush: true,
    body: `
      <div class="p-4 border-b border-border space-y-2 text-sm leading-relaxed">
        <p class="text-muted-foreground">
          Octaneon can also read how your posts perform through
          <a href="#" class="text-foreground underline decoration-dotted underline-offset-2 hover:text-primary">Windsor.ai</a>,
          an analytics provider that connects to each platform on your behalf. Use it for accounts
          you would rather not connect directly, or for platforms that aren’t in the list above.
        </p>
        <p class="text-muted-foreground">
          Authorising happens on Windsor’s own page — it won’t send you back here, so this list
          updates by itself once the connection comes through. Reporting built on these sources is
          still rolling out; connecting now means the account is ready when it lands.
        </p>
      </div>
      <div class="divide-y divide-border">${windsorRows}</div>
      <div class="border-t border-border p-4 space-y-3">
        <div class="flex items-center gap-2">
          <span class="text-xs font-medium text-foreground">Comment coverage</span>
          ${L.pill("warn", "7 not in Octaneon")}
        </div>
        <p class="text-xs text-muted-foreground">
          Windsor reports comments that the native connection has not delivered yet. Re-walk a
          post to fetch its comments and replies now.
        </p>
        <div class="divide-y divide-border ring-1 ring-border rounded-sm">
          ${coverageRow("Five pantry pastas in 20 minutes — save this for Sunday", "instagram", 38, 43)}
          ${coverageRow("Market haul: September — what we are cooking this month", "instagram", 12, 14)}
        </div>
      </div>`,
  });

  const audit = L.panel({
    eyebrow: "verification",
    title: "Platform data audit",
    className: "space-y-0",
    body: `
      <div class="space-y-4">
        <div class="text-sm text-muted-foreground">
          Tests every platform end to end: credentials, a live API read, ingest pipeline state,
          warehouse row counts per content type, and freshness.
          ${L.info()}
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <button type="button" title="Test every platform's credentials, ingest pipeline, and data coverage" class="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground disabled:opacity-50">Run full audit</button>
          <label class="flex items-center gap-2 text-xs text-muted-foreground">
            <input type="checkbox" checked />
            include live API calls (slower, spends quota)
          </label>
        </div>
      </div>`,
  });

  const jobs = [
    ["YouTube · hot", "last 9/26/2026, 10:05:12 AM · 38 snapshots · 38 due checked"],
    ["YouTube · warm", "last 9/26/2026, 6:00:40 AM · 112 snapshots · 112 due checked"],
    ["YouTube · cold", "last 9/25/2026, 12:00:09 AM · 96 snapshots · 96 due checked"],
    ["Facebook · hot", "last 9/26/2026, 10:05:14 AM · 12 snapshots · 12 due checked"],
    ["Instagram · hot", "last 9/26/2026, 10:05:15 AM · 0 snapshots · 9 due checked · (#190) Error validating access token: The session has been invalidated"],
    ["WordPress · warm", "last 9/26/2026, 6:00:44 AM · 21 snapshots · 21 due checked"],
  ];

  const metrics = L.panel({
    eyebrow: "performance loop",
    title: "Metric collection",
    actions: L.pill("danger", "errors"),
    className: "space-y-0",
    body: `
      <div class="space-y-4">
        <div class="text-sm text-muted-foreground">
          Collection normally runs on a schedule, tiered by post age.
          ${L.info()}
          Nothing waiting to push.
        </div>
        <div class="space-y-2">
          <div class="${monoLabel}">platforms</div>
          <div class="flex flex-wrap gap-2">
            ${["YouTube", "Facebook", "Instagram", "X", "WordPress", "TikTok"]
              .map(
                (p) =>
                  `<button type="button" title="Exclude ${p} in the next manual collection run" class="text-[11px] font-mono uppercase tracking-widest px-2 py-1 rounded-sm ring-1 disabled:opacity-50 bg-primary/10 text-primary ring-primary/30">${p}</button>`,
              )
              .join("")}
          </div>
        </div>
        <div class="space-y-2">
          <div class="${monoLabel}">window · posts published within</div>
          <div class="flex items-center gap-px bg-border rounded-sm overflow-hidden w-fit">
            ${["48h", "7d", "30d", "90d", "180d"]
              .map(
                (w) =>
                  `<button type="button" class="text-[10px] font-mono uppercase tracking-widest px-3 py-1 disabled:opacity-50 ${
                    w === "30d" ? "bg-panel-2 text-foreground" : "bg-background text-muted-foreground"
                  }">${w}</button>`,
              )
              .join("")}
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <button type="button" class="text-[11px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-sm bg-primary text-primary-foreground disabled:opacity-50">Collect now</button>
          <button type="button" class="text-[11px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-sm ring-1 ring-border bg-panel-2 text-muted-foreground disabled:opacity-50">Initialize warehouse tables</button>
        </div>
        <div class="border-t border-border pt-3 space-y-1">
          <div class="${monoLabel}">scheduled jobs</div>
          ${jobs
            .map(
              ([k, v]) => `
          <div class="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span class="font-mono">${k}</span>
            <span class="text-muted-foreground">${v}</span>
          </div>`,
            )
            .join("")}
        </div>
      </div>`,
  });

  const webAnalytics = L.panel({
    title: "Web analytics — GA4 &amp; AdSense",
    flush: true,
    body: `
      <div class="p-4 border-b border-border text-sm text-muted-foreground">
        Two-step setup: (1) authorize a Google account, then (2) pick which property/account this
        brand should pull from. YouTube, GA4, and AdSense authorize separately so a brand can
        connect a YouTube channel even when the Google account has no GA4 or AdSense access.
      </div>
      <div class="divide-y divide-border">
        <div class="p-4 space-y-3">
          <div class="flex items-center justify-between gap-4">
            <div class="min-w-0">
              <div class="text-sm font-medium">Google Analytics 4</div>
              <div class="mt-1 ${monoLabel} truncate">property · 318204771 · last run 42m ago</div>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              ${L.pill("success", "completed")}
              <button title="Show the list of GA4 properties to pick from" class="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-sm ring-1 ring-border hover:bg-panel-2">change property</button>
              <button title="Pull the latest GA4 traffic and engagement data now" class="${chip}">refresh now</button>
              <button title="Re-import the last 400 days of GA4 history" class="${chip}">backfill 400d</button>
            </div>
          </div>
          <div class="${monoLabel}">
            <button title="Re-run Google OAuth using a different Google account for GA4" class="underline underline-offset-2 hover:text-foreground disabled:opacity-50">reauthorize with a different Google account</button>
          </div>
        </div>
        <div class="p-4 space-y-3">
          <div class="flex items-center justify-between gap-4">
            <div class="min-w-0">
              <div class="text-sm font-medium">Google AdSense</div>
              <div class="mt-1 ${monoLabel} truncate">step 1 — authorize a Google account with AdSense access</div>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              ${L.pill("muted", "not authorized")}
              <button title="Start Google OAuth to grant AdSense access for this brand" class="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-sm ring-1 ring-primary text-primary hover:bg-primary/10 disabled:opacity-50">authorize adsense</button>
            </div>
          </div>
        </div>
      </div>
      <div class="p-3 border-t border-border ${monoLabel}">
        GA4 refreshes hourly · AdSense every 6h · separate Google authorizations keep YouTube
        reconnects isolated
      </div>`,
  });

  const inbound = [
    ["Fwd: Bon Appétit — The fall baking issue", "alex@northwindkitchen.example · 9/25/2026, 8:14:22 AM", 0, 1, "success", "accepted"],
    ["Recipe testing notes — sourdough week 2", "sam@northwindkitchen.example · 9/22/2026, 5:41:09 PM", 2, 3, "success", "accepted"],
    ["Partnership opportunity", "promo@spicebrand.example · 9/19/2026, 11:02:55 AM", 0, 0, "warn", "rejected · not a member", "sender is not a member of this brand"],
  ]
    .map(
      ([subject, from, att, items, tone, label, reason]) => `
      <div class="grid grid-cols-[1fr_auto_auto_auto] gap-3 px-3 py-2 items-center">
        <div class="min-w-0">
          <div class="text-xs truncate">${subject}</div>
          <div class="${monoLabel} truncate">${from}</div>
          ${reason ? `<div class="mt-1 text-[10px] font-mono uppercase tracking-widest text-danger truncate">${reason}</div>` : ""}
        </div>
        <div class="${monoLabel}">${att}</div>
        <div class="${monoLabel}">${items}</div>
        ${L.pill(tone, label)}
      </div>`,
    )
    .join("");

  const email = L.panel({
    eyebrow: "knowledge inbox · Postmark inbound",
    title: "Email → Brand Voice &amp; Knowledge",
    body: `
      <div class="space-y-4">
        <div class="text-xs text-muted-foreground -mt-2">
          Forward emails to this brand's dedicated address. The body and every parseable attachment
          lands in the curation queue as pending. Only brand members can send.
        </div>
        <div class="p-3 rounded-sm ring-1 ring-border bg-panel-2 flex items-center gap-3">
          <div class="min-w-0 flex-1">
            <div class="${monoLabel}">brand address</div>
            <div class="mt-0.5 text-sm font-mono truncate">knowledge+northwind-kitchen@inbound.proventext.com</div>
          </div>
          <button title="Copy this inbox address to your clipboard" class="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-sm ring-1 ring-border hover:bg-panel disabled:opacity-50">copy</button>
        </div>
        <div class="text-[11px] text-muted-foreground leading-relaxed">
          Forward newsletters or industry emails to the address above. Accepted messages appear in
          <span class="font-mono">Brand Voice &amp; Knowledge → Curation Queue</span> under the
          <span class="font-mono">email</span> platform. Attachments (PDF, DOCX, MD, TXT, CSV)
          become their own knowledge items. Emails from senders who are not members of this brand
          are rejected and logged below.
        </div>
        <div class="rounded-sm ring-1 ring-border overflow-hidden">
          <div class="grid grid-cols-[1fr_auto_auto_auto] gap-3 px-3 py-2 bg-panel-2 ${monoLabel}">
            <div>from · subject</div>
            <div>attachments</div>
            <div>items</div>
            <div>status</div>
          </div>
          <div class="divide-y divide-border">${inbound}</div>
        </div>
      </div>`,
  });

  return L.page(
    header + wordpress + social + windsor + audit + metrics + webAnalytics + email,
    "max-w-[1200px]",
  );
};
