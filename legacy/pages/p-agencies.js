window.LEGACY = window.LEGACY || {};
window.LEGACY["p-agencies"] = () => {
  const labelCls =
    "mb-1 block text-[10px] font-mono uppercase tracking-widest text-muted-foreground";
  const chevron = L.icon(
    "ChevronDown",
    "pointer-events-none absolute right-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground",
  );
  const agencies = [
    {
      name: "Greenleaf Agency",
      active: true,
      tier: "Agency 10",
      used: 4,
      allowance: 10,
      members: 3,
      cost: "$83.33",
    },
    {
      name: "Brightside Media",
      active: true,
      tier: "Agency 3",
      used: 3,
      allowance: 3,
      members: 2,
      cost: "$97.19",
    },
  ];
  const rows = agencies
    .map(
      (a) => `
      <div>
        <button type="button" title="Expand or collapse this agency's details" class="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-panel-2">
          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <span class="truncate font-medium">${a.name}</span>
              ${L.pill(a.active ? "success" : "muted", a.active ? "active" : "inactive")}
              <span class="tag">${a.tier}</span>
            </div>
            <div class="mt-0.5 text-xs text-muted-foreground font-mono">
              ${a.used}/${a.allowance} brands · ${a.members} member${a.members === 1 ? "" : "s"} · Octaneon cost ${a.cost}/brand/mo
            </div>
          </div>
          ${L.icon("ChevronDown", "size-4 shrink-0 text-muted-foreground transition-transform")}
        </button>
      </div>`,
    )
    .join("");

  return L.page(
    `
    ${L.header({
      eyebrow: "Platform",
      title: "Agencies",
      info: true,
      actions: `<a href="#" class="rounded-sm px-3 py-1.5 text-[11px] font-mono uppercase tracking-widest ring-1 ring-border">Manage tiers</a>`,
    })}

    ${L.panel({
      title: "New agency",
      body: `
        <div class="flex flex-wrap items-end gap-3">
          <label class="block min-w-56 flex-1">
            <span class="${labelCls}">agency name</span>
            <input class="input-base" placeholder="Northlight Media" />
          </label>
          <label class="block min-w-56">
            <span class="${labelCls}">tier</span>
            <div class="relative">
              <select class="input-base appearance-none pr-8">
                <option value="">No tier yet</option>
                <option>Agency 10 — 10 brands · $9,999 / 12 mo</option>
                <option>Agency 3 — 3 brands · $3,499 / 12 mo</option>
                <option>Agency 3 · half-year — 3 brands · $2,999 / 6 mo</option>
              </select>
              ${chevron}
            </div>
          </label>
          <button type="button" disabled title="Create a new agency with the selected tier" class="rounded-sm bg-primary px-3 py-2 text-[11px] font-mono uppercase tracking-widest text-primary-foreground disabled:opacity-50">Create agency</button>
        </div>`,
    })}

    ${L.panel({
      title: `Agencies (${agencies.length})`,
      flush: true,
      body: `<div class="divide-y divide-border">${rows}</div>`,
    })}
  `,
    "max-w-[1400px]",
  );
};
