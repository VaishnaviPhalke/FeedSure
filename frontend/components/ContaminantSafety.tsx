"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  FlaskConical,
  Camera,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Info,
  Layers,
} from "lucide-react";
import { Language } from "../lib/dictionary";

export interface ContaminantSafetyProps {
  feedType: string;
  batchId?: string;
  onProceedToRation: () => void;
  onBack: () => void;
  lang: Language;
}

export const ContaminantSafety: React.FC<ContaminantSafetyProps> = ({
  feedType,
  batchId = "MS-2026-0012",
  onProceedToRation,
  onBack,
  lang,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [showStripModal, setShowStripModal] = useState<boolean>(false);

  const safetyItems = [
    {
      id: "urea",
      category: "adulteration",
      title: "Urea Adulteration",
      status: "Not Detected",
      badgeColor: "emerald",
      badgeText: "🟢 Normal",
      evidence: "Bromothymol Blue Colorimetry (ΔE = 9.4, below ΔE=22.0 threshold)",
      details: "No non-protein nitrogen (NPN) spikes detected. Natural protein verified.",
    },
    {
      id: "aflatoxin",
      category: "mycotoxins",
      title: "Aflatoxin Risk Screening",
      status: "Screening Low",
      badgeColor: "emerald",
      badgeText: "🟢 Low Risk Proxy",
      evidence: "Multi-parameter proxy: Core Temp 31.4°C, Moisture 65.8%, NIR 960nm normal",
      details: "No thermal spike or fungal moisture anomaly observed.",
    },
    {
      id: "mycotoxin",
      category: "mycotoxins",
      title: "General Mycotoxins Signal",
      status: "No Signal",
      badgeColor: "emerald",
      badgeText: "🟢 Clean Signal",
      evidence: "Optical reflectance signature matches clean calibrated profile.",
      details: "Secondary fermentation markers absent in aerobic zone.",
    },
    {
      id: "mould",
      category: "visual",
      title: "Mould-Like Surface Anomaly",
      status: "Low Risk",
      badgeColor: "emerald",
      badgeText: "🟢 0.8% Coverage",
      evidence: "22-D Texture Analyzer (Laplacian variance 142.6, well below 3.0% threshold)",
      details: "Surface color and fiber structure show healthy green-yellow silage hue.",
    },
    {
      id: "silica",
      category: "adulteration",
      title: "Sand / Silica (Acid-Insoluble Ash)",
      status: "Low (<1.5%)",
      badgeColor: "emerald",
      badgeText: "🟢 Low AIA (1.1%)",
      evidence: "NIR baseline tilt shift ΔR = 0.012 (Clean fodder baseline)",
      details: "Soil contamination minimal during harvesting and silo packing.",
    },
    {
      id: "foreign",
      category: "visual",
      title: "Foreign Material (Plastic/Metal)",
      status: "Not Detected",
      badgeColor: "emerald",
      badgeText: "🟢 Zero Anomaly",
      evidence: "Computer vision segmentation identified no inorganic specular highlights.",
      details: "Sample is 100% organic vegetative matter.",
    },
  ];

  const filteredItems =
    selectedFilter === "all"
      ? safetyItems
      : safetyItems.filter((i) => i.category === selectedFilter);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-8">
      {/* Header & Filter Pills */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#2d6a4f]" />
            <h2 className="text-lg font-black text-[#1b4332]">
              Contaminant, Adulteration & Safety Intelligence
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Batch: {batchId} • {feedType} • Fused Chemometric & Computer Vision Screen
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl text-xs font-bold">
          {["all", "mycotoxins", "adulteration", "visual"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                selectedFilter === cat
                  ? "bg-white text-[#1b4332] shadow-xs font-black"
                  : "text-stone-500 hover:text-stone-800"
              }`}
            >
              {cat === "all" ? "All Checks" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Safety Matrix Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">{item.category}</span>
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {item.badgeText}
                </span>
              </div>

              <h3 className="text-sm font-extrabold text-[#1b4332] mb-1">{item.title}</h3>
              <p className="text-xs text-stone-600 font-medium mb-3">{item.details}</p>
            </div>

            <div className="pt-3 border-t border-stone-100 text-[11px] text-stone-500">
              <span className="font-bold text-stone-700">Evidence Source:</span> {item.evidence}
            </div>
          </div>
        ))}
      </div>

      {/* Bromothymol Blue Urea Chemical Strip Section */}
      <div className="bg-gradient-to-r from-[#f3f9f4] to-emerald-50/50 p-5 rounded-3xl border border-[#b7e4c7] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#2d6a4f] text-white flex items-center justify-center shrink-0">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-black text-[#1b4332]">
                  Bromothymol Blue Urea Adulteration Colorimetry
                </h4>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                  ΔE = 9.4 (SAFE)
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-1">
                Image-based colorimetric shift analysis of chemical test strip confirms zero synthetic urea spike (safe cutoff: ΔE &lt; 22.0).
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowStripModal(true)}
            className="px-4 py-2 rounded-xl bg-white border border-[#2d6a4f] text-[#1b4332] font-bold text-xs hover:bg-[#f3f9f4] shrink-0 shadow-xs"
          >
            View Strip Camera Image
          </button>
        </div>
      </div>

      {/* Scientifically Defensible Toxin Screening Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 text-amber-900">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <h4 className="font-black uppercase tracking-wider text-amber-800">
              Scientifically Defensible Toxin Risk Screening Protocol
            </h4>
            <p className="text-amber-800/90 leading-relaxed">
              Optical and camera sensors provide <strong>risk screening and anomaly detection</strong> (via thermal trajectory, moisture levels, NIR baseline shifts, and visual mould coverage). They do not replace wet-lab ELISA/HPLC assays for regulatory toxin certification. If high risk is flagged, rapid chemical kit confirmation is recommended.
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
          <span>Back to Results</span>
        </button>

        <button
          onClick={onProceedToRation}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-extrabold text-xs shadow-md transition-all active:scale-[0.99]"
        >
          <span>Proceed to Dairy Profile & Ration Advisory</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Strip Modal */}
      {showStripModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-sm text-[#1b4332]">Bromothymol Blue Test Strip Image</h3>
              <button
                onClick={() => setShowStripModal(false)}
                className="text-stone-400 hover:text-stone-700 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="h-48 rounded-2xl bg-amber-50 border-2 border-dashed border-amber-300 flex flex-col items-center justify-center p-4 text-center">
              <div className="w-36 h-8 rounded-lg bg-gradient-to-r from-yellow-300 via-yellow-400 to-green-500 border border-stone-300 mb-2 shadow-inner"></div>
              <p className="text-xs font-bold text-[#1b4332]">Yellow-Green Hue: ΔE = 9.4</p>
              <p className="text-[10px] text-stone-500">Unadulterated fodder control benchmark: ΔE &lt; 22.0</p>
            </div>

            <button
              onClick={() => setShowStripModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#2d6a4f] text-white font-bold text-xs"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
