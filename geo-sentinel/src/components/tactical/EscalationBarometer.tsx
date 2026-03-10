import React from "react";
import { TacticalCard } from "./Card";
import { AlertTriangle } from "lucide-react";

export function EscalationBarometer({ level = 7 }: { level?: number }) {
    // Determine color and label based on level
    let config = { color: "bg-tactical-500", glow: "none", label: "NORMAL" };
    if (level >= 8) {
        config = { color: "bg-neon-red", glow: "glow-red", label: "CRITICAL" };
    } else if (level >= 5) {
        config = { color: "bg-neon-amber", glow: "text-glow-amber", label: "ELEVATED" };
    } else {
        config = { color: "bg-neon-blue", glow: "glow-blue", label: "MONITORING" };
    }

    return (
        <TacticalCard
            title="Escalation Barometer"
            icon={<AlertTriangle size={16} />}
            glow={level >= 8 ? "red" : level >= 5 ? "amber" : "blue"}
            className="col-span-1 md:col-span-2 lg:col-span-3"
        >
            <div className="flex flex-col h-full justify-center gap-4">
                <div className="flex justify-between items-end">
                    <span className="text-4xl font-retro text-tactical-200">STATUS SIAGA</span>
                    <span className={`text-5xl font-retro ${level >= 8 ? "text-neon-red text-glow-red" : level >= 5 ? "text-neon-amber" : "text-neon-blue"}`}>
                        {6 - Math.ceil(level / 2)} {/* Simple mapping to DEFCON scale 1-5 */}
                    </span>
                </div>

                <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-tactical-500 uppercase tracking-widest">
                        <span>Threat Level</span>
                        <span className={level >= 8 ? "text-neon-red" : level >= 5 ? "text-neon-amber" : "text-neon-blue"}>
                            {config.label}
                        </span>
                    </div>
                    <div className="flex gap-1 h-3">
                        {[...Array(10)].map((_, i) => (
                            <div
                                key={i}
                                className={`flex-1 ${i < level ? config.color : "bg-tactical-800"}`}
                            />
                        ))}
                    </div>
                    <div className="flex justify-between text-[10px] text-tactical-600 font-mono">
                        <span>1</span>
                        <span>10</span>
                    </div>
                </div>
            </div>
        </TacticalCard>
    );
}
