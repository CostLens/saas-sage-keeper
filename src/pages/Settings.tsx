
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [name, setName] = useState("Kanav Hasija");
  const [email, setEmail] = useState("kanav.hasija@gmail.com");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [contractRenewalAlerts, setContractRenewalAlerts] = useState(true);
  const [spendAlerts, setSpendAlerts] = useState(true);
  const [showUsageFeatures, setShowUsageFeatures] = useState(true);
  const { toast } = useToast();

  // Load settings from localStorage on initial render
  useEffect(() => {
    const savedShowUsageFeatures = localStorage.getItem("show-usage-features");
    if (savedShowUsageFeatures !== null) {
      setShowUsageFeatures(savedShowUsageFeatures === "true");
    }
  }, []);

  // Save showUsageFeatures to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("show-usage-features", showUsageFeatures.toString());
    // Dispatch an event so other components can listen for the change
    window.dispatchEvent(new Event("usageFeaturesToggled"));
  }, [showUsageFeatures]);

  const handleSaveSettings = () => {
    // Save settings logic would go here
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    });
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            
            <div className="space-y-6">
              {/* Profile Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Manage your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Name</label>
                      <input 
                        type="text" 
                        placeholder="Your name"
                        className="w-full px-3 py-2 border rounded-md"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Email</label>
                      <input 
                        type="email" 
                        placeholder="Your email"
                        className="w-full px-3 py-2 border rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Feature Toggle Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Feature Settings</CardTitle>
                  <CardDescription>Control which features are visible in the application</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">Usage Features</span>
                        <p className="text-xs text-muted-foreground">
                          Show or hide usage metrics and optimization features
                        </p>
                      </div>
                      <Switch
                        checked={showUsageFeatures}
                        onCheckedChange={setShowUsageFeatures}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">Email Notifications</span>
                        <p className="text-xs text-muted-foreground">
                          Receive important alerts via email
                        </p>
                      </div>
                      <Switch
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">Contract Renewal Alerts</span>
                        <p className="text-xs text-muted-foreground">
                          Get notified before contracts are due for renewal
                        </p>
                      </div>
                      <Switch
                        checked={contractRenewalAlerts}
                        onCheckedChange={setContractRenewalAlerts}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">Spend Alerts</span>
                        <p className="text-xs text-muted-foreground">
                          Get notified about unusual spending patterns
                        </p>
                      </div>
                      <Switch
                        checked={spendAlerts}
                        onCheckedChange={setSpendAlerts}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button onClick={handleSaveSettings}>Save Changes</Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
