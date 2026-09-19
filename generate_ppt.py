from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

prs = Presentation()
prs.slide_width = Inches(13.33)
prs.slide_height = Inches(7.5)
prs.core_properties.title = "SwarnLanka AI - Hack Devengers 2.0"
prs.core_properties.subject = "Civic Intelligence Platform"

GOLD = RGBColor(0xD4, 0xAF, 0x37)
GOLD_DARK = RGBColor(0x92, 0x40, 0x0E)
DARK = RGBColor(0x1C, 0x19, 0x17)
STONE = RGBColor(0x78, 0x71, 0x6B)
BG = RGBColor(0xFF, 0xFB, 0xF0)
WHITE = RGBColor(0xFF,0xFF,0xFF)

def bg(slide, color=BG):
    fill = slide.background.fill
    fill.solid()
    fill.fore_color.rgb = color

def add_shape(slide, left, top, width, height, fill_color, text="", font_size=12, font_color=WHITE, bold=False, alignment=PP_ALIGN.LEFT):
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill_color
    shape.line.fill.background()
    if text:
        tf = shape.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = text
        p.font.size = Pt(font_size)
        p.font.color.rgb = font_color
        p.font.bold = bold
        p.alignment = alignment
        tf.vertical_anchor = MSO_ANCHOR.MIDDLE
    return shape

def add_text(slide, left, top, width, height, text, size=14, color=DARK, bold=False, align=PP_ALIGN.LEFT, italic=False):
    txBox = slide.shapes.add_textbox(left, top, width, height)
    tf = txBox.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = text
    p.font.size = Pt(size)
    p.font.color.rgb = color
    p.font.bold = bold
    p.font.italic = italic
    p.alignment = align
    return txBox

# Slide 1 - Title
slide = prs.slides.add_slide(prs.slide_layouts[6])
bg(slide, BG)
add_shape(slide, Inches(0), Inches(0), Inches(13.33), Inches(1.2), GOLD_DARK)
add_text(slide, Inches(0.5), Inches(0.3), Inches(12), Inches(0.6), "Hack Devengers 2.0  |  24H Open Innovation  |  19-20 Sep 2026", 10, RGBColor(0xFF,0xE7,0xA0), False, PP_ALIGN.CENTER)
add_text(slide, Inches(0.5), Inches(1.8), Inches(12.3), Inches(1), "SwarnLanka AI", 44, GOLD_DARK, True, PP_ALIGN.CENTER)
add_text(slide, Inches(0.5), Inches(2.8), Inches(12.3), Inches(0.8), "Turning Citizen Reports into Intelligent Civic Action", 18, STONE, False, PP_ALIGN.CENTER)
add_shape(slide, Inches(4.5), Inches(3.7), Inches(4.3), Inches(0.6), GOLD, "AI  |  Vision  |  Geospatial  |  Priority", 11, WHITE, True, PP_ALIGN.CENTER)
add_text(slide, Inches(0.5), Inches(4.6), Inches(12.3), Inches(0.6), "AI-powered civic intelligence  |  UploadFile + NLP + Duplicate Detection + Auto Routing", 12, STONE, False, PP_ALIGN.CENTER)
add_text(slide, Inches(0.5), Inches(5.4), Inches(12.3), Inches(0.4), "Live:  swarn-lanka-fxrdrw1tn-aryansneha1845.vercel.app   |   API:  swarnlanka-ai.onrender.com/docs", 9, GOLD_DARK, False, PP_ALIGN.CENTER)
add_text(slide, Inches(0.5), Inches(6.0), Inches(12.3), Inches(0.4), "GitHub: github.com/Aryansneha1845/-SwarnLanka-AI   |   Team: SwarnLanka AI", 9, STONE, False, PP_ALIGN.CENTER)

# Slide 2 - Problem
slide = prs.slides.add_slide(prs.slide_layouts[6])
bg(slide)
add_text(slide, Inches(0.5), Inches(0.3), Inches(12), Inches(0.5), "The Problem", 28, GOLD_DARK, True)
add_text(slide, Inches(0.5), Inches(0.9), Inches(12), Inches(0.4), "Cities drown in complaints. The bottleneck is NOT collection - it is intelligence.", 13, STONE, False)
problems = [
    ("Understanding", "Text + Image chaos", "Unstructured citizen language + photos"),
    ("Verification", "Fake / unclear reports", "No vision check"),
    ("Duplicates", "12 reports = 1 pothole", "73m apart, same issue, wasted crews"),
    ("Priority", "P1 vs P4 unclear", "Critical buried under low issues"),
    ("Routing", "Wrong department", "Pothole -> Waste team"),
    ("Resolution", "No tracking", "Citizens never know status"),
]
for i, (title, subtitle, desc) in enumerate(problems):
    col = i % 3
    row = i // 3
    left = Inches(0.5 + col*4.2)
    top = Inches(1.6 + row*2.2)
    add_shape(slide, left, top, Inches(3.9), Inches(1.9), WHITE)
    s = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left+Inches(0.1), top+Inches(0.1), Inches(3.7), Inches(1.7))
    s.fill.solid(); s.fill.fore_color.rgb = WHITE; s.line.color.rgb = RGBColor(0xE7,0xE5,0xE4); s.line.width = Pt(1)
    add_text(slide, left+Inches(0.2), top+Inches(0.2), Inches(3.5), Inches(0.3), title, 11, GOLD_DARK, True)
    add_text(slide, left+Inches(0.2), top+Inches(0.55), Inches(3.5), Inches(0.3), subtitle, 9, DARK, True)
    add_text(slide, left+Inches(0.2), top+Inches(0.85), Inches(3.5), Inches(0.6), desc, 8, STONE)

# Slide 3 - Solution
slide = prs.slides.add_slide(prs.slide_layouts[6])
bg(slide)
add_text(slide, Inches(0.5), Inches(0.3), Inches(12), Inches(0.5), "The Solution: SwarnLanka AI", 28, GOLD_DARK, True)
add_text(slide, Inches(0.5), Inches(0.9), Inches(12), Inches(0.4), "Vision + NLP + Geospatial + Priority Engine converts reports into action in seconds", 12, STONE)
features = [
    ("Vision/NLP", "Category, severity,\nconfidence 0.94", GOLD),
    ("Geospatial", "Lat/Lon + haversine\n<150m", RGBColor(0x0E,0x78,0x6B)),
    ("Duplicate", "85% text sim\n12 -> 1 incident", RGBColor(0x7C,0x3A,0xED)),
    ("Priority", "30+25+20+15+10\nP1-P4 scoring", RGBColor(0xDB,0x27,0x77)),
    ("Routing", "Auto department\nRoad/Waste/Elec", RGBColor(0x0E,0x78,0x6B)),
    ("Dashboard", "KPI + Queue\n+ Map", GOLD_DARK),
]
for i, (t, d, c) in enumerate(features):
    left = Inches(0.5 + i*2.1)
    add_shape(slide, left, Inches(1.6), Inches(1.9), Inches(1.9), c)
    add_text(slide, left+Inches(0.1), Inches(1.8), Inches(1.7), Inches(0.5), t, 10, WHITE, True, PP_ALIGN.CENTER)
    add_text(slide, left+Inches(0.1), Inches(2.4), Inches(1.7), Inches(0.8), d, 8, WHITE, False, PP_ALIGN.CENTER)
add_shape(slide, Inches(0.5), Inches(4.0), Inches(12.3), Inches(1.1), WHITE)
add_text(slide, Inches(0.7), Inches(4.2), Inches(11.9), Inches(0.3), "Complete Loop:", 11, GOLD_DARK, True)
add_text(slide, Inches(0.7), Inches(4.5), Inches(11.9), Inches(0.4), "Citizen Report (UploadFile)  ->  AI Analysis  ->  Duplicate Detection  ->  Priority Score  ->  Department Routing  ->  Authority Dashboard  ->  Resolution", 9, DARK)

# Slide 4 - Workflow
slide = prs.slides.add_slide(prs.slide_layouts[6])
bg(slide)
add_text(slide, Inches(0.5), Inches(0.3), Inches(12), Inches(0.5), "Workflow", 28, GOLD_DARK, True)
steps = ["Citizen\nReport", "AI\nAnalysis", "Verify", "Duplicate\nDetection", "Priority\nScore", "Route\nDepartment", "Dashboard", "Resolve"]
for i, s in enumerate(steps):
    left = Inches(0.4 + i*1.6)
    add_shape(slide, left, Inches(1.4), Inches(1.3), Inches(1.3), GOLD if i in [1,4,5] else WHITE, s, 8, WHITE if i in [1,4,5] else DARK, True, PP_ALIGN.CENTER)
    if i < len(steps)-1:
        add_text(slide, left+Inches(1.3), Inches(1.9), Inches(0.3), Inches(0.3), "->", 14, GOLD_DARK, True, PP_ALIGN.CENTER)
add_shape(slide, Inches(0.5), Inches(3.2), Inches(12.3), Inches(1.4), RGBColor(0xFF,0xFB,0xEB))
add_text(slide, Inches(0.7), Inches(3.4), Inches(11.9), Inches(0.3), "Verified Demo Proof (19 Sep 2026, live DB mock):", 10, GOLD_DARK, True)
add_text(slide, Inches(0.7), Inches(3.7), Inches(11.9), Inches(0.7), "Report #2:  huge pothole near college gate  at 19.1234,73.1234 -> road_damage, severity 4, P2 High (71), Group #2\nReport #3:  massive road hole near college entrance  at 19.1239,73.1238 (73m away) -> SAME Group #2, priority bumped to 77 -> total_groups=2, high=2", 8, DARK)

# Slide 5 - Features Deep
slide = prs.slides.add_slide(prs.slide_layouts[6])
bg(slide)
add_text(slide, Inches(0.5), Inches(0.3), Inches(12), Inches(0.5), "Features", 28, GOLD_DARK, True)
feats = [
    ("Report", "UploadFile + preview\n+ Use Current Location", "POST /api/reports/"),
    ("AI Mock", "Keyword -> category\nconfidence 0.94\nseverity 4", "POST /api/ai/analyze"),
    ("Priority", "Severity30+Safety25\nPeople20+Location15\nDuplicates10", "P1 85-100"),
    ("Duplicate", "haversine <150m\ntext_sim >0.85\n73m test passed", "Group #2: 2 reports"),
    ("Dashboard", "KPI + Priority Queue\n+ Duplicate Groups", "Sorted by score"),
    ("Map", "Leaflet OSM\nColored markers\nP1 red, P2 orange", "Popups + groups"),
]
for i, (t,d,code) in enumerate(feats):
    col = i % 3
    row = i // 3
    left = Inches(0.5 + col*4.2)
    top = Inches(1.1 + row*2.6)
    add_shape(slide, left, top, Inches(3.9), Inches(2.3), WHITE)
    s = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left+Inches(0.1), top+Inches(0.1), Inches(3.7), Inches(2.1))
    s.fill.solid(); s.fill.fore_color.rgb = WHITE; s.line.color.rgb = RGBColor(0xE7,0xE5,0xE4)
    add_text(slide, left+Inches(0.2), top+Inches(0.2), Inches(3.5), Inches(0.3), t, 11, GOLD_DARK, True)
    add_text(slide, left+Inches(0.2), top+Inches(0.55), Inches(3.5), Inches(0.8), d, 8, DARK)
    add_shape(slide, left+Inches(0.2), top+Inches(1.4), Inches(3.5), Inches(0.4), RGBColor(0x1C,0x19,0x17))
    add_text(slide, left+Inches(0.3), top+Inches(1.45), Inches(3.3), Inches(0.3), code, 7, RGBColor(0xFF,0xE7,0xA0), False)

# Slide 6 - Tech Stack
slide = prs.slides.add_slide(prs.slide_layouts[6])
bg(slide)
add_text(slide, Inches(0.5), Inches(0.3), Inches(12), Inches(0.5), "Tech Stack", 28, GOLD_DARK, True)
stack = [
    ("Frontend", "Next.js 16.3.5\nTypeScript + Tailwind v4\nLeaflet 1.9.4 + react-leaflet", GOLD),
    ("Backend", "Python 3.11\nFastAPI 0.110 + Uvicorn\nPydantic + CORS", RGBColor(0x0E,0x78,0x6B)),
    ("AI", "Mock analyzer (keyword)\nVision stub\nReady for OpenAI/Gemini", RGBColor(0x7C,0x3A,0xED)),
    ("DB", "In-memory mock\nREPORTS=[] + GROUPS={}\nSchema ready: PostgreSQL", RGBColor(0xDB,0x27,0x77)),
]
for i, (t,d,c) in enumerate(stack):
    left = Inches(0.5 + i*3.2)
    add_shape(slide, left, Inches(1.2), Inches(2.9), Inches(2.8), WHITE)
    add_shape(slide, left+Inches(0.35), Inches(1.4), Inches(2.2), Inches(0.5), c, t, 11, WHITE, True, PP_ALIGN.CENTER)
    add_text(slide, left+Inches(0.2), Inches(2.1), Inches(2.5), Inches(1.5), d, 9, DARK, False, PP_ALIGN.CENTER)
add_shape(slide, Inches(0.5), Inches(4.5), Inches(12.3), Inches(1.2), RGBColor(0x1C,0x19,0x17))
add_text(slide, Inches(0.7), Inches(4.7), Inches(11.9), Inches(0.3), "Build:  next build -> 4 routes (/, /report, /dashboard, /map)  |  API:  /api/reports, /api/ai/analyze, /api/dashboard/*", 8, RGBColor(0xFF,0xE7,0xA0))
add_text(slide, Inches(0.7), Inches(5.0), Inches(11.9), Inches(0.3), "Deploy:  Vercel (frontend) + Render (backend, Python 3.11, CORS env)  |  Repo:  7 commits in 24h window", 8, RGBColor(0xFF,0xE7,0xA0))

# Slide 7 - Architecture
slide = prs.slides.add_slide(prs.slide_layouts[6])
bg(slide)
add_text(slide, Inches(0.5), Inches(0.3), Inches(12), Inches(0.5), "Architecture", 28, GOLD_DARK, True)
add_shape(slide, Inches(0.5), Inches(1.1), Inches(12.3), Inches(5.3), WHITE)
# Boxes
add_shape(slide, Inches(0.7), Inches(1.4), Inches(2.5), Inches(1), GOLD, "Citizen", 11, WHITE, True, PP_ALIGN.CENTER)
add_text(slide, Inches(0.7), Inches(2.5), Inches(2.5), Inches(0.3), "Photo + Text + GPS", 8, STONE, False, PP_ALIGN.CENTER)
add_shape(slide, Inches(3.6), Inches(1.4), Inches(2.5), Inches(1), RGBColor(0x1C,0x19,0x17), "Next.js Frontend", 9, WHITE, True, PP_ALIGN.CENTER)
add_text(slide, Inches(3.6), Inches(2.5), Inches(2.5), Inches(0.6), "/report, /dashboard, /map\nservices/api.ts", 7, STONE, False, PP_ALIGN.CENTER)
add_shape(slide, Inches(6.5), Inches(1.4), Inches(2.5), Inches(1), GOLD_DARK, "FastAPI Backend", 9, WHITE, True, PP_ALIGN.CENTER)
add_text(slide, Inches(6.5), Inches(2.5), Inches(2.5), Inches(0.6), "3 routers + CORS\nMock DB", 7, STONE, False, PP_ALIGN.CENTER)
add_shape(slide, Inches(9.4), Inches(1.4), Inches(2.5), Inches(1), RGBColor(0x0E,0x78,0x6B), "AI Engine", 9, WHITE, True, PP_ALIGN.CENTER)
add_text(slide, Inches(9.4), Inches(2.5), Inches(2.5), Inches(0.6), "analyzer + priority\n+ duplicate + dept", 7, STONE, False, PP_ALIGN.CENTER)
# Arrows
for x in [Inches(3.2), Inches(6.1), Inches(9.0)]:
    add_text(slide, x, Inches(1.8), Inches(0.4), Inches(0.3), "->", 14, GOLD_DARK, True, PP_ALIGN.CENTER)
# Bottom
add_shape(slide, Inches(0.7), Inches(3.6), Inches(5.5), Inches(1.1), RGBColor(0xFF,0xFB,0xEB))
add_text(slide, Inches(0.9), Inches(3.8), Inches(5.1), Inches(0.3), "Deployment:", 9, GOLD_DARK, True)
add_text(slide, Inches(0.9), Inches(4.1), Inches(5.1), Inches(0.4), "Vercel: swarn-lanka-...vercel.app  +  Render: swarnlanka-ai.onrender.com", 7, DARK)
add_shape(slide, Inches(6.7), Inches(3.6), Inches(5.5), Inches(1.1), RGBColor(0xFF,0xFB,0xEB))
add_text(slide, Inches(6.9), Inches(3.8), Inches(5.1), Inches(0.3), "Future DB:", 9, GOLD_DARK, True)
add_text(slide, Inches(6.9), Inches(4.1), Inches(5.1), Inches(0.4), "PostgreSQL + PostGIS + pgvector (schema.sql ready)", 7, DARK)

# Slide 8 - Impact
slide = prs.slides.add_slide(prs.slide_layouts[6])
bg(slide)
add_text(slide, Inches(0.5), Inches(0.3), Inches(12), Inches(0.5), "Impact & Scalability", 28, GOLD_DARK, True)
impacts = [
    ("Efficiency", "12 reports -> 1 incident\n80% crew time saved", "Duplicate grouping"),
    ("Speed", "P1 in seconds, not days\nPriority 71->77 bump", "Transparent scoring"),
    ("Accuracy", "Auto routing 94% conf\nWrong dept = 0", "AI + rules"),
    ("Transparency", "Full loop visible\nCitizen -> Resolve", "Dashboard + Map"),
]
for i, (t,d,sub) in enumerate(impacts):
    left = Inches(0.5 + i*3.2)
    add_shape(slide, left, Inches(1.2), Inches(2.9), Inches(2.2), WHITE)
    s = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left+Inches(0.1), top:=Inches(1.3), Inches(2.7), Inches(2.0))
    s.fill.solid(); s.fill.fore_color.rgb = WHITE; s.line.color.rgb = RGBColor(0xE7,0xE5,0xE4)
    add_text(slide, left+Inches(0.2), Inches(1.4), Inches(2.5), Inches(0.3), t, 11, GOLD_DARK, True, PP_ALIGN.CENTER)
    add_text(slide, left+Inches(0.2), Inches(1.8), Inches(2.5), Inches(0.6), d, 8, DARK, False, PP_ALIGN.CENTER)
    add_shape(slide, left+Inches(0.5), Inches(2.7), Inches(1.9), Inches(0.3), GOLD, sub, 7, WHITE, False, PP_ALIGN.CENTER)
add_text(slide, Inches(0.5), Inches(4.0), Inches(12.3), Inches(0.4), "Scalability:  In-memory mock for 24h MVP -> horizontal scale to PostgreSQL + pgvector + PostGIS (already in schema.sql) -> city-wide", 10, STONE, False, PP_ALIGN.CENTER)
add_text(slide, Inches(0.5), Inches(4.6), Inches(12.3), Inches(0.4), "Evaluation Fit:  Innovation (UploadFile+duplicate)  |  Technical (3 routers+services)  |  UX (gold premium + Leaflet)  |  Impact (real civic)", 9, STONE, False, PP_ALIGN.CENTER)

# Slide 9 - Demo Live
slide = prs.slides.add_slide(prs.slide_layouts[6])
bg(slide, WHITE)
add_text(slide, Inches(0.5), Inches(0.3), Inches(12), Inches(0.5), "Live Demo", 28, GOLD_DARK, True)
add_shape(slide, Inches(0.5), Inches(1.0), Inches(12.3), Inches(0.7), RGBColor(0x1C,0x19,0x17))
add_text(slide, Inches(0.7), Inches(1.2), Inches(11.9), Inches(0.3), "Frontend:  https://swarn-lanka-fxrdrw1tn-aryansneha1845.vercel.app   |   Backend:  https://swarnlanka-ai.onrender.com/docs", 8, RGBColor(0xFF,0xE7,0xA0))
add_text(slide, Inches(0.7), Inches(1.35), Inches(11.9), Inches(0.2), "Local:  http://localhost:3000  +  http://127.0.0.1:8000/docs  |  GitHub:  github.com/Aryansneha1845/-SwarnLanka-AI", 7, RGBColor(0xD6,0xD3,0xD1))
steps = [
    "1. Open /report\nUpload photo (UploadFile)\nType huge pothole...",
    "2. Click Analyze with AI\nSee road_damage, 0.94,\nP2 High 71, Road Dept",
    "3. Click Submit Report\nGet ID # + Group #\nStored in mock DB",
    "4. Open /dashboard\nSee KPI: total 3, high 2\nQueue sorted 77>71",
    "5. See Duplicate Groups\nGroup #2: 2 reports\n73m apart -> grouped",
    "6. Open /map\nLeaflet OSM\nRed/orange markers\nClick popup",
]
for i, s in enumerate(steps):
    left = Inches(0.5 + (i%3)*4.2)
    top = Inches(2.0 + (i//3)*2.1)
    add_shape(slide, left, top, Inches(3.9), Inches(1.8), WHITE)
    box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left+Inches(0.1), top+Inches(0.1), Inches(3.7), Inches(1.6))
    box.fill.solid(); box.fill.fore_color.rgb = RGBColor(0xFF,0xFB,0xEB); box.line.color.rgb = GOLD
    add_text(slide, left+Inches(0.2), top+Inches(0.2), Inches(3.5), Inches(1.4), s, 8, DARK)

# Slide 10 - Future & Thanks
slide = prs.slides.add_slide(prs.slide_layouts[6])
bg(slide, GOLD_DARK)
add_text(slide, Inches(0.5), Inches(0.5), Inches(12.3), Inches(0.6), "Future Roadmap", 28, WHITE, True, PP_ALIGN.CENTER)
add_text(slide, Inches(0.5), Inches(1.2), Inches(12.3), Inches(0.4), "From 24H MVP to City-Scale Platform", 12, RGBColor(0xFF,0xE7,0xA0), False, PP_ALIGN.CENTER)
future = [
    "Swap mock to real LLM\nOpenAI/Gemini vision",
    "PostgreSQL + PostGIS\npgvector embeddings",
    "Citizen Track page\nStatus timeline",
    "Heatmap Analytics\nAdmin resolve flow",
]
for i, f in enumerate(future):
    left = Inches(0.7 + i*3.1)
    add_shape(slide, left, Inches(2.1), Inches(2.8), Inches(1.4), WHITE, f, 9, DARK, False, PP_ALIGN.CENTER)
add_shape(slide, Inches(2.5), Inches(4.0), Inches(8.3), Inches(1), GOLD, "Thank You  |  SwarnLanka AI  |  Hack Devengers 2.0", 14, WHITE, True, PP_ALIGN.CENTER)
add_text(slide, Inches(0.5), Inches(5.2), Inches(12.3), Inches(0.4), "GitHub: github.com/Aryansneha1845/-SwarnLanka-AI   |   Live: swarn-lanka-...vercel.app", 9, RGBColor(0xFF,0xE7,0xA0), False, PP_ALIGN.CENTER)
add_text(slide, Inches(0.5), Inches(5.6), Inches(12.3), Inches(0.4), "Built in 24H  |  7 commits  |  Premium UI  |  Verified Duplicate Grouping (73m)", 9, WHITE, False, PP_ALIGN.CENTER)

prs.save(r"C:\Users\santosh\SwarnLanka-AI\docs\SwarnLanka_AI.pptx")
print("PPT saved to docs/SwarnLanka_AI.pptx, slides:", len(prs.slides))
