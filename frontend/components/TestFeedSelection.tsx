"use client";

import React, { useState } from "react";
import {
  Wheat,
  Sparkles,
  FlaskConical,
  Camera,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Info,
} from "lucide-react";
import { Language } from "../lib/dictionary";

export interface TestFeedSelectionProps {
  onStartScan: (feedType: string, testMode: string) => void;
  lang: Language;
}

export const TestFeedSelection: React.FC<TestFeedSelectionProps> = ({
  onStartScan,
  lang,
}) => {
  const [selectedMode, setSelectedMode] = useState<string>("feed-analysis");
  const [selectedFeedType, setSelectedFeedType] = useState<string>("Maize Silage");

  const testModes = [
    {
      id: "feed-analysis",
      title: lang === "hi" ? "चारा पोषण विश्लेषण" : lang === "mr" ? "चारा पोषण विश्लेषण" : "Feed Analysis",
      subtitle: lang === "hi" ? "प्रोटीन, शुष्क पदार्थ, फाइबर" : lang === "mr" ? "प्रथिने, शुष्क घटक, फायबर" : "Nutritional composition & quality",
      icon: Wheat,
      color: "emerald",
    },
    {
      id: "silage-analysis",
      title: lang === "hi" ? "साइलेज गुणवत्ता जाँच" : lang === "mr" ? "सायलेज गुणवत्ता चाचणी" : "Silage Analysis",
      subtitle: lang === "hi" ? "pH, किण्वन और फ्लिग स्कोर" : lang === "mr" ? "pH, किण्वन व फ्लिग स्कोअर" : "Fermentation, pH & spoilage risk",
      icon: Sparkles,
      color: "blue",
    },
    {
      id: "adulteration-check",
      title: lang === "hi" ? "मिलावट और सुरक्षा" : lang === "mr" ? "भेसळ व सुरक्षा चाचणी" : "Adulteration Check",
      subtitle: lang === "hi" ? "यूरिया, रेत/सिलिका और विदेशी तत्व" : lang === "mr" ? "युरिया, वाळू/सिलिका व बाह्य घटक" : "Urea, sand/silica & foreign matter",
      icon: FlaskConical,
      color: "amber",
    },
    {
      id: "visual-inspection",
      title: lang === "hi" ? "कैमरा दृश्य निरीक्षण" : lang === "mr" ? "कॅमेरा दृश्य तपासणी" : "Visual Inspection",
      subtitle: lang === "hi" ? "फफूंद और बनावट स्क्रीनिंग" : lang === "mr" ? "बुरशी व पोत तपासणी" : "Surface anomaly & mould screening",
      icon: Camera,
      color: "purple",
    },
  ];

  const feedTypes = [
    { id: "Maize Silage", label: "Maize Silage", hi: "मक्का साइलेज", mr: "मका सायलेज", icon: "🌽" },
    { id: "Green Fodder", label: "Green Fodder", hi: "हरा चारा (नेपियर)", mr: "हिरवा चारा (नेपियर)", icon: "🌿" },
    { id: "Dry Fodder", label: "Dry Fodder", hi: "सूखा चारा (भूसा)", mr: "सुका चारा (कडबा)", icon: "🌾" },
    { id: "Concentrate", label: "Concentrate", hi: "पशु आहार (दाना)", mr: "पशुखाद्य (गोळी पेंड)", icon: "🥣" },
    { id: "Oil Cake", label: "Oil Cake", hi: "सरसों / बिनौला खली", mr: "सरकी / भुईमूग पेंड", icon: "🟫" },
    { id: "Bran", label: "Wheat Bran", hi: "गेहूं चोकर", mr: "गहू कोंडा", icon: "🌾" },
    { id: "Mineral Mixture", label: "Mineral Mix", hi: "खनिज मिश्रण", mr: "खनिज मिश्रण", icon: "🧪" },
    { id: "Other", label: "Custom Feed", hi: "अन्य चारा", mr: "इतर चारा", icon: "📦" },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-8">
      {/* 4-Step Flow Stepper */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#2d6a4f] text-white flex items-center justify-center text-xs font-bold">1</span>
            <span className="text-xs font-bold text-[#1b4332]">Select Feed</span>
          </div>
          <span className="text-stone-300">→</span>
          <div className="flex items-center gap-2 text-stone-400">
            <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center text-xs font-bold">2</span>
            <span className="text-xs font-medium">5-Pt Scan</span>
          </div>
          <span className="text-stone-300">→</span>
          <div className="flex items-center gap-2 text-stone-400">
            <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center text-xs font-bold">3</span>
            <span className="text-xs font-medium">AI Evidence</span>
          </div>
          <span className="text-stone-300">→</span>
          <div className="flex items-center gap-2 text-stone-400">
            <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center text-xs font-bold">4</span>
            <span className="text-xs font-medium">Nutrition & Safety</span>
          </div>
        </div>
      </div>

      {/* Section 1: Choose What You Want to Test */}
      <div>
        <h2 className="text-lg font-black text-[#1b4332] mb-1">
          {lang === "hi" ? "आप क्या परीक्षण करना चाहते हैं?" : lang === "mr" ? "तुम्हाला कोणती चाचणी करायची आहे?" : "Choose What You Want to Test"}
        </h2>
        <p className="text-xs text-stone-500 mb-4">
          Select test scope to activate the optimal multispectral and computer vision pipeline.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {testModes.map((mode) => {
            const Icon = mode.icon;
            const isSelected = selectedMode === mode.id;

            return (
              <div
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#f3f9f4] border-[#2d6a4f] shadow-sm scale-[1.02]"
                    : "bg-white border-stone-200 hover:border-stone-300"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isSelected ? "bg-[#2d6a4f] text-white" : "bg-stone-100 text-stone-700"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-[#2d6a4f]" />}
                </div>

                <div>
                  <h3 className="font-extrabold text-sm text-[#1b4332]">{mode.title}</h3>
                  <p className="text-[11px] text-stone-500 mt-0.5">{mode.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: Select Feed Type */}
      <div>
        <h2 className="text-lg font-black text-[#1b4332] mb-1">
          {lang === "hi" ? "चारा प्रकार चुनें" : lang === "mr" ? "चाऱ्याचा प्रकार निवडा" : "Select Feed Ingredient"}
        </h2>
        <p className="text-xs text-stone-500 mb-4">
          FeedSure 360 chemometrics automatically selects domain calibration matrices for this ingredient.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {feedTypes.map((feed) => {
            const isSelected = selectedFeedType === feed.id;
            return (
              <div
                key={feed.id}
                onClick={() => setSelectedFeedType(feed.id)}
                className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer text-center ${
                  isSelected
                    ? "bg-[#f3f9f4] border-[#2d6a4f] shadow-sm font-black"
                    : "bg-white border-stone-200 hover:border-stone-300 font-bold"
                }`}
              >
                <div className="text-2xl mb-1.5">{feed.icon}</div>
                <div className="text-xs text-[#1b4332]">
                  {lang === "hi" ? feed.hi : lang === "mr" ? feed.mr : feed.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Adaptive Testing Innovation: Recommended Evidence Path */}
      <div className="bg-gradient-to-r from-[#f3f9f4] to-emerald-50/50 border border-[#b7e4c7] p-5 rounded-2xl shadow-xs">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#2d6a4f] text-white flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Recommended Evidence Path
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#2d6a4f] text-white">
                Selected: {selectedFeedType}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div className="space-y-1.5 text-xs text-stone-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>NIR Diffuse Reflectance (800nm - 1050nm)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>ISO 12099 5-Point Core Sampling Grid</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-stone-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Visual Texture & Colorimetry Screening</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Silage Pit Temperature Trajectory Integration</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-stone-500 mt-3 pt-2 border-t border-emerald-200/60">
              ⚡ <strong>Adaptive Gating:</strong> If spatial heterogeneity (CV &gt; 12%) or Mahalanobis calibration distance exceeds threshold, the system triggers re-test escalation.
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-end">
        <button
          onClick={() => onStartScan(selectedFeedType, selectedMode)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-extrabold text-sm shadow-md transition-all active:scale-[0.99]"
        >
          <span>
            {lang === "hi" ? "स्कैन और नमूना परीक्षण शुरू करें" : lang === "mr" ? "स्कॅन आणि नमुना चाचणी सुरू करा" : "Proceed to 5-Point Core Scan"}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
