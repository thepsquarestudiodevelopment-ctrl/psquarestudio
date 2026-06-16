import React from "react";
import { Link } from "react-router-dom";
import usePageInit from "../hooks/usePageInit";

export default function About() {
  usePageInit();

  return (
    <>
      {/* td-about-area-start */}
          <div className="td-about-area td-about-main-spacing pb-140">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="td-about-main-wrapper pb-90">
                    <h2 className="td-section-page-title td-title-anim text-center">
                      Crafting harmony between <br />creativity & precision.
                      just like
                      <br />
                      <span>The Geometry of A Square.</span>
                    </h2>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div
                    className="td-about-main-thumb mb-40 fix td-rounded-10 wow fadeInLeft"
                    data-wow-delay=".5s"
                    data-wow-duration="1s"
                  >
                    <img
                      data-speed=".9"
                      className="w-100 td-rounded-10"
                      src="/assets/img/about/main/thumb.jpg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-lg-7">
                  <div
                    className="td-about-main-content ml-110 mb-40 wow fadeInRight"
                    data-wow-delay=".5s"
                    data-wow-duration="1s"
                  >
                    <h3 className="td-about-main-title mb-20">
                      We don’t just design, we define the shape of creativity.
                    </h3>
                    <div className="row">
                      <div className="col-lg-5 col-md-5">
                        <div className="td-about-main-bigtext">
                          <h2>3</h2>
                          <span>Years of experience</span>
                        </div>
                      </div>
                      <div className="col-lg-7 col-md-9">
                        <div className="td-about-main-text mt-30">
                          <p className="mb-30">
                            At The P Square Studio, <br />
                            we believe creativity and precision unite in perfect
                            balance. We are a full-service branding & marketing
                            agency dedicated to helping businesses build
                            powerful & memorable brand identities.
                          </p>
                          <div className="td-btn-group">
                            <Link className="td-btn-circle" to="/contact">
                              <i className="fa-solid fa-arrow-right"></i>
                            </Link>
                            <Link className="td-btn-2 td-btn-primary"
                              to="/contact"
                              >EXPLORE MORE</Link>
                            <Link className="td-btn-circle" to="/contact">
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
          </div>
          {/* td-about-area-end */}

          {/* td-testimonial-area-start */}
          <div className="td-testimonial-area grey-bg-2 pt-155 pb-120">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-4">
                  <div className="td-testimonial-left mb-40 wow fadeInLeft">
                    <span className="td-section-subtitle mb-185 d-inline-block"
                      >CLIENTS FEEDBACK</span
                    >

                    {/* Updated User Image Section */}
                    <div className="user-images-stack mb-20">
                      <img
                        className="user-avatar"
                        src="/assets/img/testimonial/testimonial1.jpg"
                        alt="Client 1"
                      />
                      <img
                        className="user-avatar"
                        src="/assets/img/testimonial/testimonial2.jpg"
                        alt="Client 2"
                      />
                      <img
                        className="user-avatar"
                        src="/assets/img/testimonial/testimonial3.jpg"
                        alt="Client 3"
                      />
                      <img
                        className="user-avatar"
                        src="/assets/img/testimonial/testimonial4.jpg"
                        alt="Client 4"
                      />
                      <span className="more-users">+</span>
                    </div>

                    <p>More than 50+ clients all<br />over the world</p>
                  </div>
                </div>

                <div className="col-lg-9 col-md-8">
                  <div
                    className="td-testimonial-content ml-80 mb-50 wow fadeInRight"
                  >
                    <h2 className="td-testimonial-title mb-65 td-text-invert">
                      What Our Clients<br /><span>Say About Us</span>
                    </h2>

                    <div className="row align-items-center">
                      {/* Image Slider */}
                      <div className="col-lg-4">
                        <div className="swiper td-testimonial-image-slider mb-40">
                          <div className="swiper-wrapper">
                            <div className="swiper-slide">
                              <img
                                className="w-100 td-rounded-10"
                                src="/assets/img/testimonial/testimonial1.jpg"
                                alt=""
                              />
                            </div>
                            <div className="swiper-slide">
                              <img
                                className="w-100 td-rounded-10"
                                src="/assets/img/testimonial/testimonial2.jpg"
                                alt=""
                              />
                            </div>
                            <div className="swiper-slide">
                              <img
                                className="w-100 td-rounded-10"
                                src="/assets/img/testimonial/testimonial3.jpg"
                                alt=""
                              />
                            </div>
                            <div className="swiper-slide">
                              <img
                                className="w-100 td-rounded-10"
                                src="/assets/img/testimonial/testimonial4.jpg"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Text Slider */}
                      <div className="col-lg-8">
                        <div
                          className="swiper td-testimonial-text-slider ml-25 mb-40"
                        >
                          <div className="swiper-wrapper">
                            <div className="swiper-slide">
                              <div className="td-testimonial-slide-content">
                                <p className="mb-40">
                                  The P Square Studio completely transformed our
                                  real estate visualizations. Their CGI renders
                                  were so realistic that our clients often
                                  thought they were actual photographs! The
                                  team's attention to detail, lighting, and
                                  texture made every project stand out.
                                </p>
                                <h6>Rudra Construction</h6>
                                <span
                                  >Neel Faldu, Director, Rudra
                                  Construction</span
                                >
                              </div>
                            </div>
                            <div className="swiper-slide">
                              <div className="td-testimonial-slide-content">
                                <p className="mb-40">
                                  Partnering with The P Square Studio has been
                                  one of our most creative collaborations. Their
                                  expertise in branding, CGI, and visual design
                                  perfectly complements our digital marketing
                                  strategies. Together, we've delivered
                                  campaigns that not only look exceptional but
                                  also perform brilliantly. The P Square
                                  Studio's professionalism, innovation, and eye
                                  for detail make them an invaluable creative
                                  partner.
                                </p>
                                <h6>Sarthak Media (Digital Partner)</h6>
                                <span
                                  >Smit Vachhani, Founder of Sarthak Media</span
                                >
                              </div>
                            </div>
                            <div className="swiper-slide">
                              <div className="td-testimonial-slide-content">
                                <p className="mb-40">
                                  The P Square Studio gave our catering business
                                  a professional edge through strategic visuals
                                  and clean hoarding designs. Their advertising
                                  concept was simple yet powerful — it connected
                                  instantly with our target audience
                                </p>
                                <h6>Corporate Catering Company</h6>
                                <span
                                  >Pooja Patel, Owner, Shreeji Caterers</span
                                >
                              </div>
                            </div>
                            <div className="swiper-slide">
                              <div className="td-testimonial-slide-content">
                                <p className="mb-40">
                                  The P Square Studio captured our Hotel Summit
                                  with perfection! Their videography team
                                  understood the mood, ambience, and energy of
                                  the event beautifully. The final highlight
                                  video was cinematic and truly showcased our
                                  brand's elegance. We received amazing feedback
                                  from all participants.
                                </p>
                                <h6>Summit Hotel</h6>
                                <span>Husain Mohamed, Owner, Summit Hotel</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Navigation */}
                        <div className="td-testimonial-navigation mb-30">
                          <span className="td-testimonial-prev d-inline-block">
                            <svg
                              width="31"
                              height="24"
                              viewBox="0 0 31 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M30.8699 12.2679L0.014612 12.4214"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-miterlimit="10"
                              />
                              <path
                                d="M11.5445 0C11.5445 6.63283 6.38111 12 2.56383e-05 12"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-miterlimit="10"
                              />
                              <path
                                d="M4.08971e-05 12C6.38112 12 11.5446 17.3671 11.5446 24"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-miterlimit="10"
                              />
                            </svg>
                          </span>
                          <span
                            className="td-testimonial-next ml-15 d-inline-block"
                          >
                            <svg
                              width="31"
                              height="24"
                              viewBox="0 0 31 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M-0.000234102 12.2679L30.855 12.4214"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-miterlimit="10"
                              />
                              <path
                                d="M19.3251 0C19.3251 6.63283 24.4886 12 30.8696 12"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-miterlimit="10"
                              />
                              <path
                                d="M30.8696 12C24.4885 12 19.3251 17.3671 19.3251 24"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-miterlimit="10"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Brand Slider */}
                <div className="col-12">
                  <div className="td-brand-wrap">
                    <div className="swiper td-brand-slide-active">
                      <div className="swiper-wrapper slide-transtion">
                        <div className="swiper-slide">
                          <img
                            src="/assets/img/brand/01-Aqua-Logo.webp"
                            alt=""
                          />
                        </div>
                        <div className="swiper-slide">
                          <img
                            src="/assets/img/brand/02-Jacksun-Logo.webp"
                            alt=""
                          />
                        </div>
                        <div className="swiper-slide">
                          <img
                            src="/assets/img/brand/03-Rudra-Logo.webp"
                            alt=""
                          />
                        </div>
                        <div className="swiper-slide">
                          <img
                            src="/assets/img/brand/04-Comic-Box.webp"
                            alt=""
                          />
                        </div>
                        <div className="swiper-slide">
                          <img
                            src="/assets/img/brand/05-Chroniclers.webp"
                            alt=""
                          />
                        </div>
                        <div className="swiper-slide">
                          <img
                            src="/assets/img/brand/06-Doshi-Alpha.webp"
                            alt=""
                          />
                        </div>
                        <div className="swiper-slide">
                          <img
                            src="/assets/img/brand/07-Sarthak-Media.webp"
                            alt=""
                          />
                        </div>
                        <div className="swiper-slide">
                          <img
                            src="/assets/img/brand/08-Roast-Bean-logo.webp"
                            alt=""
                          />
                        </div>
                        <div className="swiper-slide">
                          <img
                            src="/assets/img/brand/09-Shreeji-Catrers-Logo.webp"
                            alt=""
                          />
                        </div>
                        <div className="swiper-slide">
                          <img
                            src="/assets/img/brand/10-Shiv-Music-Logo.webp"
                            alt=""
                          />
                        </div>
                        <div className="swiper-slide">
                          <img
                            src="/assets/img/brand/11-Summit-Logo.webp"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* td-testimonial-area-end */}

          {/* td-about-main-feature-area-start */}
          <div className="td-about-main-feature-area pt-150 pb-165">
            <div className="container">
              <div className="row">
                <div className="col-xl-9">
                  <div className="td-about-main-feature-wrap">
                    <h2
                      className="td-about-main-feature-title mb-70 td-text-invert"
                    >
                      At The P Square Studio, we blend art, strategy, and
                      innovation to craft inspiring designs. Our work reflects
                      modern elegance and timeless brand identities that
                      connect and captivate.
                    </h2>
                    <div className="row">
                      <div className="col-lg-5 d-none d-md-block">
                        <div
                          className="td-about-main-feature-shape text-center ml-70 mb-40"
                        >
                          <img src="/assets/img/about/main/shape.png" alt="" />
                        </div>
                      </div>
                      <div className="col-lg-7">
                        <div className="td-about-main-feature-list">
                          <ul>
                            <li>Logo Design</li>
                            <li>Print Media Design</li>
                            <li>Social Media & Festival Post</li>
                            <li>Advertisement Ads</li>
                            <li>Ads Video Shoot & Editing</li>
                            <li>Motion Graphics Ads</li>
                            <li>3D Architecture</li>
                            <li>CGI Ads</li>
                            <li>3D Set Design</li>
                            <li>Digital Marketing</li>
                            <li>Social Media Marketing</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* td-about-main-feature-area-end */}

          {/* td-team-area-start */}
          <div
            className="td-team-area td-team-about-wrap td-about-main-feature-area"
          >
            <style>{`
              .td-team-about-wrap {
                background: transparent;
                padding-top: 100px;
                padding-bottom: 100px;
              }
              .td-team-4-wrap {
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
                border: 4px solid #fff;
              }
              .td-team-4-thumb img {
                border-radius: 16px;
                display: block;
              }
              .td-team-bio-wrap {
                background: rgba(255, 255, 255, 0.9);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.8);
                border-radius: 24px;
                padding: 45px 50px;
                box-shadow: 0 15px 35px rgba(0, 0, 0, 0.04);
                opacity: 1 !important;
                transform: none !important;
              }
              .td-team-bio-title {
                font-family: inherit;
                font-weight: 700;
                font-size: 38px;
                color: #0b2f8f;
                position: relative;
                display: inline-block;
                padding-bottom: 15px;
                margin-bottom: 30px;
              }
              .td-team-bio-title::after {
                content: "";
                position: absolute;
                left: 0;
                bottom: 0;
                width: 75px;
                height: 4px;
                background: #ff7c43;
                border-radius: 2px;
              }
              .td-team-bio-text {
                font-size: 17px;
                line-height: 1.8;
                color: #4a4a4a;
              }
              .td-team-bio-text strong {
                color: #0b2f8f;
                font-weight: 700;
              }
            `}</style>
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-3 col-md-4 mb-30">
                  <div className="td-team-4-wrap p-relative">
                    <div className="td-team-4-thumb">
                      <img
                        className="w-100"
                        src="/assets/img/team/thumb.jpg"
                        alt="Payal Patel - Graphic Designer"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-lg-9 col-md-8 mb-30">
                  <div className="td-team-bio-wrap">
                    <div className="td-team-bio-content">
                      <h3 className="td-team-bio-title">
                        About Our Creative Director
                      </h3>
                      <p className="td-team-bio-text mb-20">
                        I'm <strong>Payal Patel</strong>, a creative Graphic Designer with <strong>5+ years of experience</strong> delivering impactful branding, visual design, and digital marketing solutions. I specialize in logo design, social media graphics, print media, and advertising campaigns that engage audiences and elevate brand identity.
                      </p>
                      <p className="td-team-bio-text mb-0">
                        I create high-quality, results-driven designs. With expertise in typography, color theory, and layout design, I specialize in creating innovative visuals that help brands differentiate themselves in competitive markets.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* td-team-area-end */}
    </>
  );
}
