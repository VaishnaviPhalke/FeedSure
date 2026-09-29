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
} from "lucide-react";
import { Language } from "../lib/dictionary";
import { offlineQueue, OfflineStatus } from "../lib/offlineQueue";
import { speakAdvisory } from "../lib/speech";

export interface AppHeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
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
        ? "नमस्ते रमेश जी। आपके खेत में साइलेज तापमान सामान्य है। दुधारू गायों के आहार में 0.8 किलो खली जोड़ने की सलाह है।"
        : lang === "mr"
        ? "नमस्कार रमेश जी. आपल्या सायलेजचे तापमान स्थिर आहे. दुभत्या गायींच्या आहारात ०.८ किलो पेंड वाढवण्याचा सल्ला आहे."
        : "Hello Ramesh. Silage fermentation is stable. Adding 0.8 kg oil cake is recommended to close the lactating herd protein deficit.";

    speakAdvisory(advisoryText, lang);
    setTimeout(() => setSpeaking(false), 5000);
  };

  return (
    <header className="h-16 bg-white border-b border-stone-200 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-40 shadow-xs">
      {/* Search & Breadcrumb */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={
              lang === "hi"
                ? "बैच आईडी, रिपोर्ट, या चारा खोजें..."
                : lang === "mr"
                ? "बॅच आयडी, अहवाल किंवा चारा शोधा..."
                : "Search feed batch, report, or device..."
            }
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 focus:border-[#2d6a4f] transition-all"
          />
        </div>
      </div>

      {/* Dairy Quick Stats Badge (Herd & Milk) */}
      <div className="hidden lg:flex items-center gap-3 bg-[#f3f9f4] border border-[#d8f3dc] px-3.5 py-1.5 rounded-xl text-xs">
        <div className="flex items-center gap-2 border-r border-[#b7e4c7] pr-3">
          <span className="text-[11px] font-bold text-stone-500 uppercase">Herd:</span>
          <span className="font-bold text-[#1b4332]">{dairySummary.lactating} Lactating</span>
          <span className="text-stone-400">•</span>
          <span className="text-stone-600 font-medium">{dairySummary.dry} Dry</span>
          <span className="text-stone-400">•</span>
          <span className="text-stone-600 font-medium">{dairySummary.calves} Calves</span>
        </div>

        <div className="flex items-center gap-1.5 text-[#1b4332] font-extrabold">
          <Milk className="w-3.5 h-3.5 text-[#2d6a4f]" />
          <span>{dairySummary.milkYield} L/cow/day</span>
        </div>
      </div>

      {/* Right Controls: Voice Assistant, Language, Offline Sync, Notifications */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Vernacular Voice AI trigger */}
        <button
          onClick={handleVoiceAdvisory}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
            speaking
              ? "bg-amber-100 text-amber-800 border-amber-300 animate-pulse"
              : "bg-[#2d6a4f]/10 text-[#1b4332] border-[#2d6a4f]/20 hover:bg-[#2d6a4f]/20"
          }`}
          title="Play Voice Audio Advisory"
        >
          <Volume2 className="w-3.5 h-3.5 text-[#2d6a4f]" />
          <span className="hidden sm:inline">
            {speaking ? "Speaking..." : lang === "hi" ? "आवाज़ में सुनें" : lang === "mr" ? "आवाजात ऐका" : "Voice AI"}
          </span>
        </button>

        {/* Rural Offline Sync Pill */}
        <button
          onClick={() => offlineQueue.flushQueue()}
          title={
            !offlineStatus.isOnline
              ? `Offline Mode: ${offlineStatus.pendingCount} records queued locally`
              : offlineStatus.pendingCount > 0
              ? `${offlineStatus.pendingCount} pending records. Click to sync.`
              : "All farm records synced."
          }
          className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
            !offlineStatus.isOnline
              ? "bg-amber-50 text-amber-700 border-amber-300"
              : offlineStatus.pendingCount > 0
              ? "bg-blue-50 text-blue-700 border-blue-300"
              : "bg-emerald-50 text-emerald-700 border-emerald-300"
          }`}
        >
          {!offlineStatus.isOnline ? (
            <WifiOff className="w-3.5 h-3.5 text-amber-600" />
          ) : offlineStatus.isSyncing ? (
            <RefreshCw className="w-3.5 h-3.5 text-blue-600 animate-spin" />
          ) : (
            <Wifi className="w-3.5 h-3.5 text-emerald-600" />
          )}
          <span>
            {!offlineStatus.isOnline
              ? `Offline (${offlineStatus.pendingCount})`
              : offlineStatus.pendingCount > 0
              ? `Sync (${offlineStatus.pendingCount})`
              : "Live"}
          </span>
        </button>

        {/* Language Selector */}
        <div className="flex items-center bg-stone-100 border border-stone-200 rounded-xl px-2 py-1 text-xs">
          <Globe className="w-3.5 h-3.5 text-stone-500 mr-1" />
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as Language)}
            className="bg-transparent text-stone-700 font-bold focus:outline-none cursor-pointer"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="mr">मराठी</option>
          </select>
        </div>

        {/* Notification Bell */}
        <button
          onClick={() => setActiveScreen("dashboard")}
          className="relative p-2 rounded-xl text-stone-600 hover:bg-stone-100 transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white"></span>
        </button>
      </div>
    </header>
  );
};
