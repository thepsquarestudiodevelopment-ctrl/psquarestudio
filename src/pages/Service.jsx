import React from "react";
import { Link } from "react-router-dom";
import usePageInit from "../hooks/usePageInit";

export default function Service() {
  usePageInit();

  return (
    <>
      {/* td-breadcrumb-area-start */}
          <div className="td-breadcrumb-area td-breadcrumb-spacing mb-75">
            <div className="container">
              <div className="row">
                <div className="col-lg-9">
                  <div className="td-breadcrumb-wrap">
                    <span
                      className="subtitle d-inline-block mb-15 wow fadeInLeft"
                      data-wow-delay=".4s"
                      data-wow-duration="1s"
                      >BEST SERVICE PROVIDE</span
                    >
                    <h2
                      className="td-section-page-title mb-35 wow fadeInLeft"
                      data-wow-delay=".7s"
                      data-wow-duration="1s"
                    >
                      Transforming Ideas <br />
                      Into <span>Impactful Visual & Digital Identities </span>
                    </h2>
                    <p
                      className="text wow fadeInLeft"
                      data-wow-delay=".9s"
                      data-wow-duration="1s"
                    >
                      We fuse innovation and craftsmanship to create powerful
                      brand experiences, standout visuals, and high-impact
                      digital marketing that lasts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* td-breadcrumb-area-end */}

          {/* td-service-main-area-start */}
          <div className="td-service-main-area pb-125">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="td-service-main-bigthumb fix td-rounded-10">
                    <img
                      data-speed=".9"
                      src="/assets/img/service/details/bg.jpg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-9">
                  <div
                    className="td-service-main-content text-center pt-140 mb-60 wow fadeInUp"
                    data-wow-delay=".5s"
                    data-wow-duration="1s"
                  >
                    <span className="mb-25 d-inline-block">// Who we are</span>
                    <h2>
                      We believe in the power of creativity shaped by precision,
                      where every color, frame, & motion has a purpose.
                    </h2>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <div
                    className="td-service-main-expreance mb-30 wow fadeInUp"
                    data-wow-delay=".4s"
                    data-wow-duration="1s"
                  >
                    <h2 className="expreance mb-0">03</h2>
                    <span className="year">YEARS OF WORK EXPERIENCE</span>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="td-service-main-strategy-wrap ml-50">
                    <div className="row">
                      <div
                        className="col-lg-6 col-md-6 wow fadeInUp"
                        data-wow-delay=".6s"
                        data-wow-duration="1s"
                      >
                        <div className="td-service-main-strategy mb-40">
                          <h3 className="title mb-20">Our Vision</h3>
                          <p className="text">
                            Our mission is to elevate brands with refined
                            design, artistic 3D visuals, & premium digital
                            marketing, each detail crafted with intention,
                            elegance, and lasting impact.
                          </p>
                        </div>
                      </div>
                      <div
                        className="col-lg-6 col-md-6 wow fadeInUp"
                        data-wow-delay=".8s"
                        data-wow-duration="1s"
                      >
                        <div className="td-service-main-strategy mb-40">
                          <h3 className="title mb-20">Our Strategy</h3>
                          <p className="text">
                            We combine brand strategy, creative design, 3D
                            visuals, CGI, motion graphics, and digital marketing
                            to deliver impactful, SEO-focused solutions that
                            elevate your brand.
                          </p>
                        </div>
                      </div>
                      <div
                        className="col-12 wow fadeInUp"
                        data-wow-delay=".9s"
                        data-wow-duration="1s"
                      >
                        <div className="td-service-main-strategy">
                          <p className="text">
                            We blend strategy, storytelling, and design
                            innovation to create work that captivates and
                            performs. From discovering your brand’s essence to
                            crafting precise visuals and bringing them to life
                            through motion, 3D, and CGI, Set Design & Digital
                            marketing with Social Media marketing, we deliver
                            polished, impactful results that elevate your brand.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* td-service-main-area-end */}

          {/* td-service-iteam-pin-area-start */}
          <div className="td-service-pin-item td-service-pin-items">
            <div className="container-fluid p-0">
              {/*01.  graphic design */}
              <div className="black-bg td-service-pin-item-panel">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="td-service-pin-thumb">
                      <img
                        className="w-100"
                        src="/assets/img/service/details/thumb-3.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div
                      className="td-service-pin-content-inner pt-40 pb-40 ml-100"
                    >
                      <div className="td-service-pin-subtitle mb-15">
                        <span className="number">01</span>
                        <span>Graphic Design</span>
                      </div>
                      <h2 className="td-service-pin-title mb-30">Graphic Design</h2>
                      <div className="td-service-pin-content ml-50">
                        <p className="mb-40">
                          We craft impactful visual designs tailored to your
                          <br />brand, budget, and audience. Bring your ideas to
                          life <br />with precision and creativity.
                        </p>
                        <ul>
                          <li>Logo Design</li>
                          <li>Brand Identity</li>
                          <li>Business Communication Design</li>
                          <li>Web Graphics & UI Design</li>
                          <li>Banner Design</li>
                          <li>Advertisement Ads</li>
                          <li>Magazine & Template Design, etc.</li>
                        </ul>
                        <div className="td-btn-group td-btn-group-border pt-50">
                          <Link className="td-btn-circle"
                            to="/service-details-graphicdesign"
                          >
                            <i className="fa-solid fa-arrow-right"></i>
                          </Link>
                          <Link className="td-btn-2 td-btn-primary"
                            to="/service-details-graphicdesign"
                            >VIEW DETAILS</Link>
                          <Link className="td-btn-circle"
                            to="/service-details-graphicdesign"
                          >
                            <i className="fa-solid fa-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 02. motion graphics */}
              <div className="black-bg td-service-pin-item-panel">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="td-service-pin-thumb">
                      <img
                        className="w-100"
                        src="/assets/img/service/details/thumb-4.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div
                      className="td-service-pin-content-inner pt-40 pb-40 ml-100"
                    >
                      <div className="td-service-pin-subtitle mb-15">
                        <span className="number">02</span>
                        <span> Motion Graphics</span>
                      </div>
                      <h2 className="td-service-pin-title mb-30">
                        Motion Graphics
                      </h2>
                      <div className="td-service-pin-content ml-50">
                        <p className="mb-40">
                          We create dynamic, engaging motion visuals <br />
                          that capture attention and communicate your
                          <br />brand story effectively.
                        </p>
                        <ul>
                          <li>Logo Animation</li>
                          <li>Explainer Videos</li>
                          <li>Social Media Motion Ads</li>
                          <li>Interactive Presentations</li>
                          <li>Animated Ads</li>
                          <li>Motion ads</li>
                        </ul>
                        <div className="td-btn-group td-btn-group-border pt-50">
                          <Link className="td-btn-circle"
                            to="/service-details-motion"
                          >
                            <i className="fa-solid fa-arrow-right"></i>
                          </Link>
                          <Link className="td-btn-2 td-btn-primary"
                            to="/service-details-motion"
                            >VIEW DETAILS</Link>
                          <Link className="td-btn-circle"
                            to="/service-details-motion"
                          >
                            <i className="fa-solid fa-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 03. video editing */}
              <div className="black-bg td-service-pin-item-panel">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="td-service-pin-thumb">
                      <img
                        className="w-100"
                        src="/assets/img/service/details/thumb-5.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div
                      className="td-service-pin-content-inner pt-40 pb-40 ml-100"
                    >
                      <div className="td-service-pin-subtitle mb-15">
                        <span className="number">03</span>
                        <span> Video Production</span>
                      </div>
                      <h2 className="td-service-pin-title mb-30">
                        Video Production
                      </h2>
                      <div className="td-service-pin-content ml-50">
                        <p className="mb-40">
                          Transform raw footage into professional,<br />
                          high-impact videos that engage and <br />
                          inspire your audience.
                        </p>
                        <ul>
                          <li>Corporate Videos</li>
                          <li>Social Media Content Videos</li>
                          <li>Promotional Videos</li>
                          <li>Post-Production & Effects Videos</li>
                          <li>Reel Making</li>
                        </ul>
                        <div className="td-btn-group td-btn-group-border pt-50">
                          <Link className="td-btn-circle"
                            to="/service-details-videoediting"
                          >
                            <i className="fa-solid fa-arrow-right"></i>
                          </Link>
                          <Link className="td-btn-2 td-btn-primary"
                            to="/service-details-videoediting"
                            >VIEW DETAILS</Link>
                          <Link className="td-btn-circle"
                            to="/service-details-videoediting"
                          >
                            <i className="fa-solid fa-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 04. 3d architecture */}
              <div className="black-bg td-service-pin-item-panel">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="td-service-pin-thumb">
                      <img
                        className="w-100"
                        src="/assets/img/service/details/thumb.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div
                      className="td-service-pin-content-inner pt-40 pb-40 ml-100"
                    >
                      <div className="td-service-pin-subtitle mb-15">
                        <span className="number">04</span>
                        <span> 3D Architecture</span>
                      </div>
                      <h2 className="td-service-pin-title mb-30">
                        3D Architecture
                      </h2>
                      <div className="td-service-pin-content ml-50">
                        <p className="mb-40">
                          Visualize spaces before they exist with<br />
                          photorealistic 3D architectural designs<br />
                          and walkthroughs.
                        </p>
                        <ul>
                          <li>3D Modeling & Rendering</li>
                          <li>Architectural Walkthroughs</li>
                          <li>Interior & Exterior Visualization</li>
                          <li>Conceptual Design Rendering</li>
                        </ul>
                        <div className="td-btn-group td-btn-group-border pt-50">
                          <Link className="td-btn-circle"
                            to="/service-details-3d"
                          >
                            <i className="fa-solid fa-arrow-right"></i>
                          </Link>
                          <Link className="td-btn-2 td-btn-primary"
                            to="/service-details-3d"
                            >VIEW DETAILS</Link>
                          <Link className="td-btn-circle"
                            to="/service-details-3d"
                          >
                            <i className="fa-solid fa-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 05. cgi */}
              <div className="black-bg td-service-pin-item-panel">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="td-service-pin-thumb">
                      <img
                        className="w-100"
                        src="/assets/img/service/details/thumb-2.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div
                      className="td-service-pin-content-inner pt-40 pb-40 ml-100"
                    >
                      <div className="td-service-pin-subtitle mb-15">
                        <span className="number">05</span>
                        <span> CGI (Computer-Generated Imagery)</span>
                      </div>
                      <h2 className="td-service-pin-title mb-30">CGI</h2>
                      <div className="td-service-pin-content ml-50">
                        <p className="mb-40">
                          Bring ideas to life with stunning CGI<br />
                          visuals for products, brands,<br />
                          and experiences.
                        </p>
                        <ul>
                          <li>Product Visualization</li>
                          <li>Advertising & Marketing CGI</li>
                          <li>3D Animations</li>
                          <li>Concept Art & Digital Prototyping</li>
                        </ul>
                        <div className="td-btn-group td-btn-group-border pt-50">
                          <Link className="td-btn-circle" to="/service">
                            <i className="fa-solid fa-arrow-right"></i>
                          </Link>
                          <Link className="td-btn-2 td-btn-primary"
                            to="/service-details-cgi"
                            >VIEW DETAILS</Link>
                          <Link className="td-btn-circle"
                            to="/service-details-cgi"
                          >
                            <i className="fa-solid fa-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 06. digital Marketing */}
              <div className="black-bg td-service-pin-item-panel">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="td-service-pin-thumb">
                      <img
                        className="w-100"
                        src="/assets/img/service/details/thumb-6.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div
                      className="td-service-pin-content-inner pt-40 pb-40 ml-100"
                    >
                      <div className="td-service-pin-subtitle mb-15">
                        <span className="number">06</span>
                        <span> Digital Marketing</span>
                      </div>
                      <h2 className="td-service-pin-title mb-30">
                        Digital Marketing
                      </h2>
                      <div className="td-service-pin-content ml-50">
                        <p className="mb-40">
                          In the digital era, visibility is everything,
                          <br />and we make sure your brand stands out <br />
                          where it matters most.
                        </p>
                        <div className="row">
                          <div className="col-md-6">
                            <ul>
                              <li>Google Ads & PPC Advertising</li>
                              <li>Search Engine Optimization (SEO)</li>
                              <li>Social Media Marketing & Management</li>
                              <li>Email Marketing</li>
                            </ul>
                          </div>
                          <div className="col-md-6">
                            <ul>
                              <li>Affiliate & Influencer Marketing</li>
                              <li>Content Marketing</li>
                              <li>Platform-Specific Marketing</li>
                              <li>Creative Marketing</li>
                            </ul>
                          </div>
                        </div>
                        <div className="td-btn-group td-btn-group-border pt-50">
                          <Link className="td-btn-circle"
                            to="/service-details-digitalmarketing"
                          >
                            <i className="fa-solid fa-arrow-right"></i>
                          </Link>
                          <Link className="td-btn-2 td-btn-primary"
                            to="/service-details-digitalmarketing"
                            >VIEW DETAILS</Link>
                          <Link className="td-btn-circle"
                            to="/service-details-digitalmarketing"
                          >
                            <i className="fa-solid fa-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 07. Set Design */}
              <div className="black-bg td-service-pin-item-panel">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="td-service-pin-thumb">
                      <img
                        className="w-100"
                        src="/assets/img/service/details/thumb-7.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div
                      className="td-service-pin-content-inner pt-40 pb-40 ml-100"
                    >
                      <div className="td-service-pin-subtitle mb-15">
                        <span className="number">07</span>
                        <span> Set Design</span>
                      </div>
                      <h2 className="td-service-pin-title mb-30">Set Design</h2>
                      <div className="td-service-pin-content ml-50">
                        <p className="mb-40">
                          Designing immersive cinematic spaces that deliver
                          powerful visual impact. A crafted blend of artistry,
                          production design, and precise storytelling.
                        </p>
                        <div className="row">
                          <div className="col-md-6">
                            <ul>
                              <li>Film & Ad Set Design</li>
                              <li>Photoshoot & Product Set Design</li>
                              <li>Event & Experience Set Design</li>
                              <li>Virtual & CGI Set Design</li>
                            </ul>
                          </div>
                        </div>
                        <div className="td-btn-group td-btn-group-border pt-50">
                          <Link className="td-btn-circle"
                            to="/service-details-setdesign"
                          >
                            <i className="fa-solid fa-arrow-right"></i>
                          </Link>
                          <Link className="td-btn-2 td-btn-primary"
                            to="/service-details-setdesign"
                            >VIEW DETAILS</Link>
                          <Link className="td-btn-circle"
                            to="/service-details-setdesign"
                          >
                            <i className="fa-solid fa-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* td-service-iteam-pin-area-end */}

          {/* td-brands-area-start */}
          <div className="td-brands-area pt-160 pb-160">
            <div className="container">
              <div className="brands-grid">
                <div className="brand-item">
                  <img src="/assets/img/brand/01-Aqua-Logo.webp" alt="" />
                </div>
                <div className="brand-item">
                  <img src="/assets/img/brand/02-Jacksun-Logo.webp" alt="" />
                </div>
                <div className="brand-item">
                  <img src="/assets/img/brand/05-Chroniclers.webp" alt="" />
                </div>
                <div className="brand-item">
                  <img src="/assets/img/brand/04-Comic-Box.webp" alt="" />
                </div>
                <div className="brand-item">
                  <img src="/assets/img/brand/08-Roast-Bean-logo.webp" alt="" />
                </div>

                <div className="brand-item">
                  <img src="/assets/img/brand/07-Sarthak-Media.webp" alt="" />
                </div>
                <div className="brand-item">
                  <img src="/assets/img/brand/06-Doshi-Alpha.webp" alt="" />
                </div>
                <div className="brand-item">
                  <img src="/assets/img/brand/10-Shiv-Music-Logo.webp" alt="" />
                </div>
                <div className="brand-item">
                  <img src="/assets/img/brand/03-Rudra-Logo.webp" alt="" />
                </div>

                <div className="brand-item">
                  <img src="/assets/img/brand/11-Summit-Logo.webp" alt="" />
                </div>
                <div className="brand-item">
                  <img
                    src="/assets/img/brand/10-10-2025 final logo test (1).png"
                    alt=""
                  />
                </div>
                <div className="brand-item">
                  <img
                    src="/assets/img/brand/09-Shreeji-Catrers-Logo.webp"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          {/* td-brands-area-end */}
    </>
  );
}
