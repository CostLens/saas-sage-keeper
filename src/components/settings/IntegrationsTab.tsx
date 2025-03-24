
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Mail, DollarSign, Users } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export function IntegrationsTab() {
  const integrations = [
    {
      name: "Gmail",
      description: "Connect your Gmail account to import invoices and contracts.",
      connected: false,
      icon: Mail,
    },
    {
      name: "QuickBooks",
      description: "Import financial data from QuickBooks.",
      connected: true,
      icon: DollarSign,
    },
    {
      name: "Zoho People",
      description: "Import employee data from Zoho People.",
      connected: false,
      icon: Users,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Integrations</CardTitle>
        <CardDescription>
          Connect to your favorite tools and services
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {integrations.map((integration) => (
          <div
            key={integration.name}
            className="flex items-center justify-between border rounded-md p-4"
          >
            <div className="flex items-center space-x-4">
              <integration.icon className="h-5 w-5 text-muted-foreground" />
              <div>
                <h4 className="text-sm font-medium leading-none">
                  {integration.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {integration.description}
                </p>
              </div>
            </div>
            <Switch
              id={integration.name}
              defaultChecked={integration.connected}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
