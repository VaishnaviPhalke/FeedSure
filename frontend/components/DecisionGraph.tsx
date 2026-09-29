"use client";

import React, { useState } from "react";
import {
  Wheat,
  Camera,
  Cpu,
  ShieldCheck,
  Beef,
  Brain,
  FileCheck2,
  ChevronRight,
  Info,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Language } from "../lib/dictionary";

export interface DecisionGraphProps {
  lang?: Language;
}

export const DecisionGraph: React.FC<DecisionGraphProps> = ({ lang = "en" }) => {
  const [activeNode, setActiveNode] = useState<string>("evidence");

  const nodes = [
    {
      id: "feed",
      label: "Feed Intake",
      icon: Wheat,
      color: "emerald",
      title: "Maize Silage Batch (120-Day Matured)",
      evidence: "Physical sample core harvested from Patil Dairy Bunker Pit 01. Initial intake logged on 10 Jun 2026.",
    },
    {
      id: "sense",
      label: "Multimodal Sensing",
      icon: Camera,
      color: "blue",
      title: "NIR Reflectance + 22-D Texture Camera",
      evidence: "FA-001 scanned 800nm-1050nm spectrum across 5 spatial points. Camera confirmed yellow-green hue with zero synthetic urea shift.",
    },
    {
      id: "evidence",
      label: "Evidence Engine",
      icon: ShieldCheck,
      color: "teal",
      title: "Evidence Sufficiency Score (91.4% HIGH)",
      evidence: "Mahalanobis D_M (1.42) confirmed calibration applicability. Spatial variance (CV 8.4%) proved batch uniformity. Trust certified.",
    },
    {
      id: "dairy",
      label: "Dairy Herd Context",
      icon: Beef,
      color: "purple",
      title: "12 Lactating Cows @ 10.5 L/day Target",
      evidence: "ICAR/NRC standards compute daily requirement of 2.40 kg Crude Protein & 13.5 kg DMI per cow for current lactation curve.",
    },
    {
      id: "ration",
      label: "Least-Cost Solver",
      icon: Brain,
      color: "purple",
      title: "SciPy HiGHS Linear Programming Solver",
      evidence: "Identified -0.4 kg protein deficit. Replaced 3 kg compound concentrate with 1 kg oil cake + 4 kg silage, saving ₹59.48/cow/day.",
    },
    {
      id: "twin",
      label: "Digital Twin",
      icon: FileCheck2,
      color: "stone",
      title: "Immutable SHA-256 Ledger Record",
      evidence: "Chained all sensory, chemometric, and ration events into cryptographic passport FS-20260929-D9EC17 with verified QR code.",
    },
  ];

  const selected = nodes.find((n) => n.id === activeNode) || nodes[2];

  return (
    <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <h3 className="text-sm font-extrabold text-[#1b4332]">
              FEED-TO-DAIRY DECISION GRAPH & REASONING CHAIN
            </h3>
          </div>
          <p className="text-[11px] text-stone-500">
            Click any node below to inspect exactly where FeedSure's recommendations originate
          </p>
        </div>
        <span className="text-[10px] font-bold text-stone-400">Interactive Reasoning Map</span>
      </div>

      {/* Horizontal Interactive Node Chain */}
      <div className="flex items-center justify-between gap-1 overflow-x-auto py-2 custom-scrollbar">
        {nodes.map((node, idx) => {
          const Icon = node.icon;
          const isSelected = activeNode === node.id;

          return (
            <React.Fragment key={node.id}>
              <button
                onClick={() => setActiveNode(node.id)}
                className={`flex flex-col items-center p-2.5 rounded-2xl border-2 transition-all shrink-0 min-w-[95px] text-center ${
                  isSelected
                    ? "bg-purple-50 border-purple-600 shadow-sm scale-105 font-black text-purple-900"
                    : "bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-400 font-bold"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center mb-1 text-white ${
                    node.color === "emerald"
                      ? "bg-[#2d6a4f]"
                      : node.color === "blue"
                      ? "bg-blue-600"
                      : node.color === "teal"
                      ? "bg-teal-700"
                      : node.color === "purple"
                      ? "bg-purple-700"
                      : "bg-stone-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] leading-tight block">{node.label}</span>
              </button>

              {idx < nodes.length - 1 && (
                <ChevronRight className="w-4 h-4 text-stone-300 shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Node Deep-Dive Evidence Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50/60 to-stone-50 border border-purple-200 text-xs space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] font-black uppercase text-purple-800 tracking-wider">
            Selected Reasoning Step: {selected.label}
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-200 text-purple-900">
            Verified Evidence
          </span>
        </div>
        <h4 className="font-extrabold text-[#1b4332] text-sm">{selected.title}</h4>
        <p className="text-stone-700 leading-relaxed">{selected.evidence}</p>
      </div>
    </div>
  );
};
