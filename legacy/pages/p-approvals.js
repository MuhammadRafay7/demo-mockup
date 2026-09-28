window.LEGACY = window.LEGACY || {};
window.LEGACY["p-approvals"] = () => {
  const filters = ["pending", "approved", "rejected", "all"];
  const requests = [
    { name: "Priya Shah", email: "priya@hollowaygarden.example", requested: "9/26/2026, 8:41:17 AM" },
    { name: "Marcus Bell", email: "marcus@titlecase.example", requested: "9/25/2026, 4:12:08 PM" },
    { name: "Jordan Lee", email: "jordan.lee@greenleaf.example", requested: "9/24/2026, 11:03:52 AM" },
  ];
  const rows = requests
    .map(
      (r) => `
      <div class="flex flex-wrap items-center gap-3 py-3">
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2">
            ${L.pill("warn", "pending")}
            <span class="truncate text-sm font-medium">${r.name}</span>
          </div>
          <p class="mt-1 truncate text-xs text-muted-foreground">${r.email} · requested ${r.requested}</p>
        </div>
        <div class="flex items-center gap-2">
          <div class="relative w-44">
            <input placeholder="optional note" class="w-44 rounded-sm bg-background px-2 py-1 pr-14 text-xs ring-1 ring-border" />
            <span aria-live="polite" class="pointer-events-none select-none tabular-nums text-[10px] leading-none text-muted-foreground absolute bottom-1.5 right-2 z-10">0 / 500</span>
          </div>
          <button type="button" title="Grant this user access to the console" class="rounded-sm bg-primary px-3 py-1 text-xs font-medium text-primary-foreground disabled:opacity-60">Approve</button>
          <button type="button" title="Reject this account request" class="rounded-sm px-3 py-1 text-xs text-muted-foreground ring-1 ring-border hover:text-foreground disabled:opacity-60">Decline</button>
        </div>
      </div>`,
    )
    .join("");

  return L.page(`
    ${L.header({ title: "Account Approvals", info: true })}

    <div class="flex flex-wrap items-center gap-2">
      ${filters
        .map(
          (f) =>
            `<button type="button" title="Show ${f} account requests" class="rounded-sm px-3 py-1 text-[11px] font-mono uppercase tracking-widest ring-1 ring-border ${
              f === "pending" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }">${f}</button>`,
        )
        .join("")}
    </div>

    ${L.panel({
      title: `Requests (${requests.length})`,
      body: `<div class="divide-y divide-border">${rows}</div>`,
    })}
  `);
};
