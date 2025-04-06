
import React from "react";
import { FeatureFlag } from "./FeatureFlag";

interface Feature {
  id: string;
  key: string;
  title: string;
  description: string;
  checked: boolean;
}

export interface FeatureToggleListProps {
  features: { id: string; name: string; enabled: boolean }[];
  onToggle: (feature: string, enabled: boolean) => void;
}

export function FeatureToggleList({ features, onToggle }: FeatureToggleListProps) {
  return (
    <div className="space-y-4">
      {features.map(feature => (
        <FeatureFlag
          key={feature.id}
          id={feature.id}
          title={feature.name}
          description={`Controls ${feature.name} functionality`}
          checked={feature.enabled}
          onCheckedChange={(checked) => {
            onToggle(feature.id, checked);
          }}
        />
      ))}
    </div>
  );
}
