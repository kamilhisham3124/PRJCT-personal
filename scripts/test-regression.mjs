import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("Lab Telemetry 24-Hour Latency Sampling surfaces mobile cards and accessible desktop table", () => {
  const samplesCode = fs.readFileSync("src/components/shared/TelemetrySamplesPanel.tsx", "utf8");
  const telemetryDisplayCode = fs.readFileSync("src/components/shared/TelemetryDisplay.tsx", "utf8");

  // Desktop accessible table + Mobile stacked cards (all 4 columns visible < 768px)
  assert.ok(samplesCode.includes('tabIndex={0}'), "Table container must have tabIndex={0} for keyboard scroll");
  assert.ok(samplesCode.includes('role="region"'), "Table container must have role=region");
  assert.ok(samplesCode.includes('aria-label="24-Hour Latency Sampling Table"'), "Table container must have descriptive aria-label");
  assert.ok(samplesCode.includes('md:hidden flex flex-col'), "Mobile samples must render stacked cards below md without horizontal clipping");
  assert.ok(samplesCode.includes('Bundle Gzip'), "Bundle Gzip must be rendered cleanly");
  assert.ok(samplesCode.includes('Pass &le; 50ms'), "SLA status pill must be explicitly rendered with threshold");
  assert.ok(!telemetryDisplayCode.includes("Live Edge Telemetry"), "Telemetry card must not imply a live feed");
  assert.ok(!telemetryDisplayCode.includes("animate-ping"), "Telemetry card must not use a pulsing live indicator");
  assert.ok(telemetryDisplayCode.includes("Simulated telemetry based on Vercel deployment benchmarks"), "Disclosure must remain present");
});

test("Database Telemetry Aggregates separates standby metadata and states standby mode truthfully", () => {
  const panelCode = fs.readFileSync("src/components/shared/DatabaseAggregatesPanel.tsx", "utf8");

  assert.ok(panelCode.includes("Database Telemetry Aggregates"));
  assert.ok(panelCode.includes("aggregates.length > 0"));
  assert.ok(panelCode.includes("Supabase Metric Storage Standby"), "Must display explicit, truthful standby state when data is unavailable");
  assert.ok(panelCode.includes("offline standby mode"), "Must truthfully state offline standby without inventing metrics");
  assert.ok(panelCode.includes("flex flex-col gap-1.5"), "Standby metadata rows must stack cleanly with spacing gap");
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
  assert.ok(footerCode.includes("MAIN_NAV_ITEMS"), "Footer must reuse shared MAIN_NAV_ITEMS contract");
  assert.ok(footerCode.includes("whitespace-nowrap"), "Footer brand, links, badge, and copyright must prevent mid-label wrapping");
  assert.ok(footerCode.includes("grid-cols-3"), "Footer mobile navigation must use balanced 3-column grid to eliminate orphaned Quick Reference link");
  assert.ok(servicesCode.includes('variant="plain"') && servicesCode.includes("gap-3 sm:gap-5"), "Competencies must use compressed plain prose layout without card boxes");
  assert.ok(timelineCode.includes("space-y-4 sm:space-y-6"), "Timeline must use tightened spacing on mobile");
});

test("Work catalog gates pagination, restores List View fidelity, and pins Home CTAs", () => {
  const catalogCode = fs.readFileSync("src/components/client/ProjectCatalog.tsx", "utf8");
  const listCardCode = fs.readFileSync("src/components/client/ProjectListCard.tsx", "utf8");
  const homeCode = fs.readFileSync("src/app/page.tsx", "utf8");

  assert.ok(catalogCode.includes("pageCount > 1"), "Pagination chrome must be gated behind pageCount > 1");
  assert.ok(!catalogCode.includes("Showing {filtered.length} of"), "Ambiguous unfiltered count phrasing must be replaced");
  assert.ok(listCardCode.includes("Verified") && listCardCode.includes("View Case Study"), "List View must preserve Verified badge and Case Study CTA");
  assert.ok(listCardCode.includes("whitespace-nowrap") && listCardCode.includes("line-clamp-2"), "List View date and description must prevent mid-date wrapping and clip");
  assert.ok(homeCode.includes("mt-auto flex items-center justify-between"), "Home project card footer must pin CTA cleanly across breakpoints");
});

test("Static prose sections use plain variant without altering KEY METRICS or telemetry cards", () => {
  const servicesCode = fs.readFileSync("src/components/shared/ServicesSection.tsx", "utf8");
  const endorsementsCode = fs.readFileSync("src/components/shared/EndorsementsSection.tsx", "utf8");
  const writingCode = fs.readFileSync("src/components/shared/WritingSection.tsx", "utf8");
  const canvasCode = fs.readFileSync("src/app/lab/canvas/page.tsx", "utf8");
  const metricsCode = fs.readFileSync("src/components/shared/MetricsCard.tsx", "utf8");

  for (const code of [servicesCode, endorsementsCode, writingCode, canvasCode]) {
    assert.ok(!code.includes("linkhunt-card"), "Static prose sections must not wrap content in bordered linkhunt-card");
    assert.ok(code.includes('variant="plain"'), "Static prose sections must use SurfaceCard plain variant");
  }
  assert.ok(metricsCode.includes("linkhunt-card"), "KEY METRICS card must remain a bordered linkhunt-card");
});

test("Accessibility copy avoids unverified 100% claims and bottom nav preserves consistent full/concise labels", async () => {
  const aboutStatsCode = fs.readFileSync("src/components/shared/AboutStats.tsx", "utf8");
  const footerCode = fs.readFileSync("src/components/shared/Footer.tsx", "utf8");
  const substrateCode = fs.readFileSync("src/components/shared/SubstrateCard.tsx", "utf8");
  const aboutPageCode = fs.readFileSync("src/app/about/page.tsx", "utf8");
  const bottomNavCode = fs.readFileSync("src/components/shared/ProjectBottomNav.tsx", "utf8");
  const { getShortProjectLabel } = await import("../src/lib/utils/caseStudyMeta.ts");

  assert.ok(!aboutStatsCode.includes('"100%"'), "About KPI card must not claim 100% WCAG conformance");
  assert.ok(aboutStatsCode.includes("Targeting WCAG 2.2 AA"), "About KPI card must use honest target framing");
  assert.ok(footerCode.includes("WCAG 2.2 AA target") && substrateCode.includes("WCAG 2.2 AA target"), "Footer and sidebar badges must match target framing");
  assert.ok(aboutPageCode.includes("WCAG 2.2 AA is a design target."), "About page must include methodology note");
  assert.ok(!bottomNavCode.includes("truncate") && !bottomNavCode.includes("max-w-[140px]"), "Bottom nav must not mid-word truncate project titles");
  assert.ok(bottomNavCode.includes("All Case Studies") && !bottomNavCode.includes("prevProject ?"), "Bottom nav must always render All Case Studies");
  assert.equal(getShortProjectLabel("Employee Task Management System"), "Employee Task");
  assert.equal(getShortProjectLabel("Gift Delivery Ecommerce System"), "Gift Delivery");
});

test("Central date formatter normalizes all visible dates deterministically in UTC", async () => {
  const {
    formatMonthYear,
    formatDayMonthYear,
    formatCommitDate,
    formatDateRange,
    formatAbsoluteTimestamp,
  } = await import("../src/lib/utils/formatDate.ts");

  assert.equal(formatMonthYear("2025-05-01"), "May 2025");
  assert.equal(formatMonthYear("2026-02-15"), "Feb 2026");
  assert.equal(formatMonthYear("2025-09"), "Sep 2025");
  assert.equal(formatDayMonthYear("2025-05-08T14:32:10Z"), "08 May 2025");
  assert.equal(formatCommitDate("2026-02-12T10:14:22Z"), "12 Feb 2026");
  assert.equal(formatDateRange("2025-10-01", null), "Oct 2025 \u2013 Present");
  assert.equal(formatDateRange("2023-06-01", "2023-08-31"), "Jun 2023 \u2013 Aug 2023");
  assert.equal(formatAbsoluteTimestamp("2026-02-12T00:05:00Z"), "12 Feb 2026, 00:05 UTC");
  assert.equal(formatMonthYear("08/05/2025"), "08/05/2025");

  const dbPanelCode = fs.readFileSync("src/components/shared/DatabaseAggregatesPanel.tsx", "utf8");
  const credCode = fs.readFileSync("src/components/shared/CredentialCard.tsx", "utf8");
  assert.ok(!dbPanelCode.includes("toLocaleTimeString"), "DatabaseAggregatesPanel must use shared UTC timestamp formatter");
  assert.ok(!credCode.includes("toLocaleDateString"), "CredentialCard must use shared UTC date formatter");
});
