# METRISURE — SIH 2026 Interactive Digital Guidebook

**Problem Statement:** SIH26035  
**Title:** Digital Test Report Generation System for Non-Automatic Weighing Instruments (NAWI) as per OIML Recommendation R-76  
**Ministry:** Ministry of Consumer Affairs, Food & Public Distribution  
**Department:** Department of Consumer Affairs — Legal Metrology Division  

---

## 🔗 Live Links & Access Points

| Resource | URL | Description |
| :--- | :--- | :--- |
| **🌐 Interactive Digital Guidebook** | **[https://metri-sure.vercel.app/guidebook/](https://metri-sure.vercel.app/guidebook/)** | 10-page standalone interactive product walkthrough for judges |
| **📄 Downloadable PDF Guidebook** | **[https://metri-sure.vercel.app/guidebook/MetriSure_Digital_Guidebook_SIH2026.pdf](https://metri-sure.vercel.app/guidebook/MetriSure_Digital_Guidebook_SIH2026.pdf)** | Print-ready multi-page technical documentation PDF |
| **🚀 Live MetriSure Application** | **[https://metri-sure.vercel.app](https://metri-sure.vercel.app)** | Production web platform (React 18 + Tailwind v4 on Vercel) |
| **⚙️ Live Backend API** | **[https://metrisure-production.up.railway.app](https://metrisure-production.up.railway.app)** | Production FastAPI backend (Railway Container Service) |
| **💻 GitHub Source Repository** | **[https://github.com/pavandevarunaik2006-lang/MetriSure](https://github.com/pavandevarunaik2006-lang/MetriSure)** | Full source code with automated CI/CD deployment |

---

## 📁 Repository & Directory Layout

```
MetriSure-Guidebook/
├── index.html                               # Standalone 10-page interactive guidebook web app
├── MetriSure_Digital_Guidebook_SIH2026.pdf  # Generated high-resolution PDF document (1.02 MB)
├── capture_screenshots.js                  # Automated script to capture live production UI via headless Edge
├── generate_mockups_and_qr.js              # Script rendering laptop/smartphone frames & QR codes
├── export_pdf.js                            # Script exporting index.html to A4 PDF with exact margins
├── package.json                             # Tooling configuration (puppeteer-core, qrcode)
├── README.md                                # Guidebook documentation and SIH PPT assets index
└── public/
    ├── assets/                              # High-resolution PPT assets & QR codes
    │   ├── desktop_application_mockup.png   # Production UI in modern laptop device frame (547 KB)
    │   ├── android_smartphone_mockup.png    # Responsive UI in Android smartphone frame (240 KB)
    │   ├── hero_device_duo_mockup.png       # Combined Desktop + Smartphone side-by-side (561 KB)
    │   ├── qr_guidebook.png                 # High-resolution QR code for Guidebook URL
    │   ├── qr_live_app.png                  # High-resolution QR code for Live Application URL
    │   └── qr_github.png                    # High-resolution QR code for GitHub Repo URL
    └── screenshots/                         # Individual application screenshots (PNG)
        ├── 01_login.png                     # Login portal & demo user selection
        ├── 02_dashboard.png                 # Main operational dashboard
        ├── 03_instruments.png               # Instrument repository
        ├── 03b_instrument_detail.png        # DT-3000 instrument specifications
        ├── 04_test_sessions.png             # Test sessions overview
        ├── 04b_session_detail_ts1045.png    # TS-1045 clean session details
        ├── 05_test_execution.png            # Live test execution & observation entry
        ├── 06a_results_pass_ts1045.png      # TS-1045 PASS compliance results
        ├── 06b_results_fail_session3.png    # Session 3 FAIL compliance results
        ├── 07_why_fail_session3.png         # Why FAIL root-cause analysis (Linearity Point 3)
        ├── 07b_why_pass_session1.png        # Why PASS explanation (TS-1045)
        ├── 08_decision_trace_session3.png   # Step-by-step arithmetic DecisionTrace
        ├── 08b_decision_trace_session1.png  # Compliant DecisionTrace
        ├── 09_review_workspace.png          # Review Queue & four-eye inspection
        ├── 09b_review_detail_session1.png   # Detailed reviewer sign-off view
        ├── 10_reports_repository.png        # Issued report repository with SHA-256 hashes
        ├── 10b_report_detail.png            # Report inspection & PDF download
        ├── mobile_dashboard.png             # Responsive mobile view of Dashboard
        └── mobile_results.png               # Responsive mobile view of Compliance Results
```

---

## 🎯 10-Page Structure Overview

1. **Page 1 — Cover & Executive Summary**: Problem Statement alignment, Ministry/Department headers, Hero visual showing Desktop + Smartphone mockups, core value propositions.
2. **Page 2 — What is MetriSure?**: The manual evaluation problem vs. MetriSure solution, 4 primary stakeholder roles, end-to-end dataflow pipeline.
3. **Page 3 — Complete System Workflow**: 10-stage sequential journey from Authentication to Verification & Audit Trail with exact frontend routes.
4. **Page 4 — Dashboard & Role-Based Access (RBAC)**: Technician, Reviewer, Approver, and Administrator roles with real annotated screenshot breakdowns.
5. **Page 5 — Instrument & Laboratory Setup**: Real demo asset (DemoTech Industries DT-3000, Class III, $Max = 30$ kg, $e = 0.01$ kg), National Metrology Lab Mumbai, and environmental conditioning requirements.
6. **Page 6 — Test Sessions & Test Execution**: Detailed breakdown of the 5 implemented OIML R-76 test procedures (Linearity, Repeatability, Eccentricity, Discrimination, Zero-Setting), comparison table between TS-1045 and Session 3.
7. **Page 7 — Deterministic Compliance Engine**: Pure mathematical evaluation pipeline ($P = I + 0.5d - \Delta L$, $E_c = P - L - E_0$), Class III Table 6 MPE envelopes, and strict Non-AI Statutory Decision Path mandate.
8. **Page 8 — Why FAIL & DecisionTrace**: Detailed post-mortem of actual failed production session `TS-20260928131914` (Linearity Point 3 at 15.0 kg, calculated error $+0.025$ kg exceeding $\pm 0.010$ kg MPE by $+150\%$), explainable rule references.
9. **Page 9 — Review, Approval & Report Generation**: Four-eye review workflow, Review Queue, Approver cryptographic sign-off, issued report `TR-DEMO-1045`, SHA-256 hash sealing, and legal metrology scope boundaries.
10. **Page 10 — End-to-End Demo & Deployed Architecture**: Side-by-side PASS Flow vs FAIL Flow comparison, Vercel + Railway + SQLite production topology, and high-resolution QR access codes.

---

## 💡 How to Use These Assets in Your SIH PPT

1. **Slide 1 / Cover Slide**: Place `public/assets/hero_device_duo_mockup.png` or `desktop_application_mockup.png`.
2. **Slide 2 / Live Links & Demo**: Embed `public/assets/qr_guidebook.png` and `public/assets/qr_live_app.png` with direct clickable links:
   - Guidebook: `https://metri-sure.vercel.app/guidebook/`
   - Live Application: `https://metri-sure.vercel.app`
3. **Workflow & Execution Slides**: Use individual screenshots from `public/screenshots/`:
   - `02_dashboard.png` (Operations overview)
   - `05_test_execution.png` (Data entry & live MPE calculation)
   - `07_why_fail_session3.png` & `08_decision_trace_session3.png` (Explainability & DecisionTrace)
   - `09_review_workspace.png` & `10b_report_detail.png` (Governance & sealed report issuance)
4. **Offline / Backup Distribution**: Distribute `MetriSure_Digital_Guidebook_SIH2026.pdf` directly to judges on a pen drive or via email.
