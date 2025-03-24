
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { TabNavigation } from "./TabNavigation";
import { GeneralSettingsTab } from "./GeneralSettingsTab";
import { FeatureFlagsTab } from "./FeatureFlagsTab";
import { SubscriptionTab } from "./SubscriptionTab";
import { IntegrationsTab } from "./IntegrationsTab";
import { NotificationsTab } from "./NotificationsTab";
import { SupportTab } from "./SupportTab";
import { useIsMobile } from "@/hooks/use-mobile";

export function SettingsTabs() {
  const [activeTab, setActiveTab] = useState("general");
  const isMobile = useIsMobile();

  // Handle URL hash for direct linking to tabs
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && ['general', 'features', 'subscription', 'integrations', 'notifications', 'support'].includes(hash)) {
      setActiveTab(hash);
    }

    const handleHashChange = () => {
      const newHash = window.location.hash.replace('#', '');
      if (newHash && ['general', 'features', 'subscription', 'integrations', 'notifications', 'support'].includes(newHash)) {
        setActiveTab(newHash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    window.location.hash = value;
  };

  return (
    <Tabs 
      value={activeTab} 
      onValueChange={handleTabChange}
      className="space-y-4"
    >
      <TabNavigation />

      <TabsContent value="general" className="mt-0 animate-fade-in">
        <GeneralSettingsTab />
      </TabsContent>

      <TabsContent value="features" className="mt-0 animate-fade-in">
        <FeatureFlagsTab />
      </TabsContent>

      <TabsContent value="subscription" className="mt-0 animate-fade-in">
        <SubscriptionTab />
      </TabsContent>

      <TabsContent value="integrations" className="mt-0 animate-fade-in">
        <IntegrationsTab />
      </TabsContent>

      <TabsContent value="notifications" className="mt-0 animate-fade-in">
        <NotificationsTab />
      </TabsContent>

      <TabsContent value="support" className="mt-0 animate-fade-in">
        <SupportTab />
      </TabsContent>
    </Tabs>
  );
}
