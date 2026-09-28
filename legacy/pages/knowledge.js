window.LEGACY = window.LEGACY || {};
window.LEGACY["knowledge"] = () => {
  const fmt = (n) => n.toLocaleString("en-US");

  const idleRow = (platform, handle) => `
    <div class="p-3 bg-panel-2 ring-1 ring-border rounded-sm">
      <div class="space-y-2">
        <div class="flex items-center justify-between gap-3 text-xs">
          <div class="min-w-0 flex items-center gap-2">
            <span class="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">${platform}</span>
            <span class="truncate">· ${handle}</span>
            <span class="font-mono text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded-sm ring-1 text-muted-foreground ring-border bg-panel">idle</span>
          </div>
          <div class="shrink-0 flex items-center gap-3">
            <span class="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">not started</span>
            <button title="Start importing this platform's historical content" class="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-sm ring-1 ring-primary text-primary hover:bg-primary/10 disabled:opacity-50">start backfill</button>
          </div>
        </div>
        <div>
          <div class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">videos</div>
          <div class="h-1.5 bg-background ring-1 ring-border rounded-sm overflow-hidden"></div>
          <div class="flex items-center justify-between text-[11px] text-muted-foreground font-mono mt-1">
            <span>0 videos · not started</span>
          </div>
        </div>
      </div>
    </div>`;

  const ingestion = L.panel({
    eyebrow: "ingestion",
    title: "Ingestion Progress",
    body: `
      <div class="mb-3 flex items-center justify-between gap-3">
        <div class="text-[11px] text-muted-foreground">
          One row per connected platform. Amber "backfill" indicates an active historical import;
          green "ongoing sync" means the throttled incremental pull is live.
        </div>
        <button title="Manually refetch missing YouTube transcripts now" class="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-sm ring-1 ring-border hover:bg-panel disabled:opacity-50 shrink-0">refetch transcripts</button>
      </div>

      <div class="mb-4 rounded-sm ring-1 ring-border bg-panel/40 px-3 py-2">
        <div class="flex items-baseline justify-between gap-3">
          <div class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">youtube transcript coverage</div>
          <div class="flex items-center gap-3">
            <div class="text-[11px] font-mono">
              412 / 438 <span class="text-muted-foreground">(94%)</span>
            </div>
            <button type="button" title="Run a transcript coverage sweep now instead of waiting for the schedule" class="rounded-sm ring-1 ring-border px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-panel disabled:opacity-40">run sweep now</button>
          </div>
        </div>
        <div class="mt-2 h-1.5 w-full rounded-full bg-border/60 overflow-hidden">
          <div class="h-full bg-primary transition-all" style="width: 94%"></div>
        </div>
        <div class="mt-2 text-[10px] font-mono text-muted-foreground">
          production 38 · free captions 301 · api 73 ·
          auto-generated 164 · queued 19 · no captions available 7
        </div>
        <div class="mt-1 text-[10px] font-mono text-muted-foreground">
          <span title="Transcript sweeps ride the shared YouTube cron tick (every 6h). Adjust the cadence in Platform → Integration tick settings.">next sweep Sep 26, 2026, 6:00 PM (in 3.2h)</span>
        </div>
      </div>

      <div class="mb-4 space-y-2">
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">ingestion notifications</span>
            <span class="font-mono text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded-sm ring-1 ring-primary/40 bg-primary/10 text-primary">2 new</span>
          </div>
          <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-colors border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md h-6 px-2 text-[10px] font-mono uppercase tracking-widest">mark all read</button>
        </div>
        <div class="space-y-2">
          <div class="p-3 rounded-sm bg-panel-2 ring-1 space-y-1 ring-primary/40">
            <div class="flex items-center justify-between gap-3 text-[11px] font-mono">
              <span class="text-emerald-400">YouTube backfill completed</span>
              <span class="shrink-0 text-muted-foreground/70 text-[10px]">5h ago · unread</span>
            </div>
            <div class="text-[10px] font-mono text-muted-foreground">438 videos · 12,904 comments ingested for @northwindkitchen</div>
            <div class="text-[10px] font-mono text-muted-foreground/80">ingested range Mar 2, 2019 → Sep 25, 2026</div>
            <button type="button" title="Mark this notification as read" class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground">mark read</button>
          </div>
          <div class="p-3 rounded-sm bg-panel-2 ring-1 space-y-1 ring-destructive/40">
            <div class="flex items-center justify-between gap-3 text-[11px] font-mono">
              <span class="text-destructive">Instagram backfill failed</span>
              <span class="shrink-0 text-muted-foreground/70 text-[10px]">2d ago · unread</span>
            </div>
            <div class="text-[10px] font-mono text-muted-foreground">Stopped after 211 of 640 media.</div>
            <div class="text-[10px] font-mono text-muted-foreground/80">ingested range Jan 14, 2021 → Sep 24, 2026</div>
            <div class="text-[10px] font-mono text-warning whitespace-pre-wrap break-words">OAuthException 190: Error validating access token — reconnect Instagram on Integrations.</div>
            <button type="button" title="Mark this notification as read" class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground">mark read</button>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        ${idleRow("TikTok", "@northwindkitchen")}
        ${idleRow("linkedin", "Northwind Kitchen")}
      </div>`,
  });

  const totals = [
    { p: "YouTube", rows: [["video", 438, 431, 7], ["comment", 11820, 2104, 9312], ["brand_reply", 1084, 1084, 0]] },
    { p: "Facebook", rows: [["post", 612, 598, 14], ["comment", 4210, 880, 3290], ["brand_reply", 377, 377, 0]] },
    { p: "Instagram", rows: [["post", 211, 205, 6], ["comment", 2944, 412, 2511], ["brand_reply", 158, 158, 0]] },
    { p: "WordPress", rows: [["post", 286, 286, 0], ["page", 14, 12, 2]] },
    { p: "Email", rows: [["email_body", 93, 41, 52]] },
    { p: "Documents", rows: [["document", 9, 7, 2]] },
  ];
  let gTotal = 0, gApproved = 0, gPending = 0;
  totals.forEach((t) => t.rows.forEach((r) => { gTotal += r[1]; gApproved += r[2]; gPending += r[3]; }));
  const gRejected = 311;
  gTotal += gRejected;

  const totalStat = (label, value, toneClass) => `
    <div class="p-3 rounded-sm ring-1 ring-border bg-panel">
      <div class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">${label}</div>
      <div class="mt-1 text-2xl font-mono tabular-nums ${toneClass}">${fmt(value)}</div>
    </div>`;

  const platformCards = totals
    .map((t) => {
      const sum = t.rows.reduce((a, r) => a + r[1], 0);
      return `
      <div class="p-3 rounded-sm ring-1 ring-border bg-panel">
        <div class="flex items-baseline justify-between">
          <div class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">${t.p}</div>
          <div class="text-sm font-mono">${fmt(sum)}</div>
        </div>
        <div class="mt-2 space-y-1">
          ${t.rows
            .map(
              (r) => `
            <div class="flex items-center justify-between text-[11px] font-mono">
              <span class="text-muted-foreground uppercase tracking-widest">${r[0]}</span>
              <span class="tabular-nums">
                <span class="text-foreground">${fmt(r[1])}</span><span class="text-muted-foreground"> · ${fmt(r[2])} approved · ${fmt(r[3])} pending</span>
              </span>
            </div>`,
            )
            .join("")}
        </div>
      </div>`;
    })
    .join("");

  const kbTotals = L.panel({
    eyebrow: "cumulative",
    title: "Knowledge base totals",
    body: `
      <div class="mb-3 text-xs text-muted-foreground normal-case">
        Cumulative counts of every item stored in Snowflake for this brand, grouped by source.
        Backfill job counters on the Integrations page reflect only the current run — these totals
        are the source of truth for what lives in the KB.
      </div>
      <div class="space-y-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          ${totalStat("total items", gTotal, "text-foreground")}
          ${totalStat("approved", gApproved, "text-success")}
          ${totalStat("pending", gPending, "text-warn")}
          ${totalStat("rejected", gRejected, "text-foreground")}
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">${platformCards}</div>
      </div>`,
  });

  const intakeTypes = ["post", "page", "video", "comment", "reply", "brand_reply", "document"];
  const intakeLabels = ["Posts", "Pages", "Videos", "Comments", "Comment replies", "Brand replies", "Documents &amp; email"];
  const intakeHints = [
    "Page/feed posts and published articles",
    "Static site pages",
    "Video metadata and transcripts",
    "Top-level audience comments",
    "Audience replies nested under a comment",
    "Comments authored by this brand's own account",
    "Uploaded files and inbound email bodies",
  ];
  const intakePlatforms = [
    ["YouTube", ["video", "comment", "reply", "brand_reply"], { video: "include" }],
    ["Facebook", ["post", "comment", "reply", "brand_reply"], { post: "include" }],
    ["Instagram", ["post", "comment", "reply", "brand_reply"], {}],
    ["TikTok", ["video", "comment", "reply", "brand_reply"], { comment: "exclude", reply: "exclude" }],
    ["WordPress", ["post", "page"], { post: "include", page: "include" }],
    ["LinkedIn", ["post", "comment", "reply", "brand_reply"], {}],
    ["Inbound email", ["document"], {}],
    ["Uploaded documents", ["document"], { document: "include" }],
  ];
  const modeSelect = (mode) => `
    <select class="w-full rounded-md border border-border bg-background px-2 py-1 text-xs disabled:opacity-60">
      <option value="include" title="Auto-approve for brand voice &amp; retrieval"${mode === "include" ? " selected" : ""}>Include</option>
      <option value="review" title="Hold in the curation queue for a human"${mode === "review" ? " selected" : ""}>Review</option>
      <option value="exclude" title="Reject — never used for brand voice"${mode === "exclude" ? " selected" : ""}>Exclude</option>
    </select>`;
  const intakeRows = intakePlatforms
    .map(
      ([label, typeIds, overrides]) => `
      <tr class="border-t border-border">
        <td class="font-medium">${label}</td>
        ${intakeTypes
          .map((t) =>
            typeIds.includes(t)
              ? `<td>${modeSelect(overrides[t] ?? (t === "brand_reply" ? "include" : "review"))}</td>`
              : `<td><span class="text-xs text-muted-foreground">—</span></td>`,
          )
          .join("")}
      </tr>`,
    )
    .join("");

  const intake = L.panel({
    eyebrow: "knowledge · intake",
    title: "Automatic inclusion rules",
    actions: L.pill("muted", "7 rules"),
    body: `
      <div class="mb-3 text-xs text-muted-foreground normal-case">
        Decide what happens to each kind of content as it is ingested. <strong>Include</strong>
        approves it for brand voice and vectorizes it, <strong>Review</strong> holds it in the
        curation queue, and <strong>Exclude</strong> rejects it and removes it from the vector
        index. For <strong>Comments</strong> and <strong>Comment replies</strong>, Exclude only
        stops them being used for brand voice — they are still collected and still appear in Reply
        Generation, so the reply queue can never be switched off here. Individual approve/reject
        decisions in the curation queue always take precedence and survive re-syncs. Every connected
        platform is listed here automatically; measurement-only connections (GA4, AdSense) never
        supply knowledge and are excluded.
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr>
              <th class="w-40 text-left text-xs uppercase text-muted-foreground">Platform</th>
              ${intakeLabels.map((l, i) => `<th class="text-left text-xs uppercase text-muted-foreground" title="${intakeHints[i]}">${l}</th>`).join("")}
            </tr>
          </thead>
          <tbody>${intakeRows}</tbody>
        </table>
      </div>
      <div class="mt-4 space-y-2">
        <label class="flex items-center gap-2 text-xs text-muted-foreground normal-case">
          <input type="checkbox" />
          Also apply these rules to items already ingested
        </label>
        <button type="button" disabled title="Save these intake rules for how new content is handled" class="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted disabled:opacity-50">Save intake rules</button>
      </div>`,
  });

  const embedding = L.panel({
    eyebrow: "knowledge · vectors",
    title: "Semantic coverage",
    actions: `${L.pill("warn", "81% embedded")} ${L.pill("muted", "1,302 pending")}`,
    body: `
      <div class="mb-3 text-xs text-muted-foreground normal-case">
        Embedded items can be retrieved by meaning, so reply drafting passes only the passages
        related to a given comment instead of a broad keyword sweep. A background pass keeps this
        current; anything not yet embedded still falls back to keyword matching.
      </div>
      <div class="mb-3 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div class="h-full bg-primary transition-all" style="width: 81%"></div>
      </div>
      <dl class="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
        <div><dt class="text-xs uppercase text-muted-foreground">Items</dt><dd class="font-medium">6,829</dd></div>
        <div><dt class="text-xs uppercase text-muted-foreground">Embedded</dt><dd class="font-medium">5,527</dd></div>
        <div><dt class="text-xs uppercase text-muted-foreground">Chunks</dt><dd class="font-medium">14,310</dd></div>
        <div><dt class="text-xs uppercase text-muted-foreground">Last pass</dt><dd class="font-medium">Sep 26, 2026, 1:40 PM</dd></div>
      </dl>
      <ul class="mt-3 space-y-1 text-xs text-muted-foreground normal-case">
        <li class="flex justify-between gap-3"><span>brand_reply</span><span>1,619 / 1,619</span></li>
        <li class="flex justify-between gap-3"><span>comment</span><span>2,791 / 3,396</span></li>
        <li class="flex justify-between gap-3"><span>email_body</span><span>41 / 41</span></li>
        <li class="flex justify-between gap-3"><span>page</span><span>12 / 12</span></li>
        <li class="flex justify-between gap-3"><span>post</span><span>655 / 1,089</span></li>
        <li class="flex justify-between gap-3"><span>video</span><span>402 / 431</span></li>
        <li class="flex justify-between gap-3"><span>document</span><span>7 / 7</span></li>
      </ul>
      <div class="mt-4 flex flex-wrap items-center gap-3">
        <button type="button" title="Embed the next batch of pending knowledge items into vectors" class="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted disabled:opacity-50">Embed next batch</button>
        <button type="button" title="Run repeated embedding passes until the backlog is cleared" class="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">Build index</button>
      </div>`,
  });

  const bucket = (label, spent, spendable, own, ownLeft, borrow) => `
    <div class="rounded-sm ring-1 ring-border p-2">
      <div class="flex flex-wrap items-baseline justify-between gap-2">
        <div class="text-[11px] uppercase tracking-widest text-muted-foreground">${label}</div>
        <div class="text-[11px] font-mono">${spent} spent · ${spendable} spendable</div>
      </div>
      <div class="mt-1 text-[10px] font-mono text-muted-foreground">own share ${own} (${ownLeft} left)${borrow ? ` · +${borrow} borrowable from idle budget` : ""}</div>
    </div>`;
  const endpoint = (name, units, calls) => `
    <div class="flex items-baseline justify-between gap-3 text-[11px] font-mono">
      <span class="truncate">${name}</span>
      <span class="text-muted-foreground shrink-0">${units} units · ${calls} calls</span>
    </div>`;

  const quota = L.panel({
    eyebrow: "youtube api",
    title: "Daily Quota Budget",
    body: `
      <div class="space-y-4">
        <div class="flex flex-wrap items-center gap-3">
          ${L.pill("success", "6,158 units left")}
          <div class="text-[11px] font-mono text-muted-foreground">3,842 / 10,000 general-pool units spent · 2026-09-26 · resets midnight US/Pacific</div>
        </div>
        <div class="h-2 w-full rounded-sm bg-panel ring-1 ring-border overflow-hidden">
          <div class="h-full bg-primary" style="width: 38.42%"></div>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="rounded-sm ring-1 ring-border p-2">
            <div class="text-[11px] uppercase tracking-widest text-muted-foreground">Video uploads</div>
            <div class="text-[11px] font-mono mt-1">2 / 100 today</div>
            <div class="h-1.5 w-full rounded-sm bg-panel mt-1 overflow-hidden"><div class="h-full bg-primary" style="width: 2%"></div></div>
          </div>
          <div class="rounded-sm ring-1 ring-border p-2">
            <div class="text-[11px] uppercase tracking-widest text-muted-foreground">Searches</div>
            <div class="text-[11px] font-mono mt-1">14 / 100 today</div>
            <div class="h-1.5 w-full rounded-sm bg-panel mt-1 overflow-hidden"><div class="h-full bg-primary" style="width: 14%"></div></div>
          </div>
        </div>
        <div class="space-y-2">
          ${bucket("Ingest (videos, comments, analytics)", "2,910", "3,090", "6,000", "3,090", null)}
          ${bucket("Transcripts (captions API)", "800", "4,150", "2,500", "1,700", "2,450")}
          ${bucket("Reply posting", "132", "1,368", "1,500", "1,368", null)}
        </div>
        <div class="text-[11px] text-muted-foreground leading-relaxed">
          Shares are pacing ceilings, not private reservations. A phase spends its own share
          first, then borrows whatever the day's other phases left idle — only the ingest and
          reply minimum reserves below are protected. If a sweep is refused while units remain
          above, raise that phase's share or lower a minimum reserve.
        </div>
        <div>
          <div class="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Spend by endpoint</div>
          <div class="space-y-1">
            ${endpoint("captions.download", "800", "4")}
            ${endpoint("commentThreads.list", "1,944", "1,944")}
            ${endpoint("search.list", "1,400", "14")}
            ${endpoint("videos.list", "512", "512")}
            ${endpoint("comments.insert", "132", "132")}
          </div>
        </div>
      </div>`,
  });

  const stat = (label, value) => `
    <div class="p-3 rounded-sm ring-1 ring-border bg-panel">
      <div class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">${label}</div>
      <div class="mt-1 text-lg font-mono">${value}</div>
    </div>`;

  const backlog = L.panel({
    eyebrow: "youtube · transcripts",
    title: "Transcript backlog",
    actions: `${L.pill("warn", "7 retired")} ${L.pill("muted", "19 queued")}`,
    body: `
      <div class="mb-3 text-xs text-muted-foreground normal-case">
        The transcript sweep is not ETag-gated: it queues every video whose transcript is still
        empty and retries with unconditional caption requests, so a video YouTube reports as
        "unchanged" can never be hidden from it. After 5 failed attempts a video
        is retired from the queue — re-arm it here once captions exist or a permission issue is
        fixed.
      </div>
      <div class="space-y-3">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
          ${stat("videos with transcript", "412")}
          ${stat("drafts awaiting review", "3")}
          ${stat("queued for sweep", "19")}
          ${stat("retired at cap", "7")}
          ${stat("production-owned", "38")}
        </div>
        <div class="space-y-2">
          <div class="flex items-center gap-3">
            <button type="button" title="Show the list of retired videos" class="px-3 py-1.5 rounded-sm ring-1 ring-border text-[11px] font-mono uppercase tracking-widest hover:bg-panel inline-flex items-center gap-1">show retired videos ${L.icon("ChevronDown", "h-3 w-3")}</button>
            <button type="button" title="Re-queue every retired video so the transcript sweep retries them" class="px-3 py-1.5 rounded-sm ring-1 ring-border text-[11px] font-mono uppercase tracking-widest hover:bg-panel disabled:opacity-50">re-arm all retired</button>
            <span class="text-[11px] text-muted-foreground normal-case">Re-arming costs no quota; the next sweep tick retries captions.</span>
          </div>
        </div>
      </div>`,
  });

  const archiveCard = (p, resources, revisions, live, seeded, last) => `
    <div class="p-3 rounded-sm ring-1 ring-border bg-panel">
      <div class="flex items-baseline justify-between">
        <div class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">${p}</div>
        <div class="text-sm font-mono">${resources}</div>
      </div>
      <div class="mt-2 space-y-1 text-[11px] font-mono">
        <div class="flex items-center justify-between"><span class="text-muted-foreground uppercase tracking-widest">revisions</span><span>${revisions}</span></div>
        <div class="flex items-center justify-between"><span class="text-muted-foreground uppercase tracking-widest">from live calls</span><span>${live}</span></div>
        <div class="flex items-center justify-between"><span class="text-muted-foreground uppercase tracking-widest">seeded</span><span>${seeded}</span></div>
        <div class="flex items-center justify-between"><span class="text-muted-foreground uppercase tracking-widest">last archived</span><span>${last}</span></div>
      </div>
    </div>`;

  const archive = L.panel({
    eyebrow: "archive",
    title: "Raw API response archive",
    body: `
      <div class="mb-3 text-xs text-muted-foreground normal-case">
        Every provider payload is stored untrimmed and append-only, so fields we don't use today
        stay recoverable without re-hitting the API. Ongoing syncs fill this forward automatically —
        no new backfill is needed.
      </div>
      <div class="space-y-3">
        <div class="grid grid-cols-2 gap-3">
          ${stat("resources archived", "21,406")}
          ${stat("stored revisions", "33,918")}
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          ${archiveCard("YouTube", "13,342", "20,115", "8,730", "11,385", "Sep 26, 2026, 2:05 PM")}
          ${archiveCard("Facebook", "5,199", "8,040", "3,112", "4,928", "Sep 26, 2026, 1:58 PM")}
          ${archiveCard("Instagram", "2,565", "5,213", "1,402", "3,811", "Sep 24, 2026, 7:12 AM")}
          ${archiveCard("WordPress", "300", "550", "212", "338", "Sep 26, 2026, 12:30 PM")}
        </div>
        <div class="flex items-center gap-3 pt-1">
          <button type="button" title="Promote already-ingested payloads into the raw archive without calling the API" class="px-3 py-1.5 rounded-sm ring-1 ring-border text-[11px] font-mono uppercase tracking-widest hover:bg-panel disabled:opacity-50">seed from existing knowledge</button>
          <span class="text-[11px] text-muted-foreground normal-case">Zero API calls — promotes already-ingested payloads. Safe to re-run.</span>
        </div>
      </div>`,
  });

  const docs = [
    ["Northwind Kitchen voice guide 2026.pdf", "brand voice", "pdf", "1.4 MB", "34d ago", "indexed"],
    ["Recipe testing standards.docx", "policy", "docx", "212 KB", "34d ago", "indexed"],
    ["Pantry staples — product list.csv", "product", "csv", "18 KB", "21d ago", "indexed"],
    ["Allergen and substitution FAQ.md", "industry knowledge", "md", "9 KB", "12d ago", "indexed"],
    ["Sponsorship disclosure policy.pdf", "policy", "pdf", "486 KB", "9d ago", "indexed"],
    ["Cookbook chapter drafts.docx", "brand voice", "docx", "3.2 MB", "2d ago", "processing"],
  ];
  const docRows = docs
    .map(
      (d) => `
      <div class="px-4 py-3 grid grid-cols-12 items-center text-sm">
        <div class="col-span-5 truncate">${d[0]}</div>
        <div class="col-span-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">${d[1]}</div>
        <div class="col-span-1 text-[10px] font-mono text-muted-foreground uppercase">${d[2]}</div>
        <div class="col-span-1 text-[10px] font-mono text-muted-foreground">${d[3]}</div>
        <div class="col-span-2 text-[10px] font-mono text-muted-foreground">${d[4]}</div>
        <div class="col-span-1 flex justify-end items-center gap-2">
          ${L.pill(d[5] === "indexed" ? "success" : "warn", d[5])}
          <button aria-label="remove ${d[0]}" title="Delete ${d[0]} from brand knowledge" class="inline-flex items-center justify-center size-6 rounded-sm text-muted-foreground hover:text-danger hover:bg-danger/10 transition-colors">${L.icon("Trash2", "size-3.5")}</button>
        </div>
      </div>`,
    )
    .join("");

  const documents = L.panel({
    flush: true,
    title: "Brand knowledge &amp; documents",
    body: `
      <div class="p-4 border-b border-border grid grid-cols-2 md:grid-cols-4 gap-4">
        ${[["documents", "6"], ["indexed", "5"], ["processing", "1"], ["scope", "Northwind Kitchen"]]
          .map(
            ([k, v]) => `
          <div>
            <div class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">${k}</div>
            <div class="mt-1 text-sm font-medium truncate">${v}</div>
          </div>`,
          )
          .join("")}
      </div>
      <div class="p-4 border-b border-border flex flex-col md:flex-row md:items-center gap-3">
        <label class="flex items-center gap-2">
          <span class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">tag as</span>
          <select class="bg-panel-2 ring-1 ring-border rounded-sm px-2 py-1.5 text-xs font-mono focus:ring-primary focus:outline-none">
            <option value="brand_voice" selected>brand_voice</option>
            <option value="product">product</option>
            <option value="policy">policy</option>
            <option value="industry_knowledge">industry knowledge</option>
          </select>
        </label>
        <input type="file" multiple accept=".pdf,.docx,.md,.markdown,.txt,.csv" class="text-xs font-mono file:mr-3 file:text-[10px] file:uppercase file:tracking-widest file:font-mono file:bg-primary file:text-primary-foreground file:border-0 file:rounded-sm file:px-3 file:py-1.5 file:cursor-pointer disabled:opacity-50" />
        <span class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">pdf · docx · md · txt · csv — parsed to S3 + indexed into Snowflake KNOWLEDGE_ITEMS</span>
      </div>
      <div class="divide-y divide-border">
        <div class="px-4 py-2 grid grid-cols-12 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          <div class="col-span-5">document</div>
          <div class="col-span-2">tag</div>
          <div class="col-span-1">kind</div>
          <div class="col-span-1">size</div>
          <div class="col-span-2">uploaded</div>
          <div class="col-span-1 text-right">status</div>
        </div>
        ${docRows}
      </div>`,
  });

  const chip = (active, label, title) =>
    `<button title="${title}" class="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-sm ring-1 ${
      active ? "ring-primary text-primary bg-primary/10" : "ring-border text-muted-foreground hover:bg-panel-2"
    }">${label}</button>`;

  const platforms = ["youtube", "wordpress", "email", "document", "facebook", "instagram", "x", "tiktok", "linkedin", "linkedin_org"];
  const kinds = [["all", "all kinds"], ["posts", "posts"], ["comments", "comments"], ["brand_replies", "brand replies"], ["documents", "documents"]];
  const sorts = [["published_desc", "newest first"], ["content_type_asc", "content type A–Z"], ["content_type_desc", "content type Z–A"]];

  const kindChip = {
    comment: ["comment", "text-warn ring-warn/40"],
    post: ["post", "text-foreground ring-border"],
    document: ["document", "text-sky-400 ring-sky-500/40"],
  };
  const ctChip = { Video: "text-rose-400 ring-rose-500/40", Image: "text-violet-400 ring-violet-500/40" };

  const items = [
    { k: "comment", platform: "youtube", st: "comment", title: "Five pantry pastas in 20 minutes", body: "Could I make the lemon one with gluten-free spaghetti? Mine always goes mushy when I finish it in the pan.", date: "9/25/2026" },
    { k: "comment", platform: "instagram", st: "comment", title: "", body: "What brand of cast iron do you use? Mine rusts every time I wash it 😭", date: "9/25/2026" },
    { k: "post", platform: "youtube", st: "video", ct: "Video", title: "Cast-iron care in 60 seconds", body: "Quick routine for seasoning, cleaning and storing cast iron so it never rusts. Oil, heat, wipe, repeat.", date: "9/24/2026" },
    { k: "comment", platform: "facebook", st: "comment", title: "", body: "Tried the sheet-pan chicken tonight — the thighs were done way before the potatoes. Should I cut them smaller?", date: "9/24/2026" },
    { k: "post", platform: "instagram", st: "post", ct: "Image", title: "Market haul: September", body: "Figs, the last of the tomatoes and a mountain of zucchini. What should I cook first?", date: "9/23/2026" },
    { k: "comment", platform: "youtube", st: "comment", title: "Sourdough starter, day one", body: "Day 4 and my starter smells like nail polish remover, is it dead??", date: "9/22/2026" },
    { k: "post", platform: "wordpress", st: "post", title: "Brown butter banana bread", body: "The only banana bread recipe you need: brown butter, dark sugar and a crackly top.", date: "9/21/2026" },
    { k: "post", platform: "email", st: "email_body", title: "Re: Weeknight dal question", body: "Hi Alex, could you share the pressure-cooker timings for the dal from last week's newsletter?", date: "9/20/2026" },
    { k: "document", platform: "document", st: "docx", title: "Cookbook chapter drafts.docx", body: "Chapter 3 — The weeknight pantry. Every recipe here starts with things you already have.", date: "9/24/2026" },
  ];

  const itemRows = items
    .map((d) => {
      const [kl, kc] = kindChip[d.k];
      return `
      <tr class="hover:bg-panel-2/40 ">
        <td class="p-3"><input type="checkbox" class="accent-primary" /></td>
        <td class="p-3 font-mono text-[11px]">
          <span class="inline-block text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded-sm ring-1 ${kc}">${kl}</span>${
            d.ct
              ? `<span class="ml-1 inline-block text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded-sm ring-1 ${ctChip[d.ct]}">${d.ct.toLowerCase()}</span>`
              : ""
          }
          <div class="mt-1 text-muted-foreground">${d.platform} · ${d.st}</div>
          ${d.platform !== "document" && d.platform !== "email" ? `<a href="#" class="text-[10px] text-primary hover:underline">open →</a>` : ""}
        </td>
        <td class="p-3 max-w-lg">
          <div class="font-medium truncate">${d.title || "(untitled)"}</div>
          <div class="mt-1 text-[11px] text-muted-foreground line-clamp-2">${d.body}</div>
        </td>
        <td class="p-3 font-mono text-[11px] text-muted-foreground whitespace-nowrap">${d.date}</td>
        <td class="p-3">${L.pill("warn", "pending")}</td>
        <td class="p-3">
          <div class="flex items-center gap-1">
            <button title="Approve this item for the knowledge base" class="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-sm text-emerald-400 hover:bg-emerald-500/10 disabled:opacity-50">include</button>
            <button title="Reject this item from the knowledge base" class="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-sm text-destructive hover:bg-destructive/10 disabled:opacity-50">exclude</button>
          </div>
        </td>
      </tr>`;
    })
    .join("");

  const th = (inner) =>
    `<th class="p-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">${inner}</th>`;

  const curation = L.panel({
    eyebrow: "curation queue",
    title: "Knowledge items",
    body: `
      <div class="mb-4 space-y-3">
        <div class="flex flex-wrap items-center gap-2">
          ${["pending", "approved", "rejected", "all"].map((s) => chip(s === "pending", s, `Filter items by ${s} status`)).join("")}
          <span class="mx-2 h-4 w-px bg-border"></span>
          ${platforms.map((p) => chip(false, p, `Toggle the ${p} platform filter`)).join("")}
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground shrink-0">kind</span>
          ${kinds.map(([k, l]) => chip(k === "all", l, `Filter items by ${l}`)).join("")}
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground shrink-0">sort</span>
          ${sorts.map(([k, l]) => chip(k === "published_desc", l, `Sort items by ${l}`)).join("")}
        </div>
        <div class="flex items-center gap-2">
          <input placeholder="search posts, comments, and brand replies…" class="flex-1 bg-panel-2 ring-1 ring-border rounded-sm px-3 py-1.5 text-xs focus:outline-none focus:ring-primary" />
          <span class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground shrink-0">100 shown / ${fmt(gPending)} total</span>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead>
            <tr class="border-b border-border">
              ${th(`<input type="checkbox" class="accent-primary" aria-label="Select all" />`)}
              ${th("source")}
              ${th("title / preview")}
              ${th("published")}
              ${th("status")}
              ${th("actions")}
            </tr>
          </thead>
          <tbody class="divide-y divide-border">${itemRows}</tbody>
        </table>
      </div>`,
  });

  return L.page(
    `
    ${L.header({
      eyebrow: "seeding &amp; curation",
      title: "Brand Voice &amp; Knowledge registry",
      info: true,
      actions: `${L.pill("success", `${fmt(gApproved)} approved`)}${L.pill("warn", `${fmt(gPending)} pending`)}${L.pill("muted", "Snowflake · PROVENTEXT.BRAND_VOICE")}`,
    })}
    ${ingestion}
    ${kbTotals}
    ${intake}
    ${embedding}
    ${quota}
    ${backlog}
    ${archive}
    ${documents}
    ${curation}
  `,
    "max-w-[1200px]",
  );
};
