import { SaaSData } from "@/lib/mockData";
import { UserActivityTab } from "./UserActivityTab";

interface SaasDetailModalTabsProps {
  saas: SaaSData;
  activeTab: string;
}

export function SaasDetailModalTabs({ saas, activeTab }: SaasDetailModalTabsProps) {
  switch(activeTab) {
    case "users":
      return <UserActivityTab saas={saas} />;
    // Other cases remain the same
    default:
      return (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Select a tab to view details</p>
        </div>
      );
  }
}
