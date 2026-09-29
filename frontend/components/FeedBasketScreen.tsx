"use client";

import React, { useState } from "react";
import {
  ShoppingBasket,
  Plus,
  Edit2,
  Trash2,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Language } from "../lib/dictionary";

export interface FeedBasketScreenProps {
  onProceedToRation: () => void;
  onViewPassport: (feedName: string) => void;
  lang: Language;
}

export const FeedBasketScreen: React.FC<FeedBasketScreenProps> = ({
  onProceedToRation,
  onViewPassport,
  lang,
}) => {
  const [basket, setBasket] = useState([
    { id: 1, name: "Maize Silage", qty: 200, unit: "kg", price: 4.0, quality: "Good", cp: 8.7, dm: 34.2, lastTested: "Today", status: "tested" },
    { id: 2, name: "Green Fodder (Napier)", qty: 120, unit: "kg", price: 2.0, quality: "Good", cp: 9.5, dm: 22.0, lastTested: "18 Jun 2026", status: "tested" },
    { id: 3, name: "Dry Fodder (Wheat Straw)", qty: 80, unit: "kg", price: 6.0, quality: "Good", cp: 3.8, dm: 88.0, lastTested: "10 Jun 2026", status: "tested" },
    { id: 4, name: "Compound Cattle Feed", qty: 50, unit: "kg", price: 28.0, quality: "Needs Test", cp: 18.0, dm: 90.0, lastTested: "28 May 2026", status: "retest" },
    { id: 5, name: "Mustard Oil Cake", qty: 30, unit: "kg", price: 32.0, quality: "Good", cp: 34.0, dm: 91.0, lastTested: "03 Jun 2026", status: "tested" },
    { id: 6, name: "Wheat Bran (Choker)", qty: 40, unit: "kg", price: 18.0, quality: "Good", cp: 14.5, dm: 89.0, lastTested: "02 Jun 2026", status: "tested" },
    { id: 7, name: "Chelated Mineral Mixture", qty: 5, unit: "kg", price: 60.0, quality: "Good", cp: 0.0, dm: 98.0, lastTested: "01 Jun 2026", status: "tested" },
  ]);

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newName, setNewName] = useState("");
  const [newQty, setNewQty] = useState(50);
  const [newPrice, setNewPrice] = useState(15);

  const handleAdd = () => {
    if (!newName) return;
    setBasket([
      ...basket,
      {
        id: Date.now(),
        name: newName,
        qty: newQty,
        unit: "kg",
        price: newPrice,
        quality: "Good",
        cp: 12.0,
        dm: 85.0,
        lastTested: "Today",
        status: "tested",
      },
    ]);
    setNewName("");
    setShowAddModal(false);
  };

  const totalInventoryKg = basket.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-8">
      {/* Header */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShoppingBasket className="w-5 h-5 text-[#2d6a4f]" />
            <h2 className="text-lg font-black text-[#1b4332]">Farm Feed Inventory & Basket</h2>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Available on-farm ingredients linked to verified NIR Chemometric Passports
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Ingredient</span>
          </button>
          <button
            onClick={onProceedToRation}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold text-xs shadow-xs"
          >
            <span>Run Least-Cost Ration Optimizer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <div className="text-xs font-extrabold text-[#1b4332] uppercase tracking-wider">
            7 Active Farm Ingredients ({totalInventoryKg} kg Total Stock)
          </div>
          <span className="text-[11px] text-stone-500 font-medium">
            Values directly utilized by Least-Cost LP Solver
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-bold uppercase text-[10px] border-b border-stone-200">
              <tr>
                <th className="px-5 py-3">Ingredient</th>
                <th className="px-4 py-3">Available Qty</th>
                <th className="px-4 py-3">Price (₹/kg)</th>
                <th className="px-4 py-3">Crude Protein</th>
                <th className="px-4 py-3">Dry Matter</th>
                <th className="px-4 py-3">Quality Status</th>
                <th className="px-5 py-3 text-right">Digital Passport</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium text-stone-700">
              {basket.map((item) => (
                <tr key={item.id} className="hover:bg-[#f3f9f4]/60 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-[#1b4332]">{item.name}</td>
                  <td className="px-4 py-3.5">
                    <span className="font-extrabold">{item.qty}</span> {item.unit}
                  </td>
                  <td className="px-4 py-3.5 font-bold text-stone-800">₹{item.price.toFixed(2)}</td>
                  <td className="px-4 py-3.5 font-bold text-[#2d6a4f]">{item.cp}%</td>
                  <td className="px-4 py-3.5">{item.dm}%</td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                        item.quality === "Good"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {item.quality}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => onViewPassport(item.name)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2d6a4f] hover:text-[#1b4332] bg-[#f3f9f4] hover:bg-[#d8f3dc] px-2.5 py-1 rounded-lg border border-[#b7e4c7] transition-all"
                    >
                      <span>View Passport</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-xl">
            <h3 className="font-black text-sm text-[#1b4332]">Add Farm Feed Ingredient</h3>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Ingredient Name</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Soya De-oiled Cake"
                className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#2d6a4f]/20"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Quantity (kg)</label>
                <input
                  type="number"
                  value={newQty}
                  onChange={(e) => setNewQty(Number(e.target.value))}
                  className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Price (₹/kg)</label>
                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 rounded-xl border border-stone-200 text-xs font-bold text-stone-600 hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 py-2 rounded-xl bg-[#2d6a4f] text-white text-xs font-bold hover:bg-[#1b4332]"
              >
                Add to Basket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
