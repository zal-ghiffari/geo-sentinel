"use client";

import React from "react";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

export function MarketTicker() {
    const data = [
        { label: "BRENT CRUDE", value: "$84.50", change: "+2.1%", trend: "up" },
        { label: "WTI CRUDE", value: "$79.20", change: "+1.8%", trend: "up" },
        { label: "USD/IDR", value: "Rp 15,820", change: "-0.4%", trend: "down" },
        { label: "GOLD", value: "$2,350/oz", change: "+0.5%", trend: "up" },
    ];

    return (
        <div className="col-span-1 md:col-span-4 lg:col-span-12 flex h-8 bg-tactical-900 border-y border-tactical-800 overflow-hidden items-center text-xs font-mono">
            <div className="bg-neon-blue text-tactical-950 px-3 h-full flex items-center font-bold tracking-widest shrink-0">
                <DollarSign size={14} className="mr-1" /> GLOBAL MARKETS
            </div>

            {/* Ticker Animation Container */}
            <div className="flex-1 overflow-hidden relative flex items-center">
                <div className="flex gap-8 whitespace-nowrap animate-[marquee_20s_linear_infinite] px-4">
                    {data.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <span className="text-tactical-500 uppercase">{item.label}</span>
                            <span className="text-tactical-200">{item.value}</span>
                            <span
                                className={`flex items-center ${item.trend === "up" ? "text-neon-red" : "text-neon-green"
                                    }`}
                            >
                                {item.trend === "up" ? (
                                    <TrendingUp size={12} className="mr-1" />
                                ) : (
                                    <TrendingDown size={12} className="mr-1" />
                                )}
                                {item.change}
                            </span>
                            <span className="mx-4 text-tactical-800">///</span>
                        </div>
                    ))}
                    {/* Duplicate for seamless scrolling */}
                    {data.map((item, i) => (
                        <div key={`dup-${i}`} className="flex items-center gap-2">
                            <span className="text-tactical-500 uppercase">{item.label}</span>
                            <span className="text-tactical-200">{item.value}</span>
                            <span
                                className={`flex items-center ${item.trend === "up" ? "text-neon-red" : "text-neon-green"
                                    }`}
                            >
                                {item.trend === "up" ? (
                                    <TrendingUp size={12} className="mr-1" />
                                ) : (
                                    <TrendingDown size={12} className="mr-1" />
                                )}
                                {item.change}
                            </span>
                            <span className="mx-4 text-tactical-800">///</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
