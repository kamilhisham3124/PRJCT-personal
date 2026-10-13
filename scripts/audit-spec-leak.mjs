import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === "node_modules" || file === ".git" || file === ".next") continue;
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

console.log("[GUARD] Running Specification Content Leak Audit...");

// Guard 1: Verify no specification markdown or .context files exist in public or root
const publicDir = path.join(rootDir, "public");
if (fs.existsSync(publicDir)) {
  const publicFiles = walk(publicDir);
  const leakedPublic = publicFiles.filter(
    (f) => f.endsWith(".md") || f.includes(".context") || path.basename(f).startsWith("DOC-")
  );
  if (leakedPublic.length > 0) {
    console.error("[GUARD ERROR] Leaked specification files detected in public/:", leakedPublic);
    process.exit(1);
  }
}

// Guard 2: Verify no user-facing UI code references specification documents or internal IDs
const srcFiles = walk(path.join(rootDir, "src"));
const bannedPatterns = [
  /DOC-\d{2}/i,
  /RT-0[1-8]/,
  /RLS-0[1-9]/,
  /\.context/i,
];

let violationCount = 0;
for (const file of srcFiles) {
  if (!/\.(tsx|ts|jsx|js|json)$/.test(file)) continue;
  // Ignore comments in accessors if any
  const content = fs.readFileSync(file, "utf8");
  const lines = content.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Check non-comment lines
    const trimmed = line.trim();
    if (trimmed.startsWith("//") || trimmed.startsWith("/*") || trimmed.startsWith("*")) continue;
    for (const pattern of bannedPatterns) {
      if (pattern.test(line)) {
        console.error(`[GUARD ERROR] Specification leak pattern ${pattern} found in ${file}:${i + 1}`);
        console.error(`  > ${line.trim()}`);
        violationCount++;
      }
    }
  }
}

if (violationCount > 0) {
  console.error(`[GUARD FATAL] ${violationCount} specification leak violation(s) found. Aborting build.`);
  process.exit(1);
}

console.log("[GUARD PASS] Zero specification leaks detected in application source code.");
process.exit(0);
