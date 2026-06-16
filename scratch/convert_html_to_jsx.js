import fs from "fs";
import path from "path";

function getInternalRoute(href) {
  if (!href) return null;
  const cleanHref = href.split('#')[0].trim();
  
  const routes = {
    "index": "/",
    "index.html": "/",
    "about": "/about",
    "about.html": "/about",
    "portfolio": "/portfolio",
    "portfolio.html": "/portfolio",
    "service": "/service",
    "service.html": "/service",
    "contact": "/contact",
    "contact.html": "/contact",
    "worktogether": "/worktogether",
    "worktogether.html": "/worktogether",
    "service-details-3d": "/service-details-3d",
    "service-details-3d.html": "/service-details-3d",
    "service-details-cgi": "/service-details-cgi",
    "service-details-cgi.html": "/service-details-cgi",
    "service-details-digitalmarketing": "/service-details-digitalmarketing",
    "service-details-digitalmarketing.html": "/service-details-digitalmarketing",
    "service-details-graphicDesign": "/service-details-graphicdesign",
    "service-details-graphicDesign.html": "/service-details-graphicdesign",
    "service-details-motion": "/service-details-motion",
    "service-details-motion.html": "/service-details-motion",
    "service-details-setdesign": "/service-details-setdesign",
    "service-details-setdesign.html": "/service-details-setdesign",
    "service-details-videoEditing": "/service-details-videoediting",
    "service-details-videoEditing.html": "/service-details-videoediting"
  };
  
  return routes[cleanHref] || null;
}

function convertHtmlToJsx(htmlContent, componentName) {
  // Extract content inside <main>...</main>
  const mainRegex = /<main>([\s\S]*?)<\/main>/i;
  const match = htmlContent.match(mainRegex);
  if (!match) {
    throw new Error("Could not find <main> tag in HTML content");
  }
  let mainContent = match[1];

  // 1. Replace class with className
  mainContent = mainContent.replace(/class=/g, "className=");

  // 2. Fix unclosed img tags
  mainContent = mainContent.replace(/<img([^>]*?)(?<!\/)>/g, "<img$1 />");

  // 3. Fix unclosed br tags
  mainContent = mainContent.replace(/<br>/g, "<br />").replace(/<br\s*>/g, "<br />");

  // 4. Fix unclosed input tags
  mainContent = mainContent.replace(/<input([^>]*?)(?<!\/)>/g, "<input$1 />");

  // 5. Fix video/iframe/other self-closing or standard React attributes
  mainContent = mainContent.replace(/autoplay/g, "autoPlay");
  mainContent = mainContent.replace(/referrerpolicy=/g, "referrerPolicy=");
  mainContent = mainContent.replace(/allowfullscreen=/g, "allowFullScreen=");

  // 6. Fix style attributes
  mainContent = mainContent.replace(/style="([^"]*?)"/g, (match, styleStr) => {
    const reactStyle = styleStr
      .split(";")
      .filter((s) => s.trim())
      .map((s) => {
        const [key, val] = s.split(":");
        if (!key || !val) return null;
        const camelKey = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        return `"${camelKey}": "${val.trim()}"`;
      })
      .filter(Boolean)
      .join(", ");
    return `style={{ ${reactStyle} }}`;
  });

  // 7. Robust Link replacement (handles multi-line anchor tags and closing tags correctly)
  let usesLink = false;
  
  // This regex matches <a ... href="X" ...> ... </a> (where </a> can be split across lines)
  const anchorRegex = /<a\s+([^>]*?\bhref=["']([^"']+)["'][^>]*?)>([\s\S]*?)<\/a\s*>/gi;
  mainContent = mainContent.replace(anchorRegex, (match, attributes, hrefValue, content) => {
    const internalRoute = getInternalRoute(hrefValue);
    if (internalRoute) {
      usesLink = true;
      const newAttributes = attributes.replace(/\bhref=["']([^"']+)["']/, `to="${internalRoute}"`);
      return `<Link ${newAttributes}>${content}</Link>`;
    }
    return match;
  });

  // 8. Fix iframes: convert <iframe>...</iframe> to <iframe ... />
  // Correct the specific malformed iframe syntax error from the HTML template if present
  mainContent = mainContent.replace(
    /<iframe[\s\S]*?Ranip,\+Ahmedabad,\+Gujarat[\s\S]*?<\/iframe\s*>/i,
    `<iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31078.361591144112!2d72.572174!3d23.080135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449:0x4fcedd5a38d52982!2sRanip,+Ahmedabad,+Gujarat!5e0!3m2!1sen!2sin!4v1729385804688!5m2!1sen!2sin"
      width="600"
      height="450"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />`
  );

  const iframeRegex = /<iframe\s+([\s\S]*?)>\s*<\/iframe>/gi;
  mainContent = mainContent.replace(iframeRegex, "<iframe $1 />");

  // 9. Replace comments
  mainContent = mainContent.replace(/<!--/g, "{/*").replace(/-->/g, "*/}");

  // Generate full react component file
  return `import React from "react";
${usesLink ? 'import { Link } from "react-router-dom";' : ""}
import usePageInit from "../hooks/usePageInit";

export default function ${componentName}() {
  usePageInit();

  return (
    <>
      ${mainContent.trim()}
    </>
  );
}
`;
}

// Convert all files
const sourceDir = "d:/files/freelancing/psquarestudio/psquarestudio/html-backup";
const targetDir = "d:/files/freelancing/psquarestudio/psquarestudio/src/pages";

const filesToConvert = [
  { file: "index.html", comp: "Home" },
  { file: "about.html", comp: "About" },
  { file: "service.html", comp: "Service" },
  { file: "portfolio.html", comp: "Portfolio" },
  { file: "contact.html", comp: "Contact" },
  { file: "service-details-3d.html", comp: "ServiceDetails3d" },
  { file: "service-details-cgi.html", comp: "ServiceDetailsCgi" },
  { file: "service-details-digitalmarketing.html", comp: "ServiceDetailsDigitalMarketing" },
  { file: "service-details-graphicDesign.html", comp: "ServiceDetailsGraphicDesign" },
  { file: "service-details-motion.html", comp: "ServiceDetailsMotion" },
  { file: "service-details-setdesign.html", comp: "ServiceDetailsSetDesign" },
  { file: "service-details-videoEditing.html", comp: "ServiceDetailsVideoEditing" }
];

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

filesToConvert.forEach(({ file, comp }) => {
  const filePath = path.join(sourceDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`Converting ${file} -> ${comp}.jsx`);
    const html = fs.readFileSync(filePath, "utf-8");
    try {
      const jsx = convertHtmlToJsx(html, comp);
      fs.writeFileSync(path.join(targetDir, `${comp}.jsx`), jsx, "utf-8");
    } catch (err) {
      console.error(`Error converting ${file}:`, err);
    }
  } else {
    console.warn(`File not found: ${filePath}`);
  }
});
