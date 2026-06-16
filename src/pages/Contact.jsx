import React from "react";

import usePageInit from "../hooks/usePageInit";

export default function Contact() {
  usePageInit();

  return (
    <>
      {/* td-breadcrumb-area-start */}
          <div className="td-breadcrumb-area td-breadcrumb-spacing mb-100">
            <div className="container">
              <div className="row">
                <div className="col-xxl-9">
                  <div className="td-breadcrumb-wrap">
                    <span
                      className="subtitle d-inline-block mb-10 wow fadeInUp"
                      data-wow-delay=".5s"
                      data-wow-duration="1s"
                    ></span>
                    <h2
                      className="td-section-page-title wow fadeInUp"
                      data-wow-delay=".7s"
                      data-wow-duration="1s"
                    >
                      Let’s Build Bold Brands <br />
                      <span>Together!</span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* td-breadcrumb-area-end */}

          {/* td-contact-map-area-start */}
          <div className="td-contact-map-area">
            <div className="container-fluid p-0 justify-content-center">
              <div className="row">
                <div className="col-12">
                  <div className="td-contact-map p-relative">
                    <div className="td-contact-map-wrap">
                      <img
                        className="mb-0"
                        src="/assets/img/logo/Asset1.png"
                        alt=""
                      />
                      <h6 className="mb-25">Contact info:</h6>
                      <a href="tel:+919898709490">+91 98987 09490</a>
                      <a
                        className="mb-10"
                        href="mailto:thepsquarestudio25@gmail.com"
                        >thepsquarestudio25@gmail.com</a
                      >
                      <a href="#">Ranip — Ahmedabad, Gujarat</a>
                    </div>
                    <div className="td-contact-map-inner">
                      <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31078.361591144112!2d72.572174!3d23.080135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449:0x4fcedd5a38d52982!2sRanip,+Ahmedabad,+Gujarat!5e0!3m2!1sen!2sin!4v1729385804688!5m2!1sen!2sin"
      width="600"
      height="450"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* td-contact-map-area-end */}

          {/* td-contact-main-area */}
          <div className="td-contact-main pt-155 pb-120">
            <div className="container">
              <div className="row">
                <div className="col-lg-5">
                  <div
                    className="td-contact-title-wrap mb-30 wow fadeInLeft"
                    data-wow-delay=".5s"
                    data-wow-duration="1s"
                  >
                    <h2 className="td-contact-main-title">
                      Our team is always ready<span> to help you!</span>
                    </h2>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div
                    className="td-contact-form-box mb-30 wow fadeInRight"
                    data-wow-delay=".5s"
                    data-wow-duration="1s"
                    style={{ "borderColor": "blue", "borderWidth": "10px" }}
                  >
                    <form
                      id="contact-form"
                      action="https://api.web3forms.com/submit"
                      method="POST"
                    >
                      <input
                        type="hidden"
                        name="access_key"
                        value="cbffa4af-de76-497e-9d3b-20a07a039271"
                      />
                      <input
                        type="hidden"
                        name="subject"
                        value="New Contact Form Submission from PSQUARE"
                      />
                      <input
                        type="hidden"
                        name="redirect"
                        value="https://yourdomain.com/thank-you.html"
                      />

                      <div className="row">
                        <div className="col-12 mb-25">
                          <label for="name">Name</label>
                          <input
                            className="td-input"
                            name="name"
                            id="name"
                            type="text"
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-25">
                          <label for="email">Email</label>
                          <input
                            className="td-input"
                            name="email"
                            id="email"
                            type="email"
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-25">
                          <label for="phone">Phone</label>
                          <input
                            className="td-input"
                            name="phone"
                            id="phone"
                            type="text"
                            required
                          />
                        </div>
                        <div className="col-12 mb-25">
                          <label for="website">Website</label>
                          <input
                            className="td-input"
                            name="website"
                            id="website"
                            type="text"
                          />
                        </div>
                        <div className="col-md-12 mb-30">
                          <label for="message">Message</label>
                          <textarea
                            className="td-input message"
                            name="message"
                            id="message"
                            cols="30"
                            rows="10"
                            required
                          ></textarea>
                        </div>
                        <div className="col-12">
                          <button type="submit" className="td-btn-group">
                            <span className="td-btn-circle"
                              ><i className="fa-solid fa-arrow-right"></i
                            ></span>
                            <span className="td-btn-2 td-btn-primary"
                              >Send message</span
                            >
                            <span className="td-btn-circle"
                              ><i className="fa-solid fa-arrow-right"></i
                            ></span>
                          </button>
                          <p className="ajax-response pt-20"></p>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* td-contact-main-emd */}
    </>
  );
}
