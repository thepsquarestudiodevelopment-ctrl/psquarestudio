import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import usePageInit from "../hooks/usePageInit";

export default function Portfolio() {
  usePageInit();

  useEffect(() => {
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

    function getVisibleItems() {
      return Array.from(document.querySelectorAll(".td-portfolio-filter-wrapper")).filter(item => {
        return window.getComputedStyle(item.parentElement).display !== "none";
      });
    }

    function openPreview(index, isFromItemClick = false) {
      const visibleItems = getVisibleItems();
      const item = visibleItems[index];
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

      if (modalCounter) {
        modalCounter.textContent = `${index + 1} / ${visibleItems.length}`;
      }

      // Highlight active thumbnail and scroll it into view (match by source URL first, fallback to index)
      let highlightedAny = false;
      document.querySelectorAll(".portfolio-thumb").forEach((t, tIdx) => {
        const tMedia = t.querySelector("img, video");
        const tSrc = tMedia ? (tMedia.src || tMedia.getAttribute("src")) : "";
        
        // Check if absolute or relative URLs match
        if (tSrc && (tSrc === src || src.endsWith(tMedia.getAttribute("src")) || tSrc.endsWith(src))) {
          t.classList.add("active");
          t.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
          highlightedAny = true;
        } else {
          t.classList.remove("active");
        }
      });

      // Index-based fallback
      if (!highlightedAny) {
        document.querySelectorAll(".portfolio-thumb").forEach((t, tIdx) => {
          if (tIdx === index) {
            t.classList.add("active");
            t.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
          } else {
            t.classList.remove("active");
          }
        });
      }

      if (modalPrev) modalPrev.disabled = index === 0;
      if (modalNext) modalNext.disabled = index === visibleItems.length - 1;

      if (isFromItemClick && modal) {
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      }
    }

    function setupPortfolioLightbox() {
      const visibleItems = getVisibleItems();
      if (modalThumbStrip) {
        modalThumbStrip.innerHTML = "";
        visibleItems.forEach((item, index) => {
          const img = item.querySelector("img");
          const video = item.querySelector("video");
          const thumb = document.createElement("div");
          thumb.className = "portfolio-thumb";
          thumb.dataset.index = index;
          
          if (img) {
            const tImg = document.createElement("img");
            tImg.src = img.dataset.src || img.src || img.getAttribute("src");
            thumb.appendChild(tImg);
          } else if (video) {
            const poster = video.getAttribute("poster");
            if (poster) {
              const tImg = document.createElement("img");
              tImg.src = poster;
              thumb.appendChild(tImg);
            } else {
              const tVid = document.createElement("video");
              tVid.src = video.src || video.getAttribute("src") || video.dataset.src || (video.querySelector("source") && video.querySelector("source").src);
              tVid.muted = true;
              tVid.playsInline = true;
              thumb.appendChild(tVid);
            }
          }

          thumb.addEventListener("click", () => openPreview(index));
          modalThumbStrip.appendChild(thumb);
        });
      }
    }

    // Attach click events to portfolio grid items once
    const gridItems = Array.from(document.querySelectorAll(".td-portfolio-filter-wrapper"));
    gridItems.forEach((item) => {
      item.addEventListener("click", () => {
        const visibleItems = getVisibleItems();
        const index = visibleItems.indexOf(item);
        if (index !== -1) {
          // Re-generate thumbnail strip to ensure it matches current filter before opening
          setupPortfolioLightbox();
          openPreview(index, true);
        }
      });
    });

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
        if (currentIndex > 0) {
          openPreview(currentIndex - 1);
        }
      });
    }

    if (modalNext) {
      modalNext.addEventListener("click", () => {
        const visibleItems = getVisibleItems();
        if (currentIndex < visibleItems.length - 1) {
          openPreview(currentIndex + 1);
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
  }, []);

  return (
    <div className="portfolio-page">
      <div className="td-breadcrumb-area td-breadcrumb-spacing mb-75 px-30">
            <div className="container">
              <div className="row">
                <div className="col-lg-9">
                  <div className="td-breadcrumb-wrap">
                    <span
                      className="subtitle d-inline-block mb-10 wow fadeInLeft"
                      data-wow-delay=".5s"
                      data-wow-duration="1s"
                      >PORTFOLIO</span
                    >
                    <h2
                      className="td-section-page-title td-section-page-bigtitle mb-35 wow fadeInLeft"
                      data-wow-delay=".7s"
                      data-wow-duration="1s"
                    >
                      Visual <span>Collection</span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* filters: note the id below (portfolioFilterScroll) */}
          <div
            className="td-portfolio-filter-area td-portfolio-filter-three pb-160 px-30"
          >
            <div className="container-fluid container-1830">
              <div className="row">
                <div
                  className="col-lg-12 mb-50 wow fadeInUp"
                  data-wow-delay=".5s"
                  data-wow-duration="1s"
                >
                  <div
                    className="td-portfolio-filter-btn text-center masonary-menu"
                    id="portfolioFilterScroll"
                    tabIndex="0"
                    aria-label="Portfolio filter scroll"
                  >
                    <button data-filter="*" className="active">SHOW ALL</button>
                    <button data-filter=".prof">Graphic Design</button>
                    <button data-filter=".prof1">Motion Ads</button>
                    <button data-filter=".prof2">Video Production</button>
                    <button data-filter=".prof3">3D Architecture</button>
                    <button data-filter=".prof4">CGI</button>
                    <button data-filter=".prof5">Set Design</button>
                  </div>
                </div>
              </div>

              <div className="grid row px-30" id="portfolioGrid">
                {/* Item 1 graphic design*/}
                <div className="col-lg-4 col-md-6 grid-item prof mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Graphic Design/1.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 2 graphic design*/}
                <div className="col-lg-4 col-md-6 grid-item prof mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Graphic Design/2.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 3 graphic design */}
                <div className="col-lg-4 col-md-6 grid-item prof mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Graphic Design/3.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 1 motion graphics*/}
                <div className="col-lg-4 col-md-6 grid-item prof1 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Motion Ad 2"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <video
                        className=""
                        autoPlay="true"
                        muted
                        loop
                        playsinline
                        preload="metadata"
                        src="assets/img/portfolio/Motion graphics/1.mp4"
                        poster="assets/img/portfolio/Motion graphics/thumbnail_1.jpg"
                      ></video>
                    </div>
                  </div>
                </div>
                {/* Item 2 motion graphics*/}
                <div className="col-lg-4 col-md-6 grid-item prof1 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Motion Ad 2"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <video
                        className=""
                        autoPlay="true"
                        muted
                        loop
                        playsinline
                        preload="metadata"
                        src="assets/img/portfolio/Motion graphics/2.mp4"
                        poster="assets/img/portfolio/Motion graphics/thumbnail_2.jpg"
                      ></video>
                    </div>
                  </div>
                </div>
                {/* Item 3 motion graphics*/}
                <div className="col-lg-4 col-md-6 grid-item prof1 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Motion Ad 2"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <video
                        className=""
                        autoPlay="true"
                        muted
                        playsinline
                        preload="metadata"
                        src="assets/img/portfolio/Motion graphics/3.mp4"
                        poster="assets/img/portfolio/Motion graphics/thumbnail_3.jpg"
                      ></video>
                    </div>
                  </div>
                </div>
                {/* Item 1 video editing*/}
                <div className="col-lg-4 col-md-6 grid-item prof2 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Motion Ad 2"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <video
                        className=""
                        autoPlay="true"
                        muted
                        loop
                        playsinline
                        preload="metadata"
                        src="assets/img/portfolio/Video Editing/5.mp4"
                        poster="assets/img/portfolio/Video Editing/thumbnail_1.png"
                      ></video>
                    </div>
                  </div>
                </div>
                {/* Item 2 video editing*/}
                <div className="col-lg-4 col-md-6 grid-item prof2 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Motion Ad 2"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <video
                        className=""
                        autoPlay="true"
                        muted
                        loop
                        playsinline
                        preload="metadata"
                        src="https://8m6f5no6ww6taydi.public.blob.vercel-storage.com/1.mp4"
                        poster="assets/img/portfolio/Video Editing/thumbnail_1.png"
                      ></video>
                    </div>
                  </div>
                </div>
                {/* Item 3 video editing*/}
                <div className="col-lg-4 col-md-6 grid-item prof2 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Motion Ad 2"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <video
                        className=""
                        autoPlay="true"
                        muted
                        loop
                        playsinline
                        preload="metadata"
                        src="https://8m6f5no6ww6taydi.public.blob.vercel-storage.com/2.mp4"
                        poster="assets/img/portfolio/Video Editing/thumbnail_2.png"
                      ></video>
                    </div>
                  </div>
                </div>
                {/* 3d architecture images start */}
                {/* Item 1 3D Architecture*/}
                <div className="col-lg-4 col-md-6 grid-item prof3 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/3D Architecture/1.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 2 3D Architecture*/}
                <div className="col-lg-4 col-md-6 grid-item prof3 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/3D Architecture/2.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 3 3D Architecture*/}
                <div className="col-lg-4 col-md-6 grid-item prof3 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/3D Architecture/3.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* 3d architecture images end */}
                {/* cgi videos start */}
                {/* Item 1 CGI*/}
                <div className="col-lg-4 col-md-6 grid-item prof4 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Motion Ad 2"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <video
                        className=""
                        autoPlay="true"
                        muted
                        loop
                        playsinline
                        preload="metadata"
                        src="assets/img/portfolio/CGI/1.mp4"
                        poster="assets/img/portfolio/CGI/thumbnail_1.jpg"
                      ></video>
                    </div>
                  </div>
                </div>
                {/* Item 2 CGI*/}
                <div className="col-lg-4 col-md-6 grid-item prof4 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Motion Ad 2"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <video
                        className=""
                        autoPlay="true"
                        muted
                        loop
                        playsinline
                        preload="metadata"
                        src="assets/img/portfolio/CGI/2.mp4"
                        poster="assets/img/portfolio/CGI/thumbnail_2.jpg"
                      ></video>
                    </div>
                  </div>
                </div>
                {/* Item 3 CGI*/}
                <div className="col-lg-4 col-md-6 grid-item prof4 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Motion Ad 2"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <video
                        className=""
                        autoPlay="true"
                        muted
                        loop
                        playsinline
                        preload="metadata"
                        src="assets/img/portfolio/CGI/3.mp4"
                        poster="assets/img/portfolio/CGI/thumbnail_3.jpg"
                      ></video>
                    </div>
                  </div>
                </div>
                {/* Item 1 set design*/}
                <div className="col-lg-4 col-md-6 grid-item prof5 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Set design/1.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 2 set design*/}
                <div className="col-lg-4 col-md-6 grid-item prof5 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Set design/2.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 3 set design*/}
                <div className="col-lg-4 col-md-6 grid-item prof5 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Set design/3.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 4 graphic design*/}
                <div className="col-lg-4 col-md-6 grid-item prof mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Graphic Design/4.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 5 graphic design*/}
                <div className="col-lg-4 col-md-6 grid-item prof mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Graphic Design/5.png"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 6 graphic design*/}
                <div className="col-lg-4 col-md-6 grid-item prof mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Graphic Design/6.png"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 4 motion graphics*/}
                <div className="col-lg-4 col-md-6 grid-item prof1 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Motion Ad 2"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <video
                        className=""
                        autoPlay="true"
                        muted
                        loop
                        playsinline
                        preload="metadata"
                        src="assets/img/portfolio/Motion graphics/4.mp4"
                        poster="assets/img/portfolio/Motion graphics/thumbnail_4.jpg"
                      ></video>
                    </div>
                  </div>
                </div>
                {/* Item 5 motion graphics*/}
                <div className="col-lg-4 col-md-6 grid-item prof1 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Motion Ad 2"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <video
                        className=""
                        autoPlay="true"
                        muted
                        loop
                        playsinline
                        preload="metadata"
                        src="assets/img/portfolio/Motion graphics/5.mp4"
                        poster="assets/img/portfolio/Motion graphics/thumbnail_5.jpg"
                      ></video>
                    </div>
                  </div>
                </div>
                {/* Item 4 video editing */}
                <div className="col-lg-4 col-md-6 grid-item prof2 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Motion Ad 2"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <video
                        className=""
                        autoPlay="true"
                        muted
                        loop
                        playsinline
                        preload="metadata"
                        src="assets/img/portfolio/Video Editing/3.mp4"
                        poster="assets/img/portfolio/Video Editing/thumbnail_3"
                      ></video>
                    </div>
                  </div>
                </div>
                {/* Item 5 video editing */}
                <div className="col-lg-4 col-md-6 grid-item prof2 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Motion Ad 2"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <video
                        className=""
                        autoPlay="true"
                        muted
                        loop
                        playsinline
                        preload="metadata"
                        src="assets/img/portfolio/Video Editing/4.mp4"
                        poster="assets/img/portfolio/Video Editing/thumbnail_4"
                      ></video>
                    </div>
                  </div>
                </div>
                {/* Item 4 3D Architecture*/}
                <div className="col-lg-4 col-md-6 grid-item prof3 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/3D Architecture/4.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 5 3D Architecture*/}
                <div className="col-lg-4 col-md-6 grid-item prof3 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/3D Architecture/5.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 4 CGI*/}
                <div className="col-lg-4 col-md-6 grid-item prof4 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Motion Ad 2"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <video
                        className=""
                        autoPlay="true"
                        muted
                        loop
                        playsinline
                        preload="metadata"
                        src="assets/img/portfolio/CGI/4.mp4"
                        poster="assets/img/portfolio/CGI/thumbnail_4.jpg"
                      ></video>
                    </div>
                  </div>
                </div>
                {/* Item 7 graphic design*/}
                <div className="col-lg-4 col-md-6 grid-item prof mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Graphic Design/7.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 8 graphic design*/}
                <div className="col-lg-4 col-md-6 grid-item prof mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Graphic Design/8.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 9 graphic design*/}
                <div className="col-lg-4 col-md-6 grid-item prof mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Graphic Design/9.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>

                {/* Item 4 set design*/}
                <div className="col-lg-4 col-md-6 grid-item prof5 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Set design/4.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 5 set design*/}
                <div className="col-lg-4 col-md-6 grid-item prof5 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Set design/5.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 6 set design*/}
                <div className="col-lg-4 col-md-6 grid-item prof5 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Set design/6.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 10 set design*/}
                <div className="col-lg-4 col-md-6 grid-item prof5 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Set design/10.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 10 graphic design*/}
                <div className="col-lg-4 col-md-6 grid-item prof mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Graphic Design/10.png"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 11 graphic design*/}
                <div className="col-lg-4 col-md-6 grid-item prof mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Graphic Design/11.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 12 graphic design*/}
                <div className="col-lg-4 col-md-6 grid-item prof mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Graphic Design/12.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>

                {/* Item 7 set design*/}
                <div className="col-lg-4 col-md-6 grid-item prof5 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Set design/7.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 8 set design*/}
                <div className="col-lg-4 col-md-6 grid-item prof5 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Set design/8.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 9 set design*/}
                <div className="col-lg-4 col-md-6 grid-item prof5 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Set design/9.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 11 set design*/}
                <div className="col-lg-4 col-md-6 grid-item prof5 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Set design/11.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 13 graphic design*/}
                <div className="col-lg-4 col-md-6 grid-item prof mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Graphic Design/13.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 14 graphic design*/}
                <div className="col-lg-4 col-md-6 grid-item prof mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Graphic Design/14.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 15 graphic design*/}
                <div className="col-lg-4 col-md-6 grid-item prof mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Graphic Design/15.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>

                {/* Item 16 graphic design*/}
                <div className="col-lg-4 col-md-6 grid-item prof mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Graphic Design/16.png"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 17 graphic design*/}
                <div className="col-lg-4 col-md-6 grid-item prof mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Graphic Design/17.png"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 18 graphic design*/}
                <div className="col-lg-4 col-md-6 grid-item prof mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Graphic Design/18.png"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 19 graphic design*/}
                <div className="col-lg-4 col-md-6 grid-item prof mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Graphic Design/19.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 20 graphic design*/}
                <div className="col-lg-4 col-md-6 grid-item prof mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Graphic Design/20.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>

                {/* Item 12 set design*/}
                <div className="col-lg-4 col-md-6 grid-item prof5 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Set design/12.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 13 set design*/}
                <div className="col-lg-4 col-md-6 grid-item prof5 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Set design/13.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 14 set design*/}
                <div className="col-lg-4 col-md-6 grid-item prof5 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Set design/14.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 15 set design*/}
                <div className="col-lg-4 col-md-6 grid-item prof5 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Set design/15.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 16 set design*/}
                <div className="col-lg-4 col-md-6 grid-item prof5 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Set design/16.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 17 set design*/}
                <div className="col-lg-4 col-md-6 grid-item prof5 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Set design/17.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                {/* Item 18 set design*/}
                <div className="col-lg-4 col-md-6 grid-item prof5 mb-30">
                  <div
                    className="td-portfolio-filter-wrapper"
                    tabIndex="0"
                    role="button"
                    aria-label="Open Project Title 1"
                  >
                    <div className="td-portfolio-filter-thumb">
                      <img
                        src="assets/img/portfolio/Set design/18.jpg"
                        alt="Project 1"
                        className=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        

      {createPortal(
        <div id="portfolioModal" className="portfolio-modal" aria-hidden="true" role="dialog">
          <div className="portfolio-modal-header">
            <div className="portfolio-counter" id="modalCounter"></div>
            <button className="portfolio-modal-close" id="modalClose" aria-label="Close preview">×</button>
          </div>
          <div className="portfolio-modal-content" id="modalContent">
            <button className="portfolio-nav-btn prev" id="modalPrev" aria-label="Previous">{"⟨"}</button>
            <div className="portfolio-modal-inner" id="modalInner"></div>
            <button className="portfolio-nav-btn next" id="modalNext" aria-label="Next">{"⟩"}</button>
          </div>
          <div className="portfolio-thumb-strip" id="modalThumbStrip"></div>
        </div>,
        document.body
      )}
    </div>
  );
}
