"use client";
import { useEffect, useState } from "react";
import { getStats, getPriorityQueue, getDuplicateGroups } from "@/services/api";

export default function DashboardPage(){
  const [stats,setStats]=useState<any>(null);
  const [queue,setQueue]=useState<any[]>([]);
  const [groups,setGroups]=useState<any[]>([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const [live,setLive]=useState(true);

  const load=async()=>{
    try{
      const [s,q,g]=await Promise.all([getStats(), getPriorityQueue(), getDuplicateGroups()]);
      setStats(s); setQueue(q.queue||[]); setGroups(g.groups||[]);
    }catch(e:any){ setError(e.message); }
    finally{ setLoading(false); }
  };
  useEffect(()=>{
    load();
    if(!live) return;
    const id=setInterval(load, 4000);
    return ()=>clearInterval(id);
  },[live]);

  const levelColor=(lvl:string)=>{
    if(lvl==="P1 Critical") return "bg-red-500 text-white";
    if(lvl==="P2 High") return "bg-orange-500 text-white";
    if(lvl==="P3 Medium") return "bg-amber-400 text-stone-900";
    return "bg-emerald-500 text-white";
  };

  if(loading) return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="h-8 w-64 bg-stone-200 rounded animate-pulse"></div>
      <div className="mt-8 grid grid-cols-4 gap-6">
        {[1,2,3,4].map(i=><div key={i} className="h-28 bg-white border rounded-3xl animate-pulse"></div>)}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="flex flex-wrap justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-stone-600 mt-2">Live priority and groups. Updates automatically.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={()=>setLive(!live)} className={`px-4 py-2 rounded-full text-sm font-semibold border ${live?"bg-green-50 border-green-200 text-green-700":"bg-white"}`}>
            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${live?"bg-green-500 animate-pulse":"bg-stone-400"}`}></span>
            {live?"Live":"Paused"}
          </button>
          <button onClick={load} className="px-6 py-3 rounded-full bg-stone-900 text-white font-semibold hover:bg-black">Refresh</button>
        </div>
      </div>

      {error && <p className="mt-6 text-red-600 bg-red-50 border border-red-200 rounded-xl p-4">{error}</p>}

      {stats && (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl border p-8">
            <div className="text-xs uppercase tracking-widest text-stone-500">Reports</div>
            <div className="text-4xl font-bold mt-2">{stats.total}</div>
            <div className="text-sm text-stone-500 mt-1">Total received</div>
          </div>
          <div className="bg-stone-900 text-white rounded-3xl p-8">
            <div className="text-xs uppercase tracking-widest opacity-60">Critical</div>
            <div className="text-4xl font-bold mt-2">{stats.critical}</div>
            <div className="text-sm opacity-60 mt-1">{stats.critical>0?"Needs action":"All clear"}</div>
          </div>
          <div className="bg-white rounded-3xl border p-8">
            <div className="text-xs uppercase tracking-widest text-stone-500">High</div>
            <div className="text-4xl font-bold mt-2">{stats.high}</div>
            <div className="text-sm text-stone-500 mt-1">P2 priority</div>
          </div>
          <div className="bg-amber-50 rounded-3xl border border-amber-200 p-8">
            <div className="text-xs uppercase tracking-widest text-amber-800">Groups</div>
            <div className="text-4xl font-bold mt-2">{stats.duplicate_groups}</div>
            <div className="text-sm text-amber-800/70 mt-1">12 → 1 incident</div>
          </div>
        </div>
      )}

      <div className="mt-12 grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <h2 className="text-xl font-bold">Priority Queue</h2>
          <p className="text-sm text-stone-500">Highest score first</p>
          <div className="mt-6 space-y-3">
            {queue.length===0 ? <div className="bg-white rounded-3xl border p-12 text-center text-stone-500">No reports yet. Go to Report.</div> :
              queue.map((r:any)=>(
                <div key={r.id} className="bg-white rounded-3xl border p-6 flex gap-5 hover:shadow-lg transition">
                  <div className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold h-fit ${levelColor(r.priority_level)}`}>{r.priority_level.split(" ")[0]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{r.category}</div>
                    <div className="text-sm text-stone-600 truncate">{r.description}</div>
                    <div className="text-xs text-stone-500 mt-1">{r.department} • ID #{r.id}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{r.priority_score}</div>
                    <div className="text-xs text-stone-500">G#{r.duplicate_group_id}</div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold">Duplicate Groups</h2>
          <p className="text-sm text-stone-500">Within 150m</p>
          <div className="mt-6 space-y-4">
            {groups.length===0 ? <div className="bg-white rounded-3xl border p-12 text-center text-stone-500">No groups</div> :
              groups.map((g:any)=>(
                <div key={g.group_id} className="bg-white rounded-3xl border p-6">
                  <div className="flex justify-between">
                    <span className="font-bold">Group #{g.group_id}</span>
                    <span className="text-xs bg-stone-900 text-white px-3 py-1 rounded-full font-bold">{g.count}</span>
                  </div>
                  <div className="text-sm mt-3 line-clamp-2">{g.representative.description}</div>
                  <div className="text-xs text-stone-500 mt-1">{g.representative.priority_level} • {g.representative.priority_score}</div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}
