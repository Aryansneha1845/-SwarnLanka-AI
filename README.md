# SwarnLanka AI

> Turning Citizen Reports into Intelligent Civic Action.

SwarnLanka AI is an AI-powered civic intelligence platform that transforms unstructured citizen complaints into verified, prioritized and actionable civic incidents.

## Problem

Cities receive large numbers of complaints about potholes, garbage, broken streetlights, water leakage, road damage and other civic issues.

The challenge is not simply collecting complaints. The challenge is:

- Understanding the issue
- Verifying the report
- Detecting duplicate complaints
- Estimating severity
- Prioritizing incidents
- Routing them to the correct department

## Solution

SwarnLanka AI uses:

- Computer Vision
- NLP / LLM
- Geospatial Intelligence
- Duplicate Detection
- Priority Scoring
- Automated Department Routing

to convert citizen reports into actionable civic incidents.

## Workflow

```
Citizen Report -> AI Analysis -> Verification -> Duplicate Detection -> Priority Score -> Department Routing -> Authority Dashboard -> Resolution
```

## Tech Stack

### Frontend
- Next.js 14 + TypeScript + Tailwind CSS
- Leaflet / OpenStreetMap

### Backend
- Python + FastAPI

### AI
- Multimodal AI (Vision + Text)
- Embeddings for duplicate detection

### Database
- PostgreSQL

## Project Structure

```
frontend/     # Next.js frontend
backend/      # FastAPI backend
database/     # schema.sql
docs/         # architecture diagrams
screenshots/  # demo screenshots
```

## Quick Start

### Backend
```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
# http://127.0.0.1:8000/docs
```

### Frontend
```powershell
cd frontend
npm install
npm run dev
# http://localhost:3000
```

## Hackathon

Built during Hack Devengers 2.0 - 24 Hour Open Innovation Hackathon (19-20 Sep 2026)
