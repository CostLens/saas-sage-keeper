
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { SaaSData } from "@/lib/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KeyInfoCards } from "./saas-detail/KeyInfoCards";
import { AnalyticsTab } from "./saas-detail/AnalyticsTab";
import { ContractTab } from "./saas-detail/ContractTab";
import { UserActivityTab } from "./UserActivityTab";

interface SaasDetailModalProps {
  saas: SaaSData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SaasDetailModal({ saas, open, onOpenChange }: SaasDetailModalProps) {
  const [showUsageFeatures, setShowUsageFeatures] = useState(false);
  
  useEffect(() => {
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
            <TabsList className={`${showUsageFeatures ? 'grid grid-cols-3' : 'grid grid-cols-2 justify-center mx-auto'} mb-6`}>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="contract">Contract Details</TabsTrigger>
              {showUsageFeatures && <TabsTrigger value="users">Users</TabsTrigger>}
            </TabsList>
            
            <TabsContent value="analytics" className={`${!showUsageFeatures && 'flex justify-center'}`}>
              <AnalyticsTab saas={saas} />
            </TabsContent>
            
            <TabsContent value="contract" className={`${!showUsageFeatures && 'flex justify-center'}`}>
              <ContractTab saas={saas} />
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
