
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { ThemeCard } from "./feature-flags/ThemeCard";
import { FeatureFlagsCard } from "./feature-flags/FeatureFlagsCard";

export function FeatureFlagsTab() {
  // Feature flags state - initialize all to false by default
  const [showUsageFeatures, setShowUsageFeatures] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem("show-usage-features");
      return savedValue === "true"; // Default to false if not "true"
    }
    return false;
  });
  
  const [showBoardingFeatures, setShowBoardingFeatures] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem("show-boarding-features");
      return savedValue === "true"; // Default to false if not "true"
    }
    return false;
  });

  const [showNegotiationFeatures, setShowNegotiationFeatures] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem("show-negotiation-features");
      return savedValue === "true"; // Default to false if not "true"
    }
    return false;
  });

  const [showBenchmarkingFeatures, setShowBenchmarkingFeatures] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem("show-benchmarking-features");
      return savedValue === "true"; // Default to false if not "true"
    }
    return false;
  });

  const [showComplianceFeatures, setShowComplianceFeatures] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem("show-compliance-features");
      return savedValue === "true"; // Default to false if not "true"
    }
    return false;
  });
  
  const [showWorkflowFeatures, setShowWorkflowFeatures] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem("show-workflow-features");
      return savedValue === "true"; // Default to false if not "true"
    }
    return false;
  });
  
  const [showDuplicateAppFeatures, setShowDuplicateAppFeatures] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem("show-duplicate-app-features");
      return savedValue === "true"; // Default to false if not "true" 
    }
    return false;
  });
  
  const [showCopilotFeatures, setShowCopilotFeatures] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem("show-copilot-features");
      return savedValue === "true"; // Default to false if not "true"
    }
    return false;
  });
  
  const [showProcurementFeatures, setShowProcurementFeatures] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem("show-procurement-features");
      return savedValue === "true"; // Default to false if not "true"
    }
    return false;
  });
  
  const [showShadowITFeatures, setShowShadowITFeatures] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem("show-shadow-it-features");
      return savedValue === "true"; // Default to false if not "true"
    }
    return false;
  });

  // Dark theme state
  const [darkThemeEnabled, setDarkThemeEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem("dark-theme-enabled");
      return savedValue === "true";
    }
    return false;
  });

  // Set dark theme class on document when theme preference changes
  useEffect(() => {
    if (darkThemeEnabled) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkThemeEnabled]);

  // Handle feature flag toggle
  const handleFeatureToggle = (feature: string, enabled: boolean) => {
    localStorage.setItem(feature, enabled.toString());
    
    // Update state based on the feature toggled
    switch (feature) {
      case "show-usage-features":
        setShowUsageFeatures(enabled);
        break;
      case "show-boarding-features":
        setShowBoardingFeatures(enabled);
        break;
      case "show-negotiation-features":
        setShowNegotiationFeatures(enabled);
        break;
      case "show-benchmarking-features":
        setShowBenchmarkingFeatures(enabled);
        break;
      case "show-compliance-features":
        setShowComplianceFeatures(enabled);
        break;
      case "show-workflow-features":
        setShowWorkflowFeatures(enabled);
        break;
      case "show-duplicate-app-features":
        setShowDuplicateAppFeatures(enabled);
        break;
      case "show-copilot-features":
        setShowCopilotFeatures(enabled);
        break;
      case "show-procurement-features":
        setShowProcurementFeatures(enabled);
        break;
      case "show-shadow-it-features":
        setShowShadowITFeatures(enabled);
        break;
    }
    
    // Dispatch custom event for sidebar components to listen to
    const event = new CustomEvent(`${feature.replace('show-', '').replace('-features', '')}Toggled`, {
      detail: { enabled }
    });
    window.dispatchEvent(event);
    
    toast.success(`${enabled ? 'Enabled' : 'Disabled'} ${feature.replace('show-', '').replace('-features', '')}`);
  };

  // Handle dark theme toggle
  const handleDarkThemeToggle = (enabled: boolean) => {
    localStorage.setItem("dark-theme-enabled", enabled.toString());
    setDarkThemeEnabled(enabled);
    toast.success(`${enabled ? 'Enabled' : 'Disabled'} dark theme`);
  };

  return (
    <div className="space-y-6">
      <ThemeCard 
        darkThemeEnabled={darkThemeEnabled}
        onThemeToggle={handleDarkThemeToggle}
      />
      
      <FeatureFlagsCard 
        showUsageFeatures={showUsageFeatures}
        showBoardingFeatures={showBoardingFeatures}
        showNegotiationFeatures={showNegotiationFeatures}
        showBenchmarkingFeatures={showBenchmarkingFeatures}
        showComplianceFeatures={showComplianceFeatures}
        showWorkflowFeatures={showWorkflowFeatures}
        showDuplicateAppFeatures={showDuplicateAppFeatures}
        showCopilotFeatures={showCopilotFeatures}
        showProcurementFeatures={showProcurementFeatures}
        showShadowITFeatures={showShadowITFeatures}
        onFeatureToggle={handleFeatureToggle}
      />
    </div>
  );
}
