import React from "react";
import { cn } from "@/lib/utils";

export function BentoBox({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 p-4 min-h-screen bg-tactical-950 text-tactical-200 overflow-y-auto",
                className
            )}
        >
            {children}
        </div>
    );
}
