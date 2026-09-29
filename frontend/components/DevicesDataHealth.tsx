"use client";

import React, { useState } from "react";
import {
  Cpu,
  Radio,
  Wifi,
  WifiOff,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  BatteryCharging,
  Activity,
  ShieldCheck,
} from "lucide-react";
import { Language } from "../lib/dictionary";
import { offlineQueue } from "../lib/offlineQueue";

export interface DevicesDataHealthProps {
  lang: Language;
}

export const DevicesDataHealth: React.FC<DevicesDataHealthProps> = ({ lang }) => {
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [queuedCount, setQueuedCount] = useState<number>(3);

  const handleManualSync = () => {
    setIsSyncing(true);
    offlineQueue.flushQueue();
    setTimeout(() => {
      setIsSyncing(false);
      setQueuedCount(0);
    }, 1800);
  };

  const sensorHealth = [
    { name: "NIR Diffuse Reflectance Diode Array", pct: 98, status: "Optimal", badge: "98%" },
    { name: "Computer Vision Macro Camera Lens", pct: 100, status: "Optimal", badge: "100%" },
    { name: "Digital Silage Core Thermoprobe", pct: 100, status: "Calibrated", badge: "100%" },
    { name: "Trough Relative Humidity Sensor", pct: 100, status: "Optimal", badge: "100%" },
    { name: "Strain Gauge Load Cell (Weight)", pct: 97, status: "Zeroed", badge: "97%" },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-8">
      {/* Header */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#2d6a4f]" />
            <h2 className="text-lg font-black text-[#1b4332]">Connected Hardware & Sensor Health</h2>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Diagnostic status of on-farm NIR spectrometer, camera node, and trough telemetry
          </p>
        </div>

        <button
          onClick={handleManualSync}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold text-xs shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
          <span>{isSyncing ? "Syncing Telemetry..." : "Force Offline Sync"}</span>
        </button>
      </div>

      {/* 2 Primary Device Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Device 1: Rapid Feed Analyzer */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                FA-1
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#1b4332]">Rapid Feed Analyzer</h3>
                <p className="text-[10px] text-stone-400">Model: FA-001 Core Handheld</p>
              </div>
            </div>
            <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
              🟢 ONLINE
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2">
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] text-stone-400 block font-bold">NIR Matrix</span>
              <span className="font-extrabold text-[#1b4332]">✓ 800 - 1050nm</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] text-stone-400 block font-bold">Calibration</span>
              <span className="font-extrabold text-[#1b4332]">INDIA-CAL-v1.2</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] text-stone-400 block font-bold">Camera Lens</span>
              <span className="font-extrabold text-[#1b4332]">✓ 22-D Texture</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] text-stone-400 block font-bold">Last Probe Scan</span>
              <span className="font-extrabold text-[#2d6a4f]">2 mins ago</span>
            </div>
          </div>
        </div>

        {/* Device 2: Smart Feed Zone Monitor */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
                FZ-1
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#1b4332]">Smart Feed Zone Node</h3>
                <p className="text-[10px] text-stone-400">Node ID: FZ-001 (Main Trough)</p>
              </div>
            </div>
            <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
              🟢 ONLINE
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2">
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] text-stone-400 block font-bold">Live Temp</span>
              <span className="font-extrabold text-amber-700">31.4°C</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] text-stone-400 block font-bold">Humidity</span>
              <span className="font-extrabold text-blue-700">72% RH</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] text-stone-400 block font-bold">Feed Mass</span>
              <span className="font-extrabold text-[#1b4332]">8.4 kg</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] text-stone-400 block font-bold">Telemetry Sync</span>
              <span className="font-extrabold text-[#2d6a4f]">10 sec ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sensor Calibration Health Gauges */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-4">
        <h3 className="text-sm font-extrabold text-[#1b4332]">Hardware Sensor Health & Calibration Accuracy</h3>

        <div className="space-y-3">
          {sensorHealth.map((sens) => (
            <div key={sens.name} className="p-3 rounded-2xl bg-stone-50/70 border border-stone-200">
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-[#1b4332]">{sens.name}</span>
                <span className="text-[#2d6a4f] font-black">{sens.badge}</span>
              </div>
              <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#2d6a4f] rounded-full" style={{ width: `${sens.pct}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rural Offline Sync & Buffer Architecture */}
      <div className="bg-gradient-to-r from-[#f3f9f4] to-emerald-50 border border-[#b7e4c7] p-5 rounded-3xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#2d6a4f] text-white flex items-center justify-center shrink-0">
            <Wifi className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-black text-[#1b4332]">Rural Offline Database Queue Status</h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                IndexedDB Active
              </span>
            </div>
            <p className="text-xs text-stone-600 mt-1">
              FeedSure 360 executes chemometrics and offline queueing locally in browser storage. {queuedCount} records are safely buffered and will push to cloud upon cellular handshake.
            </p>
          </div>
        </div>

        <button
          onClick={handleManualSync}
          className="px-4 py-2 rounded-xl bg-[#2d6a4f] text-white font-bold text-xs hover:bg-[#1b4332] shrink-0 shadow-xs"
        >
          Sync Now ({queuedCount})
        </button>
      </div>
    </div>
  );
};
