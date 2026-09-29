"use client";

import React, { useState } from "react";
import {
  Building2,
  Users,
  Layers,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Sparkles,
  Download,
} from "lucide-react";
import { Language } from "../lib/dictionary";

export interface CooperativeViewProps {
  lang?: Language;
}

export const CooperativeView: React.FC<CooperativeViewProps> = ({ lang = "en" }) => {
  const [selectedCluster, setSelectedCluster] = useState<string>("Pune District");

  const cooperativesData = [
    { name: "Maize Silage", tested: 84, readyPct: 81, monitorPct: 12, retestPct: 7, avgCp: "8.8%" },
    { name: "Compound Cattle Feed", tested: 48, readyPct: 69, monitorPct: 21, retestPct: 10, avgCp: "18.2%" },
    { name: "Green Fodder (Napier)", tested: 36, readyPct: 91, monitorPct: 6, retestPct: 3, avgCp: "9.6%" },
    { name: "Dry Fodder (Wheat Straw)", tested: 16, readyPct: 94, monitorPct: 6, retestPct: 0, avgCp: "3.9%" },
  ];

  const flaggedBatches = [
    { farm: "Kulkarni Dairy", batchId: "MS-2026-0091", issue: "Silage Heating (36.2°C)", action: "Retest & Air Tight Seal" },
    { farm: "Deshmukh Farms", batchId: "CF-2026-0034", issue: "Suspected Protein Deficit (14.2% vs 18% claim)", action: "Chemical Assay Validation" },
    { farm: "Shinde Agro", batchId: "GF-2026-0012", issue: "High Moisture (76%) & Fungal Risk", action: "Wilting Recommended" },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-8">
      {/* Header & Cluster Selector */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#2d6a4f]" />
            <h2 className="text-lg font-black text-[#1b4332]">
              Dairy Cooperative & District Aggregator Intelligence
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Regional feed quality surveillance across 27 member dairy farms & 184 batches
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCluster}
            onChange={(e) => setSelectedCluster(e.target.value)}
            className="text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 font-bold text-[#1b4332]"
          >
            <option value="Pune District">Pune District Co-op Federation</option>
            <option value="Kolhapur Cluster">Kolhapur Milk Union Cluster</option>
            <option value="Nashik Region">Nashik Fodder Bank Federation</option>
          </select>
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl bg-[#2d6a4f] text-white text-xs font-bold hover:bg-[#1b4332]"
          >
            Export Co-op Report
          </button>
        </div>
      </div>

      {/* 4 Summary KPIs for District Aggregator */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <span className="text-stone-400 font-bold block uppercase text-[10px]">Member Dairy Farms</span>
          <div className="text-2xl font-black text-[#1b4332] mt-0.5">27 Farms</div>
          <span className="text-[10px] text-stone-500 block mt-1">420 Lactating Cattle</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <span className="text-stone-400 font-bold block uppercase text-[10px]">Active Batches Scanned</span>
          <div className="text-2xl font-black text-[#1b4332] mt-0.5">184 Batches</div>
          <span className="text-[10px] text-emerald-700 font-bold block mt-1">79% In-Spec Quality</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <span className="text-stone-400 font-bold block uppercase text-[10px]">Average Silage CP</span>
          <div className="text-2xl font-black text-[#2d6a4f] mt-0.5">8.8% CP</div>
          <span className="text-[10px] text-stone-500 block mt-1">Optimal Fermentation Baseline</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border-2 border-amber-300 shadow-xs">
          <span className="text-amber-800 font-bold block uppercase text-[10px]">Escalation Warnings</span>
          <div className="text-2xl font-black text-amber-700 mt-0.5">6 Batches</div>
          <span className="text-[10px] text-amber-800 font-bold block mt-1">Require Retest / Action</span>
        </div>
      </div>

      {/* Regional Quality Distribution by Feed Type */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-4">
        <h3 className="text-sm font-extrabold text-[#1b4332]">
          Regional Quality Compliance by Fodder Category
        </h3>

        <div className="space-y-3 text-xs">
          {cooperativesData.map((row) => (
            <div key={row.name} className="p-3.5 rounded-2xl bg-stone-50/70 border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-[#1b4332]">{row.name} ({row.tested} Batches)</span>
                <span className="text-xs font-black text-[#2d6a4f]">Avg CP: {row.avgCp}</span>
              </div>

              {/* Progress Distribution Bar */}
              <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden flex">
                <div className="bg-emerald-600 h-full" style={{ width: `${row.readyPct}%` }} title={`Decision Ready: ${row.readyPct}%`}></div>
                <div className="bg-amber-400 h-full" style={{ width: `${row.monitorPct}%` }} title={`Monitor: ${row.monitorPct}%`}></div>
                <div className="bg-red-500 h-full" style={{ width: `${row.retestPct}%` }} title={`Retest: ${row.retestPct}%`}></div>
              </div>

              <div className="flex justify-between text-[10px] text-stone-500 font-bold">
                <span className="text-emerald-800">🟢 {row.readyPct}% Decision-Ready</span>
                <span className="text-amber-800">🟡 {row.monitorPct}% Storage Watch</span>
                <span className="text-red-700">🔴 {row.retestPct}% Retest Flagged</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flagged Batches Requiring Field Officer Intervention */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-extrabold text-[#1b4332] uppercase tracking-wider">
              Field Officer Action List (6 Flagged Farm Batches)
            </span>
          </div>
        </div>

        <div className="divide-y divide-stone-100 text-xs font-medium text-stone-700">
          {flaggedBatches.map((item) => (
            <div key={item.batchId} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#f3f9f4]/40">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-[#1b4332]">{item.farm}</span>
                  <span className="font-mono text-[10px] text-stone-400 font-bold">({item.batchId})</span>
                </div>
                <p className="text-amber-800 font-semibold mt-0.5 text-[11px]">{item.issue}</p>
              </div>

              <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[11px] self-start sm:self-auto">
                Action: {item.action}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
