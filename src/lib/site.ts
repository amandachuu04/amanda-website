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
    image: "/paws-and-care.jpg",
  },
  {
    title: "NexTrip",
    kind: "Design",
    category: "design",
    meta: "Feb – May 2026 · Figma",
    slug: "nextrip",
    swatch: "from-cream-200 to-taupe-100",
    emoji: "✧",
    image: "/nextrip.png",
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
    slug: "choco-cake-recipe",
    swatch: "from-blush-100 to-taupe-100",
    emoji: "◐",
    image: "/choco-cake-recipe.avif",
  },
  {
    title: "Banana Bread Recipe",
    kind: "Design",
    category: "design",
    meta: "Feb 19 – Feb 26, 2024 · Adobe InDesign",
    slug: "banana-bread-recipe",
    swatch: "from-cream-200 to-blush-100",
    emoji: "◓",
    image: "/banana-bread-recipe.avif",
  },
  {
    title: "Hierarchy AD",
    kind: "Design",
    category: "design",
    meta: "Feb 12 – Feb 19, 2024 · Adobe InDesign",
    slug: "hierarchy-ad",
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
    slug: "modular-grid",
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

export type SectionMediaItem =
  | { kind?: "image"; src: string; alt?: string; caption?: string }
  | { kind: "video"; src: string; poster?: string; caption?: string };

export type SectionMediaFrame = "phone" | "iphone" | "wide" | "square" | "auto";

export type SectionMedia =
  | {
      layout: "single";
      frame?: SectionMediaFrame;
      tone?: "light" | "dark";
      item: SectionMediaItem;
    }
  | {
      layout: "grid";
      cols?: 2 | 3 | 4;
      frame?: SectionMediaFrame;
      tone?: "light" | "dark";
      items: SectionMediaItem[];
    }
  | {
      layout: "phones";
      tone?: "light" | "dark";
      items: SectionMediaItem[];
    };

export type CaseStudySection = {
  label: string;
  heading: string;
  body: string;
  bullets?: string[];
  media?: SectionMedia;
  extraMedia?: SectionMedia;
  mediaPlacement?: "after" | "after-bullets";
};

export type GalleryFlow = {
  label: string;
  items: GalleryItem[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  cover: string;
  category?: ProjectCategory;
  meta: {
    role: string;
    timeline: string;
    duration: string;
    tools: string;
    variations?: string;
    fonts?: string;
    size?: string;
    language?: string;
  };
  externalLink?: {
    href: string;
    label: string;
  };
  intro: string;
  sections: CaseStudySection[];
  skills: string[];
  gallery: GalleryItem[];
  galleryFlows?: GalleryFlow[];
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
    category: "design",
    meta: {
      role: "Solo, UX/UI & Branding",
      timeline: "September – December 2025",
      duration: "3 months",
      tools: "Figma",
      fonts: "Fraunces",
    },
    externalLink: {
      href: "https://www.figma.com/design/2srYhqZXTtBmfCCGurQyTg/FloraFlow?node-id=0-1&t=X9ELOtpU3mPIlj2U-1",
      label: "View Prototype",
    },
    intro:
      "FloraFlow is a calming, screen free focus system designed to help students stay productive without digital distractions. It pairs an ambient, flower inspired lamp with a minimal companion app that allows users to plan focus sessions and then step away from their screens.",
    sections: [
      {
        label: "01 / Problem",
        heading: "Screens are the workspace and the distraction",
        body: "Through research and observation, I found that many students and early career learners struggle to stay focused because they are constantly surrounded by screens. Phones and laptops often become sources of distraction even when users are trying to work. Many existing study tools also keep users stuck on screen with notifications, reminders, or streak based pressure, so instead of reducing distractions, they add more digital noise. This leads to frequent interruptions, difficulty maintaining deep focus, and reliance on tools that require constant interaction.",
      },
      {
        label: "02 / Opportunity",
        heading: "Plan once. Then look away",
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
  category: "design",
  meta: {
    role: "UX & Branding Lead",
    timeline: "September – December 2025",
    duration: "3 months",
    tools: "Adobe Illustrator, Figma",
    fonts: "ATF Franklin Gothic",
  },
  externalLink: {
    href: "https://www.figma.com/design/cnOMtYLPY2KLgRpUscTexD/Group-Design-Sprints?t=X9ELOtpU3mPIlj2U-1",
    label: "View Prototype",
  },
  intro:
    "MagTracker reimagines item tracking as a lightweight, low-cost system built around QR codes and modular attachments, so families and students can label everyday belongings without buying a GPS tracker for every item.",
  sections: [
    {
      label: "01 / Empathize",
      heading: "People lose everyday things, often",
      body:
        "Research showed that individuals regularly misplace everyday objects like water bottles, wallets, and backpacks. Many existing tracking solutions feel expensive, bulky, or unreliable, especially when attachments fall off or require constant battery maintenance. There is a clear gap between needing to keep tabs on everyday items and the heavy, GPS first solutions on the market.",
    },
    {
      label: "02 / Define",
      heading: "A simpler way to keep track of things",
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

caseStudies.nextrip = {
  slug: "nextrip",
  title: "NexTrip",
  tagline:
    "Less Planning. More Exploring. A travel planning app that builds personalized trip itineraries from destination, budget, and trip length, then organizes everything into a calm, customizable daily schedule.",
  cover: "/nextrip.png",
  category: "design",
  meta: {
    role: "Solo, UX/UI & Branding",
    timeline: "February – May 2026",
    duration: "3 months",
    tools: "Figma",
    fonts: "Poppins",
  },
  externalLink: {
    href: "https://www.figma.com/design/9z6JlO3iF8rleZMzw0fjEz/NexTrip-Final-Prototype?node-id=0-1&t=Wam6IaL09GrLC6qf-1",
    label: "View Prototype",
  },
  intro:
    "NexTrip is a travel planning app that helps users quickly create personalized trip itineraries based on destination, budget, and trip length. It provides activity recommendations and organizes them into a customizable daily schedule to make planning easier and less stressful.",
  sections: [
    {
      label: "01 / Problem",
      heading: "Planning a detailed trip can feel overwhelming",
      body:
        "Planning a detailed organized trip itinerary is a challenge for travelers planning multi day or multi country trips because the planning process can feel overwhelming, especially when visiting locations they have never been to before and are unfamiliar with transportation, activities, costs, and local logistics.",
    },
    {
      label: "02 / User Goals",
      heading: "What travelers actually want",
      body:
        "Through research findings, I identified five key user needs that shaped the design direction, including onboarding, trip planning, and itinerary editing.",
      bullets: [
        "Organize activities, meals, transportation, and housing without switching between multiple apps or websites.",
        "Get guidance and structure so planning feels less overwhelming, especially when local transportation, customs, or costs are unfamiliar.",
        "Adjust start times, return times, pacing, and activity types to fit a personal travel style.",
        "Control spending by setting budget limits and seeing how activities and transportation choices affect costs.",
        "Modify itineraries when plans change, without having to rebuild the entire trip.",
      ],
    },
    {
      label: "03 / About",
      heading: "Less planning. More exploring.",
      body:
        "NexTrip simplifies the travel planning process by creating personalized itineraries based on the length of the trip, budget, schedule, and travel preferences. The app helps users easily organize their plans with smart suggestions and customizable schedules, making trip planning feel easier, more organized, and far less stressful.",
    },
    {
      label: "04 / Research",
      heading: "User Personas & Survey Responses",
      body:
        "Based on the three user interviews, I created three personas as well as a Google form survey that received 21 responses to better understand their shared needs, habits, and frustrations. Each persona reflected a different type of traveler: a young software engineer who plans solo and friend trips, a college student coordinating group travel around school and work, and a college student balancing tutoring, babysitting, and trips with her boyfriend. From the responses, a clear pattern emerged: travelers often felt overwhelmed by organizing activities, building itineraries, managing budgets, and coordinating with others. These insights helped define the project's direction: a single travel planning app where users could manage flights, hotels, activities, budgets, and itinerary changes with less stress.",
      media: {
        layout: "grid",
        cols: 3,
        frame: "auto",
        items: [
          { src: "/nextrip/process/persona-1.png", alt: "Persona 1, Abdullah Ali, software engineer", caption: "Abdullah, software engineer" },
          { src: "/nextrip/process/persona-2.png", alt: "Persona 2, Adriana Becerra, college student and substitute teacher", caption: "Adriana, college student" },
          { src: "/nextrip/process/persona-3.png", alt: "Persona 3, Lexy Wade, college student tutoring and babysitting", caption: "Lexy, college student" },
        ],
      },
      extraMedia: {
        layout: "single",
        frame: "wide",
        item: {
          src: "/nextrip/process/survey-results.png",
          alt: "Survey results infographic, 21 respondents over February to March 2026, covering demographics, planning habits, frustrations, app preferences, and ideal travel planning experience",
          caption: "Survey results, 21 respondents",
        },
      },
    },
    {
      label: "05 / Affinity Diagram",
      heading: "Grouping interview quotes into themes",
      body:
        "Across the interviews, travelers kept describing the same pain points: trip planning felt time-consuming, group schedules were hard to align, recommendations were overwhelming, and fluctuating prices made budgeting more stressful. I then organized the quotes into an affinity diagram to uncover the main themes and better understand what users needed from a travel planning app.",
      bullets: [
        "Flawed planning tools that scatter information across Expedia, Google, TripAdvisor, calendars, and messages.",
        "Information overload from too many tabs, options, and sources that are hard to compare.",
        "Budget challenges around finding affordable hotels and flights and keeping spending in check.",
        "Group coordination problems caused by different schedules, budgets, and destination preferences.",
        "Organization difficulties from tracking bookings across emails, screenshots, and notes.",
        "A clear desire for a centralized travel planner with reviews, recommendations, and shareable itineraries.",
      ],
      media: {
        layout: "single",
        frame: "wide",
        item: {
          src: "/nextrip/process/affinity-diagram.jpg",
          alt: "Affinity diagram clustering interview quotes into six themes",
          caption: "Affinity diagram of interview quotes",
        },
      },
    },
    {
      label: "06 / Competitive Analysis",
      heading: "Where existing apps fall short",
      body:
        "I analyzed three popular travel planning apps to understand what the category already does well and where gaps still exist. Roamy focuses on AI-generated day plans inspired by saved travel videos, but it offers less support for real booking. Expedia is strong for booking flights, hotels, and cars, but the experience feels more transactional than calming. Wanderlog works well for detailed itineraries and group planning, but its interface can feel busy for travelers who want a simpler process. NexTrip sits between these approaches by offering calm, guided personalization for budget-conscious travelers.",
      media: {
        layout: "single",
        frame: "wide",
        item: {
          src: "/nextrip/process/competitive-analysis.png",
          alt: "Competitive analysis of Roamy, Expedia, and Wanderlog",
          caption: "Competitive analysis",
        },
      },
    },
    {
      label: "07 / Brand",
      heading: "Logo & Moodboard",
      body:
        "The NexTrip mark uses a bold letter N integrated with an airplane taking off to symbolize travel, movement, and the start of a new journey. The plane crossing through the letter creates a sense of forward motion, while the clean black silhouette keeps the mark feeling simple and stress free. The system pairs the mark with Poppins across Bold, SemiBold, and Regular weights, plus a restrained black, white, and gray palette so the brand can stay in the background and let trip imagery lead.",
      media: {
        layout: "grid",
        cols: 2,
        frame: "auto",
        items: [
          { src: "/nextrip/process/logo-page.png", alt: "NexTrip logo with airplane and N mark", caption: "Logo mark" },
          { src: "/nextrip/process/moodboard.png", alt: "Mood board of travel photography with Poppins type and a neutral palette", caption: "Mood board and palette" },
        ],
      },
    },
    {
      label: "08 / Storyboard",
      heading: "Meet Mila, our representative traveler",
      body:
        "To translate the persona work into a real planning moment, I sketched a six panel storyboard following Mila, a 23 year old young professional who loves traveling with friends but feels overwhelmed when she tries to plan. We watch her search across too many websites, compare too many options, struggle to coordinate with friends, and finally land on NexTrip, which pulls her preferences, schedule, and budget into one place so she can spend less time planning and more time enjoying the trip.",
      media: {
        layout: "single",
        frame: "wide",
        item: {
          src: "/nextrip/process/storyboard-pdf.jpg",
          alt: "Six panel storyboard following Mila from overwhelm to a happy trip",
          caption: "Storyboard, six panels",
        },
      },
    },
    {
      label: "09 / Strategy and MVP",
      heading: "Content Strategy & MVP",
      body:
        "Before designing screens, I mapped NexTrip's content strategy through the six classic questions: why, what, who, how, when, and where. The goal was to simplify travel planning and reduce overwhelm by guiding users step by step. NexTrip would provide personalized itineraries, recommendations, budgets, schedules, and travel tips for students, young professionals, and budget-conscious travelers who want convenience without losing personalization.\n\nThis strategy shaped how the app would communicate with users: through onboarding, auto-generated plans, visual timelines, cards, and a clear, friendly tone. It also helped define when and where support should appear, from early trip planning to real-time guidance during the trip.\n\nFrom there, I mapped potential features on an impact grid, comparing expected versus unexpected ideas and high-impact versus low-impact value. Expected, high-impact features became the core MVP: an onboarding questionnaire, auto-generated itineraries based on user input, edit and customize controls, time- and budget-aware recommendations, and a daily breakdown view. Unexpected, high-impact ideas like AI route optimization and collaborative planning were saved for future expansion, while lower-impact features like social feeds and in-app messaging were intentionally left out to keep the first version focused.",
      media: {
        layout: "single",
        frame: "wide",
        item: {
          src: "/nextrip/process/mvp.jpg",
          alt: "Two by two MVP matrix of features by impact and expectation",
          caption: "MVP matrix",
        },
      },
    },
    {
      label: "10 / Architecture",
      heading: "Sitemap and user flow",
      body:
        "The sitemap covers both a new user path from sign up through the onboarding questionnaire into the main app, and a returning user path that lands straight on the welcome screen. From there, every user can move between Homepage, Search, Trip Page, and Account Page, with trip details, settings, and billing branching off each one. The user flow then zooms into the onboarding sequence: where do you want to go, how long is your trip, what is your budget, preferred transportation, and which activities interest you, before landing on a curated daily itinerary.",
      media: {
        layout: "grid",
        cols: 2,
        frame: "auto",
        items: [
          { src: "/nextrip/process/sitemap.jpg", alt: "Sitemap covering new and returning user paths", caption: "Sitemap" },
          { src: "/nextrip/process/user-flow.jpg", alt: "User flow from welcome screen through onboarding to itinerary", caption: "User flow" },
        ],
      },
    },
    {
      label: "11 / Low Fidelity",
      heading: "Rough sketches first",
      body:
        "Before any pixel work, I sketched the core screens on paper to lock in the page level structure: a clean login, a home screen with a planned trip and curated plans, a search page split into Places, Activities, and Transport, a card based trip page, and an account page with grouped settings. These low fidelity wireframes set the navigation logic and the proportion of each screen before any visuals were involved.",
      media: {
        layout: "single",
        frame: "wide",
        item: {
          src: "/nextrip/process/low-fidelity.png",
          alt: "Hand drawn low fidelity wireframes for login, home, search, trip, and account",
          caption: "Low fidelity wireframes",
        },
      },
    },
    {
      label: "12 / Wireframes",
      heading: "Mid fidelity in Figma",
      body:
        "Next, I rebuilt the sketches in Figma as clean black and white wireframes. Every onboarding question, including destination, trip length, budget, transportation, and activities, got both an empty and a selected state so the visual logic stayed consistent end to end. The main app screens were standardized around the same bottom navigation pattern with Home, Search, Trip, and Account.",
      media: {
        layout: "phones",
        items: [
          { src: "/nextrip/wireframes/login.png", caption: "Login" },
          { src: "/nextrip/wireframes/create-account.png", caption: "Create account" },
          { src: "/nextrip/wireframes/q1.png", caption: "Q1, destinations" },
          { src: "/nextrip/wireframes/q1-answer.png", caption: "Q1, selected" },
          { src: "/nextrip/wireframes/q2.png", caption: "Q2, trip length" },
          { src: "/nextrip/wireframes/q2-answer.png", caption: "Q2, selected" },
          { src: "/nextrip/wireframes/q3.png", caption: "Q3, budget" },
          { src: "/nextrip/wireframes/q3-answer.png", caption: "Q3, selected" },
          { src: "/nextrip/wireframes/q4.png", caption: "Q4, transportation" },
          { src: "/nextrip/wireframes/q4-answer.png", caption: "Q4, selected" },
          { src: "/nextrip/wireframes/q5.png", caption: "Q5, activities" },
          { src: "/nextrip/wireframes/q5-answer-1.png", caption: "Q5, partial selection" },
          { src: "/nextrip/wireframes/q5-answer-2.png", caption: "Q5, more selected" },
          { src: "/nextrip/wireframes/q5-answer-3.png", caption: "Q5, full selection" },
          { src: "/nextrip/wireframes/home.png", caption: "Home" },
          { src: "/nextrip/wireframes/search.png", caption: "Search" },
          { src: "/nextrip/wireframes/trip.png", caption: "Trip" },
          { src: "/nextrip/wireframes/daily-itinerary.png", caption: "Daily itinerary" },
          { src: "/nextrip/wireframes/account.png", caption: "Account" },
        ],
      },
    },
    {
      label: "13 / High Fidelity",
      heading: "Polished black and white screens",
      body:
        "The high fidelity pass kept the wireframe layouts but introduced real photography for destinations and activities, a dark login screen with the NexTrip mark, and refined typography in Poppins. The onboarding flow gained selection states, the home screen pulled in a hero trip card with countdown copy, and the daily itinerary view now displays each activity with its time, duration, transportation icon, and estimated cost in a calm vertical timeline.",
      media: {
        layout: "phones",
        items: [
          { src: "/nextrip/high-fidelity/login.png", caption: "Login" },
          { src: "/nextrip/high-fidelity/create-account.png", caption: "Create account" },
          { src: "/nextrip/high-fidelity/q1.png", caption: "Q1, destinations" },
          { src: "/nextrip/high-fidelity/q1-answer.png", caption: "Q1, selected" },
          { src: "/nextrip/high-fidelity/q2.png", caption: "Q2, trip length" },
          { src: "/nextrip/high-fidelity/q2-answer.png", caption: "Q2, selected" },
          { src: "/nextrip/high-fidelity/q3.png", caption: "Q3, budget" },
          { src: "/nextrip/high-fidelity/q3-answer.png", caption: "Q3, selected" },
          { src: "/nextrip/high-fidelity/q4.png", caption: "Q4, transportation" },
          { src: "/nextrip/high-fidelity/q4-answer.png", caption: "Q4, selected" },
          { src: "/nextrip/high-fidelity/q5.png", caption: "Q5, activities" },
          { src: "/nextrip/high-fidelity/q5-answer-1.png", caption: "Q5, partial selection" },
          { src: "/nextrip/high-fidelity/q5-answer-2.png", caption: "Q5, more selected" },
          { src: "/nextrip/high-fidelity/q5-answer-3.png", caption: "Q5, full selection" },
          { src: "/nextrip/high-fidelity/home.png", caption: "Home" },
          { src: "/nextrip/high-fidelity/search.png", caption: "Search" },
          { src: "/nextrip/high-fidelity/trip.png", caption: "Trip" },
          { src: "/nextrip/high-fidelity/daily-itinerary.png", caption: "Daily itinerary" },
          { src: "/nextrip/high-fidelity/account.png", caption: "Account" },
        ],
      },
    },
    {
      label: "14 / Final Prototypes",
      heading: "End to end walkthroughs for new and returning users",
      body:
        "The final prototypes show NexTrip through two user flows: a brand-new user and a returning user. In the new user flow, the traveler signs up, creates an account, completes the onboarding questionnaire, and lands on the Home screen with a Sydney trip already generated. From there, they can explore a daily itinerary with each activity organized by time and cost, view details for the Sydney Opera House, switch to a map view with every stop pinned, and manage trips, preferences, and payment methods from the account page.\n\nThe returning user flow starts with logging in on the dark welcome screen and takes the traveler directly to the Home screen, where their existing Sydney trip appears first. They can also explore curated plans like Hawaii Coastal Getaway and Paris and Rome Escape. The Trip page now includes multiple upcoming and past trips, including a multi-country itinerary for South Korea, Japan, and Vietnam. This makes NexTrip feel like an app that grows with the traveler over time, instead of starting over with each new trip.",
      media: {
        layout: "grid",
        cols: 2,
        frame: "iphone",
        items: [
          {
            kind: "video",
            src: "/nextrip/new-user-flow.mp4",
            poster: "/nextrip/final/new-home.png",
            caption: "New user",
          },
          {
            kind: "video",
            src: "/nextrip/returning-user-flow.mp4",
            poster: "/nextrip/final/returning-home.png",
            caption: "Returning user",
          },
        ],
      },
      extraMedia: {
        layout: "grid",
        cols: 2,
        frame: "auto",
        items: [
          {
            src: "/nextrip/final/mockup-isometric.webp",
            alt: "Isometric mockup showing NexTrip screens across login, settings, search, daily itinerary, and Sydney Opera House detail",
            caption: "Isometric mockup spread",
          },
          {
            src: "/nextrip/final/mockup-flat.webp",
            alt: "Flat mockup showing Home, Trips, Daily Itinerary, and Sydney Opera House detail side by side",
            caption: "Flat mockup spread",
          },
        ],
      },
    },
  ],
  skills: [
    "UX Research",
    "User Personas",
    "Journey Mapping",
    "Branding",
    "Design Thinking",
    "Prototyping",
    "Mobile Design",
  ],
  galleryHeading: "Final screens",
  galleryNote:
    "A new user signs in, answers a short onboarding questionnaire, and lands on a curated Sydney trip with daily itinerary, place details, and map view. A returning user picks up right where they left off.",
  galleryFlows: [
    {
      label: "New user flow",
      items: [
        { src: "/nextrip/final/new-login.png", caption: "Login", aspect: "phone" },
        { src: "/nextrip/final/new-create-account.png", caption: "Create account", aspect: "phone" },
        { src: "/nextrip/final/new-q1-answer.png", caption: "Q1, selected", aspect: "phone" },
        { src: "/nextrip/final/new-q2-answer.png", caption: "Q2, selected", aspect: "phone" },
        { src: "/nextrip/final/new-q3-answer.png", caption: "Q3, selected", aspect: "phone" },
        { src: "/nextrip/final/new-q4-answer.png", caption: "Q4, selected", aspect: "phone" },
        { src: "/nextrip/final/new-q5-answer-3.png", caption: "Q5, full selection", aspect: "phone" },
        { src: "/nextrip/final/new-home.png", caption: "Home", aspect: "phone" },
        { src: "/nextrip/final/new-search.png", caption: "Search", aspect: "phone" },
        { src: "/nextrip/final/new-trip.png", caption: "Trip", aspect: "phone" },
        { src: "/nextrip/final/new-account.png", caption: "Account", aspect: "phone" },
        { src: "/nextrip/final/new-daily-itinerary.png", caption: "Daily itinerary", aspect: "phone" },
        { src: "/nextrip/final/new-sydney-opera-house.png", caption: "Sydney Opera House detail", aspect: "phone" },
        { src: "/nextrip/final/new-map-view.png", caption: "Map view", aspect: "phone" },
      ],
    },
    {
      label: "Returning user flow",
      items: [
        { src: "/nextrip/final/returning-login.png", caption: "Login", aspect: "phone" },
        { src: "/nextrip/final/returning-home.png", caption: "Home", aspect: "phone" },
        { src: "/nextrip/final/returning-search.png", caption: "Search", aspect: "phone" },
        { src: "/nextrip/final/returning-trip.png", caption: "Trip", aspect: "phone" },
        { src: "/nextrip/final/new-account.png", caption: "Account", aspect: "phone" },
        { src: "/nextrip/final/returning-daily-itinerary.png", caption: "Daily itinerary", aspect: "phone" },
        { src: "/nextrip/final/new-sydney-opera-house.png", caption: "Sydney Opera House detail", aspect: "phone" },
        { src: "/nextrip/final/returning-map-view.png", caption: "Map view", aspect: "phone" },
      ],
    },
  ],
  gallery: [
    { src: "/nextrip/final/new-login.png", caption: "Login", aspect: "phone" },
    { src: "/nextrip/final/new-create-account.png", caption: "Create account", aspect: "phone" },
    { src: "/nextrip/final/new-q1-answer.png", caption: "Q1, selected", aspect: "phone" },
    { src: "/nextrip/final/new-q2-answer.png", caption: "Q2, selected", aspect: "phone" },
    { src: "/nextrip/final/new-q3-answer.png", caption: "Q3, selected", aspect: "phone" },
    { src: "/nextrip/final/new-q4-answer.png", caption: "Q4, selected", aspect: "phone" },
    { src: "/nextrip/final/new-q5-answer-3.png", caption: "Q5, full selection", aspect: "phone" },
    { src: "/nextrip/final/new-home.png", caption: "Home", aspect: "phone" },
    { src: "/nextrip/final/new-search.png", caption: "Search", aspect: "phone" },
    { src: "/nextrip/final/new-trip.png", caption: "Trip", aspect: "phone" },
    { src: "/nextrip/final/new-account.png", caption: "Account", aspect: "phone" },
    { src: "/nextrip/final/new-daily-itinerary.png", caption: "Daily itinerary", aspect: "phone" },
    { src: "/nextrip/final/new-sydney-opera-house.png", caption: "Sydney Opera House detail", aspect: "phone" },
    { src: "/nextrip/final/new-map-view.png", caption: "Map view", aspect: "phone" },
    { src: "/nextrip/final/returning-login.png", caption: "Login", aspect: "phone" },
    { src: "/nextrip/final/returning-home.png", caption: "Home", aspect: "phone" },
    { src: "/nextrip/final/returning-search.png", caption: "Search", aspect: "phone" },
    { src: "/nextrip/final/returning-trip.png", caption: "Trip", aspect: "phone" },
    { src: "/nextrip/final/new-account.png", caption: "Account", aspect: "phone" },
    { src: "/nextrip/final/returning-daily-itinerary.png", caption: "Daily itinerary", aspect: "phone" },
    { src: "/nextrip/final/new-sydney-opera-house.png", caption: "Sydney Opera House detail", aspect: "phone" },
    { src: "/nextrip/final/returning-map-view.png", caption: "Map view", aspect: "phone" },
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
  category?: ProjectCategory;
  meta: {
    role: string;
    timeline: string;
    duration: string;
    tools: string;
    variations?: string;
    fonts?: string;
    size?: string;
    language?: string;
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
    category: "both",
    meta: {
      role: "Solo, Design & Front end",
      timeline: "April 21 – April 30, 2025",
      duration: "1 week",
      tools: "HTML, CSS, Adobe XD",
      language: "HTML, CSS",
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
    category: "design",
    meta: {
      role: "Solo, Typographic Design",
      timeline: "April 8 – April 22, 2024",
      duration: "2 weeks",
      tools: "Adobe Illustrator",
      fonts: "Helvetica, Baskerville, Snell Roundhand, PT Sans Narrow, Bickham Script Pro 3, Optima, New Kansas, Ma Shan Zheng Regular, Maku, Noto Serif SC, Montserrat, Charm, Memphis, Impact, Bodoni 72 Smallcaps Book",
      size: '8.5" x 11" (5 designs per)',
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
      "A C program that implements a player-versus-computer game where a random five-letter word is generated and two dice are rolled each round. The player and computer bot reveal letters based on dice rolls, and whoever uncovers the entire word first loses, triggering a Caesar cipher encryption of that word.",
    cover: "/dungeon-cube-caesar.png",
    category: "programming",
    meta: {
      role: "Solo, C Development",
      timeline: "October 3 – October 17, 2024",
      duration: "2 weeks",
      tools: "C, Makefile",
      language: "C",
    },
    externalLink: {
      href: "https://github.com/amandachuu04/Dungeon-Cube-Caesar",
      label: "View on GitHub",
    },
    description: [
      "Dungeon Cube Caesar is a turn-based command-line game written in C where the player competes against a computer bot to avoid revealing a hidden five-letter word. In each round, a random lowercase word is generated, two dice are rolled, and the cumulative total moves both the player and the bot further through their own hidden word. Whoever reveals the full word first loses, and their word is then encrypted using a Caesar cipher with a shift based on their total roll modulo 26.",
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
    category: "programming",
    meta: {
      role: "Solo, Python Development",
      timeline: "November 6 – November 20, 2023",
      duration: "2 weeks",
      tools: "Python",
      language: "Python",
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
    category: "design",
    meta: {
      role: "Solo, Print & Typographic Design",
      timeline: "March 11 – March 25, 2024",
      duration: "2 weeks",
      tools: "Adobe InDesign, Adobe Photoshop",
      variations: "Black & White, Blue & Cream",
      fonts: "American Typewriter & KoHo, Lust & Sarabun",
      size: '17" x 11" and 5.706" x 11"',
    },
    description: [
      "Federico’s Menu is a menu layout design centered on hierarchy, typography, and readability. Two menu designs were created for the same restaurant: one in black and white and one in blue and cream. Each version was designed to feel visually distinct while still using consistent paragraph styles, character styles, and margins of at least 0.75 inches on every side.",
      "The black-and-white version pairs American Typewriter with KoHo to create a warm editorial feel with a clean, modern body typeface. The blue-and-cream version uses Lust and Sarabun for a softer and more elegant tone. Both menus were designed in Adobe InDesign, with supporting imagery prepared in Adobe Photoshop. Across both versions, the goal was to keep the typography legible, the spacing intentional, and the hierarchy easy to scan from across a table.",
    ],
    skills: [
      "Typography",
      "Layout & Hierarchy",
      "Paragraph & Character Styles",
      "Print Design",
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
  "banana-bread-recipe": {
    slug: "banana-bread-recipe",
    title: "Banana Bread Recipe",
    tagline:
      "A print recipe design that explores one banana chocolate chip bread recipe through three text only layouts with different color and type pairings, with the strongest direction expanded into a full spread that pairs the recipe with banana bread imagery.",
    cover: "/banana-bread-recipe.avif",
    category: "design",
    meta: {
      role: "Solo, Print & Typographic Design",
      timeline: "February 19 – February 26, 2024",
      duration: "1 week",
      tools: "Adobe InDesign",
      variations: "Black & White, Yellow & Brown, Brown & Black",
      fonts: "Marion & Calibri, Superclarendon & Avenir Next, Arial Narrow & Helvetica Neue",
      size: '8" x 11.5" and 16" x 11.5"',
    },
    description: [
      "Banana Bread Recipe is a recipe layout design focused on hierarchy, typography, and grid layout. I turned a single banana chocolate chip bread recipe into three text only layouts built on a 12 column grid, two colors, and one inch margins on every side. Each version kept the same content but explored different color palettes and type pairings to see how small typographic choices can shift the overall mood and tone of a layout.",
      "The three variations included Black and White with Marion and Calibri, Yellow and Brown with Superclarendon and Avenir Next, and Brown and Black with Arial Narrow and Helvetica Neue. Across all three layouts, I focused on careful kerning, no hyphenations, and consistent paragraph and character styles so the ingredients, directions, and headings stay easy to scan. The strongest direction was then developed into a final 16 by 11.5 inch spread that paired the recipe with banana bread imagery, creating a more editorial, photo driven layout while keeping the typography clean and intentional.",
    ],
    skills: [
      "Typography",
      "Layout & Hierarchy",
      "Grid Systems",
      "Paragraph & Character Styles",
      "Print Design",
    ],
    iterations: [
      {
        label: "Iteration 01",
        heading: "Text only layout, design 01",
        images: [{ src: "/banana-bread-recipe/img-design-1.png" }],
      },
      {
        label: "Iteration 02",
        heading: "Text only layout, design 02",
        images: [{ src: "/banana-bread-recipe/img-design-2.png" }],
      },
      {
        label: "Iteration 03",
        heading: "Text only layout, design 03",
        images: [{ src: "/banana-bread-recipe/img-design-3.png" }],
      },
      {
        label: "Iteration 04",
        heading: "Image side of spread",
        images: [{ src: "/banana-bread-recipe/img-image-side.png" }],
      },
      {
        label: "Iteration 05",
        heading: "Final spread",
        images: [{ src: "/banana-bread-recipe/img-final-spread.png" }],
      },
      {
        label: "Iteration 06",
        heading: "In print",
        images: [
          { src: "/banana-bread-recipe/img-in-print-1.png" },
          { src: "/banana-bread-recipe/img-in-print-2.png" },
        ],
      },
    ],
  },
  "choco-cake-recipe": {
    slug: "choco-cake-recipe",
    title: "Choco Cake Recipe",
    tagline:
      "A print recipe design that turns one chocolate cake recipe into three text only layouts in different color and type pairings, with the strongest direction carried into a final spread that pairs the recipe with imagery.",
    cover: "/choco-cake-recipe.avif",
    category: "design",
    meta: {
      role: "Solo, Print & Typographic Design",
      timeline: "March 4 – March 11, 2024",
      duration: "1 week",
      tools: "Adobe InDesign",
      variations: "Black & White, Light Brown & Black, Dark Brown & Black",
      fonts: "Vidaloka & Roboto, Monarcha & Montserrat, Ohno Blazeface & Montserrat",
      size: '8.5" x 11" and 17" x 11"',
    },
    description: [
      "Choco Cake Recipe is a recipe layout design centered on hierarchy, typography, and grid layout. I transformed a single chocolate cake recipe into three text-only layouts using a 12-column grid, two colors, and one-inch margins on every side. Each version kept the same content but explored different color palettes and type pairings to show how small typographic choices can shift the mood and tone of a design.",
      "The three variations included Black and White with Vidaloka and Roboto, Light Brown and Black with Monarcha and Montserrat, and Dark Brown and Black with Ohno Blazeface and Montserrat. Across all three layouts, I focused on careful kerning, no hyphenations, and consistent paragraph and character styles to keep the ingredients, instructions, and headings readable. The strongest direction was then developed into a final 17 by 11 inch spread that paired the recipe with chocolate cake imagery, creating a more editorial, photo-driven layout while still keeping the typography clean and intentional.",
    ],
    skills: [
      "Typography",
      "Layout & Hierarchy",
      "Grid Systems",
      "Paragraph & Character Styles",
      "Print Design",
    ],
    iterations: [
      {
        label: "Iteration 01",
        heading: "Text only layout, design 01",
        images: [{ src: "/choco-cake-recipe/img-design-1.jpg" }],
      },
      {
        label: "Iteration 02",
        heading: "Text only layout, design 02",
        images: [{ src: "/choco-cake-recipe/img-design-2.jpg" }],
      },
      {
        label: "Iteration 03",
        heading: "Text only layout, design 03",
        images: [{ src: "/choco-cake-recipe/img-3.png" }],
      },
      {
        label: "Iteration 04",
        heading: "Image side of spread",
        images: [{ src: "/choco-cake-recipe/img-4.png" }],
      },
      {
        label: "Iteration 05",
        heading: "Final spread",
        images: [{ src: "/choco-cake-recipe/img-final-spread.jpg" }],
      },
      {
        label: "Iteration 06",
        heading: "Book mockup",
        images: [{ src: "/choco-cake-recipe/img-mockup.jpg" }],
      },
      {
        label: "Iteration 07",
        heading: "In print",
        images: [{ src: "/choco-cake-recipe/img-2.png" }],
      },
    ],
  },
  "hierarchy-ad": {
    slug: "hierarchy-ad",
    title: "Hierarchy AD",
    tagline:
      "A typographic hierarchy exploration that uses one event ad and isolates typographic variables one at a time to show how size, style, alignment, weight, case, and color shift importance and readability.",
    cover: "/hierarchy-ad/01-mockup-a.avif",
    category: "design",
    meta: {
      role: "Solo, Print & Typographic Design",
      timeline: "February 12 – February 19, 2024",
      duration: "1 week",
      tools: "Adobe InDesign",
      fonts: "Helvetica, Avenir, Avenir Next, Avenir Next Condensed",
      size: '7" x 4"',
    },
    description: [
      "Hierarchy AD is a card layout design focused on understanding how typographic hierarchy is built from the ground up. Using a single event ad for Conversation with ART, on ART, I created eight versions of the same composition and changed only one element at a time so that each typographic variable could be observed in isolation. The goal was to see how subtle decisions in size, style, alignment, weight, case, and color shape the way a reader moves through information.",
      "The first version uses Helvetica Neue at 12pt with rag right alignment as a neutral control. Each version after that adjusts a single variable, exploring different type sizes, serif versus sans serif styles, alignments and spacing, weights, letter case options, and color treatments. The final composition layers multiple decisions together to create an intentional hierarchy with clear contrast, considered organization, and a strong sense of importance, all within the same 7 by 4 inch print format.",
    ],
    skills: [
      "Typography",
      "Visual Hierarchy",
      "Layout",
      "Paragraph & Character Styles",
      "Print Design",
    ],
    iterations: [
      {
        label: "Version 01",
        heading: "Control, Helvetica at 12pt rag right",
        images: [{ src: "/hierarchy-ad/03-v1.png" }],
      },
      {
        label: "Version 02",
        heading: "Type size variation",
        images: [{ src: "/hierarchy-ad/04-v2.png" }],
      },
      {
        label: "Version 03",
        heading: "Avenir family, type style change",
        images: [{ src: "/hierarchy-ad/05-v3.png" }],
      },
      {
        label: "Version 04",
        heading: "Alignment and spacing",
        images: [{ src: "/hierarchy-ad/06-v4.png" }],
      },
      {
        label: "Version 05",
        heading: "Weight variations",
        images: [{ src: "/hierarchy-ad/07-v5.png" }],
      },
      {
        label: "Version 06",
        heading: "Letter case",
        images: [{ src: "/hierarchy-ad/08-v6.png" }],
      },
      {
        label: "Version 07",
        heading: "Color applied",
        images: [{ src: "/hierarchy-ad/09-v7.png" }],
      },
      {
        label: "Version 08",
        heading: "Final layered hierarchy",
        images: [{ src: "/hierarchy-ad/10-v8.png" }],
      },
      {
        label: "Mockup",
        heading: "Final composition in print",
        images: [
          { src: "/hierarchy-ad/01-mockup-a.avif" },
          { src: "/hierarchy-ad/02-mockup-b.png" },
        ],
      },
    ],
  },
  "modular-grid": {
    slug: "modular-grid",
    title: "Modular Grid",
    tagline:
      "A poster design exploration that uses a 10 by 10 grid with 1 by 1 unit measurements, treating squares of varying heights like notes in a classical music piece to study hierarchy, alignment, and spatial composition.",
    cover: "/modular-grid.avif",
    category: "design",
    meta: {
      role: "Solo, Poster & Grid Design",
      timeline: "February 8 – March 1, 2023",
      duration: "3 weeks (1 week per variation)",
      tools: "Adobe Illustrator, Adobe Photoshop",
      variations: "Black & White, Two Color, Image",
      size: '8" x 11.5"',
    },
    description: [
      "Modular Grid is a poster design exploration that uses a 10 by 10 grid with 1 by 1 unit measurements as its foundation. The composition works like a piece of classical music, with squares of varying heights showing how visual rhythm and flow can move across a structured grid. Type elements live inside the same grid, so hierarchy, alignment, and spacing all share the same underlying system.",
      "The project produced three variations of the same composition: a black and white version, a two color version, and an image based version. Each variation was built on an 8 by 11.5 inch format and used the same grid logic, which made it possible to compare how color, value, and imagery shift the feeling of an identical layout. The goal was to learn how a modular grid can stay consistent while still producing visibly different outcomes depending on the visual treatment.",
    ],
    skills: [
      "Grid Systems",
      "Typography",
      "Visual Hierarchy",
      "Layout",
      "Composition",
      "Poster Design",
    ],
    iterations: [
      {
        label: "Variation 01",
        heading: "Black and white",
        images: [{ src: "/modular-grid/01-bw.avif" }],
      },
      {
        label: "Variation 02",
        heading: "Two color",
        images: [{ src: "/modular-grid/02-purple.avif" }],
      },
      {
        label: "Variation 03",
        heading: "Image based",
        images: [{ src: "/modular-grid/03-mountain.avif" }],
      },
      {
        label: "Mockup",
        heading: "Three variations on display",
        images: [{ src: "/modular-grid.avif" }],
      },
    ],
  },
  "grade-management-system": {
    slug: "grade-management-system",
    title: "Grade Management System",
    tagline:
      "A Java based grade processing toolkit that computes a student's total weighted score with category drops and averaging, assigns a final letter grade, and supports both interactive and batch driver programs.",
    cover: "/grade-management-system.avif",
    category: "programming",
    meta: {
      role: "Solo, Java Development",
      timeline: "April 8 – April 22, 2024",
      duration: "2 weeks",
      tools: "Java",
      language: "Java",
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
    note: "Minor in Computer Science & Design Thinking · GPA 3.65",
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
