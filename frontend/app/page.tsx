import Link from "next/link";

export default function Home(){
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gold-gradient opacity-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-300 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-300 rounded-full blur-3xl opacity-20"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-16 sm:py-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">Hack Devengers 2.0 - Live</div>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
            <span className="gold-text">SwarnLanka AI</span><br/>
            <span className="text-stone-900">Smarter Cities.</span><br/>
            <span className="text-stone-700">Faster Action.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-stone-600">
            AI-powered civic intelligence that transforms citizen reports into verified, prioritized and actionable incidents. Vision + NLP + Geospatial + Duplicate Detection.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/report" className="px-7 py-3 rounded-full bg-stone-900 text-white font-semibold hover:bg-black transition shadow-lg">Report an Issue</Link>
            <Link href="/dashboard" className="px-7 py-3 rounded-full bg-white border font-semibold hover:bg-stone-50 transition">Authority Dashboard</Link>
            <Link href="/report" className="px-7 py-3 rounded-full bg-amber-100 text-amber-900 font-semibold hover:bg-amber-200 transition">Explore Map</Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-6 text-sm">
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"></span>AI Analysis Online</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span>Priority Engine Active</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500"></span>Duplicate Detection ON</span>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 -mt-6">
        <div className=" rounded-2xl overflow-hidden border bg-black shadow-lg">
          <video poster="/brag.jpg" src="/brag.mp4" muted loop playsInline autoPlay controls className="w-full aspect-video object-cover"></video>
          <div className="p-3 flex flex-wrap justify-between items-center text-xs text-stone-600 bg-white">
            <span>SwarnLanka AI — 20s Launch Video (polished, Happy Beats) — brag.mp4</span>
            <a href="/brag.mp4" download className="font-semibold text-amber-700 hover:text-amber-800">Download brag.mp4</a>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="glass rounded-2xl p-6 card-hover">
            <div className="text-sm text-stone-500">Workflow</div>
            <div className="mt-2 font-semibold">Report -&gt; AI -&gt; Verify -&gt; Priority -&gt; Route -&gt; Resolve</div>
            <div className="mt-2 text-sm text-stone-600">Complete loop in seconds, not days</div>
          </div>
          <div className="glass rounded-2xl p-6 card-hover">
            <div className="text-sm text-stone-500">Tech Stack</div>
            <div className="mt-2 font-semibold">Next.js + FastAPI + AI Mock</div>
            <div className="mt-2 text-sm text-stone-600">Vision & NLP with priority scoring</div>
          </div>
          <div className="glass rounded-2xl p-6 card-hover">
            <div className="text-sm text-stone-500">Impact</div>
            <div className="mt-2 font-semibold">P1-P4 Priority + Auto Routing</div>
            <div className="mt-2 text-sm text-stone-600">12 reports -&gt; 1 incident (dedup)</div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 mt-8 grid sm:grid-cols-2 gap-4">
        <Link href="/report" className="rounded-2xl border bg-white p-6 card-hover block">
          <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center">+</div>
          <div className="mt-3 font-semibold">Citizen Report Flow</div>
          <div className="text-sm text-stone-600">Upload photo (UploadFile) + description + location -&gt; AI preview -&gt; submit</div>
          <div className="mt-3 text-sm font-medium text-amber-700">Try Report -&gt;</div>
        </Link>
        <Link href="/dashboard" className="rounded-2xl border bg-white p-6 card-hover block">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center">#</div>
          <div className="mt-3 font-semibold">Authority Command Center</div>
          <div className="text-sm text-stone-600">KPI cards + Priority Queue + Duplicate Groups + Map</div>
          <div className="mt-3 text-sm font-medium text-amber-700">Open Dashboard -&gt;</div>
        </Link>
      </section>
    </div>
  );
}

{/* test: strix CI gate verification - ignore */}

