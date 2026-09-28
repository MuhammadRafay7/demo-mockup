window.LEGACY = window.LEGACY || {};
window.LEGACY["p-dashboard"] = () => {
  const brands = [
    { name: "Northwind Kitchen", slug: "northwind-kitchen", members: 4, admins: 2, pending: 1, activity: 82, created: "3/14/2025" },
    { name: "Holloway Garden Co.", slug: "holloway-garden-co", members: 3, admins: 1, pending: 0, activity: 57, created: "6/2/2025" },
    { name: "Pharmabuilt", slug: "pharmabuilt", members: 6, admins: 2, pending: 2, activity: 91, created: "8/19/2025" },
    { name: "Local Proof Digital", slug: "local-proof-digital", members: 2, admins: 1, pending: 0, activity: 34, created: "1/7/2026" },
    { name: "Title Case Studio", slug: "title-case-studio", members: 3, admins: 1, pending: 0, activity: 46, created: "7/22/2026" },
  ];
  const kpi = (label, value, toneCls = "text-foreground") => `
    <div class="panel rounded-sm p-4">
      <div class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">${label}</div>
      <div class="mt-2 text-2xl font-semibold tabular-nums ${toneCls}">${value}</div>
    </div>`;
  const rows = brands
    .map(
      (b) => `
      <tr class="border-b border-border/60 hover:bg-panel-2/40">
        <td class="px-4 py-2 truncate max-w-[240px]">${b.name}</td>
        <td class="px-4 py-2 font-mono text-[11px] text-muted-foreground truncate max-w-[200px]">${b.slug}</td>
        <td class="px-4 py-2 text-right font-mono text-[11px]">${b.members}</td>
        <td class="px-4 py-2 text-right font-mono text-[11px]">${b.admins}</td>
        <td class="px-4 py-2 text-right font-mono text-[11px]">${
          b.pending > 0 ? `<span class="text-warn">${b.pending}</span>` : `<span class="text-muted-foreground">0</span>`
        }</td>
        <td class="px-4 py-2">
          <div class="flex items-center gap-2 justify-end">
            <div class="w-24 h-1.5 bg-panel-2 rounded-full overflow-hidden">
              <div class="h-full bg-primary" style="width: ${b.activity}%"></div>
            </div>
            <span class="text-[10px] font-mono text-muted-foreground w-8 text-right">${b.activity}</span>
          </div>
        </td>
        <td class="px-4 py-2 text-right font-mono text-[11px] text-muted-foreground">${b.created}</td>
        <td class="px-4 py-2 pr-4 text-right">
          <button title="Switch into this brand's workspace as an operator" class="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-sm bg-primary/10 text-primary ring-1 ring-primary/30 hover:bg-primary/20">enter</button>
        </td>
      </tr>`,
    )
    .join("");

  return L.page(
    `
    ${L.header({
      eyebrow: "Platform · superuser",
      title: "Platform dashboard",
      info: true,
      actions: L.pill("danger", "platform owner"),
    })}

    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      ${kpi("brands", 5)}
      ${kpi("members", 18)}
      ${kpi("brand admins", 7)}
      ${kpi("pending invites", 3, "text-warn")}
    </div>

    ${L.panel({
      flush: true,
      title: "Jump into a brand",
      eyebrow: "operator view",
      body: `
        <div class="p-4 flex flex-wrap items-end gap-3">
          <label class="flex-1 min-w-[260px]">
            <span class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">select brand</span>
            <select class="mt-1 w-full bg-panel-2 ring-1 ring-border rounded-sm px-3 py-2 text-sm focus:ring-primary focus:outline-none">
              <option value="">— choose a brand —</option>
              ${brands.map((b) => `<option>${b.name} · ${b.slug}</option>`).join("")}
            </select>
          </label>
          <button disabled title="Switch into the selected brand's workspace" class="text-[11px] font-mono uppercase tracking-widest px-4 py-2 rounded-sm bg-primary text-primary-foreground disabled:opacity-50">enter brand</button>
          <a href="#" title="Go to the brands console to add, rename, or delete brands" class="text-[11px] font-mono uppercase tracking-widest px-4 py-2 rounded-sm ring-1 ring-border hover:bg-panel-2">manage brands</a>
        </div>
        <div class="px-4 pb-4 text-[10px] font-mono text-muted-foreground">
          As platform owner you can also switch brands anytime from the top-bar dropdown.
        </div>`,
    })}

    ${L.panel({
      flush: true,
      title: `Brand roster · ${brands.length}`,
      eyebrow: "live",
      body: `
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground border-b border-border">
                <th class="text-left px-4 py-2">brand</th>
                <th class="text-left px-4 py-2">slug</th>
                <th class="text-right px-4 py-2">members</th>
                <th class="text-right px-4 py-2">admins</th>
                <th class="text-right px-4 py-2">pending</th>
                <th class="text-right px-4 py-2">activity</th>
                <th class="text-right px-4 py-2">created</th>
                <th class="text-right px-4 py-2 pr-4">actions</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>`,
    })}
  `,
    "max-w-[1200px]",
  );
};
