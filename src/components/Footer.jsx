import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <br />
      <br />
      <div className="td-footer-area td-footer-2-wrap">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-30">
              <div className="td-footer-3-widget">
                <h2 className="td-footer-2-bigtitle">
                  Entrust design<br />
                  to professionals
                </h2>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 mb-30">
              <div className="td-footer-3-widget">
                <h4 className="td-footer-3-title mb-15">India</h4>
                <a className="links mb-40 d-inline-block" href="#">
                  Ranip —<br />
                  Ahmedabad, Gujarat
                </a>

                <div className="td-footer-3-social">
                  <a href="http://www.facebook.com/PSQUAERE?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href="https://www.linkedin.com/company/the-psquare-studio/?viewAsMember=true" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                  <a href="https://www.instagram.com/thepsquarestudio/" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                  <a href="https://api.whatsapp.com/send/?phone=%2B919898709490&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-whatsapp"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 mb-30">
              <div className="td-footer-3-widget">
                <h4 className="td-footer-3-title mb-15">Say hello!</h4>
                <a className="links links-3 d-block mb-5" href="mailto:thepsquarestudio25@gmail.com">
                  thepsquarestudio25@gmail.com
                </a>
                <a className="links-2" href="tel:+919898709490">
                  +91 98987 09490
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="td-footer-2-border mt-60">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <div className="td-footer-3-menu mb-10">
                  <ul>
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
                      <Link to="/contact">Contact</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="td-footer-3-copyright text-lg-end mb-10">
                  <p>
                    © 2025 <a href="#">PSQUARE.</a> All Rights Reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
