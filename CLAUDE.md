# Wonje Jeung — Personal Academic Website

A minimal academic portfolio site for Wonje Jeung, built with plain HTML, CSS, and JavaScript.

## Owner
**Wonje Jeung** (he/him)
- Incoming PhD student, Computer Science, University of Michigan (Sept 2026–)
- MS in Artificial Intelligence, Yonsei University (Sept 2024–Aug 2026)
- Research focus: LLM safety, machine unlearning, safety alignment, diffusion LLMs
- GitHub: wonjejeung | Site: wonjejeung.github.io

## Tech Stack
- **HTML5** — semantic markup only; no divs where a semantic tag fits
- **CSS3** — custom properties, flexbox/grid, no preprocessors
- **Vanilla JS** — used only for rendering dynamic content from data files

## File Structure
```
/
├── index.html              # Home: bio, news, selected publications
├── publications.html       # Full publication list (rendered from data)
├── css/
│   ├── reset.css
│   ├── variables.css       # Design tokens
│   └── main.css
├── js/
│   └── main.js             # Renders news + publications from data files
├── data/
│   ├── publications.js     # const PUBLICATIONS = [...] — edit to add papers
│   └── news.js             # const NEWS = [...] — edit to add news items
└── assets/
    ├── images/
    │   └── profile.jpg     # Replace with actual headshot
    └── cv.pdf              # Replace with actual CV PDF
```

## Updating Content (No code knowledge needed)

### Add a publication → edit `data/publications.js`
Each entry has: `id`, `type` (conference/workshop/preprint), `title`, `authors` array,
`venue`, `year`, `selected` (bool, shows on home page), and optional `links` ({pdf, code, project}).

Author objects: `{ name: "...", self: true }` for yourself, add `equal: true` for equal contribution,
`corresponding: true` for corresponding author.

### Add a news item → edit `data/news.js`
Each entry has: `date` (YYYY-MM format for sorting) and `text` (HTML string allowed).

## Design Principles
- **Academic minimal**: white background, dark text, generous line-height, one accent color
- **Typography first**: body text is primary; no decorative elements
- **Mobile-first**: CSS written for small screens, scaled up with media queries
- **No clutter**: every element earns its place

## Design Tokens (`css/variables.css`)
```css
--color-bg:       #ffffff;
--color-text:     #1a1a1a;
--color-muted:    #6b7280;
--color-accent:   #1d4ed8;
--color-border:   #e5e7eb;
--font-body:      Georgia, 'Times New Roman', serif;
--font-ui:        system-ui, -apple-system, sans-serif;
--max-width:      780px;
```

## Conventions
- Class names: lowercase hyphenated (`pub-entry`, `news-item`)
- No inline styles — all styling in CSS files
- Images: always `alt` text, `loading="lazy"` for below-fold
- Accessibility: contrast ≥ 4.5:1, visible focus styles, keyboard-navigable

## Development
Open `index.html` directly in browser (data files use `<script>` tags, so no server needed).
For auto-reload, use VS Code Live Server extension.

## What NOT to add
- CSS frameworks (Bootstrap, Tailwind)
- JS frameworks or libraries
- Google Fonts via CDN (use system fonts or self-host)
- Analytics unless explicitly requested
