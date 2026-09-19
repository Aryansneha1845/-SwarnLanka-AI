const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export type Report = {
  id: number;
  description: string;
  latitude?: number | null;
  longitude?: number | null;
  image_url?: string | null;
  category: string;
  confidence: number;
  severity: number;
  priority_score: number;
  priority_level: string;
  department: string;
  status: string;
  duplicate_group_id?: number | null;
  created_at: string;
};

export async function analyzeReport(payload: { description: string; latitude?: number | null; longitude?: number | null }) {
  const res = await fetch(`${API}/api/ai/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("analyze failed");
  return res.json();
}

export async function createReport(form: FormData): Promise<Report> {
  const res = await fetch(`${API}/api/reports/`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getReports() {
  const res = await fetch(`${API}/api/reports/`, { cache: "no-store" });
  if (!res.ok) throw new Error("get reports failed");
  return res.json();
}

export async function getStats() {
  const res = await fetch(`${API}/api/dashboard/stats`, { cache: "no-store" });
  if (!res.ok) throw new Error("get stats failed");
  return res.json();
}

export async function getPriorityQueue() {
  const res = await fetch(`${API}/api/dashboard/priority-queue`, { cache: "no-store" });
  if (!res.ok) throw new Error("get queue failed");
  return res.json();
}

export async function getDuplicateGroups() {
  const res = await fetch(`${API}/api/dashboard/duplicate-groups`, { cache: "no-store" });
  if (!res.ok) throw new Error("get groups failed");
  return res.json();
}
