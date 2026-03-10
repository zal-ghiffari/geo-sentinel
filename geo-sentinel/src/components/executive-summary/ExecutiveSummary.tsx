import React from "react";
import { TacticalCard } from "../tactical/Card";
import { FileText, Flag, AlertCircle, ShieldCheck, Activity, Users } from "lucide-react";

export function ExecutiveSummary() {
    const [lastUpdate, setLastUpdate] = React.useState<string>("");

    React.useEffect(() => {
        setLastUpdate(new Date().toISOString().split('T')[1].split('.')[0] + " Z");
    }, []);

    return (
        <div className="col-span-1 md:col-span-4 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 h-full self-stretch">
            {/* Escalation Status - LEFT SIDE */}
            <TacticalCard
                title="Escalation Status"
                icon={<Activity size={16} />}
                className="h-full bg-tactical-900/40"
                glow="amber"
            >
                <div className="space-y-4 text-xs uppercase tracking-wider font-mono">
                    <div className="border-l-2 border-neon-amber/50 pl-3 py-1">
                        <span className="text-neon-amber font-bold block mb-1 text-[10px]">&gt;&gt; WHO</span>
                        <p className="text-tactical-200">IRGC Naval Forces & US 5th Fleet Strike Group</p>
                    </div>

                    <div className="border-l-2 border-neon-amber/50 pl-3 py-1">
                        <span className="text-neon-amber font-bold block mb-1 text-[10px]">&gt;&gt; WHAT</span>
                        <p className="text-tactical-200">Heightened naval posturing; multi-domain drone surveillance; intercept procedures active.</p>
                    </div>

                    <div className="border-l-2 border-neon-amber/50 pl-3 py-1">
                        <span className="text-neon-amber font-bold block mb-1 text-[10px]">&gt;&gt; WHERE</span>
                        <p className="text-tactical-200">Strait of Hormuz, Persian Gulf, Eastern Mediterranean</p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-tactical-800 text-[9px] text-tactical-500">
                        LAST UPDATE: {lastUpdate || "--:--:-- Z"} // SOURCE: Intel-SIGINT
                    </div>
                </div>
            </TacticalCard>

            {/* IDN Interest Report - RIGHT SIDE */}
            <TacticalCard
                title="IDN Interest Report"
                icon={<Flag size={16} />}
                className="h-full bg-tactical-900/40"
                glow="blue"
            >
                <div className="grid grid-cols-1 gap-3 font-mono">
                    {/* BBM / ICP */}
                    <div className="bg-tactical-950/80 p-2 border border-tactical-800 flex items-start gap-3">
                        <div className="p-1.5 bg-neon-red/10 rounded-sm">
                            <AlertCircle size={14} className="text-neon-red" />
                        </div>
                        <div className="flex-1">
                            <span className="text-[9px] text-tactical-500 uppercase block">Energy Impact</span>
                            <span className="text-neon-red font-bold text-[10px] block">BBM / ICP PROJECTION</span>
                            <p className="text-[11px] text-tactical-300 mt-1 uppercase">Brent Crude volatility risk. ICP projection +$3-5/bbl. Subsidy pressure rising.</p>
                        </div>
                    </div>

                    {/* VOLATILITAS RUPIAH */}
                    <div className="bg-tactical-950/80 p-2 border border-tactical-800 flex items-start gap-3">
                        <div className="p-1.5 bg-neon-amber/10 rounded-sm">
                            <Activity size={14} className="text-neon-amber" />
                        </div>
                        <div className="flex-1">
                            <span className="text-[9px] text-tactical-500 uppercase block">Market Stability</span>
                            <span className="text-neon-amber font-bold text-[10px] block">VOLATILITAS RUPIAH</span>
                            <p className="text-[11px] text-tactical-300 mt-1 uppercase">USD/IDR approaching resistance at 15,850. Bank Indonesia monitoring outflows.</p>
                        </div>
                    </div>

                    {/* DIPLOMASI RI & WNI SAFETY */}
                    <div className="bg-tactical-950/80 p-2 border border-tactical-800 grid grid-cols-2 gap-2">
                        <div>
                            <span className="text-[9px] text-tactical-500 uppercase block">Diplomacy</span>
                            <span className="text-neon-green font-bold text-[10px] block">BEBAS AKTIF</span>
                            <p className="text-[10px] text-tactical-400 mt-1 uppercase">De-escalation via OIC & UN.</p>
                        </div>
                        <div>
                            <span className="text-[9px] text-tactical-500 uppercase block">Citizen Safety</span>
                            <span className="text-neon-blue font-bold text-[10px] block">KEAMANAN WNI</span>
                            <p className="text-[10px] text-tactical-400 mt-1 uppercase">Alert Level: ELEVATED. Evacuation ready.</p>
                        </div>
                    </div>
                </div>
            </TacticalCard>
        </div>
    );
}
