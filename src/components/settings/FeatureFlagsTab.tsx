
import React from "react";
import { ThemeToggleSection } from "./feature-flags/ThemeToggleSection";
import { FeatureFlagsSection } from "./feature-flags/FeatureFlagsSection";

export function FeatureFlagsTab() {
  return (
    <div className="space-y-6">
      <ThemeToggleSection />
      <FeatureFlagsSection />
    </div>
  );
}
