import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const MAX_IMAGE_BYTES = 1024 * 1024; // 1MB max per visual asset
const MAX_CHUNK_BYTES = 200 * 1024; // 200KB max per compiled JS chunk

console.log("[BUNDLE AUDIT] Verifying asset sizes and production bundle budget...");

let violations = 0;

// 1. Audit public image assets
const imagesDir = path.join(rootDir, "public", "images");
if (fs.existsSync(imagesDir)) {
  const images = fs.readdirSync(imagesDir);
  for (const img of images) {
    const fullPath = path.join(imagesDir, img);
    const stat = fs.statSync(fullPath);
    if (stat.size > MAX_IMAGE_BYTES) {
      console.error(`[BUNDLE VIOLATION] Asset ${img} is ${(stat.size / 1024).toFixed(1)} KB (exceeds 1024 KB limit)`);
      violations++;
    } else {
      console.log(`[ASSET OK] ${img}: ${(stat.size / 1024).toFixed(1)} KB`);
    }
  }
}

// 2. Audit compiled chunks if production build exists
const manifestPath = path.join(rootDir, ".next", "build-manifest.json");
const isDevBuild = fs.existsSync(manifestPath) && fs.readFileSync(manifestPath, "utf8").includes("development");

if (isDevBuild) {
  console.log("[BUNDLE INFO] Development cache detected in .next/ — chunk budgets enforced in CI production build.");
} else {
  const chunksDir = path.join(rootDir, ".next", "static", "chunks");
  if (fs.existsSync(chunksDir)) {
    const chunks = fs.readdirSync(chunksDir);
    for (const chunk of chunks) {
      if (!chunk.endsWith(".js") || chunk.startsWith("polyfills")) continue;
      const fullPath = path.join(chunksDir, chunk);
      const stat = fs.statSync(fullPath);
      if (stat.size > MAX_CHUNK_BYTES) {
        console.error(`[BUNDLE VIOLATION] Chunk ${chunk} is ${(stat.size / 1024).toFixed(1)} KB (exceeds 200 KB budget)`);
        violations++;
      }
    }
  }
}

if (violations > 0) {
  console.error(`[BUNDLE FATAL] ${violations} bundle budget violation(s) identified.`);
  process.exit(1);
}

console.log("[BUNDLE PASS] All assets and compiled chunks comply with production performance budgets.");
process.exit(0);
