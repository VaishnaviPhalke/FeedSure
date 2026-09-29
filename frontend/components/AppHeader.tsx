"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Bell,
  Globe,
  Wifi,
  WifiOff,
  RefreshCw,
  Volume2,
  Sparkles,
  Milk,
  UserCheck,
  Building2,
  Sliders,
} from "lucide-react";
import { Language } from "../lib/dictionary";
import { offlineQueue, OfflineStatus } from "../lib/offlineQueue";
import { speakAdvisory } from "../lib/speech";

export interface AppHeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
  farmerMode: boolean;
  setFarmerMode: (m: boolean) => void;
  activeRole: "farm" | "cooperative";
  setActiveRole: (r: "farm" | "cooperative") => void;
  dairySummary?: {
    lactating: number;
    dry: number;
    calves: number;
    milkYield: number;
  };
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  lang,
  setLang,
  activeScreen,
  setActiveScreen,
  farmerMode,
  setFarmerMode,
  activeRole,
  setActiveRole,
  dairySummary = { lactating: 12, dry: 3, calves: 2, milkYield: 10.5 },
}) => {
  const [offlineStatus, setOfflineStatus] = useState<OfflineStatus>({
    isOnline: true,
    pendingCount: 0,
    isSyncing: false,
    lastSyncedAt: null,
  });
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    return offlineQueue.subscribe((s) => setOfflineStatus(s));
  }, []);

  const handleVoiceAdvisory = () => {
    setSpeaking(true);
    const advisoryText =
      lang === "hi"
        ? "नमस्ते रमेश जी। 12 दुधारू गायों के लिए साइलेज परीक्षण विश्वसनीय है। आहार में प्रोटीन की कमी दूर करने के लिए खली की मात्रा बढ़ाएं।"
        : lang === "mr"
        ? "नमस्कार रमेश जी. १२ दुभत्या जनावरांसाठी सायलेज पोषण प्रमाणित आहे. प्रथिनांची तूट भरून काढण्यासाठी आहारात पेंड वाढवा."
        : "Hello Ramesh. Maize silage is verified decision-ready. Adjusting oil cake fulfills the 0.4 kg protein deficit.";

    speakAdvisory(advisoryText, lang);
    setTimeout(() => setSpeaking(false), 5000);
  };

  return (
    <header className="h-16 bg-white border-b border-stone-200 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-40 shadow-xs">
      {/* Search & Breadcrumb */}
      <div className="flex items-center gap-3 flex-1 max-w-sm">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={
              lang === "hi"
                ? "बैच आईडी, रिपोर्ट, या चारा खोजें..."
                : lang === "mr"
                ? "बॅच आयडी, अहवाल किंवा चारा शोधा..."
                : "Search batch ID, test, device..."
            }
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 focus:border-[#2d6a4f] transition-all"
          />
        </div>
      </div>

      {/* Role Switcher: Farm (Individual) vs Cooperative */}
      <div className="hidden lg:flex items-center bg-stone-100 p-1 rounded-xl text-xs font-bold border border-stone-200">
        <button
          onClick={() => {
            setActiveRole("farm");
            if (activeScreen === "cooperative") setActiveScreen("dashboard");
          }}
          className={`px-3 py-1 rounded-lg transition-all ${
            activeRole === "farm"
              ? "bg-[#1b4332] text-white shadow-xs font-black"
              : "text-stone-600 hover:text-stone-900"
          }`}
        >
          🏡 Farm (Patil Dairy)
        </button>
        <button
          onClick={() => {
            setActiveRole("cooperative");
            setActiveScreen("cooperative");
          }}
          className={`px-3 py-1 rounded-lg transition-all ${
            activeRole === "cooperative"
              ? "bg-purple-800 text-white shadow-xs font-black"
              : "text-stone-600 hover:text-stone-900"
          }`}
        >
          🏢 Co-op Federation (27 Farms)
        </button>
      </div>

      {/* Dairy Quick Stats Badge (Herd & Milk) */}
      <div className="hidden xl:flex items-center gap-3 bg-[#f3f9f4] border border-[#d8f3dc] px-3.5 py-1.5 rounded-xl text-xs">
        <div className="flex items-center gap-2 border-r border-[#b7e4c7] pr-3">
          <span className="text-[10px] font-bold text-stone-500 uppercase">Herd:</span>
          <span className="font-bold text-[#1b4332]">{dairySummary.lactating} Lactating</span>
          <span className="text-stone-400">•</span>
          <span className="text-stone-600 font-medium">{dairySummary.dry} Dry</span>
        </div>

        <div className="flex items-center gap-1.5 text-[#1b4332] font-extrabold">
          <Milk className="w-3.5 h-3.5 text-[#2d6a4f]" />
          <span>{dairySummary.milkYield} L/cow/day</span>
        </div>
      </div>

      {/* Right Controls: Mode Toggle, Voice AI, Language, Offline Sync */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Farmer Mode vs Expert Mode Switcher */}
        <button
          onClick={() => setFarmerMode(!farmerMode)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
            farmerMode
              ? "bg-amber-100 text-amber-900 border-amber-300"
              : "bg-teal-50 text-teal-900 border-teal-300"
          }`}
          title={farmerMode ? "Switch to Expert Mode" : "Switch to Simple Farmer Mode"}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{farmerMode ? "Farmer Mode" : "Expert Mode"}</span>
        </button>

        {/* Vernacular Voice AI trigger */}
        <button
          onClick={handleVoiceAdvisory}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
            speaking
              ? "bg-amber-100 text-amber-800 border-amber-300 animate-pulse"
              : "bg-[#2d6a4f]/10 text-[#1b4332] border-[#2d6a4f]/20 hover:bg-[#2d6a4f]/20"
          }`}
          title="Play Spoken Audio Advisory"
        >
          <Volume2 className="w-3.5 h-3.5 text-[#2d6a4f]" />
          <span className="hidden md:inline">
            {speaking ? "Speaking..." : lang === "hi" ? "आवाज़" : lang === "mr" ? "आवाज" : "Voice AI"}
          </span>
        </button>

        {/* Rural Offline Sync Pill */}
        <button
          onClick={() => offlineQueue.flushQueue()}
          title={
            !offlineStatus.isOnline
              ? `Offline: ${offlineStatus.pendingCount} records queued locally`
              : "Live: All farm records synced"
          }
          className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
            !offlineStatus.isOnline
              ? "bg-amber-50 text-amber-700 border-amber-300"
              : "bg-emerald-50 text-emerald-700 border-emerald-300"
          }`}
        >
          {!offlineStatus.isOnline ? (
            <WifiOff className="w-3.5 h-3.5 text-amber-600" />
          ) : (
            <Wifi className="w-3.5 h-3.5 text-emerald-600" />
          )}
          <span>{!offlineStatus.isOnline ? `Offline (${offlineStatus.pendingCount})` : "Live"}</span>
        </button>

        {/* Language Selector */}
        <div className="flex items-center bg-stone-100 border border-stone-200 rounded-xl px-2 py-1 text-xs">
          <Globe className="w-3.5 h-3.5 text-stone-500 mr-1" />
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as Language)}
            className="bg-transparent text-stone-700 font-bold focus:outline-none cursor-pointer"
          >
            <option value="en">EN</option>
            <option value="hi">हिंदी</option>
            <option value="mr">मराठी</option>
          </select>
        </div>
      </div>
    </header>
  );
};
