
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
  }, []);

  const [showUsageFeatures, setShowUsageFeatures] = useState(() => {
    const savedValue = localStorage.getItem("show-usage-features");
    return savedValue !== "false"; // Default to true if null or not "false"
  });

  const [showBoardingFeatures, setShowBoardingFeatures] = useState(() => {
    const savedValue = localStorage.getItem("show-boarding-features");
    return savedValue !== "false"; // Default to true if null or not "false"
  });

  const [showNegotiationFeatures, setShowNegotiationFeatures] = useState(() => {
    const savedValue = localStorage.getItem("show-negotiation-features");
    return savedValue !== "false"; // Default to true if null or not "false"
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const usageValue = localStorage.getItem("show-usage-features");
      const boardingValue = localStorage.getItem("show-boarding-features");
      const negotiationValue = localStorage.getItem("show-negotiation-features");
      setShowUsageFeatures(usageValue !== "false");
      setShowBoardingFeatures(boardingValue !== "false");
      setShowNegotiationFeatures(negotiationValue !== "false");
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('usageFeaturesToggled', handleStorageChange);
    window.addEventListener('boardingFeaturesToggled', handleStorageChange);
    window.addEventListener('negotiationFeaturesToggled', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('usageFeaturesToggled', handleStorageChange);
      window.removeEventListener('boardingFeaturesToggled', handleStorageChange);
      window.removeEventListener('negotiationFeaturesToggled', handleStorageChange);
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
              {showUsageFeatures ? (
                <Route path="/usage" element={<Usage />} />
              ) : (
                <Route path="/usage" element={<Navigate to="/dashboard" replace />} />
              )}
              <Route path="/contracts" element={<ContractsRepository />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
              <Route path="/user-management" element={<UserManagement />} />
              {showBoardingFeatures ? (
                <Route path="/user-boarding" element={<UserBoarding />} />
              ) : (
                <Route path="/user-boarding" element={<Navigate to="/dashboard" replace />} />
              )}
              {showNegotiationFeatures ? (
                <Route path="/contract-negotiation" element={<ContractNegotiation />} />
              ) : (
                <Route path="/contract-negotiation" element={<Navigate to="/dashboard" replace />} />
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
