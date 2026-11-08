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

console.log("[SECURITY GATE] Scanning repository for leaked credentials and hardcoded secrets...");

// Check 1: No committed secret env files
const envFiles = [".env", ".env.local", ".env.production", ".env.development"];
for (const env of envFiles) {
  if (fs.existsSync(path.join(rootDir, env))) {
    console.error(`[SECURITY VIOLATION] Committed secret environment file found: ${env}`);
    process.exit(1);
  }
}

// Check 2: Pattern scan across text files
const SECRET_PATTERNS = [
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /AKIA[0-9A-Z]{16}/,
  /ghp_[a-zA-Z0-9]{36}/,
  /github_pat_[a-zA-Z0-9_]{82}/,
  /xox[baprs]-[0-9a-zA-Z]{10,48}/,
  /postgres:\/\/[^:]+:[^@]+@/,
];

const scannedFiles = walk(rootDir).filter((f) => {
  const ext = path.extname(f);
  return [".ts", ".tsx", ".js", ".mjs", ".json", ".yml", ".yaml", ".md"].includes(ext);
});

let violations = 0;
for (const file of scannedFiles) {
  const content = fs.readFileSync(file, "utf8");
  for (const pattern of SECRET_PATTERNS) {
    if (pattern.test(content)) {
      console.error(`[SECURITY VIOLATION] Pattern ${pattern} matched in ${path.relative(rootDir, file)}`);
      violations++;
    }
  }
}

if (violations > 0) {
  console.error(`[SECURITY FATAL] ${violations} secret leak violation(s) identified. Halting CI.`);
  process.exit(1);
}

console.log(`[SECURITY PASS] Scanned ${scannedFiles.length} files. Zero hardcoded secrets detected.`);
process.exit(0);
