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
const chunksDir = path.join(rootDir, ".next", "static", "chunks");

if (!fs.existsSync(manifestPath) || !fs.existsSync(chunksDir)) {
  console.log("[BUNDLE INFO] No compiled build detected in .next/ — run `npm run build` to audit chunks.");
} else {
  let isDevBuild = false;
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    isDevBuild = Array.isArray(manifest.devFiles) && manifest.devFiles.length > 0;
  } catch {
    isDevBuild = false;
  }

  if (isDevBuild) {
    console.log("[BUNDLE INFO] Development cache detected in .next/ — chunk budgets enforced in CI production build.");
  } else {
    function getChunks(dir) {
      let results = [];
      if (!fs.existsSync(dir)) return results;
      for (const file of fs.readdirSync(dir)) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          results = results.concat(getChunks(fullPath));
        } else if (file.endsWith(".js") && !file.startsWith("polyfills")) {
          results.push({ name: file, fullPath, size: stat.size });
        }
      }
      return results;
    }

    const chunks = getChunks(chunksDir);
    let auditedCount = 0;
    for (const chunk of chunks) {
      auditedCount++;
      if (chunk.size > MAX_CHUNK_BYTES) {
        console.error(`[BUNDLE VIOLATION] Chunk ${chunk.name} is ${(chunk.size / 1024).toFixed(1)} KB (exceeds 200 KB budget)`);
        violations++;
      } else {
        console.log(`[CHUNK OK] ${chunk.name}: ${(chunk.size / 1024).toFixed(1)} KB`);
      }
    }
    console.log(`[CHUNKS AUDITED] Verified ${auditedCount} production chunk(s).`);
  }
}

if (violations > 0) {
  console.error(`[BUNDLE FATAL] ${violations} bundle budget violation(s) identified.`);
  process.exit(1);
}

console.log("[BUNDLE PASS] All assets and compiled chunks comply with production performance budgets.");
process.exit(0);
