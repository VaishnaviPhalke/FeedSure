"use client";

import React, { useState } from "react";
import {
  FileText,
  Download,
  Filter,
  TrendingUp,
  Calendar,
  Layers,
  ArrowRight,
  Sparkles,
  Share2,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Language } from "../lib/dictionary";

export interface ReportsHistoryScreenProps {
  onViewBatch: (batchId: string) => void;
  lang: Language;
}

export const ReportsHistoryScreen: React.FC<ReportsHistoryScreenProps> = ({
  onViewBatch,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<"feed" | "storage" | "advisory">("feed");
  const [selectedFeedFilter, setSelectedFeedFilter] = useState<string>("All");

  const cpTrendData = [
    { month: "Apr", cp: 10.4, dm: 35.2 },
    { month: "May", cp: 9.8, dm: 34.8 },
    { month: "Jun (Early)", cp: 10.1, dm: 35.4 },
    { month: "Jun (Late)", cp: 8.7, dm: 34.2 },
    { month: "Jul", cp: 9.2, dm: 34.9 },
  ];

  const testRecords = [
    { date: "12 Jun 2026", batchId: "MS-2026-0012", type: "Maize Silage", cp: "8.7%", dm: "34.2%", ndf: "42.1%", adf: "25.3%", status: "Good", evidence: "HIGH" },
    { date: "10 Jun 2026", batchId: "MS-2026-0011", type: "Maize Silage", cp: "10.1%", dm: "35.4%", ndf: "40.8%", adf: "24.1%", status: "Good", evidence: "HIGH" },
    { date: "08 Jun 2026", batchId: "GF-2026-0008", type: "Green Fodder", cp: "9.5%", dm: "22.0%", ndf: "52.0%", adf: "32.0%", status: "Good", evidence: "HIGH" },
    { date: "05 Jun 2026", batchId: "DF-2026-0004", type: "Dry Fodder", cp: "3.8%", dm: "88.0%", ndf: "68.0%", adf: "44.0%", status: "Retest", evidence: "MED" },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-8">
      {/* Header & Export Actions */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#2d6a4f]" />
            <h2 className="text-lg font-black text-[#1b4332]">Farm Reports & Historical Analytics</h2>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Historical audit logs, seasonal nutrient trends, and batch comparison benchmarks
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold text-xs shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF Report</span>
          </button>
        </div>
      </div>

      {/* 3-Month Crude Protein Trend Analysis Chart */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-[#1b4332]">Seasonal Crude Protein & Dry Matter Trajectory</h3>
            <p className="text-[11px] text-stone-500">Longitudinal quality monitoring across harvest cuts</p>
          </div>
          <span className="text-xs font-bold text-[#2d6a4f] bg-[#f3f9f4] px-3 py-1 rounded-xl border border-[#b7e4c7]">
            Maize Silage Quality Track
          </span>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cpTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#888888" fontSize={11} tickLine={false} />
              <YAxis stroke="#888888" fontSize={11} tickLine={false} domain={[6, 12]} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1b4332", color: "#fff", borderRadius: "8px", fontSize: "12px", border: "none" }}
              />
              <Line type="monotone" dataKey="cp" name="Crude Protein %" stroke="#2d6a4f" strokeWidth={3} dot={{ r: 4, fill: "#52b788" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Historical Test Records Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <span className="text-xs font-extrabold text-[#1b4332] uppercase tracking-wider">
            Recent Batch Test Audits
          </span>
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-stone-400" />
            <select
              value={selectedFeedFilter}
              onChange={(e) => setSelectedFeedFilter(e.target.value)}
              className="text-xs bg-white border border-stone-200 rounded-lg px-2 py-1 font-bold text-stone-700"
            >
              <option value="All">All Feed Types</option>
              <option value="Maize Silage">Maize Silage</option>
              <option value="Green Fodder">Green Fodder</option>
              <option value="Dry Fodder">Dry Fodder</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-bold uppercase text-[10px] border-b border-stone-200">
              <tr>
                <th className="px-5 py-3">Date Tested</th>
                <th className="px-4 py-3">Batch ID</th>
                <th className="px-4 py-3">Feed Type</th>
                <th className="px-4 py-3">Crude Protein</th>
                <th className="px-4 py-3">Dry Matter</th>
                <th className="px-4 py-3">NDF Fiber</th>
                <th className="px-4 py-3">Evidence</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium text-stone-700">
              {testRecords.map((row) => (
                <tr key={row.batchId} className="hover:bg-[#f3f9f4]/60 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-stone-900">{row.date}</td>
                  <td className="px-4 py-3.5 font-mono text-[11px] font-bold text-[#2d6a4f]">{row.batchId}</td>
                  <td className="px-4 py-3.5 font-bold text-[#1b4332]">{row.type}</td>
                  <td className="px-4 py-3.5 font-black text-[#2d6a4f]">{row.cp}</td>
                  <td className="px-4 py-3.5">{row.dm}</td>
                  <td className="px-4 py-3.5">{row.ndf}</td>
                  <td className="px-4 py-3.5">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      🟢 {row.evidence}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => onViewBatch(row.batchId)}
                      className="text-[11px] font-bold text-[#2d6a4f] hover:underline"
                    >
                      View Report →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
