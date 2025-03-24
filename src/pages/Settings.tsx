
import React from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Mail,
  DollarSign,
  Users,
  Bell,
  CreditCard,
  Shield,
  LifeBuoy,
  Flag,
} from "lucide-react";

const Settings = () => {
  const isMobile = useIsMobile();

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
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 space-y-8 animate-fade-in overflow-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          </div>

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

            <TabsContent value="general" className="space-y-6">
              {/* Personal Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Personal Details</h3>
                  <p className="text-sm text-muted-foreground">
                    Update your personal information
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="workEmail">Work Email</Label>
                    <Input
                      id="workEmail"
                      type="email"
                      defaultValue="john.doe@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="team">Team</Label>
                    <Input id="team" defaultValue="Finance" />
                  </div>
                </div>
                <Button type="submit">Save Personal Details</Button>
              </div>

              <Separator className="my-6" />

              {/* Company Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Company Details</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your company profile and information
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" defaultValue="Acme Corp" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyWebsite">Company Website</Label>
                    <Input id="companyWebsite" defaultValue="https://acme.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input id="industry" defaultValue="Technology" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue="San Francisco, CA" />
                  </div>
                </div>
                <Button type="submit">Save Company Details</Button>
              </div>
            </TabsContent>

            <TabsContent value="features" className="space-y-6">
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
            </TabsContent>

            <TabsContent value="subscription" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Details</CardTitle>
                  <CardDescription>
                    Manage your subscription and billing information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Current Plan</h4>
                        <p className="text-sm text-muted-foreground">Enterprise</p>
                      </div>
                      <Button variant="outline">Change Plan</Button>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h4 className="font-medium">Billing Information</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Next billing date</p>
                          <p className="text-sm text-muted-foreground">
                            March 1, 2024
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Amount</p>
                          <p className="text-sm text-muted-foreground">$499/month</p>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h4 className="font-medium">Payment Method</h4>
                      <div className="flex items-center space-x-4">
                        <CreditCard className="h-6 w-6" />
                        <div>
                          <p className="text-sm font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-muted-foreground">
                            Expires 12/2024
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="integrations" className="space-y-6">
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
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Manage your notification preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <Switch id="emailNotifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pushNotifications">Push Notifications</Label>
                    <Switch id="pushNotifications" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>
                    Manage your security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Change Password</h4>
                    <Button>Update Password</Button>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="support" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Support</CardTitle>
                  <CardDescription>
                    Get help and support
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Documentation</h4>
                    <p className="text-sm text-muted-foreground">
                      View our documentation to learn more about our features
                    </p>
                    <Button variant="outline">View Documentation</Button>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="font-medium">Contact Support</h4>
                    <p className="text-sm text-muted-foreground">
                      Get in touch with our support team
                    </p>
                    <Button>Contact Support</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Settings;
