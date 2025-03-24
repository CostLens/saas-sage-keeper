
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { GeneralSettingsTab } from "./GeneralSettingsTab";
import { FeatureFlagsTab } from "./FeatureFlagsTab";
import { SubscriptionTab } from "./SubscriptionTab";
import { IntegrationsTab } from "./IntegrationsTab";
import { NotificationsTab } from "./NotificationsTab";
import { SecurityTab } from "./SecurityTab";
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
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="general">
        <GeneralSettingsTab />
      </TabsContent>

      <TabsContent value="features">
        <FeatureFlagsTab />
      </TabsContent>

      <TabsContent value="subscription">
        <SubscriptionTab />
      </TabsContent>

      <TabsContent value="integrations">
        <IntegrationsTab />
      </TabsContent>

      <TabsContent value="notifications">
        <NotificationsTab />
      </TabsContent>

      <TabsContent value="security">
        <SecurityTab />
      </TabsContent>

      <TabsContent value="support">
        <SupportTab />
      </TabsContent>
    </Tabs>
  );
}
