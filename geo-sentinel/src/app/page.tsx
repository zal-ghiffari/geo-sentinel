"use client";

import React, { useState, useEffect } from "react";
import { BentoBox } from "@/components/tactical/BentoBox";
import { Header } from "@/components/tactical/Header";
import { EscalationBarometer } from "@/components/tactical/EscalationBarometer";
import { IntelligenceFeed } from "@/components/feed/IntelligenceFeed";
import { ExecutiveSummary } from "@/components/executive-summary/ExecutiveSummary";
import { YouTubeWidget } from "@/components/tactical/YouTubeWidget";
import { MarketTicker } from "@/components/tactical/MarketTicker";
import { TacticalMap } from "@/components/map/TacticalMap";
import { CountryStatus } from "@/components/tactical/CountryStatus";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.98, filter: "blur(5px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 15,
    },
  },
};

const CCTV_TABS = [
  { id: "4E-iFtUM2kk", label: "CCTV 1" },
  { id: "gmtlJ_m2r5A", label: "CCTV 2" },
  { id: "-zGuR1qVKrU", label: "CCTV 3" },
  { id: "fIurYTprwzg", label: "CCTV 4" }
];

const NEWS_TABS = [
  { id: "gCNeDWCI0vo", label: "AL_JAZEERA" },
  { id: "iEpJwprxDdk", label: "BLOOMBERG" },
  { id: "9Auq9mYxFEE", label: "SKY_NEWS" },
  { id: "3_XvM_8-96I", label: "AL_ARABIYA" }
];

export default function Home() {
  const [apiData, setApiData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/data");
        const json = await response.json();
        if (json.status === "Success") {
          setApiData(json.data);
        }
      } catch (error) {
        console.error("API Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, []);

  // Calculate Max Threat Level for Barometer based on Sovereign Status logic
  const getMaxThreatLevel = () => {
    if (apiData.length === 0) return 1;

    const counts: Record<string, number> = {};
    apiData.forEach(e => {
      if (e.Country) {
        e.Country.split(',').forEach((c: string) => {
          const country = c.trim();
          counts[country] = (counts[country] || 0) + 1;
        });
      }
    });

    const maxCount = Math.max(...Object.values(counts), 0);
    if (maxCount >= 35) return 10; // MAJOR -> DEFCON 1
    if (maxCount >= 20) return 8;  // HIGH -> DEFCON 2
    if (maxCount >= 10) return 6;  // MEDIUM -> DEFCON 3
    return 4; // LOW -> DEFCON 4
  };

  const threatLevel = getMaxThreatLevel();

  return (
    <main className="min-h-screen bg-tactical-950 flex flex-col pt-2 px-2 selection:bg-neon-blue/30 selection:text-white pb-0 overflow-hidden relative font-mono">
      {/* Tactical Overlays */}
      <div className="scanline" />
      <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.03] bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_2px]" />

      <BentoBox className="h-[calc(100vh-2.5rem)] pb-0 relative z-10 w-full overflow-y-auto no-scrollbar">
        <Header />

        <motion.div
          className="col-span-12 grid grid-cols-12 gap-4 pb-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* LEFT COLUMN: VISUAL INTEL (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <motion.div variants={item}>
              <EscalationBarometer level={threatLevel} />
            </motion.div>

            <motion.div variants={item}>
              <YouTubeWidget
                title="City Surveillance // LIVE CCTV"
                tabs={CCTV_TABS}
                glow="green"
              />
            </motion.div>

            <motion.div variants={item}>
              <YouTubeWidget
                title="Global News // LIVE BROADCAST"
                tabs={NEWS_TABS}
                glow="red"
              />
            </motion.div>
          </div>

          {/* RIGHT COLUMN: DATA ANALYTICS (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <motion.div variants={item}>
              <TacticalMap events={apiData} height="440px" />
            </motion.div>

            <motion.div variants={item}>
              <CountryStatus events={apiData} />
            </motion.div>
          </div>

          {/* BOTTOM ROW: TEXT INTELLIGENCE (Full Width) */}
          <div className="col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-4 mt-2">
            <motion.div variants={item} className="lg:col-span-4 min-h-[400px]">
              <IntelligenceFeed events={apiData} />
            </motion.div>

            <motion.div variants={item} className="lg:col-span-8">
              <ExecutiveSummary />
            </motion.div>
          </div>
        </motion.div>
      </BentoBox>

      <div className="relative z-10 shrink-0">
        <MarketTicker />
      </div>
    </main>
  );
}
