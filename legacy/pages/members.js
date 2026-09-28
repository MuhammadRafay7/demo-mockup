window.LEGACY = window.LEGACY || {};
window.LEGACY["members"] = () => {
  const smallBtn =
    "text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-sm ring-1 ring-border hover:bg-panel-2";
  const dangerBtn =
    "text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-sm ring-1 ring-danger/30 text-danger hover:bg-danger/10";
  const roleSelect = (role, disabled) =>
    `<select${disabled ? " disabled" : ""} class="text-[10px] font-mono uppercase tracking-widest bg-panel-2 ring-1 ring-border rounded-sm px-2 py-1"><option${role === "member" ? " selected" : ""}>member</option><option${role === "admin" ? " selected" : ""}>admin</option></select>`;

  const invites = [
    { email: "jordan@northwindkitchen.example", role: "member", token: "f3a91c07be", expires: "10/1/2026" },
    { email: "priya.shah@northwindkitchen.example", role: "admin", token: "7d20e4a5c1", expired: true },
  ];
  const members = [
    { name: "Alex Kim", email: "alex@northwindkitchen.example", role: "admin", self: true },
    { name: "Sam Rivera", email: "sam@northwindkitchen.example", role: "member" },
    { name: null, email: "editor@northwindkitchen.example", role: "member" },
  ];

  const invitePanel = L.panel({
    title: "Invite by email",
    flush: true,
    body: `
      <div class="p-4 flex flex-wrap items-end gap-3">
        <label class="flex-1 min-w-[240px]">
          <span class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">email</span>
          <input type="email" placeholder="operator@example.com" class="mt-1 w-full bg-panel-2 ring-1 ring-border rounded-sm px-3 py-2 text-sm focus:ring-primary focus:outline-none">
        </label>
        <label>
          <span class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">role</span>
          <select class="mt-1 bg-panel-2 ring-1 ring-border rounded-sm px-3 py-2 text-sm"><option>member</option><option>admin</option></select>
        </label>
        <button disabled class="text-[11px] font-mono uppercase tracking-widest px-4 py-2 rounded-sm bg-primary text-primary-foreground disabled:opacity-50">send invite</button>
      </div>`,
  });

  const pendingPanel = L.panel({
    title: `Pending invitations · ${invites.length}`,
    body: `
      <div class="divide-y divide-border">
        ${invites
          .map(
            (i) => `
        <div class="p-3 flex items-center justify-between gap-3">
          <div class="min-w-0">
            <div class="text-sm truncate">${i.email}</div>
            <div class="text-[10px] font-mono text-muted-foreground">role ${i.role} · token ${i.token}… · ${
              i.expired
                ? `<span class="text-warn">expired — resend to issue a new link</span>`
                : `expires ${i.expires}`
            }</div>
          </div>
          <div class="flex items-center gap-2">
            <button class="${smallBtn} disabled:opacity-50">resend email</button>
            <button class="${smallBtn}">copy link</button>
            <button class="${dangerBtn}">revoke</button>
          </div>
        </div>`,
          )
          .join("")}
      </div>`,
  });

  const membersPanel = L.panel({
    title: `Members · ${members.length}`,
    body: `
      <div class="divide-y divide-border">
        ${members
          .map(
            (m) => `
        <div class="p-3 flex items-center justify-between gap-3">
          <div class="min-w-0">
            <div class="text-sm truncate">${m.name || m.email}</div>
            <div class="text-[10px] font-mono text-muted-foreground truncate">${m.email}</div>
          </div>
          <div class="flex items-center gap-2">
            ${roleSelect(m.role, m.self)}
            ${m.self ? "" : `<button class="${dangerBtn}">remove</button>`}
          </div>
        </div>`,
          )
          .join("")}
      </div>`,
  });

  return L.page(
    `
    ${L.header({
      eyebrow: "Northwind Kitchen · membership",
      title: "Brand members",
      info: true,
      actions: L.pill("success", "admin"),
    })}
    ${invitePanel}
    ${pendingPanel}
    ${membersPanel}
  `,
    "max-w-[1100px]",
  );
};
