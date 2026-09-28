window.LEGACY = window.LEGACY || {};
window.LEGACY["p-integrations"] = () => {
  const integrations = [
    { name: "Zernio", detail: "unified social API", status: "healthy", latency: "142ms" },
    { name: "WordPress", detail: "site ingest + publish", status: "healthy", latency: "88ms" },
    { name: "Deepgram", detail: "transcription", status: "healthy", latency: "212ms" },
    { name: "LLM Provider", detail: "gpt-4o / claude sonnet", status: "healthy", latency: "980ms" },
    { name: "Snowflake", detail: "analytics SoR", status: "healthy", latency: "310ms" },
    { name: "S3", detail: "media / raw / exports", status: "healthy", latency: "44ms" },
    { name: "DynamoDB", detail: "settings / jobs / schedules", status: "degraded", latency: "612ms" },
    { name: "Secrets Manager", detail: "OAuth + API keys", status: "healthy", latency: "51ms" },
    { name: "YouTube $", detail: "monetary scopes", status: "healthy", latency: "402ms" },
  ];
  const catalog = [
    ["Operators (browser)", "Control plane", "HTTPS", "Setup, calendar, upload, curate, approve, analyze"],
    ["Control plane", "API Gateway", "HTTPS / invoke", "Backend entry"],
    ["Hermes Agent", "MCP tool server", "MCP", "Same actions as control plane"],
    ["API Gateway", "Orchestrator Lambdas", "AWS invoke", "Ingest, generate, analyze, schedule"],
    ["EventBridge", "Orchestrator", "Scheduled rules", "Daily sync, offset publish, gap scoring"],
    ["Orchestrator", "SQS", "Queue", "Async AI · transcription · embedding"],
    ["Orchestrator", "S3", "S3 API", "Media · raw payloads · exports"],
    ["Orchestrator", "DynamoDB", "DynamoDB API", "Workspace · jobs · approvals · flags"],
    ["Orchestrator", "Secrets Manager", "Secrets API", "Zernio · OAuth · Deepgram · LLM"],
    ["Orchestrator", "Snowflake", "SQL MERGE", "Posts · comments · metrics · revenue"],
    ["Orchestrator", "Vector / RAG", "HTTPS upsert", "Human-approved voice + KB only"],
    ["Orchestrator", "Zernio", "HTTPS + API key", "Social analytics + inbox"],
    ["Zernio", "Social platforms", "OAuth (in Zernio)", "Read posts, analytics, comments"],
    ["Orchestrator", "YouTube monetary", "Google API + OAuth", "Creator revenue / CPM"],
    ["Orchestrator", "WordPress", "WP REST", "Ingest site copy · publish-back"],
    ["Media worker", "Deepgram", "HTTPS API", "Transcripts"],
    ["AI Lambdas", "LLM provider", "HTTPS API", "Drafts, replies, topic clustering"],
    ["Publish clients", "Platforms / WP", "Publish APIs", "Only if auto_post_* enabled (default off)"],
    ["Hermes gateway", "Messaging apps", "Bot APIs", "Approval nudges, gap alerts"],
  ];
  const secrets = [
    ["Zernio API key", "Orchestrator → Zernio HTTPS"],
    ["WordPress app password / OAuth", "Orchestrator → WP REST"],
    ["Deepgram API key", "Transcript worker → Deepgram"],
    ["LLM provider API key", "AI Lambdas → LLM HTTPS"],
    ["YouTube OAuth (monetary + publish)", "Orchestrator → Google APIs"],
    ["Platform publish tokens", "Publish clients → Meta / X / TikTok (flagged)"],
    ["Hermes ↔ MCP auth", "Hermes runtime → MCP tool server"],
    ["Control plane session", "Operators → Control plane / API Gateway"],
  ];
  const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const tone = (s) => (s === "healthy" ? "success" : s === "degraded" ? "warn" : "danger");
  const th = (t) =>
    `<th class="p-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">${t}</th>`;

  return L.page(
    `
    ${L.header({ eyebrow: "System integration topology", title: "Integrations", info: true })}

    <section class="grid grid-cols-2 lg:grid-cols-3 gap-3">
      ${integrations
        .map(
          (i) => `
        <div class="panel rounded-sm p-4">
          <div class="flex items-center justify-between mb-2">
            <div class="text-sm font-semibold">${i.name}</div>
            ${L.pill(tone(i.status), i.status)}
          </div>
          <div class="text-xs text-muted-foreground">${i.detail}</div>
          <div class="mt-3 pt-3 border-t border-border grid grid-cols-2 gap-2 text-[11px] font-mono">
            <div>
              <div class="text-muted-foreground text-[9px] uppercase">p50 latency</div>
              <div>${i.latency}</div>
            </div>
            <div>
              <div class="text-muted-foreground text-[9px] uppercase">24h calls</div>
              <div>${fmt(1200 + i.name.length * 317)}</div>
            </div>
          </div>
        </div>`,
        )
        .join("")}
    </section>

    ${L.panel({
      flush: true,
      eyebrow: "connection catalog",
      title: "From → To",
      body: `
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead>
              <tr class="border-b border-border">${th("from")}${th("to")}${th("how tied")}${th("purpose")}</tr>
            </thead>
            <tbody class="divide-y divide-border">
              ${catalog
                .map(
                  ([from, to, how, purpose]) => `
                <tr class="hover:bg-panel-2/40">
                  <td class="p-3">${from}</td>
                  <td class="p-3">${to}</td>
                  <td class="p-3 font-mono text-[11px] text-primary">${how}</td>
                  <td class="p-3 text-muted-foreground">${purpose}</td>
                </tr>`,
                )
                .join("")}
            </tbody>
          </table>
        </div>`,
    })}

    ${L.panel({
      eyebrow: "auth & secrets map",
      title: "Secrets Manager entries",
      body: `
        <ul class="divide-y divide-border text-sm">
          ${secrets
            .map(
              ([name, path]) => `
            <li class="grid grid-cols-[280px_1fr] px-4 py-3 gap-4">
              <span class="font-mono text-[11px]">${name}</span>
              <span class="text-muted-foreground text-xs">${path}</span>
            </li>`,
            )
            .join("")}
        </ul>`,
    })}
  `,
    "max-w-[1300px]",
  );
};
