"use client";

import React, { useState } from "react";
import {
  User,
  Building,
  Globe,
  Bell,
  ShieldCheck,
  HelpCircle,
  Info,
  LogOut,
  Save,
  CheckCircle2,
} from "lucide-react";
import { Language } from "../lib/dictionary";

export interface ProfileSettingsScreenProps {
  lang: Language;
  setLang: (lang: Language) => void;
  onLogout: () => void;
}

export const ProfileSettingsScreen: React.FC<ProfileSettingsScreenProps> = ({
  lang,
  setLang,
  onLogout,
}) => {
  const [farmerName, setFarmerName] = useState("Ramesh Patil");
  const [mobileNumber, setMobileNumber] = useState("+91 98220 12345");
  const [farmName, setFarmName] = useState("Patil Dairy Farm");
  const [location, setLocation] = useState("Pune, Maharashtra");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-8">
      {/* Farmer Profile Header Card */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#2d6a4f] text-white font-black text-xl flex items-center justify-center border-2 border-[#52b788] shadow-md">
            RP
          </div>
          <div>
            <h2 className="text-xl font-black text-[#1b4332]">{farmerName}</h2>
            <p className="text-xs text-stone-500 font-medium">Dairy Farmer • {location}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#f3f9f4] text-[#2d6a4f] border border-[#b7e4c7]">
                Farm ID: FS-MH-PN-00142
              </span>
              <span className="text-[10px] font-bold text-stone-400">15 Cattle Registered</span>
            </div>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs border border-red-200 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout Account</span>
        </button>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Farm & Personal Details */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <h3 className="text-sm font-extrabold text-[#1b4332] flex items-center gap-2">
            <Building className="w-4 h-4 text-[#2d6a4f]" />
            <span>Farm & Personal Details</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-stone-600 font-bold mb-1">Farmer Full Name</label>
              <input
                type="text"
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
                className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-stone-600 font-bold mb-1">Mobile Contact</label>
              <input
                type="text"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-stone-600 font-bold mb-1">Farm Name</label>
              <input
                type="text"
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
                className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-stone-600 font-bold mb-1">District / State</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>

            <button
              onClick={handleSave}
              className="w-full py-2 rounded-xl bg-[#2d6a4f] text-white font-bold hover:bg-[#1b4332] transition-colors"
            >
              {saved ? "Profile Updated ✓" : "Save Changes"}
            </button>
          </div>
        </div>

        {/* System Preferences & Language */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <h3 className="text-sm font-extrabold text-[#1b4332] flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#2d6a4f]" />
            <span>Vernacular Language & Preferences</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-stone-600 font-bold mb-1.5">Preferred Audio & Text Language</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "en", label: "English" },
                  { id: "hi", label: "हिंदी (Hindi)" },
                  { id: "mr", label: "मराठी (Marathi)" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setLang(item.id as Language)}
                    className={`py-2 px-1 rounded-xl border text-center font-bold transition-all ${
                      lang === item.id
                        ? "bg-[#2d6a4f] text-white border-[#2d6a4f] shadow-xs"
                        : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 space-y-2">
              <div className="flex items-center justify-between p-2 rounded-xl bg-stone-50 border border-stone-200">
                <span className="font-bold text-stone-700">Daily SMS & WhatsApp Alerts</span>
                <input type="checkbox" defaultChecked className="rounded text-[#2d6a4f]" />
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-stone-50 border border-stone-200">
                <span className="font-bold text-stone-700">Silage Spoilage Push Notification</span>
                <input type="checkbox" defaultChecked className="rounded text-[#2d6a4f]" />
              </div>
            </div>

            {/* About App Info */}
            <div className="pt-3 border-t border-stone-100 text-[11px] text-stone-500">
              <p className="font-bold text-stone-700">FeedSure 360 AI Platform</p>
              <p>Problem Statement ID: 26111 • Smart India Hackathon 2026</p>
              <p className="mt-0.5">Version 2026.2.0 • Offline Ready Architecture</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
