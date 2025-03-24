
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";

const Settings = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });
  
  // Feature flags
  const [showUsageFeatures, setShowUsageFeatures] = useState(() => {
    const savedValue = localStorage.getItem("show-usage-features");
    return savedValue === "true";
  });
  
  // Integration status
  const [integrations, setIntegrations] = useState({
    gmail: { connected: true, lastSynced: "2023-10-15T08:30:00" },
    slack: { connected: false, lastSynced: null },
    quickbooks: { connected: true, lastSynced: "2023-10-14T14:22:00" },
    zoom: { connected: false, lastSynced: null },
    zoho: { connected: false, lastSynced: null },
  });
  
  // Form values
  const [companyDetails, setCompanyDetails] = useState({
    name: "Acme Corp",
    email: "admin@acmecorp.com",
    industry: "Technology",
    size: "50-100",
    country: "United States"
  });

  // Personal details form
  const [personalDetails, setPersonalDetails] = useState({
    firstName: "John",
    lastName: "Doe",
    workEmail: "john.doe@acmecorp.com",
    team: "Product Management"
  });

  const toggleUsageFeatures = () => {
    const newValue = !showUsageFeatures;
    localStorage.setItem("show-usage-features", newValue.toString());
    setShowUsageFeatures(newValue);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('usageFeaturesToggled'));
    
    toast.success(`Usage features ${newValue ? 'enabled' : 'disabled'}`);
  };
  
  const handleCompanyDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompanyDetails(prev => ({ ...prev, [name]: value }));
  };

  const handlePersonalDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalDetails(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCompanyDetailsSave = () => {
    // Here you would normally save to an API
    toast.success("Company details saved successfully!");
  };

  const handlePersonalDetailsSave = () => {
    // Here you would normally save to an API
    toast.success("Personal details saved successfully!");
  };
  
  const handleConnect = (integration: string) => {
    // Here you would normally connect to the integration via API
    setIntegrations(prev => ({
      ...prev,
      [integration]: { 
        connected: true, 
        lastSynced: new Date().toISOString() 
      }
    }));
    
    toast.success(`Connected to ${integration} successfully!`);
  };
  
  const handleDisconnect = (integration: string) => {
    // Here you would normally disconnect from the integration via API
    setIntegrations(prev => ({
      ...prev,
      [integration]: { 
        connected: false, 
        lastSynced: null 
      }
    }));
    
    toast.success(`Disconnected from ${integration} successfully!`);
  };
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  useEffect(() => {
    const handleSidebarChange = (event: CustomEvent) => {
      setIsSidebarCollapsed(event.detail.isCollapsed);
    };
    
    window.addEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    
    return () => {
      window.removeEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <Header />
        <main className="flex-1 p-6 space-y-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          </div>

          <Tabs defaultValue="general" className="space-y-6">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
              <TabsTrigger value="features">Feature Flags</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-6">
              {/* Personal Details Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Details</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        name="firstName" 
                        value={personalDetails.firstName} 
                        onChange={handlePersonalDetailChange} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        name="lastName" 
                        value={personalDetails.lastName} 
                        onChange={handlePersonalDetailChange} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="workEmail">Work Email</Label>
                      <Input 
                        id="workEmail" 
                        name="workEmail" 
                        type="email" 
                        value={personalDetails.workEmail} 
                        onChange={handlePersonalDetailChange} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="team">Team</Label>
                      <Input 
                        id="team" 
                        name="team" 
                        value={personalDetails.team} 
                        onChange={handlePersonalDetailChange} 
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handlePersonalDetailsSave}>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Company Details Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Company Details</CardTitle>
                  <CardDescription>Update your company information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Company Name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={companyDetails.name} 
                        onChange={handleCompanyDetailChange} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Company Email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={companyDetails.email} 
                        onChange={handleCompanyDetailChange} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Input 
                        id="industry" 
                        name="industry" 
                        value={companyDetails.industry} 
                        onChange={handleCompanyDetailChange} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="size">Company Size</Label>
                      <Input 
                        id="size" 
                        name="size" 
                        value={companyDetails.size} 
                        onChange={handleCompanyDetailChange} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input 
                        id="country" 
                        name="country" 
                        value={companyDetails.country} 
                        onChange={handleCompanyDetailChange} 
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleCompanyDetailsSave}>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Subscription</CardTitle>
                  <CardDescription>Manage your subscription plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-md p-4 mb-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">Current Plan: Professional</h3>
                        <p className="text-sm text-muted-foreground">Billed annually at $599/year</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button variant="outline">Change Plan</Button>
                    <Button variant="outline" className="text-red-500 hover:text-red-600">Cancel Subscription</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="integrations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Connected Services</CardTitle>
                  <CardDescription>Manage integrations with third-party services</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Gmail Integration */}
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-red-100 p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                          <path d="M3 3h18v18H3z"/>
                          <path d="m3 8 8 5 8-5"/>
                          <path d="M3 8V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Gmail</h3>
                        <p className="text-sm text-muted-foreground">
                          {integrations.gmail.connected 
                            ? `Last synced: ${formatDate(integrations.gmail.lastSynced)}` 
                            : "Not connected"}
                        </p>
                      </div>
                    </div>
                    <div>
                      {integrations.gmail.connected ? (
                        <Button variant="outline" onClick={() => handleDisconnect('gmail')}>
                          <XCircle className="h-4 w-4 mr-2" />
                          Disconnect
                        </Button>
                      ) : (
                        <Button onClick={() => handleConnect('gmail')}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* QuickBooks Integration */}
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                          <path d="M3 3v18h18"/>
                          <path d="m19 9-5 5-4-4-3 3"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">QuickBooks</h3>
                        <p className="text-sm text-muted-foreground">
                          {integrations.quickbooks.connected 
                            ? `Last synced: ${formatDate(integrations.quickbooks.lastSynced)}` 
                            : "Not connected"}
                        </p>
                      </div>
                    </div>
                    <div>
                      {integrations.quickbooks.connected ? (
                        <Button variant="outline" onClick={() => handleDisconnect('quickbooks')}>
                          <XCircle className="h-4 w-4 mr-2" />
                          Disconnect
                        </Button>
                      ) : (
                        <Button onClick={() => handleConnect('quickbooks')}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* Slack Integration */}
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-purple-100 p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
                          <path d="M14.5 2v4c0 1.1-.9 2-2 2h-4"/>
                          <path d="M9.5 22v-4c0-1.1.9-2 2-2h4"/>
                          <path d="M22 9.5h-4c-1.1 0-2-.9-2-2v-4"/>
                          <path d="M2 14.5h4c1.1 0 2 .9 2 2v4"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Slack</h3>
                        <p className="text-sm text-muted-foreground">
                          {integrations.slack.connected 
                            ? `Last synced: ${formatDate(integrations.slack.lastSynced)}` 
                            : "Not connected"}
                        </p>
                      </div>
                    </div>
                    <div>
                      {integrations.slack.connected ? (
                        <Button variant="outline" onClick={() => handleDisconnect('slack')}>
                          <XCircle className="h-4 w-4 mr-2" />
                          Disconnect
                        </Button>
                      ) : (
                        <Button onClick={() => handleConnect('slack')}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* Zoom Integration */}
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-700">
                          <path d="M15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14v-4z"/>
                          <rect x="3" y="6" width="12" height="12" rx="2" ry="2"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Zoom</h3>
                        <p className="text-sm text-muted-foreground">
                          {integrations.zoom.connected 
                            ? `Last synced: ${formatDate(integrations.zoom.lastSynced)}` 
                            : "Not connected"}
                        </p>
                      </div>
                    </div>
                    <div>
                      {integrations.zoom.connected ? (
                        <Button variant="outline" onClick={() => handleDisconnect('zoom')}>
                          <XCircle className="h-4 w-4 mr-2" />
                          Disconnect
                        </Button>
                      ) : (
                        <Button onClick={() => handleConnect('zoom')}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* Zoho HRMS Integration */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-700">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                          <circle cx="9" cy="7" r="4"/>
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Zoho HRMS</h3>
                        <p className="text-sm text-muted-foreground">
                          {integrations.zoho.connected 
                            ? `Last synced: ${formatDate(integrations.zoho.lastSynced)}` 
                            : "Not connected"}
                        </p>
                      </div>
                    </div>
                    <div>
                      {integrations.zoho.connected ? (
                        <Button variant="outline" onClick={() => handleDisconnect('zoho')}>
                          <XCircle className="h-4 w-4 mr-2" />
                          Disconnect
                        </Button>
                      ) : (
                        <Button onClick={() => handleConnect('zoho')}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="features" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Feature Flags</CardTitle>
                  <CardDescription>Enable or disable specific features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Usage Analytics</h3>
                      <p className="text-sm text-muted-foreground">
                        Enable usage analytics, user boarding and license management features
                      </p>
                    </div>
                    <Switch 
                      checked={showUsageFeatures} 
                      onCheckedChange={toggleUsageFeatures} 
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <h3 className="font-medium">Contract Renewals</h3>
                      <p className="text-sm text-muted-foreground">
                        Get notified about upcoming contract renewals
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <h3 className="font-medium">Payment Reminders</h3>
                      <p className="text-sm text-muted-foreground">
                        Get notified about upcoming payments
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Weekly Reports</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive weekly summary reports
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="team" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>Manage users who have access to your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-primary/10 p-2 text-primary">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">John Doe</p>
                          <p className="text-sm text-muted-foreground">john@example.com</p>
                        </div>
                      </div>
                      <Badge>Admin</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-primary/10 p-2 text-primary">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">Jane Smith</p>
                          <p className="text-sm text-muted-foreground">jane@example.com</p>
                        </div>
                      </div>
                      <Badge variant="outline">Member</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-primary/10 p-2 text-primary">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">Bob Johnson</p>
                          <p className="text-sm text-muted-foreground">bob@example.com</p>
                        </div>
                      </div>
                      <Badge variant="outline">Member</Badge>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Team Member
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Roles & Permissions</CardTitle>
                  <CardDescription>Manage access rights for different roles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-4">
                      <div>
                        <p className="font-medium">Admin</p>
                        <p className="text-sm text-muted-foreground">Full access to all features</p>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    
                    <div className="flex justify-between items-center border-b pb-4">
                      <div>
                        <p className="font-medium">Manager</p>
                        <p className="text-sm text-muted-foreground">Can manage contracts and users</p>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Member</p>
                        <p className="text-sm text-muted-foreground">View-only access</p>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
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

// Add missing components for types
const Badge = ({ children, variant = "default", className = "" }) => {
  const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold";
  const variantClasses = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "border border-input bg-background text-foreground",
    destructive: "bg-destructive text-destructive-foreground",
    success: "bg-green-500 text-white"
  };
  
  const selectedVariant = variant in variantClasses ? variant : "default";
  
  return (
    <span className={`${baseClasses} ${variantClasses[selectedVariant]} ${className}`}>
      {children}
    </span>
  );
};

const User = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const Plus = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export default Settings;
