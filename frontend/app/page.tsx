"use client";

import React, { useState, useEffect, useCallback } from "react";
import { LandingPage } from "../components/LandingPage";
import { AuthScreens } from "../components/AuthScreens";
import { AppSidebar } from "../components/AppSidebar";
import { AppHeader } from "../components/AppHeader";
import { Dashboard } from "../components/Dashboard";
import { TestFeedSelection } from "../components/TestFeedSelection";
import { FeedScanSampling } from "../components/FeedScanSampling";
import { AnalysisProgressEvidence } from "../components/AnalysisProgressEvidence";
import { FeedAnalysisResults } from "../components/FeedAnalysisResults";
import { ContaminantSafety } from "../components/ContaminantSafety";
import { LiveFeedZone } from "../components/LiveFeedZone";
import { SilageAnalysisScreen } from "../components/SilageAnalysisScreen";
import { DairyProfileScreen } from "../components/DairyProfileScreen";
import { FeedBasketScreen } from "../components/FeedBasketScreen";
import { RationAdvisoryOptimizer } from "../components/RationAdvisoryOptimizer";
import { QualityPassportTraceability } from "../components/QualityPassportTraceability";
import { ReportsHistoryScreen } from "../components/ReportsHistoryScreen";
import { DevicesDataHealth } from "../components/DevicesDataHealth";
import { ProfileSettingsScreen } from "../components/ProfileSettingsScreen";
import { CooperativeView } from "../components/CooperativeView";
import { WhatsAppShareModal } from "../components/WhatsAppShareModal";
import { Language } from "../lib/dictionary";
import { analyzeBatch, BatchAnalyzeResponse } from "../lib/api";

export default function Home() {
  const [lang, setLang] = useState<Language>("en");
  const [activeScreen, setActiveScreen] = useState<string>("landing");
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [farmerMode, setFarmerMode] = useState<boolean>(false);
  const [activeRole, setActiveRole] = useState<"farm" | "cooperative">("farm");
  const [selectedFeedType, setSelectedFeedType] = useState<string>("Maize Silage");
  const [batchId, setBatchId] = useState<string>("MS-2026-0012");
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [analysisData, setAnalysisData] = useState<BatchAnalyzeResponse | null>(null);

  // Load backend baseline analysis for live metrics
  const loadBatchAnalysis = useCallback(async (feed: string) => {
    try {
      const res = await analyzeBatch(feed as any, "healthy");
      setAnalysisData(res);
      if (res.batch_id) setBatchId(res.batch_id);
    } catch (err) {
      console.warn("Using offline verified baseline dataset for demo:", err);
    }
  }, []);

  useEffect(() => {
    void loadBatchAnalysis("Maize Silage");
  }, [loadBatchAnalysis]);

  // Public Screens (1: Landing, 2: Login, 3: Sign Up)
  if (activeScreen === "landing") {
    return (
      <LandingPage
        lang={lang}
        onEnterApp={(target) => {
          if (target === "login") {
            setAuthMode("login");
            setActiveScreen("login");
          } else if (target === "signup") {
            setAuthMode("signup");
            setActiveScreen("signup");
          } else {
            setActiveScreen("dashboard");
          }
        }}
        onSelectLang={setLang}
      />
    );
  }

  if (activeScreen === "login" || activeScreen === "signup") {
    return (
      <AuthScreens
        mode={authMode}
        setMode={setAuthMode}
        onSuccess={() => setActiveScreen("dashboard")}
        onBackToHome={() => setActiveScreen("landing")}
        lang={lang}
      />
    );
  }

  // Farmer Application Layout (Screens 4 to 18)
  return (
    <div className="flex h-screen bg-[#faf8f5] text-[#1a1e1b] overflow-hidden font-sans">
      {/* 1. Sidebar Navigation */}
      <AppSidebar
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
        lang={lang}
        onLogout={() => setActiveScreen("landing")}
      />

      {/* 2. Main Content Area + Top Header */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AppHeader
          lang={lang}
          setLang={setLang}
          activeScreen={activeScreen}
          setActiveScreen={setActiveScreen}
          farmerMode={farmerMode}
          setFarmerMode={setFarmerMode}
          activeRole={activeRole}
          setActiveRole={setActiveRole}
          dairySummary={{ lactating: 12, dry: 3, calves: 2, milkYield: 10.5 }}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
          {/* Screen 4: Farm Command Center Dashboard */}
          {activeScreen === "dashboard" && (
            <Dashboard
              onNavigate={(screen) => setActiveScreen(screen)}
              lang={lang}
              onOpenShareModal={() => setIsShareModalOpen(true)}
              farmerMode={farmerMode}
            />
          )}

          {/* Screen 5: Test Feed - Selection */}
          {activeScreen === "test-selection" && (
            <TestFeedSelection
              onStartScan={(feed) => {
                setSelectedFeedType(feed);
                setActiveScreen("test-scan");
              }}
              lang={lang}
            />
          )}

          {/* Screen 6: Test Feed - 5-Point Core Scan & Spatial Map */}
          {activeScreen === "test-scan" && (
            <FeedScanSampling
              feedType={selectedFeedType}
              onProceedToEvidence={() => setActiveScreen("test-analysis")}
              onBack={() => setActiveScreen("test-selection")}
              lang={lang}
            />
          )}

          {/* Screen 7: Test Feed - Evidence Contract Engine */}
          {activeScreen === "test-analysis" && (
            <AnalysisProgressEvidence
              feedType={selectedFeedType}
              batchId={batchId}
              onProceedToResults={() => setActiveScreen("test-results")}
              onBack={() => setActiveScreen("test-scan")}
              lang={lang}
            />
          )}

          {/* Screen 8: Test Feed - Results */}
          {activeScreen === "test-results" && (
            <FeedAnalysisResults
              feedType={selectedFeedType}
              batchId={batchId}
              onProceedToContaminants={() => setActiveScreen("contaminants")}
              onProceedToRation={() => setActiveScreen("ration")}
              onBack={() => setActiveScreen("test-analysis")}
              lang={lang}
            />
          )}

          {/* Screen 9: Contaminant & Safety Check */}
          {activeScreen === "contaminants" && (
            <ContaminantSafety
              feedType={selectedFeedType}
              batchId={batchId}
              onProceedToRation={() => setActiveScreen("ration")}
              onBack={() => setActiveScreen("test-results")}
              lang={lang}
            />
          )}

          {/* Screen 10: Live Feed Zone Monitoring */}
          {activeScreen === "live-zone" && (
            <LiveFeedZone
              onRetest={() => {
                setSelectedFeedType("Maize Silage");
                setActiveScreen("test-scan");
              }}
              lang={lang}
            />
          )}

          {/* Screen 11: Silage Analysis & Fermentation */}
          {activeScreen === "silage" && (
            <SilageAnalysisScreen
              onProceedToPassport={() => setActiveScreen("passport")}
              lang={lang}
            />
          )}

          {/* Screen 12: Dairy Nutrition Profile */}
          {activeScreen === "dairy-profile" && (
            <DairyProfileScreen
              onProceedToBasket={() => setActiveScreen("feed-basket")}
              lang={lang}
            />
          )}

          {/* Screen 13: Feed Basket Management */}
          {activeScreen === "feed-basket" && (
            <FeedBasketScreen
              onProceedToRation={() => setActiveScreen("ration")}
              onViewPassport={(name) => {
                setSelectedFeedType(name);
                setActiveScreen("passport");
              }}
              lang={lang}
            />
          )}

          {/* Screen 14: Ration Advisory + Optimizer */}
          {activeScreen === "ration" && (
            <RationAdvisoryOptimizer
              onProceedToPassport={() => setActiveScreen("passport")}
              onBack={() => setActiveScreen("feed-basket")}
              lang={lang}
            />
          )}

          {/* Screen 15: Quality Passport & Traceability */}
          {activeScreen === "passport" && (
            <QualityPassportTraceability
              batchId={batchId}
              feedType={selectedFeedType}
              lang={lang}
            />
          )}

          {/* Screen 16: Reports & History */}
          {activeScreen === "reports" && (
            <ReportsHistoryScreen
              onViewBatch={(id) => {
                setBatchId(id);
                setActiveScreen("test-results");
              }}
              lang={lang}
            />
          )}

          {/* Cooperative Ecosystem Surveillance View */}
          {activeScreen === "cooperative" && <CooperativeView lang={lang} />}

          {/* Screen 17: Devices & Hardware Data Health */}
          {activeScreen === "devices" && <DevicesDataHealth lang={lang} />}

          {/* Screen 18: Profile & Settings */}
          {activeScreen === "settings" && (
            <ProfileSettingsScreen
              lang={lang}
              setLang={setLang}
              onLogout={() => setActiveScreen("landing")}
            />
          )}
        </main>
      </div>

      {/* WhatsApp Verified Quality Report Modal */}
      {isShareModalOpen && analysisData && (
        <WhatsAppShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          data={analysisData}
          lang={lang}
        />
      )}
    </div>
  );
}
