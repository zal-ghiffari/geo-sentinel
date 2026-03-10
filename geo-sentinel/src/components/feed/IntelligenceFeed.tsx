"use client";

import React, { useState } from "react";
import { TacticalCard } from "../tactical/Card";
import { RadioReceiver, RefreshCw } from "lucide-react";

export interface IntelligenceFeedProps {
    events?: any[];
}

export function IntelligenceFeed({ events = [] }: IntelligenceFeedProps) {
    const [isScanning, setIsScanning] = useState(false);

    const handleScan = () => {
        setIsScanning(true);
        setTimeout(() => {
            setIsScanning(false);
        }, 2000);
    };

    return (
        <TacticalCard
            title="Intelligence Feed"
            icon={<RadioReceiver size={16} />}
            className="w-full h-full bg-tactical-900/40 flex-1"
            glow="blue"
            headerAction={
                <button
                    onClick={handleScan}
                    className={`text-tactical-500 hover:text-neon-blue transition-colors ${isScanning ? "animate-spin text-neon-blue" : ""
                        }`}
                >
                    <RefreshCw size={14} />
                </button>
            }
        >
            <div className="space-y-3">
                {events.length === 0 && (
                    <div className="text-center py-10 text-tactical-600 font-mono text-xs animate-pulse">
                        AWAITING INCOMING SIGNALS...
                    </div>
                )}
                {events.map((item, idx) => (
                    <div
                        key={idx}
                        className="border-l-2 border-tactical-700 hover:border-neon-blue pl-3 py-1 transition-colors group relative"
                    >
                        {isScanning && (
                            <div className="absolute inset-0 bg-neon-blue/5 animate-pulse rounded-sm pointer-events-none" />
                        )}
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-[10px] text-tactical-500 font-bold uppercase tracking-widest">
                                {item.Source || "UNKNOWN"} // {item.Media || "MEDIA_XT"}
                            </span>
                            <span
                                className={`text-[9px] px-1 bg-tactical-800 uppercase ${item.Topics?.toLowerCase().includes('crisis') || item.Topics?.toLowerCase().includes('war')
                                        ? "text-neon-red"
                                        : "text-neon-blue"
                                    }`}
                            >
                                {item.Topics || "GENERAL"}
                            </span>
                        </div>
                        <p className="text-sm text-tactical-200 group-hover:text-white transition-colors cursor-pointer" onClick={() => window.open(item.Url, '_blank')}>
                            <span className="text-tactical-600 mr-2">[{item.Country || "GLOBAL"}]</span>
                            {item.Title}
                        </p>
                    </div>
                ))}
            </div>
        </TacticalCard>
    );
}
