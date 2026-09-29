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
import { BatchNutritionMap } from "./BatchNutritionMap";

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
    }, 350);
  };

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
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl text-[11px] font-bold self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("standard")}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeTab === "standard" ? "bg-white text-teal-900 shadow-xs font-black" : "text-stone-500"
            }`}
          >
            🟢 Standard Batch (CV 8.4%)
          </button>
          <button
            onClick={() => setActiveTab("heterogeneous")}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeTab === "heterogeneous" ? "bg-amber-600 text-white shadow-xs font-black" : "text-stone-500"
            }`}
          >
            🟠 Heterogeneous Outlier (CV 16.9%)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Live Feed Camera Viewfinder (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-3xl border border-stone-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#2d6a4f]" />
                <span className="text-xs font-extrabold text-[#1b4332]">Live Camera & NIR Target Matrix</span>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                60fps ISO 12099
              </span>
            </div>

            {/* Viewfinder Frame */}
            <div className="relative w-full h-72 rounded-2xl bg-stone-900 overflow-hidden border-2 border-dashed border-[#52b788]/60 flex items-center justify-center group">
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
                <p className="text-white text-xs font-extrabold drop-shadow-md">Spatial Probe Region</p>
                <p className="text-[10px] text-emerald-200 font-medium">800nm - 1050nm NIR Scan</p>
              </div>

              {isScanning && (
                <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center z-20 backdrop-blur-xs">
                  <div className="bg-black/80 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border border-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    Capturing Core Point P{currentStep} / 5...
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between pt-3 border-t border-stone-100">
            <span className="text-[11px] text-stone-500">Hold sensor probe 10-15mm above fodder</span>
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

        {/* Right Col: Interactive Batch Spatial Nutrition Map (7 cols) */}
        <div className="lg:col-span-7">
          <BatchNutritionMap isOutlierMode={activeTab === "heterogeneous"} />
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
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-extrabold text-xs shadow-md transition-all active:scale-[0.99]"
        >
          <span>Proceed to Evidence Contract</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
