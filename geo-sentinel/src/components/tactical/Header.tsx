"use client";

import React, { useState, useEffect } from "react";
import { ShieldAlert, Clock } from "lucide-react";

interface HeaderProps {
    timeFilter: number;
    onTimeFilterChange: (hours: number) => void;
    currentTime: Date;
}

export function Header({ timeFilter, onTimeFilterChange, currentTime }: HeaderProps) {
    const timeStr = currentTime.toISOString().split("T")[1].split(".")[0] + " Z";

    const FILTER_OPTIONS = [1, 5, 10, 15, 20, 24];

    return (
        <header className="flex col-span-1 md:col-span-4 lg:col-span-12 items-center justify-between border-b border-tactical-800 pb-2 mb-2 bg-tactical-950/80 p-2 rounded-sm z-10 backdrop-blur-md">
            <div className="flex items-center gap-4">
                <ShieldAlert className="w-10 h-10 text-neon-red animate-[pulse_1s_ease-in-out_infinite]" />
                <div>
                    <h1 className="text-4xl font-retro text-neon-red text-glow-red tracking-widest uppercase m-0 leading-none">
                        GEO-SENTINEL | Tim Analisis Intelijen
                    </h1>
                    <p className="text-xs font-mono text-tactical-500 uppercase tracking-[0.3em]">
                        Strategic Monitoring Room
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-8">
                {/* Time Filter Dropdown */}
                <div className="flex flex-col items-end">
                    <span className="text-[10px] text-tactical-500 uppercase tracking-widest mb-1 flex items-center gap-1">
                        <Clock size={10} /> Temporal Filter
                    </span>
                    <select
                        value={timeFilter}
                        onChange={(e) => onTimeFilterChange(Number(e.target.value))}
                        className="bg-tactical-900 border border-tactical-700 text-neon-blue font-mono text-[10px] px-2 py-0.5 rounded focus:outline-none focus:border-neon-blue transition-colors appearance-none cursor-pointer"
                    >
                        {FILTER_OPTIONS.map(h => (
                            <option key={h} value={h}>{h}H // WINDOW</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col items-end">
                    <span className="text-[10px] text-tactical-500 uppercase tracking-widest">System Status</span>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-neon-green shadow-[0_0_10px_rgba(0,255,102,0.8)] animate-pulse" />
                        <span className="text-neon-green font-mono text-sm">ONLINE // SECURE</span>
                    </div>
                </div>
                <div className="flex flex-col items-end font-mono">
                    <span className="text-[10px] text-tactical-500 uppercase tracking-widest">Current Time</span>
                    <span className="text-tactical-200 text-sm tracking-widest">{timeStr}</span>
                </div>
            </div>
        </header>
    );
}
