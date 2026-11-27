import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("TechIcons and PlatformIcons define authentic SVG icons with aria-hidden", () => {
  const techIconsContent = fs.readFileSync("src/components/icons/TechIcons.tsx", "utf8");
  const platformIconsContent = fs.readFileSync("src/components/icons/PlatformIcons.tsx", "utf8");

  const requiredTechIcons = [
    "TechPythonIcon",
    "TechDjangoIcon",
    "TechNextjsIcon",
    "TechTypeScriptIcon",
    "TechJavaScriptIcon",
    "TechHtmlIcon",
    "TechCssIcon",
  ];

  const requiredPlatformIcons = [
    "TechPostgresIcon",
    "TechSqliteIcon",
    "TechDockerIcon",
    "TechRedisIcon",
    "TechSupabaseIcon",
    "TechGitIcon",
    "TechPostmanIcon",
    "TechVercelIcon",
    "TechMysqlIcon",
  ];

  for (const iconName of requiredTechIcons) {
    assert.ok(techIconsContent.includes(`function ${iconName}`), `Missing ${iconName}`);
  }
  for (const iconName of requiredPlatformIcons) {
    assert.ok(platformIconsContent.includes(`function ${iconName}`), `Missing ${iconName}`);
  }

  assert.ok(techIconsContent.includes('aria-hidden="true"'));
  assert.ok(platformIconsContent.includes('aria-hidden="true"'));
  assert.ok(techIconsContent.includes('viewBox="0 0 24 24"'));
  assert.ok(platformIconsContent.includes('viewBox="0 0 24 24"'));
});

test("All production skills in resume.json have icon resolver rules", () => {
  const techIconsCode = fs.readFileSync("src/lib/utils/techIcons.ts", "utf8");
  const resume = JSON.parse(fs.readFileSync("src/content/resume.json", "utf8"));

  assert.ok(resume.skills.length >= 8);
  assert.ok(techIconsCode.includes("python"));
  assert.ok(techIconsCode.includes("django"));
  assert.ok(techIconsCode.includes("postgres"));
  assert.ok(techIconsCode.includes("sqlite"));
  assert.ok(techIconsCode.includes("git"));
  assert.ok(techIconsCode.includes("postman"));
  assert.ok(techIconsCode.includes("PhosphorStack"), "Fallback icon must be PhosphorStack");
});

test("All case study technologies have icon mappings", () => {
  const techIconsCode = fs.readFileSync("src/lib/utils/techIcons.ts", "utf8");
  const taskMgmt = JSON.parse(fs.readFileSync("src/content/case-studies/employee-task-management.json", "utf8"));
  const giftDelivery = JSON.parse(fs.readFileSync("src/content/case-studies/gift-delivery-ecommerce.json", "utf8"));

  const allTechs = [...taskMgmt.tech_stack, ...giftDelivery.tech_stack];
  for (const tech of allTechs) {
    const key = tech.toLowerCase().split(" ")[0];
    assert.ok(
      techIconsCode.toLowerCase().includes(key),
      `Tech "${tech}" should have a mapping rule in techIcons.ts`
    );
  }
});

test("Core Technologies in SocialProofBar have dedicated authentic icons", () => {
  const techIconsCode = fs.readFileSync("src/lib/utils/techIcons.ts", "utf8");
  const coreTechs = [
    "Python",
    "Django REST",
    "PostgreSQL",
    "Next.js 15",
    "TypeScript",
    "Docker",
    "Redis",
    "Supabase",
  ];

  for (const tech of coreTechs) {
    const key = tech.toLowerCase().split(" ")[0].replace(".js", "");
    assert.ok(
      techIconsCode.toLowerCase().includes(key),
      `Core tech "${tech}" must have dedicated icon resolver`
    );
  }
});

test("DESIGN.md documents design system icon and symbol specifications", () => {
  assert.ok(fs.existsSync("DESIGN.md"), "DESIGN.md must exist in repository root");
  const doc = fs.readFileSync("DESIGN.md", "utf8");
  assert.ok(doc.includes("Icon Architecture & Principles"));
  assert.ok(doc.includes("Color Tokens & Contrast"));
  assert.ok(doc.includes("Sizing, Spacing & Layout Matrix"));
  assert.ok(doc.includes("Accessibility & Assistive Technology Rules"));
});
