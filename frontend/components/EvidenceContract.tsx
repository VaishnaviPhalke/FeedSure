"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Check,
  X,
  Clock,
  FlaskConical,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Language } from "../lib/dictionary";

export interface EvidenceContractProps {
  scenario?: "sufficient" | "insufficient";
  onRunNextBestTest?: () => void;
  lang?: Language;
}

export const EvidenceContract: React.FC<EvidenceContractProps> = ({
  scenario: initialScenario = "sufficient",
  onRunNextBestTest,
  lang = "en",
}) => {
  const [scenario, setScenario] = useState<"sufficient" | "insufficient">(initialScenario);
  const [showDetails, setShowDetails] = useState<boolean>(true);

  const isSufficient = scenario === "sufficient";

  return (
    <div className="space-y-4">
      {/* Demo State Switcher */}
      <div className="flex items-center justify-between bg-stone-100/80 p-1.5 rounded-2xl border border-stone-200 text-xs">
        <span className="text-[11px] font-bold text-stone-500 pl-2">
          Evidence Engine State Simulation:
        </span>
        <div className="flex gap-1">
          <button
            onClick={() => setScenario("sufficient")}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
              isSufficient
                ? "bg-teal-700 text-white shadow-xs"
                : "text-stone-600 hover:bg-white"
            }`}
          >
            🟢 Decision-Ready (91% Trust)
          </button>
          <button
            onClick={() => setScenario("insufficient")}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
              !isSufficient
                ? "bg-amber-600 text-white shadow-xs"
                : "text-stone-600 hover:bg-white"
            }`}
          >
            🟠 Evidence Conflict (Next Best Test)
          </button>
        </div>
      </div>

      {/* Signature Evidence Contract Card */}
      <div
        className={`rounded-3xl border-2 p-6 transition-all shadow-sm ${
          isSufficient
            ? "bg-gradient-to-br from-white via-teal-50/30 to-emerald-50/40 border-teal-300"
            : "bg-gradient-to-br from-white via-amber-50/40 to-orange-50/30 border-amber-300"
        }`}
      >
        {/* Top Header & Trust Ring Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-5">
          <div className="flex items-center gap-3.5">
            {/* Trust Ring Component */}
            <div
              className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-black text-center shadow-inner border-2 ${
                isSufficient
                  ? "bg-teal-700 text-white border-teal-500"
                  : "bg-amber-500 text-white border-amber-400"
              }`}
            >
              <span className="text-lg leading-none">{isSufficient ? "91%" : "54%"}</span>
              <span className="text-[9px] uppercase tracking-wider opacity-90">TRUST</span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-teal-800 font-bold">
                  FeedSure Evidence Contract
                </span>
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    isSufficient
                      ? "bg-teal-100 text-teal-900 border border-teal-300"
                      : "bg-amber-100 text-amber-900 border border-amber-300"
                  }`}
                >
                  {isSufficient ? "🟢 DECISION-READY" : "⚠ DECISION WITHHELD"}
                </span>
              </div>
              <h3 className="text-base font-black text-[#1b4332] mt-0.5">
                {isSufficient
                  ? "Evidence Sufficient for Dairy Ration Decision Support"
                  : "Evidence Conflict Detected — Additional Verification Required"}
              </h3>
            </div>
          </div>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs font-bold text-stone-500 hover:text-stone-800 flex items-center gap-1 self-start sm:self-auto bg-white px-2.5 py-1 rounded-xl border border-stone-200 shadow-2xs"
          >
            <span>{showDetails ? "Hide Checks" : "Show Checks"}</span>
            {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* 5 Scientific Checklist Verification Nodes */}
        {showDetails && (
          <div className="py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 text-xs">
            <div className="p-3 rounded-2xl bg-white border border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-stone-400 font-bold block">1. Calibration Domain</span>
                <span className="font-bold text-[#1b4332]">In-Domain Matrix</span>
              </div>
              <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs">
                ✓
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-white border border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-stone-400 font-bold block">2. Spectral Signal</span>
                <span className="font-bold text-[#1b4332]">Clean (SNR &gt; 42dB)</span>
              </div>
              <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs">
                ✓
              </span>
            </div>

            <div
              className={`p-3 rounded-2xl border flex items-center justify-between ${
                isSufficient
                  ? "bg-white border-stone-200"
                  : "bg-amber-50 border-amber-300 text-amber-900"
              }`}
            >
              <div>
                <span className="text-[10px] text-stone-400 font-bold block">3. 5-Pt Sampling</span>
                <span className="font-bold">{isSufficient ? "CV = 8.4% (Uniform)" : "CV = 16.9% (Outlier P4)"}</span>
              </div>
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs ${
                  isSufficient ? "bg-teal-100 text-teal-800" : "bg-amber-200 text-amber-900"
                }`}
              >
                {isSufficient ? "✓" : "⚠"}
              </span>
            </div>

            <div
              className={`p-3 rounded-2xl border flex items-center justify-between ${
                isSufficient
                  ? "bg-white border-stone-200"
                  : "bg-amber-50 border-amber-300 text-amber-900"
              }`}
            >
              <div>
                <span className="text-[10px] text-stone-400 font-bold block">4. Visual Agreement</span>
                <span className="font-bold">{isSufficient ? "Agrees with NIR" : "Texture Anomaly Flagged"}</span>
              </div>
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs ${
                  isSufficient ? "bg-teal-100 text-teal-800" : "bg-amber-200 text-amber-900"
                }`}
              >
                {isSufficient ? "✓" : "⚠"}
              </span>
            </div>

            <div
              className={`p-3 rounded-2xl border flex items-center justify-between ${
                isSufficient
                  ? "bg-white border-stone-200"
                  : "bg-red-50 border-red-300 text-red-900"
              }`}
            >
              <div>
                <span className="text-[10px] text-stone-400 font-bold block">5. Model Agreement</span>
                <span className="font-bold">{isSufficient ? "Narrow (±0.6%)" : "Uncertainty High"}</span>
              </div>
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs ${
                  isSufficient ? "bg-teal-100 text-teal-800" : "bg-red-200 text-red-900"
                }`}
              >
                {isSufficient ? "✓" : "✕"}
              </span>
            </div>
          </div>
        )}

        {/* DECISION SUMMARY or NEXT BEST TEST BANNER */}
        <div className="pt-3 border-t border-stone-200/80">
          {isSufficient ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800">
                  DECISION STATUS:
                </span>
                <p className="text-stone-700 font-medium">
                  ✓ Measured values (8.7% CP, 34.2% DM) are statistically validated for least-cost ration balancing.
                </p>
                <span className="text-[10px] text-stone-400 block">
                  Evidence basis: NIR Chemometrics + ISO 12099 5-Point Core Scan + Computer Vision 22-D Texture
                </span>
              </div>

              <span className="px-3.5 py-1.5 rounded-xl bg-teal-800 text-white font-bold text-xs shrink-0 self-start sm:self-auto">
                Ready for Ration Solver →
              </span>
            </div>
          ) : (
            /* INNOVATION: NEXT BEST TEST CARD */
            <div className="bg-white p-4 rounded-2xl border-2 border-amber-400 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-black text-sm shrink-0">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-black uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      ADAPTIVE TEST ESCALATION
                    </span>
                    <span className="text-xs font-black text-amber-900">NEXT BEST TEST: Rescan Points P4 & P5</span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1">
                    Spatial variation at bottom-left core exceeds repeatability limits. Rescanning reduces uncertainty by <strong>32%</strong> with zero chemical cost.
                  </p>
                  <div className="flex items-center gap-4 text-[11px] text-stone-500 mt-2 font-bold">
                    <span>⏱ Estimated Time: ~40 sec</span>
                    <span>•</span>
                    <span>📈 Information Gain: HIGH</span>
                    <span>•</span>
                    <span>💰 Added Cost: ₹0 (Sensor-Only)</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (onRunNextBestTest) onRunNextBestTest();
                  setScenario("sufficient");
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs shadow-md transition-all active:scale-[0.99] shrink-0"
              >
                RUN NEXT BEST TEST (40s) →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
