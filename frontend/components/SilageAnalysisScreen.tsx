"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Layers,
  Thermometer,
  Droplets,
  ArrowRight,
  Clock,
  CheckCircle2,
  Activity,
} from "lucide-react";
import { Language } from "../lib/dictionary";

export interface SilageAnalysisScreenProps {
  onProceedToPassport: () => void;
  lang: Language;
}

export const SilageAnalysisScreen: React.FC<SilageAnalysisScreenProps> = ({
  onProceedToPassport,
  lang,
}) => {
  const [pitType, setPitType] = useState<"Bunker" | "Trench" | "Silage Bag">("Bunker");
  const [sampleLocation, setSampleLocation] = useState<"Top" | "Middle" | "Bottom">("Middle");
  const [storageDays, setStorageDays] = useState<number>(120);

  const acidProfile = [
    { name: "Lactic Acid (C3H6O3)", value: "4.2%", norm: ">3.5%", desc: "Primary lactic preservation driver" },
    { name: "Acetic Acid (CH3COOH)", value: "1.1%", norm: "1.0 - 2.0%", desc: "Controls aerobic stability" },
    { name: "Butyric Acid (C4H8O2)", value: "0.2%", norm: "<0.3%", desc: "Zero clostridial spoilage flag" },
  ];

  const timelineDays = [
    { day: "Day 1", status: "stable", label: "Sealing & Packing", color: "emerald", desc: "Oxygen depleted in 4h" },
    { day: "Day 30", status: "stable", label: "Lactic Drop", color: "emerald", desc: "pH reached 3.9 baseline" },
    { day: "Day 60", status: "stable", label: "Full Fermentation", color: "emerald", desc: "Flieg score 86 (Excellent)" },
    { day: "Day 120", status: "heating", label: "Face Heating Warning", color: "amber", desc: "Open face exposed (ΔT = +2.7°C)" },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-8">
      {/* Header */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#2d6a4f]" />
            <h2 className="text-lg font-black text-[#1b4332]">
              Silage Quality, Fermentation & Flieg Index
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Bunker Pit Longitudinal Fermentation Analysis & Organic Acid Profiling
          </p>
        </div>

        <button
          onClick={onProceedToPassport}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold text-xs shadow-xs"
        >
          <span>View Silage Digital Twin Passport</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Silage Parameters Selector Ribbon */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div>
          <label className="block text-stone-500 font-bold mb-1">Silage Storage Type</label>
          <div className="flex gap-1 bg-stone-100 p-1 rounded-xl">
            {(["Bunker", "Trench", "Silage Bag"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setPitType(type)}
                className={`flex-1 py-1 rounded-lg font-bold transition-all ${
                  pitType === type ? "bg-white text-[#1b4332] shadow-xs" : "text-stone-500"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-stone-500 font-bold mb-1">Sampling Core Depth</label>
          <div className="flex gap-1 bg-stone-100 p-1 rounded-xl">
            {(["Top", "Middle", "Bottom"] as const).map((loc) => (
              <button
                key={loc}
                onClick={() => setSampleLocation(loc)}
                className={`flex-1 py-1 rounded-lg font-bold transition-all ${
                  sampleLocation === loc ? "bg-white text-[#1b4332] shadow-xs" : "text-stone-500"
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-stone-500 font-bold mb-1">Storage Duration</label>
          <div className="flex items-center justify-between bg-stone-50 border border-stone-200 px-3 py-1.5 rounded-xl font-bold text-[#1b4332]">
            <span>{storageDays} Days Matured</span>
            <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-extrabold">
              Ready to Feed
            </span>
          </div>
        </div>
      </div>

      {/* 4 Silage Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-bold mb-1">
            <span>Silage pH</span>
            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Good
            </span>
          </div>
          <div className="text-2xl font-black text-[#1b4332]">4.1</div>
          <span className="text-[10px] text-stone-400 block mt-1">Target range: 3.8 - 4.2</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-bold mb-1">
            <span>Flieg Score</span>
            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Very Good
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-[#1b4332]">82</span>
            <span className="text-xs text-stone-400 font-semibold">/ 100</span>
          </div>
          <span className="text-[10px] text-stone-400 block mt-1">Fermentation efficiency: 94%</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-bold mb-1">
            <span>Dry Matter (DM)</span>
            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Optimal
            </span>
          </div>
          <div className="text-2xl font-black text-[#1b4332]">34.5%</div>
          <span className="text-[10px] text-stone-400 block mt-1">Moisture: 65.5%</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-bold mb-1">
            <span>Spoilage Risk</span>
            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Low
            </span>
          </div>
          <div className="text-2xl font-black text-emerald-700">LOW</div>
          <span className="text-[10px] text-stone-400 block mt-1">Aerobic shelf life: 36h</span>
        </div>
      </div>

      {/* Main Grid: Organic Acid Profile + Silage Health Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Organic Acid Breakdown (6 cols) */}
        <div className="lg:col-span-6 bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-[#1b4332]">Organic Acid Profile (HPLC/NIR)</h3>
              <p className="text-[11px] text-stone-500">Volatile fatty acid fermentation signature</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-stone-400 block font-bold">Lactic / Acetic Ratio</span>
              <span className="text-xs font-black text-[#2d6a4f]">3.8 (Optimal &gt; 3.0)</span>
            </div>
          </div>

          <div className="space-y-3">
            {acidProfile.map((acid) => (
              <div key={acid.name} className="p-3.5 rounded-2xl border border-stone-200 bg-stone-50/60">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#1b4332]">{acid.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#2d6a4f]">{acid.value}</span>
                    <span className="text-[10px] text-stone-400 font-semibold">(Norm: {acid.norm})</span>
                  </div>
                </div>
                <p className="text-[11px] text-stone-500">{acid.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-stone-500 pt-2 border-t border-stone-100">
            ✅ <strong>Fermentation Verdict:</strong> Rapid pH drop to 4.1 prevented clostridial growth. Butyric acid remains at safe trace levels (&lt;0.2%).
          </p>
        </div>

        {/* Right: Silage Health Timeline (6 cols) */}
        <div className="lg:col-span-6 bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div>
            <h3 className="text-sm font-extrabold text-[#1b4332]">Silage Maturation & Health Timeline</h3>
            <p className="text-[11px] text-stone-500">Longitudinal monitoring across 120-day pit storage</p>
          </div>

          <div className="space-y-3">
            {timelineDays.map((item, idx) => {
              const isWarning = item.status === "heating";
              return (
                <div
                  key={item.day}
                  className={`p-3.5 rounded-2xl border flex items-start justify-between ${
                    isWarning
                      ? "bg-amber-50 border-amber-300 text-amber-900"
                      : "bg-[#f3f9f4] border-[#b7e4c7] text-[#1b4332]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5 ${
                        isWarning ? "bg-amber-600" : "bg-[#2d6a4f]"
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black">{item.day}: {item.label}</span>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                            isWarning ? "bg-amber-200 text-amber-900" : "bg-white text-[#2d6a4f]"
                          }`}
                        >
                          {isWarning ? "🟠 Warning" : "🟢 Stable"}
                        </span>
                      </div>
                      <p className="text-[11px] mt-0.5 opacity-90">{item.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-[11px] text-stone-500 pt-2 border-t border-stone-100">
            ⚠️ <em>Advisory:</em> Day 120 shows opening face heating. Remove at least 15cm of face silage daily to prevent secondary aerobic deterioration.
          </p>
        </div>
      </div>
    </div>
  );
};
