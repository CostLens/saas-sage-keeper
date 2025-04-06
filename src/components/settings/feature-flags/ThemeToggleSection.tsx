
import React, { useEffect } from "react";
import { toast } from "sonner";
import { ThemeCard } from "./ThemeCard";
import { useFeatureFlagState } from "@/hooks/useFeatureFlagState";

export function ThemeToggleSection() {
  // Dark theme state
  const [darkThemeEnabled, setDarkThemeEnabled] = useFeatureFlagState("dark-theme-enabled");

  // Set dark theme class on document when theme preference changes
  useEffect(() => {
    if (darkThemeEnabled) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkThemeEnabled]);

  // Handle dark theme toggle
  const handleDarkThemeToggle = (enabled: boolean) => {
    setDarkThemeEnabled(enabled);
    toast.success(`${enabled ? 'Enabled' : 'Disabled'} dark theme`);
  };

  return (
    <ThemeCard 
      darkThemeEnabled={darkThemeEnabled}
      onThemeToggle={handleDarkThemeToggle}
    />
  );
}
