export const site = {
  name: "Amanda Chu",
  headline:
    "Information Technology – WADV Concentration · Computer Science & Design Thinking Undergraduate",
  location: "Virginia, US",
  available: true,
  email: "amandaachuu@gmail.com",
  phone: "703-608-1883",
  github: "https://github.com/amandachuu04",
  linkedin: "https://www.linkedin.com/in/amandaachu/",
  cvFile: "/Amanda-Chu-Resume.pdf",
  avatar: "/avatar.avif",
  about: [
    "I'm an Information Technology undergraduate concentrating in Web Application Development, minoring in both Computer Science and Design Thinking, with a strong interest in UX/UI design.",
    "I'm passionate about creating thoughtful, user-centered digital experiences that balance strong technical foundations with clean, intentional design. My academic background lets me approach projects from both a development and design perspective, building responsive web applications, designing intuitive interfaces, and exploring ways to improve accessibility and usability through research-driven decisions.",
    "I believe great design is inclusive, purposeful, and adaptable.",
  ],
};

export const navLinks = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "tools", label: "Tools" },
  { id: "contact", label: "Contact" },
];

export type ProjectCategory = "design" | "programming" | "both";

export type Project = {
  title: string;
  kind: string;
  category: ProjectCategory;
  meta?: string;
  href?: string;
  slug?: string;
  swatch: string;
  emoji: string;
  image?: string;
};

export const projects: Project[] = [
  {
    title: "Paws & Care",
    kind: "Design & Programming",
    category: "both",
    meta: "Feb – May 2026 · Figma, HTML, CSS, JavaScript",
    swatch: "from-blush-200 to-cream-200",
    emoji: "❦",
  },
  {
    title: "NexTrip",
    kind: "Design",
    category: "design",
    meta: "Feb – May 2026 · Figma",
    swatch: "from-cream-200 to-taupe-100",
    emoji: "✧",
  },
  {
    title: "FloraFlow",
    kind: "Design",
    category: "design",
    meta: "Sept – Dec 2025 · Figma",
    slug: "floraflow",
    swatch: "from-blush-200 to-cream-200",
    emoji: "✿",
    image: "/floraflow.avif",
  },
  {
    title: "MagTracker",
    kind: "Design — UX & Branding Lead",
    category: "design",
    meta: "Sept – Dec 2025 · Adobe Illustrator, Figma",
    slug: "magtracker",
    swatch: "from-taupe-100 to-blush-100",
    emoji: "✦",
    image: "/magtracker.avif",
  },
  {
    title: "Linking Narratives",
    kind: "Design & Programming",
    category: "both",
    meta: "Apr 21 – Apr 30, 2025 · HTML, CSS",
    slug: "linking-narratives",
    swatch: "from-blush-300/70 to-blush-100",
    emoji: "❀",
    image: "/linking-narratives.png",
  },
  {
    title: "Dungeon Cube Caesar",
    kind: "Programming",
    category: "programming",
    meta: "Oct 3 – Oct 17, 2024 · C",
    slug: "dungeon-cube-caesar",
    swatch: "from-cream-200 to-taupe-100",
    emoji: "◆",
    image: "/dungeon-cube-caesar.png",
  },
  {
    title: "Grade Management System",
    kind: "Programming",
    category: "programming",
    meta: "Apr 8 – Apr 22, 2024 · Java",
    slug: "grade-management-system",
    swatch: "from-taupe-100 to-cream-200",
    emoji: "◈",
    image: "/grade-management-system.avif",
  },
  {
    title: "Name Logo Design",
    kind: "Design",
    category: "design",
    meta: "Apr 8 – Apr 22, 2024 · Adobe Illustrator",
    slug: "name-logo-design",
    swatch: "from-blush-200 to-blush-100",
    emoji: "✱",
    image: "/name-logo-design.avif",
  },
  {
    title: "Federico's Menu",
    kind: "Design",
    category: "design",
    meta: "Mar 11 – Mar 25, 2024 · Adobe InDesign, Adobe Photoshop",
    slug: "federicos-menu",
    swatch: "from-cream-200 to-blush-200",
    emoji: "❖",
    image: "/federicos-menu.avif",
  },
  {
    title: "Choco Cake Recipe",
    kind: "Design",
    category: "design",
    meta: "Mar 4 – Mar 11, 2024 · Adobe InDesign",
    swatch: "from-blush-100 to-taupe-100",
    emoji: "◐",
    image: "/choco-cake-recipe.avif",
  },
  {
    title: "Banana Bread Recipe",
    kind: "Design",
    category: "design",
    meta: "Feb 19 – Feb 26, 2024 · Adobe InDesign",
    swatch: "from-cream-200 to-blush-100",
    emoji: "◓",
    image: "/banana-bread-recipe.avif",
  },
  {
    title: "Hierarchy AD",
    kind: "Design",
    category: "design",
    meta: "Feb 12 – Feb 19, 2024 · Adobe InDesign",
    swatch: "from-blush-200 to-taupe-100",
    emoji: "▣",
    image: "/hierarchy-ad.avif",
  },
  {
    title: "Lane Scheduling System",
    kind: "Programming",
    category: "programming",
    meta: "Nov 6 – Nov 20, 2023 · Python",
    slug: "lane-scheduling-system",
    swatch: "from-cream-200 to-taupe-100",
    emoji: "⌘",
    image: "/lane-scheduling-system.avif",
  },
  {
    title: "Modular Grid",
    kind: "Design",
    category: "design",
    meta: "Feb 8 – Mar 1, 2023 · 3 versions · Adobe Illustrator, Adobe Photoshop",
    swatch: "from-taupe-100 to-blush-200",
    emoji: "▦",
    image: "/modular-grid.avif",
  },
];

export type ProjectFolder = {
  slug: "all" | ProjectCategory;
  label: string;
  description: string;
};

export const projectFolders: ProjectFolder[] = [
  { slug: "all", label: "All", description: "Every project, newest first." },
  {
    slug: "design",
    label: "Design",
    description: "Creative design projects across visual, brand, and digital spaces.",
  },
  {
    slug: "programming",
    label: "Programming",
    description: "Code-forward builds and experiments.",
  },
  {
    slug: "both",
    label: "Design + Programming",
    description: "Projects that blend visual thinking with functional code.",
  },
];

export function projectsForFolder(slug: ProjectFolder["slug"]): Project[] {
  if (slug === "all") return projects;
  return projects.filter((p) => p.category === slug);
}

export type GalleryItem =
  | { kind?: "image"; src: string; caption?: string; aspect?: "phone" | "wide" | "square" }
  | { kind: "video"; src: string; poster?: string; caption?: string; aspect?: "phone" | "wide" | "square" };

export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  cover: string;
  meta: {
    role: string;
    timeline: string;
    duration: string;
    tools: string;
  };
  externalLink?: {
    href: string;
    label: string;
  };
  intro: string;
  sections: Array<{
    label: string;
    heading: string;
    body: string;
    bullets?: string[];
  }>;
  skills: string[];
  gallery: GalleryItem[];
  galleryHeading?: string;
  galleryNote?: string;
  featuredNote?: string;
};

export const caseStudies: Record<string, CaseStudy> = {
  floraflow: {
    slug: "floraflow",
    title: "FloraFlow",
    tagline:
      "A calming, screen free focus system that pairs an ambient flower inspired lamp with a minimal companion app, letting students plan a session and then step away from the screen.",
    cover: "/floraflow/01-cover.jpg",
    meta: {
      role: "Solo, UX/UI & Branding",
      timeline: "Sept to Dec 2025",
      duration: "~3 months",
      tools: "Figma",
    },
    externalLink: {
      href: "https://www.figma.com/design/2srYhqZXTtBmfCCGurQyTg/FloraFlow?node-id=0-1&t=X9ELOtpU3mPIlj2U-1",
      label: "View website",
    },
    intro:
      "FloraFlow is a calming, screen free focus system designed to help students stay productive without digital distractions. It pairs an ambient, flower inspired lamp with a minimal companion app that allows users to plan focus sessions and then step away from their screens.",
    sections: [
      {
        label: "01 / Problem",
        heading: "Screens are the workspace and the distraction.",
        body: "Through research and observation, I found that many students and early career learners struggle to stay focused because they are constantly surrounded by screens. Phones and laptops often become sources of distraction even when users are trying to work. Many existing study tools also keep users stuck on screen with notifications, reminders, or streak based pressure, so instead of reducing distractions, they add more digital noise. This leads to frequent interruptions, difficulty maintaining deep focus, and reliance on tools that require constant interaction.",
      },
      {
        label: "02 / Opportunity",
        heading: "Plan once. Then look away.",
        body: "Students need a calming, screen free way to focus because their study environment is overloaded with digital distractions. Even productivity tools can overwhelm users with notifications and alerts that keep attention tied to their devices. The design opportunity is an ambient device paired with a simple companion app that supports planning upfront and then allows the user to step away from the screen entirely.",
      },
      {
        label: "03 / Ideate",
        heading: "Key features",
        body: "To reduce visual noise, simplify planning, and guide focus sessions without continuous phone or laptop interaction, I explored a system that feels calming, intuitive, and supportive rather than overwhelming.",
        bullets: [
          "Ambient, flower inspired lamp that provides gentle lighting cues for focus sessions.",
          "Minimal companion app for quick setup so users can create sessions and organize tasks before putting the phone away.",
          "Task chunking that breaks large workloads into manageable segments.",
          "Light based guidance instead of notification heavy reminders.",
          "Purpose specific modes: Reading, Studying, and Homework.",
          "Designed for consistency and habit building without guilt or streak pressure.",
        ],
      },
      {
        label: "04 / Audience",
        heading: "Target market",
        body: "FloraFlow is designed for students and early career learners ages 16 to 30 who struggle to stay focused while working around screens. This includes high school and college students, graduate students, and young professionals balancing learning with responsibilities. Many of these users feel overwhelmed by digital noise and want a calming, simple, and aesthetically pleasing way to focus without relying on screen based productivity apps. FloraFlow is especially helpful for users who feel pressured by notification heavy tools and prefer a gentle, ambient approach that fits naturally into their workspace.",
      },
      {
        label: "05 / Research",
        heading: "Survey insights",
        body: "To gather early insights, I created a Google Form to understand students' study habits, tools, and biggest distractions. Responses showed that while many students use tools such as Notion, Google Calendar, Todoist, and Quizlet, they often feel overwhelmed by complex interfaces, constant notifications, or paid features. Most respondents reported that they can only stay focused for about 20 to 30 minutes before getting distracted by phone alerts, messages, or fatigue. These results reinforced the need for a calm, screen free focus system that avoids unnecessary notifications and helps users manage tasks in smaller, more approachable segments.",
      },
    ],
    skills: [
      "UX Research",
      "User Personas",
      "Journey Mapping",
      "Branding",
      "Design Thinking",
      "Prototyping",
    ],
    galleryHeading: "Final screens",
    galleryNote:
      "Companion app with quick session setup, task chunking, and purpose specific modes paired with the lamp.",
    featuredNote:
      "A flower-inspired mark that represents the lamp’s soft light and calming focus experience.",
    gallery: [
      { src: "/floraflow/02.png", caption: "Brand mark", aspect: "square" },
      { src: "/floraflow/03.png", caption: "Sign in", aspect: "phone" },
      { src: "/floraflow/04.png", caption: "Daily schedule", aspect: "phone" },
      { src: "/floraflow/05.png", caption: "Weekly schedule", aspect: "phone" },
      { src: "/floraflow/06.png", caption: "Monthly calendar", aspect: "phone" },
      { src: "/floraflow/07.png", caption: "QR scanner", aspect: "phone" },
      { src: "/floraflow/08.png", caption: "Profile and settings", aspect: "phone" },
      {
        kind: "video",
        src: "/floraflow/demo.mp4",
        poster: "/floraflow/01-cover.jpg",
        caption: "Lamp in use",
        aspect: "wide",
      },
    ],
  },
};

caseStudies.magtracker = {
  slug: "magtracker",
  title: "MagTracker",
  tagline:
    "A straightforward, organized method for locating misplaced items without depending on heavy GPS tracking devices.",
  cover: "/magtracker.avif",
  meta: {
    role: "UX & Branding Lead",
    timeline: "Sept to Dec 2025",
    duration: "~3 months",
    tools: "Adobe Illustrator, Figma",
  },
  externalLink: {
    href: "https://www.figma.com/design/cnOMtYLPY2KLgRpUscTexD/Group-Design-Sprints?t=X9ELOtpU3mPIlj2U-1",
    label: "View website",
  },
  intro:
    "MagTracker reimagines item tracking as a lightweight, low-cost system built around QR codes and modular attachments, so families and students can label everyday belongings without buying a GPS tracker for every item.",
  sections: [
    {
      label: "01 / Empathize",
      heading: "People lose everyday things, often.",
      body:
        "Research showed that individuals regularly misplace everyday objects like water bottles, wallets, and backpacks. Many existing tracking solutions feel expensive, bulky, or unreliable, especially when attachments fall off or require constant battery maintenance. There is a clear gap between needing to keep tabs on everyday items and the heavy, GPS first solutions on the market.",
    },
    {
      label: "02 / Define",
      heading: "A simpler way to keep track of things.",
      body:
        "The core challenge was creating a simple and affordable way to keep track of everyday belongings while maintaining ease of use and flexibility. The goal was a tracker that is light enough to live on anything, durable enough to survive daily use, and cheap enough that you do not think twice about putting one on every backpack or water bottle.",
    },
    {
      label: "03 / Ideate",
      heading: "Key features",
      body:
        "Instead of GPS, MagTracker relies on a QR based identification system that works without batteries or pairing. Multiple form factors let people pick the attachment that best fits their item, and a companion app handles permission based sharing if a stranger scans a found item.",
      bullets: [
        "Multiple tracker formats including sticker, clip, keychain ready hole, and magnet.",
        "QR based tracking without GPS hardware or batteries.",
        "Durable body with a protective cover that shields the QR code from scratches and weather.",
        "Secure companion app with permission based sharing capabilities.",
        "Minimal, lifestyle friendly design that blends into everyday objects.",
        "Budget friendly alternative to traditional GPS trackers.",
      ],
    },
    {
      label: "04 / Audience",
      heading: "Target market",
      body:
        "MagTracker is designed for students, young professionals, and individuals aged 20 to 25 who often juggle busy schedules and frequently misplace small daily items. The system also fits families who need an affordable labeling solution for kids' belongings such as backpacks, lunchboxes, and water bottles, without the cost of buying a separate GPS tracker for every item.",
    },
    {
      label: "05 / Test",
      heading: "Prototype durability",
      body:
        "Physical prototypes underwent durability evaluation. The magnet and clip attachments remained secure during normal daily activities, including commuting and carrying items in bags or pockets. Testing confirmed that low cost form factors could survive everyday wear without compromising the QR code or the attachment integrity, validating the core hardware direction before any further investment.",
    },
  ],
  skills: [
    "UX Research",
    "User Personas",
    "Journey Mapping",
    "Branding",
    "Team Collaboration",
    "Design Thinking",
    "Prototyping",
  ],
  galleryHeading: "Brand and product",
  galleryNote:
    "A sage green identity, a companion app for tracking and sharing items, and physical prototypes attached to a water bottle and backpack.",
  featuredNote:
    "A visual mark that brings together a bag, the letters M and T, and a location pin for the tracker system.",
  gallery: [
    { src: "/magtracker/01-brand.webp", caption: "Brand mark", aspect: "square" },
    { src: "/magtracker/02-login.webp", caption: "Sign in", aspect: "phone" },
    { src: "/magtracker/03-home.webp", caption: "Home — tracked items", aspect: "phone" },
    { src: "/magtracker/04-shared.webp", caption: "Shared devices", aspect: "phone" },
    { src: "/magtracker/05-profile.webp", caption: "Profile & settings", aspect: "phone" },
    { src: "/magtracker/06-scanner.webp", caption: "QR scanner", aspect: "phone" },
    { src: "/magtracker/07-bottle.webp", caption: "Prototype — water bottle", aspect: "phone" },
    { src: "/magtracker/08-backpack.webp", caption: "Prototype — backpack", aspect: "phone" },
    {
      kind: "video",
      src: "/magtracker/demo.mp4",
      caption: "Prototype in use",
      aspect: "wide",
    },
  ],
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug];
}

export type ProjectPage = {
  slug: string;
  title: string;
  tagline: string;
  cover: string;
  meta: {
    role: string;
    timeline: string;
    duration: string;
    tools: string;
  };
  externalLink?: {
    href: string;
    label: string;
  };
  description: string[];
  skills: string[];
  video?: {
    src: string;
    poster?: string;
    caption?: string;
  };
  iterations?: Array<{
    label: string;
    heading?: string;
    images: Array<{ src: string; caption?: string }>;
  }>;
};

export const projectPages: Record<string, ProjectPage> = {
  "linking-narratives": {
    slug: "linking-narratives",
    title: "Linking Narratives",
    tagline:
      "A multi page, cloud themed web presentation of “Sweet Dreams” lyrics. Each page lifts a single line off a soft cloud background, and a highlighted word in that line is the link that carries you to the next page.",
    cover: "/linking-narratives.png",
    meta: {
      role: "Solo, Design & Front end",
      timeline: "Apr 21 to Apr 30, 2025",
      duration: "~1 week",
      tools: "HTML, CSS, Adobe XD",
    },
    externalLink: {
      href: "https://github.com/amandachuu04/Linked-Narratives",
      label: "View on GitHub",
    },
    description: [
      "Linking Narratives is a short, multi-page web experience that transforms the lyrics of “Sweet Dreams” by J-Hope and Miguel into a guided narrative. Instead of placing the full song on one screen, each lyric line lives on its own page, paired with a fixed full-screen cloud illustration that gives every moment its own atmosphere.",
      "I first sketched the structure in Adobe XD before developing the site with HTML and CSS. To create a soft, dreamlike feeling, I paired serif and script Google Fonts rather than using visuals that felt too literal. The final experience spans eleven HTML pages with two shared stylesheets. Each page moves to the next through one highlighted word, turning navigation into part of the storytelling. The selected word acts as both a link and a small poetic clue, gently hinting at where the next line will lead.",
    ],
    skills: [
      "Web Design",
      "Front end Development",
      "Typography",
      "HTML",
      "CSS",
      "Multi page Navigation",
    ],
    video: {
      src: "/linking-narratives/demo.mp4",
      poster: "/linking-narratives.png",
      caption: "Walking through the eleven pages",
    },
  },
  "name-logo-design": {
    slug: "name-logo-design",
    title: "Name Logo Design",
    tagline:
      "A typography-based logo exploration using different fonts, name and initial designs, simple styles, shapes, and minimal illustrations to create a final personal logo.",
    cover: "/name-logo-design.avif",
    meta: {
      role: "Solo, Typographic Design",
      timeline: "Apr 8 to Apr 22, 2024",
      duration: "~2 weeks",
      tools: "Adobe Illustrator",
    },
    description: [
      "This Name Logo Design is a typography-based design focused on creating a logo using only my name. The goal was to explore how type, spacing, contrast, layout, and minimal visual elements can turn a simple name into a more polished personal identity. Each design was created with clear margins and consistent spacing, while keeping illustrations simple so the typography remained the main focus.",
      "The exploration included full-name and initial-based logo designs using Helvetica, Baskerville, and other fonts. Different uppercase and lowercase combinations, gray value contrasts, colors, shapes, and minimal illustrations were tested to create a variety of visual directions. Through this process, the strongest design ideas were refined into a final logo that felt intentional, balanced, and personal.",
    ],
    skills: [
      "Typography",
      "Logo Design",
      "Layout",
      "Visual Hierarchy",
      "Adobe Illustrator",
    ],
    iterations: [
      {
        label: "Iteration 01",
        heading: "Helvetica and Baskerville",
        images: [
          { src: "/name-logo-design/img-1.avif" },
          { src: "/name-logo-design/img-2.avif" },
        ],
      },
      {
        label: "Iteration 02",
        heading: "Full name designs",
        images: [
          { src: "/name-logo-design/img-3.avif" },
          { src: "/name-logo-design/img-4.avif" },
          { src: "/name-logo-design/img-5.avif" },
          { src: "/name-logo-design/img-6.avif" },
        ],
      },
      {
        label: "Iteration 03",
        heading: "Initials logo designs",
        images: [{ src: "/name-logo-design/img-7.avif" }],
      },
      {
        label: "Iteration 04",
        heading: "Final design",
        images: [{ src: "/name-logo-design.avif" }],
      },
    ],
  },
  "dungeon-cube-caesar": {
    slug: "dungeon-cube-caesar",
    title: "Dungeon Cube Caesar",
    tagline:
      "A C program that implements a two player game where a random five letter word is generated and two dice are rolled each round. Players reveal letters based on dice rolls, and whoever uncovers the entire word first loses, triggering a Caesar cipher encryption of that word.",
    cover: "/dungeon-cube-caesar.png",
    meta: {
      role: "Solo, C Development",
      timeline: "Oct 3 to Oct 17, 2024",
      duration: "~2 weeks",
      tools: "C, Makefile",
    },
    externalLink: {
      href: "https://github.com/amandachuu04/Dungeon-Cube-Caesar",
      label: "View on GitHub",
    },
    description: [
      "Dungeon Cube Caesar is a turn-based command-line game written in C where players race against a hidden five-letter word. In each round, a random lowercase word is generated, two dice are rolled, and the cumulative total moves each player further through their own hidden word. The first player to reveal the full word loses, and their word is then encrypted using a Caesar cipher with a shift based on their total roll modulo 26.",
      "The program uses a seeded random number generator so games can be reproduced consistently. It also includes validated player names between two and eight characters, flexible dice input that accepts formats like 3x3 or 2 x 5, and organized logic for word generation, turn handling, input parsing, and encryption. I structured the project into smaller, testable functions and used a Makefile to compile everything into a single executable that can run through interactive input or a redirected input file.",
    ],
    skills: [
      "C Programming",
      "Input Validation",
      "Makefile",
      "Command Line Interface",
    ],
  },
  "lane-scheduling-system": {
    slug: "lane-scheduling-system",
    title: "Lane Scheduling System",
    tagline:
      "A Python module for simulating simple parking lane operations: checking lane status, parking cars, retrieving cars, verifying car presence, and generating the sequence of moves needed to bring a specific car to the front.",
    cover: "/lane-scheduling-system.avif",
    meta: {
      role: "Solo, Python Development",
      timeline: "Nov 6 to Nov 20, 2023",
      duration: "~2 weeks",
      tools: "Python",
    },
    externalLink: {
      href: "https://github.com/amandachuu04/Parking-Lot",
      label: "View on GitHub",
    },
    description: [
      "Lane Scheduling System is a Python module that models a small parking lane and the everyday operations a lane manager might need: checking whether a lane is empty or full, parking a car at the back, retrieving the car at the front, verifying whether a specific car sits in the lane, and generating the exact sequence of moves needed to bring a target car to the front. The goal was to translate a real world queue style problem into clean, reusable functions that read top to bottom.",
      "Each operation is broken into a small helper so the logic stays readable and easy to reason about. The retrieval routine produces a step by step list of car movements rather than just a final state, which makes it possible to replay what happened to the lane during a request. The module is paired with a driver that runs through sample lane scenarios and prints the results, so the behavior of every function can be observed end to end without writing a custom test harness.",
    ],
    skills: [
      "Python",
      "Algorithms",
      "Data Structures",
      "Modular Programming",
      "Simulation",
    ],
  },
  "federicos-menu": {
    slug: "federicos-menu",
    title: "Federico's Menu",
    tagline:
      "Menu Design that explores two typography-focused layouts for a fictional restaurant: one in black and white and one in blue and cream. Both versions are built around clear visual hierarchy, consistent paragraph and character styles, and generous margins to create a clean, readable dining experience.",
    cover: "/federicos-menu.avif",
    meta: {
      role: "Solo, Print & Typographic Design",
      timeline: "Mar 11 to Mar 25, 2024",
      duration: "~2 weeks",
      tools: "Adobe InDesign, Adobe Photoshop",
    },
    description: [
      "Federico’s Menu is a print menu project centered on hierarchy, typography, and readability. Two menu designs were created for the same restaurant: one in black and white and one in blue and cream. Each version was designed to feel visually distinct while still using consistent paragraph styles, character styles, and margins of at least 0.75 inches on every side.",
      "The black-and-white version pairs American Typewriter with KoHo to create a warm editorial feel with a clean, modern body typeface. The blue-and-cream version uses Lust and Sarabun for a softer and more elegant tone. Both menus were designed in Adobe InDesign, with supporting imagery prepared in Adobe Photoshop. Across both versions, the goal was to keep the typography legible, the spacing intentional, and the hierarchy easy to scan from across a table.",
    ],
    skills: [
      "Typography",
      "Layout & Hierarchy",
      "Paragraph & Character Styles",
      "Print Design",
      "Adobe InDesign",
      "Adobe Photoshop",
    ],
    iterations: [
      {
        label: "Black and white",
        heading: "Menu spread",
        images: [{ src: "/federicos-menu/04-bw-spread.jpg" }],
      },
      {
        label: "Blue and cream",
        heading: "Interior and exterior designs",
        images: [
          { src: "/federicos-menu/02-spread.avif" },
          { src: "/federicos-menu/05-interior.webp" },
        ],
      },
      {
        label: "Blue and cream",
        heading: "Front and dessert panels",
        images: [
          { src: "/federicos-menu/01-brand.avif" },
          { src: "/federicos-menu/03-desserts.avif" },
        ],
      },
      {
        label: "Blue and cream",
        heading: "Final design",
        images: [{ src: "/federicos-menu.avif" }],
      },
    ],
  },
  "grade-management-system": {
    slug: "grade-management-system",
    title: "Grade Management System",
    tagline:
      "A Java based grade processing toolkit that computes a student's total weighted score with category drops and averaging, assigns a final letter grade, and supports both interactive and batch driver programs.",
    cover: "/grade-management-system.avif",
    meta: {
      role: "Solo, Java Development",
      timeline: "Apr 8 to Apr 22, 2024",
      duration: "~2 weeks",
      tools: "Java",
    },
    externalLink: {
      href: "https://github.com/amandachuu04/Student-Grades-Calculator",
      label: "View on GitHub",
    },
    description: [
      "Grade Management System is a Java-based grade calculator that computes a student’s overall course grade from weighted category scores. It handles category averages, drops the lowest scores when the grading policy allows, and converts the final weighted total into a letter grade. The goal was to model a realistic gradebook workflow that takes raw scores and turns them into a clear final result.",
      "The system supports both individual and full-class grade checking. GradeChecker walks through one student’s scores interactively, while GradeChecker2 works with a Gradebook class to load a class of students and report the minimum, maximum, median, and average across the group. I organized the logic into smaller helper methods for input parsing, validation, weighted score calculation, and letter grade assignment so each part of the program could be easier to understand, test, and maintain.",
    ],
    skills: [
      "Java",
      "Object Oriented Programming",
      "Data Aggregation",
      "Input Validation",
      "Command Line Interface",
      "Algorithms",
    ],
  },
};

export function getProjectPage(slug: string): ProjectPage | undefined {
  return projectPages[slug];
}

export type Experience = {
  company: string;
  role: string;
  location: string;
  dates: string;
  bullets: string[];
};

export const experiences: Experience[] = [
  {
    company: "Running Name LLC",
    role: "Graphic Design Intern",
    location: "Woodbridge, VA / Remote",
    dates: "Nov 2025 — Present",
    bullets: [
      "Designed visual assets (logos, social graphics, branding materials) aligned with client goals, brand identity, and target audiences.",
      "Collaborated with clients to iterate on designs through feedback, revisions, and refinement, ensuring clarity, consistency, and usability.",
      "Managed multiple design projects simultaneously while meeting deadlines and maintaining high visual and brand standards.",
    ],
  },
  {
    company: "George Mason University",
    role: "Tutor",
    location: "Fairfax, VA / Remote",
    dates: "Sep 2025 — May 2026",
    bullets: [
      "Designed and delivered personalized one-on-one lessons using Self-Regulated Learning (SRL) strategies, goal-setting, performance monitoring, reflection.",
      "Adapted instruction to individual skill levels through interactive activities, targeted practice, and structured routines to improve mastery.",
      "Implemented motivation and engagement strategies (voice and choice, reward systems, ongoing feedback) while tracking student progress.",
    ],
  },
  {
    company: "PCCI Inc.",
    role: "Intern",
    location: "Alexandria, VA / Remote",
    dates: "Nov 2020 — Mar 2021",
    bullets: [
      "Streamlined digital organization by categorizing and relocating vendor documents, improving file accessibility and reducing retrieval time.",
      "Enhanced accounts payable accuracy by scanning, renaming, and uploading invoice files into Deltek Costpoint modules.",
      "Supported financial tracking by identifying and verifying check numbers within the Deltek Costpoint system.",
    ],
  },
];

export const education = [
  {
    degree: "B.S. Information Technology — WADV Concentration",
    school: "George Mason University",
    location: "Fairfax, VA",
    dates: "2022 — Expected Dec 2027",
    note: "Minor in Computer Science & Design Thinking · GPA 3.61",
  },
  {
    degree: "Advanced Diploma",
    school: "Falls Church High School",
    location: "Falls Church, VA",
    dates: "2018 — 2022",
  },
];

export const certifications = [
  { name: "Microsoft Excel", year: "2022" },
  { name: "Microsoft PowerPoint", year: "2022" },
  { name: "Microsoft Word", year: "2022" },
];

export const toolGroups = [
  {
    title: "Programming",
    items: ["Python", "Java", "C", "SQL", "HTML", "CSS"],
  },
  {
    title: "Design",
    items: [
      "Adobe Illustrator",
      "Adobe InDesign",
      "Adobe Photoshop",
      "Adobe XD",
      "Figma",
      "Canva",
    ],
  },
  {
    title: "No-code",
    items: ["Framer"],
  },
  {
    title: "Office",
    items: ["Microsoft Word", "PowerPoint", "Excel"],
  },
];
