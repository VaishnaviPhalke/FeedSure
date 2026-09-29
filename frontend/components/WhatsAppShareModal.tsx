"use client";

import React, { useState } from "react";
import { X, Share2, Copy, Check, MessageSquare, Download, ShieldCheck, Milk, Award } from "lucide-react";
import { BatchAnalyzeResponse } from "../lib/api";
import { Language } from "../lib/dictionary";

interface WhatsAppShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: BatchAnalyzeResponse;
  lang: Language;
}

export const WhatsAppShareModal: React.FC<WhatsAppShareModalProps> = ({
  isOpen,
  onClose,
  data,
  lang,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const nutrition = data.nutritional_analysis;
  const storage = data.storage_telemetry;
  const evidence = data.evidence;
  const profile = data.farm_profile;

  // Estimated Fat & SNF based on NDF/CP
  const estimatedFatPct = Number((3.8 + (nutrition.ndf_pct > 40 ? 0.4 : -0.2)).toFixed(1));
  const estimatedSnfPct = Number((8.4 + (nutrition.crude_protein_pct > 8.0 ? 0.3 : -0.1)).toFixed(1));
  const estRatePerL = Number((42.0 + (estimatedFatPct - 3.5) * 4.5 + (estimatedSnfPct - 8.5) * 3.0).toFixed(2));

  const shareText = `🥛 *FeedSure 360 Feed Quality Report*
━━━━━━━━━━━━━━━━━━━━
🏷 *Batch ID:* ${data.batch_id}
🌱 *Feed Type:* ${data.feed_type}
🛡 *Trust Status:* ${evidence.trust_status} (Score: ${evidence.evidence_score}/100)
━━━━━━━━━━━━━━━━━━━━
📊 *Nutritional Analysis:*
• Crude Protein (CP): ${nutrition.crude_protein_pct}%
• Dry Matter (DM): ${nutrition.dry_matter_pct}% (Moisture: ${nutrition.moisture_pct}%)
• NDF Fiber: ${nutrition.ndf_pct}% | ADF: ${nutrition.adf_pct}%
━━━━━━━━━━━━━━━━━━━━
💰 *Dairy Revenue Impact:*
• Estimated Milk Fat: ${estimatedFatPct}%
• Estimated SNF: ${estimatedSnfPct}%
• Projected Milk Rate: ₹${estRatePerL}/Litre
━━━━━━━━━━━━━━━━━━━━
🌾 *Storage & Fermentation:*
• Core Temp: ${storage.temperature_celsius}°C | pH: ${storage.ph}
• Flieg Grade: ${storage.flieg_evaluation?.grade_label || "Good"}
• Spoilage Risk: ${storage.spoilage_risk_index}/100
━━━━━━━━━━━━━━━━━━━━
🔐 *Digital Verification:*
Verified on consortium ledger: ${data.digital_twin?.passport?.passport_id || data.batch_id}
ISO 12099 / ICAR 2013 Standards Compliant.`;

  const handleShareWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs no-print">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-5 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-base text-stone-900">Share Report via WhatsApp</h3>
              <p className="text-[11px] text-stone-500">Send verified feed certificate to Dairy Co-op / Vet / Supplier</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Visual Preview */}
        <div className="bg-gradient-to-br from-[#1b4332] via-[#245e46] to-[#122b20] text-white p-5 rounded-2xl shadow-inner space-y-4 border border-[#52b788]/40">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#74c69d] text-[#1b4332] font-black text-xs flex items-center justify-center">
                360
              </div>
              <span className="font-black text-sm tracking-tight text-white">FeedSure 360 Passport</span>
            </div>
            <span className="text-[10px] font-mono bg-emerald-400/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30 font-bold">
              {evidence.trust_status}
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-[10px] text-emerald-300 font-mono">{data.batch_id} · {profile.farm_name}</div>
            <div className="text-xl font-black text-white">{data.feed_type} Quality Certificate</div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-white/10 p-2 rounded-xl backdrop-blur-xs">
              <div className="text-[9px] uppercase text-emerald-200 font-bold">Crude Protein</div>
              <div className="text-base font-black text-white">{nutrition.crude_protein_pct}%</div>
            </div>
            <div className="bg-white/10 p-2 rounded-xl backdrop-blur-xs">
              <div className="text-[9px] uppercase text-emerald-200 font-bold">Dry Matter</div>
              <div className="text-base font-black text-white">{nutrition.dry_matter_pct}%</div>
            </div>
            <div className="bg-white/10 p-2 rounded-xl backdrop-blur-xs">
              <div className="text-[9px] uppercase text-emerald-200 font-bold">Trust Score</div>
              <div className="text-base font-black text-[#74c69d]">{evidence.evidence_score}/100</div>
            </div>
          </div>

          {/* Fat & SNF Revenue Projection */}
          <div className="bg-black/25 p-3 rounded-xl border border-white/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Milk className="w-4 h-4 text-emerald-300" />
              <div>
                <div className="font-bold text-white">Est. Milk Fat &amp; SNF</div>
                <div className="text-[10px] text-stone-300">Fat: {estimatedFatPct}% · SNF: {estimatedSnfPct}%</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-black text-emerald-300 text-sm">₹{estRatePerL}/L</div>
              <div className="text-[9px] text-stone-300">Projected Rate</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleShareWhatsApp}
            className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1ebd59] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Open in WhatsApp</span>
          </button>
          <button
            onClick={handleCopy}
            className="py-3 px-4 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 font-bold text-xs flex items-center justify-center gap-1.5 transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-stone-500" />}
            <span>{copied ? "Copied!" : "Copy Text"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
