import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  // Restore scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Monitor scroll height to show/hide button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 245) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`scroll__top scroll-to-target ${visible ? "open" : ""}`}
      style={{ display: "block" }}
      aria-label="Scroll to top"
    >
      <i className="fa-sharp fa-regular fa-arrow-up"></i>
    </button>
  );
}
