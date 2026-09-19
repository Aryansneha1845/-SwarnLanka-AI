"use client";
import { useEffect, useState } from "react";
import { getStats, getPriorityQueue, getDuplicateGroups } from "@/services/api";

export default function DashboardPage(){
  const [stats,setStats]=useState<any>(null);
  const [queue,setQueue]=useState<any[]>([]);
  const [groups,setGroups]=useState<any[]>([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");

  const load=async()=>{
    setLoading(true); setError("");
    try{
      const [s,q,g]=await Promise.all([getStats(), getPriorityQueue(), getDuplicateGroups()]);
      setStats(s); setQueue(q.queue||[]); setGroups(g.groups||[]);
    }catch(e:any){ setError(e.message); }
    finally{ setLoading(false); }
  };
  useEffect(()=>{ load(); },[]);

  const levelColor=(lvl:string)=>{
    if(lvl==="P1 Critical") return "bg-red-100 text-red-700 border-red-200";
    if(lvl==="P2 High") return "bg-orange-100 text-orange-700 border-orange-200";
    if(lvl==="P3 Medium") return "bg-amber-100 text-amber-700 border-amber-200";
    return "bg-emerald-100 text-emerald-700 border-emerald-200";
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Authority Dashboard</h1>
          <p className="text-stone-600">Priority Queue + Duplicate Groups + Live Stats</p>
        </div>
        <button onClick={load} className="px-5 py-2.5 rounded-full bg-stone-900 text-white font-medium hover:bg-black">Refresh</button>
      </div>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      {stats && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border p-5 card-hover"><div className="text-xs text-stone-500">Total Reports</div><div className="text-3xl font-bold mt-1">{stats.total}</div><div className="text-xs text-stone-500">All time</div></div>
          <div className="bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-2xl p-5"><div className="text-xs opacity-80">Critical P1</div><div className="text-3xl font-bold mt-1">{stats.critical}</div><div className="text-xs opacity-80">{stats.critical>0?"Needs immediate":"All clear"}</div></div>
          <div className="bg-white rounded-2xl border p-5 card-hover"><div className="text-xs text-stone-500">High P2</div><div className="text-3xl font-bold mt-1">{stats.high}</div><div className="text-xs text-stone-500">High priority</div></div>
          <div className="bg-white rounded-2xl border p-5 card-hover"><div className="text-xs text-stone-500">Duplicate Groups</div><div className="text-3xl font-bold mt-1">{stats.duplicate_groups}</div><div className="text-xs text-stone-500">12 reports = 1 incident</div></div>
        </div>
      )}

      <div className="mt-8 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-lg font-bold">Priority Queue</h2>
          <p className="text-sm text-stone-600">Sorted by priority_score desc - P1 first</p>
          <div className="mt-4 bg-white rounded-2xl border overflow-hidden">
            {queue.length===0 ? <p className="p-8 text-center text-stone-500">No reports yet. Submit via Report page.</p> :
              queue.map((r:any)=>(
                <div key={r.id} className="flex items-center gap-4 p-4 border-b last:border-0 hover:bg-stone-50">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold border ${levelColor(r.priority_level)}`}>{r.priority_level}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{r.category} <span className="text-stone-500">- {r.department}</span></div>
                    <div className="text-sm text-stone-600 truncate">{r.description}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xl font-bold">{r.priority_score}</div>
                    <div className="text-xs text-stone-500">ID #{r.id} | G#{r.duplicate_group_id}</div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold">Duplicate Groups</h2>
          <p className="text-sm text-stone-600">Reports grouped within 150m + 85% similarity</p>
          <div className="mt-4 space-y-3">
            {groups.length===0 ? <div className="bg-white rounded-2xl border p-8 text-center text-stone-500">No groups yet</div> :
              groups.map((g:any)=>(
                <div key={g.group_id} className="bg-white rounded-2xl border p-4 card-hover">
                  <div className="flex justify-between items-start">
                    <div className="font-bold">Group #{g.group_id}</div>
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-semibold">{g.count} reports</span>
                  </div>
                  <div className="text-sm mt-2"><span className="text-stone-500">Representative:</span> <span className="font-medium">{g.representative.description.slice(0,60)}</span></div>
                  <div className="text-xs mt-1">Priority {g.representative.priority_score} ({g.representative.priority_level})</div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {g.members.map((m:any)=>(
                      <span key={m.id} className="text-xs px-2 py-1 bg-stone-100 border rounded-full">#{m.id} {m.category} {m.priority_score}</span>
                    ))}
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}
