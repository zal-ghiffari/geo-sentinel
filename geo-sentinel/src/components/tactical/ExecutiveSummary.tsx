import React from "react";
import { TacticalCard } from "./Card";
import { FileText, Flag } from "lucide-react";

export function ExecutiveSummary() {
    return (
        <div className="col-span-1 md:col-span-2 lg:col-span-5 row-span-2 flex flex-col gap-4">
            <TacticalCard
                title="Escalation Status"
                icon={<FileText size={16} />}
                className="flex-1"
                glow="amber"
            >
                <div className="space-y-4 text-sm text-tactical-200 uppercase tracking-wide">
                    <p className="border-l-2 border-tactical-700 pl-3">
                        <span className="text-neon-amber block text-[10px] mb-1">&gt;&gt; WHO</span>
                        IRGC (Islamic Revolutionary Guard Corps) and US Fifth Fleet.
                    </p>
                    <p className="border-l-2 border-tactical-700 pl-3">
                        <span className="text-neon-amber block text-[10px] mb-1">&gt;&gt; WHAT</span>
                        Heightened naval posturing; increased drone surveillance flights in international airspace.
                    </p>
                    <p className="border-l-2 border-tactical-700 pl-3">
                        <span className="text-neon-amber block text-[10px] mb-1">&gt;&gt; WHERE</span>
                        Strait of Hormuz & Gulf of Oman.
                    </p>
                </div>
            </TacticalCard>

            <TacticalCard
                title="IDN Interest Report"
                icon={<Flag size={16} />}
                className="flex-1"
                glow="none"
            >
                <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-tactical-950 p-2 border border-tactical-800 relative">
                        <span className="text-[9px] text-tactical-500 absolute top-1 right-2">IMPACT</span>
                        <span className="block text-neon-blue font-bold tracking-widest mb-1">ENERGY SUBSIDY</span>
                        <span className="text-tactical-300">Brent Crude volatility risk. ICP projection +$3/bbl.</span>
                    </div>
                    <div className="bg-tactical-950 p-2 border border-tactical-800 relative">
                        <span className="text-[9px] text-tactical-500 absolute top-1 right-2">IMPACT</span>
                        <span className="block text-neon-amber font-bold tracking-widest mb-1">VOLATILITAS IDR</span>
                        <span className="text-tactical-300">USD/IDR approaching resistance at 15,800.</span>
                    </div>
                    <div className="bg-tactical-950 p-2 border border-tactical-800 col-span-2 relative">
                        <span className="text-[9px] text-tactical-500 absolute top-1 right-2">ACTION</span>
                        <span className="block text-neon-green font-bold tracking-widest mb-1">DIPLOMASI RI</span>
                        <span className="text-tactical-300">Maintain "Bebas Aktif". Suggest backchannel de-escalation via OIC. Monitor WNI in Tehran.</span>
                    </div>
                </div>
            </TacticalCard>
        </div>
    );
}
