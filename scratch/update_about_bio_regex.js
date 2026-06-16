import fs from "fs";

const filePath = "d:/files/freelancing/psquarestudio/psquarestudio/src/pages/About.jsx";
let content = fs.readFileSync(filePath, "utf-8");

// Normalize line endings to LF
content = content.replace(/\r\n/g, "\n");

// Regex to match from `{/* td-team-area-start */}` to `{/* td-team-area-end */}`
const bioSectionRegex = /\{\/\*\s*td-team-area-start\s*\*\/\}[\s\S]*?\{\/\*\s*td-team-area-end\s*\/\}/;

const newBioSection = `{/* td-team-area-start */}
          <div
            className="td-team-area td-team-about-wrap td-about-main-feature-area"
          >
            <style>{\`
              .td-team-about-wrap {
                background-color: #fafbfc;
                background-image: radial-gradient(#d3d6dc 1.5px, transparent 1.5px);
                background-size: 24px 24px;
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
            \`}</style>
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
          {/* td-team-area-end */}`;

if (bioSectionRegex.test(content)) {
  content = content.replace(bioSectionRegex, newBioSection);
  fs.writeFileSync(filePath, content, "utf-8");
  console.log("About.jsx bio section successfully updated via regex!");
} else {
  console.error("Could not find team bio section comment tags in About.jsx!");
}
