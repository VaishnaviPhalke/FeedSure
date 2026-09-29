"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Info,
  Check,
  Lock,
  Cpu,
  RotateCcw,
} from "lucide-react";
import { Language } from "../lib/dictionary";
import { EvidenceContract } from "./EvidenceContract";

export interface AnalysisProgressEvidenceProps {
  feedType: string;
  batchId?: string;
  onProceedToResults: () => void;
  onBack: () => void;
  lang: Language;
}

export const AnalysisProgressEvidence: React.FC<AnalysisProgressEvidenceProps> = ({
  feedType,
  batchId = "MS-2026-0012",
  onProceedToResults,
  onBack,
  lang,
}) => {
  const [evidenceMode, setEvidenceMode] = useState<"sufficient" | "insufficient">("sufficient");

  const evidenceJourneySteps = [
    { title: "SENSE", desc: "NIR Reflectance (800-1050nm) + Camera", color: "blue", status: "done" },
    { title: "CHECK", desc: "Signal-to-Noise Ratio (SNR 44dB)", color: "blue", status: "done" },
    { title: "VERIFY", desc: "Mahalanobis Calibration Fit (D_M 1.42)", color: "teal", status: "done" },
    { title: "FUSE", desc: "Multi-Source Evidence Aggregation", color: "teal", status: "done" },
    { title: "DECIDE", desc: "Evidence Contract Decision Evaluation", color: "emerald", status: "done" },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-8">
      {/* 4-Step Stepper */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-stone-400">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">✓</span>
            <span className="text-xs font-medium">1. {feedType}</span>
          </div>
          <span className="text-stone-300">→</span>
          <div className="flex items-center gap-2 text-stone-400">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">✓</span>
            <span className="text-xs font-medium">2. 5-Pt Scan</span>
          </div>
          <span className="text-stone-300">→</span>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-teal-800 text-white flex items-center justify-center text-xs font-bold">3</span>
            <span className="text-xs font-bold text-teal-900">Evidence Contract Engine</span>
          </div>
          <span className="text-stone-300">→</span>
          <div className="flex items-center gap-2 text-stone-400">
            <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center text-xs font-bold">4</span>
            <span className="text-xs font-medium">Results</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono font-bold text-teal-900 bg-teal-50 px-3 py-1 rounded-xl border border-teal-200 self-start sm:self-auto">
          <Cpu className="w-3.5 h-3.5 text-teal-700" />
          <span>Batch: {batchId}</span>
        </div>
      </div>

      {/* Cinematic Evidence Journey Flow Bar */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black text-[#1b4332] uppercase tracking-wider">
              FeedSure Autonomous Evidence Journey
            </h3>
            <p className="text-[11px] text-stone-500">
              End-to-end verification verifying if sample is statistically decision-ready
            </p>
          </div>
          <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
            All 5 Checkpoints Verified
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs pt-1">
          {evidenceJourneySteps.map((step, idx) => (
            <div
              key={step.title}
              className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold text-stone-400">0{idx + 1}</span>
                <span className="w-4 h-4 rounded-full bg-teal-700 text-white flex items-center justify-center text-[9px] font-bold">
                  ✓
                </span>
              </div>
              <div>
                <span className="font-extrabold text-[#1b4332] text-xs block">{step.title}</span>
                <span className="text-[10px] text-stone-500 line-clamp-2 mt-0.5">{step.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Feature: Signature Evidence Contract Component */}
      <EvidenceContract
        scenario={evidenceMode}
        onRunNextBestTest={() => setEvidenceMode("sufficient")}
        lang={lang}
      />

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 font-bold text-xs shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to 5-Pt Scan</span>
        </button>

        <button
          onClick={onProceedToResults}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-extrabold text-xs shadow-md transition-all active:scale-[0.99]"
        >
          <span>View Verified Nutritional Results</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
