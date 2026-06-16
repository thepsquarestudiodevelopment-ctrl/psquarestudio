// Header functionality
document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const mobileToggle = document.getElementById("mobileToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const closeMenu = document.getElementById("closeMenu");
    const overlay = document.getElementById("overlay");

    // Check if elements exist before adding event listeners
    if (mobileToggle && mobileMenu && closeMenu && overlay) {
        mobileToggle.addEventListener("click", () => {
            mobileMenu.classList.add("active");
            overlay.classList.add("active");
            document.body.style.overflow = "hidden";
        });

        closeMenu.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            overlay.classList.remove("active");
            document.body.style.overflow = "";
        });

        overlay.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            overlay.classList.remove("active");
            document.body.style.overflow = "";
        });
    }

    // Header scroll effect
    window.addEventListener("scroll", () => {
        const header = document.querySelector(".header-area");
        if (header) {
            if (window.scrollY > 50) {
                header.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.12)";
                header.style.top = "10px";
            } else {
                header.style.boxShadow = "var(--shadow)";
                header.style.top = "20px";
            }
        }
    });

    // Close mobile menu when clicking on menu links
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove("active");
            overlay.classList.remove("active");
            document.body.style.overflow = "";
        });
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 992) {
            // Close mobile menu when switching to desktop view
            if (mobileMenu) {
                mobileMenu.classList.remove("active");
                overlay.classList.remove("active");
                document.body.style.overflow = "";
            }
        }
    });
});