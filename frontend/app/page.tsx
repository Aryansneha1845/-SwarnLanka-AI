"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getStats } from "@/services/api";

export default function Home(){
  const [stats,setStats]=useState<any>(null);
  useEffect(()=>{
    getStats().then(setStats).catch(()=>{});
    const id=setInterval(()=> getStats().then(setStats).catch(()=>{}), 5000);
    return ()=>clearInterval(id);
  },[]);
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gold-gradient opacity-[0.06]"></div>
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-amber-300 rounded-full blur-3xl opacity-15"></div>
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-orange-300 rounded-full blur-3xl opacity-15"></div>
        <div className="relative max-w-7xl mx-auto px-8 py-20 sm:py-32">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border shadow-sm text-xs font-semibold text-amber-900">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Live • Hack Devengers 2.0
          </div>
          <h1 className="mt-8 text-5xl sm:text-6xl font-bold leading-[0.9] tracking-tight">
            <span className="gold-text">SwarnLanka AI</span><br/>
            <span className="text-stone-900">Smarter Cities.</span><br/>
            <span className="text-stone-500 font-light">Faster Action.</span>
          </h1>
          <p className="mt-6 max-w-xl text-xl text-stone-600 leading-relaxed">
            Citizen reports become clear actions. Photo, text and location flow into AI, then priority and routing.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/report" className="px-8 py-4 rounded-full bg-stone-900 text-white font-semibold hover:bg-black transition shadow-xl text-base">Report an Issue →</Link>
            <Link href="/dashboard" className="px-8 py-4 rounded-full bg-white border-2 font-semibold hover:bg-stone-50 transition text-base">View Dashboard</Link>
          </div>
          {stats && (
            <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg">
              <div className="bg-white/70 backdrop-blur rounded-2xl p-5 border shadow-sm text-center">
                <div className="text-3xl font-bold">{stats.total}</div>
                <div className="text-xs text-stone-500 uppercase tracking-widest mt-1">Reports</div>
              </div>
              <div className="bg-white/70 backdrop-blur rounded-2xl p-5 border shadow-sm text-center">
                <div className="text-3xl font-bold text-red-600">{stats.critical}</div>
                <div className="text-xs text-stone-500 uppercase tracking-widest mt-1">Critical</div>
              </div>
              <div className="bg-white/70 backdrop-blur rounded-2xl p-5 border shadow-sm text-center">
                <div className="text-3xl font-bold text-amber-600">{stats.duplicate_groups}</div>
                <div className="text-xs text-stone-500 uppercase tracking-widest mt-1">Groups</div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 -mt-8">
        <div className="rounded-3xl overflow-hidden border bg-black shadow-2xl">
          <video poster="/brag.jpg" src="/brag.mp4" muted loop playsInline autoPlay controls className="w-full aspect-video object-cover"></video>
        </div>
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold">How it works</h2>
            <p className="text-stone-600 mt-3 leading-relaxed">One flow. Photo in, action out. No separate tools.</p>
            <div className="mt-6 space-y-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center shrink-0 text-sm font-bold">1</div>
                <div><div className="font-semibold">Report</div><div className="text-sm text-stone-600">Upload + location</div></div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 text-sm font-bold">2</div>
                <div><div className="font-semibold">AI</div><div className="text-sm text-stone-600">Category + priority</div></div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white border flex items-center justify-center shrink-0 text-sm font-bold">3</div>
                <div><div className="font-semibold">Resolve</div><div className="text-sm text-stone-600">Queue + map</div></div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            <Link href="/report" className="group rounded-3xl border bg-white p-8 hover:shadow-xl transition">
              <div className="w-14 h-14 rounded-2xl bg-stone-900 text-white flex items-center justify-center text-xl group-hover:scale-105 transition">↗</div>
              <h3 className="mt-6 text-xl font-bold">Report</h3>
              <p className="text-stone-600 mt-2">Photo, text, GPS. See AI preview before you submit.</p>
              <span className="inline-block mt-4 text-sm font-semibold text-amber-700">Open →</span>
            </Link>
            <Link href="/dashboard" className="group rounded-3xl border bg-white p-8 hover:shadow-xl transition">
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl group-hover:scale-105 transition">◎</div>
              <h3 className="mt-6 text-xl font-bold">Dashboard</h3>
              <p className="text-stone-600 mt-2">Live queue and groups. Updates every 5s.</p>
              <span className="inline-block mt-4 text-sm font-semibold text-amber-700">Open →</span>
            </Link>
          </div>
        </div>
      </section>
      <div className="h-16"></div>
    </div>
  );
}
