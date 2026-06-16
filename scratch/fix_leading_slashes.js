import fs from "fs";
import path from "path";

const targetDir = "d:/files/freelancing/psquarestudio/psquarestudio/src";

function fixPathsInFile(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");
  
  // Replace src="assets/ with src="/assets/
  content = content.replace(/src="assets\//g, 'src="/assets/');
  
  // Replace data-background="assets/ with data-background="/assets/
  content = content.replace(/data-background="assets\//g, 'data-background="/assets/');

  // Replace src='assets/ with src='/assets/
  content = content.replace(/src='assets\//g, "src='/assets/");

  // Replace data-background='assets/ with data-background='/assets/
  content = content.replace(/data-background='assets\//g, "data-background='/assets/");

  // Replace href="assets/ with href="/assets/ (for things like PDF downloads or stylesheets if any)
  content = content.replace(/href="assets\//g, 'href="/assets/');

  fs.writeFileSync(filePath, content, "utf-8");
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith(".jsx") || file.endsWith(".js") || file.endsWith(".html")) {
      fixPathsInFile(fullPath);
    }
  });
}

console.log("Fixing asset paths in workspace...");
processDirectory(targetDir);
console.log("Finished fixing asset paths!");
