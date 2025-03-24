
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { GeneralSettingsTab } from "./GeneralSettingsTab";
import { FeatureFlagsTab } from "./FeatureFlagsTab";
import { SubscriptionTab } from "./SubscriptionTab";
import { IntegrationsTab } from "./IntegrationsTab";
import { NotificationsTab } from "./NotificationsTab";
import { SupportTab } from "./SupportTab";

export function SettingsTabs() {
  return (
    <Tabs defaultValue="general" className="space-y-4">
      <div className="overflow-x-auto">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="features">Feature Flags</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="general" className="mt-0">
        <GeneralSettingsTab />
      </TabsContent>

      <TabsContent value="features" className="mt-0">
        <FeatureFlagsTab />
      </TabsContent>

      <TabsContent value="subscription" className="mt-0">
        <SubscriptionTab />
      </TabsContent>

      <TabsContent value="integrations" className="mt-0">
        <IntegrationsTab />
      </TabsContent>

      <TabsContent value="notifications" className="mt-0">
        <NotificationsTab />
      </TabsContent>

      <TabsContent value="support" className="mt-0">
        <SupportTab />
      </TabsContent>
    </Tabs>
  );
}
