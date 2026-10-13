import fs from "node:fs";
import path from "node:path";

const srcDir = path.join(process.cwd(), "src");

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

console.log("[CI GATE] Auditing component and module line-count limits (ceiling: 150 lines per CC-02 / NFR-009)...");

const files = walk(srcDir).filter((f) => /\.(tsx|ts|jsx|js|css)$/.test(f));
let overLimitCount = 0;

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  const lineCount = content.split("\n").length;
  if (lineCount > 150) {
    console.error(`[CI GATE VIOLATION] ${file} has ${lineCount} lines (exceeds 150 line ceiling).`);
    overLimitCount++;
  }
}

if (overLimitCount > 0) {
  console.error(`[CI GATE FATAL] ${overLimitCount} file(s) exceed the 150-line budget. Build blocked.`);
  process.exit(1);
}

console.log(`[CI GATE PASS] All ${files.length} source files comply with the 150-line ceiling.`);
process.exit(0);
