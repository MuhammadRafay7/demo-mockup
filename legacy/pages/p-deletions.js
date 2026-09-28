window.LEGACY = window.LEGACY || {};
window.LEGACY["p-deletions"] = () => {
  const btn = "text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-sm";
  const steps = (list) =>
    `<div class="flex flex-wrap gap-1.5">${list
      .map(
        ([step, rows, error]) =>
          `<span class="tag ${error ? "text-danger" : "text-muted-foreground"}">${step.replace(/_/g, " ")}${
            typeof rows === "number" ? ` · ${rows}` : ""
          }</span>`,
      )
      .join("")}</div>`;
  const meta = (received, brands, conns, attempts) =>
    `received ${received} · ${brands} brand${brands === 1 ? "" : "s"} · ${conns} connection${conns === 1 ? "" : "s"} · ${attempts} attempt${attempts === 1 ? "" : "s"}`;
  const head = (code, metaLine, tone, status) => `
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="min-w-0">
        <div class="font-mono text-sm tracking-wider">${code}</div>
        <div class="text-[10px] font-mono text-muted-foreground">${metaLine}</div>
      </div>
      ${L.pill(tone, status)}
    </div>`;

  const awaiting = `
    <div class="p-4 space-y-3">
      ${head("KMGT7QX4RZ2HNPW9CV3D", meta("9/24/2026", 1, 1, 1), "warn", "awaiting approval")}
      ${steps([
        ["freeze_inbound", 1],
        ["delete_connections", 1],
        ["windsor", 3],
      ])}
      <div class="space-y-2">
        <div class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">auto-approves in 12 days</div>
        <textarea rows="2" placeholder="Reason — required to decline. The requester reads this verbatim." class="input-base w-full text-sm"></textarea>
        <div class="flex gap-2">
          <button title="Queue the content removal for this request" class="${btn} bg-primary text-primary-foreground disabled:opacity-50">approve</button>
          <button disabled title="Decline the content removal. A written reason is required." class="${btn} ring-1 ring-danger/30 text-danger hover:bg-danger/10 disabled:opacity-50">decline</button>
        </div>
      </div>
    </div>`;

  const partial = `
    <div class="p-4 space-y-3">
      ${head("B8NR4TWXH2KQ6MZP3JDV", meta("9/11/2026", 1, 2, 3), "danger", "partial")}
      ${steps([
        ["freeze_inbound", 2],
        ["delete_connections", 2],
        ["windsor", 4],
        ["supabase_purge", 1284],
        ["warehouse", 0, true],
      ])}
      <div class="text-xs text-danger break-words">warehouse: statement timed out after 300s on social_posts_raw</div>
      <div class="space-y-2">
        <textarea rows="2" placeholder="What was resolved by hand. Required to close." class="input-base w-full text-sm"></textarea>
        <button disabled title="Close this request. Nothing closes a partial automatically." class="${btn} ring-1 ring-border hover:bg-panel-2 disabled:opacity-50">close by hand</button>
      </div>
    </div>`;

  const completed = `
    <div class="p-4 space-y-3">
      ${head("7HQW2NXC4RTK9MPZ8DJV", meta("8/30/2026", 1, 1, 1), "success", "completed")}
      ${steps([
        ["freeze_inbound", 1],
        ["delete_connections", 1],
        ["windsor", 2],
        ["supabase_purge", 642],
        ["warehouse", 918],
        ["reply_mirror", 37],
        ["object_storage", 58],
      ])}
      <div class="text-xs text-muted-foreground">Confirmed with the page owner; approved.</div>
    </div>`;

  return L.page(
    `
    ${L.header({
      eyebrow: "Platform · superuser",
      title: "Meta deletion requests",
      info: true,
      actions: L.pill("warn", "2 to review"),
    })}

    ${L.panel({
      flush: true,
      title: "Meta user ID backfill",
      body: `
        <div class="p-4 space-y-3">
          <p class="text-sm text-muted-foreground">
            A connection with no <code>meta_user_id</code> cannot be matched by either Meta
            callback, so a deletion request against it resolves to nothing. This reads each
            row&rsquo;s own token once and stores the id it returns. Rows whose token is dead are
            left alone &mdash; the email route covers those.
          </p>
          <div class="flex flex-wrap gap-2">
            <button title="Count what would change" class="${btn} disabled:opacity-50 ring-1 ring-border hover:bg-panel-2">dry run</button>
            <button title="Write the ids" class="${btn} disabled:opacity-50 bg-primary text-primary-foreground">backfill</button>
          </div>
        </div>`,
    })}

    ${L.panel({
      title: "Requests · 3",
      body: `<div class="divide-y divide-border">${awaiting}${partial}${completed}</div>`,
    })}
  `,
    "max-w-[1100px]",
  );
};
