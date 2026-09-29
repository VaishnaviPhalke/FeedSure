"use client";

import React from "react";
import { ShieldCheck, Calendar, Clock, Layers, ArrowRight } from "lucide-react";
import { Language } from "../lib/dictionary";

export interface FeedIdentityCardProps {
  batchId?: string;
  feedType?: string;
  cp?: number;
  dm?: number;
  ndf?: number;
  ageDays?: number;
  status?: "VERIFIED" | "MONITOR" | "RETEST";
  lang?: Language;
}

export const FeedIdentityCard: React.FC<FeedIdentityCardProps> = ({
  batchId = "FS-20260929-D9EC17",
  feedType = "Maize Silage",
  cp = 8.7,
  dm = 34.2,
  ndf = 42.1,
  ageDays = 120,
  status = "VERIFIED",
  lang = "en",
}) => {
  const lifecycleSteps = [
    { label: "Harvest", done: true },
    { label: "Sealed", done: true },
    { label: "Ferment", done: true },
    { label: "Store", done: true },
    { label: "Opened", done: true },
    { label: "Feeding", done: true },
    { label: "Retest", done: false, active: true },
  ];

  return (
    <div className="bg-white rounded-3xl border-2 border-[#b7e4c7] p-5 shadow-sm space-y-4">
      {/* Header & Identity Code */}
      <div className="flex items-start justify-between border-b border-stone-100 pb-3">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#2d6a4f] font-bold">
            Persistent Feed Identity
          </span>
          <h3 className="text-lg font-black text-[#1b4332] uppercase">{feedType}</h3>
          <p className="text-xs font-mono font-bold text-stone-500 mt-0.5">{batchId}</p>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
            ● {status}
          </span>
          <span className="text-[9px] font-bold text-stone-400">Age: {ageDays} Days</span>
        </div>
      </div>

      {/* 3 Core Quantitative Values */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2.5 rounded-2xl bg-[#f3f9f4] border border-[#d8f3dc]">
          <span className="text-[10px] text-stone-500 font-bold block uppercase">Crude Protein</span>
          <span className="text-base font-black text-[#1b4332]">{cp}%</span>
        </div>
        <div className="p-2.5 rounded-2xl bg-stone-50 border border-stone-200">
          <span className="text-[10px] text-stone-500 font-bold block uppercase">Dry Matter</span>
          <span className="text-base font-black text-[#1b4332]">{dm}%</span>
        </div>
        <div className="p-2.5 rounded-2xl bg-stone-50 border border-stone-200">
          <span className="text-[10px] text-stone-500 font-bold block uppercase">NDF Fiber</span>
          <span className="text-base font-black text-[#1b4332]">{ndf}%</span>
        </div>
      </div>

      {/* 3 Status Gauges */}
      <div className="space-y-1.5 text-[11px] font-bold">
        <div>
          <div className="flex justify-between text-stone-600 mb-0.5">
            <span>Nutritional Quality</span>
            <span className="text-emerald-700 font-black">88% (Good)</span>
          </div>
          <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#2d6a4f] rounded-full" style={{ width: "88%" }}></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-stone-600 mb-0.5">
            <span>Evidence Sufficiency</span>
            <span className="text-teal-700 font-black">91% (High)</span>
          </div>
          <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
            <div className="h-full bg-teal-600 rounded-full" style={{ width: "91%" }}></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-stone-600 mb-0.5">
            <span>Storage Stability</span>
            <span className="text-amber-700 font-black">74% (Heating ⚠)</span>
          </div>
          <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: "74%" }}></div>
          </div>
        </div>
      </div>

      {/* Micro-Lifecycle Spine */}
      <div className="pt-2 border-t border-stone-100">
        <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block mb-1.5">
          Batch Lifecycle Spine:
        </span>
        <div className="flex items-center justify-between text-[9px] font-bold">
          {lifecycleSteps.map((step, idx) => (
            <React.Fragment key={step.label}>
              <div className="flex flex-col items-center">
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black ${
                    step.done
                      ? "bg-[#2d6a4f] text-white"
                      : step.active
                      ? "bg-amber-500 text-white animate-pulse"
                      : "bg-stone-200 text-stone-500"
                  }`}
                >
                  {step.done ? "✓" : idx + 1}
                </span>
                <span className="mt-0.5 text-stone-600">{step.label}</span>
              </div>
              {idx < lifecycleSteps.length - 1 && (
                <div className="h-0.5 flex-1 bg-stone-200 mx-1 mb-3"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
