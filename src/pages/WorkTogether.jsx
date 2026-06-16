import React from "react";
import { Link } from "react-router-dom";
import usePageInit from "../hooks/usePageInit";

export default function WorkTogether() {
  usePageInit();

  return (
    <>
      <style>{`
        @media only screen and (min-width: 576px) and (max-width: 767px),
          (max-width: 575px) {
          .td-contact-2-wrap {
            padding-top: 0;
          }
        }
        .td-contact-2-wrap .td-contact-7-text-btn a span {
          background: var(--td-theme-secondary);
        }
        .td-contact-2-wrap .td-contact-7-slide-text {
          font-family: var(--td-ff-dm-sans);
          text-transform: uppercase;
        }
        .td-contact-2-wrap .td-contact-7-slide-text.yellows {
          color: var(--td-theme-secondary);
        }
        .td-contact-7-slide-text {
          font-family: var(--td-ff-body);
          font-weight: 700;
          font-size: 280px;
          text-transform: uppercase;
          color: var(--td-common-black-5);
        }
        @media only screen and (min-width: 768px) and (max-width: 991px) {
          .td-contact-7-slide-text {
            font-size: 180px;
          }
        }
        @media only screen and (min-width: 576px) and (max-width: 767px),
          (max-width: 575px) {
          .td-contact-7-slide-text {
            font-size: 120px;
          }
        }
        .td-contact-7-slide-text.yellows {
          color: var(--td-theme-4);
        }
        .td-contact-7-text-slider .swiper-slide {
          width: auto !important;
        }
        .td-contact-7-text-btn {
          margin-bottom: -150px;
        }
        @media only screen and (min-width: 576px) and (max-width: 767px),
          (max-width: 575px) {
          .td-contact-7-text-btn {
            margin-bottom: 0;
          }
        }
        .td-contact-7-text-btn a {
          border-radius: 100%;
          background: var(--td-common-white);
          box-shadow: 4px 0 40px 0 rgba(139, 139, 139, 0.35);
          width: 200px;
          height: 200px;
          display: inline-block;
          text-align: center;
          line-height: 200px;
          position: relative;
          z-index: 2;
        }
        .td-contact-7-text-btn a span {
          width: 80px;
          height: 80px;
          display: inline-block;
          text-align: center;
          line-height: 80px;
          background: var(--td-common-black-5);
          border-radius: 100px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 0;
          right: 0;
          margin: 0 auto;
        }
        /* Continuous Scroll Section */
        .slider {
          overflow: hidden;
          position: relative;
          white-space: nowrap;
        }
        .slider-track {
          display: flex;
          width: fit-content;
          animation: scroll 15s linear infinite;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .slide-item {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          margin-right: 60px;
        }
      `}</style>

      <div className="td-contact-area td-contact-2-wrap pt-85 fix pb-50">
        <div className="td-contact-7-text-slider text-center">
          <div className="td-contact-7-text-btn pt-30">
            <Link to="/contact">
              <img
                className="td-live-anim-spin"
                src="/assets/img/contact/text.svg"
                alt=""
              />
              <span className="icon">
                <svg
                  width="29"
                  height="30"
                  viewBox="0 0 29 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.07031 22.0708L21.2124 7.92867"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21.2124 22.0713V7.9292H7.07031"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </div>

          {/* Continuous Scroll Section */}
          <div className="slider">
            <div className="slider-track">
              <div className="slide-item">
                <h2 className="td-contact-7-slide-text">WORK</h2>
              </div>
              <div className="slide-item">
                <h2 className="td-contact-7-slide-text yellows">TOGETHER</h2>
              </div>
              <div className="slide-item">
                <h2 className="td-contact-7-slide-text">WORK</h2>
              </div>
              <div className="slide-item">
                <h2 className="td-contact-7-slide-text yellows">TOGETHER</h2>
              </div>
              <div className="slide-item">
                <h2 className="td-contact-7-slide-text">WORK</h2>
              </div>
              <div className="slide-item">
                <h2 className="td-contact-7-slide-text yellows">TOGETHER</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
