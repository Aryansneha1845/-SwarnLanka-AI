# SwarnLanka AI

> **Turning Citizen Reports into Intelligent Civic Action.**

[![Hack Devengers 2.0](https://img.shields.io/badge/Hack%20Devengers%202.0-24H%20Open%20Innovation-amber)](https://unstop.com)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2016-black)](https://nextjs.org)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688)](https://fastapi.tiangolo.com)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

SwarnLanka AI is an **AI-powered civic intelligence platform** that transforms unstructured citizen complaints (photo + text + location) into **verified, prioritized and actionable civic incidents** with automated department routing and duplicate grouping.

**Live Demo:** https://swarn-lanka-fxrdrw1tn-aryansneha1845.vercel.app | **Backend:** https://swarnlanka-ai.onrender.com | **GitHub:** https://github.com/Aryansneha1845/-SwarnLanka-AI | **API Docs:** https://swarnlanka-ai.onrender.com/docs

---

## Problem

Cities receive hundreds of complaints daily about potholes, garbage, streetlights, water leakage and road damage. The bottleneck is not collection, but:

- Understanding the issue from text + image
- Verifying authenticity
- Detecting **duplicate complaints** (12 reports = 1 incident)
- Estimating **severity + safety risk**
- **Prioritizing** (P1 Critical vs P4 Low)
- Routing to the correct department

## Solution

SwarnLanka AI uses **Computer Vision + NLP + Geospatial + Priority Engine** to convert reports into action:

```
Citizen Report (UploadFile + Text + Lat/Lon)
  -> AI Analysis (category, severity, confidence, summary)
  -> Duplicate Detection (haversine <150m + text sim >0.85)
  -> Priority Score (Severity30 + Safety25 + People20 + Location15 + Duplicates10 -> P1-P4)
  -> Department Routing (Road/Waste/Electrical/Water/Traffic)
  -> Authority Dashboard (KPI + Priority Queue + Duplicate Groups + Leaflet Map)
  -> Resolution
```

**Demo Proof (Mock DB, verified 19 Sep 2026):**
- Report 1: `"huge pothole near college gate"` at `19.1234,73.1234` -> `road_damage, severity 4, P2 High (71), Road Maintenance, Group #2`
- Report 2: `"massive road hole near college entrance"` at `19.1239,73.1238` (73m away) -> **Grouped as duplicate** -> Same Group #2, priority bumped to 77, `total_groups=2, high=2`

---

## Features

| Feature | Status | Details |
|---------|--------|---------|
| **Citizen Report** | Done | UploadFile (actual file), description, Use Current Location, preview |
| **AI Analysis** | Mock Done | Keyword + vision mock -> `category, sub_category, severity, safety_risk, confidence 0.94, department, summary` |
| **Priority Engine** | Done | Transparent formula -> `85-100 P1, 70-84 P2, 40-69 P3, 0-39 P4` |
| **Duplicate Detection** | Done | `haversine` + `is_duplicate()` -> 12 reports -> 1 incident |
| **Department Routing** | Done | `pothole->Road, garbage->Waste, light->Electrical, water->Water, tree->Parks` |
| **Authority Dashboard** | Done | KPI (total/critical/high/duplicate_groups) + Priority Queue (sorted) + Duplicate Groups |
| **Civic Map** | Done | Leaflet + OSM, colored markers (red/orange/amber/green) by priority, popups |
| **API Docs** | Done | `http://127.0.0.1:8000/docs` (3 routers) |

---

## Tech Stack

**Frontend:** Next.js 16.3.5 + TypeScript + Tailwind CSS v4 + Leaflet 1.9.4 + react-leaflet 4.2.1
**Backend:** Python 3.13 + FastAPI 0.110 + Uvicorn + Pydantic
**AI:** Mock analyzer (keyword) + vision stub -> ready to swap to OpenAI/Gemini via `OPENAI_API_KEY`
**DB:** In-memory mock (`REPORTS=[]`, `DUPLICATE_GROUPS={}`) for MVP -> `database/schema.sql` ready for PostgreSQL
**Maps:** Leaflet + OpenStreetMap (no key needed)

---

## Project Structure

```
SwarnLanka-AI/
├── frontend/               # Next.js App Router
│   ├── app/
│   │   ├── page.tsx        # Landing hero (gold gradient)
│   │   ├── report/page.tsx # UploadFile + AI flow
│   │   ├── dashboard/page.tsx # KPI + Queue + Groups
│   │   └── map/page.tsx    # Leaflet map
│   ├── components/MapClient.tsx
│   └── services/api.ts     # Fetch to FastAPI
├── backend/
│   ├── app/
│   │   ├── main.py         # FastAPI + CORS + 3 routers
│   │   ├── routes/reports.py # Mock DB + UploadFile
│   │   ├── routes/ai.py    # POST /analyze
│   │   ├── routes/dashboard.py # stats/queue/groups
│   │   ├── services/priority.py # calculate_priority + get_level
│   │   ├── services/duplicate.py # haversine
│   │   ├── services/department.py # ROUTING
│   │   └── ai/analyzer.py  # Mock AI
│   └── requirements.txt
├── database/schema.sql     # PostgreSQL ready
├── screenshots/            # Demo captures
└── docs/
```

---

## Quick Start (Verified 19 Sep 2026)

### Backend

```powershell
cd backend
# Option A: with venv (recommended if ensurepip works)
python -m venv .venv; .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
# Open http://127.0.0.1:8000 and http://127.0.0.1:8000/docs

# Option B: skip venv if ensurepip fails (used for MVP)
pip install fastapi uvicorn python-multipart pydantic python-dotenv
python -m uvicorn app.main:app --reload
```

### Frontend

```powershell
cd frontend
npm install
npm run dev
# Open http://localhost:3000 , http://localhost:3000/report , /dashboard , /map
```

Test loop:
```powershell
# AI
Invoke-RestMethod -Uri http://127.0.0.1:8000/api/ai/analyze -Method Post -ContentType "application/json" -Body '{"description":"huge pothole near college gate"}'
# Create report (multipart)
# Use /report UI or curl with -F description="..." -F image=@photo.jpg -F latitude=19.1234
```

---

## Screenshots

> Add real captures to `screenshots/` before submission (see `screenshots/README.md`).

| Landing | Report AI | Dashboard | Map | Swagger |
|---------|-----------|-----------|-----|---------|
| `screenshots/landing.png` | `screenshots/report.png` | `screenshots/dashboard.png` | `screenshots/map.png` | `screenshots/swagger.png` |

---

## Deployment

- **Frontend:** Vercel -> https://swarn-lanka-fxrdrw1tn-aryansneha1845.vercel.app (`NEXT_PUBLIC_API_URL=https://swarnlanka-ai.onrender.com`)
- **Backend:** Render -> https://swarnlanka-ai.onrender.com (`CORS_ORIGINS=*` for demo)
- Live demo verified 19 Sep 2026: Frontend 200 OK, Backend `{"status":"online"}`, `POST /api/ai/analyze` -> `road_damage 71 P2`

---

## Hackathon

Built during **Hack Devengers 2.0** - 24 Hour Open Innovation Hackathon (19-20 Sep 2026, 10:00 AM - 10:00 AM IST). Submission via Google Form shared on WhatsApp Channel https://whatsapp.com/channel/0029VbCVGAd8KMql7Ie3ew43 (form opens 1:00 PM 19 Sep).

**Team:** SwarnLanka AI | **Commit History:** Step-by-step commits prove 24h build window.

---

## Future

- Swap mock `ai/analyzer.py` to real multimodal LLM (OpenAI/Gemini vision)
- PostgreSQL + PostGIS + pgvector for embeddings + real geospatial queries
- Citizen tracking `track/page.tsx` with status timeline
- Admin resolve workflow + heatmap analytics