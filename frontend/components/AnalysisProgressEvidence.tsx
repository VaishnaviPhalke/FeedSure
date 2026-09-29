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
} from "lucide-react";
import { Language } from "../lib/dictionary";

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
  const [showTrustDrawer, setShowTrustDrawer] = useState<boolean>(true);

  const pipelineSteps = [
    { title: "Spectrum Received", detail: "800nm - 1050nm Diffuse Reflectance" },
    { title: "Spectral Quality Checked", detail: "Signal-to-Noise Ratio (SNR) > 42dB" },
    { title: "Calibration Domain Checked", detail: "Mahalanobis D_M = 1.42 (In-Domain)" },
    { title: "5-Point Consistency Checked", detail: "ISO 12099 Spatial CV = 8.4%" },
    { title: "Nutrient Model Executed", detail: "PLSR Multi-Target Chemometrics" },
    { title: "Visual Evidence Checked", detail: "22-D Texture Moments & Bromothymol Blue" },
    { title: "Uncertainty Calculated", detail: "95% Prediction Confidence Interval" },
    { title: "Multi-Source Evidence Fused", detail: "Evidence Sufficiency Score (ESS) Computed" },
  ];

  const evidenceCards = [
    { label: "Calibration Applicability", pct: 96, desc: "Matches Indian fodder database", status: "high" },
    { label: "Spectral Signal Quality", pct: 91, desc: "Low baseline drift / optimal SNR", status: "high" },
    { label: "5-Point Sampling Consistency", pct: 94, desc: "Spatial CV 8.4% (<12% limit)", status: "high" },
    { label: "Prediction Confidence", pct: 87, desc: "Narrow ±0.6% error margin", status: "high" },
    { label: "Visual & Sensor Agreement", pct: 89, desc: "No conflicting moisture/mould signals", status: "high" },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-8">
      {/* 4-Step Stepper */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
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
            <span className="w-6 h-6 rounded-full bg-[#2d6a4f] text-white flex items-center justify-center text-xs font-bold">3</span>
            <span className="text-xs font-bold text-[#1b4332]">AI Evidence Engine</span>
          </div>
          <span className="text-stone-300">→</span>
          <div className="flex items-center gap-2 text-stone-400">
            <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center text-xs font-bold">4</span>
            <span className="text-xs font-medium">Results</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-[#2d6a4f] bg-[#f3f9f4] px-3 py-1 rounded-xl border border-[#b7e4c7]">
          <Cpu className="w-3.5 h-3.5" />
          <span>Batch: {batchId}</span>
        </div>
      </div>

      {/* Main Grid: Pipeline Checklist + Evidence Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: 8-Step Intelligence Pipeline (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-3xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-extrabold text-[#1b4332]">8-Step AI Intelligence Pipeline</h3>
              <p className="text-[11px] text-stone-500">Autonomous verification before reporting results</p>
            </div>
            <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black">
              8/8
            </span>
          </div>

          <div className="space-y-2.5">
            {pipelineSteps.map((step, idx) => (
              <div
                key={step.title}
                className="flex items-start gap-3 p-2.5 rounded-xl bg-[#f3f9f4] border border-[#d8f3dc] transition-all"
              >
                <div className="w-5 h-5 rounded-full bg-[#2d6a4f] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  ✓
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#1b4332] truncate">{step.title}</p>
                  <p className="text-[10px] text-stone-500 truncate">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-2xl bg-emerald-700 text-white flex items-center justify-between text-xs font-bold shadow-xs">
            <span>PIPELINE STATUS</span>
            <span className="px-2 py-0.5 rounded-full bg-white text-emerald-800 text-[10px] font-extrabold">
              DECISION READY
            </span>
          </div>
        </div>

        {/* Right Col: Evidence Sufficiency Scores & Trust Drawer (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Evidence Cards Grid */}
          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-extrabold text-[#1b4332]">Evidence Sufficiency Breakdown</h3>
                <p className="text-[11px] text-stone-500">Multimodal verification across optical, spatial, and chemometric channels</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-stone-400 block uppercase">Overall Evidence</span>
                <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-emerald-600 text-white inline-block mt-0.5">
                  🟢 HIGH (91.4%)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {evidenceCards.map((card) => (
                <div key={card.label} className="p-3.5 rounded-2xl border border-stone-200 bg-stone-50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#1b4332]">{card.label}</span>
                    <span className="text-xs font-black text-[#2d6a4f]">{card.pct}%</span>
                  </div>
                  <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden mb-1.5">
                    <div className="h-full bg-[#2d6a4f] rounded-full" style={{ width: `${card.pct}%` }}></div>
                  </div>
                  <p className="text-[10px] text-stone-500">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* The Killer Feature: "Why Should I Trust This Result?" Expandable Drawer */}
          <div className="bg-gradient-to-tr from-[#f3f9f4] to-emerald-50 border-2 border-[#b7e4c7] rounded-3xl p-5 shadow-xs">
            <div
              onClick={() => setShowTrustDrawer(!showTrustDrawer)}
              className="flex items-center justify-between cursor-pointer select-none"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-[#2d6a4f] text-white flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#1b4332]">
                    WHY THIS RESULT IS TRUSTWORTHY (EVIDENCE CONTRACT)
                  </h4>
                  <p className="text-[10px] text-stone-500">Scientifically verifiable prediction criteria</p>
                </div>
              </div>
              <button className="text-stone-400 hover:text-stone-700">
                {showTrustDrawer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {showTrustDrawer && (
              <div className="mt-4 pt-3 border-t border-[#b7e4c7]/60 space-y-2 text-xs text-stone-700">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Calibrated Domain:</strong> Sample belongs to calibrated Indian Maize Silage matrix (Mahalanobis distance &lt; 2.50).</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Signal Fidelity:</strong> Spectral diffuse reflectance signal quality meets ASTM E1655 standards.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Spatial Repeatability:</strong> Five sampling points show low variance (CV 8.4%), ruling out focal spoilage pockets.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Narrow Uncertainty:</strong> 95% confidence interval is ±0.6% for Crude Protein and ±1.2% for Dry Matter.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Visual Cross-Check:</strong> 22-D texture and Bromothymol Blue strip show zero conflicting adulteration signals.</span>
                </div>

                <div className="mt-3 p-2.5 rounded-xl bg-white border border-[#b7e4c7] text-[11px] text-[#1b4332] font-bold text-center">
                  🎯 <em>Conclusion:</em> Full quantitative nutritional report is certified and safe for dairy ration balancing.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

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
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-extrabold text-xs shadow-md transition-all active:scale-[0.99]"
        >
          <span>View Verified Nutritional Results</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
