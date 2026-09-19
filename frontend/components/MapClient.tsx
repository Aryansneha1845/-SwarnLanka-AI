"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons for Next.js
// @ts-ignore
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function colorForLevel(level: string) {
  if (level === "P1 Critical") return "#ef4444";
  if (level === "P2 High") return "#f97316";
  if (level === "P3 Medium") return "#f59e0b";
  return "#10b981";
}

function makeIcon(level: string) {
  const color = colorForLevel(level);
  return L.divIcon({
    html: `<div style="background:${color};width:18px;height:18px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>`,
    className: "",
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

export default function MapClient({ reports }: { reports: any[] }) {
  const valid = reports.filter((r) => r.latitude != null && r.longitude != null);
  const center: [number, number] = valid.length
    ? [valid[0].latitude, valid[0].longitude]
    : [20.5937, 78.9629]; // India center fallback

  return (
    <MapContainer center={center} zoom={valid.length ? 13 : 5} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {valid.map((r) => (
        <Marker key={r.id} position={[r.latitude, r.longitude]} icon={makeIcon(r.priority_level)}>
          <Popup>
            <div style={{ minWidth: 160 }}>
              <b>{r.category}</b> <span style={{ color: colorForLevel(r.priority_level) }}>({r.priority_level})</span>
              <div style={{ fontSize: 12, color: "#555" }}>{r.description.slice(0, 80)}</div>
              <div style={{ fontSize: 12 }}>Priority: {r.priority_score} | Dept: {r.department}</div>
              <div style={{ fontSize: 12 }}>Group #{r.duplicate_group_id} | ID #{r.id}</div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
