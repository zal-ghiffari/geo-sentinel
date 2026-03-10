import React from "react";
import { cn } from "@/lib/utils";

interface TacticalCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    glow?: "blue" | "red" | "amber" | "green" | "none";
    icon?: React.ReactNode;
    headerAction?: React.ReactNode;
}

export function TacticalCard({
    title,
    icon,
    glow = "none",
    children,
    className,
    headerAction,
    ...props
}: TacticalCardProps) {
    const glowClasses = {
        blue: "glow-blue border-neon-blue/20",
        red: "glow-red border-neon-red/20",
        amber: "shadow-[0_0_10px_rgba(255,183,0,0.1)] border-neon-amber/20",
        green: "shadow-[0_0_10px_rgba(0,255,102,0.1)] border-neon-green/20",
        none: "border-tactical-800",
    };

    return (
        <div
            className={cn(
                "relative flex flex-col bg-tactical-900/80 backdrop-blur-sm border rounded-sm overflow-hidden",
                glowClasses[glow],
                className
            )}
            {...props}
        >
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-tactical-500/50" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-tactical-500/50" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-tactical-500/50" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-tactical-500/50" />

            {title && (
                <div className="flex items-center justify-between px-3 py-2 border-b border-tactical-800 bg-tactical-950/50 uppercase tracking-widest text-xs font-bold text-tactical-500">
                    <div className="flex items-center gap-2">
                        {icon && <span className="text-neon-blue">{icon}</span>}
                        <span className={glow === "red" ? "text-neon-red" : ""}>{title}</span>
                    </div>
                    {headerAction && <div>{headerAction}</div>}
                </div>
            )}
            <div className="flex-1 overflow-auto p-3 no-scrollbar font-mono text-sm leading-relaxed">
                {children}
            </div>
        </div>
    );
}
