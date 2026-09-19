"use client";
import { useState } from "react";
import { analyzeReport, createReport } from "@/services/api";

export default function ReportPage(){
  const [description,setDescription]=useState("");
  const [latitude,setLatitude]=useState("");
  const [longitude,setLongitude]=useState("");
  const [file,setFile]=useState<File|null>(null);
  const [preview,setPreview]=useState<string|null>(null);
  const [ai,setAi]=useState<any>(null);
  const [loading,setLoading]=useState(false);
  const [submitted,setSubmitted]=useState<any>(null);
  const [error,setError]=useState("");

  const useLocation=()=>{
    navigator.geolocation.getCurrentPosition((pos)=>{
      setLatitude(String(pos.coords.latitude));
      setLongitude(String(pos.coords.longitude));
    },()=>setError("Location permission denied"));
  };
  const onFileChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const f=e.target.files?.[0]||null; setFile(f);
    if(f) setPreview(URL.createObjectURL(f)); else setPreview(null);
  };
  const handleAnalyze=async()=>{
    setError(""); setLoading(true); setAi(null);
    try{
      const data=await analyzeReport({description, latitude: latitude?parseFloat(latitude):null, longitude: longitude?parseFloat(longitude):null});
      setAi(data);
    }catch(e:any){ setError(e.message);} finally{ setLoading(false);}
  };
  const handleSubmit=async()=>{
    setError(""); setLoading(true); setSubmitted(null);
    try{
      const form=new FormData(); form.append("description",description);
      if(latitude) form.append("latitude",latitude);
      if(longitude) form.append("longitude",longitude);
      if(file) form.append("image",file);
      const data=await createReport(form); setSubmitted(data);
    }catch(e:any){ setError(e.message);} finally{ setLoading(false);}
  };

  return (
    <div className="max-w-5xl mx-auto px-8 py-12">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Report</h1>
        <p className="text-stone-600 mt-2 text-lg">Photo, description and location. AI does the rest.</p>
      </div>

      <div className="mt-10 grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-3xl border p-8">
            <div className="text-sm font-semibold">Photo</div>
            <p className="text-xs text-stone-500 mt-1">UploadFile — actual file, not URL</p>
            <label className="mt-4 flex flex-col items-center justify-center border-2 border-dashed rounded-3xl p-10 cursor-pointer hover:bg-amber-50/50 transition min-h-[280px]">
              <input type="file" accept="image/*" onChange={onFileChange} className="hidden" />
              {preview ? <img src={preview} alt="preview" className="max-h-64 rounded-2xl object-cover w-full"/> :
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto text-2xl">+</div>
                  <div className="font-medium mt-3">Drop photo here</div>
                  <div className="text-sm text-stone-500">or click to browse</div>
                </div>
              }
            </label>
          </div>

          <div className="bg-white rounded-3xl border p-8">
            <div className="text-sm font-semibold">Tell us what you see</div>
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Huge pothole near college gate, water is leaking..." className="mt-4 w-full min-h-[140px] p-4 rounded-2xl border text-base focus:outline-none focus:ring-2 focus:ring-amber-300" />
            <div className="mt-6 grid grid-cols-2 gap-4">
              <input value={latitude} onChange={(e)=>setLatitude(e.target.value)} placeholder="Latitude" className="p-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-amber-300" />
              <input value={longitude} onChange={(e)=>setLongitude(e.target.value)} placeholder="Longitude" className="p-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-amber-300" />
            </div>
            <button onClick={useLocation} className="mt-4 w-full py-3 rounded-2xl border-2 font-semibold hover:bg-stone-50">Use Current Location</button>
            <button onClick={handleAnalyze} disabled={loading||!description} className="mt-6 w-full py-4 rounded-2xl bg-stone-900 text-white text-lg font-semibold hover:bg-black disabled:opacity-50 transition">
              {loading ? "Analyzing..." : "Analyze with AI →"}
            </button>
            {error && <p className="text-red-600 text-sm mt-4 bg-red-50 border border-red-200 rounded-xl p-3">{error}</p>}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="sticky top-24 space-y-6">
            {!ai && !submitted && (
              <div className="bg-amber-50 rounded-3xl border border-amber-200 p-8">
                <div className="w-12 h-12 rounded-2xl bg-white border flex items-center justify-center">◐</div>
                <h3 className="font-bold mt-4">AI preview will appear here</h3>
                <p className="text-sm text-stone-600 mt-2 leading-relaxed">We show category, severity, department and priority before you submit. No surprises.</p>
              </div>
            )}
            {ai && (
              <div className="bg-white rounded-3xl border shadow-sm p-8">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold">AI Analysis</h3>
                  <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-bold">{(ai.confidence*100).toFixed(0)}%</span>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div><div className="text-xs uppercase tracking-widest text-stone-500">Category</div><div className="font-bold mt-1 capitalize text-lg">{ai.category}</div></div>
                  <div><div className="text-xs uppercase tracking-widest text-stone-500">Severity</div><div className="font-bold mt-1 text-lg">{ai.severity} / 4</div></div>
                </div>
                <div className="mt-6 bg-stone-900 text-white rounded-3xl p-6">
                  <div className="text-xs uppercase tracking-widest opacity-60">Priority</div>
                  <div className="flex justify-between items-end mt-2">
                    <div className="text-4xl font-bold">{ai.priority_score}</div>
                    <div className="text-right"><div className="font-bold">{ai.priority_level}</div><div className="text-xs opacity-60">{ai.department}</div></div>
                  </div>
                </div>
                <p className="text-sm text-stone-600 mt-4 leading-relaxed">{ai.summary}</p>
                <button onClick={handleSubmit} disabled={loading} className="mt-6 w-full py-4 rounded-2xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition">Submit Report</button>
              </div>
            )}
            {submitted && (
              <div className="bg-emerald-600 text-white rounded-3xl p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-white text-emerald-600 flex items-center justify-center mx-auto text-2xl">✓</div>
                <h3 className="font-bold text-xl mt-4">Submitted #{submitted.id}</h3>
                <p className="text-emerald-100 mt-2">{submitted.priority_level} • {submitted.priority_score} • Group #{submitted.duplicate_group_id}</p>
                <p className="text-sm text-emerald-100 mt-1">{submitted.department}</p>
                <a href="/dashboard" className="inline-block mt-6 px-6 py-3 rounded-full bg-white text-emerald-700 font-bold">View Dashboard →</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
