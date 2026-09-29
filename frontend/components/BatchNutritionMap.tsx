"use client";

import React, { useState } from "react";
import { Layers, AlertTriangle, CheckCircle2, Sparkles, Info } from "lucide-react";
import { Language } from "../lib/dictionary";

export interface BatchNutritionMapProps {
  isOutlierMode?: boolean;
  onPointSelect?: (pointId: string) => void;
  lang?: Language;
}

export const BatchNutritionMap: React.FC<BatchNutritionMapProps> = ({
  isOutlierMode = false,
  onPointSelect,
  lang = "en",
}) => {
  const [selectedMetric, setSelectedMetric] = useState<"cp" | "dm" | "ndf" | "adf" | "moisture" | "risk">("cp");
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);

  // Metric datasets for 5 core sampling locations
  const metricsData = {
    cp: {
      name: "Crude Protein (CP %)",
      unit: "%",
      target: "8.0 - 12.0%",
      points: [
        { id: "P1", label: "Top-Left (Face)", val: 8.5, status: "ok" },
        { id: "P2", label: "Top-Right (Face)", val: 8.2, status: "ok" },
        { id: "P3", label: "Core Center", val: 8.6, status: "ok" },
        { id: "P4", label: "Bottom-Left", val: isOutlierMode ? 5.9 : 8.4, status: isOutlierMode ? "outlier" : "ok" },
        { id: "P5", label: "Bottom-Right", val: 8.7, status: "ok" },
      ],
      avg: isOutlierMode ? "7.9%" : "8.5%",
      cv: isOutlierMode ? "16.9%" : "8.4%",
    },
    dm: {
      name: "Dry Matter (DM %)",
      unit: "%",
      target: "30.0 - 38.0%",
      points: [
        { id: "P1", label: "Top-Left", val: 34.8, status: "ok" },
        { id: "P2", label: "Top-Right", val: 34.1, status: "ok" },
        { id: "P3", label: "Core Center", val: 34.9, status: "ok" },
        { id: "P4", label: "Bottom-Left", val: isOutlierMode ? 28.2 : 34.2, status: isOutlierMode ? "outlier" : "ok" },
        { id: "P5", label: "Bottom-Right", val: 35.0, status: "ok" },
      ],
      avg: isOutlierMode ? "33.2%" : "34.6%",
      cv: isOutlierMode ? "11.2%" : "4.8%",
    },
    ndf: {
      name: "Neutral Detergent Fiber (NDF %)",
      unit: "%",
      target: "38.0 - 48.0%",
      points: [
        { id: "P1", label: "Top-Left", val: 41.5, status: "ok" },
        { id: "P2", label: "Top-Right", val: 42.0, status: "ok" },
        { id: "P3", label: "Core Center", val: 42.1, status: "ok" },
        { id: "P4", label: "Bottom-Left", val: isOutlierMode ? 49.8 : 42.5, status: isOutlierMode ? "outlier" : "ok" },
        { id: "P5", label: "Bottom-Right", val: 41.8, status: "ok" },
      ],
      avg: isOutlierMode ? "43.4%" : "42.0%",
      cv: isOutlierMode ? "8.2%" : "3.1%",
    },
    adf: {
      name: "Acid Detergent Fiber (ADF %)",
      unit: "%",
      target: "22.0 - 28.0%",
      points: [
        { id: "P1", label: "Top-Left", val: 24.8, status: "ok" },
        { id: "P2", label: "Top-Right", val: 25.1, status: "ok" },
        { id: "P3", label: "Core Center", val: 25.3, status: "ok" },
        { id: "P4", label: "Bottom-Left", val: isOutlierMode ? 29.5 : 25.4, status: isOutlierMode ? "outlier" : "ok" },
        { id: "P5", label: "Bottom-Right", val: 25.0, status: "ok" },
      ],
      avg: isOutlierMode ? "25.9%" : "25.1%",
      cv: isOutlierMode ? "7.4%" : "2.9%",
    },
    moisture: {
      name: "Moisture Content (%)",
      unit: "%",
      target: "62.0 - 70.0%",
      points: [
        { id: "P1", label: "Top-Left", val: 65.2, status: "ok" },
        { id: "P2", label: "Top-Right", val: 65.9, status: "ok" },
        { id: "P3", label: "Core Center", val: 65.1, status: "ok" },
        { id: "P4", label: "Bottom-Left", val: isOutlierMode ? 71.8 : 65.8, status: isOutlierMode ? "outlier" : "ok" },
        { id: "P5", label: "Bottom-Right", val: 65.0, status: "ok" },
      ],
      avg: isOutlierMode ? "66.6%" : "65.4%",
      cv: isOutlierMode ? "9.8%" : "3.2%",
    },
    risk: {
      name: "Focal Fermentation Risk Index",
      unit: "/100",
      target: "< 25 Low",
      points: [
        { id: "P1", label: "Top-Left", val: 12, status: "ok" },
        { id: "P2", label: "Top-Right", val: 15, status: "ok" },
        { id: "P3", label: "Core Center", val: 8, status: "ok" },
        { id: "P4", label: "Bottom-Left", val: isOutlierMode ? 68 : 14, status: isOutlierMode ? "outlier" : "ok" },
        { id: "P5", label: "Bottom-Right", val: 10, status: "ok" },
      ],
      avg: isOutlierMode ? "25.4 (High)" : "11.8 (Low)",
      cv: isOutlierMode ? "42.0%" : "8.1%",
    },
  };

  const current = metricsData[selectedMetric];

  const handlePointClick = (id: string) => {
    setSelectedPoint(selectedPoint === id ? null : id);
    if (onPointSelect) onPointSelect(id);
  };

  return (
    <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-4">
      {/* Header & Metric Switcher Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-teal-700" />
            <h3 className="text-sm font-extrabold text-[#1b4332]">
              SILAGE BUNKER SPATIAL NUTRITION MAP
            </h3>
          </div>
          <p className="text-[11px] text-stone-500">
            ISO 12099 multi-point core mapping reveals hidden focal spoilage & fermentation gradients
          </p>
        </div>

        {/* 6 Metric Selector Buttons */}
        <div className="flex flex-wrap gap-1 bg-stone-100 p-1 rounded-xl text-[11px] font-bold">
          {(["cp", "dm", "ndf", "adf", "moisture", "risk"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMetric(m)}
              className={`px-2 py-1 rounded-lg uppercase transition-all ${
                selectedMetric === m
                  ? "bg-teal-800 text-white shadow-xs font-black"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Spatial Bunker Visualization Canvas */}
      <div className="relative w-full rounded-2xl bg-gradient-to-b from-stone-100 to-stone-200/90 border-2 border-stone-300 p-4 overflow-hidden">
        {/* Top/Bottom Bunker Wall Labels */}
        <div className="flex justify-between items-center text-[10px] font-mono font-bold text-stone-400 uppercase tracking-widest mb-2 px-2 border-b border-stone-300/60 pb-1">
          <span>▲ TOP / FACE OPENING</span>
          <span>SILO DEPTH: 2.5 METERS</span>
        </div>

        {/* 5-Point Spatial Layout: P1, P2 (Top) / P3 (Center) / P4, P5 (Bottom) */}
        <div className="py-2 space-y-3">
          {/* Row 1: Top Points P1 & P2 */}
          <div className="grid grid-cols-2 gap-4">
            {[current.points[0], current.points[1]].map((pt) => {
              const isOutlier = pt.status === "outlier";
              const isSelected = selectedPoint === pt.id;

              return (
                <div
                  key={pt.id}
                  onClick={() => handlePointClick(pt.id)}
                  className={`p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                    isOutlier
                      ? "bg-amber-100/90 border-amber-500 shadow-sm ring-2 ring-amber-300"
                      : isSelected
                      ? "bg-teal-50 border-teal-600 shadow-sm"
                      : "bg-white border-stone-200 hover:border-teal-400"
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[10px] font-mono font-bold text-stone-500 uppercase">{pt.id} • {pt.label}</span>
                    <span className={`text-[10px] font-extrabold ${isOutlier ? "text-amber-800" : "text-teal-800"}`}>
                      {isOutlier ? "⚠ Outlier" : "✓ In-Spec"}
                    </span>
                  </div>
                  <div className="text-xl font-black text-[#1b4332]">
                    {pt.val} <span className="text-xs font-semibold text-stone-500">{current.unit}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Row 2: Center Core Point P3 */}
          <div className="max-w-xs mx-auto">
            {(() => {
              const pt = current.points[2];
              const isSelected = selectedPoint === pt.id;
              return (
                <div
                  onClick={() => handlePointClick(pt.id)}
                  className={`p-3 rounded-2xl border-2 text-center cursor-pointer transition-all ${
                    isSelected
                      ? "bg-teal-50 border-teal-600 shadow-sm"
                      : "bg-white border-stone-200 hover:border-teal-400"
                  }`}
                >
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    <span className="text-[10px] font-mono font-bold text-stone-500 uppercase">{pt.id} • {pt.label}</span>
                    <span className="text-[10px] font-extrabold text-teal-800">✓ Deep Core</span>
                  </div>
                  <div className="text-xl font-black text-[#1b4332]">
                    {pt.val} <span className="text-xs font-semibold text-stone-500">{current.unit}</span>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Row 3: Bottom Points P4 & P5 */}
          <div className="grid grid-cols-2 gap-4">
            {[current.points[3], current.points[4]].map((pt) => {
              const isOutlier = pt.status === "outlier";
              const isSelected = selectedPoint === pt.id;

              return (
                <div
                  key={pt.id}
                  onClick={() => handlePointClick(pt.id)}
                  className={`p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                    isOutlier
                      ? "bg-amber-100/90 border-amber-500 shadow-sm ring-2 ring-amber-300"
                      : isSelected
                      ? "bg-teal-50 border-teal-600 shadow-sm"
                      : "bg-white border-stone-200 hover:border-teal-400"
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[10px] font-mono font-bold text-stone-500 uppercase">{pt.id} • {pt.label}</span>
                    <span className={`text-[10px] font-extrabold ${isOutlier ? "text-amber-800" : "text-teal-800"}`}>
                      {isOutlier ? "⚠ Outlier Zone" : "✓ In-Spec"}
                    </span>
                  </div>
                  <div className="text-xl font-black text-[#1b4332]">
                    {pt.val} <span className="text-xs font-semibold text-stone-500">{current.unit}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Silo Floor Label */}
        <div className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-widest mt-2 pt-1 border-t border-stone-300/60 text-center">
          ▼ SILO FLOOR & DRAINAGE BASE
        </div>
      </div>

      {/* Spatial Summary Strip */}
      <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="text-stone-500 font-bold">Selected Metric: <strong className="text-[#1b4332]">{current.name}</strong></span>
          <span className="text-stone-300">•</span>
          <span className="text-stone-500">Batch Mean: <strong className="text-[#1b4332]">{current.avg}</strong></span>
          <span className="text-stone-300">•</span>
          <span className="text-stone-500">Spatial CV: <strong className={isOutlierMode ? "text-amber-700 font-black" : "text-teal-800 font-black"}>{current.cv}</strong></span>
        </div>

        <span className="text-[11px] text-stone-500 font-medium">
          Target Range: <strong>{current.target}</strong>
        </span>
      </div>
    </div>
  );
};
