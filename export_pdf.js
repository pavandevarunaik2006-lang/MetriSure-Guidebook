const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const HTML_PATH = path.join(__dirname, "index.html");
const PDF_PATH = path.join(__dirname, "MetriSure_Digital_Guidebook_SIH2026.pdf");

async function exportPDF() {
  console.log("Launching Edge to generate exportable PDF...");
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log(`Loading file://${HTML_PATH}...`);
  await page.goto(`file://${HTML_PATH}`, { waitUntil: "networkidle0" });

  console.log("Exporting to PDF...");
  await page.pdf({
    path: PDF_PATH,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '12mm',
      bottom: '12mm',
      left: '12mm',
      right: '12mm'
    }
  });

  await browser.close();
  const stats = fs.statSync(PDF_PATH);
  console.log(`PDF successfully generated: ${PDF_PATH} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
}

exportPDF().catch(err => {
  console.error("PDF generation error:", err);
  process.exit(1);
});
