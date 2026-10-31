/* =====================================================================
   EASY UPDATE ZONE — edit only this section to change your portfolio.
   ===================================================================== */

const CONFIG = {
  name: "Ahmad",
  github: "https://github.com/ahmadcrt",   // your GitHub profile
  email: "",                               // add your email, e.g. "you@example.com" (enables email card + contact form)
};

// Short facts shown in the About section (only true things!)
const FACTS = [
  { label: "Role", value: "Web Developer & Programmer" },
  { label: "Focus", value: "Responsive websites & clean code" },
  { label: "Core stack", value: "HTML5 · CSS3 · JavaScript" },
];

// Skills — add or remove items freely.
const SKILLS = [
  { icon: "</>", name: "HTML5", text: "Semantic, accessible page structure." },
  { icon: "{ }", name: "CSS3", text: "Responsive layouts, Flexbox, Grid and animations." },
  { icon: "JS",  name: "JavaScript", text: "Vanilla JavaScript for interactive, dynamic interfaces." },
  { icon: "Git", name: "Git & GitHub", text: "Version control and publishing projects with GitHub Pages." },
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

$("#skillsGrid").innerHTML = SKILLS.map((s, i) => `
  <article class="card reveal" style="--d:${i * 0.08}s">
    <div class="skill-icon" aria-hidden="true">${esc(s.icon)}</div>
    <h3>${esc(s.name)}</h3>
    <p>${esc(s.text)}</p>
  </article>`).join("");

/* ---------- Render: projects ---------- */
$("#projectsGrid").innerHTML = PROJECTS.map((p, i) => `
  <article class="card project reveal" style="--d:${i * 0.08}s">
    <div class="thumb">
      ${p.screenshot ? `<img src="${esc(p.screenshot)}" alt="Screenshot of ${esc(p.title)}" loading="lazy" onerror="this.remove()">` : ""}
      <div class="thumb-fallback" style="${p.screenshot ? "position:absolute;z-index:-1" : ""}">${esc(p.title)}</div>
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

/* ---------- Render: GitHub repos ---------- */
$("#repoList").innerHTML = PROJECTS.map((p) => {
  const name = p.repo.replace(/\/$/, "").split("/").slice(-2).join(" / ");
  return `<a class="repo" href="${esc(p.repo)}" target="_blank" rel="noopener noreferrer">
    <div><h3>${esc(name)}</h3><p>${esc(p.title)} — ${esc(p.tags.join(", "))}</p></div>
    <span class="link">View repository →</span></a>`;
}).join("");
$("#githubProfile").href = CONFIG.github;

/* ---------- Preview section ---------- */
let current = 0, mode = "live";
const body = $("#previewBody");

function renderPreview() {
  const p = PROJECTS[current];
  $("#previewUrl").textContent = p.live;
  $("#previewVisit").href = p.live;
  $("#previewCode").href = p.repo;
  $$("#projectTabs .tab").forEach((t, i) => {
    t.classList.toggle("active", i === current);
    t.setAttribute("aria-selected", i === current);
  });
  $$("#modeTabs .tab").forEach((t) => {
    const on = t.dataset.mode === mode;
    t.classList.toggle("active", on);
    t.setAttribute("aria-selected", on);
  });
  if (mode === "live") {
    body.innerHTML = `<div class="loader" id="loader">Loading live preview…</div>
      <iframe src="${esc(p.live)}" title="Live preview of ${esc(p.title)}" loading="lazy" referrerpolicy="no-referrer"></iframe>`;
    const frame = $("iframe", body);
    frame.addEventListener("load", () => $("#loader")?.classList.add("hide"));
    setTimeout(() => { const l = $("#loader"); if (l) l.textContent = "Taking a while? Use the button below to open the site in a new tab."; }, 8000);
  } else if (p.screenshot) {
    body.innerHTML = `<img src="${esc(p.screenshot)}" alt="Screenshot of ${esc(p.title)}">
      <div class="empty" id="shotEmpty" hidden>Screenshot not found.<br>Add it at <code>${esc(p.screenshot)}</code></div>`;
    $("img", body).addEventListener("error", (e) => { e.target.remove(); const m = $("#shotEmpty"); m.hidden = false; });
  } else {
    body.innerHTML = `<div class="empty">No screenshot yet.<br>Add one in the assets folder and set it in script.js.</div>`;
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
if (PROJECTS.length) renderPreview();

/* ---------- Contact ---------- */
const cards = [];
cards.push(`<a class="contact-card" href="${esc(CONFIG.github)}" target="_blank" rel="noopener noreferrer">
  <div class="skill-icon" aria-hidden="true">Git</div><div><small>GitHub</small><span>${esc(CONFIG.github.replace("https://", ""))}</span></div></a>`);
if (CONFIG.email) cards.unshift(`<a class="contact-card" href="mailto:${esc(CONFIG.email)}">
  <div class="skill-icon" aria-hidden="true">@</div><div><small>Email</small><span>${esc(CONFIG.email)}</span></div></a>`);
$("#contactCards").innerHTML = cards.join("");

$("#contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target, note = $("#formNote");
  const [name, email, message] = ["name", "email", "message"].map((n) => f.elements[n]);
  let ok = true;
  [name, email, message].forEach((el) => {
    const bad = !el.value.trim() || (el.type === "email" && !el.checkValidity());
    el.classList.toggle("invalid", bad); if (bad) ok = false;
  });
  note.className = "form-note";
  if (!ok) { note.classList.add("error"); note.textContent = "Please fill in all fields with valid details."; return; }
  if (!CONFIG.email) {
    note.classList.add("error");
    note.textContent = "Email isn't set up yet. Please contact me through GitHub for now.";
    return;
  }
  const subject = encodeURIComponent(`Portfolio message from ${name.value.trim()}`);
  const text = encodeURIComponent(`${message.value.trim()}\n\n— ${name.value.trim()} (${email.value.trim()})`);
  window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${text}`;
  note.textContent = "Opening your email app…";
  f.reset();
});

/* ---------- Mobile nav ---------- */
const toggle = $("#navToggle"), menu = $("#navMenu");
const setMenu = (open) => { menu.classList.toggle("open", open); toggle.setAttribute("aria-expanded", open); };
toggle.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
$$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

/* ---------- Header, back-to-top, active link ---------- */
const header = $("#header"), toTop = $("#toTop");
const onScroll = () => {
  header.classList.toggle("scrolled", scrollY > 20);
  toTop.classList.toggle("show", scrollY > 600);
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
