
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { BookDemoModalProvider } from "@/hooks/useBookDemoModal";
import { FeatureFlagsProvider } from "@/contexts/FeatureFlagsContext";
import { AppRoutes } from "@/components/AppRoutes";
import { useThemeInitialization } from "@/hooks/useThemeInitialization";

const queryClient = new QueryClient();

const App = () => {
  // Initialize theme
  useThemeInitialization();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <FeatureFlagsProvider>
          <BrowserRouter>
            <BookDemoModalProvider>
              <AppRoutes />
            </BookDemoModalProvider>
          </BrowserRouter>
        </FeatureFlagsProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
