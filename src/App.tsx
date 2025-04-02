import React, { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { BookDemoModalProvider } from "@/hooks/useBookDemoModal";
import Dashboard from "./pages/Dashboard";
import SpendTrends from "./pages/SpendTrends";
import ContractsRepository from "./pages/ContractsRepository";
import AIAssistant from "./pages/AIAssistant";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import Usage from "./pages/Usage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserManagement from "./pages/UserManagement";
import UserBoarding from "./pages/UserBoarding";
import Renewals from "./pages/Renewals";
import Benchmarking from "./pages/Benchmarking";
import AppDiscovery from "./pages/AppDiscovery";
import Compliance from "./pages/Compliance";
import WorkflowBuilder from "./pages/WorkflowBuilder";
import DuplicateAppComparison from "./pages/DuplicateAppComparison";
import ContractNegotiation from "./pages/ContractNegotiation";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    if (localStorage.getItem("show-usage-features") === null) {
      localStorage.setItem("show-usage-features", "true");
    }
    if (localStorage.getItem("show-boarding-features") === null) {
      localStorage.setItem("show-boarding-features", "true");
    }
    if (localStorage.getItem("show-negotiation-features") === null) {
      localStorage.setItem("show-negotiation-features", "true");
    }
    if (localStorage.getItem("show-benchmarking-features") === null) {
      localStorage.setItem("show-benchmarking-features", "true");
    }
    if (localStorage.getItem("show-compliance-features") === null) {
      localStorage.setItem("show-compliance-features", "true");
    }
    if (localStorage.getItem("show-workflow-features") === null) {
      localStorage.setItem("show-workflow-features", "true");
    }
    if (localStorage.getItem("show-duplicate-app-features") === null) {
      localStorage.setItem("show-duplicate-app-features", "true");
    }
    if (localStorage.getItem("show-copilot-features") === null) {
      localStorage.setItem("show-copilot-features", "true");
    }
    if (localStorage.getItem("dark-theme-enabled") === null) {
      localStorage.setItem("dark-theme-enabled", "false");
    }
    
    const darkThemeEnabled = localStorage.getItem("dark-theme-enabled") === "true";
    if (darkThemeEnabled) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const [showUsageFeatures, setShowUsageFeatures] = useState(() => {
    const savedValue = localStorage.getItem("show-usage-features");
    return savedValue !== "false";
  });

  const [showBoardingFeatures, setShowBoardingFeatures] = useState(() => {
    const savedValue = localStorage.getItem("show-boarding-features");
    return savedValue !== "false";
  });

  const [showNegotiationFeatures, setShowNegotiationFeatures] = useState(() => {
    const savedValue = localStorage.getItem("show-negotiation-features");
    return savedValue !== "false";
  });

  const [showBenchmarkingFeatures, setShowBenchmarkingFeatures] = useState(() => {
    const savedValue = localStorage.getItem("show-benchmarking-features");
    return savedValue !== "false";
  });

  const [showComplianceFeatures, setShowComplianceFeatures] = useState(() => {
    const savedValue = localStorage.getItem("show-compliance-features");
    return savedValue !== "false";
  });

  const [showWorkflowFeatures, setShowWorkflowFeatures] = useState(() => {
    const savedValue = localStorage.getItem("show-workflow-features");
    return savedValue !== "false";
  });

  const [showDuplicateAppFeatures, setShowDuplicateAppFeatures] = useState(() => {
    const savedValue = localStorage.getItem("show-duplicate-app-features");
    return savedValue !== "false";
  });

  const [showCopilotFeatures, setShowCopilotFeatures] = useState(() => {
    const savedValue = localStorage.getItem("show-copilot-features");
    return savedValue !== "false";
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const usageValue = localStorage.getItem("show-usage-features");
      const boardingValue = localStorage.getItem("show-boarding-features");
      const negotiationValue = localStorage.getItem("show-negotiation-features");
      const benchmarkingValue = localStorage.getItem("show-benchmarking-features");
      const complianceValue = localStorage.getItem("show-compliance-features");
      const workflowValue = localStorage.getItem("show-workflow-features");
      const duplicateAppValue = localStorage.getItem("show-duplicate-app-features");
      const copilotValue = localStorage.getItem("show-copilot-features");
      
      setShowUsageFeatures(usageValue !== "false");
      setShowBoardingFeatures(boardingValue !== "false");
      setShowNegotiationFeatures(negotiationValue !== "false");
      setShowBenchmarkingFeatures(benchmarkingValue !== "false");
      setShowComplianceFeatures(complianceValue !== "false");
      setShowWorkflowFeatures(workflowValue !== "false");
      setShowDuplicateAppFeatures(duplicateAppValue !== "false");
      setShowCopilotFeatures(copilotValue !== "false");
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('usageFeaturesToggled', handleStorageChange);
    window.addEventListener('boardingFeaturesToggled', handleStorageChange);
    window.addEventListener('negotiationFeaturesToggled', handleStorageChange);
    window.addEventListener('benchmarkingFeaturesToggled', handleStorageChange);
    window.addEventListener('complianceFeaturesToggled', handleStorageChange);
    window.addEventListener('workflowFeaturesToggled', handleStorageChange);
    window.addEventListener('duplicateAppFeaturesToggled', handleStorageChange);
    window.addEventListener('copilotFeaturesToggled', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('usageFeaturesToggled', handleStorageChange);
      window.removeEventListener('boardingFeaturesToggled', handleStorageChange);
      window.removeEventListener('negotiationFeaturesToggled', handleStorageChange);
      window.removeEventListener('benchmarkingFeaturesToggled', handleStorageChange);
      window.removeEventListener('complianceFeaturesToggled', handleStorageChange);
      window.removeEventListener('workflowFeaturesToggled', handleStorageChange);
      window.removeEventListener('duplicateAppFeaturesToggled', handleStorageChange);
      window.removeEventListener('copilotFeaturesToggled', handleStorageChange);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <BookDemoModalProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/spend-trends" element={<SpendTrends />} />
              <Route path="/app-discovery" element={<AppDiscovery />} />
              {showUsageFeatures ? (
                <Route path="/usage" element={<Usage />} />
              ) : (
                <Route path="/usage" element={<Navigate to="/dashboard" replace />} />
              )}
              <Route path="/contracts" element={<ContractsRepository />} />
              {showCopilotFeatures ? (
                <Route path="/ai-assistant" element={<AIAssistant />} />
              ) : (
                <Route path="/ai-assistant" element={<Navigate to="/dashboard" replace />} />
              )}
              {showDuplicateAppFeatures ? (
                <Route path="/duplicate-app-comparison" element={<DuplicateAppComparison />} />
              ) : (
                <Route path="/duplicate-app-comparison" element={<Navigate to="/dashboard" replace />} />
              )}
              <Route path="/contract-negotiation" element={<ContractNegotiation />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
              <Route path="/user-management" element={<UserManagement />} />
              {showBoardingFeatures ? (
                <Route path="/user-boarding" element={<UserBoarding />} />
              ) : (
                <Route path="/user-boarding" element={<Navigate to="/dashboard" replace />} />
              )}
              {showNegotiationFeatures ? (
                <Route path="/renewals" element={<Renewals />} />
              ) : (
                <Route path="/renewals" element={<Navigate to="/dashboard" replace />} />
              )}
              {showBenchmarkingFeatures ? (
                <Route path="/benchmarking" element={<Benchmarking />} />
              ) : (
                <Route path="/benchmarking" element={<Navigate to="/dashboard" replace />} />
              )}
              {showComplianceFeatures ? (
                <Route path="/compliance" element={<Compliance />} />
              ) : (
                <Route path="/compliance" element={<Navigate to="/dashboard" replace />} />
              )}
              {showWorkflowFeatures ? (
                <Route path="/workflow-builder" element={<WorkflowBuilder />} />
              ) : (
                <Route path="/workflow-builder" element={<Navigate to="/dashboard" replace />} />
              )}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BookDemoModalProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
