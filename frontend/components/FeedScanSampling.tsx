"use client";

import React, { useState } from "react";
import {
  Camera,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Layers,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { Language } from "../lib/dictionary";

export interface FeedScanSamplingProps {
  feedType: string;
  onProceedToEvidence: () => void;
  onBack: () => void;
  lang: Language;
}

export const FeedScanSampling: React.FC<FeedScanSamplingProps> = ({
  feedType,
  onProceedToEvidence,
  onBack,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<"standard" | "heterogeneous">("standard");
  const [currentStep, setCurrentStep] = useState<number>(5);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  // 5 Points data
  const standardPoints = [
    { id: "P1", label: "Top-Left", cp: 8.5, dm: 34.8, status: "ok" },
    { id: "P2", label: "Top-Right", cp: 8.2, dm: 34.1, status: "ok" },
    { id: "P3", label: "Center-Core", cp: 8.6, dm: 34.9, status: "ok" },
    { id: "P4", label: "Bottom-Left", cp: 8.4, dm: 34.2, status: "ok" },
    { id: "P5", label: "Bottom-Right", cp: 8.7, dm: 35.0, status: "ok" },
  ];

  const heterogeneousPoints = [
    { id: "P1", label: "Top-Left", cp: 8.4, dm: 34.5, status: "ok" },
    { id: "P2", label: "Top-Right", cp: 8.2, dm: 34.0, status: "ok" },
    { id: "P3", label: "Center-Core", cp: 8.5, dm: 34.8, status: "ok" },
    { id: "P4", label: "Bottom-Left", cp: 5.9, dm: 28.2, status: "outlier" },
    { id: "P5", label: "Bottom-Right", cp: 8.1, dm: 33.9, status: "ok" },
  ];

  const points = activeTab === "standard" ? standardPoints : heterogeneousPoints;
  const cvPct = activeTab === "standard" ? 8.4 : 16.9;
  const isConsistent = activeTab === "standard";

  const simulateScan = () => {
    setIsScanning(true);
    setCurrentStep(1);
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= 5) {
          clearInterval(interval);
          setIsScanning(false);
          return 5;
        }
        return prev + 1;
      });
    }, 400);
  };

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
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#2d6a4f] text-white flex items-center justify-center text-xs font-bold">2</span>
            <span className="text-xs font-bold text-[#1b4332]">5-Point Core Scan</span>
          </div>
          <span className="text-stone-300">→</span>
          <div className="flex items-center gap-2 text-stone-400">
            <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center text-xs font-bold">3</span>
            <span className="text-xs font-medium">AI Evidence</span>
          </div>
          <span className="text-stone-300">→</span>
          <div className="flex items-center gap-2 text-stone-400">
            <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center text-xs font-bold">4</span>
            <span className="text-xs font-medium">Results</span>
          </div>
        </div>

        {/* Demo Switcher for Testing Outlier / Heterogeneity */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl text-[11px] font-bold">
          <button
            onClick={() => setActiveTab("standard")}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              activeTab === "standard" ? "bg-white text-[#1b4332] shadow-xs" : "text-stone-500"
            }`}
          >
            Normal Batch
          </button>
          <button
            onClick={() => setActiveTab("heterogeneous")}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              activeTab === "heterogeneous" ? "bg-white text-amber-700 shadow-xs" : "text-stone-500"
            }`}
          >
            Heterogeneous Outlier
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Live Feed Camera Viewfinder (5 cols) */}
        <div className="lg:col-span-6 bg-white p-5 rounded-3xl border border-stone-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#2d6a4f]" />
                <span className="text-xs font-extrabold text-[#1b4332]">Optical Camera & NIR Sensor Target</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Live Frame 60fps
              </span>
            </div>

            {/* Visual Viewfinder Box */}
            <div className="relative w-full h-72 rounded-2xl bg-stone-900 overflow-hidden border-2 border-dashed border-[#52b788]/60 flex items-center justify-center group">
              {/* Background realistic feed photo texture */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-85"
                style={{
                  backgroundImage:
                    "url('/images/silage-bunker.jpg'), radial-gradient(circle at center, #2d6a4f 0%, #0d2818 100%)",
                }}
              />
              <div className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px]"></div>

              {/* Reticle Bounding Target */}
              <div className="relative z-10 w-48 h-48 border-2 border-white/80 rounded-2xl flex flex-col items-center justify-center p-3 text-center shadow-lg">
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-emerald-400"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-emerald-400"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-emerald-400"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-emerald-400"></div>

                <div className="w-12 h-12 rounded-full bg-emerald-500/30 border border-emerald-300 flex items-center justify-center text-white mb-2 animate-pulse">
                  <Sparkles className="w-6 h-6 text-emerald-300" />
                </div>
                <p className="text-white text-xs font-extrabold drop-shadow-md">Sample Region Active</p>
                <p className="text-[10px] text-emerald-200 font-medium">ISO 12099 Diffuse Reflectance</p>
              </div>

              {/* Real-time scan indicator */}
              {isScanning && (
                <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center z-20 backdrop-blur-xs">
                  <div className="bg-black/80 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border border-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    Scanning Point P{currentStep} / 5...
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between pt-3 border-t border-stone-100">
            <span className="text-[11px] text-stone-500">Hold probe 10-15mm above fodder sample</span>
            <button
              onClick={simulateScan}
              disabled={isScanning}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold text-xs transition-all shadow-xs"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isScanning ? "Scanning..." : "Simulate Core Scan"}</span>
            </button>
          </div>
        </div>

        {/* Right Col: 5-Point Progress, Consistency & Batch Nutrition Map (7 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* 5-Point Sampling Progress Card */}
          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-extrabold text-[#1b4332]">5-Point ISO 12099 Sampling Grid</h3>
                <p className="text-[11px] text-stone-500">Eliminates single-point sampling bias across bunker pile</p>
              </div>
              <span className="text-xs font-black text-[#2d6a4f] bg-[#f3f9f4] px-2.5 py-1 rounded-xl border border-[#b7e4c7]">
                5 / 5 Points Captured
              </span>
            </div>

            {/* Points Pills */}
            <div className="grid grid-cols-5 gap-2">
              {points.map((pt, idx) => {
                const isOutlier = pt.status === "outlier";
                return (
                  <div
                    key={pt.id}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      isOutlier
                        ? "bg-amber-50 border-amber-300 text-amber-900"
                        : "bg-[#f3f9f4] border-[#b7e4c7] text-[#1b4332]"
                    }`}
                  >
                    <div className="text-[11px] font-black">{pt.id}</div>
                    <div className="text-[10px] font-semibold mt-0.5">{pt.cp}% CP</div>
                    <div className="text-[9px] text-stone-500">{isOutlier ? "⚠️ Outlier" : "✓ Valid"}</div>
                  </div>
                );
              })}
            </div>

            {/* Sampling Consistency Banner */}
            <div
              className={`mt-4 p-3.5 rounded-2xl border flex items-center justify-between ${
                isConsistent
                  ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                  : "bg-amber-50 border-amber-300 text-amber-900"
              }`}
            >
              <div className="flex items-center gap-3">
                {isConsistent ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black">
                      {isConsistent ? "🟢 CONSISTENT BATCH" : "🟠 HETEROGENEOUS BATCH"}
                    </span>
                    <span className="text-[11px] font-bold px-1.5 py-0.2 rounded bg-white border border-current">
                      CV = {cvPct}%
                    </span>
                  </div>
                  <p className="text-[11px] mt-0.5 opacity-90">
                    {isConsistent
                      ? "Spatial variance is within ISO 12099 repeatability tolerance (<12%)."
                      : "Point P4 differs significantly (CP 5.9% vs 8.5% avg). Rescan recommended."}
                  </p>
                </div>
              </div>

              {!isConsistent && (
                <button
                  onClick={() => setActiveTab("standard")}
                  className="px-3 py-1.5 rounded-xl bg-amber-600 text-white text-[11px] font-bold hover:bg-amber-700 shrink-0 shadow-xs"
                >
                  Rescan P4
                </button>
              )}
            </div>
          </div>

          {/* Breakthrough Feature: Batch Nutrition Spatial Map */}
          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#2d6a4f]" />
                <h3 className="text-xs font-extrabold text-[#1b4332] uppercase tracking-wider">
                  Batch Spatial Nutrition Map (Crude Protein %)
                </h3>
              </div>
              <span className="text-[10px] text-stone-500 font-medium">Bunker Top-to-Bottom Profile</span>
            </div>

            {/* 3x2 Map Matrix */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-center">
                <span className="text-[10px] text-stone-400 font-bold block">P1 (Top-L)</span>
                <span className="text-sm font-black text-[#1b4332]">{points[0].cp}%</span>
              </div>
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-center">
                <span className="text-[10px] text-stone-400 font-bold block">P2 (Top-R)</span>
                <span className="text-sm font-black text-[#1b4332]">{points[1].cp}%</span>
              </div>
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-center">
                <span className="text-[10px] text-stone-400 font-bold block">P3 (Center)</span>
                <span className="text-sm font-black text-[#1b4332]">{points[2].cp}%</span>
              </div>

              <div
                className={`p-3 rounded-xl border text-center ${
                  points[3].status === "outlier"
                    ? "bg-amber-100 border-amber-400 text-amber-900 ring-2 ring-amber-300"
                    : "bg-stone-50 border-stone-200"
                }`}
              >
                <span className="text-[10px] font-bold block text-stone-500">P4 (Bot-L)</span>
                <span className="text-sm font-black text-[#1b4332]">{points[3].cp}%</span>
                {points[3].status === "outlier" && (
                  <span className="text-[9px] font-bold text-amber-800 block">Outlier Zone</span>
                )}
              </div>

              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-center">
                <span className="text-[10px] text-stone-400 font-bold block">P5 (Bot-R)</span>
                <span className="text-sm font-black text-[#1b4332]">{points[4].cp}%</span>
              </div>

              <div className="bg-[#f3f9f4] p-3 rounded-xl border border-[#b7e4c7] text-center flex flex-col justify-center">
                <span className="text-[10px] text-[#2d6a4f] font-bold block">Batch Avg</span>
                <span className="text-sm font-black text-[#1b4332]">
                  {(points.reduce((acc, p) => acc + p.cp, 0) / 5).toFixed(1)}%
                </span>
              </div>
            </div>

            <p className="text-[11px] text-stone-500 mt-3">
              💡 <em>Why this matters:</em> Conventional single-point scoops fail to detect spoil pockets. Multi-point map validates uniform fermentation.
            </p>
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
          <span>Back to Feed Selection</span>
        </button>

        <button
          onClick={onProceedToEvidence}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-extrabold text-xs shadow-md transition-all active:scale-[0.99]"
        >
          <span>Proceed to AI Evidence & Trust Pipeline</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
