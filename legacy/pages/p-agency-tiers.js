window.LEGACY = window.LEGACY || {};
window.LEGACY["p-agency-tiers"] = () => {
  const tiers = [
    { name: "Agency 10", description: "10 brand workspaces, billed annually", brands: 10, price: "$9,999", term: 12, cost: "$83.33", archived: false },
    { name: "Agency 3", description: "3 brand workspaces, billed annually", brands: 3, price: "$3,499", term: 12, cost: "$97.19", archived: false },
    { name: "Agency 3 · half-year", description: "3 brand workspaces, 6-month term", brands: 3, price: "$2,999", term: 6, cost: "$166.61", archived: false },
  ];
  const rows = tiers
    .map(
      (t) => `
      <tr class="border-b border-border/60">
        <td class="px-4 py-2">
          <div class="font-medium">${t.name}</div>
          <div class="text-xs text-muted-foreground">${t.description}</div>
        </td>
        <td class="px-4 py-2 text-right font-mono">${t.brands}</td>
        <td class="px-4 py-2 text-right font-mono">${t.price}</td>
        <td class="px-4 py-2 text-right font-mono">${t.term} mo</td>
        <td class="px-4 py-2 text-right font-mono">${t.cost}</td>
        <td class="px-4 py-2">${L.pill(t.archived ? "muted" : "success", t.archived ? "archived" : "active")}</td>
        <td class="px-4 py-2 text-right whitespace-nowrap">
          <button type="button" title="Edit this tier's settings" class="rounded-sm px-2 py-1 text-[11px] font-mono uppercase tracking-widest ring-1 ring-border">Edit</button>
          <button type="button" title="Archive this tier so it can no longer be assigned" class="rounded-sm px-2 py-1 text-[11px] font-mono uppercase tracking-widest ring-1 ring-border">${t.archived ? "Restore" : "Archive"}</button>
        </td>
      </tr>`,
    )
    .join("");

  return L.page(
    `
    ${L.header({
      eyebrow: "Platform",
      title: "Agency Tiers",
      info: true,
      actions: `<button type="button" title="Start creating a new agency tier" class="rounded-sm bg-primary px-3 py-1.5 text-[11px] font-mono uppercase tracking-widest text-primary-foreground">New tier</button>`,
    })}

    ${L.panel({
      title: "Tier catalog",
      flush: true,
      body: `
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              <tr class="border-b border-border">
                <th class="px-4 py-2 text-left">Tier</th>
                <th class="px-4 py-2 text-right">Brands</th>
                <th class="px-4 py-2 text-right">Price</th>
                <th class="px-4 py-2 text-right">Term</th>
                <th class="px-4 py-2 text-right">Cost / brand / mo</th>
                <th class="px-4 py-2 text-left">Status</th>
                <th class="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>`,
    })}
  `,
    "max-w-[1400px]",
  );
};
