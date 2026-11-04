/* VERSION 8 - data.js: everything you edit lives in this file.
   Load order on the page: data.js first, then script.js. */

/* =====================================================================
   EASY UPDATE ZONE — edit only this file to change your portfolio.
   ===================================================================== */

const CONFIG = {
  name: "Ahmad Yunusa",
  github: "https://github.com/ahmadcrt",
  email: "Fxahmadey@gmail.com",
  whatsapp: "2349166116812",     // international format, digits only (+234 916 611 6812)
  phone: "08131538295",          // shown as written; the call link uses +234 813 153 8295
  location: "Nigeria",
  availability: "Working with clients worldwide",
  // If a project has no local screenshot file, show an automatic screenshot of its live site.
  autoScreenshots: true,
};
// Contact links shown in the Contact and Footer sections are written in index.html.
// If you ever change a number or address, update it there too.

// Short facts shown in the About section (only true things!)
const FACTS = [
  { label: "Role", value: "Web Developer & Graphic Designer" },
  { label: "Focus", value: "Responsive websites & visual design" },
  { label: "Core stack", value: "HTML5 · CSS3 · JavaScript" },
  { label: "Based in", value: "Nigeria · working with clients worldwide" },
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
    text: "Flyers, logos, posters, social media graphics and more — see the Graphic Design portfolio.", points: [] },
];

/* ---------------------------------------------------------------------
   PROJECTS — one block per website. To update a project, just fill in its fields:
     live: the working website URL  -> the card shows "Live Demo"
     repo: the GitHub repository URL (leave "" if none; the GitHub button only shows when set)
     tags: technologies you actually used, e.g. ["HTML5","CSS3","JavaScript"]
     group: the filter group the project appears under
     screenshot: optional. By default the site looks for your own screenshot at
                 assets/projects/<project-name>.jpg (e.g. assets/projects/nova-digital.jpg),
                 then falls back to an automatic screenshot of the live site.
   A project with no "live" link would show as "Coming Soon".
   --------------------------------------------------------------------- */
const PROJECTS = [
  { title: "NOVA DIGITAL", category: "Digital Marketing Agency", group: "Business & Finance",
    description: "My first published website: a digital marketing agency site, built with front-end web technologies and hosted on GitHub Pages.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    live: "https://ahmadcrt.github.io/nova-digital/", repo: "https://github.com/ahmadcrt/nova-digital", screenshot: "" },
  { title: "AHMAD PORTFOLIO", category: "Personal Developer Portfolio", group: "Personal",
    description: "The portfolio you're viewing now: a responsive site presenting my website projects and design work.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    live: "https://ahmadcrt.github.io/ahmad-portfolio/", repo: "https://github.com/ahmadcrt/ahmad-portfolio", screenshot: "" },
  { title: "LUXORA ESTATES", category: "Real Estate", group: "Property & Hospitality",
    description: "A demo luxury real estate website with searchable property listings, services and an enquiry form. All properties and people are fictional.",
    tags: [], live: "https://ahmadcrt.github.io/luxora-estates/", repo: "", screenshot: "" },
  { title: "SAVORA RESTAURANT", category: "Restaurant & Food", group: "Property & Hospitality",
    description: "A fictional restaurant website built as a portfolio demonstration, with a menu, gallery and a demo reservation form.",
    tags: [], live: "https://ahmadcrt.github.io/savora-restaurant/", repo: "", screenshot: "" },
  { title: "VELORA FITNESS", category: "Fitness & Gym", group: "Health, Fitness & Education",
    description: "A fictional premium gym website built as a front-end portfolio project, with programmes, trainers, membership plans and a class schedule.",
    tags: [], live: "https://ahmadcrt.github.io/velora-fitness/", repo: "", screenshot: "" },
  { title: "AMOO TECH", category: "Electronics E-commerce", group: "Business & Finance",
    description: "A fictional electronics store built for a front-end portfolio, with product listings, categories, sorting and availability filters.",
    tags: [], live: "https://ahmadcrt.github.io/Amoo-tech/", repo: "", screenshot: "" },
  { title: "EDUCORE", category: "Online Learning Platform", group: "Health, Fitness & Education",
    description: "An online learning platform demo with three learning academies, a course catalogue and sample course content.",
    tags: [], live: "https://ahmadcrt.github.io/educore/index.html", repo: "", screenshot: "" },
  { title: "REDCARE HOSPITALS", category: "Healthcare Management", group: "Health, Fitness & Education",
    description: "A healthcare management website project for a hospital brand.",
    tags: [], live: "https://ahmadcrt.github.io/-redcare-hospitals/", repo: "", screenshot: "" },
  { title: "AURELIA HOTELS", category: "Hotel Booking & Management", group: "Property & Hospitality",
    description: "A fictional luxury hotel website built as a multi-page demo, with rooms, booking, dining, facilities and offers. All rates and facilities are demonstration content.",
    tags: ["HTML5", "CSS3", "JavaScript"], live: "https://ahmadcrt.github.io/aurelia-hotels/", repo: "https://github.com/ahmadcrt/aurelia-hotels", screenshot: "" },
  { title: "PAYNEX FINTECH", category: "Financial Technology", group: "Business & Finance",
    description: "A demo banking platform for the PAYNEX fintech brand.",
    tags: [], live: "https://ahmadcrt.github.io/PAYNEX-FINTECH/", repo: "", screenshot: "" },
];

/* ---------------------------------------------------------------------
   GRAPHIC DESIGN GALLERY — how to add your real work (no other editing needed):
   The 8 pieces below are self-initiated CONCEPT designs (graphic-design-01 to 08.jpg).
   To replace one, save your own image with the same file name in assets/design/.

   To add MORE pieces, copy any line below, change the file name (…-02.jpg),
   the title and (optionally) add  description: "Your own short description".
   Optional fields:  thumb: "assets/design/thumbs/x.jpg" (small version for the
   grid, full image opens in the viewer),  alt: "describe the image".
   Delete a line to remove a piece. Delete all lines to hide the gallery.
   --------------------------------------------------------------------- */
const DESIGN_CATEGORIES = [
  { name: "Flyers & Promotional Designs", blurb: "Eye-catching flyers and promotional graphics.", ratio: "4/5" },
  { name: "Logo Design & Brand Identity", blurb: "Logo design and visual brand identity.", ratio: "1/1" },
  { name: "Social Media Designs", blurb: "Designs made for social media feeds and stories.", ratio: "1/1" },
  { name: "Business & Event Posters", blurb: "Posters for businesses and events.", ratio: "3/4" },
  { name: "Business Cards & Stationery", blurb: "Business cards and branded stationery.", ratio: "7/4" },
  { name: "YouTube Thumbnails", blurb: "Thumbnail designs for video channels.", ratio: "16/9" },
  { name: "Product Advertisements", blurb: "Advertising visuals that showcase products.", ratio: "4/5" },
  { name: "Certificates & Invitations", blurb: "Certificate and invitation designs.", ratio: "4/3" },
];
const DESIGNS = [
  { category: "Flyers & Promotional Designs", title: "Digital Agency Promo Flyer", image: "images/graphic-design-01.jpg", ratio: "3/4", concept: true,
    description: "Self-initiated concept: a bold promotional flyer for a fictional digital agency.",
    alt: "Promotional flyer for a fictional digital agency with the headline Grow your brand online" },
  { category: "Logo Design & Brand Identity", title: "Terravia Brand Identity", image: "images/graphic-design-02.jpg", ratio: "4/3", concept: true,
    description: "Self-initiated concept: logo, colour palette and typography for a fictional ceramics studio.",
    alt: "Brand identity board for a fictional ceramics brand with logo, colour palette and typography" },
  { category: "Product Advertisements", title: "Ember & Rye Burger Poster", image: "images/graphic-design-03.jpg", ratio: "3/4", concept: true,
    description: "Self-initiated concept: a food advertisement for a fictional burger restaurant, with an illustrated burger.",
    alt: "Advertisement poster with an illustrated burger and the headline Smash. Stack." },
  { category: "Flyers & Promotional Designs", title: "The Meridian Residences", image: "images/graphic-design-04.jpg", ratio: "4/5", concept: true,
    description: "Self-initiated concept: a luxury property advertisement for a fictional villa development.",
    alt: "Luxury property advertisement with an illustrated modern villa at dusk" },
  { category: "Social Media Designs", title: "Brewline Social Post", image: "images/graphic-design-05.jpg", ratio: "4/5", concept: true,
    description: "Self-initiated concept: a seasonal campaign post for a fictional coffee brand.",
    alt: "Social media post for a fictional coffee brand with a latte art illustration" },
  { category: "Business & Event Posters", title: "Future Forms Summit Poster", image: "images/graphic-design-06.jpg", ratio: "12/17", concept: true,
    description: "Self-initiated concept: an event poster for a fictional design and technology summit.",
    alt: "Event poster for a fictional design and technology summit with bold geometric shapes" },
  { category: "Business Cards & Stationery", title: "Strata Business Card", image: "images/graphic-design-07.jpg", ratio: "4/3", concept: true,
    description: "Self-initiated concept: front and back business card for a fictional consulting firm.",
    alt: "Front and back of a business card for a fictional consulting firm" },
  { category: "YouTube Thumbnails", title: "AI & Web Developers Thumbnail", image: "images/graphic-design-08.jpg", ratio: "16/9", concept: true,
    description: "Self-initiated concept: an attention-grabbing thumbnail for a technology video.",
    alt: "YouTube thumbnail with the text Will AI replace web devs and a glowing AI chip" },
];
