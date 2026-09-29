"use client";

import React, { useState } from "react";
import { ArrowLeft, ShieldCheck, UserCheck, Sparkles, Lock, Phone, Mail, MapPin, Building, Beef } from "lucide-react";
import { Language } from "../lib/dictionary";

interface AuthScreensProps {
  mode: "login" | "signup";
  setMode: (mode: "login" | "signup") => void;
  onSuccess: () => void;
  onBackToHome: () => void;
  lang: Language;
}

export const AuthScreens: React.FC<AuthScreensProps> = ({
  mode,
  setMode,
  onSuccess,
  onBackToHome,
  lang,
}) => {
  // Login State
  const [identifier, setIdentifier] = useState("ramesh.patil@dairy.in");
  const [password, setPassword] = useState("••••••••");
  const [rememberMe, setRememberMe] = useState(true);

  // Sign Up State
  const [fullName, setFullName] = useState("Ramesh Patil");
  const [mobileNumber, setMobileNumber] = useState("+91 98220 12345");
  const [farmName, setFarmName] = useState("Patil Dairy Farm");
  const [stateDistrict, setStateDistrict] = useState("Maharashtra / Pune");
  const [animalCount, setAnimalCount] = useState(15);
  const [dairyType, setDairyType] = useState("Crossbred Holstein & Murrah Buffalo");
  const [farmId] = useState("FS-MH-PN-00142");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col justify-center items-center px-4 py-8 relative">
      {/* Back button */}
      <button
        onClick={onBackToHome}
        className="absolute top-6 left-6 flex items-center gap-2 text-stone-600 hover:text-[#1b4332] font-semibold text-xs transition-colors bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-xs"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>{lang === "hi" ? "मुख्य पृष्ठ" : lang === "mr" ? "मुख्य पान" : "Back to Home"}</span>
      </button>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-stone-200 p-6 sm:p-8">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#2d6a4f] to-[#52b788] text-white font-black text-2xl flex items-center justify-center mx-auto shadow-md mb-3">
            360
          </div>
          <h2 className="text-2xl font-black text-[#1b4332]">FeedSure 360</h2>
          <p className="text-xs text-stone-500 mt-1 font-medium">
            {mode === "login"
              ? lang === "hi"
                ? "वापसी पर स्वागत है! अपने खाते में लॉग इन करें"
                : lang === "mr"
                ? "पुन्हा स्वागत आहे! खात्यात लॉग इन करा"
                : "Welcome Back! Sign in to manage your dairy feed"
              : lang === "hi"
              ? "हज़ारों डेयरी किसानों से जुड़ें • नया खाता बनाएं"
              : lang === "mr"
              ? "हजारो दुग्ध उत्पादकांशी जोडा • नवीन खाते तयार करा"
              : "Create Your Farm Account & Identity"}
          </p>
        </div>

        {mode === "login" ? (
          /* LOGIN FORM */
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                {lang === "hi" ? "मोबाइल नंबर या ईमेल" : lang === "mr" ? "मोबाइल नंबर किंवा ईमेल" : "Email or Mobile Number"}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. +91 98220 12345"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#2d6a4f]/20 focus:border-[#2d6a4f] font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-stone-700">
                  {lang === "hi" ? "पासवर्ड" : lang === "mr" ? "पासवर्ड" : "Password"}
                </label>
                <a href="#forgot" className="text-[11px] font-semibold text-[#2d6a4f] hover:underline">
                  {lang === "hi" ? "पासवर्ड भूल गए?" : lang === "mr" ? "पासवर्ड विसरलात?" : "Forgot Password?"}
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#2d6a4f]/20 focus:border-[#2d6a4f] font-medium"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-stone-600">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-[#2d6a4f] focus:ring-[#2d6a4f]"
                />
                <span>{lang === "hi" ? "मुझे याद रखें" : lang === "mr" ? "मला लक्षात ठेवा" : "Remember me"}</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-extrabold text-xs shadow-md transition-all active:scale-[0.99]"
            >
              {lang === "hi" ? "लॉग इन करें" : lang === "mr" ? "लॉग इन करा" : "Login to Farm Dashboard"}
            </button>

            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-200"></div>
              </div>
              <span className="relative px-3 bg-white text-[11px] font-bold text-stone-400 uppercase">
                {lang === "hi" ? "या" : lang === "mr" ? "किंवा" : "or continue with"}
              </span>
            </div>

            <button
              type="button"
              onClick={onSuccess}
              className="w-full py-2 px-4 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <span className="font-black text-blue-600">G</span>
              <span>{lang === "hi" ? "गूगल के साथ जारी रखें" : lang === "mr" ? "गुगल सह सुरू ठेवा" : "Continue with Google"}</span>
            </button>

            <p className="text-center text-xs text-stone-600 pt-2">
              {lang === "hi" ? "खाता नहीं है?" : lang === "mr" ? "खाते नाही?" : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="font-extrabold text-[#2d6a4f] hover:underline"
              >
                {lang === "hi" ? "नया खाता बनाएं" : lang === "mr" ? "नवीन खाते तयार करा" : "Sign Up"}
              </button>
            </p>
          </form>
        ) : (
          /* SIGN UP FORM WITH AUTO FARM ID */
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Auto Farm ID Callout */}
            <div className="bg-[#f3f9f4] border border-[#b7e4c7] p-2.5 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2d6a4f]" />
                <div>
                  <span className="text-[10px] font-bold text-stone-500 uppercase">Assigned Farm ID:</span>
                  <p className="text-xs font-black text-[#1b4332]">{farmId}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#2d6a4f] text-white">
                Verified
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {lang === "hi" ? "किसान का नाम" : lang === "mr" ? "शेतकऱ्याचे नाव" : "Farmer Full Name"}
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#2d6a4f]/20 focus:border-[#2d6a4f]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {lang === "hi" ? "मोबाइल नंबर" : lang === "mr" ? "मोबाइल नंबर" : "Mobile Number"}
                </label>
                <input
                  type="text"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#2d6a4f]/20 focus:border-[#2d6a4f]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {lang === "hi" ? "डेयरी का नाम" : lang === "mr" ? "डेअरीचे नाव" : "Farm Name"}
                </label>
                <input
                  type="text"
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#2d6a4f]/20 focus:border-[#2d6a4f]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {lang === "hi" ? "राज्य / जिला" : lang === "mr" ? "राज्य / जिल्हा" : "State / District"}
                </label>
                <input
                  type="text"
                  value={stateDistrict}
                  onChange={(e) => setStateDistrict(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#2d6a4f]/20 focus:border-[#2d6a4f]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {lang === "hi" ? "कुल पशु संख्या" : lang === "mr" ? "एकूण जनावरे" : "Total Animals"}
                </label>
                <input
                  type="number"
                  value={animalCount}
                  onChange={(e) => setAnimalCount(Number(e.target.value))}
                  className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#2d6a4f]/20 focus:border-[#2d6a4f]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-extrabold text-xs shadow-md transition-all active:scale-[0.99] mt-2"
            >
              {lang === "hi" ? "फार्म खाता पंजीकृत करें" : lang === "mr" ? "फार्म खाते तयार करा" : "Create Farm Account & Identity"}
            </button>

            <p className="text-center text-xs text-stone-600 pt-1">
              {lang === "hi" ? "पहले से खाता है?" : lang === "mr" ? "आधीच खाते आहे?" : "Already registered?"}{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="font-extrabold text-[#2d6a4f] hover:underline"
              >
                {lang === "hi" ? "लॉग इन करें" : lang === "mr" ? "लॉग इन करा" : "Login"}
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
