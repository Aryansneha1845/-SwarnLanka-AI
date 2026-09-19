"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { getReports } from "@/services/api";

const MapClient = dynamic(() => import("@/components/MapClient"), { ssr: false });

export default function MapPage(){
  const [reports,setReports]=useState<any[]>([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");

  const load=async()=>{
    setLoading(true); setError("");
    try{
      const data=await getReports();
      setReports(data.reports||[]);
    }catch(e:any){ setError(e.message); }
    finally{ setLoading(false); }
  };
  useEffect(()=>{ load(); },[]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex flex-wrap justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Civic Map</h1>
          <p className="text-stone-600">Leaflet + OpenStreetMap - priority-colored markers</p>
        </div>
        <button onClick={load} className="px-5 py-2.5 rounded-full bg-stone-900 text-white font-medium hover:bg-black">Refresh</button>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-xs">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500"></span> P1 Critical</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-orange-500"></span> P2 High</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500"></span> P3 Medium</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> P4 Low</span>
      </div>

      {loading && <p className="mt-4">Loading map...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      <div className="mt-6 rounded-2xl border overflow-hidden" style={{height: 520}}>
        {!loading && reports.length===0 ? (
          <div className="h-full flex items-center justify-center text-stone-500 p-8 text-center">
            No geotagged reports yet.<br/>Submit via Report page with latitude/longitude.
          </div>
        ) : (
          <MapClient reports={reports} />
        )}
      </div>

      <div className="mt-4 text-sm text-stone-600">
        {reports.filter((r:any)=>r.latitude!=null).length} geotagged reports on map. Click marker for details.
      </div>
    </div>
  );
}
