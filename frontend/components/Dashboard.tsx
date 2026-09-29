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
  Beef,
  HelpCircle,
} from "lucide-react";
import { Language } from "../lib/dictionary";
import { speakAdvisory } from "../lib/speech";
import { FeedIdentityCard } from "./FeedIdentityCard";
import { DecisionGraph } from "./DecisionGraph";

export interface DashboardProps {
  onNavigate: (screenId: string) => void;
  lang: Language;
  onOpenShareModal?: () => void;
  farmerMode?: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onNavigate,
  lang,
  onOpenShareModal,
  farmerMode = false,
}) => {
  const [speaking, setSpeaking] = useState(false);
  const [showWhyProtein, setShowWhyProtein] = useState(false);
  const [showWhyStorage, setShowWhyStorage] = useState(false);

  const handleVoiceAdvisory = () => {
    setSpeaking(true);
    const speechText =
      lang === "hi"
        ? "सुप्रभात रमेश जी! आपके 12 दुधारू पशुओं के लिए साइलेज पोषण उपयुक्त है। आज के आहार में 0.4 किलो प्रोटीन की कमी है, जिसके लिए 1 किलो खली बढ़ाने की सिफारिश है।"
        : lang === "mr"
        ? "शुभ सकाळ रमेश जी! १२ दुभत्या जनावरांसाठी सायलेजचे पोषण योग्य आहे. आहारात ०.४ किलो प्रथिनांची तूट भरून काढण्यासाठी १ किलो पेंड वाढवावी."
        : "Good morning Ramesh! Today's feed decision: 5 batches are verified and ready. A protein deficit of 0.4 kg/cow requires reviewing the ration.";

    speakAdvisory(speechText, lang);
    setTimeout(() => setSpeaking(false), 5000);
  };

  const lifecycleTimeline = [
    { step: "Harvest", date: "10 Jun", status: "done", label: "Harvested & Sealed" },
    { step: "Tested", date: "11 Jun", status: "done", label: "NIR Diffuse 5-Pt Scan (8.7% CP)" },
    { step: "Stored", date: "11 Jun", status: "done", label: "Pit Stored (pH 4.1, Flieg 82)" },
    { step: "Heating", date: "12 Jun", status: "warn", label: "Face Heating (+2.7°C / 24h)" },
    { step: "Retest", date: "Today", status: "action", label: "Evening Retest Scheduled" },
  ];

  const recentTests = [
    { date: "12 Jun 2026", type: "Maize Silage", cp: "8.7%", dm: "34.2%", status: "Good", evidence: "HIGH", id: "MS-2026-0012" },
    { date: "10 Jun 2026", type: "Green Fodder", cp: "9.5%", dm: "22.0%", status: "Good", evidence: "HIGH", id: "GF-2026-0008" },
    { date: "08 Jun 2026", type: "Dry Fodder", cp: "3.8%", dm: "88.0%", status: "Needs Retest", evidence: "MED", id: "DF-2026-0004" },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-8">
      {/* 1. TOP COMMAND CENTER: TODAY'S FARM FEED DECISION STATUS */}
      <div className="bg-gradient-to-r from-[#0d2818] via-[#1b4332] to-[#2d6a4f] text-white p-6 rounded-3xl shadow-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#95d5b2] bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">
                FARM DECISION COMMAND CENTER
              </span>
              <span className="text-xs text-stone-300">Patil Dairy Farm • FS-MH-PN-00142</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              {lang === "hi" ? "आज की चारा स्थिति: 3 निर्णय अपेक्षित" : lang === "mr" ? "आजची चारा स्थिती: ३ निर्णय आवश्यक" : "Today's Feed Status: 3 Decisions Need Action"}
            </h1>
          </div>

          {/* Quick Voice & WhatsApp Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleVoiceAdvisory}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-400 text-stone-950 font-black text-xs hover:bg-amber-300 transition-all shadow-sm"
            >
              <Volume2 className="w-4 h-4 text-stone-950" />
              <span>{speaking ? "Speaking..." : lang === "hi" ? "सलाह सुनें" : "Voice AI"}</span>
            </button>

            {onOpenShareModal && (
              <button
                onClick={onOpenShareModal}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs border border-white/20 transition-colors"
              >
                <Share2 className="w-4 h-4 text-[#95d5b2]" />
                <span>WhatsApp Card</span>
              </button>
            )}

            <button
              onClick={() => onNavigate("test-selection")}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#52b788] hover:bg-[#74c69d] text-[#0d2818] font-black text-xs shadow-md transition-all active:scale-[0.99]"
            >
              <FlaskConical className="w-4 h-4 text-[#0d2818]" />
              <span>+ Test New Batch</span>
            </button>
          </div>
        </div>

        {/* 3 Main Decision Status Banners */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-black/30 border border-emerald-500/40 p-3.5 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[10px] text-emerald-300 font-mono font-bold uppercase block">
                7 Batches Active
              </span>
              <span className="text-xl font-black text-white">5 READY TO FEED</span>
            </div>
            <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-sm">
              ✓
            </span>
          </div>

          <div className="bg-black/30 border border-amber-500/40 p-3.5 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[10px] text-amber-300 font-mono font-bold uppercase block">
                Trough Aerobic Watch
              </span>
              <span className="text-xl font-black text-amber-300">1 HEATING (31.4°C)</span>
            </div>
            <span className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-sm">
              ⚠
            </span>
          </div>

          <div className="bg-black/30 border border-purple-500/40 p-3.5 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[10px] text-purple-300 font-mono font-bold uppercase block">
                Lactating Herd Ration
              </span>
              <span className="text-xl font-black text-purple-300">-0.4 kg CP GAP</span>
            </div>
            <span className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-sm">
              ₹
            </span>
          </div>
        </div>
      </div>

      {/* 2. CENTER & RIGHT: WHAT NEEDS ATTENTION + DAIRY NUTRITION IMPACT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Center: What Needs Attention Now (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-[#1b4332]">What Needs Attention Now</h3>
              <p className="text-[11px] text-stone-500">Actionable alerts linked to actual storage & feed lifecycle events</p>
            </div>
            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
              2 Active Alerts
            </span>
          </div>

          <div className="space-y-3">
            {/* Attention Item 1: Silage Heating */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-300 text-xs space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
                  <h4 className="font-black text-amber-950 text-sm">
                    ⚠ MAIZE SILAGE — Face Heating Detected (+2.7°C / 24h)
                  </h4>
                </div>
                <button
                  onClick={() => setShowWhyStorage(!showWhyStorage)}
                  className="text-[11px] font-bold text-amber-900 underline flex items-center gap-0.5"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>Why?</span>
                </button>
              </div>

              <p className="text-amber-900/90 leading-relaxed font-medium">
                Trough Node FZ-001 detected temperature rise to 31.4°C over 7 hours of open-air exposure. Secondary aerobic yeast activity suspected.
              </p>

              {showWhyStorage && (
                <div className="p-3 bg-white rounded-xl border border-amber-300 text-[11px] text-stone-700 space-y-1">
                  <strong>Evidence Breakdown:</strong> Core Temp +2.7°C • Humidity 72% • Exposure 7h 22m.
                  <p>Recommended: Retest face fodder before evening ration mix and remove 15cm exposed bunk silage.</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-stone-500 font-bold">Action: Retest before evening feeding</span>
                <button
                  onClick={() => onNavigate("live-zone")}
                  className="px-3 py-1 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 shadow-xs"
                >
                  Inspect Live Trough →
                </button>
              </div>
            </div>

            {/* Attention Item 2: Protein Deficit in Ration */}
            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-300 text-xs space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                  <h4 className="font-black text-purple-950 text-sm">
                    ⚠ DAIRY RATION — Crude Protein Deficit (-0.4 kg / cow / day)
                  </h4>
                </div>
                <button
                  onClick={() => setShowWhyProtein(!showWhyProtein)}
                  className="text-[11px] font-bold text-purple-900 underline flex items-center gap-0.5"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>Why?</span>
                </button>
              </div>

              <p className="text-purple-900/90 leading-relaxed font-medium">
                12 lactating cows producing 10.5 L/day require 2.40 kg CP. Current intake is 2.00 kg. Least-cost solver formulation ready.
              </p>

              {showWhyProtein && (
                <div className="p-3 bg-white rounded-xl border border-purple-300 text-[11px] text-stone-700 space-y-1">
                  <strong>Deficit Logic:</strong> Measured Silage CP is 8.7% vs textbook 10.0%. Fodder crude protein drop creates -0.4 kg shortfall.
                  <p>Solution: Replace 3 kg compound concentrate with 1 kg mustard oil cake + 4 kg silage to save ₹59.48/cow/day.</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-purple-800 font-bold">Projected Saving: +₹21,412 / month</span>
                <button
                  onClick={() => onNavigate("ration")}
                  className="px-3 py-1 rounded-xl bg-purple-700 text-white font-bold text-xs hover:bg-purple-800 shadow-xs"
                >
                  Run Least-Cost Solver →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Dairy Herd Nutrition Impact & Feed Identity (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <FeedIdentityCard
            batchId="MS-2026-0012"
            feedType="Maize Silage"
            cp={8.7}
            dm={34.2}
            ndf={42.1}
            ageDays={120}
            status="VERIFIED"
            lang={lang}
          />
        </div>
      </div>

      {/* 3. BOTTOM: HORIZONTAL FEED LIFECYCLE SPINE */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black text-[#1b4332] uppercase tracking-wider">
              Feed Batch Lifecycle & Provenance Spine
            </h3>
            <p className="text-[11px] text-stone-500">Continuous tracking across harvest, testing, storage, and ration feeding</p>
          </div>
          <span className="text-xs font-bold text-[#2d6a4f]">Batch: MS-2026-0012</span>
        </div>

        {/* Timeline Spine */}
        <div className="grid grid-cols-5 gap-2 text-xs pt-2">
          {lifecycleTimeline.map((item, idx) => {
            const isWarn = item.status === "warn";
            const isAction = item.status === "action";

            return (
              <div
                key={item.step}
                className={`p-3 rounded-2xl border flex flex-col justify-between ${
                  isAction
                    ? "bg-purple-50 border-purple-300 text-purple-900"
                    : isWarn
                    ? "bg-amber-50 border-amber-300 text-amber-900"
                    : "bg-[#f3f9f4] border-[#d8f3dc] text-[#1b4332]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] font-bold text-stone-400">{item.date}</span>
                    <span
                      className={`text-[9px] font-black px-1.5 py-0.2 rounded ${
                        isAction
                          ? "bg-purple-200 text-purple-900"
                          : isWarn
                          ? "bg-amber-200 text-amber-900"
                          : "bg-emerald-100 text-emerald-900"
                      }`}
                    >
                      {item.step}
                    </span>
                  </div>
                  <p className="text-[11px] font-bold mt-1">{item.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. REASONING GRAPH PREVIEW */}
      <DecisionGraph lang={lang} />
    </div>
  );
};
