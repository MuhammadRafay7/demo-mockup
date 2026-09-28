window.LEGACY = window.LEGACY || {};
window.LEGACY["p-brands"] = () => {
  const brands = [
    { name: "Northwind Kitchen", slug: "northwind-kitchen", members: 4, created: "3/14/2025" },
    { name: "Holloway Garden Co.", slug: "holloway-garden-co", members: 3, created: "6/2/2025" },
    { name: "Pharmabuilt", slug: "pharmabuilt", members: 6, created: "8/19/2025" },
    { name: "Local Proof Digital", slug: "local-proof-digital", members: 2, created: "1/7/2026" },
    { name: "Title Case Studio", slug: "title-case-studio", members: 3, created: "7/22/2026" },
  ];
  const list = brands
    .map(
      (b) => `
      <div class="p-3 flex items-center justify-between gap-3">
        <div class="min-w-0">
          <div class="text-sm truncate">${b.name}</div>
          <div class="text-[10px] font-mono text-muted-foreground truncate">
            slug ${b.slug} · ${b.members} member${b.members === 1 ? "" : "s"} · created ${b.created}
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button title="Switch into this brand's workspace as an operator" class="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-sm bg-primary/10 text-primary ring-1 ring-primary/30 hover:bg-primary/20">enter</button>
          <button title="Rename this brand workspace" class="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-sm ring-1 ring-border hover:bg-panel-2">rename</button>
          <button title="Permanently delete this brand and its members" class="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-sm ring-1 ring-danger/30 text-danger hover:bg-danger/10">delete</button>
        </div>
      </div>`,
    )
    .join("");

  return L.page(
    `
    ${L.header({
      eyebrow: "Platform · superuser",
      title: "All brands",
      info: true,
      actions: L.pill("danger", "platform owner"),
    })}

    ${L.panel({
      flush: true,
      title: "Create brand",
      body: `
        <div class="p-4 flex flex-wrap items-end gap-3">
          <label class="flex-1 min-w-[240px]">
            <span class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">name</span>
            <input placeholder="New brand workspace" class="mt-1 w-full bg-panel-2 ring-1 ring-border rounded-sm px-3 py-2 text-sm focus:ring-primary focus:outline-none" />
          </label>
          <button disabled title="Create a new brand workspace" class="text-[11px] font-mono uppercase tracking-widest px-4 py-2 rounded-sm bg-primary text-primary-foreground disabled:opacity-50">create</button>
        </div>`,
    })}

    ${L.panel({
      title: `Brands · ${brands.length}`,
      body: `<div class="divide-y divide-border">${list}</div>`,
    })}
  `,
    "max-w-[1100px]",
  );
};
