
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { TabNavigation } from "./TabNavigation";
import { GeneralSettingsTab } from "./GeneralSettingsTab";
import { FeatureFlagsTab } from "./FeatureFlagsTab";
import { SubscriptionTab } from "./SubscriptionTab";
import { IntegrationsTab } from "./IntegrationsTab";
import { NotificationsTab } from "./NotificationsTab";
import { SupportTab } from "./SupportTab";
import { UserManagementTab } from "./UserManagementTab";

export function SettingsTabs() {
  const [activeTab, setActiveTab] = useState("general");

  // Handle URL hash for direct linking to tabs
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && ['general', 'features', 'subscription', 'integrations', 'notifications', 'users', 'support'].includes(hash)) {
      setActiveTab(hash);
    }

    const handleHashChange = () => {
      const newHash = window.location.hash.replace('#', '');
      if (newHash && ['general', 'features', 'subscription', 'integrations', 'notifications', 'users', 'support'].includes(newHash)) {
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
      className="space-y-4 md:space-y-6 w-full"
    >
      <div className="border-b sticky top-0 bg-background z-10 pb-0">
        <TabNavigation />
      </div>

      <div className="pt-2 w-full">
        <TabsContent value="general" className="mt-0 animate-fade-in w-full">
          <GeneralSettingsTab />
        </TabsContent>

        <TabsContent value="features" className="mt-0 animate-fade-in w-full">
          <FeatureFlagsTab />
        </TabsContent>

        <TabsContent value="subscription" className="mt-0 animate-fade-in w-full">
          <SubscriptionTab />
        </TabsContent>

        <TabsContent value="integrations" className="mt-0 animate-fade-in w-full">
          <IntegrationsTab />
        </TabsContent>

        <TabsContent value="notifications" className="mt-0 animate-fade-in w-full">
          <NotificationsTab />
        </TabsContent>

        <TabsContent value="users" className="mt-0 animate-fade-in w-full">
          <UserManagementTab />
        </TabsContent>

        <TabsContent value="support" className="mt-0 animate-fade-in w-full">
          <SupportTab />
        </TabsContent>
      </div>
    </Tabs>
  );
}
