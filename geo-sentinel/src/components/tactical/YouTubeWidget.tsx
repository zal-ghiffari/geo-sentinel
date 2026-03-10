"use client";

import React from "react";
import { TacticalCard } from "./Card";
import { Tv } from "lucide-react";

interface YouTubeTab {
    id: string;
    label: string;
}

interface YouTubeWidgetProps {
    title: string;
    videoId?: string;
    tabs?: YouTubeTab[];
    glow?: "blue" | "red" | "amber" | "green";
    className?: string;
}

export function YouTubeWidget({ title, videoId, tabs, glow = "blue", className }: YouTubeWidgetProps) {
    const [activeTab, setActiveTab] = React.useState(tabs?.[0]?.id || videoId || "");

    return (
        <TacticalCard
            title={title}
            icon={<Tv size={16} />}
            glow={glow}
            className={`w-full overflow-hidden ${className}`}
        >
            {tabs && (
                <div className="flex gap-1 mb-2 overflow-x-auto no-scrollbar pb-1 border-b border-tactical-800/50">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-2 py-0.5 text-[9px] uppercase font-mono transition-all border ${activeTab === tab.id
                                    ? "bg-neon-blue/20 border-neon-blue text-neon-blue shadow-[0_0_5px_rgba(0,243,255,0.3)]"
                                    : "bg-tactical-900 border-tactical-700 text-tactical-500 hover:border-tactical-500"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            )}
            <div className="relative w-full pt-[56.25%] bg-black">
                <iframe
                    className="absolute inset-0 w-full h-full grayscale-[0.3] contrast-[1.2] opacity-80 hover:opacity-100 transition-opacity duration-500"
                    src={`https://www.youtube.com/embed/${activeTab}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&playlist=${activeTab}&loop=1`}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
                {/* Tactical HUD Overlay for video */}
                <div className="absolute inset-0 pointer-events-none border border-tactical-800/50 z-10 m-2 flex flex-col justify-between p-2">
                    <div className="flex justify-between items-start">
                        <div className="text-[8px] text-neon-blue font-bold tracking-tighter opacity-50 uppercase">LIVE // HD_STREAM_{activeTab.substring(0, 4).toUpperCase()}</div>
                        <div className="text-[8px] text-neon-red font-bold animate-pulse">REC ●</div>
                    </div>
                    <div className="flex justify-between items-end">
                        <div className="w-4 h-4 border-l border-b border-tactical-500/30" />
                        <div className="text-[8px] text-tactical-500 font-mono">FR: 60FPS // RES: 1080P</div>
                    </div>
                </div>
            </div>
        </TacticalCard>
    );
}
