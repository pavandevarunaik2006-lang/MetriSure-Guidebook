const puppeteer = require('puppeteer-core');
const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const ASSETS_DIR = path.join(__dirname, "public", "assets");
const SCREENSHOTS_DIR = path.join(__dirname, "public", "screenshots");

if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

async function generate() {
  console.log("1. Generating QR Codes...");
  
  // 1. QR Codes
  const urls = {
    qr_guidebook: "https://metri-sure.vercel.app/guidebook",
    qr_live_app: "https://metri-sure.vercel.app",
    qr_github: "https://github.com/pavandevarunaik2006-lang/MetriSure"
  };

  for (const [key, url] of Object.entries(urls)) {
    const filePath = path.join(ASSETS_DIR, `${key}.png`);
    await QRCode.toFile(filePath, url, {
      width: 800,
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'H'
    });
    console.log(`Saved QR: ${filePath}`);
  }

  // 2. Launch headless Edge to render device frame mockups
  console.log("2. Launching Edge to generate high-resolution device mockups...");
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();

  // Helper to load image as base64
  const getBase64 = (relPath) => {
    const full = path.join(SCREENSHOTS_DIR, relPath);
    if (!fs.existsSync(full)) return "";
    const b = fs.readFileSync(full);
    return `data:image/png;base64,${b.toString('base64')}`;
  };

  const desktopDashB64 = getBase64("02_dashboard.png");
  const desktopWhyFailB64 = getBase64("07_why_fail_session3.png");
  const mobileDashB64 = getBase64("mobile_dashboard.png");
  const mobileResultsB64 = getBase64("mobile_results.png");

  // A. Desktop Laptop Frame Mockup
  console.log("Rendering Desktop Laptop Mockup...");
  const desktopHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        margin: 0;
        padding: 40px;
        background: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }
      .laptop-container {
        width: 1400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        filter: drop-shadow(0 25px 40px rgba(15, 23, 42, 0.25));
      }
      .screen-lid {
        width: 1200px;
        height: 750px;
        background: #0f172a;
        border-radius: 20px 20px 0 0;
        padding: 16px 16px 0 16px;
        box-sizing: border-box;
        border: 2px solid #334155;
        border-bottom: none;
        display: flex;
        flex-direction: column;
        position: relative;
      }
      .webcam-bar {
        height: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 6px;
        left: 0;
        right: 0;
      }
      .camera {
        width: 6px;
        height: 6px;
        background: #1e293b;
        border: 1px solid #475569;
        border-radius: 50%;
      }
      .screen-display {
        width: 100%;
        height: 720px;
        background: #f8fafc;
        border-radius: 8px 8px 0 0;
        overflow: hidden;
        margin-top: 10px;
      }
      .screen-display img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top left;
        display: block;
      }
      .base {
        width: 1360px;
        height: 24px;
        background: linear-gradient(180deg, #94a3b8 0%, #cbd5e1 40%, #64748b 100%);
        border-radius: 0 0 16px 16px;
        position: relative;
        box-shadow: 0 8px 16px rgba(0,0,0,0.2);
      }
      .notch {
        width: 160px;
        height: 8px;
        background: #475569;
        border-radius: 0 0 8px 8px;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
      }
      .badge-tag {
        position: absolute;
        bottom: -32px;
        left: 50%;
        transform: translateX(-50%);
        background: #0f172a;
        color: #e2e8f0;
        font-size: 13px;
        font-weight: 600;
        padding: 4px 14px;
        border-radius: 20px;
        letter-spacing: 0.5px;
      }
    </style>
  </head>
  <body>
    <div class="laptop-container">
      <div class="screen-lid">
        <div class="webcam-bar"><div class="camera"></div></div>
        <div class="screen-display">
          <img src="${desktopDashB64}" />
        </div>
      </div>
      <div class="base">
        <div class="notch"></div>
      </div>
    </div>
  </body>
  </html>
  `;

  await page.setContent(desktopHtml, { waitUntil: "networkidle0" });
  await page.setViewport({ width: 1480, height: 860, deviceScaleFactor: 2 });
  const desktopMockupPath = path.join(ASSETS_DIR, "desktop_application_mockup.png");
  await page.screenshot({ path: desktopMockupPath, omitBackground: true });
  console.log(`Saved desktop mockup: ${desktopMockupPath}`);

  // B. Android Smartphone Frame Mockup
  console.log("Rendering Android Smartphone Mockup...");
  const phoneHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        margin: 0;
        padding: 30px;
        background: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }
      .phone-wrapper {
        width: 440px;
        display: flex;
        flex-direction: column;
        align-items: center;
        filter: drop-shadow(0 25px 35px rgba(15, 23, 42, 0.3));
      }
      .phone-chassis {
        width: 400px;
        height: 820px;
        background: #090d16;
        border-radius: 48px;
        padding: 12px;
        box-sizing: border-box;
        border: 3px solid #334155;
        position: relative;
        box-shadow: inset 0 0 8px rgba(255,255,255,0.15);
      }
      .screen-area {
        width: 100%;
        height: 100%;
        background: #0f172a;
        border-radius: 36px;
        overflow: hidden;
        position: relative;
        display: flex;
        flex-direction: column;
      }
      .status-bar {
        height: 32px;
        background: #0f172a;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        color: #94a3b8;
        font-size: 11px;
        font-weight: 600;
        z-index: 10;
      }
      .punch-hole {
        width: 12px;
        height: 12px;
        background: #000;
        border-radius: 50%;
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        border: 1.5px solid #1e293b;
        z-index: 20;
      }
      .app-content {
        flex: 1;
        overflow: hidden;
      }
      .app-content img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top;
        display: block;
      }
      .gesture-bar {
        position: absolute;
        bottom: 8px;
        left: 50%;
        transform: translateX(-50%);
        width: 120px;
        height: 4px;
        background: #64748b;
        border-radius: 4px;
        z-index: 10;
      }
    </style>
  </head>
  <body>
    <div class="phone-wrapper">
      <div class="phone-chassis">
        <div class="punch-hole"></div>
        <div class="screen-area">
          <div class="status-bar">
            <span>09:41</span>
            <span style="letter-spacing:1px;">5G ⬝ 100%</span>
          </div>
          <div class="app-content">
            <img src="${mobileDashB64}" />
          </div>
          <div class="gesture-bar"></div>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;

  await page.setContent(phoneHtml, { waitUntil: "domcontentloaded", timeout: 10000 });
  await page.setViewport({ width: 500, height: 900, deviceScaleFactor: 2 });
  const phoneMockupPath = path.join(ASSETS_DIR, "android_smartphone_mockup.png");
  await page.screenshot({ path: phoneMockupPath, omitBackground: true });
  console.log(`Saved Android smartphone mockup: ${phoneMockupPath}`);

  // C. Combined Hero Duo Mockup (Desktop + Mobile side-by-side)
  console.log("Rendering Combined Desktop + Mobile Duo Hero...");
  const duoHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        margin: 0;
        padding: 50px 40px;
        background: transparent;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }
      .duo-container {
        position: relative;
        display: flex;
        align-items: flex-end;
      }
      .laptop-container {
        width: 1120px;
        display: flex;
        flex-direction: column;
        align-items: center;
        filter: drop-shadow(0 20px 35px rgba(15, 23, 42, 0.22));
      }
      .screen-lid {
        width: 980px;
        height: 615px;
        background: #0f172a;
        border-radius: 18px 18px 0 0;
        padding: 14px 14px 0 14px;
        box-sizing: border-box;
        border: 2px solid #334155;
        border-bottom: none;
      }
      .screen-display {
        width: 100%;
        height: 595px;
        background: #f8fafc;
        border-radius: 6px 6px 0 0;
        overflow: hidden;
      }
      .screen-display img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top left;
        display: block;
      }
      .base {
        width: 1100px;
        height: 20px;
        background: linear-gradient(180deg, #94a3b8 0%, #cbd5e1 40%, #64748b 100%);
        border-radius: 0 0 14px 14px;
        position: relative;
      }
      .notch {
        width: 140px;
        height: 6px;
        background: #475569;
        border-radius: 0 0 6px 6px;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
      }
      .mobile-floating {
        position: absolute;
        right: -30px;
        bottom: -15px;
        width: 300px;
        height: 600px;
        background: #090d16;
        border-radius: 38px;
        padding: 10px;
        box-sizing: border-box;
        border: 2.5px solid #475569;
        filter: drop-shadow(0 25px 35px rgba(15, 23, 42, 0.45));
        z-index: 100;
      }
      .mobile-screen {
        width: 100%;
        height: 100%;
        border-radius: 28px;
        overflow: hidden;
        background: #0f172a;
        display: flex;
        flex-direction: column;
      }
      .m-statusbar {
        height: 24px;
        background: #0f172a;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;
        color: #94a3b8;
        font-size: 10px;
        font-weight: 600;
      }
      .m-hole {
        width: 10px;
        height: 10px;
        background: #000;
        border-radius: 50%;
        position: absolute;
        top: 7px;
        left: 50%;
        transform: translateX(-50%);
        border: 1px solid #334155;
        z-index: 120;
      }
      .m-content {
        flex: 1;
        overflow: hidden;
      }
      .m-content img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top;
        display: block;
      }
    </style>
  </head>
  <body>
    <div class="duo-container">
      <div class="laptop-container">
        <div class="screen-lid">
          <div class="screen-display">
            <img src="${desktopDashB64}" />
          </div>
        </div>
        <div class="base"><div class="notch"></div></div>
      </div>
      <div class="mobile-floating">
        <div class="m-hole"></div>
        <div class="mobile-screen">
          <div class="m-statusbar">
            <span>09:41</span>
            <span>5G ⬝ 100%</span>
          </div>
          <div class="m-content">
            <img src="${mobileDashB64}" />
          </div>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;

  await page.setContent(duoHtml, { waitUntil: "domcontentloaded", timeout: 10000 });
  await page.setViewport({ width: 1400, height: 750, deviceScaleFactor: 2 });
  const duoMockupPath = path.join(ASSETS_DIR, "hero_device_duo_mockup.png");
  await page.screenshot({ path: duoMockupPath, omitBackground: true });
  console.log(`Saved Hero Duo mockup: ${duoMockupPath}`);

  await browser.close();
  console.log("=== Mockups and QR codes successfully generated! ===");
}

generate().catch(err => {
  console.error("Mockup generation failed:", err);
  process.exit(1);
});
