
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Slack, Webhook, Boxes, AtSign, Box, Users, UserCog } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Settings = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });
  
  const [apiKey, setApiKey] = useState("xq_live_FVD93jfn5aJFjdlsj24nfFjslfdjsldj25sldkfj");
  const [webhookURL, setWebhookURL] = useState("https://hooks.xpendiq.com/triggers/payments/");
  
  const [showUsageFeatures, setShowUsageFeatures] = useState(() => {
    const savedValue = localStorage.getItem("show-usage-features");
    return savedValue === "true";
  });

  const [showBoardingFeatures, setShowBoardingFeatures] = useState(() => {
    const savedValue = localStorage.getItem("show-boarding-features");
    return savedValue === "true";
  });
  
  // Personal details state
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [workEmail, setWorkEmail] = useState("john.doe@company.com");
  const [team, setTeam] = useState("Product");
  
  // Company details state
  const [companyName, setCompanyName] = useState("Acme Inc.");
  const [companySize, setCompanySize] = useState("100-500");
  const [industry, setIndustry] = useState("Technology");
  
  useEffect(() => {
    const handleSidebarChange = (event: CustomEvent) => {
      setIsSidebarCollapsed(event.detail.isCollapsed);
    };
    
    window.addEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    
    return () => {
      window.removeEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    };
  }, []);
  
  const toggleUsageFeatures = () => {
    const newValue = !showUsageFeatures;
    localStorage.setItem("show-usage-features", newValue.toString());
    setShowUsageFeatures(newValue);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('usageFeaturesToggled'));
    
    toast.success(`Usage Analytics features ${newValue ? 'enabled' : 'disabled'}`);
  };

  const toggleBoardingFeatures = () => {
    const newValue = !showBoardingFeatures;
    localStorage.setItem("show-boarding-features", newValue.toString());
    setShowBoardingFeatures(newValue);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('boardingFeaturesToggled'));
    
    toast.success(`User Boarding features ${newValue ? 'enabled' : 'disabled'}`);
  };
  
  const saveAPISettings = () => {
    toast.success("API settings saved successfully");
  };
  
  const saveNotificationSettings = () => {
    toast.success("Notification settings saved successfully");
  };
  
  const savePersonalDetails = () => {
    toast.success("Personal details saved successfully");
  };
  
  const saveCompanyDetails = () => {
    toast.success("Company details saved successfully");
  };
  
  const resetAPIKey = () => {
    setApiKey("xq_live_" + Math.random().toString(36).substring(2, 15));
    toast.success("API key regenerated successfully");
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className={`flex-1 transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <Header />
        <main className="p-6 overflow-auto space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          </div>
          
          <Tabs defaultValue="general" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4">
              {/* Personal Details Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Details</CardTitle>
                  <CardDescription>
                    Manage your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)} 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="workEmail">Work Email</Label>
                      <Input 
                        id="workEmail" 
                        type="email"
                        value={workEmail} 
                        onChange={(e) => setWorkEmail(e.target.value)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="team">Team</Label>
                      <Select value={team} onValueChange={setTeam}>
                        <SelectTrigger id="team">
                          <SelectValue placeholder="Select team" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Product">Product</SelectItem>
                          <SelectItem value="Engineering">Engineering</SelectItem>
                          <SelectItem value="Design">Design</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Sales">Sales</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="HR">HR</SelectItem>
                          <SelectItem value="Operations">Operations</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={savePersonalDetails}>Save Changes</Button>
                </CardFooter>
              </Card>
              
              {/* Company Details Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Company Details</CardTitle>
                  <CardDescription>
                    Manage your company information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input 
                      id="companyName" 
                      value={companyName} 
                      onChange={(e) => setCompanyName(e.target.value)} 
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companySize">Company Size</Label>
                      <Select value={companySize} onValueChange={setCompanySize}>
                        <SelectTrigger id="companySize">
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-100">51-100 employees</SelectItem>
                          <SelectItem value="100-500">100-500 employees</SelectItem>
                          <SelectItem value="500+">500+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Select value={industry} onValueChange={setIndustry}>
                        <SelectTrigger id="industry">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Retail">Retail</SelectItem>
                          <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={saveCompanyDetails}>Save Changes</Button>
                </CardFooter>
              </Card>
              
              {/* Feature Flags Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Feature Flags</CardTitle>
                  <CardDescription>
                    Enable or disable experimental features
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="usageFeatures">Usage Analytics</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable usage analytics reporting and dashboards
                      </p>
                    </div>
                    <Switch
                      id="usageFeatures"
                      checked={showUsageFeatures}
                      onCheckedChange={toggleUsageFeatures}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="boardingFeatures">User Boarding</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable user onboarding and offboarding management
                      </p>
                    </div>
                    <Switch
                      id="boardingFeatures"
                      checked={showBoardingFeatures}
                      onCheckedChange={toggleBoardingFeatures}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="integrations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Connected Services</CardTitle>
                  <CardDescription>
                    Manage your connected services and integrations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <Slack className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Slack</p>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications and reports in Slack
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                      Connected
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <Webhook className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Webhooks</p>
                        <p className="text-sm text-muted-foreground">
                          Send data to external systems via webhooks
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <Boxes className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Zapier</p>
                        <p className="text-sm text-muted-foreground">
                          Connect with 3000+ apps via Zapier
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Connect
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <AtSign className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Zoho People</p>
                        <p className="text-sm text-muted-foreground">
                          Sync employee data from Zoho People
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                      Connected
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <Box className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Okta</p>
                        <p className="text-sm text-muted-foreground">
                          Single sign-on and user provisioning
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>
                    Manage email notification preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox id="renewal" defaultChecked />
                    <div className="space-y-1 leading-none">
                      <Label htmlFor="renewal" className="cursor-pointer font-medium">
                        Contract Renewals
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified 30, 14, and 7 days before contract renewals
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox id="spend-alerts" defaultChecked />
                    <div className="space-y-1 leading-none">
                      <Label htmlFor="spend-alerts" className="cursor-pointer font-medium">
                        Spend Alerts
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive alerts when spending exceeds defined thresholds
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox id="usage-reports" defaultChecked />
                    <div className="space-y-1 leading-none">
                      <Label htmlFor="usage-reports" className="cursor-pointer font-medium">
                        Usage Reports
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Weekly and monthly SaaS usage reports
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox id="product-updates" />
                    <div className="space-y-1 leading-none">
                      <Label htmlFor="product-updates" className="cursor-pointer font-medium">
                        Product Updates
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive information about new features and improvements
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={saveNotificationSettings}>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="api" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>API Settings</CardTitle>
                  <CardDescription>
                    Manage your API keys and access
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">API Key</Label>
                    <div className="flex">
                      <Input 
                        id="apiKey" 
                        value={apiKey} 
                        readOnly
                        className="rounded-r-none"
                      />
                      <Button 
                        variant="outline" 
                        className="rounded-l-none"
                        onClick={() => {
                          navigator.clipboard.writeText(apiKey);
                          toast.success("API key copied to clipboard");
                        }}
                      >
                        Copy
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      This key provides full access to your account. Keep it secure.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="webhookURL">Webhook URL</Label>
                    <Input 
                      id="webhookURL" 
                      value={webhookURL} 
                      onChange={(e) => setWebhookURL(e.target.value)} 
                    />
                    <p className="text-sm text-muted-foreground">
                      Events will be sent to this URL in real-time.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={resetAPIKey}>
                    Regenerate API Key
                  </Button>
                  <Button onClick={saveAPISettings}>
                    Save Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Settings;
