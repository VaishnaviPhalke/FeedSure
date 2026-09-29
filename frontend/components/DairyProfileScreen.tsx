"use client";

import React, { useState } from "react";
import {
  Beef,
  Milk,
  Sparkles,
  Layers,
  CheckCircle2,
  ArrowRight,
  Save,
  Info,
} from "lucide-react";
import { Language } from "../lib/dictionary";

export interface DairyProfileScreenProps {
  onProceedToBasket: () => void;
  lang: Language;
}

export const DairyProfileScreen: React.FC<DairyProfileScreenProps> = ({
  onProceedToBasket,
  lang,
}) => {
  const [lactatingCount, setLactatingCount] = useState<number>(9);
  const [dryCount, setDryCount] = useState<number>(3);
  const [youngCount, setYoungCount] = useState<number>(2);
  const [milkYield, setMilkYield] = useState<number>(10.5);
  const [lactationStage, setLactationStage] = useState<string>("mid");
  const [saved, setSaved] = useState<boolean>(false);

  const totalHerd = lactatingCount + dryCount + youngCount;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const reqTable = [
    { nutrient: "Crude Protein (CP)", target: "14.0% - 16.0%", unit: "% of DMI", desc: "Supports 10-12 L daily milk output" },
    { nutrient: "Neutral Detergent Fiber (NDF)", target: "28.0% - 32.0%", unit: "% of DMI", desc: "Maintains rumen health and milk fat" },
    { nutrient: "Acid Detergent Fiber (ADF)", target: "19.0% - 21.0%", unit: "% of DMI", desc: "Limits indigestible bulk fill" },
    { nutrient: "Net Energy Lactation (NEL)", target: "2.3 - 2.5", unit: "Mcal/kg DM", desc: "Supplies daily metabolic & milk energy" },
    { nutrient: "Calcium (Ca)", target: "0.60% - 0.80%", unit: "% of DMI", desc: "Prevents subclinical hypocalcemia" },
    { nutrient: "Phosphorus (P)", target: "0.35% - 0.50%", unit: "% of DMI", desc: "Essential for reproductive cycling" },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-8">
      {/* Header */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Beef className="w-5 h-5 text-[#2d6a4f]" />
            <h2 className="text-lg font-black text-[#1b4332]">Dairy Herd & Nutrition Context Profile</h2>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            ICAR / NRC Nutritional Standards for Indian Crossbred Cows & Buffaloes
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saved ? "Saved ✓" : "Save Herd Context"}</span>
          </button>
          <button
            onClick={onProceedToBasket}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold text-xs shadow-xs"
          >
            <span>Proceed to Feed Basket</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Herd Context Form + Nutrition Reference Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Herd Breakdown & Lactation Stage (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-[#1b4332]">Herd Size Breakdown</h3>
              <span className="text-xs font-black text-[#2d6a4f] bg-[#f3f9f4] px-2.5 py-1 rounded-xl border border-[#b7e4c7]">
                Total: {totalHerd} Animals
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border border-stone-200">
                <div>
                  <span className="text-xs font-bold text-stone-700 block">Lactating Cows</span>
                  <span className="text-[10px] text-stone-400">Currently in active milk production</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLactatingCount(Math.max(1, lactatingCount - 1))}
                    className="w-7 h-7 rounded-lg bg-white border border-stone-300 font-bold text-xs hover:bg-stone-100"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-black text-sm text-[#1b4332]">{lactatingCount}</span>
                  <button
                    onClick={() => setLactatingCount(lactatingCount + 1)}
                    className="w-7 h-7 rounded-lg bg-white border border-stone-300 font-bold text-xs hover:bg-stone-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border border-stone-200">
                <div>
                  <span className="text-xs font-bold text-stone-700 block">Dry / Pregnant Cows</span>
                  <span className="text-[10px] text-stone-400">Non-lactating resting phase</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setDryCount(Math.max(0, dryCount - 1))}
                    className="w-7 h-7 rounded-lg bg-white border border-stone-300 font-bold text-xs hover:bg-stone-100"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-black text-sm text-[#1b4332]">{dryCount}</span>
                  <button
                    onClick={() => setDryCount(dryCount + 1)}
                    className="w-7 h-7 rounded-lg bg-white border border-stone-300 font-bold text-xs hover:bg-stone-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border border-stone-200">
                <div>
                  <span className="text-xs font-bold text-stone-700 block">Calves / Young Stock</span>
                  <span className="text-[10px] text-stone-400">Growing replacement heifers</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setYoungCount(Math.max(0, youngCount - 1))}
                    className="w-7 h-7 rounded-lg bg-white border border-stone-300 font-bold text-xs hover:bg-stone-100"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-black text-sm text-[#1b4332]">{youngCount}</span>
                  <button
                    onClick={() => setYoungCount(youngCount + 1)}
                    className="w-7 h-7 rounded-lg bg-white border border-stone-300 font-bold text-xs hover:bg-stone-100"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Milk Yield Target */}
            <div className="pt-2 border-t border-stone-100">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-stone-700">Average Daily Milk Yield</span>
                <span className="text-xs font-black text-[#2d6a4f]">{milkYield} Liters / cow</span>
              </div>
              <input
                type="range"
                min="5"
                max="25"
                step="0.5"
                value={milkYield}
                onChange={(e) => setMilkYield(Number(e.target.value))}
                className="w-full accent-[#2d6a4f] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                <span>5 L (Low)</span>
                <span>15 L (Target)</span>
                <span>25 L (High Yield)</span>
              </div>
            </div>

            {/* Lactation Stage Tabs */}
            <div className="pt-2 border-t border-stone-100">
              <span className="text-xs font-bold text-stone-700 block mb-2">Target Lactation Stage</span>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                {[
                  { id: "early", label: "Early (0-100d)" },
                  { id: "mid", label: "Mid (101-200d)" },
                  { id: "late", label: "Late (201-305d)" },
                  { id: "dry", label: "Dry Period" },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setLactationStage(st.id)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      lactationStage === st.id
                        ? "bg-[#2d6a4f] text-white border-[#2d6a4f] shadow-xs"
                        : "bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100"
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Nutrition Digital Profile & Requirements Table (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-[#1b4332]">
                  Herd Nutritional Target Requirements (ICAR/NRC)
                </h3>
                <p className="text-[11px] text-stone-500">
                  Target diet specs computed for {lactatingCount} lactating cows @ {milkYield} L/day
                </p>
              </div>
            </div>

            {/* Reference Table */}
            <div className="space-y-2.5">
              {reqTable.map((row) => (
                <div
                  key={row.nutrient}
                  className="p-3 rounded-2xl bg-stone-50/70 border border-stone-200 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <span className="font-bold text-[#1b4332] block">{row.nutrient}</span>
                    <span className="text-[10px] text-stone-500">{row.desc}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-black text-[#2d6a4f] text-sm block">{row.target}</span>
                    <span className="text-[9px] text-stone-400 font-semibold">{row.unit}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Architecture Explainer Callout */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#f3f9f4] to-emerald-50 border border-[#b7e4c7] text-xs text-stone-700 flex items-start gap-3">
              <Info className="w-4 h-4 text-[#2d6a4f] shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold text-[#1b4332] block">
                  FeedSure Dairy Nutrition Context Engine
                </span>
                <p className="text-[11px] text-stone-600 mt-0.5 leading-relaxed">
                  Instead of storing simple static herd numbers, FeedSure converts herd count, lactation curve, and milk volume into a dynamic Dry Matter Intake (DMI) and Crude Protein target that feeds directly into the SciPy HiGHS least-cost ration solver.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
