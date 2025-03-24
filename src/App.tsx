
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
import UserOnboarding from "./pages/UserOnboarding";

const queryClient = new QueryClient();

const App = () => {
  const [showUsageFeatures, setShowUsageFeatures] = useState(() => {
    const savedValue = localStorage.getItem("show-usage-features");
    return savedValue === "true"; // Default to false if null or anything other than "true"
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const usageValue = localStorage.getItem("show-usage-features");
      setShowUsageFeatures(usageValue === "true");
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('usageFeaturesToggled', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('usageFeaturesToggled', handleStorageChange);
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
              {showUsageFeatures ? (
                <Route path="/user-onboarding" element={<UserOnboarding />} />
              ) : (
                <Route path="/user-onboarding" element={<Navigate to="/dashboard" replace />} />
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
