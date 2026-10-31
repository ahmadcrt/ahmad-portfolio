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
  { label: "Role", value: "Web Developer & Programmer" },
  { label: "Focus", value: "Responsive websites & clean code" },
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
];

/* ---------------------------------------------------------------------
   PROJECTS — to add a new website, copy one block below, paste it at the
   end of the list (add a comma), and change the values. That's it!
   screenshot: put an image in the /assets folder (e.g. "assets/my-site.png").
   Leave it as "" if you don't have one yet.
   --------------------------------------------------------------------- */
const PROJECTS = [
  {
    title: "NOVA DIGITAL",
    description: "My first published website, built with front-end web technologies and hosted on GitHub Pages.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    live: "https://ahmadcrt.github.io/nova-digital/",
    repo: "https://github.com/ahmadcrt/nova-digital",
    screenshot: "assets/nova-digital.png",
  },
  // {
  //   title: "My Next Project",
  //   description: "Short description of what it is.",
  //   tags: ["HTML5", "CSS3"],
  //   live: "https://ahmadcrt.github.io/my-next-project/",
  //   repo: "https://github.com/ahmadcrt/my-next-project",
  //   screenshot: "assets/my-next-project.png",
  // },
];

/* =====================================================================
   Code below renders everything — no need to edit it.
   ===================================================================== */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (str) => String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
document.documentElement.classList.add("js");

/* ---------- Render: facts, skills ---------- */
$("#facts").innerHTML = FACTS.map((f) => `<li><small>${esc(f.label)}</small><strong>${esc(f.value)}</strong></li>`).join("");
$("#codeProjects").textContent = PROJECTS.length;

const ICONS = {
  html: '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="#e34f26" d="M5 3l2 23 9 3 9-3 2-23z"/><text x="16" y="21" text-anchor="middle" font-size="14" font-weight="700" fill="#fff" font-family="Arial,sans-serif">5</text></svg>',
  css: '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="#1572b6" d="M5 3l2 23 9 3 9-3 2-23z"/><text x="16" y="21" text-anchor="middle" font-size="14" font-weight="700" fill="#fff" font-family="Arial,sans-serif">3</text></svg>',
  js: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="3" y="3" width="26" height="26" rx="3" fill="#f7df1e"/><text x="26" y="26" text-anchor="end" font-size="12" font-weight="800" fill="#1a1a1a" font-family="Arial,sans-serif">JS</text></svg>',
  git: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="6" y="6" width="20" height="20" rx="3" transform="rotate(45 16 16)" fill="#f05032"/><g stroke="#fff" stroke-width="2" fill="#fff"><path d="M12 12v8M12 14c0 3 8 1 8 5" fill="none"/><circle cx="12" cy="11" r="1.8"/><circle cx="12" cy="21" r="1.8"/><circle cx="20" cy="19" r="1.8"/></g></svg>',
};
const usedIn = (s) => PROJECTS.filter((p) => s.match === "*" || p.tags.includes(s.match)).length;

$("#skillsGrid").innerHTML = SKILLS.map((s, i) => {
  const n = usedIn(s);
  return `<article class="card tech reveal" style="--d:${i * 0.08}s;--accent:${esc(s.accent || "#d4af37")}">
    <div class="tech-top">
      <div class="tech-icon">${ICONS[s.icon] || esc(s.icon)}</div>
      <span class="tech-count">${n ? `Used in ${n} project${n > 1 ? "s" : ""}` : ""}</span>
    </div>
    <h3>${esc(s.name)}</h3>
    <p>${esc(s.text)}</p>
    <ul class="chips">${(s.points || []).map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
  </article>`;
}).join("");

/* ---------- Screenshots: local file first, then automatic screenshot of the live site ---------- */
function attachShot(img, p, onFail) {
  const srcs = [];
  if (p.screenshot) srcs.push(p.screenshot);
  if (CONFIG.autoScreenshots) srcs.push(`https://s0.wp.com/mshots/v1/${encodeURIComponent(p.live)}?w=1280&h=800`);
  let i = 0;
  const next = () => { if (i >= srcs.length) { img.removeEventListener("error", next); onFail && onFail(); return; } img.src = srcs[i++]; };
  img.addEventListener("load", () => img.classList.add("loaded"));
  img.addEventListener("error", next);
  next();
}
const hostOf = (u) => { try { return new URL(u).host; } catch { return u; } };

/* ---------- Render: projects ---------- */
$("#projectsGrid").innerHTML = PROJECTS.map((p, i) => `
  <article class="card project reveal" style="--d:${i * 0.08}s">
    <div class="thumb">
      <div class="thumb-bar"><i></i><i></i><i></i><span>${esc(hostOf(p.live))}</span></div>
      <div class="thumb-shot">
        <div class="thumb-fallback">${esc(p.title)}</div>
        <img data-shot="${i}" alt="Screenshot of ${esc(p.title)}" loading="lazy">
        <div class="thumb-overlay"><button type="button" class="btn btn-gold" data-open="${i}">Quick preview</button></div>
      </div>
    </div>
    <div class="project-body">
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.description)}</p>
      <div class="tags">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
      <div class="btn-row">
        <a class="btn btn-gold" href="${esc(p.live)}" target="_blank" rel="noopener noreferrer">Visit live project ↗</a>
        <a class="btn btn-outline" href="${esc(p.repo)}" target="_blank" rel="noopener noreferrer">View source code</a>
      </div>
    </div>
  </article>`).join("");
$$("img[data-shot]").forEach((img) => attachShot(img, PROJECTS[+img.dataset.shot], () => img.remove()));

/* ---------- Render: GitHub repos ---------- */
$("#repoList").innerHTML = PROJECTS.map((p) => {
  const name = p.repo.replace(/\/$/, "").split("/").slice(-2).join(" / ");
  return `<a class="repo" href="${esc(p.repo)}" target="_blank" rel="noopener noreferrer">
    <div><h3>${esc(name)}</h3><p>${esc(p.title)} — ${esc(p.tags.join(", "))}</p></div>
    <span class="link">View repository →</span></a>`;
}).join("");
$("#githubProfile").href = CONFIG.github;

/* ---------- Preview section ---------- */
let current = 0, mode = "live", device = "desktop";
const body = $("#previewBody");

function renderPreview() {
  const p = PROJECTS[current];
  $("#previewUrl").textContent = p.live;
  $("#previewVisit").href = p.live;
  $("#previewCode").href = p.repo;
  $(".browser").classList.toggle("is-mobile", device === "mobile");
  $$("#projectTabs .tab").forEach((t, i) => {
    t.classList.toggle("active", i === current);
    t.setAttribute("aria-selected", i === current);
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
      <div class="empty" id="shotEmpty" hidden>No screenshot available yet.<br>Add one at <code>${esc(p.screenshot || "assets/your-project.png")}</code></div>`;
    attachShot($("img", body), p, () => { $("img", body)?.remove(); $("#shotEmpty").hidden = false; });
  }
}

$("#projectTabs").innerHTML = PROJECTS.map((p, i) =>
  `<button class="tab" role="tab" data-i="${i}">${esc(p.title)}</button>`).join("");
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
if (PROJECTS.length) renderPreview();

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
$("#footerProjects").innerHTML = PROJECTS.map((p) => `<li><a href="${esc(p.live)}" target="_blank" rel="noopener noreferrer">${esc(p.title)}</a></li>`).join("");
$("#footerConnect").innerHTML = [
  `<li><a href="${esc(CONFIG.github)}" target="_blank" rel="noopener noreferrer">GitHub</a></li>`,
  CONFIG.email ? `<li><a href="mailto:${esc(CONFIG.email)}">Email</a></li>` : "",
  `<li><a href="#contact">Contact form</a></li>`,
].join("");

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
