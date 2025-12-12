/* assets/js/portfolio.js
   Portfolio-specific JS (scoped, non-destructive)
   - Lazy load images & videos
   - Isotope init + filters
   - Drag-to-scroll filter bar
   - Accessible responsive lightbox with thumbs
   - Body scroll lock when lightbox open
*/

(function () {
    "use strict";

    // Helpers
    const $ = (sel, ctx) => (ctx || document).querySelector(sel);
    const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    /* -----------------------
       Body scroll lock helpers
       ----------------------- */
    function lockBody() {
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        document.body.style.touchAction = "none";
    }
    function unlockBody() {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        document.body.style.touchAction = "";
    }

    /* -----------------------
       MOBILE FILTER SCROLL (drag-to-scroll)
       ----------------------- */
    const scrollContainer = $("#portfolioFilterScroll");
    if (scrollContainer) {
        // Add scroll indicator functionality
        function updateScrollIndicator() {
            if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
                scrollContainer.setAttribute('data-scrolled', 'true');
            } else {
                scrollContainer.removeAttribute('data-scrolled');
            }
        }
        
        // Initial check
        updateScrollIndicator();
        
        // Update on resize
        window.addEventListener('resize', updateScrollIndicator);
        
        // Update on scroll
        scrollContainer.addEventListener('scroll', updateScrollIndicator);
        
        let isDown = false;
        let startX, scrollLeft;
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
            updateScrollIndicator();
        });

        // touch
        let touchStartX = 0;
        let touchScrollLeft = 0;
        scrollContainer.addEventListener("touchstart", (e) => {
            touchStartX = e.touches[0].pageX - scrollContainer.offsetLeft;
            touchScrollLeft = scrollContainer.scrollLeft;
        }, { passive: true });
        scrollContainer.addEventListener("touchmove", (e) => {
            const x = e.touches[0].pageX - scrollContainer.offsetLeft;
            const walk = (x - touchStartX) * 1.2;
            scrollContainer.scrollLeft = touchScrollLeft - walk;
            updateScrollIndicator();
        }, { passive: true });
        
        // Add wheel scrolling support for better UX
        scrollContainer.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                scrollContainer.scrollLeft += e.deltaY;
                updateScrollIndicator();
            }
        }, { passive: false });
    }

    /* -----------------------
       ISOTOPE (init)
       ----------------------- */
    function initIsotope() {
        const grid = document.getElementById("portfolioGrid");
        const filterButtons = Array.from(document.querySelectorAll(".td-portfolio-filter-btn button"));
        if (!grid) return;

        imagesLoaded(grid, function () {
            // ensure Isotope exists
            if (typeof Isotope === "undefined") {
                console.warn("Isotope not found. Skipping Isotope layout.");
                return;
            }
            const iso = new Isotope(grid, {
                itemSelector: ".grid-item",
                layoutMode: "masonry",
                percentPosition: true,
                masonry: { columnWidth: ".grid-item" },
            });

            filterButtons.forEach((btn) => {
                btn.addEventListener("click", function () {
                    const filterValue = btn.getAttribute("data-filter") || "*";
                    iso.arrange({ filter: filterValue });

                    filterButtons.forEach((b) => {
                        b.classList.remove("active");
                        b.setAttribute("aria-pressed", "false");
                    });
                    btn.classList.add("active");
                    btn.setAttribute("aria-pressed", "true");

                    // center clicked filter button on mobile
                    if (scrollContainer) {
                        const btnRect = btn.getBoundingClientRect();
                        const containerRect = scrollContainer.getBoundingClientRect();
                        const offset = btnRect.left - containerRect.left - containerRect.width / 2 + btnRect.width / 2;
                        scrollContainer.scrollBy({ left: offset, behavior: "smooth" });
                    }
                });
            });

            window.addEventListener("resize", () => iso.layout());
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initIsotope);
    } else {
        initIsotope();
    }

    /* ======================
       LAZY LOADING
       ====================== */
    function setupLazy() {
        const lazyImages = Array.from(document.querySelectorAll("img.lazy"));
        const lazyVideos = Array.from(document.querySelectorAll("video.lazy-video"));

        if ("IntersectionObserver" in window) {
            const imgObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.dataset.src;
                        if (src) {
                            img.src = src;
                            img.removeAttribute("data-src");
                        }
                        img.classList.remove("lazy");
                        imgObserver.unobserve(img);
                    }
                });
            }, { rootMargin: "200px 0px" });

            lazyImages.forEach((img) => imgObserver.observe(img));

            const vidObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const video = entry.target;
                        const src = video.dataset.src;
                        if (src) {
                            // create <source> only when needed
                            if (!video.querySelector("source")) {
                                const source = document.createElement("source");
                                source.src = src;
                                source.type = "video/mp4";
                                video.appendChild(source);
                            }
                        }
                        // set poster/thumb if provided as data-thumb
                        if (video.dataset && video.dataset.thumb) {
                            try { video.setAttribute("poster", video.dataset.thumb); } catch (e) { }
                        }
                        video.load();
                        video.classList.remove("lazy-video");
                        vidObserver.unobserve(video);
                    }
                });
            }, { rootMargin: "400px 0px" });

            lazyVideos.forEach((v) => vidObserver.observe(v));
        } else {
            // fallback: load all immediately
            lazyImages.forEach((img) => {
                if (img.dataset && img.dataset.src) img.src = img.dataset.src;
                img.classList.remove("lazy");
            });
            lazyVideos.forEach((video) => {
                if (video.dataset && video.dataset.src && !video.querySelector("source")) {
                    const source = document.createElement("source");
                    source.src = video.dataset.src;
                    source.type = "video/mp4";
                    video.appendChild(source);
                }
                if (video.dataset && video.dataset.thumb) {
                    try { video.setAttribute("poster", video.dataset.thumb); } catch (e) { }
                }
                video.load();
                video.classList.remove("lazy-video");
            });
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", setupLazy);
    } else {
        setupLazy();
    }

    /* ======================
       LIGHTBOX + THUMBS (ACCESSIBLE)
       ====================== */
    (function lightbox() {
        const wrappers = Array.from(document.querySelectorAll(".td-portfolio-filter-wrapper"));
        const overlayLB = document.getElementById("lightboxOverlay");
        const lbMainArea = document.getElementById("lbMainArea");
        const lbThumbs = document.getElementById("lbThumbs");
        const closeBtn = document.getElementById("lightboxClose");
        const prevBtn = document.getElementById("lbPrev");
        const nextBtn = document.getElementById("lbNext");
        const loader = document.getElementById("lbLoader");

        const gallery = wrappers.map((wrap) => {
            const img = wrap.querySelector("img");
            const video = wrap.querySelector("video");
            if (img) {
                return {
                    type: "image",
                    src: img.dataset ? (img.dataset.src || img.src) : img.src,
                    thumb: img.dataset ? (img.dataset.src || img.src) : img.src,
                    alt: img.alt || ""
                };
            }
            if (video) {
                const vsrc = video.dataset ? video.dataset.src : (video.querySelector("source") ? video.querySelector("source").src : "");
                const thumb = (video.dataset && (video.dataset.thumb || video.dataset.poster)) ? (video.dataset.thumb || video.dataset.poster) : "assets/img/video-thumb-placeholder.jpg";
                return { type: "video", src: vsrc, thumb: thumb, alt: "" };
            }
            return null;
        }).filter(Boolean);

        // build thumbs
        function buildThumbs() {
            if (!lbThumbs) return;
            lbThumbs.innerHTML = "";
            gallery.forEach((item, i) => {
                const t = document.createElement("button");
                t.className = "lb-thumb";
                t.setAttribute("data-index", i);
                t.setAttribute("aria-label", "Open item " + (i + 1));
                t.setAttribute("type", "button");
                t.tabIndex = 0;

                const im = document.createElement("img");
                im.src = item.thumb || item.src;
                im.alt = item.alt || "thumb " + (i + 1);
                t.appendChild(im);

                t.addEventListener("click", () => showLightbox(i, true));
                t.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); showLightbox(i, true); } });

                lbThumbs.appendChild(t);
            });
        }

        let currentIndex = 0;

        function showLoader(show) {
            if (!loader) return;
            loader.style.display = show ? "block" : "none";
        }

        function preloadResource(item) {
            if (!item || !item.src) return;
            // preload by adding <link rel="preload"> to head (non-blocking)
            const link = document.createElement("link");
            link.rel = "preload";
            link.href = item.src;
            link.as = (item.type === "image") ? "image" : "video";
            link.dataset.tmp = "true";
            document.head.appendChild(link);
        }

        function clearPreloads() {
            document.querySelectorAll("link[data-tmp]").forEach(n => n.remove());
        }

        function renderMain(item) {
            if (!lbMainArea) return;
            lbMainArea.innerHTML = "";
            if (!item) return;
            if (item.type === "image") {
                const img = new Image();
                img.alt = item.alt || "";
                img.className = "lb-main-media";
                img.onload = function () {
                    showLoader(false);
                    lbMainArea.innerHTML = "";
                    lbMainArea.appendChild(img);
                    try { img.focus(); } catch (e) { }
                };
                img.onerror = function () {
                    showLoader(false);
                    lbMainArea.innerHTML = '<div class="lb-placeholder" style="color:#fff;padding:20px;">Unable to load image</div>';
                };
                showLoader(true);
                img.src = item.src;
            } else {
                const video = document.createElement("video");
                video.controls = true;
                video.autoplay = true;
                video.playsInline = true;
                video.style.maxHeight = "78vh";
                video.setAttribute("aria-label", "Video preview");
                const source = document.createElement("source");
                source.src = item.src;
                source.type = "video/mp4";
                video.appendChild(source);
                video.onloadeddata = function () {
                    showLoader(false);
                    lbMainArea.innerHTML = "";
                    lbMainArea.appendChild(video);
                    try { video.focus(); } catch (e) { }
                };
                video.onerror = function () {
                    showLoader(false);
                    lbMainArea.innerHTML = '<div class="lb-placeholder" style="color:#fff;padding:20px;">Unable to load video</div>';
                };
                showLoader(true);
                // start loading
                video.load();
            }
        }

        function highlightThumb(index) {
            if (!lbThumbs) return;
            const all = lbThumbs.querySelectorAll(".lb-thumb");
            all.forEach(n => n.classList.remove("active"));
            const active = lbThumbs.querySelector('.lb-thumb[data-index="' + index + '"]');
            if (active) {
                active.classList.add("active");
                const containerRect = lbThumbs.getBoundingClientRect();
                const btnRect = active.getBoundingClientRect();
                const offset = btnRect.left - containerRect.left - containerRect.width / 2 + btnRect.width / 2;
                lbThumbs.scrollBy({ left: offset, behavior: "smooth" });
                try { active.focus(); } catch (e) { }
            }
        }

        function showLightbox(index, calledByThumb = false) {
            if (!gallery.length || !overlayLB) return;
            currentIndex = (index + gallery.length) % gallery.length;
            overlayLB.style.display = "flex";
            overlayLB.setAttribute("aria-hidden", "false");
            lockBody();

            // focus management
            try { closeBtn.focus(); } catch (e) { }

            // preload neighbors
            clearPreloads();
            preloadResource(gallery[(currentIndex + 1) % gallery.length]);
            preloadResource(gallery[(currentIndex - 1 + gallery.length) % gallery.length]);

            renderMain(gallery[currentIndex]);
            highlightThumb(currentIndex);
        }

        // attach click/keydown listeners to open lightbox
        wrappers.forEach((wrap, i) => {
            wrap.addEventListener("click", () => showLightbox(i));
            wrap.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); showLightbox(i); }
            });
        });

        function closeLightbox() {
            if (!overlayLB) return;
            overlayLB.style.display = "none";
            overlayLB.setAttribute("aria-hidden", "true");
            lbMainArea.innerHTML = "";
            clearPreloads();
            unlockBody();
            // return focus to wrapper if present
            const targetWrap = wrappers[currentIndex];
            if (targetWrap && typeof targetWrap.focus === "function") {
                try { targetWrap.focus(); } catch (e) { }
            }
        }

        if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
        if (overlayLB) overlayLB.addEventListener("click", (e) => { if (e.target === overlayLB) closeLightbox(); });

        function goto(delta) {
            showLightbox(currentIndex + delta);
        }
        if (nextBtn) nextBtn.addEventListener("click", () => goto(1));
        if (prevBtn) prevBtn.addEventListener("click", () => goto(-1));

        // keyboard nav
        document.addEventListener("keydown", (e) => {
            if (!overlayLB || overlayLB.style.display !== "flex") return;
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowRight") goto(1);
            if (e.key === "ArrowLeft") goto(-1);
        });

        // swipe support
        (function addSwipe() {
            let startX = 0, startY = 0, isMoving = false, threshold = 30;
            if (!lbMainArea) return;
            lbMainArea.addEventListener("touchstart", (e) => {
                if (!e.touches || e.touches.length > 1) return;
                startX = e.touches[0].clientX; startY = e.touches[0].clientY; isMoving = true;
            }, { passive: true });
            lbMainArea.addEventListener("touchmove", (e) => {
                if (!isMoving || !e.touches || e.touches.length > 1) return;
                const dx = e.touches[0].clientX - startX;
                const dy = e.touches[0].clientY - startY;
                if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
                    if (dx < 0) goto(1); else goto(-1);
                    isMoving = false;
                }
            }, { passive: true });
            lbMainArea.addEventListener("touchend", () => { isMoving = false; });
        })();

        // focus trap minimal (ensures focus stays in overlay)
        (function focusTrap() {
            if (!overlayLB) return;
            document.addEventListener("focusin", (e) => {
                if (overlayLB.style.display === "flex") {
                    if (!overlayLB.contains(e.target)) {
                        e.stopPropagation();
                        try { closeBtn.focus(); } catch (err) { }
                    }
                }
            });
        })();

        // init
        buildThumbs();
        if (gallery.length) highlightThumb(0);
    })();

    /* -----------------------
       MOBILE MENU (kept minimal - non-destructive)
       ----------------------- */
    (function mobileMenu() {
        const mobileToggle = document.getElementById("mobileToggle");
        const mobileMenu = document.getElementById("mobileMenu");
        const closeMenu = document.getElementById("closeMenu");
        const overlay = document.getElementById("overlay");

        function openMobileMenu() {
            if (mobileMenu) { mobileMenu.style.display = "block"; mobileMenu.setAttribute("aria-hidden", "false"); }
            if (overlay) overlay.style.display = "block";
            if (mobileToggle) mobileToggle.setAttribute("aria-expanded", "true");
        }
        function closeMobile() {
            if (mobileMenu) { mobileMenu.style.display = "none"; mobileMenu.setAttribute("aria-hidden", "true"); }
            if (overlay) overlay.style.display = "none";
            if (mobileToggle) mobileToggle.setAttribute("aria-expanded", "false");
        }
        if (mobileToggle) mobileToggle.addEventListener("click", openMobileMenu);
        if (closeMenu) closeMenu.addEventListener("click", closeMobile);
        if (overlay) overlay.addEventListener("click", () => {
            closeMobile();
            // if lightbox opened it uses same overlay ID? We use separate overlay for lightbox; keep this harmless
        });
    })();

})(); // end IIFE
