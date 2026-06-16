import React, { useEffect, useRef, useState } from "react";

export default function MouseFollower() {
  const outlineRef = useRef(null);
  const dotRef = useRef(null);
  const [classes, setClasses] = useState("");

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (outlineRef.current) {
        outlineRef.current.animate(
          [
            {
              opacity: 1,
              left: `${e.clientX}px`,
              top: `${e.clientY}px`,
              easing: "ease-in-out",
            },
          ],
          {
            duration: 3000,
            fill: "forwards",
          }
        );
      }
      if (dotRef.current) {
        dotRef.current.animate(
          [
            {
              opacity: 1,
              left: `${e.clientX}px`,
              top: `${e.clientY}px`,
              easing: "ease-in-out",
            },
          ],
          {
            duration: 1500,
            fill: "forwards",
          }
        );
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      // Check for links and buttons
      if (target.closest("a, button, .cta-button")) {
        setClasses("hide-cursor");
      }
      // Check for headings
      else if (target.closest("h1, h2, h3, h4, .display-one, .display-two, .display-three, .display-four, .display-five, .display-six")) {
        setClasses("highlight-cursor-head");
      }
      // Check for paragraphs
      else if (target.closest("p")) {
        setClasses("highlight-cursor-para");
      } else {
        setClasses("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div className={`mouse-follower ${classes}`}>
      <span ref={outlineRef} className="cursor-outline"></span>
      <span ref={dotRef} className="cursor-dot"></span>
    </div>
  );
}
