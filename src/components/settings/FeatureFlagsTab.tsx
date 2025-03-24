
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export function FeatureFlagsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Flags</CardTitle>
        <CardDescription>
          Enable or disable specific features
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between space-x-2">
          <div className="space-y-0.5">
            <Label htmlFor="usageFeatures">Usage Analytics</Label>
            <p className="text-sm text-muted-foreground">
              Enable detailed usage analytics and reporting
            </p>
          </div>
          <Switch
            id="usageFeatures"
            defaultChecked={localStorage.getItem("show-usage-features") === "true"}
            onCheckedChange={(checked) => {
              localStorage.setItem("show-usage-features", checked.toString());
              window.dispatchEvent(new Event("usageFeaturesToggled"));
            }}
          />
        </div>
        <Separator />
        <div className="flex items-center justify-between space-x-2">
          <div className="space-y-0.5">
            <Label htmlFor="boardingFeatures">User Boarding</Label>
            <p className="text-sm text-muted-foreground">
              Enable user onboarding and offboarding automation
            </p>
          </div>
          <Switch
            id="boardingFeatures"
            defaultChecked={localStorage.getItem("show-boarding-features") === "true"}
            onCheckedChange={(checked) => {
              localStorage.setItem("show-boarding-features", checked.toString());
              window.dispatchEvent(new Event("boardingFeaturesToggled"));
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
