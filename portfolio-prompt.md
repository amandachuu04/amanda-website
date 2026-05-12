# Personal Portfolio Website — Claude Code Prompt

## Project goal

Build me a personal portfolio website that is **full-bleed (edge-to-edge on desktop)**, fully responsive (mobile / tablet / desktop), and feels **cute and a little creative** — not corporate, not generic AI-template. The current version of my site is a narrow centered column with heavy side padding, and I want to move away from that completely. Sections can still use whitespace internally, but the layout should *use* the full viewport width instead of hiding inside a 600px gutter.

## About me (use this for content)

- **Name:** Amanda Chu
- **Headline:** Information Technology – WADV Concentration · Computer Science & Design Thinking Undergraduate
- **Location:** Virginia, US
- **Status:** Available for work
- **Email:** amandaachuu@gmail.com
- **Phone:** 703-608-1883
- **Socials:** GitHub, LinkedIn
- **About:** I'm an Information Technology undergraduate concentrating in Web Application Development, minoring in both Computer Science and Design Thinking, with a strong interest in UX/UI design. I'm passionate about creating thoughtful, user-centered digital experiences that balance strong technical foundations with clean, intentional design. My academic background lets me approach projects from both a development and design perspective — building responsive web applications, designing intuitive interfaces, and exploring ways to improve accessibility and usability through research-driven decisions. I believe great design is inclusive, purposeful, and adaptable.

## Tech stack

- **Vite + React + TypeScript**
- **Tailwind CSS** for styling
- **Framer Motion** for animations and micro-interactions
- Single-page app with smooth scroll between sections
- No backend — the contact form can use a `mailto:` fallback or be wired to Formspree/Resend later

## Design direction — read this carefully

### Layout
- Full-width / edge-to-edge sections. Each section can have its own background treatment (color block, gradient, pattern, asymmetric grid).
- **Vary the section layouts** so the page doesn't feel like one long vertical column. Examples: asymmetric two-column splits, offset content, floating accent shapes, sticky side labels, horizontal scroll for projects on desktop, etc.
- Generous whitespace inside sections is fine — what I'm avoiding is a narrow centered text column with massive empty margins on the left and right.

### Color palette
- **Maximum 3 colors total** (not counting black/white/neutral text).
- Aesthetic: cute and creative. Think soft + playful, not dark corporate. Ideas to draw from: warm pastels, retro-90s candy, risograph prints, Studio Ghibli skies, peachy-coral + sage + cream, lavender + butter-yellow + soft-pink, mint + terracotta + cream, etc.
- **Propose 2–3 palette options at the start** with hex codes and a one-line vibe description for each, and let me pick before you build.

### Typography
- One playful display font for headings (e.g. Fraunces, DM Serif Display, Caprasimo, Sniglet, Gloock — propose options).
- One clean readable sans for body (e.g. Inter, Manrope, Geist).
- Variable font weights welcome.

### Hero section — interactive / animated
The hero needs to be **fun and interactive** — something the visitor can actually play with for a second. Propose 2–3 directions and let me pick. Examples to inspire (not a checklist):
- Cursor-reactive floating blobs / shapes that gently follow the mouse with physics-based easing
- A draggable sticker-pack of my interests / skills that the user can toss around the hero
- Wavy gradient mesh that distorts when the cursor moves over it
- A little pixel/Tamagotchi-style avatar of me that reacts to hover (waves, blinks, holds a sign)
- Confetti or sparkle trail that follows the cursor
- Hand-drawn squiggly underline on my name that re-draws when hovered
- Text that "wobbles" or scrambles on hover, then settles

Keep the animation tasteful — it should feel charming, not chaotic. Use `prefers-reduced-motion` to disable for accessibility.

## Sections (in order)

1. **Hero / Intro** — Name, headline, location, "Available for work" pill, Download CV button, the interactive animation described above.
2. **About Me** — The about paragraphs above. Visual treatment can include a photo/illustration, accent shapes, or a fun layout split.
3. **Latest Projects** — Card grid (responsive: 1 col mobile → 2 col tablet → 2-3 col desktop). Projects:
   - **FloraFlow** — Design
   - **MagTracker** — Design (UX/branding lead, Sept–Dec 2025, used Adobe Illustrator and Figma)
   - **Linked Narratives** — Design & Programming (HTML/CSS, April–May 2025)
   - **Dungeon Cube Caesar** — Programming
   - Leave room for a "View all" link and placeholder thumbnails I'll swap out.
4. **Experience** — Timeline or stacked card layout:
   - **Running Name LLC** — Graphic Design Intern · Woodbridge, VA / Remote · Nov. 2025 – Present
     - Designed visual assets (logos, social media graphics, branding materials) aligned with client goals, brand identity, and target audiences
     - Collaborated with clients to iterate on designs through feedback, revisions, and refinement, ensuring clarity, consistency, and usability
     - Managed multiple design projects simultaneously while meeting deadlines and maintaining high visual and brand standards
   - **George Mason University** — Tutor · Fairfax, VA / Remote · Sep. 2025 – Present
     - Designed and delivered personalized one-on-one lessons using Self-Regulated Learning (SRL) strategies, including goal-setting, performance monitoring, and reflection
     - Adapted instruction to individual skill levels through interactive activities, targeted practice, and structured routines to improve mastery
     - Implemented motivation and engagement strategies (voice and choice, reward systems, ongoing feedback) while tracking student progress to support continuous improvement
   - **PCCI Inc.** — Intern · Alexandria, VA / Remote · Nov. 2020 – Mar. 2021
     - Streamlined digital organization by categorizing and relocating vendor documents, improving file accessibility, and reducing retrieval time
     - Enhanced accounts payable accuracy by scanning, renaming, and uploading invoice files into Deltek Costpoint modules
     - Supported financial tracking by identifying and verifying check numbers within the Deltek Costpoint system
5. **Education**
   - **Bachelors of Science in Information Technology** — George Mason University · Fairfax, VA · 2022 – present
   - **Advanced Diploma** — Falls Church High School · Falls Church, VA · 2018 – 2022
6. **Certifications** — Microsoft Excel (2022), Microsoft PowerPoint (2022), Microsoft Word (2022)
7. **Tools** — Grouped grid with little icons or accent dots:
   - *Programming Languages:* Python, Java, C, HTML (markup), CSS (style sheet)
   - *Design Tools:* Adobe Illustrator, Adobe InDesign, Adobe Photoshop, Adobe XD, Figma, Canva
   - *No-code:* Framer
   - *Office:* Microsoft Word, PowerPoint, Excel
8. **Contact / Let's talk** — Live local-time clock, my email + phone + socials, contact form (Name, Email, Message, Send).
9. **Footer** — "Designed by Amanda Chu · © 2026" + a tiny easter egg if you want to be cute about it.

## Responsiveness

- **Mobile-first.** Test at 375px, 768px, 1024px, 1440px, 1920px.
- Nav: top horizontal pill-nav on desktop, collapses to a clean hamburger or bottom-anchored pill on mobile.
- Touch targets ≥ 44px.
- Hero animation must degrade gracefully on touch devices (tap instead of hover).

## Accessibility

- Semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`).
- Visible focus states styled to match the palette.
- Alt text on all images.
- Color contrast ≥ WCAG AA on body text.
- Respect `prefers-reduced-motion`.

## Build order — please follow this

1. Confirm tech stack and scaffold the Vite + React + TS + Tailwind + Framer Motion project.
2. **Propose 2–3 color palettes + 2–3 hero animation directions before writing component code.** Wait for my pick.
3. Build the design system first: tokens, typography scale, spacing, button + card primitives.
4. Build sections top-down: Hero → About → Projects → Experience → Education → Certifications → Tools → Contact → Footer.
5. After all sections work on desktop, do a full responsive pass.
6. Final pass: animations, micro-interactions, polish, accessibility audit.

## What I do NOT want

- Generic dark "developer portfolio" aesthetic
- A narrow centered column with huge side margins
- More than 3 colors
- Stock AI illustrations or generic placeholder gradients
- Heavy animation that hurts performance or accessibility
- A 47-section landing page — keep it tight

Ask me questions if anything is unclear before you start coding.
