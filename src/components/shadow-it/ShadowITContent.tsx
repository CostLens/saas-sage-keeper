
import React from "react";
import { ShadowITHeader } from "./ShadowITHeader";
import { ShadowITStatusCards } from "./ShadowITStatusCards";
import { ShadowITTable } from "./ShadowITTable";
import { useShadowITData } from "@/hooks/useShadowITData";

export function ShadowITContent() {
  const { shadowITData, loading } = useShadowITData();
  
  return (
    <div className="space-y-6">
      <ShadowITHeader totalRiskyApps={shadowITData.filter(app => app.riskLevel === "High").length} />
      <ShadowITStatusCards shadowITData={shadowITData} />
      <ShadowITTable shadowITData={shadowITData} loading={loading} />
    </div>
  );
}
