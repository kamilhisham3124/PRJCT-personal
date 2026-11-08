import http from "node:http";

const BASE_URL = process.env.APP_URL || "http://127.0.0.1:3000";

const ROUTES = [
  { path: "/", expectedStatus: 200, contains: "Kamil Hisham" },
  { path: "/work", expectedStatus: 200, contains: "Case Studies" },
  { path: "/work/employee-task-management", expectedStatus: 200, contains: "Task Management" },
  { path: "/work/gift-delivery-ecommerce", expectedStatus: 200, contains: "E-Commerce" },
  { path: "/about", expectedStatus: 200, contains: "Kamil Hisham" },
  { path: "/contact", expectedStatus: 200, contains: "Contact" },
  { path: "/lab", expectedStatus: 200, contains: "Engineering Lab" },
  { path: "/lab/canvas", expectedStatus: 200 },
  { path: "/lab/telemetry", expectedStatus: 200 },
  { path: "/resume.pdf", expectedStatus: 200 },
  { path: "/images/avatar.jpg", expectedStatus: 200 },
  { path: "/images/case-study-task-management.jpg", expectedStatus: 200 },
  { path: "/images/case-study-ecommerce.jpg", expectedStatus: 200 },
  { path: "/images/lab-canvas.jpg", expectedStatus: 200 },
  { path: "/images/lab-telemetry.jpg", expectedStatus: 200 },
  { path: "/route-that-does-not-exist-test-404", expectedStatus: 404 },
];

function fetchRoute(route) {
  return new Promise((resolve, reject) => {
    const url = new URL(route.path, BASE_URL);
    const req = http.get(url, (res) => {
      let body = "";
      res.on("data", (chunk) => { body += chunk; });
      res.on("end", () => {
        resolve({
          status: res.statusCode || 0,
          headers: res.headers,
          body,
        });
      });
    });
    req.on("error", (err) => reject(err));
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error(`Timeout fetching ${route.path}`));
    });
  });
}

console.log(`[SMOKE TEST] Initiating automated route health probe on ${BASE_URL}...`);

let passed = 0;
let failed = 0;

for (const route of ROUTES) {
  try {
    const res = await fetchRoute(route);
    const statusMatch = res.status === route.expectedStatus;
    const bodyMatch = !route.contains || res.body.includes(route.contains);

    if (statusMatch && bodyMatch) {
      console.log(`[PASS] ${route.path} -> HTTP ${res.status}`);
      passed++;
    } else {
      console.error(
        `[FAIL] ${route.path} -> Expected ${route.expectedStatus}, got ${res.status}` +
        (route.contains && !bodyMatch ? ` (Missing content: "${route.contains}")` : "")
      );
      failed++;
    }
  } catch (err) {
    console.error(`[FAIL] ${route.path} -> Error: ${err.message}`);
    failed++;
  }
}

console.log(`[SMOKE SUMMARY] Total: ${ROUTES.length} | Passed: ${passed} | Failed: ${failed}`);

if (failed > 0) {
  process.exit(1);
}

process.exit(0);
