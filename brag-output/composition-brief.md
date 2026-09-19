# Hyperframes Composition Brief: SwarnLanka AI

## Objective
Create a short launch-style brag video for SwarnLanka AI.

## Output
- Composition directory: `brag-output/composition/`
- Rendered video: `brag-output/brag.mp4`
- Format: landscape — 1920x1080
- Duration: 20 seconds

## Source Material
- Project root: C:\Users\santosh\SwarnLanka-AI
- Primary files read: frontend/app/page.tsx (hero), frontend/app/globals.css (gold palette), frontend/app/report/page.tsx (UploadFile), frontend/app/dashboard/page.tsx (queue), frontend/components/MapClient.tsx (Leaflet), README.md, backend/app/routes/reports.py
- Product name: SwarnLanka AI
- Tagline / strongest claim: "12 reports = 1 pothole. 73m away, same Group #2, priority bumped 71 -> 77." + "P1 Critical in seconds, not days."
- Key UI or visual moment to recreate: UploadFile drag-drop + AI card (P2 High 71) + Duplicate Groups card + Leaflet colored markers
- Copy that must appear verbatim:
  - SwarnLanka AI
  - Turning Citizen Reports into Intelligent Civic Action
  - UploadFile + Text + GPS -> AI in seconds
  - road_damage - severity 4 - P2 High 71 - Road Maintenance
  - 12 reports = 1 incident. 73m away -> Group #2
  - Live: swarn-lanka-fxrdrw1tn-aryansneha1845.vercel.app

## Creative Direction
- Tone preset: polished
- Creative direction: quiet premium product film for civic trust
- Interpretation: Elegant, restrained, civic-serious. Slow, readable, gold minimal, charcoal nav, ivory background. No chaos, no jokes. Let the product speak.
- Angle: Quiet premium civic product film. Show the loop is complete and auditable, from citizen photo to priority on map.
- Hook: "A pothole reported. A city responds." (2s)
- Outro / punchline: "SwarnLanka AI — Live" with logo + URLs
- Avoid:
  - Generic SaaS language
  - Abstract filler visuals
  - Unrelated visual redesign

## Visual Identity
- Background: #fffbf0 (ivory)
- Text: #1c1917 (charcoal)
- Accent: #d4af37 (gold) -> #92400e (earth) gradient
- Display font: Geist Sans (fallback Calibri)
- Body font: Geist Sans
- Visual references from the project: gold-gradient hero, glass cards, UploadFile dashed border, AI card gold/amber, Priority Queue red/orange, Leaflet markers

## Storyboard
Use the storyboard in `brag-output/brag-plan.md` as the creative contract.

Scene summary:
1. Hook — 2s — Gold hero with SwarnLanka AI title, glass card pulse
2. Reveal — 3s — Real Report page UI: UploadFile + description + Use Current Location
3. Highlight 1 AI — 4s — AI card road_damage 0.94 P2 High 71
4. Highlight 2 Duplicate — 5s — Dashboard Group #2 + Map red markers
5. Highlight 3 Queue — 2s — Priority Queue sorted 77>71
6. Outro — 4s — Logo + URLs

## Audio
- Audio role: Warm corporate bed, polished, low music bed with final fade, one dry logo hit
- Audio arc: Low intro -> gentle rise at AI reveal -> swell at duplicate -> fade under outro
- Music: Happy Beats / Business Moves (ende.app, bundled) — copy to composition/assets/music/
- Music treatment: Fade under final logo, beat-sync for queue/markers, final hit at 19.5s
- Music cue guidance: Bundled preset assets/music/cues/Happy Beats.json if present, else detect via hyperframes beats. Cues at 0:00, 0:02, 0:05, 0:09, 0:14, 0:16, 0:19.5
- Audio-reactive treatment: Subtle — glow on gold gradient, card presence, title emphasis. No waveform.
- Audio-coupled moments:
  - Hook — logo hit
  - AI card reveal — count-up tick
  - Duplicate cluster — soft pop
  - Queue stagger — beat tick
  - Final logo — dry hit
- SFX selection guidance: Card sounds for card reveals, key/click for text, restraint for polished
- SFX analysis guidance: assets/sfx/sfx-analysis.md — prefer low high-frequency-risk for polished
- Exact SFX choice: Hyperframes to choose
- Audio files: copy chosen music and Hyperframes-selected SFX into brag-output/composition/assets/

## Hyperframes Instructions
Load hyperframes-core, hyperframes-animation, hyperframes-creative, hyperframes-keyframes, hyperframes-cli to create brag-output/composition/. Do not enter hyperframes entry-point intent. Prefer native Hyperframes conventions.

Requirements:
- Show at least one real UI, copy, or visual element from source project.
- Keep all text readable in final render.
- Keep video within 15-25 seconds.
- Include planned music/SFX layer.
- Treat audio notes as guidance, not fixed cue sheet.
- Major reveals may move toward nearby strong cues within 0.15s. Use 1-3 strong cue locks. Mark // beat-locked
- Sequential events snap to beats within 0.10s. Mark // beat-grid
- Use SFX to support motion.
- Honor music treatment.
- Consider audio-reactive workflow.
- Use local assets.
- Run hyperframes check before render.
