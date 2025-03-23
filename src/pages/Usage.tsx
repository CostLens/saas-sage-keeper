
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { mockSaasData } from "@/lib/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendChart } from "@/components/ui/trend-chart";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  AlertTriangle, 
  TrendingDown, 
  ChevronDown, 
  ChevronUp,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

// Mock usage history data
const usageHistory = [
  { month: 'Jan', activeUsers: 320, totalLicenses: 450 },
  { month: 'Feb', activeUsers: 350, totalLicenses: 450 },
  { month: 'Mar', activeUsers: 380, totalLicenses: 500 },
  { month: 'Apr', activeUsers: 410, totalLicenses: 500 },
  { month: 'May', activeUsers: 390, totalLicenses: 500 },
  { month: 'Jun', activeUsers: 415, totalLicenses: 550 },
  { month: 'Jul', activeUsers: 440, totalLicenses: 550 },
  { month: 'Aug', activeUsers: 460, totalLicenses: 550 },
  { month: 'Sep', activeUsers: 480, totalLicenses: 600 },
  { month: 'Oct', activeUsers: 510, totalLicenses: 600 },
  { month: 'Nov', activeUsers: 540, totalLicenses: 650 },
  { month: 'Dec', activeUsers: 580, totalLicenses: 650 },
];

const UsagePage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem("sidebar-collapsed") === "true";
  });

  // Calculate usage metrics
  const totalLicenses = mockSaasData.reduce((sum, saas) => sum + (saas.usage.totalLicenses || 0), 0);
  const activeUsers = mockSaasData.reduce((sum, saas) => sum + saas.usage.activeUsers, 0);
  const overallUtilization = totalLicenses > 0 ? Math.round((activeUsers / totalLicenses) * 100) : 0;
  
  // Sort apps by utilization (lowest first for optimization opportunities)
  const sortedByUtilization = [...mockSaasData].sort((a, b) => a.usage.utilization - b.usage.utilization);
  
  // Get apps with low utilization (less than 60%)
  const lowUtilizationApps = sortedByUtilization.filter(app => app.usage.utilization < 60);
  
  // Calculate potential savings
  const potentialSavings = lowUtilizationApps.reduce((sum, app) => {
    if (app.pricingTerms === 'User-based' && app.usage.totalLicenses) {
      const unusedLicenses = app.usage.totalLicenses - app.usage.activeUsers;
      const recommendedReduction = Math.floor(unusedLicenses * 0.7); // Recommend reducing 70% of unused licenses
      const costPerLicense = app.price / app.usage.totalLicenses;
      return sum + (recommendedReduction * costPerLicense);
    }
    return sum;
  }, 0);

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <Header />
        <main className="flex-1 p-6 space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Usage & Optimization</h1>
          </div>

          <Tabs defaultValue="metrics" className="w-full">
            <TabsList className="grid w-full md:w-[400px] grid-cols-2">
              <TabsTrigger value="metrics">Usage Metrics</TabsTrigger>
              <TabsTrigger value="optimization">Optimization</TabsTrigger>
            </TabsList>
            
            <TabsContent value="metrics" className="space-y-6">
              {/* Overview Card */}
              <Card>
                <CardHeader>
                  <CardTitle>License Utilization Overview</CardTitle>
                  <CardDescription>
                    Showing active users against total available licenses across all applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Overall Utilization</span>
                        <span className="text-sm font-medium">{overallUtilization}%</span>
                      </div>
                      <Progress value={overallUtilization} />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{activeUsers} active users</span>
                        <span>{totalLicenses} total licenses</span>
                      </div>
                    </div>
                    
                    {/* License Trend Chart */}
                    <TrendChart
                      title="User License Trend (12 Month)"
                      data={usageHistory}
                      dataKey="month"
                      categories={["activeUsers", "totalLicenses"]}
                      colors={["hsl(var(--primary))", "hsl(var(--muted))"] }
                      valueFormatter={(value) => value.toString()}
                      height={300}
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* Application Utilization Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Application Utilization</CardTitle>
                  <CardDescription>
                    Breakdown of license utilization by application
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Application</TableHead>
                        <TableHead>License Model</TableHead>
                        <TableHead>Active / Total</TableHead>
                        <TableHead>Utilization</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockSaasData
                        .filter(app => app.active && app.pricingTerms === "User-based")
                        .map((app, i) => (
                          <TableRow key={i}>
                            <TableCell className="font-medium">{app.name}</TableCell>
                            <TableCell>{app.pricingTerms}</TableCell>
                            <TableCell>
                              {app.usage.activeUsers} / {app.usage.totalLicenses || "Unlimited"}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={app.usage.utilization} className="w-20 h-2" />
                                <span>{app.usage.utilization}%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {app.usage.utilization > 80 ? (
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  Optimized
                                </Badge>
                              ) : app.usage.utilization > 60 ? (
                                <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                  Review
                                </Badge>
                              ) : (
                                <Badge variant="destructive">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Underutilized
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="optimization" className="space-y-6">
              {/* Optimization Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Optimization Opportunities</CardTitle>
                  <CardDescription>
                    We've identified potential savings of <strong>${Math.round(potentialSavings).toLocaleString()}</strong> through license optimization
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-muted/30">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Under-utilized Apps</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-baseline">
                          <span className="text-3xl font-bold mr-2">{lowUtilizationApps.length}</span>
                          <span className="text-muted-foreground">applications</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-muted/30">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Unused Licenses</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-baseline">
                          <span className="text-3xl font-bold mr-2">
                            {totalLicenses - activeUsers}
                          </span>
                          <span className="text-muted-foreground">licenses</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-muted/30">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Potential Savings</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-baseline">
                          <span className="text-3xl font-bold mr-2 text-green-600">
                            ${Math.round(potentialSavings).toLocaleString()}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Optimization Recommendations */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recommended Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Application</TableHead>
                            <TableHead>Current Licenses</TableHead>
                            <TableHead>Recommended</TableHead>
                            <TableHead>Est. Savings</TableHead>
                            <TableHead>Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {lowUtilizationApps
                            .filter(app => app.pricingTerms === "User-based" && app.usage.totalLicenses)
                            .map((app, i) => {
                              const unusedLicenses = app.usage.totalLicenses! - app.usage.activeUsers;
                              const recommendedReduction = Math.floor(unusedLicenses * 0.7);
                              const recommendedTotal = app.usage.totalLicenses! - recommendedReduction;
                              const savingsAmount = (app.price / app.usage.totalLicenses!) * recommendedReduction;
                              
                              return (
                                <TableRow key={i}>
                                  <TableCell className="font-medium">{app.name}</TableCell>
                                  <TableCell>{app.usage.totalLicenses}</TableCell>
                                  <TableCell>
                                    <div className="flex items-center">
                                      {recommendedTotal}
                                      <span className="text-red-500 flex items-center ml-2">
                                        <TrendingDown className="h-3 w-3 mr-1" />
                                        {recommendedReduction}
                                      </span>
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-green-600">
                                    ${Math.round(savingsAmount).toLocaleString()}
                                  </TableCell>
                                  <TableCell>
                                    <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                                      Review
                                    </Badge>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default UsagePage;
