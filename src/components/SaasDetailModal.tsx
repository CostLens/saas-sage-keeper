
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { SaaSData } from "@/lib/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users as UsersIcon } from "lucide-react";
import { KeyInfoCards } from "./saas-detail/KeyInfoCards";
import { AnalyticsTab } from "./saas-detail/AnalyticsTab";
import { ContractTab } from "./saas-detail/ContractTab";
import { PaymentsTab } from "./saas-detail/PaymentsTab";
import { UserActivityTab } from "./UserActivityTab";

interface SaasDetailModalProps {
  saas: SaaSData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SaasDetailModal({ saas, open, onOpenChange }: SaasDetailModalProps) {
  const [showUsageFeatures, setShowUsageFeatures] = useState(false);
  
  React.useEffect(() => {
    const savedValue = localStorage.getItem("show-usage-features");
    setShowUsageFeatures(savedValue === "true");
    
    const handleStorageChange = () => {
      const savedValue = localStorage.getItem("show-usage-features");
      setShowUsageFeatures(savedValue === "true");
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('usageFeaturesToggled', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('usageFeaturesToggled', handleStorageChange);
    };
  }, []);

  if (!saas) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-auto glass-panel animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-2xl">{saas.name}</DialogTitle>
          <DialogDescription>
            View detailed information and analytics about this SaaS application.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-6 py-4">
          {/* Key Information Cards */}
          <KeyInfoCards saas={saas} />

          {/* Tabs for different data views */}
          <Tabs defaultValue="analytics" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="contract">Contract Details</TabsTrigger>
              <TabsTrigger value="payments">Payment History</TabsTrigger>
              {showUsageFeatures && <TabsTrigger value="users">Users</TabsTrigger>}
            </TabsList>
            
            <TabsContent value="analytics">
              <AnalyticsTab saas={saas} />
            </TabsContent>
            
            <TabsContent value="contract">
              <ContractTab saas={saas} />
            </TabsContent>
            
            <TabsContent value="payments">
              <PaymentsTab saas={saas} />
            </TabsContent>
            
            {showUsageFeatures && (
              <TabsContent value="users">
                <UserActivityTab saas={saas} />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
