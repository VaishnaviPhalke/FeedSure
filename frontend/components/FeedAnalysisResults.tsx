"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  ArrowRight,
  ArrowLeft,
  Download,
  Share2,
  FileCheck,
  BarChart3,
  Layers,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Language } from "../lib/dictionary";

export interface FeedAnalysisResultsProps {
  feedType: string;
  batchId?: string;
  onProceedToContaminants: () => void;
  onProceedToRation: () => void;
  onBack: () => void;
  lang: Language;
}

export const FeedAnalysisResults: React.FC<FeedAnalysisResultsProps> = ({
  feedType,
  batchId = "MS-2026-0012",
  onProceedToContaminants,
  onProceedToRation,
  onBack,
  lang,
}) => {
  const [filterMode, setFilterMode] = useState<"raw" | "snv">("raw");

  // Spectral chart curve points (800 - 1050nm)
  const spectralData = [
    { wavelength: "800nm", raw: 0.32, snv: -1.2 },
    { wavelength: "840nm", raw: 0.35, snv: -0.9 },
    { wavelength: "880nm", raw: 0.41, snv: -0.3 },
    { wavelength: "920nm", raw: 0.49, snv: 0.4 },
    { wavelength: "960nm", raw: 0.58, snv: 1.1 },
    { wavelength: "1000nm", raw: 0.54, snv: 0.8 },
    { wavelength: "1050nm", raw: 0.47, snv: 0.2 },
  ];

  const primaryNutrients = [
    {
      name: "Crude Protein (CP)",
      value: "8.7%",
      status: "Good",
      badgeColor: "emerald",
      range: "8.0% - 12.0%",
      ci: "±0.6%",
      desc: "Optimal nitrogenous basis for lactating herd",
    },
    {
      name: "Dry Matter (DM)",
      value: "34.2%",
      status: "Optimal",
      badgeColor: "emerald",
      range: "30.0% - 38.0%",
      ci: "±1.2%",
      desc: "High preservation stability; low clostridial risk",
    },
    {
      name: "Neutral Detergent Fiber (NDF)",
      value: "42.1%",
      status: "Good",
      badgeColor: "emerald",
      range: "38.0% - 48.0%",
      ci: "±1.5%",
      desc: "Promotes cud chewing without gut fill limitation",
    },
    {
      name: "Acid Detergent Fiber (ADF)",
      value: "25.3%",
      status: "Good",
      badgeColor: "emerald",
      range: "22.0% - 28.0%",
      ci: "±1.1%",
      desc: "High ruminal digestibility (>68%)",
    },
  ];

  const secondaryNutrients = [
    { name: "Moisture", value: "65.8%", normal: "<68%" },
    { name: "Metabolizable Energy (ME)", value: "2.49 Mcal/kg", normal: "2.3 - 2.6" },
    { name: "Total Ash", value: "4.8%", normal: "<7.0%" },
    { name: "Acid-Insoluble Ash (Silica/Sand)", value: "1.1%", normal: "<2.5% Clean" },
    { name: "Calcium (Ca)", value: "0.60%", normal: "0.4 - 0.8%" },
    { name: "Phosphorus (P)", value: "0.40%", normal: "0.3 - 0.5%" },
    { name: "Ca : P Ratio", value: "1.50 : 1", normal: "1.2 - 2.0 (Balanced)" },
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
          <div className="flex items-center gap-2 text-stone-400">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">✓</span>
            <span className="text-xs font-medium">3. AI Evidence</span>
          </div>
          <span className="text-stone-300">→</span>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#2d6a4f] text-white flex items-center justify-center text-xs font-bold">4</span>
            <span className="text-xs font-bold text-[#1b4332]">Verified Results</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-xl border border-emerald-300">
            🟢 EVIDENCE: HIGH (91.4%)
          </span>
        </div>
      </div>

      {/* Main Results Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 4 Primary Cards (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-black text-[#1b4332]">Quantitative Nutrition Profile</h3>
                <p className="text-xs text-stone-500">
                  {feedType} • Batch ID: {batchId} • Tested Today
                </p>
              </div>
              <span className="text-xs font-bold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-xl">
                PLSR Chemometrics Model
              </span>
            </div>

            {/* 4 Key Nutrient Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {primaryNutrients.map((item) => (
                <div key={item.name} className="p-4 rounded-2xl border border-stone-200 bg-stone-50/60 hover:bg-stone-50 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-stone-600">{item.name}</span>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {item.status}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 my-1">
                    <span className="text-2xl font-black text-[#1b4332]">{item.value}</span>
                    <span className="text-xs font-semibold text-stone-400">CI {item.ci}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-stone-500 mt-2 pt-2 border-t border-stone-200/60">
                    <span>Range: {item.range}</span>
                    <span className="text-[#2d6a4f] font-bold">95% Confidence</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Secondary Minerals & Fiber Breakdown Table */}
            <div className="mt-4 pt-4 border-t border-stone-100">
              <h4 className="text-xs font-extrabold text-[#1b4332] uppercase tracking-wider mb-2.5">
                Minerals, Silica & Energy Density
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {secondaryNutrients.map((sec) => (
                  <div key={sec.name} className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-[10px] text-stone-500 block truncate">{sec.name}</span>
                    <span className="text-xs font-bold text-[#1b4332]">{sec.value}</span>
                    <span className="text-[9px] text-stone-400 block">Norm: {sec.normal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Spectral Graph + Batch Comparison Widget (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Spectral Reflectance Graph */}
          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#2d6a4f]" />
                <h4 className="text-xs font-extrabold text-[#1b4332] uppercase tracking-wider">
                  NIR Diffuse Reflectance (800-1050nm)
                </h4>
              </div>
              <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-lg text-[10px] font-bold">
                <button
                  onClick={() => setFilterMode("raw")}
                  className={`px-2 py-0.5 rounded ${filterMode === "raw" ? "bg-white text-[#1b4332] shadow-xs" : "text-stone-500"}`}
                >
                  Raw
                </button>
                <button
                  onClick={() => setFilterMode("snv")}
                  className={`px-2 py-0.5 rounded ${filterMode === "snv" ? "bg-white text-[#1b4332] shadow-xs" : "text-stone-500"}`}
                >
                  SNV
                </button>
              </div>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={spectralData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="wavelength" stroke="#888888" fontSize={10} tickLine={false} />
                  <YAxis stroke="#888888" fontSize={10} tickLine={false} domain={["auto", "auto"]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1b4332", color: "#fff", borderRadius: "8px", fontSize: "11px", border: "none" }}
                  />
                  <Line
                    type="monotone"
                    dataKey={filterMode}
                    stroke="#2d6a4f"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: "#52b788" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-stone-400 text-center mt-1">O-H second overtone (960nm) & C-H protein stretch (1020nm)</p>
          </div>

          {/* Unique Innovation: Compare Against Previous Batch */}
          <div className="bg-gradient-to-br from-[#f3f9f4] to-emerald-50/50 p-5 rounded-3xl border border-[#b7e4c7] shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#2d6a4f]" />
                <h4 className="text-xs font-black text-[#1b4332] uppercase tracking-wider">
                  Batch Comparison (Trend)
                </h4>
              </div>
              <span className="text-[10px] font-bold text-stone-500">vs 10 Jun 2026 Batch</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#b7e4c7]">
                <span className="font-bold text-stone-700">Crude Protein (CP)</span>
                <div className="flex items-center gap-2">
                  <span className="text-stone-400 line-through">10.1%</span>
                  <ArrowRight className="w-3 h-3 text-stone-400" />
                  <span className="font-black text-[#1b4332]">8.7%</span>
                  <span className="text-[10px] font-bold text-amber-700 flex items-center">
                    <TrendingDown className="w-3 h-3 inline" /> -1.4%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#b7e4c7]">
                <span className="font-bold text-stone-700">Dry Matter (DM)</span>
                <div className="flex items-center gap-2">
                  <span className="text-stone-400 line-through">35.4%</span>
                  <ArrowRight className="w-3 h-3 text-stone-400" />
                  <span className="font-black text-[#1b4332]">34.2%</span>
                  <span className="text-[10px] font-bold text-stone-600 flex items-center">
                    -1.2%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#b7e4c7]">
                <span className="font-bold text-stone-700">Fiber (NDF)</span>
                <div className="flex items-center gap-2">
                  <span className="text-stone-400 line-through">40.8%</span>
                  <ArrowRight className="w-3 h-3 text-stone-400" />
                  <span className="font-black text-[#1b4332]">42.1%</span>
                  <span className="text-[10px] font-bold text-emerald-700 flex items-center">
                    <TrendingUp className="w-3 h-3 inline" /> +1.3%
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-stone-600 mt-3">
              💡 <em>Actionable Insight:</em> CP dropped by 1.4% compared to previous cut. Ration Advisor will automatically increase concentrate or oil cake in the ration.
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
          <span>Back to AI Evidence</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={onProceedToContaminants}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-[#1b4332] font-extrabold text-xs shadow-xs"
          >
            <span>Safety & Contaminant Screening →</span>
          </button>

          <button
            onClick={onProceedToRation}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-extrabold text-xs shadow-md transition-all active:scale-[0.99]"
          >
            <span>Optimize Dairy Ration & Costs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
