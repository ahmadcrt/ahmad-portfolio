/* =====================================================================
   EASY UPDATE ZONE — edit only this section to change your portfolio.
   ===================================================================== */

const CONFIG = {
  name: "Ahmad",
  github: "https://github.com/ahmadcrt",   // your GitHub profile
  email: "",                               // optional: "you@example.com" (adds an email card; form falls back to your email app)

  // CONTACT FORM — to receive messages directly, create a free form at formspree.io
  // and paste its URL here, e.g. "https://formspree.io/f/xxxxxxxx".
  // (Using web3forms.com instead? Leave this as their URL and set web3formsKey.)
  formEndpoint: "",
  web3formsKey: "",

  // If a project has no local screenshot file, show an automatic screenshot of its live site.
  autoScreenshots: true,
};

// Short facts shown in the About section (only true things!)
const FACTS = [
  { label: "Role", value: "Web Developer & Graphic Designer" },
  { label: "Focus", value: "Responsive websites & visual design" },
  { label: "Core stack", value: "HTML5 · CSS3 · JavaScript" },
];

// Skills — add or remove items freely.
// match: a tag name from PROJECTS (used to count projects), or "*" for all projects.
const SKILLS = [
  { icon: "html", accent: "#e34f26", name: "HTML5", match: "HTML5",
    text: "Semantic, accessible page structure.", points: ["Semantic markup", "Forms", "Media"] },
  { icon: "css", accent: "#1572b6", name: "CSS3", match: "CSS3",
    text: "Responsive layouts, Flexbox, Grid and animations.", points: ["Flexbox", "Grid", "Animations", "Responsive"] },
  { icon: "js", accent: "#f7df1e", name: "JavaScript", match: "JavaScript",
    text: "Vanilla JavaScript for interactive, dynamic interfaces.", points: ["DOM", "Events", "ES6+", "Fetch API"] },
  { icon: "git", accent: "#f05032", name: "Git & GitHub", match: "*",
    text: "Version control and publishing projects with GitHub Pages.", points: ["Commits", "Repositories", "GitHub Pages"] },
  { icon: "design", accent: "#d4af37", name: "Graphic Design", match: "",
    text: "Visual design for brands and businesses — see the Design section.", points: [] },
];

/* ---------------------------------------------------------------------
   PROJECTS — one block per website. To update a project, just fill in its fields:
     live: the working website URL  -> the card becomes "Live" automatically
     repo: the GitHub repository URL (leave "" if none)
     tags: technologies you actually used, e.g. ["HTML5","CSS3","JavaScript"]
     screenshot: optional. By default the site looks for your own screenshot at
                 assets/projects/<project-name>.jpg (e.g. assets/projects/nova-digital.jpg),
                 then falls back to an automatic screenshot of the live site.
   Projects with no "live" link show as "Coming Soon". Nothing is shown that
   you haven't filled in.
   --------------------------------------------------------------------- */
const PROJECTS = [
  { title: "NOVA DIGITAL", category: "Digital Marketing Agency",
    description: "My first published website: a digital marketing agency site, built with front-end web technologies and hosted on GitHub Pages.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    live: "https://ahmadcrt.github.io/nova-digital/", repo: "https://github.com/ahmadcrt/nova-digital", screenshot: "" },
  { title: "AHMAD PORTFOLIO", category: "Personal Developer Portfolio",
    description: "The portfolio you're viewing now: a responsive site presenting my website projects and design work.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    live: "https://ahmadcrt.github.io/ahmad-portfolio/", repo: "https://github.com/ahmadcrt/ahmad-portfolio", screenshot: "" },
  { title: "LUXORA ESTATES", category: "Real Estate",
    description: "A demo luxury real estate website with searchable property listings, services and an enquiry form. All properties and people are fictional.",
    tags: [], live: "https://ahmadcrt.github.io/luxora-estates/", repo: "", screenshot: "" },
  { title: "SAVORA RESTAURANT", category: "Restaurant & Food",
    description: "A fictional restaurant website built as a portfolio demonstration, with a menu, gallery and a demo reservation form.",
    tags: [], live: "https://ahmadcrt.github.io/savora-restaurant/", repo: "", screenshot: "" },
  { title: "VELORA FITNESS", category: "Fitness & Gym",
    description: "A fictional premium gym website built as a front-end portfolio project, with programmes, trainers, membership plans and a class schedule.",
    tags: [], live: "https://ahmadcrt.github.io/velora-fitness/", repo: "", screenshot: "" },
  { title: "AMOO TECH", category: "Electronics E-commerce",
    description: "A fictional electronics store built for a front-end portfolio, with product listings, categories, sorting and availability filters.",
    tags: [], live: "https://ahmadcrt.github.io/Amoo-tech/", repo: "", screenshot: "" },
  { title: "EDUCORE", category: "Online Learning Platform",
    description: "An online learning platform demo with three learning academies, a course catalogue and sample course content.",
    tags: [], live: "https://ahmadcrt.github.io/educore/index.html", repo: "", screenshot: "" },
  { title: "REDCARE HOSPITALS", category: "Healthcare Management",
    description: "A healthcare website project for a hospital brand, focused on clear information for patients and visitors.",
    tags: [], live: "", repo: "", screenshot: "" },
  { title: "AURELIA HOTELS", category: "Hotel Booking & Management",
    description: "A hotel website project focused on presenting rooms and hospitality to prospective guests.",
    tags: [], live: "", repo: "", screenshot: "" },
  { title: "PAYNEX FINTECH", category: "Financial Technology",
    description: "A financial technology website project focused on presenting digital finance services clearly.",
    tags: [], live: "", repo: "", screenshot: "" },
];

/* ---------------------------------------------------------------------
   DESIGNS — your graphic design work. Put images in /assets/design/ and add
   one line per piece (keep images under ~400 KB each so the page stays fast):
     { title: "Brand poster", category: "Posters", image: "assets/design/poster-1.jpg", alt: "Short description" },
   While this list is empty, visitors see a "coming soon" message.
   --------------------------------------------------------------------- */
const DESIGNS = [
];

/* =====================================================================
   Code below renders everything — no need to edit it.
   ===================================================================== */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (str) => String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
document.documentElement.classList.add("js");

/* ---------- Helpers ---------- */
const isLive = (p) => !!p.live;
const statusOf = (p) => p.status || (p.live ? "Live" : "Coming Soon");
const LIVE_IDX = PROJECTS.map((p, i) => (p.live ? i : -1)).filter((i) => i >= 0);
const SOON = PROJECTS.length - LIVE_IDX.length;
const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const initials = (t) => t.split(/\s+/).slice(0, 2).map((w) => w[0]).join("");
const hostOf = (u) => { try { return new URL(u).host; } catch { return u; } };

/* ---------- Render: facts, hero count ---------- */
$("#facts").innerHTML = FACTS.map((f) => `<li><small>${esc(f.label)}</small><strong>${esc(f.value)}</strong></li>`).join("");
$("#codeProjects").textContent = LIVE_IDX.length;
$("#codeProjectsLabel").textContent = SOON ? `live · ${SOON} coming soon` : (LIVE_IDX.length === 1 ? "live project" : "live projects");

/* ---------- Render: skills ---------- */
const ICONS = {
  html: '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="#e34f26" d="M5 3l2 23 9 3 9-3 2-23z"/><text x="16" y="21" text-anchor="middle" font-size="14" font-weight="700" fill="#fff" font-family="Arial,sans-serif">5</text></svg>',
  css: '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="#1572b6" d="M5 3l2 23 9 3 9-3 2-23z"/><text x="16" y="21" text-anchor="middle" font-size="14" font-weight="700" fill="#fff" font-family="Arial,sans-serif">3</text></svg>',
  js: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="3" y="3" width="26" height="26" rx="3" fill="#f7df1e"/><text x="26" y="26" text-anchor="end" font-size="12" font-weight="800" fill="#1a1a1a" font-family="Arial,sans-serif">JS</text></svg>',
  git: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="6" y="6" width="20" height="20" rx="3" transform="rotate(45 16 16)" fill="#f05032"/><g stroke="#fff" stroke-width="2" fill="#fff"><path d="M12 12v8M12 14c0 3 8 1 8 5" fill="none"/><circle cx="12" cy="11" r="1.8"/><circle cx="12" cy="21" r="1.8"/><circle cx="20" cy="19" r="1.8"/></g></svg>',
  design: '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="12" fill="#d4af37"/><circle cx="10.5" cy="14" r="2" fill="#0a1128"/><circle cx="16" cy="9.5" r="2" fill="#0a1128"/><circle cx="21.5" cy="14" r="2" fill="#0a1128"/><circle cx="19" cy="21" r="2.4" fill="#0a1128"/></svg>',
};
const countLabel = (s) => {
  if (s.icon === "design") { const n = DESIGNS.length; return n ? `${n} work${n > 1 ? "s" : ""} shown` : ""; }
  const n = PROJECTS.filter((p) => s.match === "*" ? p.live || p.repo : p.tags.includes(s.match)).length;
  return n ? `Used in ${n} project${n > 1 ? "s" : ""}` : "";
};

$("#skillsGrid").innerHTML = SKILLS.map((s, i) => `
  <article class="card tech reveal" style="--d:${i * 0.08}s;--accent:${esc(s.accent || "#d4af37")}">
    <div class="tech-top">
      <div class="tech-icon">${ICONS[s.icon] || esc(s.icon)}</div>
      <span class="tech-count">${countLabel(s)}</span>
    </div>
    <h3>${esc(s.name)}</h3>
    <p>${esc(s.text)}</p>
    ${(s.points || []).length ? `<ul class="chips">${s.points.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
  </article>`).join("");

/* ---------- Screenshots: local file first, then automatic screenshot of the live site ---------- */
function attachShot(img, p, onFail) {
  const srcs = [p.screenshot || `assets/projects/${slug(p.title)}.jpg`];
  if (CONFIG.autoScreenshots && p.live) {
    const u = encodeURIComponent(p.live);
    srcs.push(`https://api.microlink.io/?url=${u}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=800`);
    srcs.push(`https://s0.wp.com/mshots/v1/${u}?w=1280&h=800`);
  }
  let i = 0;
  const next = () => { if (i >= srcs.length) { img.removeEventListener("error", next); onFail && onFail(); return; } img.src = srcs[i++]; };
  img.addEventListener("load", () => img.classList.add("loaded"));
  img.addEventListener("error", next);
  next();
}

/* ---------- Render: projects ---------- */
function projectCard(p, i) {
  const live = isLive(p), st = statusOf(p);
  const cover = live
    ? `<div class="thumb-fallback">${esc(p.title)}</div>
       <img data-shot="${i}" alt="Screenshot of ${esc(p.title)}" loading="lazy" decoding="async">
       <div class="thumb-overlay"><button type="button" class="btn btn-gold" data-open="${i}">Quick preview</button></div>`
    : `<div class="cover" aria-hidden="true"><span class="cover-mark">${esc(initials(p.title))}</span><span class="cover-note">${esc(p.category)}</span></div>`;
  const btns = [];
  if (live) btns.push(`<a class="btn btn-gold" href="${esc(p.live)}" target="_blank" rel="noopener noreferrer">Visit live project ↗</a>`);
  if (p.repo) btns.push(`<a class="btn btn-outline" href="${esc(p.repo)}" target="_blank" rel="noopener noreferrer">View source code</a>`);
  if (!btns.length) btns.push(`<span class="btn btn-ghost" aria-disabled="true">Coming soon</span>`);
  return `<article class="card project reveal ${live ? "is-live" : "is-soon"}" data-status="${live ? "live" : "soon"}" style="--d:${(i % 3) * 0.08}s">
    <div class="thumb">
      <div class="thumb-bar"><i></i><i></i><i></i><span>${live ? esc(hostOf(p.live)) : "Coming soon"}</span></div>
      <div class="thumb-shot">${cover}</div>
    </div>
    <div class="project-body">
      <div class="meta"><span class="cat">${esc(p.category)}</span><span class="status ${live ? "live" : "soon"}">${esc(st)}</span></div>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.description)}</p>
      ${p.tags && p.tags.length ? `<div class="tags">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>` : ""}
      <div class="btn-row">${btns.join("")}</div>
    </div>
  </article>`;
}
$("#projectsGrid").innerHTML = PROJECTS.map(projectCard).join("");
$$("img[data-shot]").forEach((img) => attachShot(img, PROJECTS[+img.dataset.shot], () => img.remove()));

// Filters: All / Live / Coming soon
const pf = $("#projectFilters");
pf.innerHTML = [["all", "All", PROJECTS.length], ["live", "Live", LIVE_IDX.length], ["soon", "Coming soon", SOON]]
  .filter(([k, , n]) => k === "all" || n > 0)
  .map(([k, label, n], i) => `<button type="button" class="tab${i ? "" : " active"}" data-f="${k}" aria-pressed="${i ? "false" : "true"}">${label} <span class="count">${n}</span></button>`).join("");
if (pf.children.length < 3) pf.hidden = true;
pf.addEventListener("click", (e) => {
  const b = e.target.closest("[data-f]"); if (!b) return;
  $$("button", pf).forEach((x) => { const on = x === b; x.classList.toggle("active", on); x.setAttribute("aria-pressed", on); });
  $$("#projectsGrid .project").forEach((c) => { c.hidden = b.dataset.f !== "all" && c.dataset.status !== b.dataset.f; });
});

/* ---------- Render: GitHub repos ---------- */
const REPOS = PROJECTS.filter((p) => p.repo);
$("#repoList").innerHTML = REPOS.map((p) => {
  const name = p.repo.replace(/\/$/, "").split("/").slice(-2).join(" / ");
  return `<a class="repo" href="${esc(p.repo)}" target="_blank" rel="noopener noreferrer">
    <div><h3>${esc(name)}</h3><p>${esc(p.title)}${p.tags.length ? " — " + esc(p.tags.join(", ")) : ""}</p></div>
    <span class="link">View repository →</span></a>`;
}).join("");
$("#githubProfile").href = CONFIG.github;

/* ---------- Preview section ---------- */
let current = LIVE_IDX.length ? LIVE_IDX[0] : -1, mode = "live", device = "desktop";
const body = $("#previewBody");

function renderPreview() {
  const p = PROJECTS[current];
  $("#previewUrl").textContent = p.live;
  $("#previewVisit").href = p.live;
  $("#previewCode").href = p.repo;
  $(".browser").classList.toggle("is-mobile", device === "mobile");
  $$("#projectTabs .tab").forEach((t) => {
    const on = +t.dataset.i === current;
    t.classList.toggle("active", on);
    t.setAttribute("aria-selected", on);
  });
  $$("#modeTabs .tab").forEach((t) => {
    const on = t.dataset.mode === mode;
    t.classList.toggle("active", on);
    t.setAttribute("aria-selected", on);
  });
  $$("#deviceTabs .tab").forEach((t) => {
    const on = t.dataset.device === device;
    t.classList.toggle("active", on);
    t.setAttribute("aria-pressed", on);
  });
  if (mode === "live") {
    body.innerHTML = `<div class="loader" id="loader">Loading live preview…</div>
      <iframe src="${esc(p.live)}" title="Live preview of ${esc(p.title)}" loading="lazy" referrerpolicy="no-referrer"></iframe>`;
    $("iframe", body).addEventListener("load", () => $("#loader")?.classList.add("hide"));
    setTimeout(() => { const l = $("#loader"); if (l && !l.classList.contains("hide")) l.textContent = "Taking a while? Use the button below to open the site in a new tab."; }, 8000);
  } else {
    body.innerHTML = `<img class="shot" alt="Screenshot of ${esc(p.title)}">
      <div class="empty" id="shotEmpty" hidden>No screenshot available yet.<br>Add one at <code>${esc(p.screenshot || "assets/projects/" + slug(p.title) + ".jpg")}</code></div>`;
    attachShot($("img", body), p, () => { $("img", body)?.remove(); $("#shotEmpty").hidden = false; });
  }
}

$("#projectTabs").innerHTML = LIVE_IDX.map((i) =>
  `<button class="tab" role="tab" data-i="${i}">${esc(PROJECTS[i].title)}</button>`).join("");
$("#projectTabs").addEventListener("click", (e) => {
  const b = e.target.closest("[data-i]"); if (!b) return;
  current = +b.dataset.i; renderPreview();
});
$("#modeTabs").addEventListener("click", (e) => {
  const b = e.target.closest("[data-mode]"); if (!b) return;
  mode = b.dataset.mode; renderPreview();
});
$("#deviceTabs").addEventListener("click", (e) => {
  const b = e.target.closest("[data-device]"); if (!b) return;
  device = b.dataset.device; renderPreview();
});
if (current >= 0) renderPreview();
else { $("#preview").hidden = true; $$('a[href="#preview"]').forEach((a) => a.closest("li")?.remove()); }
if (!REPOS.length) $("#github").hidden = true;

/* ---------- Quick-preview modal ---------- */
const modal = $("#previewModal");
function openModal(i) {
  const p = PROJECTS[i];
  if (typeof modal.showModal !== "function") { window.open(p.live, "_blank", "noopener"); return; }
  $("#modalTitle").textContent = p.title;
  $("#modalUrl").textContent = p.live;
  $("#modalVisit").href = p.live;
  $("#modalCode").href = p.repo;
  $("#modalBody").innerHTML = `<div class="loader" id="mLoader">Loading live preview…</div>
    <iframe src="${esc(p.live)}" title="Live preview of ${esc(p.title)}" referrerpolicy="no-referrer"></iframe>`;
  $("#modalBody iframe").addEventListener("load", () => $("#mLoader")?.classList.add("hide"));
  document.body.classList.add("modal-open");
  modal.showModal();
}
$("#projectsGrid").addEventListener("click", (e) => {
  const b = e.target.closest("[data-open]"); if (b) openModal(+b.dataset.open);
});
$("#modalClose").addEventListener("click", () => modal.close());
modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });
modal.addEventListener("close", () => { $("#modalBody").innerHTML = ""; document.body.classList.remove("modal-open"); });

/* ---------- Contact ---------- */
const cards = [];
cards.push(`<a class="contact-card" href="${esc(CONFIG.github)}" target="_blank" rel="noopener noreferrer">
  <div class="skill-icon" aria-hidden="true">Git</div><div><small>GitHub</small><span>${esc(CONFIG.github.replace("https://", ""))}</span></div></a>`);
if (CONFIG.email) cards.unshift(`<a class="contact-card" href="mailto:${esc(CONFIG.email)}">
  <div class="skill-icon" aria-hidden="true">@</div><div><small>Email</small><span>${esc(CONFIG.email)}</span></div></a>`);
$("#contactCards").innerHTML = cards.join("");

// How the form delivers: "endpoint" (Formspree/Web3Forms) > "mailto" (your email app) > "none"
const FORM_MODE = CONFIG.formEndpoint ? "endpoint" : CONFIG.email ? "mailto" : "none";
$("#formHint").textContent = FORM_MODE === "mailto" ? "Sending will open your email app with the message ready to go." : "";

const form = $("#contactForm"), note = $("#formNote"), btn = $("#formBtn");
const setNote = (type, html) => { note.className = "form-note" + (type ? " " + type : ""); note.innerHTML = html; };
form.addEventListener("input", (e) => e.target.removeAttribute?.("aria-invalid"));

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const f = form.elements;
  const name = f.name.value.trim(), email = f.email.value.trim(), message = f.message.value.trim();

  const checks = [[f.name, name.length >= 2, "your name"], [f.email, f.email.checkValidity() && !!email, "a valid email"], [f.message, message.length >= 10, "a message (at least 10 characters)"]];
  const bad = checks.filter(([, ok]) => !ok);
  checks.forEach(([el, ok]) => el.setAttribute("aria-invalid", !ok));
  if (bad.length) { setNote("error", `Please enter ${bad[0][2]}.`); bad[0][0].focus(); return; }

  if (f._gotcha.value) { setNote("ok", "Thanks! Your message was sent."); form.reset(); return; } // bot trap

  if (FORM_MODE === "none") {
    setNote("error", `The form isn't connected yet — please reach me on <a href="${esc(CONFIG.github)}" target="_blank" rel="noopener noreferrer">GitHub</a> for now.`);
    return;
  }
  if (FORM_MODE === "mailto") {
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const text = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${text}`;
    setNote("ok", "Opening your email app…");
    return;
  }

  // Endpoint mode (Formspree / Web3Forms)
  btn.disabled = true; btn.textContent = "Sending…"; setNote("", "");
  const ctrl = new AbortController(); const timer = setTimeout(() => ctrl.abort(), 15000);
  try {
    const payload = { name, email, message, _subject: `Portfolio message from ${name}` };
    if (CONFIG.web3formsKey) payload.access_key = CONFIG.web3formsKey;
    const res = await fetch(CONFIG.formEndpoint, {
      method: "POST", signal: ctrl.signal,
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    let data = {}; try { data = await res.json(); } catch {}
    if (!res.ok || data.success === false) throw new Error(data.message || data.error || "Request failed");
    setNote("ok", "Thanks! Your message was sent.");
    form.reset();
  } catch (err) {
    setNote("error", err.name === "AbortError" ? "The request timed out. Please try again." : "Sorry, the message couldn't be sent. Please try again or contact me on GitHub.");
  } finally {
    clearTimeout(timer); btn.disabled = false; btn.textContent = "Send message";
  }
});

/* ---------- Footer ---------- */
$("#footerProjects").innerHTML = LIVE_IDX.map((i) => `<li><a href="${esc(PROJECTS[i].live)}" target="_blank" rel="noopener noreferrer">${esc(PROJECTS[i].title)}</a></li>`).join("")
  + `<li><a href="#projects">All projects</a></li>`;
$("#footerConnect").innerHTML = [
  `<li><a href="${esc(CONFIG.github)}" target="_blank" rel="noopener noreferrer">GitHub</a></li>`,
  CONFIG.email ? `<li><a href="mailto:${esc(CONFIG.email)}">Email</a></li>` : "",
  `<li><a href="#contact">Contact form</a></li>`,
].join("");

/* ---------- Design gallery + lightbox ---------- */
const gal = $("#designGallery"), lb = $("#lightbox");
let lbVis = [], lbPos = 0;
if (!DESIGNS.length) {
  $("#designEmpty").hidden = false;
} else {
  gal.innerHTML = DESIGNS.map((d, i) => `
    <button type="button" class="g-item reveal" data-d="${i}" data-cat="${esc(d.category || "")}" aria-label="View ${esc(d.title)}">
      <img src="${esc(d.image)}" alt="${esc(d.alt || d.title)}" loading="lazy" decoding="async"${d.width ? ` width="${+d.width}" height="${+d.height}"` : ""}>
      <span class="g-cap"><strong>${esc(d.title)}</strong>${d.category ? `<em>${esc(d.category)}</em>` : ""}</span>
    </button>`).join("");
  $$(".g-item img", gal).forEach((img) => img.addEventListener("error", () => img.closest(".g-item").remove()));
  const cats = [...new Set(DESIGNS.map((d) => d.category).filter(Boolean))];
  const df = $("#designFilters");
  if (cats.length > 1) {
    df.hidden = false;
    df.innerHTML = ["All", ...cats].map((c, i) => `<button type="button" class="tab${i ? "" : " active"}" data-c="${i ? esc(c) : ""}" aria-pressed="${!i}">${esc(c)}</button>`).join("");
    df.addEventListener("click", (e) => {
      const b = e.target.closest("[data-c]"); if (!b) return;
      $$("button", df).forEach((x) => { x.classList.toggle("active", x === b); x.setAttribute("aria-pressed", x === b); });
      $$(".g-item", gal).forEach((g) => { g.hidden = !!b.dataset.c && g.dataset.cat !== b.dataset.c; });
    });
  }
  const lbShow = (pos) => {
    lbPos = (pos + lbVis.length) % lbVis.length;
    const d = DESIGNS[lbVis[lbPos]];
    $("#lbImg").src = d.image; $("#lbImg").alt = d.alt || d.title;
    $("#lbTitle").textContent = d.title; $("#lbCat").textContent = d.category || "";
  };
  gal.addEventListener("click", (e) => {
    const b = e.target.closest(".g-item"); if (!b || typeof lb.showModal !== "function") return;
    lbVis = $$(".g-item:not([hidden])", gal).map((x) => +x.dataset.d);
    lbShow(lbVis.indexOf(+b.dataset.d));
    $$(".lb-nav", lb).forEach((n) => (n.hidden = lbVis.length < 2));
    document.body.classList.add("modal-open"); lb.showModal();
  });
  $("#lbPrev").addEventListener("click", () => lbShow(lbPos - 1));
  $("#lbNext").addEventListener("click", () => lbShow(lbPos + 1));
  $("#lbClose").addEventListener("click", () => lb.close());
  lb.addEventListener("click", (e) => { if (e.target === lb) lb.close(); });
  lb.addEventListener("keydown", (e) => { if (e.key === "ArrowLeft") lbShow(lbPos - 1); if (e.key === "ArrowRight") lbShow(lbPos + 1); });
  lb.addEventListener("close", () => { $("#lbImg").removeAttribute("src"); document.body.classList.remove("modal-open"); });
}

/* ---------- Mobile nav ---------- */
const toggle = $("#navToggle"), menu = $("#navMenu");
const setMenu = (open) => { menu.classList.toggle("open", open); toggle.setAttribute("aria-expanded", open); };
toggle.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
$$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

/* ---------- Header, back-to-top, active link ---------- */
const header = $("#header"), toTop = $("#toTop"), progress = $("#progress");
const onScroll = () => {
  header.classList.toggle("scrolled", scrollY > 20);
  toTop.classList.toggle("show", scrollY > 600);
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`;
};
addEventListener("scroll", onScroll, { passive: true }); onScroll();

const links = $$(".nav-menu a");
const spy = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
$$("main section[id]").forEach((s) => spy.observe(s));

/* ---------- Scroll reveal ---------- */
const reveal = new IntersectionObserver((entries, obs) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); } });
}, { threshold: 0.12 });
$$(".reveal").forEach((el) => reveal.observe(el));

/* ---------- Footer year ---------- */
$("#year").textContent = new Date().getFullYear();
