// Shared rendering utilities for publications and news.
// Depends on: data/publications.js and data/news.js being loaded first.

// ── Author formatting ────────────────────────────────────────────────────

function formatAuthors(authors) {
  return authors.map((a, i) => {
    const name = a.equal ? a.name + "*" : a.name;
    const tag = a.corresponding ? "<sup>†</sup>" : "";
    const comma = i < authors.length - 1 ? ", " : "";
    if (a.self) {
      return `<span class="self">${name}</span>${tag}${comma}`;
    }
    return `${name}${tag}${comma}`;
  }).join("");
}

// ── Publication entry HTML ───────────────────────────────────────────────

function renderPubEntry(pub, { showId = true } = {}) {
  const authorHtml = formatAuthors(pub.authors);

  const links = pub.links || {};
  const pdfUrl = links.pdf;

  // Title becomes a link when PDF is available
  const titleHtml = pdfUrl
    ? `<a class="pub-title-link" href="${pdfUrl}" target="_blank" rel="noopener">${pub.title}</a>`
    : pub.title;

  // Link buttons (pdf, code, website, etc.)
  const linkButtons = Object.entries(links)
    .filter(([, url]) => url)
    .map(([label, url]) =>
      `<a class="pub-link" href="${url}" target="_blank" rel="noopener">${label.toUpperCase()}</a>`
    ).join("");
  const linksHtml = linkButtons ? `<div class="pub-links">${linkButtons}</div>` : "";

  return `
    <div class="pub-entry">
      ${showId ? `<div class="pub-id">${pub.id}</div>` : ""}
      <div class="pub-body">
        <div class="pub-title">${titleHtml}</div>
        <div class="pub-authors">${authorHtml}</div>
        <div class="pub-venue"><span class="venue-name">${pub.venue}</span> ${pub.year}</div>
        ${linksHtml}
      </div>
    </div>
  `;
}

// ── News item HTML ───────────────────────────────────────────────────────

function formatNewsDate(dateStr) {
  const [year, month] = dateStr.split("-").map(Number);
  return new Date(year, month - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function renderNewsItem(item) {
  return `
    <div class="news-item">
      <span class="news-date">${formatNewsDate(item.date)}</span>
      <span class="news-text">${item.text}</span>
    </div>
  `;
}

// ── Home page: news + selected publications ──────────────────────────────

const NEWS_VISIBLE = 4;

function initHome() {
  const newsEl = document.getElementById("news-list");
  if (newsEl && typeof NEWS !== "undefined") {
    const sorted = [...NEWS].sort((a, b) => b.date.localeCompare(a.date));
    newsEl.innerHTML = sorted.map(renderNewsItem).join("");

    // Limit height to first NEWS_VISIBLE items; rest scrollable
    const items = newsEl.querySelectorAll(".news-item");
    if (items.length > NEWS_VISIBLE) {
      const listTop = newsEl.getBoundingClientRect().top;
      const cutoffTop = items[NEWS_VISIBLE].getBoundingClientRect().top;
      newsEl.style.maxHeight = (cutoffTop - listTop) + "px";
    }
  }

  const selPubsEl = document.getElementById("selected-pubs");
  if (selPubsEl && typeof PUBLICATIONS !== "undefined") {
    const typeOrder = { preprint: 0, conference: 1, workshop: 2 };
    const selected = PUBLICATIONS
      .filter(p => p.selected)
      .sort((a, b) => {
        if (b.year !== a.year) return b.year - a.year;
        const tA = typeOrder[a.type] ?? 3, tB = typeOrder[b.type] ?? 3;
        if (tA !== tB) return tA - tB;
        const sA = a.authors.findIndex(au => au.self);
        const sB = b.authors.findIndex(au => au.self);
        return sA - sB;
      });
    selPubsEl.innerHTML = `<div class="pub-list">${selected.map(p => renderPubEntry(p, { showId: false })).join("")}</div>`;
  }
}

// ── Publications page: grouped by type ──────────────────────────────────

function initPublications() {
  const container = document.getElementById("pubs-container");
  if (!container || typeof PUBLICATIONS === "undefined") return;

  const groups = [
    { key: "conference", label: "Conference Proceedings" },
    { key: "workshop",   label: "Workshops" },
    { key: "preprint",   label: "Preprints" },
  ];

  container.innerHTML = groups.map(({ key, label }) => {
    const pubs = PUBLICATIONS.filter(p => p.type === key);
    if (!pubs.length) return "";
    return `
      <div class="pub-group">
        <div class="pub-group-title">${label}</div>
        <div class="pub-list">${pubs.map(renderPubEntry).join("")}</div>
      </div>
    `;
  }).join("");
}

// ── Nav: mark current page ───────────────────────────────────────────────

function markCurrentPage() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      link.setAttribute("aria-current", "page");
    }
  });
}

// ── Entry point ──────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  markCurrentPage();
  if (document.getElementById("news-list") || document.getElementById("selected-pubs")) {
    initHome();
  }
  if (document.getElementById("pubs-container")) {
    initPublications();
  }
});
