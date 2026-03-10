"use client";

import React, { useEffect, useState } from "react";
import { TacticalCard } from "../tactical/Card";
import { MapPin } from "lucide-react";
import dynamic from "next/dynamic";

// Leaflet CSS needs to be imported securely
import "leaflet/dist/leaflet.css";

// Dynamic import for React Leaflet to avoid SSR window issues
const MapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    { ssr: false, loading: () => <div className="h-full w-full bg-tactical-950 animate-pulse" /> }
);
const TileLayer = dynamic(
    () => import("react-leaflet").then((mod) => mod.TileLayer),
    { ssr: false }
);

// We need to import hooks normally, but only use them inside components rendered in MapContainer
import { useMap } from "react-leaflet";
const Popup = dynamic(
    () => import("react-leaflet").then((mod) => mod.Popup),
    { ssr: false }
);
const CircleMarker = dynamic(
    () => import("react-leaflet").then((mod) => mod.CircleMarker),
    { ssr: false }
);
const GeoJSON = dynamic(
    () => import("react-leaflet").then((mod) => mod.GeoJSON),
    { ssr: false }
);

const COORDINATE_MAP: Record<string, [number, number]> = {
    "IR": [32.0, 53.0],
    "US": [37.0, -95.0],
    "AU": [-25.0, 133.0],
    "CN": [35.0, 105.0],
    "IN": [20.5, 78.9],
    "GB": [55.3, -3.4],
    "RU": [61.5, 105.3],
    "ID": [-0.78, 113.9],
    "UA": [48.3, 31.1],
    "DE": [51.1, 10.4],
    "JP": [36.2, 138.2],
    "TR": [38.9, 35.2],
    "SY": [34.8, 38.9],
    "IQ": [33.2, 43.6],
    "PK": [30.3, 69.3],
    "TW": [23.6, 120.9],
    "PS": [31.9, 35.2],
};

const ASSET_COLORS: Record<string, string> = {
    "Drones": "#ff003c",
    "Missile": "#ff3300",
    "Aircraft": "#ffff00",
    "Nuclear": "#33ff00",
    "Warship": "#00ffff",
    "Oil": "#ff00ff",
    "Undersea Cables": "#0000ff",
    "Cyber": "#ffffff",
};

interface TacticalMapProps {
    events?: any[];
    height?: string;
}

const MapAutoZoom = ({ pos }: { pos: [number, number] | null }) => {
    const map = useMap();
    useEffect(() => {
        if (pos) map.setView(pos, 6, { animate: true });
    }, [pos, map]);
    return null;
};

export function TacticalMap({ events = [], height = "500px" }: TacticalMapProps) {
    const [mounted, setMounted] = useState(false);
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [availableTopics, setAvailableTopics] = useState<string[]>([]);
    const [zoomTo, setZoomTo] = useState<[number, number] | null>(null);

    useEffect(() => {
        setMounted(true);
        import("leaflet").then((L) => {
            delete (L.Icon.Default.prototype as any)._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
                iconUrl: require("leaflet/dist/images/marker-icon.png"),
                shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
            });
        });
    }, []);

    useEffect(() => {
        const topics = new Set<string>();
        events.forEach(e => {
            if (e.Topics) e.Topics.split(',').forEach((t: string) => topics.add(t.trim()));
        });
        const topicList = Array.from(topics).filter(Boolean);
        setAvailableTopics(topicList);
        setSelectedTopics(topicList); // Default all checked
    }, [events]);

    const toggleTopic = (topic: string) => {
        setSelectedTopics(prev =>
            prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
        );
    };

    const getPinColor = (assetStr: string) => {
        const assets = assetStr.split(',').map(a => a.trim());
        for (const a of assets) {
            if (ASSET_COLORS[a]) return ASSET_COLORS[a];
        }
        return "#00f3ff"; // Default cyan
    };

    if (!mounted) {
        return (
            <TacticalCard
                title="Tactical Mapping"
                icon={<MapPin size={16} />}
                glow="blue"
                className="w-full h-full min-h-[500px]"
            >
                <div className="w-full h-full flex items-center justify-center text-tactical-500 font-mono">
                    <span className="animate-pulse tracking-[0.5em]">SCANNING SECTOR...</span>
                </div>
            </TacticalCard>
        );
    }

    const filteredEvents = events.filter(evt => {
        const evtTopics = (evt.Topics || "").split(',').map((t: string) => t.trim());
        return evtTopics.some((t: string) => selectedTopics.includes(t)) || (evtTopics.length === 1 && evtTopics[0] === "" && selectedTopics.length === availableTopics.length);
    });

    return (
        <TacticalCard
            title="Tactical Mapping"
            icon={<MapPin size={16} />}
            glow="blue"
            className="w-full h-full min-h-[500px] relative"
        >
            <style jsx global>{`
                @keyframes pulse-ring {
                    0% { transform: scale(0.33); opacity: 0; }
                    80%, 100% { transform: scale(3); opacity: 0; }
                }
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-3px); }
                    100% { transform: translateY(0px); }
                }
                .tactical-pulse {
                    position: relative;
                }
                .tactical-pulse::after {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    border-radius: 50%;
                    background-color: currentColor;
                    animation: pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
                    pointer-events: none;
                }
                .leaflet-interactive {
                    transition: all 0.3s ease;
                    animation: float 3s ease-in-out infinite;
                }
            `}</style>

            <div className="w-full h-full min-h-[500px] rounded-sm overflow-hidden z-0 isolate">
                <MapContainer
                    center={[20, 20]}
                    zoom={2}
                    zoomControl={false}
                    style={{ height: "500px", width: "100%", background: "#050505" }}
                >
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        attribution='&copy; CARTO'
                    />

                    {/* Threat Area Highlighting */}
                    {Object.entries(COORDINATE_MAP).map(([code, pos]) => {
                        const density = events.filter(e => e.Geocode?.includes(code)).length;
                        if (density >= 20) { // HIGH/MAJOR threshold from CountryStatus
                            return (
                                <CircleMarker
                                    key={`threat-${code}`}
                                    center={pos}
                                    radius={40}
                                    pathOptions={{
                                        fillColor: '#ff0000',
                                        fillOpacity: 0.15,
                                        color: '#ff0000',
                                        weight: 1,
                                        dashArray: '5, 5'
                                    }}
                                    interactive={false}
                                />
                            );
                        }
                        return null;
                    })}

                    {filteredEvents.map((evt, idx) => {
                        const codes = (evt.Geocode || "").split(',').map((c: string) => c.trim());
                        return codes.map(code => {
                            let pos = COORDINATE_MAP[code];
                            if (!pos) return null;

                            // Coordinate Jitter to avoid stacking
                            const jitter = (idx * 0.05) % 0.5;
                            const jitteredPos: [number, number] = [pos[0] + jitter, pos[1] + jitter];

                            const color = getPinColor(evt.Assets || evt.Topics);

                            // Scale pin size based on data density (mocking logic since we don't have counts per location easily available in this loop)
                            const density = events.filter(e => e.Geocode?.includes(code)).length;
                            const radius = 4 + Math.min(density * 1.5, 12);

                            return (
                                <CircleMarker
                                    key={`${idx}-${code}`}
                                    center={jitteredPos}
                                    radius={radius}
                                    color={color}
                                    fillColor={color}
                                    fillOpacity={0.6 + (density * 0.05)}
                                    weight={2}
                                    className="tactical-pulse"
                                    eventHandlers={{
                                        click: () => setZoomTo(jitteredPos)
                                    }}
                                >
                                    <Popup className="tactical-popup">
                                        <div className="bg-tactical-950 p-2 border border-tactical-700 text-tactical-200 font-mono text-xs w-64">
                                            <div className="flex justify-between items-center mb-1 border-b border-tactical-800 pb-1">
                                                <span className="text-[10px] font-bold uppercase tracking-tighter" style={{ color }}>
                                                    {evt.Assets || "INTEL_SOURCE"}
                                                </span>
                                                <span className="text-[9px] text-tactical-500 uppercase">
                                                    {evt.Country}
                                                </span>
                                            </div>
                                            <div className="leading-tight mt-1 uppercase text-[11px] font-bold">
                                                {evt.Title}
                                            </div>
                                            <div className="mt-2 text-[9px] text-neon-blue border-t border-tactical-800 pt-1">
                                                TOPICS: {evt.Topics || "N/A"}
                                            </div>
                                            <div className="mt-1 text-[8px] text-tactical-600 truncate">
                                                URL: {evt.Url}
                                            </div>
                                        </div>
                                    </Popup>
                                </CircleMarker>
                            );
                        });
                    })}
                </MapContainer>
            </div>

            {/* TOPIC FILTER PANEL */}
            <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 max-h-[300px] overflow-y-auto w-48 no-scrollbar">
                <div className="bg-tactical-950/90 border border-tactical-800 p-3 backdrop-blur-sm text-[10px]">
                    <div className="text-neon-blue font-bold mb-2 border-b border-tactical-800 pb-1 flex justify-between">
                        <span>TOPIC_FILTERS</span>
                        <span className="opacity-50 tracking-tighter">[{selectedTopics.length}/{availableTopics.length}]</span>
                    </div>
                    <div className="space-y-1.5">
                        {availableTopics.map(topic => (
                            <label key={topic} className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={selectedTopics.includes(topic)}
                                    onChange={() => toggleTopic(topic)}
                                    className="appearance-none w-2.5 h-2.5 border border-tactical-600 checked:bg-neon-blue checked:border-neon-blue transition-all"
                                />
                                <span className={`uppercase tracking-tighter transition-colors ${selectedTopics.includes(topic) ? 'text-tactical-200' : 'text-tactical-600'}`}>
                                    {topic}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* ASSET LEGEND */}
            <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-1 pointer-events-none uppercase">
                <div className="bg-tactical-950/90 border border-tactical-800 p-2 px-3 backdrop-blur-sm text-[9px] grid grid-cols-2 gap-x-4 gap-y-1">
                    {Object.entries(ASSET_COLORS).map(([asset, color]) => (
                        <div key={asset} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                            <span className="text-tactical-400">{asset}</span>
                        </div>
                    ))}
                </div>
            </div>
        </TacticalCard>
    );
}

// Wrapper for the overlay to avoid mixing logic
function TacticalMapCardOverlay({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
