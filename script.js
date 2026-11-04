/* VERSION 8 - script.js: renders the page from data.js (no need to edit this file). */

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
  if (s.icon === "design") return "";
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
  if (live) btns.push(`<a class="btn btn-gold" href="${esc(p.live)}" target="_blank" rel="noopener noreferrer" aria-label="Live Demo: ${esc(p.title)} (opens in a new tab)">Live Demo <svg class="ico" aria-hidden="true"><use href="#i-external"/></svg></a>`);
  if (p.repo) btns.push(`<a class="btn btn-outline" href="${esc(p.repo)}" target="_blank" rel="noopener noreferrer" aria-label="GitHub repository: ${esc(p.title)} (opens in a new tab)"><svg class="ico" aria-hidden="true"><use href="#i-github"/></svg> GitHub</a>`);
  if (!btns.length) btns.push(`<span class="btn btn-ghost" aria-disabled="true">Coming soon</span>`);
  return `<article class="card project reveal ${live ? "is-live" : "is-soon"}" data-i="${i}" data-status="${live ? "live" : "soon"}" style="--d:${(i % 3) * 0.08}s">
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

// Filters: by group (e.g. Business & Finance). "Coming soon" appears only if a project has no live link.
const pf = $("#projectFilters");
const GROUPS = [...new Set(PROJECTS.map((p) => p.group).filter(Boolean))];
const filterDefs = [["all", "All", PROJECTS.length], ...GROUPS.map((g) => ["g:" + g, g, PROJECTS.filter((p) => p.group === g).length])];
if (SOON) filterDefs.push(["soon", "Coming soon", SOON]);
pf.innerHTML = filterDefs.map(([k, label, n], i) =>
  `<button type="button" class="tab${i ? "" : " active"}" data-f="${esc(k)}" aria-pressed="${i ? "false" : "true"}">${esc(label)} <span class="count">${n}</span></button>`).join("");
if (filterDefs.length < 3) pf.hidden = true;
pf.addEventListener("click", (e) => {
  const b = e.target.closest("[data-f]"); if (!b) return;
  $$("button", pf).forEach((x) => { const on = x === b; x.classList.toggle("active", on); x.setAttribute("aria-pressed", on); });
  const k = b.dataset.f;
  $$("#projectsGrid .project").forEach((c) => {
    const p = PROJECTS[+c.dataset.i];
    c.hidden = !(k === "all" || (k === "soon" && !p.live) || k === "g:" + p.group);
  });
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
    t.setAttribute("aria-pressed", on);
  });
  $$("#modeTabs .tab").forEach((t) => {
    const on = t.dataset.mode === mode;
    t.classList.toggle("active", on);
    t.setAttribute("aria-pressed", on);
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
  `<button class="tab" data-i="${i}" aria-pressed="false">${esc(PROJECTS[i].title)}</button>`).join("");
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
let modalOpener = null;
function openModal(i) {
  modalOpener = document.activeElement;
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
modal.addEventListener("close", () => { $("#modalBody").innerHTML = ""; document.body.classList.remove("modal-open"); modalOpener?.focus?.(); });

/* ---------- Contact: WhatsApp / email composer (works without a server) ---------- */
const form = $("#contactForm"), note = $("#formNote");
const setNote = (type, text) => { note.className = "form-note" + (type ? " " + type : ""); note.textContent = text; };
// Opens a link the way a normal click would (new tab for web links, same tab for mailto)
function go(url, newTab) {
  const a = document.createElement("a");
  a.href = url; if (newTab) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
  document.body.appendChild(a); a.click(); a.remove();
}
function readForm() {
  const f = form.elements, name = f.name.value.trim(), message = f.message.value.trim();
  const checks = [[f.name, name.length >= 2, "your name"], [f.message, message.length >= 10, "a short message (at least 10 characters)"]];
  checks.forEach(([el, ok]) => el.setAttribute("aria-invalid", !ok));
  const bad = checks.find(([, ok]) => !ok);
  if (bad) { setNote("error", `Please enter ${bad[2]}.`); bad[0].focus(); return null; }
  if (f._gotcha.value) return null; // spam trap
  return { name, type: f.type.value, message };
}
const messageText = ({ name, type, message }) => `Hello Ahmad, my name is ${name}.\nI'm interested in: ${type}.\n\n${message}`;
$("#sendWa").addEventListener("click", () => {
  const d = readForm(); if (!d) return;
  go(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(messageText(d))}`, true);
  setNote("ok", "Opening WhatsApp with your message ready to send.");
});
$("#sendMail").addEventListener("click", () => {
  const d = readForm(); if (!d) return;
  go(`mailto:${CONFIG.email}?subject=${encodeURIComponent("Project enquiry from " + d.name)}&body=${encodeURIComponent(messageText(d))}`, false);
  setNote("ok", "Opening your email app with your message ready to send.");
});
form.addEventListener("submit", (e) => { e.preventDefault(); $("#sendWa").click(); });
form.addEventListener("input", (e) => e.target.removeAttribute?.("aria-invalid"));

/* ---------- Footer ---------- */
$("#footerProjects").innerHTML = LIVE_IDX.map((i) => `<li><a href="${esc(PROJECTS[i].live)}" target="_blank" rel="noopener noreferrer">${esc(PROJECTS[i].title)}</a></li>`).join("")
  + `<li><a href="#projects">All projects</a></li>`;

/* ---------- Graphic design gallery + lightbox ---------- */
const gal = $("#designGallery"), lb = $("#lightbox");
let lbVis = [], lbPos = 0, lbOpener = null;
const catOf = (d) => DESIGN_CATEGORIES.find((c) => c.name === d.category) || { blurb: "", ratio: "4/5" };
// Designs are read from /images/ first; if not found there, the same file name is tried in /assets/design/
const altPath = (u) => (/^images\//.test(u) ? u.replace(/^images\//, "assets/design/") : u.replace(/^assets\/design\//, "images/"));
const fileOf = (d) => (d.image || "").split("/").pop();
const phHTML = (d) => `<span class="ph-badge">Placeholder</span><span class="ph-icon" aria-hidden="true">✦</span><span class="ph-file">${esc(fileOf(d))}</span><span class="ph-note">Your design goes here</span>`;

if (!DESIGNS.length) {
  $("#designEmpty").hidden = false;
} else {
  gal.innerHTML = DESIGNS.map((d, i) => `
    <article class="g-card reveal" data-d="${i}" data-cat="${esc(d.category)}" style="--d:${(i % 3) * 0.08}s">
      <button type="button" class="g-media" style="--r:${esc(d.ratio || catOf(d).ratio)}" aria-label="View larger: ${esc(d.title)}">
        <img alt="${esc(d.alt || d.title)}" loading="lazy" decoding="async">
        <span class="g-zoom" aria-hidden="true">View ⤢</span>
      </button>
      <div class="g-meta">
        <div class="g-row"><span class="g-cat">${esc(d.category)}</span>${d.concept ? '<span class="g-badge">Concept Project</span>' : ""}</div>
        <h3>${esc(d.title)}</h3>
        <p>${esc(d.description || catOf(d).blurb)}</p>
      </div>
    </article>`).join("");

  // Show the real image if the file exists; otherwise a clearly-labelled placeholder.
  $$(".g-card", gal).forEach((card) => {
    const d = DESIGNS[+card.dataset.d], media = $(".g-media", card), img = $("img", media);
    img.addEventListener("load", () => { card.dataset.dir = img.dataset.retry ? "alt" : ""; media.style.aspectRatio = "auto"; img.classList.add("loaded"); card.dataset.ph = ""; });
    img.addEventListener("error", () => {
      if (!img.dataset.retry) { img.dataset.retry = "1"; img.src = altPath(d.thumb || d.image); return; } // try the /images folder
      img.remove(); card.dataset.ph = "1";
      media.insertAdjacentHTML("afterbegin", `<span class="ph">${phHTML(d)}</span>`);
    });
    img.src = d.thumb || d.image;
  });

  // Category filters (only categories that have designs)
  const cats = DESIGN_CATEGORIES.filter((c) => DESIGNS.some((d) => d.category === c.name));
  const df = $("#designFilters");
  df.hidden = false;
  df.innerHTML = [{ name: "All", all: true }, ...cats].map((c, i) =>
    `<button type="button" class="tab${i ? "" : " active"}" data-c="${c.all ? "" : esc(c.name)}" aria-pressed="${!i}">${esc(c.name)}</button>`).join("");
  df.addEventListener("click", (e) => {
    const b = e.target.closest("[data-c]"); if (!b) return;
    $$("button", df).forEach((x) => { x.classList.toggle("active", x === b); x.setAttribute("aria-pressed", x === b); });
    $$(".g-card", gal).forEach((g) => { g.hidden = !!b.dataset.c && g.dataset.cat !== b.dataset.c; });
  });

  // Lightbox
  const lbShow = (pos) => {
    lbPos = (pos + lbVis.length) % lbVis.length;
    const i = lbVis[lbPos], d = DESIGNS[i], isPh = $(`.g-card[data-d="${i}"]`, gal).dataset.ph === "1";
    const img = $("#lbImg"), ph = $("#lbPh");
    ph.hidden = !isPh; img.hidden = isPh;
    if (isPh) { ph.style.setProperty("--r", d.ratio || catOf(d).ratio); ph.innerHTML = phHTML(d); img.removeAttribute("src"); }
    else { const card = $(`.g-card[data-d="${i}"]`, gal); img.src = card.dataset.dir === "alt" ? altPath(d.image) : d.image; img.alt = d.alt || d.title; }
    $("#lbTitle").textContent = d.title; $("#lbCat").textContent = d.category + (d.concept ? " · Concept Project" : "");
    $("#lbDesc").textContent = d.description || catOf(d).blurb;
    $("#lbCount").textContent = `${lbPos + 1} / ${lbVis.length}`;
  };
  gal.addEventListener("click", (e) => {
    const b = e.target.closest(".g-media"); if (!b || typeof lb.showModal !== "function") return;
    lbOpener = b;
    lbVis = $$(".g-card:not([hidden])", gal).map((x) => +x.dataset.d);
    lbShow(lbVis.indexOf(+b.closest(".g-card").dataset.d));
    $$(".lb-nav", lb).forEach((n) => (n.hidden = lbVis.length < 2));
    document.body.classList.add("modal-open"); lb.showModal();
  });
  $("#lbPrev").addEventListener("click", () => lbShow(lbPos - 1));
  $("#lbNext").addEventListener("click", () => lbShow(lbPos + 1));
  $("#lbClose").addEventListener("click", () => lb.close());
  lb.addEventListener("click", (e) => { if (e.target === lb) lb.close(); });
  lb.addEventListener("keydown", (e) => { if (e.key === "ArrowLeft") lbShow(lbPos - 1); if (e.key === "ArrowRight") lbShow(lbPos + 1); });
  lb.addEventListener("close", () => { $("#lbImg").removeAttribute("src"); document.body.classList.remove("modal-open"); lbOpener?.focus?.(); });
}

// "Let's Work Together" -> existing contact section (with a friendly starter message)
$("#designCta")?.addEventListener("click", () => {
  const m = $("#contactForm")?.elements.message;
  if (m && !m.value.trim()) m.value = "Hi Ahmad, I have a design project in mind and would like to work with you.";
});

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
    if (en.isIntersecting) links.forEach((l) => { const on = l.getAttribute("href") === "#" + en.target.id; l.classList.toggle("active", on); on ? l.setAttribute("aria-current", "true") : l.removeAttribute("aria-current"); });
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
