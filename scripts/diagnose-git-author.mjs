import { execSync } from "node:child_process";
import path from "node:path";
import fs from "node:fs";

function run(cmd, cwd) {
  try {
    return execSync(cmd, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
  } catch {
    return null;
  }
}

function getGhUser() {
  const raw = run("gh api user", process.cwd());
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

const ghUser = getGhUser();
const expectedNoreply = ghUser?.id && ghUser?.login
  ? `${ghUser.id}+${ghUser.login}@users.noreply.github.com`
  : null;

function diagnoseRepo(repoDir) {
  const repoName = path.basename(repoDir);
  console.log(`\n>>> REPOSITORY: [${repoName}]`);
  console.log(`    Path: ${repoDir}`);

  // 1. Config scopes
  const localName = run("git config --local user.name", repoDir);
  const localEmail = run("git config --local user.email", repoDir);
  const globalName = run("git config --global user.name", repoDir);
  const globalEmail = run("git config --global user.email", repoDir);
  const activeEmail = localEmail || globalEmail;

  console.log(`    - Config Author:  ${localName || globalName || "(unset)"} <${activeEmail || "unset"}>`);
  console.log(`    - Scope Origin:   ${localEmail ? "Local Repo Override" : "Inherited from Global"}`);

  // 2. Branch & Remote
  const currentBranch = run("git branch --show-current", repoDir) || "HEAD detached";
  const remoteUrl = run("git remote get-url origin", repoDir) || "(no remote)";
  const isEligibleBranch = ["main", "master", "gh-pages"].includes(currentBranch);

  console.log(`    - Active Branch:  ${currentBranch} ${isEligibleBranch ? "[PASS]" : "[WARN: PR merge required]"}`);
  console.log(`    - Remote:         ${remoteUrl}`);

  // 3. Commit Audit
  const commitLogs = run('git log -n 2 --format="%h|%an|%ae|%aI"', repoDir);
  if (commitLogs) {
    const lines = commitLogs.split("\n").filter(Boolean);
    for (const line of lines) {
      const [h, an, ae, dateIso] = line.split("|");
      const d = new Date(dateIso);
      console.log(`    * Commit [${h}]: ${an} <${ae}>`);
      console.log(`      UTC Day: ${d.toISOString().slice(0, 10)} (Raw: ${dateIso})`);
    }
  }

  // 4. Attribution Risk Assessment
  if (!activeEmail) {
    console.log("    [ASSESSMENT] CRITICAL: No author email configured! Commits will be unlinked.");
  } else if (expectedNoreply && activeEmail === expectedNoreply) {
    console.log("    [ASSESSMENT] EXCELLENT: Using official GitHub privacy noreply address.");
  } else {
    console.log(`    [ASSESSMENT] VALID: Using standard address <${activeEmail}>.`);
    if (expectedNoreply) {
      console.log(`    [SUGGESTION] To hide public email: git config user.email "${expectedNoreply}"`);
    }
  }
}

// Main execution
console.log("=======================================================");
console.log("     GIT AUTHOR & ATTRIBUTION DIAGNOSTIC ENGINE        ");
console.log("=======================================================");

if (ghUser) {
  console.log(`[AUTHENTICATED GITHUB USER] ${ghUser.login} (ID: ${ghUser.id})`);
  console.log(`[ASSIGNED NOREPLY EMAIL]   ${expectedNoreply}`);
} else {
  console.log("[GITHUB CLI STATUS] Not authenticated via gh CLI. Proceeding with Git introspection.");
}

const inputPath = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();

if (fs.existsSync(path.join(inputPath, ".git"))) {
  diagnoseRepo(inputPath);
} else {
  // Check subdirectories
  const entries = fs.readdirSync(inputPath, { withFileTypes: true });
  const gitDirs = entries
    .filter(e => e.isDirectory() && fs.existsSync(path.join(inputPath, e.name, ".git")))
    .map(e => path.join(inputPath, e.name));

  if (gitDirs.length === 0) {
    console.error(`\n[ERROR] No Git repositories found in: ${inputPath}\n`);
    process.exit(1);
  }
  console.log(`\nDiscovered ${gitDirs.length} Git repository/repositories under ${inputPath}:`);
  gitDirs.forEach(diagnoseRepo);
}

console.log("\n=======================================================\n");
