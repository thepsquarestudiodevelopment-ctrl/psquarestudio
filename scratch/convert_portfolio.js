import fs from "fs";
import path from "path";

function convertPortfolioHtmlToJsx() {
  const filePath = "d:/files/freelancing/psquarestudio/psquarestudio/html-backup/portfolio.html";
  if (!fs.existsSync(filePath)) {
    throw new Error("portfolio.html not found in html-backup");
  }

  const html = fs.readFileSync(filePath, "utf-8");

  // 1. Extract <main> content
  const mainMatch = html.match(/<main>([\s\S]*?)<\/main>/i);
  if (!mainMatch) throw new Error("Could not find <main> in portfolio.html");
  let mainContent = mainMatch[1];

  // 2. Extract portfolioModal skeleton
  const modalMatch = html.match(/(<div id="portfolioModal"[\s\S]*?<\/div>)\s*<script>/i);
  let modalContent = "";
  if (modalMatch) {
    modalContent = modalMatch[1];
  } else {
    modalContent = `<div id="portfolioModal" class="portfolio-modal" aria-hidden="true" role="dialog">
      <div class="portfolio-modal-header">
        <div class="portfolio-counter" id="modalCounter"></div>
        <button class="portfolio-modal-close" id="modalClose" aria-label="Close preview">&times;</button>
      </div>
      <div class="portfolio-modal-content" id="modalContent">
        <button class="portfolio-nav-btn prev" id="modalPrev" aria-label="Previous">&lang;</button>
        <div class="portfolio-modal-inner" id="modalInner"></div>
        <button class="portfolio-nav-btn next" id="modalNext" aria-label="Next">&rang;</button>
      </div>
      <div class="portfolio-thumb-strip" id="modalThumbStrip"></div>
    </div>`;
  }

  // Combine content
  let jsxMarkup = `${mainContent}\n\n${modalContent}`;

  // 3. JSX conversion rules
  jsxMarkup = jsxMarkup.replace(/class=/g, "className=");
  jsxMarkup = jsxMarkup.replace(/data-src=/g, "src=");
  jsxMarkup = jsxMarkup.replace(/data-thumb=/g, "poster=");
  jsxMarkup = jsxMarkup.replace(/className="lazy"/g, 'className=""');
  jsxMarkup = jsxMarkup.replace(/className="lazy-video"/g, 'className=""');
  jsxMarkup = jsxMarkup.replace(/<img([^>]*?)(?<!\/)>/g, "<img$1 />");
  jsxMarkup = jsxMarkup.replace(/<br>/g, "<br />").replace(/<br\s*>/g, "<br />");
  jsxMarkup = jsxMarkup.replace(/<input([^>]*?)(?<!\/)>/g, "<input$1 />");
  jsxMarkup = jsxMarkup.replace(/autoplay/g, "autoPlay");
  jsxMarkup = jsxMarkup.replace(/referrerpolicy=/g, "referrerPolicy=");
  jsxMarkup = jsxMarkup.replace(/allowfullscreen=/g, "allowFullScreen=");
  jsxMarkup = jsxMarkup.replace(/tabindex=/g, "tabIndex=");

  // Fix style attributes
  jsxMarkup = jsxMarkup.replace(/style="([^"]*?)"/g, (match, styleStr) => {
    const reactStyle = styleStr
      .split(";")
      .filter((s) => s.trim())
      .map((s) => {
        const [key, val] = s.split(":");
        if (!key || !val) return null;
        const camelKey = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        return `"${camelKey}": "${val.trim()}"`;
      })
      .filter(Boolean)
      .join(", ");
    return `style={{ ${reactStyle} }}`;
  });

  // Convert HTML entities in JSX
  jsxMarkup = jsxMarkup.replace(/&times;/g, "×");
  jsxMarkup = jsxMarkup.replace(/&lang;/g, '{"⟨"}');
  jsxMarkup = jsxMarkup.replace(/&rang;/g, '{"⟩"}');

  // Fix internal links to React Router Link components
  const routes = {
    "index": "/",
    "index.html": "/",
    "about": "/about",
    "about.html": "/about",
    "portfolio": "/portfolio",
    "portfolio.html": "/portfolio",
    "service": "/service",
    "service.html": "/service",
    "contact": "/contact",
    "contact.html": "/contact",
    "worktogether": "/worktogether",
    "worktogether.html": "/worktogether",
  };

  const anchorRegex = /<a\s+([^>]*?\bhref=["']([^"']+)["'][^>]*?)>([\s\S]*?)<\/a\s*>/gi;
  jsxMarkup = jsxMarkup.replace(anchorRegex, (match, attributes, hrefValue, content) => {
    const cleanHref = hrefValue.split('#')[0].trim();
    const internalRoute = routes[cleanHref];
    if (internalRoute) {
      const newAttributes = attributes.replace(/\bhref=["']([^"']+)["']/, `to="${internalRoute}"`);
      return `<Link ${newAttributes}>${content}</Link>`;
    }
    return match;
  });

  // Replace comments
  jsxMarkup = jsxMarkup.replace(/<!--/g, "{/*").replace(/-->/g, "*/}");

  // 4. Construct JS code for useEffect
  const effectCode = `  useEffect(() => {
    const $ = (sel, ctx) => (ctx || document).querySelector(sel);
    const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

    // Filter drag-to-scroll
    const scrollContainer = document.getElementById("portfolioFilterScroll");
    if (scrollContainer) {
      let isDown = false, startX, scrollLeft;
      scrollContainer.addEventListener("mousedown", (e) => {
        isDown = true;
        scrollContainer.classList.add("active");
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
        e.preventDefault();
      });
      scrollContainer.addEventListener("mouseleave", () => {
        isDown = false;
        scrollContainer.classList.remove("active");
      });
      scrollContainer.addEventListener("mouseup", () => {
        isDown = false;
        scrollContainer.classList.remove("active");
      });
      scrollContainer.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 1.5;
        scrollContainer.scrollLeft = scrollLeft - walk;
      });

      let touchStartX = 0, touchScrollLeft = 0;
      scrollContainer.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].pageX - scrollContainer.offsetLeft;
        touchScrollLeft = scrollContainer.scrollLeft;
      }, { passive: true });
      scrollContainer.addEventListener("touchmove", (e) => {
        const x = e.touches[0].pageX - scrollContainer.offsetLeft;
        const walk = (x - touchStartX) * 1.2;
        scrollContainer.scrollLeft = touchScrollLeft - walk;
      }, { passive: true });
    }

    // Isotope
    let iso;
    function initIsotope() {
      const grid = document.getElementById("portfolioGrid");
      if (!grid) return;
      if (window.Isotope) {
        iso = new window.Isotope(grid, {
          itemSelector: ".grid-item",
          layoutMode: "masonry",
          percentPosition: true,
          masonry: { columnWidth: ".grid-item" },
        });

        grid.addEventListener("load", (e) => {
          if (e.target.tagName === "IMG" && iso) {
            iso.layout();
          }
        }, true);

        const filterButtons = document.querySelectorAll(".td-portfolio-filter-btn button");
        filterButtons.forEach((btn) => {
          btn.addEventListener("click", function () {
            const filterValue = btn.getAttribute("data-filter") || "*";
            iso.arrange({ filter: filterValue });
            filterButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            
            const scrollContainer = document.getElementById("portfolioFilterScroll");
            if (scrollContainer && window.innerWidth < 768) {
              const btnRect = btn.getBoundingClientRect();
              const containerRect = scrollContainer.getBoundingClientRect();
              const offset = btnRect.left - containerRect.left - containerRect.width / 2 + btnRect.width / 2;
              scrollContainer.scrollBy({ left: offset, behavior: "smooth" });
            }
          });
        });
      }
    }


    // Premium Lightbox
    const modal = document.getElementById("portfolioModal");
    const modalInner = document.getElementById("modalInner");
    const modalCounter = document.getElementById("modalCounter");
    const modalThumbStrip = document.getElementById("modalThumbStrip");
    const modalPrev = document.getElementById("modalPrev");
    const modalNext = document.getElementById("modalNext");
    const modalClose = document.getElementById("modalClose");
    const modalContent = document.getElementById("modalContent");
    
    let currentIndex = 0;
    let visibleItems = [];

    function getVisibleItems() {
      return Array.from(document.querySelectorAll(".td-portfolio-filter-wrapper")).filter(item => {
        return window.getComputedStyle(item.parentElement).display !== "none";
      });
    }

    function openPreview(index, isFromItemClick = false) {
      const allItems = Array.from(document.querySelectorAll(".td-portfolio-filter-wrapper"));
      const item = allItems[index];
      if (!item) return;

      currentIndex = index;
      const img = item.querySelector("img");
      const video = item.querySelector("video");
      const src = img ? (img.dataset.src || img.src) : (video.dataset.src || (video.querySelector("source") && video.querySelector("source").src));
      
      if (modalInner) {
        modalInner.innerHTML = "";
        if (img) {
          const mImg = document.createElement("img");
          mImg.src = src;
          mImg.className = "portfolio-modal-image";
          modalInner.appendChild(mImg);
        } else {
          const mVid = document.createElement("video");
          mVid.src = src;
          mVid.controls = true;
          mVid.autoplay = true;
          mVid.className = "portfolio-modal-video";
          modalInner.appendChild(mVid);
        }
      }

      const currentVisibleItems = getVisibleItems();
      const vIndex = currentVisibleItems.indexOf(item);
      if (modalCounter) {
        modalCounter.textContent = \`\${vIndex + 1} / \${currentVisibleItems.length}\`;
      }

      document.querySelectorAll(".portfolio-thumb").forEach(t => t.classList.remove("active"));
      if (modalThumbStrip && modalThumbStrip.children[index]) {
        const activeThumb = modalThumbStrip.children[index];
        activeThumb.classList.add("active");
        activeThumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }

      if (modalPrev) modalPrev.disabled = vIndex === 0;
      if (modalNext) modalNext.disabled = vIndex === currentVisibleItems.length - 1;

      if (isFromItemClick && modal) {
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      }
    }

    function setupPortfolioLightbox() {
      const items = Array.from(document.querySelectorAll(".td-portfolio-filter-wrapper"));
      if (modalThumbStrip) {
        modalThumbStrip.innerHTML = "";
        items.forEach((item, index) => {
          const img = item.querySelector("img");
          const video = item.querySelector("video");
          const thumb = document.createElement("div");
          thumb.className = "portfolio-thumb";
          thumb.dataset.index = index;
          
          if (img) {
            const tImg = document.createElement("img");
            tImg.src = img.dataset.src || img.src;
            thumb.appendChild(tImg);
          } else if (video) {
            const tVid = document.createElement("video");
            tVid.src = video.dataset.src || (video.querySelector("source") && video.querySelector("source").src);
            tVid.muted = true;
            thumb.appendChild(tVid);
          }

          thumb.addEventListener("click", () => openPreview(index));
          modalThumbStrip.appendChild(thumb);

          item.addEventListener("click", () => {
            visibleItems = getVisibleItems();
            currentIndex = visibleItems.indexOf(item);
            openPreview(index, true);
          });
        });
      }
    }

    function closePreview() {
      if (modal) {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      }
      if (modalInner) modalInner.innerHTML = "";
    }

    if (modalPrev) {
      modalPrev.addEventListener("click", () => {
        const currentVisible = getVisibleItems();
        const allItems = Array.from(document.querySelectorAll(".td-portfolio-filter-wrapper"));
        const currentItem = allItems[currentIndex];
        const vIndex = currentVisible.indexOf(currentItem);
        if (vIndex > 0) {
          const nextItem = currentVisible[vIndex - 1];
          openPreview(allItems.indexOf(nextItem));
        }
      });
    }

    if (modalNext) {
      modalNext.addEventListener("click", () => {
        const currentVisible = getVisibleItems();
        const allItems = Array.from(document.querySelectorAll(".td-portfolio-filter-wrapper"));
        const currentItem = allItems[currentIndex];
        const vIndex = currentVisible.indexOf(currentItem);
        if (vIndex < currentVisible.length - 1) {
          const nextItem = currentVisible[vIndex + 1];
          openPreview(allItems.indexOf(nextItem));
        }
      });
    }

    if (modalClose) modalClose.addEventListener("click", closePreview);
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target === modalContent) closePreview();
      });
    }

    const handleKeydown = (e) => {
      if (!modal || !modal.classList.contains("active")) return;
      if (e.key === "Escape") closePreview();
      if (e.key === "ArrowLeft" && modalPrev) modalPrev.click();
      if (e.key === "ArrowRight" && modalNext) modalNext.click();
    };
    document.addEventListener("keydown", handleKeydown);

    // Initializations
    initIsotope();
    setupPortfolioLightbox();

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);`;

  // Write full file
  const fullContent = `import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import usePageInit from "../hooks/usePageInit";

export default function Portfolio() {
  usePageInit();

${effectCode}

  return (
    <div className="portfolio-page">
      ${jsxMarkup.trim()}
    </div>
  );
}
`;

  fs.writeFileSync("d:/files/freelancing/psquarestudio/psquarestudio/src/pages/Portfolio.jsx", fullContent, "utf-8");
  console.log("Portfolio.jsx successfully regenerated!");
}

convertPortfolioHtmlToJsx();
