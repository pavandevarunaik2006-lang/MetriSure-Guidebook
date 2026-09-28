const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const BASE_URL = "https://metri-sure.vercel.app";
const API_URL = "https://metrisure-production.up.railway.app";
const SCREENSHOTS_DIR = path.join(__dirname, "public", "screenshots");

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function run() {
  console.log("Fetching auth token from Railway backend...");
  let authData = null;
  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "technician@metrisure.demo", password: "demo123" })
    });
    authData = await res.json();
    console.log("Token obtained successfully for user:", authData.user.full_name);
  } catch (err) {
    console.warn("Could not fetch token directly, will use UI login:", err);
  }

  console.log("Launching Edge browser...");
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--window-size=1920,1080",
      "--disable-web-security"
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });

  // 1. Login Page
  console.log("1. Capturing Login Page...");
  await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "01_login.png") });

  // Inject authentication into localStorage
  if (authData && authData.access_token) {
    console.log("Injecting auth token into localStorage...");
    await page.evaluate((auth) => {
      localStorage.setItem('metrisure_token', auth.access_token);
      localStorage.setItem('metrisure_user', JSON.stringify(auth.user));
    }, authData);
  } else {
    // Click demo button
    const buttons = await page.$$('button');
    for (const b of buttons) {
      const text = await page.evaluate(el => el.textContent, b);
      if (text && text.includes('Priya Sharma')) {
        await b.click();
        break;
      }
    }
  }

  // 2. Dashboard
  console.log("2. Capturing Dashboard...");
  await page.goto(`${BASE_URL}/dashboard`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "02_dashboard.png") });

  // 3. Instruments Page
  console.log("3. Capturing Instruments Page...");
  await page.goto(`${BASE_URL}/instruments`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "03_instruments.png") });

  // 3b. Instrument Detail Page (DT-3000)
  console.log("3b. Capturing Instrument Detail Page...");
  await page.goto(`${BASE_URL}/instruments/1`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "03b_instrument_detail.png") });

  // 4. Test Sessions Page
  console.log("4. Capturing Test Sessions Page...");
  await page.goto(`${BASE_URL}/test-sessions`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "04_test_sessions.png") });

  // 4b. Test Session Detail (TS-1045)
  console.log("4b. Capturing Test Session Detail (TS-1045)...");
  await page.goto(`${BASE_URL}/test-sessions/1`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "04b_session_detail_ts1045.png") });

  // 5. Test Execution Page (TS-1045)
  console.log("5. Capturing Test Execution...");
  await page.goto(`${BASE_URL}/test-sessions/1/tests`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "05_test_execution.png") });

  // 6. Results Page (TS-1045 PASS)
  console.log("6a. Capturing PASS Results Page (TS-1045)...");
  await page.goto(`${BASE_URL}/results/1`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "06a_results_pass_ts1045.png") });

  // 6b. Results Page (Session 3 FAIL)
  console.log("6b. Capturing FAIL Results Page (Session 3)...");
  await page.goto(`${BASE_URL}/results/3`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "06b_results_fail_session3.png") });

  // 7. Why FAIL Page (Session 3)
  console.log("7. Capturing Why FAIL Page (Session 3)...");
  await page.goto(`${BASE_URL}/why-fail/3`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "07_why_fail_session3.png") });

  // 7b. Why PASS Page (Session 1)
  console.log("7b. Capturing Why PASS Page (Session 1)...");
  await page.goto(`${BASE_URL}/why-pass/1`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "07b_why_pass_session1.png") });

  // 8. Decision Trace Page (Session 3)
  console.log("8. Capturing Decision Trace Page (Session 3)...");
  await page.goto(`${BASE_URL}/decision-trace/3`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "08_decision_trace_session3.png") });

  // 8b. Decision Trace Page (Session 1)
  console.log("8b. Capturing Decision Trace Page (Session 1)...");
  await page.goto(`${BASE_URL}/decision-trace/1`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "08b_decision_trace_session1.png") });

  // 9. Review Workspace Page
  console.log("9. Capturing Review Workspace Page...");
  await page.goto(`${BASE_URL}/review`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "09_review_workspace.png") });

  // 9b. Review Detail Page (Session 1)
  console.log("9b. Capturing Review Detail Page (Session 1)...");
  await page.goto(`${BASE_URL}/review/1`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "09b_review_detail_session1.png") });

  // 10. Reports Repository & Detail
  console.log("10. Capturing Reports Repository...");
  await page.goto(`${BASE_URL}/repository`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "10_reports_repository.png") });

  console.log("10b. Capturing Report Detail (TR-DEMO-1045)...");
  await page.goto(`${BASE_URL}/reports/1`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "10b_report_detail.png") });

  // 11. Mobile Viewport for Android Smartphone Showcase
  console.log("11. Capturing Mobile Android Viewport...");
  await page.setViewport({ width: 393, height: 852, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto(`${BASE_URL}/dashboard`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "mobile_dashboard.png") });

  await page.goto(`${BASE_URL}/results/1`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "mobile_results.png") });

  await browser.close();
  console.log("=== All screenshots successfully captured! ===");
}

run().catch(err => {
  console.error("Capture failed:", err);
  process.exit(1);
});
