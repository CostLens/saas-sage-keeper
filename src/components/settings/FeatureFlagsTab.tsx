
import React, { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "@/components/ui/toggle"; 
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Moon } from "lucide-react";
import { toast } from "sonner";

export function FeatureFlagsTab() {
  // Feature flags state
  const [showUsageFeatures, setShowUsageFeatures] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem("show-usage-features");
      return savedValue !== "false";
    }
    return true;
  });
  
  const [showBoardingFeatures, setShowBoardingFeatures] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem("show-boarding-features");
      return savedValue !== "false";
    }
    return true;
  });

  const [showNegotiationFeatures, setShowNegotiationFeatures] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem("show-negotiation-features");
      return savedValue !== "false";
    }
    return true;
  });

  const [showBenchmarkingFeatures, setShowBenchmarkingFeatures] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem("show-benchmarking-features");
      return savedValue !== "false";
    }
    return true;
  });

  const [showComplianceFeatures, setShowComplianceFeatures] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem("show-compliance-features");
      return savedValue !== "false";
    }
    return true;
  });
  
  const [showWorkflowFeatures, setShowWorkflowFeatures] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem("show-workflow-features");
      return savedValue !== "false";
    }
    return true;
  });

  // Dark theme state - default to false (off)
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
    
    // Dispatch custom event for sidebar components to listen to
    const event = new CustomEvent(`${feature.replace('show-', '')}Toggled`, {
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
      <Card>
        <CardHeader>
          <CardTitle>Theme Settings</CardTitle>
          <CardDescription>
            Customize the appearance of the application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="dark-theme-toggle" className="font-medium">
                Dark Theme
              </Label>
              <p className="text-sm text-muted-foreground">
                Enable dark mode for the application
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Toggle
                pressed={darkThemeEnabled}
                onPressedChange={() => handleDarkThemeToggle(!darkThemeEnabled)}
                className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                <Moon className="h-4 w-4" />
              </Toggle>
              <Switch
                id="dark-theme-toggle"
                checked={darkThemeEnabled}
                onCheckedChange={handleDarkThemeToggle}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Feature Toggles</CardTitle>
          <CardDescription>
            Enable or disable specific features of the application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="usage-features-toggle" className="font-medium">
                Usage Analytics
              </Label>
              <p className="text-sm text-muted-foreground">
                Enables usage analytics features
              </p>
            </div>
            <Switch
              id="usage-features-toggle"
              checked={showUsageFeatures}
              onCheckedChange={(checked) => {
                setShowUsageFeatures(checked);
                handleFeatureToggle("show-usage-features", checked);
              }}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="boarding-features-toggle" className="font-medium">
                User Boarding
              </Label>
              <p className="text-sm text-muted-foreground">
                Enables user boarding features
              </p>
            </div>
            <Switch
              id="boarding-features-toggle"
              checked={showBoardingFeatures}
              onCheckedChange={(checked) => {
                setShowBoardingFeatures(checked);
                handleFeatureToggle("show-boarding-features", checked);
              }}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="negotiation-features-toggle" className="font-medium">
                Renewals & Negotiation
              </Label>
              <p className="text-sm text-muted-foreground">
                Enables contract negotiation features
              </p>
            </div>
            <Switch
              id="negotiation-features-toggle"
              checked={showNegotiationFeatures}
              onCheckedChange={(checked) => {
                setShowNegotiationFeatures(checked);
                handleFeatureToggle("show-negotiation-features", checked);
              }}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="benchmarking-features-toggle" className="font-medium">
                Benchmarking
              </Label>
              <p className="text-sm text-muted-foreground">
                Enables benchmarking features
              </p>
            </div>
            <Switch
              id="benchmarking-features-toggle"
              checked={showBenchmarkingFeatures}
              onCheckedChange={(checked) => {
                setShowBenchmarkingFeatures(checked);
                handleFeatureToggle("show-benchmarking-features", checked);
              }}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="compliance-features-toggle" className="font-medium">
                Compliance
              </Label>
              <p className="text-sm text-muted-foreground">
                Enables compliance certifications tracking
              </p>
            </div>
            <Switch
              id="compliance-features-toggle"
              checked={showComplianceFeatures}
              onCheckedChange={(checked) => {
                setShowComplianceFeatures(checked);
                handleFeatureToggle("show-compliance-features", checked);
              }}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="workflow-features-toggle" className="font-medium">
                Workflow Builder
              </Label>
              <p className="text-sm text-muted-foreground">
                Enables workflow creation and management
              </p>
            </div>
            <Switch
              id="workflow-features-toggle"
              checked={showWorkflowFeatures}
              onCheckedChange={(checked) => {
                setShowWorkflowFeatures(checked);
                handleFeatureToggle("show-workflow-features", checked);
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
