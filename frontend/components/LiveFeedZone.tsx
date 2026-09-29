"use client";

import React, { useState } from "react";
import {
  Thermometer,
  Droplets,
  Scale,
  Clock,
  Radio,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Language } from "../lib/dictionary";

export interface LiveFeedZoneProps {
  onRetest: () => void;
  lang: Language;
}

export const LiveFeedZone: React.FC<LiveFeedZoneProps> = ({
  onRetest,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<"temp" | "humidity" | "weight" | "exposure">("temp");

  const telemetrySeries = [
    { time: "06:00", temp: 24.2, humidity: 65, weight: 25.0, exposure: 0.0 },
    { time: "08:00", temp: 25.1, humidity: 67, weight: 22.4, exposure: 2.0 },
    { time: "10:00", temp: 26.5, humidity: 68, weight: 19.1, exposure: 4.0 },
    { time: "12:00", temp: 28.4, humidity: 70, weight: 15.2, exposure: 6.0 },
    { time: "14:00", temp: 29.8, humidity: 71, weight: 11.5, exposure: 8.0 },
    { time: "16:00", temp: 31.4, humidity: 72, weight: 8.4, exposure: 10.0 },
    { time: "18:00", temp: 31.1, humidity: 73, weight: 8.4, exposure: 12.0 },
  ];

  const timelineEvents = [
    { time: "10:00", title: "Fresh Silage Trough Loaded", desc: "25.0 kg batch placed in feed trough", status: "ok" },
    { time: "12:30", title: "Ambient & Core Temp Rising", desc: "Temp rose from 26.5°C to 28.4°C with sun exposure", status: "ok" },
    { time: "14:00", title: "Humidity Elevated (71%)", desc: "Microclimate moisture favorable for yeast growth", status: "warn" },
    { time: "16:00", title: "Aerobic Heating Detected (ΔT = +2.7°C)", desc: "dT/dt rate of heating reached 0.7°C/hr threshold", status: "warn" },
    { time: "18:00", title: "Retest & Clean Trough Recommended", desc: "Remaining 8.4 kg at risk of aerobic secondary fermentation", status: "action" },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-8">
      {/* Header with Zone Status */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-emerald-600 animate-pulse" />
            <h2 className="text-lg font-black text-[#1b4332]">SMART FEED ZONE 01</h2>
            <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
              🟢 ONLINE
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Node ID: FZ-001 • Location: Main Lactating Herd Trough • Last Sync: 10 sec ago
          </p>
        </div>

        <button
          onClick={onRetest}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold text-xs shadow-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retest Trough Feed</span>
        </button>
      </div>

      {/* 4 Live Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-bold mb-1">
            <span>Core Temperature</span>
            <Thermometer className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#1b4332]">31.4°C</span>
            <span className="text-xs font-bold text-amber-700">+2.7°C (24h)</span>
          </div>
          <span className="text-[10px] text-stone-400 block mt-1">Amb: 28.2°C (ΔT = 3.2°C)</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-bold mb-1">
            <span>Relative Humidity</span>
            <Droplets className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#1b4332]">72%</span>
            <span className="text-xs font-semibold text-stone-400">Stable</span>
          </div>
          <span className="text-[10px] text-stone-400 block mt-1">Silo dew point: 22.4°C</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-bold mb-1">
            <span>Feed Remaining</span>
            <Scale className="w-4 h-4 text-[#2d6a4f]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#1b4332]">8.4 kg</span>
            <span className="text-xs font-semibold text-stone-400">of 25.0 kg</span>
          </div>
          <span className="text-[10px] text-stone-400 block mt-1">Estimated finish: 2h 45m</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-bold mb-1">
            <span>Trough Exposure</span>
            <Clock className="w-4 h-4 text-purple-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#1b4332]">7h 22m</span>
            <span className="text-xs font-semibold text-stone-400">Open Air</span>
          </div>
          <span className="text-[10px] text-amber-700 font-bold block mt-1">Secondary fermentation risk</span>
        </div>
      </div>

      {/* Main Grid: Chart + Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Telemetry Curves (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-[#1b4332]">24-Hour Telemetry Trajectory</h3>
              <p className="text-[11px] text-stone-500">Live streaming IoT sensor telemetry from bunk trough</p>
            </div>

            {/* Metric Tab Selector */}
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl text-xs font-bold">
              {[
                { id: "temp", label: "Temperature" },
                { id: "humidity", label: "Humidity" },
                { id: "weight", label: "Feed Mass" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? "bg-white text-[#1b4332] shadow-xs font-black"
                      : "text-stone-500 hover:text-stone-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={telemetrySeries} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#888888" fontSize={11} tickLine={false} />
                <YAxis stroke="#888888" fontSize={11} tickLine={false} domain={["auto", "auto"]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1b4332", color: "#fff", borderRadius: "8px", fontSize: "12px", border: "none" }}
                />
                <Line
                  type="monotone"
                  dataKey={activeTab}
                  stroke={activeTab === "temp" ? "#d97706" : activeTab === "humidity" ? "#2563eb" : "#2d6a4f"}
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#2d6a4f" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Early Deterioration Alert Banner */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-extrabold text-amber-900 block">
                ⚠ EARLY DETERIORATION SIGNAL DETECTED
              </span>
              <p className="text-amber-800/90 leading-relaxed">
                Silage core temperature has risen <strong>2.7°C over the past 24 hours</strong> while feed mass is low. Aerobic yeasts are consuming lactic acid. Recommended: Clean trough before loading evening ration.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Feed Condition Timeline (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div>
            <h3 className="text-sm font-extrabold text-[#1b4332]">Feed Condition Timeline</h3>
            <p className="text-[11px] text-stone-500">Longitudinal lifecycle events since morning feeding</p>
          </div>

          <div className="space-y-3 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-stone-200">
            {timelineEvents.map((evt, idx) => {
              const isAction = evt.status === "action";
              const isWarn = evt.status === "warn";

              return (
                <div key={evt.time} className="relative flex items-start gap-3.5 pl-2">
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black text-white shrink-0 mt-0.5 ring-4 ring-white ${
                      isAction
                        ? "bg-red-600"
                        : isWarn
                        ? "bg-amber-500"
                        : "bg-[#2d6a4f]"
                    }`}
                  >
                    ●
                  </div>

                  <div className="flex-1 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold text-[#1b4332]">{evt.title}</span>
                      <span className="text-[10px] font-bold text-stone-500 bg-white px-1.5 py-0.5 rounded border border-stone-200">
                        {evt.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600">{evt.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
