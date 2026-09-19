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
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Report Civic Issue</h1>
        <p className="text-stone-600 mt-2">UploadFile + AI Analysis + Priority Routing</p>
      </div>

      <div className="mt-8 bg-white rounded-2xl border shadow-sm p-6">
        <label className="text-sm font-semibold">Upload Image</label>
        <label className="mt-2 flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer hover:bg-amber-50/50 transition">
          <input type="file" accept="image/*" onChange={onFileChange} className="hidden" />
          {preview ? <img src={preview} alt="preview" className="max-h-56 rounded-xl object-cover"/> :
            <div className="text-center"><div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">+</div><div className="text-sm font-medium mt-2">Click to upload photo</div><div className="text-xs text-stone-500">JPG, PNG up to 5MB</div></div>
          }
        </label>

        <div className="mt-6">
          <label className="text-sm font-semibold">Description</label>
          <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Huge pothole near college gate, garbage overflow..." className="mt-2 w-full min-h-[100px] p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-300" />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <input value={latitude} onChange={(e)=>setLatitude(e.target.value)} placeholder="Latitude" className="p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-300" />
          <input value={longitude} onChange={(e)=>setLongitude(e.target.value)} placeholder="Longitude" className="p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-300" />
        </div>
        <button onClick={useLocation} className="mt-3 w-full py-2.5 rounded-xl border font-medium hover:bg-stone-50">Use Current Location</button>

        <button onClick={handleAnalyze} disabled={loading||!description} className="mt-4 w-full py-3 rounded-xl bg-stone-900 text-white font-semibold hover:bg-black disabled:opacity-50 transition">{loading?"Analyzing...":"Analyze with AI"}</button>
        {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
      </div>

      {ai && (
        <div className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-6">
          <h3 className="font-bold flex items-center gap-2">AI ANALYSIS <span className="text-xs bg-white border px-2 py-1 rounded-full">{(ai.confidence*100).toFixed(0)}% confidence</span></h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-3 border"><div className="text-xs text-stone-500">Category</div><div className="font-semibold capitalize">{ai.category}</div></div>
            <div className="bg-white rounded-xl p-3 border"><div className="text-xs text-stone-500">Severity</div><div className="font-semibold">{ai.severity} / 4</div></div>
            <div className="bg-white rounded-xl p-3 border"><div className="text-xs text-stone-500">Safety Risk</div><div className="font-semibold capitalize">{ai.safety_risk}</div></div>
            <div className="bg-white rounded-xl p-3 border"><div className="text-xs text-stone-500">Department</div><div className="font-semibold text-amber-800">{ai.department}</div></div>
          </div>
          <div className="mt-3 bg-stone-900 text-white rounded-xl p-4 flex justify-between items-center">
            <div><div className="text-xs text-stone-400">Priority Score</div><div className="text-2xl font-bold">{ai.priority_score}</div></div>
            <div className="text-right"><div className="text-xs text-stone-400">Level</div><div className="font-bold">{ai.priority_level}</div></div>
          </div>
          <p className="text-sm text-stone-600 mt-3">{ai.summary}</p>
          <button onClick={handleSubmit} disabled={loading} className="mt-4 w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition">Submit Report</button>
        </div>
      )}

      {submitted && (
        <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">✓</div>
          <h3 className="font-bold mt-2">Submitted ID #{submitted.id}</h3>
          <p className="text-sm text-stone-600">{submitted.priority_level} ({submitted.priority_score}) | Group #{submitted.duplicate_group_id} | {submitted.department}</p>
        </div>
      )}
    </div>
  );
}
