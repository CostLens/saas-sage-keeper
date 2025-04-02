
import React, { useState } from "react";
import { ShadowITHeader } from "./ShadowITHeader";
import { ShadowITStatusCards } from "./ShadowITStatusCards";
import { ShadowITTable } from "./ShadowITTable";
import { SaasDetailModal } from "@/components/SaasDetailModal";
import { SaaSData } from "@/lib/mockData";
import { useShadowITData } from "@/hooks/useShadowITData";

export function ShadowITContent() {
  const { shadowITApps, isLoading } = useShadowITData();
  const [selectedSaas, setSelectedSaas] = useState<SaaSData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (saas: SaaSData) => {
    setSelectedSaas(saas);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <ShadowITHeader />
      
      <ShadowITStatusCards 
        total={shadowITApps.length} 
        unmanaged={shadowITApps.filter(app => app.category === "Unmanaged").length}
        risky={shadowITApps.filter(app => app.riskLevel === "High").length}
      />
      
      <ShadowITTable 
        data={shadowITApps} 
        isLoading={isLoading} 
        onRowClick={handleRowClick}
      />
      
      <SaasDetailModal
        saas={selectedSaas}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
}
