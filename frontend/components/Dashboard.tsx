"use client";

import React, { useState } from "react";
import {
  FlaskConical,
  Radio,
  ShoppingBasket,
  Brain,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Milk,
  RotateCcw,
  Share2,
  Volume2,
  ChevronRight,
  Layers,
  Thermometer,
} from "lucide-react";
import { Language } from "../lib/dictionary";
import { speakAdvisory } from "../lib/speech";

export interface DashboardProps {
  onNavigate: (screenId: string) => void;
  lang: Language;
  onOpenShareModal?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onNavigate,
  lang,
  onOpenShareModal,
}) => {
  const [speaking, setSpeaking] = useState(false);

  const handleVoiceAdvisory = () => {
    setSpeaking(true);
    const speechText =
      lang === "hi"
        ? "सुप्रभात रमेश जी! आपके 12 दुधारू पशुओं के लिए साइलेज परीक्षण विश्वसनीय है। आहार में प्रोटीन की मामूली कमी है जिसे खली बढ़ाकर पूरा किया जा सकता है।"
        : lang === "mr"
        ? "शुभ सकाळ रमेश जी! आपल्या १२ दुभत्या जनावरांसाठी सायलेज तपासणी विश्वासार्ह आहे. आहारात थोडी प्रथिने वाढवण्याची गरज आहे."
        : "Good morning Ramesh! Silage test is verified and safe for feeding. A small protein gap of 0.4 kg can be closed by adjusting oil cake.";

    speakAdvisory(speechText, lang);
    setTimeout(() => setSpeaking(false), 5000);
  };

  const recentTests = [
    { date: "12 Jun 2026", type: "Maize Silage", cp: "8.7%", dm: "34.2%", status: "Good", evidence: "HIGH", id: "MS-2026-0012" },
    { date: "10 Jun 2026", type: "Green Fodder", cp: "9.5%", dm: "22.0%", status: "Good", evidence: "HIGH", id: "GF-2026-0008" },
    { date: "08 Jun 2026", type: "Dry Fodder", cp: "3.8%", dm: "88.0%", status: "Needs Retest", evidence: "MED", id: "DF-2026-0004" },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-8">
      {/* Top Welcome Banner */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-black text-[#1b4332]">
              {lang === "hi" ? "सुप्रभात, रमेश जी! 👋" : lang === "mr" ? "शुभ सकाळ, रमेश जी! 👋" : "Good Morning, Ramesh! 👋"}
            </h1>
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#f3f9f4] text-[#2d6a4f] border border-[#b7e4c7]">
              Patil Dairy Farm
            </span>
          </div>
          <p className="text-xs text-stone-500 font-medium">
            Healthy Feed • Healthy Cows • Higher Milk Yield & Profits
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleVoiceAdvisory}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs transition-colors"
          >
            <Volume2 className="w-4 h-4 text-amber-700" />
            <span>{speaking ? "Speaking..." : lang === "hi" ? "दैनिक सलाह" : "Voice AI"}</span>
          </button>

          {onOpenShareModal && (
            <button
              onClick={onOpenShareModal}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs transition-colors"
            >
              <Share2 className="w-4 h-4 text-emerald-700" />
              <span>WhatsApp Card</span>
            </button>
          )}

          <button
            onClick={() => onNavigate("test-selection")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-extrabold text-xs shadow-md transition-all active:scale-[0.99]"
          >
            <FlaskConical className="w-4 h-4" />
            <span>+ Quick Test Feed</span>
          </button>
        </div>
      </div>

      {/* 4 Primary Action Touchcards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Test Feed */}
        <div
          onClick={() => onNavigate("test-selection")}
          className="bg-white p-5 rounded-3xl border-2 border-[#b7e4c7] hover:border-[#2d6a4f] cursor-pointer shadow-xs transition-all hover:scale-[1.02] flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#2d6a4f] text-white flex items-center justify-center mb-3 shadow-sm">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-[#1b4332]">Test Feed</h3>
            <p className="text-[11px] text-stone-500 mt-0.5">Analyze feed or silage with NIR & AI</p>
          </div>
          <span className="text-[10px] font-bold text-[#2d6a4f] mt-3 flex items-center gap-1">
            Start 5-Pt Scan →
          </span>
        </div>

        {/* Card 2: Live Feed Zone */}
        <div
          onClick={() => onNavigate("live-zone")}
          className="bg-white p-5 rounded-3xl border border-stone-200 hover:border-emerald-300 cursor-pointer shadow-xs transition-all hover:scale-[1.02] flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
            <Radio className="w-5 h-5 text-amber-700 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-[#1b4332]">Live Feed Zone</h3>
              <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                31.4°C
              </span>
            </div>
            <p className="text-[11px] text-stone-500 mt-0.5">IoT trough temperature & humidity</p>
          </div>
          <span className="text-[10px] font-bold text-amber-700 mt-3 flex items-center gap-1">
            View Trough Live →
          </span>
        </div>

        {/* Card 3: Feed Basket */}
        <div
          onClick={() => onNavigate("feed-basket")}
          className="bg-white p-5 rounded-3xl border border-stone-200 hover:border-emerald-300 cursor-pointer shadow-xs transition-all hover:scale-[1.02] flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center mb-3">
            <ShoppingBasket className="w-5 h-5 text-blue-700" />
          </div>
          <div>
            <h3 className="text-sm font-black text-[#1b4332]">Feed Basket</h3>
            <p className="text-[11px] text-stone-500 mt-0.5">7 available farm ingredients</p>
          </div>
          <span className="text-[10px] font-bold text-blue-700 mt-3 flex items-center gap-1">
            Manage Stock →
          </span>
        </div>

        {/* Card 4: Dairy Advisory */}
        <div
          onClick={() => onNavigate("ration")}
          className="bg-white p-5 rounded-3xl border border-stone-200 hover:border-emerald-300 cursor-pointer shadow-xs transition-all hover:scale-[1.02] flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center mb-3">
            <Brain className="w-5 h-5 text-purple-700" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-[#1b4332]">Dairy Advisory</h3>
              <span className="text-[10px] font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                Save ₹59/cow
              </span>
            </div>
            <p className="text-[11px] text-stone-500 mt-0.5">Least-cost ration optimization</p>
          </div>
          <span className="text-[10px] font-bold text-purple-700 mt-3 flex items-center gap-1">
            Optimize Feed →
          </span>
        </div>
      </div>

      {/* Dashboard Innovation 1: Feed Decision Status Banner */}
      <div className="bg-gradient-to-r from-[#f3f9f4] to-emerald-50 border-2 border-[#b7e4c7] p-5 rounded-3xl shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#2d6a4f] text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                  Feed Decision Status
                </span>
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-600 text-white">
                  🟢 SAFE TO REVIEW FOR FEEDING
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-1">
                Multi-source evidence fusion confirms sample belongs to calibrated domain with repeatable 5-point consistency.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
            <div className="bg-white p-2 rounded-xl border border-[#b7e4c7]">
              <span className="text-[9px] text-stone-400 block font-bold">Evidence</span>
              <span className="font-extrabold text-emerald-800">HIGH (91%)</span>
            </div>
            <div className="bg-white p-2 rounded-xl border border-[#b7e4c7]">
              <span className="text-[9px] text-stone-400 block font-bold">Calibration</span>
              <span className="font-extrabold text-emerald-800">IN DOMAIN</span>
            </div>
            <div className="bg-white p-2 rounded-xl border border-[#b7e4c7]">
              <span className="text-[9px] text-stone-400 block font-bold">Sampling</span>
              <span className="font-extrabold text-emerald-800">CONSISTENT</span>
            </div>
            <div className="bg-white p-2 rounded-xl border border-[#b7e4c7]">
              <span className="text-[9px] text-stone-400 block font-bold">Storage</span>
              <span className="font-extrabold text-emerald-800">STABLE</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2 Things Need Attention + Feed Lifecycle */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: What Needs Attention (6 cols) */}
        <div className="lg:col-span-6 bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-[#1b4332]">2 Things Need Attention</h3>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              Action Required
            </span>
          </div>

          <div className="space-y-2.5">
            <div
              onClick={() => onNavigate("live-zone")}
              className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3 cursor-pointer hover:bg-amber-100/60 transition-colors"
            >
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-amber-900">Silage Trough Heating Detected</span>
                  <span className="text-[10px] font-bold text-amber-700">+2.7°C (24h)</span>
                </div>
                <p className="text-[11px] text-amber-800/90 mt-0.5">
                  Trough Node FZ-001 indicates remaining 8.4 kg fodder exposed for 7h+. Clear trough before evening feed.
                </p>
              </div>
            </div>

            <div
              onClick={() => onNavigate("ration")}
              className="p-3.5 rounded-2xl bg-red-50/70 border border-red-200 flex items-start gap-3 cursor-pointer hover:bg-red-100/60 transition-colors"
            >
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-red-900">Protein Gap in Lactating Ration</span>
                  <span className="text-[10px] font-bold text-red-700">-0.4 kg CP/day</span>
                </div>
                <p className="text-[11px] text-red-800/90 mt-0.5">
                  Current diet provides 2.0 kg CP vs 2.4 kg required. Click to run least-cost optimizer (+1 kg oil cake).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Feed Lifecycle & Batch Status (6 cols) */}
        <div className="lg:col-span-6 bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-[#1b4332]">Feed Inventory Lifecycle Track</h3>
            <span className="text-xs font-bold text-stone-500">3 Batches Active</span>
          </div>

          {/* Lifecycle Bar */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-3 rounded-2xl bg-[#f3f9f4] border border-[#b7e4c7]">
              <span className="text-xl font-black text-[#1b4332] block">3</span>
              <span className="text-[10px] text-stone-500 font-bold uppercase">Batches Monitored</span>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-xl font-black text-emerald-800 block">2</span>
              <span className="text-[10px] text-emerald-700 font-bold uppercase">Stable & Verified</span>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200">
              <span className="text-xl font-black text-amber-800 block">1</span>
              <span className="text-[10px] text-amber-700 font-bold uppercase">Needs Retest</span>
            </div>
          </div>

          <p className="text-[11px] text-stone-500">
            🔗 <strong>Unified Feed Loop:</strong> Every scanned batch connects directly to storage temperature monitoring, dairy ration optimizer, and verifiable quality passport.
          </p>
        </div>
      </div>

      {/* Recent Feed Tests Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <span className="text-xs font-extrabold text-[#1b4332] uppercase tracking-wider">
            Recent Farm Feed Tests
          </span>
          <button
            onClick={() => onNavigate("reports")}
            className="text-xs font-bold text-[#2d6a4f] hover:underline"
          >
            View Full History →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-bold uppercase text-[10px] border-b border-stone-200">
              <tr>
                <th className="px-5 py-3">Date Tested</th>
                <th className="px-4 py-3">Feed Type</th>
                <th className="px-4 py-3">Crude Protein</th>
                <th className="px-4 py-3">Dry Matter</th>
                <th className="px-4 py-3">Quality Status</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium text-stone-700">
              {recentTests.map((row) => (
                <tr key={row.id} className="hover:bg-[#f3f9f4]/60 transition-colors">
                  <td className="px-5 py-3 font-bold text-stone-900">{row.date}</td>
                  <td className="px-4 py-3 font-bold text-[#1b4332]">{row.type}</td>
                  <td className="px-4 py-3 font-black text-[#2d6a4f]">{row.cp}</td>
                  <td className="px-4 py-3">{row.dm}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                        row.status === "Good"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => onNavigate("test-results")}
                      className="text-[11px] font-bold text-[#2d6a4f] hover:underline"
                    >
                      View →
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
