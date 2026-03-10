"use client";

import React from "react";
import { TacticalCard } from "./Card";
import { Shield } from "lucide-react";

interface CountryStatusProps {
    events: any[];
}

export function CountryStatus({ events }: CountryStatusProps) {
    // Aggregate events by country
    const counts: Record<string, number> = {};
    events.forEach(e => {
        if (e.Country) {
            e.Country.split(',').forEach((c: string) => {
                const country = c.trim();
                counts[country] = (counts[country] || 0) + 1;
            });
        }
    });

    const getStatus = (count: number) => {
        if (count >= 35) return { label: "CRITICAL", level: "MAJOR", color: "text-neon-red", border: "border-neon-red", bg: "bg-neon-red/10" };
        if (count >= 20) return { label: "ELEVATED", level: "HIGH", color: "text-neon-amber", border: "border-neon-amber", bg: "bg-neon-amber/10" };
        if (count >= 10) return { label: "CAUTION", level: "MEDIUM", color: "text-neon-green", border: "border-neon-green", bg: "bg-neon-green/10" };
        return { label: "NOMINAL", level: "LOW", color: "text-neon-blue", border: "border-neon-blue", bg: "bg-neon-blue/10" };
    };

    const countries = Object.entries(counts).sort((a, b) => b[1] - a[1]);

    return (
        <TacticalCard
            title="Sovereign Status Monitoring"
            icon={<Shield size={16} />}
            glow="blue"
            className="w-full h-full min-h-[200px]"
        >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {countries.length === 0 && (
                    <div className="col-span-full py-6 text-center text-[10px] text-tactical-600 font-mono italic animate-pulse">
                        INITIAIZING GEOPOLITICAL SCAN...
                    </div>
                )}
                {countries.map(([country, count]) => {
                    const status = getStatus(count);
                    return (
                        <div
                            key={country}
                            className={`p-2 border ${status.border} ${status.bg} backdrop-blur-sm relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300`}
                        >
                            {/* Scanning line animation */}
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20 animate-[scan_2s_linear_infinite]" />

                            <div className="flex justify-between items-start mb-1">
                                <span className="text-[10px] font-bold text-tactical-100 uppercase truncate pr-2">{country}</span>
                                <span className={`text-[8px] font-bold ${status.color}`}>[{count}]</span>
                            </div>

                            <div className="flex justify-between items-end">
                                <div className="flex flex-col">
                                    <span className="text-[8px] text-tactical-500 uppercase tracking-tighter">THREAD_LVL</span>
                                    <span className={`text-[10px] font-black tracking-widest ${status.color}`}>{status.level}</span>
                                </div>
                                <div className={`text-[7px] px-1 py-0.5 ${status.color} border ${status.border} animate-pulse`}>
                                    {status.label}
                                </div>
                            </div>

                            {/* Corner Accents */}
                            <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-white/20" />
                            <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-white/20" />
                        </div>
                    );
                })}
            </div>
        </TacticalCard>
    );
}
