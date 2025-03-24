
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { mockSaasData } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, Users, AlertTriangle } from "lucide-react";
import LicenseUtilizationChart from "@/components/charts/LicenseUtilizationChart";

const Usage = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });
  
  useEffect(() => {
    const handleSidebarChange = (event: CustomEvent) => {
      setIsSidebarCollapsed(event.detail.isCollapsed);
    };
    
    window.addEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    
    return () => {
      window.removeEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    };
  }, []);

  // Calculate totals
  const totalLicenses = mockSaasData.reduce((sum, saas) => sum + (saas.usage.totalLicenses || 0), 0);
  const activeUsers = mockSaasData.reduce((sum, saas) => sum + saas.usage.activeUsers, 0);
  const unusedLicenses = totalLicenses - activeUsers;
  const utilizationRate = (activeUsers / totalLicenses) * 100;

  // Create usage status categories
  const highUsageApps = mockSaasData.filter(
    app => app.usage.totalLicenses && (app.usage.activeUsers / app.usage.totalLicenses) > 0.9
  );
  
  const lowUsageApps = mockSaasData.filter(
    app => app.usage.totalLicenses && (app.usage.activeUsers / app.usage.totalLicenses) < 0.5
  );
  
  const optimalUsageApps = mockSaasData.filter(
    app => app.usage.totalLicenses && 
      (app.usage.activeUsers / app.usage.totalLicenses) >= 0.5 && 
      (app.usage.activeUsers / app.usage.totalLicenses) <= 0.9
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <Header />
        <main className="flex-1 p-6 space-y-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Usage Analytics</h1>
          </div>

          {/* Overall usage stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-panel">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">{utilizationRate.toFixed(1)}%</CardTitle>
                <CardDescription>Overall Utilization Rate</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={utilizationRate} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {activeUsers} active users out of {totalLicenses} total licenses
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-panel">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">{unusedLicenses}</CardTitle>
                <CardDescription>Unused Licenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm flex items-center text-amber-500">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span>Potential savings opportunity</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-panel">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">{lowUsageApps.length}</CardTitle>
                <CardDescription>Underutilized Applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm flex items-center text-red-500">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  <span>Below 50% utilization</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* License utilization chart */}
          <LicenseUtilizationChart />

          {/* Application utilization categorization */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  High Utilization
                </CardTitle>
                <CardDescription>Applications with &gt;90% license utilization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {highUsageApps.map(app => {
                    const utilization = app.usage.totalLicenses 
                      ? (app.usage.activeUsers / app.usage.totalLicenses) * 100 
                      : 0;
                    
                    return (
                      <div key={app.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{app.name}</span>
                          <span className="text-sm">{utilization.toFixed(0)}%</span>
                        </div>
                        <Progress value={utilization} className="h-1" />
                        <p className="text-xs text-muted-foreground">
                          {app.usage.activeUsers} / {app.usage.totalLicenses} licenses
                        </p>
                      </div>
                    );
                  })}
                  
                  {highUsageApps.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">
                      No applications with high utilization
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-600">
                  <Users className="h-5 w-5" />
                  Optimal Utilization
                </CardTitle>
                <CardDescription>Applications with 50-90% license utilization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {optimalUsageApps.map(app => {
                    const utilization = app.usage.totalLicenses 
                      ? (app.usage.activeUsers / app.usage.totalLicenses) * 100 
                      : 0;
                    
                    return (
                      <div key={app.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{app.name}</span>
                          <span className="text-sm">{utilization.toFixed(0)}%</span>
                        </div>
                        <Progress value={utilization} className="h-1" />
                        <p className="text-xs text-muted-foreground">
                          {app.usage.activeUsers} / {app.usage.totalLicenses} licenses
                        </p>
                      </div>
                    );
                  })}
                  
                  {optimalUsageApps.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">
                      No applications with optimal utilization
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  Low Utilization
                </CardTitle>
                <CardDescription>Applications with &lt;50% license utilization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lowUsageApps.map(app => {
                    const utilization = app.usage.totalLicenses 
                      ? (app.usage.activeUsers / app.usage.totalLicenses) * 100 
                      : 0;
                    
                    return (
                      <div key={app.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{app.name}</span>
                          <span className="text-sm">{utilization.toFixed(0)}%</span>
                        </div>
                        <Progress value={utilization} className="h-1" />
                        <p className="text-xs text-muted-foreground">
                          {app.usage.activeUsers} / {app.usage.totalLicenses} licenses
                        </p>
                      </div>
                    );
                  })}
                  
                  {lowUsageApps.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">
                      No applications with low utilization
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Usage;
