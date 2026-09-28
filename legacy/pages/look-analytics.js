window.LEGACY = window.LEGACY || {};
window.LEGACY["look-analytics"] = () => {
  const rounds = [
    { round: 1, liked: 3, rejected: 5, build: 14, wait: 380, cost: null, verdict: "rejected", stability: 0.62 },
    { round: 2, liked: 4, rejected: 4, build: 12, wait: 95, cost: null, verdict: "approved", stability: 0.41 },
    { round: 3, liked: 5, rejected: 3, build: 16, wait: 1260, cost: 1.84, verdict: "approved", stability: 0.24 },
    { round: 4, liked: 6, rejected: 2, build: 11, wait: 42, cost: 1.62, verdict: "approved", stability: 0.12 },
    { round: 5, liked: 5, rejected: 3, build: 13, wait: 210, cost: 1.77, verdict: null, stability: 0.19 },
    { round: 6, liked: 7, rejected: 1, build: 12, wait: 28, cost: 1.58, verdict: "approved", stability: 0.09 },
  ];
  const threshold = 0.15;
  const mins = (v) => (v == null ? "—" : v < 60 ? `${v.toFixed(0)} min` : `${(v / 60).toFixed(1)} h`);
  const money = (v) => (v == null ? "—" : `$${v.toFixed(2)}`);

  const figure = (label, value) => `
    <div>
      <div class="text-xs uppercase text-muted-foreground">${label}</div>
      <div class="text-lg font-medium">${value}</div>
    </div>`;

  const stands = L.panel({
    title: "Where the look stands",
    actions: L.pill("primary", "training"),
    body: `
      <div class="grid gap-4 sm:grid-cols-4">
        ${figure("Rounds done", "6 of 10")}
        ${figure("Covers built", "48")}
        ${figure("You'd publish", "63%")}
        ${figure("Steady rounds in a row", "1 of 2")}
      </div>
      <p class="mt-4 text-sm text-muted-foreground">One more steady round and the look settles.</p>`,
  });

  const W = 1050;
  const axes = (H, yTicks, yLabel, y, n, cx) => {
    const Lx = 60;
    const R = W - 8;
    const T = 8;
    const B = H - 30;
    let out = "";
    for (const t of yTicks) {
      out += `<line x1="${Lx}" x2="${R}" y1="${y(t)}" y2="${y(t)}" class="stroke-border" stroke-dasharray="3 3" />`;
      out += `<text x="${Lx - 6}" y="${y(t) + 4}" text-anchor="end" font-size="12" class="fill-muted-foreground">${yLabel(t)}</text>`;
    }
    for (let i = 0; i < n; i++) {
      out += `<line x1="${cx(i)}" x2="${cx(i)}" y1="${T}" y2="${B}" class="stroke-border" stroke-dasharray="3 3" />`;
    }
    out += `<line x1="${Lx}" x2="${R}" y1="${B}" y2="${B}" class="stroke-muted-foreground" stroke-opacity="0.6" />`;
    out += `<line x1="${Lx}" x2="${Lx}" y1="${T}" y2="${B}" class="stroke-muted-foreground" stroke-opacity="0.6" />`;
    return out;
  };

  const barsSvg = (() => {
    const H = 288;
    const Lx = 60;
    const R = W - 8;
    const T = 8;
    const B = H - 30;
    const yMax = 8;
    const y = (v) => B - (v / yMax) * (B - T);
    const bw = (R - Lx) / rounds.length;
    const cx = (i) => Lx + bw * (i + 0.5);
    let out = axes(H, [0, 2, 4, 6, 8], String, y, rounds.length, cx);
    rounds.forEach((r, i) => {
      const slot = (bw * 0.8 - 4) / 2;
      const x0 = cx(i) - bw * 0.4;
      out += `<rect x="${x0}" y="${y(r.liked)}" width="${slot}" height="${B - y(r.liked)}" rx="3" class="fill-primary" />`;
      out += `<rect x="${x0 + slot + 4}" y="${y(r.rejected)}" width="${slot}" height="${B - y(r.rejected)}" rx="3" class="fill-danger" />`;
      out += `<text x="${cx(i)}" y="${B + 16}" text-anchor="middle" font-size="12" class="fill-muted-foreground">R${r.round}</text>`;
    });
    return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" class="w-full h-full">${out}</svg>`;
  })();

  const lineSvg = (() => {
    const H = 256;
    const Lx = 60;
    const R = W - 8;
    const T = 8;
    const B = H - 30;
    const yMax = 0.8;
    const y = (v) => B - (v / yMax) * (B - T);
    const n = rounds.length;
    const cx = (i) => Lx + ((R - Lx) * i) / (n - 1);
    let out = axes(H, [0, 0.2, 0.4, 0.6, 0.8], (v) => `${Math.round(v * 100)}%`, y, n, cx);
    rounds.forEach((r, i) => {
      out += `<text x="${cx(i)}" y="${B + 16}" text-anchor="middle" font-size="12" class="fill-muted-foreground">R${r.round}</text>`;
    });
    out += `<line x1="${Lx}" x2="${R}" y1="${y(threshold)}" y2="${y(threshold)}" class="stroke-muted-foreground" stroke-dasharray="4 4" />`;
    out += `<text x="${R - 6}" y="${y(threshold) - 6}" text-anchor="end" font-size="11" class="fill-muted-foreground">settle line</text>`;
    const d = rounds.map((r, i) => `${cx(i)},${y(r.stability)}`).join(" L");
    out += `<path d="M${d}" fill="none" class="stroke-primary" stroke-width="2" />`;
    rounds.forEach((r, i) => {
      out += `<circle cx="${cx(i)}" cy="${y(r.stability)}" r="3" class="fill-panel stroke-primary" stroke-width="2" />`;
    });
    return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" class="w-full h-full">${out}</svg>`;
  })();

  const overTime = L.panel({
    title: "Rounds over time",
    eyebrow: "what each round produced",
    body: `<div class="h-72 w-full">${barsSvg}</div>`,
  });

  const convergence = L.panel({
    title: "Convergence",
    eyebrow: "how much your taste moved each round",
    body: `
      <div class="h-64 w-full">${lineSvg}</div>
      <p class="mt-3 text-sm text-muted-foreground">Each point is how far your choices shifted that round. Once the line stays under the settle line for 2 rounds in a row, the look is locked in.</p>`,
  });

  const traits = [
    { label: "Overhead shot of the finished dish", rate: 0.82, shown: 17, thin: false },
    { label: "Warm, natural window light", rate: 0.76, shown: 21, thin: false },
    { label: "Bold serif headline", rate: 0.71, shown: 14, thin: false },
    { label: "Hands in frame", rate: 0.58, shown: 12, thin: false },
    { label: "Muted earth-tone background", rate: 0.52, shown: 19, thin: false },
    { label: "Close-up texture crop", rate: 0.4, shown: 10, thin: false },
    { label: "Face on the cover", rate: 0.25, shown: 8, thin: false },
    { label: "Handwritten script accent", rate: 0.33, shown: 3, thin: true },
  ];
  const traitsPanel = L.panel({
    title: "Which looks you approve",
    eyebrow: "option ratings",
    body: `
      <ul class="space-y-2">
        ${traits
          .map(
            (t) => `
        <li class="space-y-1">
          <div class="flex items-center justify-between text-sm">
            <span>${t.label}</span>
            <span class="text-muted-foreground">${t.thin ? "not enough judgements yet" : `${Math.round(t.rate * 100)}% approved`} · ${t.shown} shown</span>
          </div>
          <div class="h-2 w-full overflow-hidden rounded-full bg-panel-2">
            <div class="${t.thin ? "h-full bg-muted-foreground/40" : "h-full bg-primary"}" style="width: ${Math.round(t.rate * 100)}%"></div>
          </div>
        </li>`,
          )
          .join("")}
      </ul>`,
  });

  const costPanel = L.panel({
    title: "Time and cost per round",
    body: `
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-xs uppercase text-muted-foreground">
              <th class="py-2 pr-4">Round</th>
              <th class="py-2 pr-4">Built in</th>
              <th class="py-2 pr-4">Waited on you</th>
              <th class="py-2 pr-4">Estimated cost</th>
              <th class="py-2">Look</th>
            </tr>
          </thead>
          <tbody>
            ${rounds
              .map(
                (r) => `
            <tr class="border-t border-border">
              <td class="py-2 pr-4">R${r.round}</td>
              <td class="py-2 pr-4">${mins(r.build)}</td>
              <td class="py-2 pr-4">${mins(r.wait)}</td>
              <td class="py-2 pr-4">${money(r.cost)}</td>
              <td class="py-2">${r.verdict ? (r.verdict === "approved" ? "👍" : "👎") : "—"}</td>
            </tr>`,
              )
              .join("")}
          </tbody>
        </table>
      </div>
      <p class="mt-3 text-xs text-muted-foreground">Cost is an estimate and only kept for the last seven days, so older rounds show time only.</p>`,
  });

  return L.page(
    `
    ${L.header({ eyebrow: "Brand", title: "Look training analytics", info: true })}
    <div class="space-y-6 sm:space-y-8">
      ${stands}
      ${overTime}
      ${convergence}
      ${traitsPanel}
      ${costPanel}
    </div>
  `,
    "max-w-6xl",
  );
};
