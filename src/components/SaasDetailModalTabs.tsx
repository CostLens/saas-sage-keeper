
import { SaaSData } from "@/lib/mockData";
import { UserActivityTab } from "./UserActivityTab";
import { useFeatureFlags } from "@/contexts/FeatureFlagsContext";
import { AnalyticsTab } from "./saas-detail/AnalyticsTab";
import { ContractTab } from "./saas-detail/ContractTab";

interface SaasDetailModalTabsProps {
  saas: SaaSData;
  activeTab: string;
}

export function SaasDetailModalTabs({ saas, activeTab }: SaasDetailModalTabsProps) {
  const { showUsageFeatures } = useFeatureFlags();

  switch(activeTab) {
    case "analytics":
      return <AnalyticsTab saas={saas} />;
    case "contract":
      return <ContractTab saas={saas} />;
    case "users":
      return showUsageFeatures ? <UserActivityTab saas={saas} /> : null;
    default:
      return (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Select a tab to view details</p>
        </div>
      );
  }
}
