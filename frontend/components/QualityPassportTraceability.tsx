"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  QrCode,
  Download,
  Share2,
  CheckCircle2,
  Clock,
  Sparkles,
  Lock,
  Layers,
  FileCheck,
} from "lucide-react";
import { Language } from "../lib/dictionary";

export interface QualityPassportTraceabilityProps {
  batchId?: string;
  feedType?: string;
  lang: Language;
}

export const QualityPassportTraceability: React.FC<QualityPassportTraceabilityProps> = ({
  batchId = "MS-2026-0012",
  feedType = "Maize Silage",
  lang,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const passport = {
    batchId,
    feedType,
    farmName: "Ramesh Patil Dairy",
    farmId: "FS-MH-PN-00142",
    dateTested: "12 June 2026",
    device: "FA-001 (Rapid NIR Core)",
    calibration: "INDIA-CAL-v1.2",
    evidenceLevel: "HIGH (91.4%)",
    status: "APPROVED FOR FEEDING REVIEW",
    sha256Hash: "8f4a13b9c72e0d5a4431f9021e6490bb992837264a781c00d49e192a837c41bc",
  };

  const timeline = [
    { date: "10 Jun 2026", event: "Silage Bunker Intake & Sealing", actor: "Farmer (Ramesh)", status: "verified" },
    { date: "11 Jun 2026", event: "ISO 12099 5-Point NIR Chemometrics", actor: "Device FA-001", status: "verified" },
    { date: "11 Jun 2026", event: "IoT Storage Temperature Baseline (24.2°C)", actor: "Sensor Node FZ-001", status: "verified" },
    { date: "12 Jun 2026", event: "Face Heating Retest & Flieg Scoring (82/100)", actor: "Device FA-001", status: "verified" },
    { date: "12 Jun 2026", event: "Least-Cost Ration Advisory Generated", actor: "FeedSure LP Engine", status: "verified" },
  ];

  const handleCopyHash = () => {
    navigator.clipboard.writeText(passport.sha256Hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-8">
      {/* Header */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#2d6a4f]" />
            <h2 className="text-lg font-black text-[#1b4332]">Feed Quality Passport & Cryptographic Traceability</h2>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Immutable SHA-256 Audit Trail for Dairy Co-operative Quality Verification
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Certificate PDF</span>
          </button>
        </div>
      </div>

      {/* Main Passport Card & QR Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Certificate Summary (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border-2 border-[#b7e4c7] shadow-sm space-y-5 relative overflow-hidden">
          {/* Watermark */}
          <div className="absolute top-2 right-2 text-stone-100 font-black text-7xl select-none pointer-events-none opacity-40">
            360
          </div>

          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                Verified Passport
              </span>
              <h3 className="text-xl font-black text-[#1b4332] mt-1.5">{passport.feedType}</h3>
              <p className="text-xs text-stone-500 font-semibold">Batch: {passport.batchId}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-stone-400 font-bold block uppercase">Decision Status</span>
              <span className="text-xs font-black text-[#2d6a4f] bg-[#f3f9f4] px-2.5 py-1 rounded-xl border border-[#b7e4c7] inline-block mt-0.5">
                🟢 {passport.status}
              </span>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] text-stone-400 font-bold block uppercase">Farm Name & ID</span>
              <span className="font-extrabold text-[#1b4332]">{passport.farmName}</span>
              <span className="text-[10px] text-stone-500 block">{passport.farmId}</span>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] text-stone-400 font-bold block uppercase">Scan Timestamp</span>
              <span className="font-extrabold text-[#1b4332]">{passport.dateTested}</span>
              <span className="text-[10px] text-stone-500 block">Device: {passport.device}</span>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] text-stone-400 font-bold block uppercase">Calibration Domain</span>
              <span className="font-extrabold text-[#1b4332]">{passport.calibration}</span>
              <span className="text-[10px] text-stone-500 block">Mahalanobis D_M: 1.42</span>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] text-stone-400 font-bold block uppercase">Evidence Sufficiency</span>
              <span className="font-extrabold text-emerald-800">{passport.evidenceLevel}</span>
              <span className="text-[10px] text-stone-500 block">ISO 12099 Verified</span>
            </div>
          </div>

          {/* Cryptographic SHA-256 Hash Row */}
          <div className="p-3.5 rounded-2xl bg-stone-900 text-stone-200 text-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="truncate">
                <span className="text-[9px] text-stone-400 block uppercase font-bold">SHA-256 Ledger Hash</span>
                <span className="text-[11px] font-mono text-emerald-300 truncate block">
                  {passport.sha256Hash}
                </span>
              </div>
            </div>
            <button
              onClick={handleCopyHash}
              className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-[10px] font-bold shrink-0 transition-colors"
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
        </div>

        {/* Right: QR Verification & Digital Twin (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-col items-center justify-between text-center space-y-4">
          <div>
            <h3 className="text-sm font-black text-[#1b4332]">Instant Dairy QR Verification</h3>
            <p className="text-[11px] text-stone-500 mt-0.5">
              Scan with any mobile camera to view verified batch lab certificate
            </p>
          </div>

          {/* Simulated QR Code */}
          <div className="p-4 bg-white rounded-2xl border-2 border-stone-300 shadow-inner inline-block">
            <div className="w-40 h-40 bg-stone-900 rounded-xl p-2 flex flex-col items-center justify-center relative group">
              <div className="absolute inset-2 bg-white rounded-lg p-2 flex flex-col items-center justify-center">
                <QrCode className="w-28 h-28 text-stone-900" />
              </div>
            </div>
          </div>

          <div className="text-xs text-stone-600">
            <span className="font-bold text-[#1b4332]">Digital Twin Status: </span>
            <span className="text-emerald-700 font-extrabold">Active (5 Chained Events)</span>
          </div>
        </div>
      </div>

      {/* Feed Digital Twin Lifecycle History Timeline */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-4">
        <div>
          <h3 className="text-sm font-extrabold text-[#1b4332]">Feed Digital Twin Lifecycle Ledger</h3>
          <p className="text-[11px] text-stone-500">
            End-to-end provenance: from intake and storage to retesting and ration formulation
          </p>
        </div>

        <div className="space-y-3">
          {timeline.map((item, idx) => (
            <div
              key={item.event}
              className="p-3.5 rounded-2xl bg-[#f3f9f4] border border-[#d8f3dc] flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#2d6a4f] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <span className="font-bold text-[#1b4332] block">{item.event}</span>
                  <span className="text-[10px] text-stone-500">Logged by: {item.actor}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="font-bold text-stone-700 block">{item.date}</span>
                <span className="text-[10px] font-extrabold text-emerald-700">✓ Cryptographically Signed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
