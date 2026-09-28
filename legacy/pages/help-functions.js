window.LEGACY = window.LEGACY || {};
window.LEGACY["help-functions"] = () => {
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const section = {"title":"Functions","description":"The day-to-day work: teaching the platform your voice, preparing assets, generating and publishing content, and answering your audience."};
  const articles = [
  {
    "id": "brand-voice-knowledge",
    "title": "Brand Voice & Knowledge",
    "route": "/corpus",
    "flag": "brand-voice-knowledge",
    "summary": "Everything the platform has learned about your brand: your past posts, captions, articles and comment history, plus anything you add by hand.",
    "steps": [
      "Review what has been collected from your connected channels — this is what drafts and replies are written from.",
      "Add a knowledge item by hand for anything the channels don't cover: policies, product facts, phrases you always use.",
      "Use the intake rules to keep material out of the knowledge base when it shouldn't influence your voice."
    ],
    "notes": [
      "Better knowledge is the single biggest lever on draft quality. Fix a wrong fact here rather than editing it in every draft."
    ]
  },
  {
    "id": "brand-voice-interviews",
    "title": "Brand voice interviews",
    "route": "/corpus",
    "flag": "brand-voice-knowledge",
    "summary": "A short set of questions about how your brand talks. Your answers are turned into voice guidance the writer follows.",
    "steps": [
      "Answer the questions in your own words — full sentences work better than keywords.",
      "Submit the interview; the answers are summarised into guidance you can review.",
      "Come back and revise whenever your positioning changes."
    ]
  },
  {
    "id": "production",
    "title": "Production",
    "route": "/loop-a",
    "flag": "production",
    "summary": "Your video and media assets, with the state of each one: transcript, captions, and whether it has been published.",
    "steps": [
      "Open an asset to see its transcript and subtitle status.",
      "Use the subtitle badge to check whether YouTube has confirmed the caption track, and re-check it if it still says confirming.",
      "Send an asset forward to content generation when it's ready to become posts."
    ],
    "notes": [
      "A subtitle track can read as confirming for up to half an hour while YouTube processes the video. That is normal and resolves itself."
    ]
  },
  {
    "id": "content-generation",
    "title": "Content Generation",
    "route": "/loop-b",
    "flag": "content-generation",
    "summary": "Turns one asset or idea into a set of platform-ready posts — one card per channel — that you review, edit and publish.",
    "steps": [
      "Generate from an asset, an idea or a topic. Each channel gets its own card in flow order.",
      "Edit the text, hashtags and first comment on a card. Your edits are kept exactly as written.",
      "Save to keep your changes without publishing.",
      "Schedule to publish at the planned time, or use Post Now to send it immediately."
    ],
    "notes": [
      "Card order follows your publication flow and does not shuffle when you save or schedule.",
      "Hashtags and calls to action are de-duplicated before posting, so nothing appears twice in the published text.",
      "Video uploads show live progress, then a processing stage while the channel prepares the video. Closing the page does not cancel the upload."
    ]
  },
  {
    "id": "content-flow",
    "title": "Publication flow & spacing",
    "route": "/loop-b",
    "flag": "content-flow-editor",
    "summary": "The order your channels publish in, and how far apart posts sit, so one asset doesn't flood every feed at once.",
    "steps": [
      "Arrange the channels into the order you want them to publish.",
      "Set the spacing between posts in the flow.",
      "Save. New generations follow the new flow."
    ],
    "notes": [
      "Later posts in a flow can reference earlier ones — for example a social post linking to the article that published first."
    ]
  },
  {
    "id": "topics",
    "title": "Topics",
    "route": "/topics",
    "flag": "topics",
    "summary": "The subjects your brand covers, how much you've published on each, and where the gaps are.",
    "steps": [
      "Review the topic list to see coverage and gaps.",
      "Start a draft directly from a topic that needs attention."
    ]
  },
  {
    "id": "reply-generation",
    "title": "Reply Generation",
    "route": "/reply-generation",
    "flag": "reply-generation",
    "summary": "Your inbound comments from every connected channel, each with a suggested reply in your brand voice.",
    "steps": [
      "Work the queue top to bottom. Each row shows the original comment and a drafted reply.",
      "Edit or rewrite a reply, then approve it to send, or skip the comment to leave it alone.",
      "Approved replies are sent inside your send window rather than all at once."
    ],
    "notes": [
      "A comment your brand has already answered is not offered again. If the platform cannot confirm whether you replied, it waits and retries instead of risking a double reply.",
      "The queue counts every comment awaiting a reply; a page shows a slice of it at a time."
    ]
  },
  {
    "id": "reply-pacing",
    "title": "Reply pacing & send windows",
    "route": "/reply-generation",
    "flag": "reply-scheduling",
    "summary": "Controls that make replies land like a person wrote them: a gap between sends, a daily window, and a little randomness.",
    "steps": [
      "Set the minimum and maximum gap between two replies.",
      "Set the hours of day replies may be sent.",
      "Watch the estimated replies-per-day figure update as you change the numbers."
    ],
    "notes": [
      "Approved replies outside the window wait for the next window rather than being dropped."
    ]
  },
  {
    "id": "content-ideas",
    "title": "Content Ideas",
    "route": "/content-suggestions",
    "flag": "content-ideas",
    "summary": "A parking place for suggestions — yours and the platform's — that can be sent straight into content generation.",
    "steps": [
      "Add your own idea, or review the suggestions generated from your knowledge base and topics.",
      "Group ideas into categories so related ones stay together.",
      "Send an idea to content generation when you're ready to write it."
    ]
  },
  {
    "id": "cross-platform-videos",
    "title": "Videos",
    "route": "/videos",
    "flag": "cross-platform-videos",
    "summary": "One row per video with the numbers from every platform it was posted to added together, so a clip posted to several accounts reads as a single performance story.",
    "steps": [
      "Open a row to see each individual post, its platform, and how it was matched to the video.",
      "Rename a video so the list reads the way you think about it.",
      "Use “link a post” to tie a post the system left unmatched to the right video, or unlink one that was matched wrongly.",
      "Use “regroup” after a backfill or archive import to pull the new history into videos."
    ],
    "notes": [
      "Posts brought in through backfill and archive imports are included, not just posts published from here.",
      "A post you unlink by hand stays unlinked — automatic matching will not put it back.",
      "Totals use each post's most recent figures, so they line up with what each platform reports today."
    ]
  },
  {
    "id": "recipe-planner",
    "title": "Recipe Planner",
    "route": "/brand/modules/recipe-planner",
    "module": "recipe-planner",
    "summary": "An add-on for food brands: plan recipe content on cards and push the ones you approve into content generation.",
    "steps": [
      "Add or review recipe cards for the period you're planning.",
      "Approve a card to send it forward as content."
    ]
  },
  {
    "id": "recipe-blog-generator",
    "title": "Recipe Blog Generator",
    "route": "/brand/modules/recipe-blog-generator",
    "module": "recipe-blog-generator",
    "summary": "An add-on that turns recipes already on your website into new blog drafts written in your voice.",
    "steps": [
      "Review the recipes the module found on your site.",
      "Generate a draft, edit it, and it is saved back to your site as a draft — never published automatically."
    ]
  }
];
  const others = ["Dashboard","What's New","Settings","Help"];
  const card = (a) => `
    <article id="${a.id}" class="panel p-4 space-y-3 scroll-mt-6">
      <header class="flex flex-wrap items-center gap-2">
        <h2 class="text-sm font-semibold text-foreground">${esc(a.title)}</h2>
        ${a.adminOnly ? `<span class="rounded border border-border px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">admins only</span>` : ""}
        ${a.route ? `<a href="#" class="ml-auto text-[10px] font-mono uppercase tracking-widest text-primary hover:underline">open screen →</a>` : ""}
      </header>
      <p class="text-sm text-muted-foreground">${esc(a.summary)}</p>
      ${a.steps && a.steps.length ? `<ol class="list-decimal space-y-1.5 pl-5 text-sm text-foreground/90">${a.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>` : ""}
      ${a.notes && a.notes.length ? `<ul class="space-y-1.5 border-t border-border pt-3 text-xs text-muted-foreground">${a.notes.map((n) => `<li class="flex gap-2"><span aria-hidden="true" class="text-primary">•</span><span>${esc(n)}</span></li>`).join("")}</ul>` : ""}
    </article>`;
  return L.page(
    `
    <div class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
      <a href="#" class="hover:text-foreground">Help</a>
      <span class="mx-2 opacity-40">/</span>
      <span class="text-foreground">${esc(section.title)}</span>
    </div>
    ${L.header({ title: `${esc(section.title)} — user guide`, info: true })}
    <nav class="panel p-4">
      <div class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">On this page</div>
      <ul class="space-y-1 text-sm">
        ${articles.map((a) => `<li><a href="#${a.id}" class="text-primary hover:underline">${esc(a.title)}</a></li>`).join("")}
      </ul>
    </nav>
    <div class="space-y-4">${articles.map(card).join("")}</div>
    <div class="panel p-4">
      <div class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Other sections</div>
      <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm">
        ${others.map((t) => `<a href="#" class="text-primary hover:underline">${esc(t)}</a>`).join("")}
      </div>
    </div>
  `,
    "max-w-3xl",
  );
};
