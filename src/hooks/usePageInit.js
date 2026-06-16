import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function usePageInit() {
  const location = useLocation();

  useEffect(() => {
    // Wait a brief moment for DOM to finish rendering
    const timer = setTimeout(() => {
      const $ = window.$;

      // 1. Data Background / BG Color / Width settings
      if ($) {
        $("[data-background]").each(function () {
          $(this).css("background-image", "url(" + $(this).attr("data-background") + ")");
        });

        $("[data-bg-color]").each(function () {
          $(this).css("background-color", $(this).attr("data-bg-color"));
        });

        $("[data-width]").each(function () {
          $(this).css("width", $(this).attr("data-width") + "px");
        });

        // Nice Select
        if ($.fn.niceSelect) {
          $(".select").niceSelect();
        }

        // Magnific Popup
        if ($.fn.magnificPopup) {
          $(".popup-image").magnificPopup({
            type: "image",
            gallery: {
              enabled: true,
            },
          });

          $(".popup-video").magnificPopup({
            type: "iframe",
          });
        }

        // Odometer
        if ($.fn.appear) {
          $(".odometer").appear(function () {
            $(this).each(function () {
              const countNumber = $(this).attr("data-count");
              $(this).html(countNumber);
            });
          });
        }
      }

      // 2. Swiper Sliders Initialization
      if (window.Swiper) {
        // Testimonial synchronized sliders (Text and Image)
        if (document.querySelector(".td-testimonial-image-slider") && document.querySelector(".td-testimonial-text-slider")) {
          const imageSlider = new window.Swiper(".td-testimonial-image-slider", {
            slidesPerView: 1,
            spaceBetween: 0,
            effect: "fade",
            loop: true,
            speed: 800,
            allowTouchMove: false,
            fadeEffect: { crossFade: true },
          });

          const textSlider = new window.Swiper(".td-testimonial-text-slider", {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            speed: 800,
            navigation: {
              nextEl: ".td-testimonial-next",
              prevEl: ".td-testimonial-prev",
            },
          });

          // Sync sliders
          textSlider.on("slideChangeTransitionStart", () => {
            imageSlider.slideToLoop(textSlider.realIndex);
          });
          imageSlider.on("slideChangeTransitionStart", () => {
            textSlider.slideToLoop(imageSlider.realIndex);
          });
        }

        // Brand logo scrolling slider
        if (document.querySelector(".td-brand-slide-active")) {
          new window.Swiper(".td-brand-slide-active", {
            loop: true,
            freemode: true,
            slidesPerView: 'auto',
            centeredSlides: true,
            allowTouchMove: false,
            speed: 8000,
            autoplay: {
              delay: 1,
              disableOnInteraction: false,
            },
          });
        }

        // Hero text sliding marquee (creative studio)
        if (document.querySelector(".td-hero-text-slide-active")) {
          new window.Swiper(".td-hero-text-slide-active", {
            loop: true,
            freemode: true,
            slidesPerView: 'auto',
            spaceBetween: 30,
            centeredSlides: true,
            allowTouchMove: false,
            speed: 20000,
            autoplay: {
              delay: 1,
              disableOnInteraction: false,
            },
          });
        }
      }

      // 3. GSAP ScrollTrigger WOW.js replacement for ScrollSmoother compatibility
      if (window.gsap && window.ScrollTrigger) {
        const wowElements = document.querySelectorAll(".wow");
        wowElements.forEach((el) => {
          // Hide elements initially as WOW.js would
          el.style.visibility = "hidden";

          const delay = el.getAttribute("data-wow-delay") || "0s";
          const duration = el.getAttribute("data-wow-duration") || "1s";

          // Extract animation classes (fadeInUp, fadeInLeft, zoomIn, etc.)
          const animClasses = Array.from(el.classList).filter(
            (c) => c !== "wow" && c !== "animated"
          );

          window.ScrollTrigger.create({
            trigger: el,
            start: "top 95%", // triggers when 5% of element enters viewport
            onEnter: () => {
              el.style.visibility = "visible";
              el.style.animationDelay = delay;
              el.style.animationDuration = duration;
              el.classList.add("animated");
              animClasses.forEach((cls) => el.classList.add(cls));
            },
            once: true,
          });
        });
      }

      // 4. GSAP ScrollTrigger and ScrollSmoother re-creation
      if (window.ScrollSmoother && window.gsap) {
        const existing = window.ScrollSmoother.get();
        if (existing) {
          existing.kill();
        }
        if (document.getElementById("smooth-wrapper") && document.getElementById("smooth-content")) {
          window.ScrollSmoother.create({
            smooth: 1.35,
            effects: true,
            smoothTouch: 0.1,
            normalizeScroll: false,
            ignoreMobileResize: true,
          });
        }
      }
      if (window.ScrollTrigger) {
        window.ScrollTrigger.refresh();
      }

      // 5. Text Invert & Opacity Scroll Animation (SplitText + ScrollTrigger)
      if (window.SplitText && window.gsap && window.ScrollTrigger) {
        const targets = document.querySelectorAll(".td-text-invert, .td-text-opacity");
        if (targets.length > 0) {
          // Recreate split lines on mount
          const split = new window.SplitText(targets, { type: "lines" });
          split.lines.forEach((target) => {
            window.gsap.to(target, {
              backgroundPositionX: 0,
              ease: "none",
              scrollTrigger: {
                trigger: target,
                scrub: 1,
                start: "top 85%",
                end: "bottom center",
              },
            });
          });
        }
      }

      // 6. Title animation on scroll (SplitText + ScrollTrigger)
      if (window.SplitText && window.gsap && window.ScrollTrigger) {
        const titleAnimElements = window.gsap.utils.toArray(".td-title-anim");
        titleAnimElements.forEach((splitTextLine) => {
          const tl = window.gsap.timeline({
            scrollTrigger: {
              trigger: splitTextLine,
              start: "top 90%",
              end: "bottom 60%",
              scrub: false,
              markers: false,
              toggleActions: "play none none none",
            },
          });

          const itemSplitted = new window.SplitText(splitTextLine, { type: "words, lines" });
          window.gsap.set(splitTextLine, { perspective: 300 });
          itemSplitted.split({ type: "lines" });
          tl.from(itemSplitted.lines, {
            duration: 1,
            delay: 0.3,
            opacity: 0,
            rotationX: -50,
            force3D: true,
            transformOrigin: "top center -50",
            stagger: 0.2,
          });
        });
      }

      // 7. Service page stacked panel pinning (ScrollTrigger)
      if (window.gsap && window.ScrollTrigger) {
        const projectpanels = document.querySelectorAll(".td-service-pin-item-panel");
        if (projectpanels.length > 0) {
          const td = window.gsap.matchMedia();
          td.add("(min-width: 991px)", () => {
            const tdtl = window.gsap.timeline();
            projectpanels.forEach((section) => {
              tdtl.to(section, {
                scrollTrigger: {
                  trigger: section,
                  pin: section,
                  scrub: 1,
                  start: "top top",
                  end: "bottom 100%",
                  endTrigger: ".td-service-pin-items",
                  pinSpacing: false,
                  markers: false,
                },
              });
            });
          });
        }
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [location.pathname]);
}
