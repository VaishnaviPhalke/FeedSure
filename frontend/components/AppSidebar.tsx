"use client";

import React from "react";
import {
  LayoutDashboard,
  FlaskConical,
  Radio,
  Beef,
  ShoppingBasket,
  Brain,
  FileText,
  Cpu,
  ShieldCheck,
  Settings,
  LogOut,
  Sparkles,
  ChevronRight,
  Building2,
  Layers,
} from "lucide-react";
import { Language } from "../lib/dictionary";

export interface AppSidebarProps {
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
  lang: Language;
  onLogout: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  activeScreen,
  setActiveScreen,
  lang,
  onLogout,
}) => {
  const navGroups = [
    {
      label: "TEST & SENSE",
      items: [
        {
          id: "dashboard",
          label: lang === "hi" ? "कमांड सेंटर" : lang === "mr" ? "कमांड सेंटर" : "Command Center",
          icon: LayoutDashboard,
          badge: null,
          activeMatches: ["dashboard"],
        },
        {
          id: "test-selection",
          label: lang === "hi" ? "चारा परीक्षण" : lang === "mr" ? "चारा चाचणी" : "Test Feed",
          icon: FlaskConical,
          badge: "5-Pt Core",
          activeMatches: ["test-selection", "test-scan", "test-analysis", "test-results", "contaminants"],
        },
        {
          id: "silage",
          label: lang === "hi" ? "साइलेज विश्लेषण" : lang === "mr" ? "सायलेज विश्लेषण" : "Silage Fermentation",
          icon: Sparkles,
          badge: "Flieg 82",
          activeMatches: ["silage"],
        },
      ],
    },
    {
      label: "MONITOR STORAGE",
      items: [
        {
          id: "live-zone",
          label: lang === "hi" ? "लाइव चारा ज़ोन" : lang === "mr" ? "लाइव्ह चारा झोन" : "Live Feed Zone",
          icon: Radio,
          badge: "31.4°C ⚠",
          activeMatches: ["live-zone"],
        },
      ],
    },
    {
      label: "DECIDE & OPTIMIZE",
      items: [
        {
          id: "dairy-profile",
          label: lang === "hi" ? "डेयरी प्रोफाइल" : lang === "mr" ? "डेअरी प्रोफाईल" : "Dairy Herd Context",
          icon: Beef,
          badge: "12 Cows",
          activeMatches: ["dairy-profile"],
        },
        {
          id: "feed-basket",
          label: lang === "hi" ? "चारा बास्केट" : lang === "mr" ? "चारा बास्केट" : "Feed Basket",
          icon: ShoppingBasket,
          badge: "7 Items",
          activeMatches: ["feed-basket"],
        },
        {
          id: "ration",
          label: lang === "hi" ? "आहार सलाहकार" : lang === "mr" ? "आहार सल्लागार" : "Ration Optimizer",
          icon: Brain,
          badge: "Save ₹59",
          activeMatches: ["ration"],
        },
      ],
    },
    {
      label: "TRUST & PROVENANCE",
      items: [
        {
          id: "passport",
          label: lang === "hi" ? "गुणवत्ता पासपोर्ट" : lang === "mr" ? "गुणवत्ता पासपोर्ट" : "Quality Passport",
          icon: ShieldCheck,
          badge: "SHA-256",
          activeMatches: ["passport"],
        },
        {
          id: "reports",
          label: lang === "hi" ? "रिपोर्ट्स और इतिहास" : lang === "mr" ? "अहवाल व इतिहास" : "Reports & Trends",
          icon: FileText,
          badge: null,
          activeMatches: ["reports"],
        },
        {
          id: "cooperative",
          label: lang === "hi" ? "सहकारी संघ दृश्य" : lang === "mr" ? "सहकारी संघ दृश्य" : "Co-op Surveillance",
          icon: Building2,
          badge: "27 Farms",
          activeMatches: ["cooperative"],
        },
      ],
    },
    {
      label: "SYSTEM & HARDWARE",
      items: [
        {
          id: "devices",
          label: lang === "hi" ? "उपकरण और डेटा" : lang === "mr" ? "डिव्हाइसेस व डेटा" : "Devices & Health",
          icon: Cpu,
          badge: "Live",
          activeMatches: ["devices"],
        },
        {
          id: "settings",
          label: lang === "hi" ? "सेटिंग्स" : lang === "mr" ? "सेटिंग्ज" : "Settings",
          icon: Settings,
          badge: null,
          activeMatches: ["settings"],
        },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-[#0d2818] text-white flex flex-col shrink-0 border-r border-[#1e4620] select-none min-h-screen">
      {/* Brand Header */}
      <div
        onClick={() => setActiveScreen("dashboard")}
        className="h-16 flex items-center gap-3 px-5 border-b border-[#1e4620] cursor-pointer hover:bg-[#163824] transition-colors"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#52b788] to-[#95d5b2] flex items-center justify-center font-black text-[#0d2818] text-lg shadow-md">
          360
        </div>
        <div>
          <div className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
            FeedSure 360
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#2d6a4f] text-[#95d5b2]">
              Precision
            </span>
          </div>
          <p className="text-[11px] text-[#95d5b2]/70 font-medium">Smart Dairy Intelligence</p>
        </div>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 py-4 px-3 space-y-5 overflow-y-auto custom-scrollbar">
        {navGroups.map((group) => (
          <div key={group.label} className="space-y-1">
            <div className="px-3 text-[10px] font-bold tracking-wider text-[#74c69d]/60 uppercase font-mono">
              {group.label}
            </div>
            {group.items.map((item) => {
              const isActive =
                item.id === activeScreen ||
                (item.activeMatches && item.activeMatches.includes(activeScreen));
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveScreen(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? "bg-[#2d6a4f] text-white shadow-sm font-bold border border-[#52b788]/30"
                      : "text-stone-300 hover:bg-[#163824] hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                        isActive ? "text-[#95d5b2]" : "text-stone-400"
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? "bg-[#1b4332] text-[#95d5b2] border border-[#52b788]/40"
                          : "bg-[#163824] text-stone-300"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Farm Profile & Logout Footer */}
      <div className="p-3 border-t border-[#1e4620] bg-[#091f13]/60">
        <div
          onClick={() => setActiveScreen("settings")}
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#163824] cursor-pointer transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-[#2d6a4f] border border-[#52b788] flex items-center justify-center text-xs font-bold text-white">
            RP
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate">Ramesh Patil</p>
            <p className="text-[10px] text-[#95d5b2]/80 truncate">FS-MH-PN-00142</p>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </div>

        <button
          onClick={onLogout}
          className="w-full mt-2 flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-red-300 hover:bg-red-950/40 hover:text-red-200 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{lang === "hi" ? "लॉग आउट" : lang === "mr" ? "लॉग आउट" : "Logout"}</span>
        </button>
      </div>
    </aside>
  );
};
