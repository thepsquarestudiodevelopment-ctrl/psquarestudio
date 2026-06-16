import React, { useEffect, useState } from "react";

export default function Preloader() {
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Wait for initial load
    const timer1 = setTimeout(() => {
      setLoaded(true);
    }, 600);

    const timer2 = setTimeout(() => {
      setVisible(false);
    }, 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!visible) return null;

  return (
    <div id="preloader" className={`preloader ${loaded ? "loaded" : ""}`}>
      <div className="animation-preloader">
        <div className="spinner"></div>
        <div className="txt-loading">
          <span data-text-preloader="" className="letters-loading"> P </span>
          <span data-text-preloader="" className="letters-loading"> S </span>
          <span data-text-preloader="" className="letters-loading"> Q </span>
          <span data-text-preloader="" className="letters-loading"> U </span>
          <span data-text-preloader="" className="letters-loading"> A </span>
          <span data-text-preloader="" className="letters-loading"> R </span>
          <span data-text-preloader="" className="letters-loading"> E </span>
        </div>
        <p className="text-center">Loading</p>
      </div>
      <div className="loader">
        <div className="row">
          <div className="col-3 loader-section section-left">
            <div className="bg"></div>
          </div>
          <div className="col-3 loader-section section-left">
            <div className="bg"></div>
          </div>
          <div className="col-3 loader-section section-right">
            <div className="bg"></div>
          </div>
          <div className="col-3 loader-section section-right">
            <div className="bg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
