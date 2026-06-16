import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    document.body.style.overflow = "";
  }, [location]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = "";
  };

  const headerStyle = {
    boxShadow: scrolled ? "0 6px 20px rgba(0, 0, 0, 0.12)" : "var(--shadow)",
    top: scrolled ? "10px" : "20px",
    transition: "all 0.3s ease",
  };

  return (
    <header className="header-area" style={headerStyle}>
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <img src="/assets/img/logo/Asset1.png" alt="Company Logo" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav>
          <ul className="nav-menu">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">Who We Are</Link>
            </li>
            <li>
              <Link to="/portfolio">Portfolio</Link>
            </li>
            <li>
              <Link to="/service">Services</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/contact">
                <button className="cta-button">Get Started</button>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-toggle"
          id="mobileToggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle Navigation Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`}
        id="mobileMenu"
      >
        <button
          className="close-menu"
          id="closeMenu"
          onClick={closeMobileMenu}
        >
          ×
        </button>
        <ul>
          <li>
            <Link to="/" onClick={closeMobileMenu}>Home</Link>
          </li>
          <li>
            <Link to="/about" onClick={closeMobileMenu}>Who We Are</Link>
          </li>
          <li>
            <Link to="/portfolio" onClick={closeMobileMenu}>Portfolio</Link>
          </li>
          <li>
            <Link to="/service" onClick={closeMobileMenu}>Services</Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeMobileMenu}>Contact Us</Link>
          </li>
        </ul>
        <Link to="/contact" onClick={closeMobileMenu}>
          <button className="cta-button">Get Started</button>
        </Link>
      </div>

      {/* Overlay */}
      <div
        className={`overlay ${mobileMenuOpen ? "active" : ""}`}
        id="overlay"
        onClick={closeMobileMenu}
      ></div>
    </header>
  );
}
