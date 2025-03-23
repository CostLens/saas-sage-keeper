
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Settings = () => {
  const [name, setName] = useState("Kanav Hasija");
  const [email, setEmail] = useState("kanav.hasija@gmail.com");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [contractRenewalAlerts, setContractRenewalAlerts] = useState(true);
  const [spendAlerts, setSpendAlerts] = useState(true);
  const [showUsageFeatures, setShowUsageFeatures] = useState(() => {
    return localStorage.getItem("show-usage-features") === "true";
  });
  const [gmailConnected, setGmailConnected] = useState(false);
  const [quickbooksConnected, setQuickbooksConnected] = useState(false);
  const [gmailDialogOpen, setGmailDialogOpen] = useState(false);
  const [quickbooksDialogOpen, setQuickbooksDialogOpen] = useState(false);
  const [gmailEmail, setGmailEmail] = useState("");
  const [gmailPassword, setGmailPassword] = useState("");
  const [quickbooksUsername, setQuickbooksUsername] = useState("");
  const [quickbooksPassword, setQuickbooksPassword] = useState("");
  const { toast } = useToast();

  // Track sidebar collapsed state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });
  
  // Listen for sidebar state changes
  useEffect(() => {
    const handleSidebarChange = (event: CustomEvent) => {
      setIsSidebarCollapsed(event.detail.isCollapsed);
    };
    
    window.addEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    
    return () => {
      window.removeEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    };
  }, []);

  useEffect(() => {
    const savedShowUsageFeatures = localStorage.getItem("show-usage-features");
    if (savedShowUsageFeatures !== null) {
      setShowUsageFeatures(savedShowUsageFeatures === "true");
    }
    
    const savedGmailConnected = localStorage.getItem("gmail-connected");
    if (savedGmailConnected !== null) {
      setGmailConnected(savedGmailConnected === "true");
    }
    
    const savedQuickbooksConnected = localStorage.getItem("quickbooks-connected");
    if (savedQuickbooksConnected !== null) {
      setQuickbooksConnected(savedQuickbooksConnected === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("show-usage-features", showUsageFeatures.toString());
    window.dispatchEvent(new Event("usageFeaturesToggled"));
  }, [showUsageFeatures]);
  
  useEffect(() => {
    localStorage.setItem("gmail-connected", gmailConnected.toString());
  }, [gmailConnected]);
  
  useEffect(() => {
    localStorage.setItem("quickbooks-connected", quickbooksConnected.toString());
  }, [quickbooksConnected]);

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    });
  };
  
  const handleConnectGmail = () => {
    setGmailDialogOpen(true);
  };
  
  const handleGmailLogin = () => {
    setGmailDialogOpen(false);
    setGmailConnected(true);
    toast({
      title: "Gmail connected",
      description: "Your Gmail account has been connected successfully.",
    });
  };
  
  const handleDisconnectGmail = () => {
    setGmailConnected(false);
    toast({
      title: "Gmail disconnected",
      description: "Your Gmail account has been disconnected.",
    });
  };
  
  const handleConnectQuickbooks = () => {
    setQuickbooksDialogOpen(true);
  };
  
  const handleQuickbooksLogin = () => {
    setQuickbooksDialogOpen(false);
    setQuickbooksConnected(true);
    toast({
      title: "QuickBooks connected",
      description: "Your QuickBooks account has been connected successfully.",
    });
  };
  
  const handleDisconnectQuickbooks = () => {
    setQuickbooksConnected(false);
    toast({
      title: "QuickBooks disconnected",
      description: "Your QuickBooks account has been disconnected.",
    });
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className={`flex-1 flex flex-col ${isSidebarCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            
            <div className="space-y-6">
              {/* Profile Settings Card */}
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

              {/* Integrations Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Integrations</CardTitle>
                  <CardDescription>Connect with other applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">Gmail</h3>
                          <p className="text-xs text-muted-foreground">
                            {gmailConnected 
                              ? "Connected to Gmail" 
                              : "Connect to import contract emails and notifications"}
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant={gmailConnected ? "outline" : "default"}
                        onClick={gmailConnected ? handleDisconnectGmail : handleConnectGmail}
                        size="sm"
                      >
                        {gmailConnected ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-green-100 flex items-center justify-center">
                          <svg className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.3 2.9c-.5-.3-1.3-.3-2.2 0l-6.8 2.3V2.7c0-.7-.6-1.3-1.3-1.3h-4.5c-.7 0-1.3.6-1.3 1.3v4.6L1.7 9.9C.6 10.3 0 11.3 0 12.5v9c0 1.4 1.1 2.5 2.5 2.5h19c1.4 0 2.5-1.1 2.5-2.5v-16c0-.9-.7-1.8-1.7-2.6zm-14-1.5h6v5.5l-6-2.1V1.4zm10.2 21.1H5.5v-7.1l6.5 3.2 6.5-3.2v7.1zm1.3-9.5L12 16.5 4.2 13c-.8-.4-.8-1.5 0-1.9l6.4-2.9 7.4-2.5c.8-.3 1.5.2 1.5 1 0 .6-.3 1.1-.9 1.4l-7.9 2.7-3.4 1.5 7.9 3.5 7.9-3.5c.1-.1.2-.1.2-.2v-.5c0-.7-.7-1.3-1.5-1l-.9.3-.1-1.1 1-.3c1.5-.5 3.1.2 3.1 1.8v.7c0 .9-.7 1.8-1.8 2.3z"/>
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">QuickBooks</h3>
                          <p className="text-xs text-muted-foreground">
                            {quickbooksConnected 
                              ? "Connected to QuickBooks" 
                              : "Connect to import accounting data and expenses"}
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant={quickbooksConnected ? "outline" : "default"}
                        onClick={quickbooksConnected ? handleDisconnectQuickbooks : handleConnectQuickbooks}
                        size="sm"
                      >
                        {quickbooksConnected ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Feature Settings Card */}
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

              {/* Notification Settings Card */}
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

      {/* Gmail Login Dialog */}
      <Dialog open={gmailDialogOpen} onOpenChange={setGmailDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Connect to Gmail</DialogTitle>
            <DialogDescription>
              Enter your Gmail credentials to connect your account
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="gmail-email">Email</Label>
              <Input
                id="gmail-email"
                value={gmailEmail}
                onChange={(e) => setGmailEmail(e.target.value)}
                placeholder="your.email@gmail.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gmail-password">Password</Label>
              <Input
                id="gmail-password"
                type="password"
                value={gmailPassword}
                onChange={(e) => setGmailPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setGmailDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleGmailLogin}>
              Login & Connect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* QuickBooks Login Dialog */}
      <Dialog open={quickbooksDialogOpen} onOpenChange={setQuickbooksDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Connect to QuickBooks</DialogTitle>
            <DialogDescription>
              Enter your QuickBooks credentials to connect your account
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="quickbooks-username">Username</Label>
              <Input
                id="quickbooks-username"
                value={quickbooksUsername}
                onChange={(e) => setQuickbooksUsername(e.target.value)}
                placeholder="Your QuickBooks username"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quickbooks-password">Password</Label>
              <Input
                id="quickbooks-password"
                type="password"
                value={quickbooksPassword}
                onChange={(e) => setQuickbooksPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setQuickbooksDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleQuickbooksLogin}>
              Login & Connect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;
