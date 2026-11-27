import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("Lab Telemetry 24-Hour Latency Sampling table has accessible scroll and no text-wrapping issues", () => {
  const telemetryCode = fs.readFileSync("src/app/lab/telemetry/page.tsx", "utf8");
  
  // Accessible scroll container verification
  assert.ok(telemetryCode.includes('tabIndex={0}'), "Table container must have tabIndex={0} for keyboard scroll");
  assert.ok(telemetryCode.includes('role="region"'), "Table container must have role=region");
  assert.ok(telemetryCode.includes('aria-label="24-Hour Latency Sampling Table"'), "Table container must have descriptive aria-label");
  assert.ok(telemetryCode.includes('min-w-[460px]'), "Table must have min-width preventing cramped columns on 320px/375px");
  assert.ok(telemetryCode.includes('whitespace-nowrap'), "Cells and headers must have whitespace-nowrap to prevent awkward multi-line breaks");
  assert.ok(telemetryCode.includes('Pass &le; 50ms'), "SLA status pill must be explicitly rendered with threshold");
  assert.ok(telemetryCode.includes('Scroll table horizontally'), "Scroll affordance hint must be rendered for small mobile viewports");
});

test("Database Telemetry Aggregates provides genuine data rendering and truthful standby empty state", () => {
  const panelCode = fs.readFileSync("src/components/shared/DatabaseAggregatesPanel.tsx", "utf8");
  
  assert.ok(panelCode.includes("Database Telemetry Aggregates"));
  assert.ok(panelCode.includes("aggregates.length > 0"));
  assert.ok(panelCode.includes("Supabase Metric Storage Standby"), "Must display explicit, truthful standby state when data is unavailable");
  assert.ok(panelCode.includes("offline standby mode"), "Must truthfully state offline standby without inventing metrics");
  assert.ok(panelCode.includes("PhosphorDatabase"), "Must display database icon");
});

test("Contact page layout eliminates horizontal overflow on mobile viewports", () => {
  const contactCode = fs.readFileSync("src/app/contact/page.tsx", "utf8");
  const globalsCss = fs.readFileSync("src/app/globals.css", "utf8");
  
  // Verify globals.css does not mask layout bugs with overflow-x: hidden on html, body
  const bodyMatch = globalsCss.match(/html,\s*body\s*\{([^}]+)\}/);
  assert.ok(bodyMatch, "globals.css must define html, body");
  assert.ok(!bodyMatch[1].includes("overflow-x: hidden"), "html, body must NOT use overflow-x: hidden to conceal layout bugs");

  // Verify min-w-0 containment on contact page grid and cards
  assert.ok(contactCode.includes("min-w-0"), "Contact page components must specify min-w-0 to prevent flex/grid expansion");
  assert.ok(contactCode.includes("break-all"), "Email anchor must include break-all preventing horizontal overflow on 320px");
});

test("Copy action on Contact page reflows gracefully on small viewports with min 44px touch target", () => {
  const contactCode = fs.readFileSync("src/app/contact/page.tsx", "utf8");
  const copyBtnCode = fs.readFileSync("src/components/client/CopyEmailButton.tsx", "utf8");
  
  // Reflow structure on mobile
  assert.ok(contactCode.includes("flex-col sm:flex-row"), "Email row must stack vertically on mobile and horizontally on desktop");
  assert.ok(copyBtnCode.includes("min-h-[44px]"), "CopyEmailButton must meet 44px touch target requirement");
  assert.ok(copyBtnCode.includes("aria-label"), "CopyEmailButton must have accessible label with email target");
  assert.ok(copyBtnCode.includes("navigator.clipboard"), "CopyEmailButton must preserve working clipboard copy action");
});

test("CodeCanvas right-sizes interactive cards and module heights on mobile viewports", () => {
  const canvasCode = fs.readFileSync("src/components/client/CodeCanvas.tsx", "utf8");
  
  assert.ok(canvasCode.includes("gap-2 sm:gap-3"), "Layout container must use compact 8px gap on mobile");
  assert.ok(canvasCode.includes("p-2.5 sm:p-3.5"), "Module cards must use compact padding on mobile viewports");
  assert.ok(canvasCode.includes("text-xs sm:text-sm"), "Module labels must scale responsively to prevent excessive height");
});

test("Footer and shared sections maintain compact vertical mobile spacing", () => {
  const footerCode = fs.readFileSync("src/components/shared/Footer.tsx", "utf8");
  const servicesCode = fs.readFileSync("src/components/shared/ServicesSection.tsx", "utf8");
  const timelineCode = fs.readFileSync("src/components/shared/ExperienceTimeline.tsx", "utf8");
  
  assert.ok(footerCode.includes("py-5 sm:py-8"), "Footer must use compact 20px vertical padding on mobile");
  assert.ok(servicesCode.includes("p-3.5 sm:p-5"), "Competency cards must use compact padding on mobile");
  assert.ok(timelineCode.includes("space-y-4 sm:space-y-6"), "Timeline must use tightened spacing on mobile");
});
