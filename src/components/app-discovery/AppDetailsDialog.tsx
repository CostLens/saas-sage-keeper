
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AppDiscoveryData } from "@/hooks/useAppDiscoveryData";
import { X, Users, Calendar, CreditCard, BarChart2, CheckCircle, AlertTriangle, BarChart } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface AppDetailsDialogProps {
  app: AppDiscoveryData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AppDetailsDialog({ app, isOpen, onClose }: AppDetailsDialogProps) {
  if (!app) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
                <span className="font-medium text-xl text-primary">{app.name.substring(0, 2).toUpperCase()}</span>
              </div>
              <div>
                <DialogTitle className="text-xl">{app.name}</DialogTitle>
                <DialogDescription>{app.category}</DialogDescription>
              </div>
            </div>
            <DialogClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contract Data */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4 text-muted-foreground">CONTRACT DATA</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total licenses</p>
                      <p className="text-2xl font-bold">{Math.round(app.averageUsage * 1.5)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total contract value</p>
                      <p className="text-2xl font-bold">{formatCurrency(app.totalPayments)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Upcoming next date</p>
                      <p className="text-sm">
                        {app.renewalDate ? new Date(app.renewalDate).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Connector Stats */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4 text-muted-foreground">{app.name.toUpperCase()} CONNECTOR</h3>
                  <div className="flex justify-center">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <svg className="w-full h-full" viewBox="0 0 120 120">
                        <circle
                          cx="60"
                          cy="60"
                          r="54"
                          fill="none"
                          stroke="#e2e8f0"
                          strokeWidth="12"
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="54"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="12"
                          strokeDasharray="339.3"
                          strokeDashoffset={339.3 * (1 - app.averageUsage / 100)}
                          transform="rotate(-90 60 60)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold">{app.averageUsage}</span>
                        <span className="text-xs">%</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm">Engaged</span>
                      <span className="text-sm font-bold">{Math.round(app.averageUsage * 0.7)} users</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="text-sm">Not engaged</span>
                      <span className="text-sm font-bold">{Math.round(app.averageUsage * 0.3)} users</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Team Usage Chart */}
              <Card className="md:col-span-2">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Team usage</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Engineering</span>
                        <span>{Math.min(96, Math.round(app.averageUsage * 1.2))}%</span>
                      </div>
                      <Progress value={Math.min(96, Math.round(app.averageUsage * 1.2))} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Sales</span>
                        <span>{Math.min(78, Math.round(app.averageUsage * 1.1))}%</span>
                      </div>
                      <Progress value={Math.min(78, Math.round(app.averageUsage * 1.1))} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Marketing</span>
                        <span>{Math.round(app.averageUsage * 0.9)}%</span>
                      </div>
                      <Progress value={Math.round(app.averageUsage * 0.9)} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* License Recommendation */}
              <Card className="md:col-span-2 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-1">Downgrade</h3>
                      <p className="text-sm text-emerald-600 dark:text-emerald-300">
                        {Math.round(app.averageUsage * 0.2)} unused licenses
                      </p>
                      <div className="mt-4 flex items-center gap-6">
                        <div className="relative">
                          <div className="h-16 w-16 bg-blue-500 flex items-center justify-center text-white">
                            <span className="text-xs">+</span>
                            <span className="text-sm font-bold">Pro</span>
                          </div>
                          <div className="absolute -bottom-2 left-0 w-full text-center text-xs">
                            ${Math.round(app.totalPayments/app.averageUsage)}
                          </div>
                        </div>
                        <div className="flex-1 h-6 relative">
                          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 border-t-2 border-emerald-400 border-dashed"></div>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border border-green-300 flex items-center justify-center text-green-500">
                            →
                          </div>
                        </div>
                        <div className="relative">
                          <div className="h-12 w-12 bg-green-500 flex items-center justify-center text-white">
                            <span className="text-xs">+</span>
                            <span className="text-sm font-bold">Basic</span>
                          </div>
                          <div className="absolute -bottom-2 left-0 w-full text-center text-xs">
                            ${Math.round(app.totalPayments/app.averageUsage * 0.7)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="teams" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Team Distribution</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span>Engineering</span>
                      </div>
                      <span className="font-medium">{Math.round(app.averageUsage * 0.4)} users</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span>Sales</span>
                      </div>
                      <span className="font-medium">{Math.round(app.averageUsage * 0.3)} users</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span>Marketing</span>
                      </div>
                      <span className="font-medium">{Math.round(app.averageUsage * 0.2)} users</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span>Product</span>
                      </div>
                      <span className="font-medium">{Math.round(app.averageUsage * 0.1)} users</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Team Activity</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Engineering</span>
                        <span>Active Daily</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Sales</span>
                        <span>Active Weekly</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Marketing</span>
                        <span>Active Monthly</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Product</span>
                        <span>Inactive</span>
                      </div>
                      <Progress value={10} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Team Usage Trends</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded-md p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Engineering</h4>
                        <BarChart className="h-4 w-4 text-blue-500" />
                      </div>
                      <p className="text-3xl font-bold text-blue-500">+12%</p>
                      <p className="text-sm text-muted-foreground">vs. last month</p>
                    </div>
                    <div className="border rounded-md p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Sales</h4>
                        <BarChart className="h-4 w-4 text-green-500" />
                      </div>
                      <p className="text-3xl font-bold text-green-500">+5%</p>
                      <p className="text-sm text-muted-foreground">vs. last month</p>
                    </div>
                    <div className="border rounded-md p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Marketing</h4>
                        <BarChart className="h-4 w-4 text-red-500" />
                      </div>
                      <p className="text-3xl font-bold text-red-500">-3%</p>
                      <p className="text-sm text-muted-foreground">vs. last month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="features" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Feature Utilization</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Dashboard</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Reporting</span>
                        <span className="font-medium">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Analytics</span>
                        <span className="font-medium">65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Automation</span>
                        <span className="font-medium">42%</span>
                      </div>
                      <Progress value={42} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>API Integration</span>
                        <span className="font-medium">23%</span>
                      </div>
                      <Progress value={23} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Feature Adoption</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-900/20 rounded-md">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-500">High</Badge>
                        <span>Dashboard</span>
                      </div>
                      <span className="font-medium">{Math.round(app.averageUsage * 0.9)}% of users</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-900/20 rounded-md">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-500">High</Badge>
                        <span>Reporting</span>
                      </div>
                      <span className="font-medium">{Math.round(app.averageUsage * 0.85)}% of users</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-yellow-500">Medium</Badge>
                        <span>Analytics</span>
                      </div>
                      <span className="font-medium">{Math.round(app.averageUsage * 0.6)}% of users</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-red-50 dark:bg-red-900/20 rounded-md">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-red-500">Low</Badge>
                        <span>Automation</span>
                      </div>
                      <span className="font-medium">{Math.round(app.averageUsage * 0.4)}% of users</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-red-50 dark:bg-red-900/20 rounded-md">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-red-500">Low</Badge>
                        <span>API Integration</span>
                      </div>
                      <span className="font-medium">{Math.round(app.averageUsage * 0.25)}% of users</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Unused Premium Features</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 border rounded-md">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Advanced Analytics</h4>
                        <p className="text-sm text-muted-foreground">This premium feature is included in your plan but only used by 2 users.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 border rounded-md">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Custom Workflows</h4>
                        <p className="text-sm text-muted-foreground">This premium feature is included in your plan but hasn't been configured.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 border rounded-md">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">API Access</h4>
                        <p className="text-sm text-muted-foreground">This premium feature is included in your plan but only used by the admin account.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="pt-4">
            <div className="grid grid-cols-1 gap-6">
              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-md">
                      <Users className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-800 dark:text-blue-300">License Optimization</h3>
                      <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                        You can save approximately {formatCurrency(app.totalPayments * 0.2)} by removing {Math.round(app.averageUsage * 0.2)} unused licenses.
                      </p>
                      <div className="mt-3">
                        <Button className="bg-blue-600 hover:bg-blue-700">Optimize Licenses</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-md">
                      <BarChart className="h-5 w-5 text-purple-700 dark:text-purple-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-800 dark:text-purple-300">Feature Adoption</h3>
                      <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">
                        Increase feature adoption by scheduling training sessions for underutilized features like API Integration 
                        and Automation that have less than 50% usage.
                      </p>
                      <div className="mt-3">
                        <Button className="bg-purple-600 hover:bg-purple-700">Schedule Training</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-800 rounded-md">
                      <CreditCard className="h-5 w-5 text-green-700 dark:text-green-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-800 dark:text-green-300">Contract Negotiation</h3>
                      <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                        Your contract renewal is coming up in {app.renewalDate ? Math.ceil((new Date(app.renewalDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) : 90} days. 
                        Based on your usage patterns, you could negotiate a better rate and save up to {formatCurrency(app.totalPayments * 0.15)} annually.
                      </p>
                      <div className="mt-3">
                        <Button className="bg-green-600 hover:bg-green-700">Prepare for Negotiation</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Additional Recommendations</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 border rounded-md">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Downgrade Plan</h4>
                        <p className="text-sm text-muted-foreground">
                          Consider downgrading to a lower-tier plan since premium features aren't being fully utilized.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 border rounded-md">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Consolidate Teams</h4>
                        <p className="text-sm text-muted-foreground">
                          Marketing team shows low usage. Consider consolidating their access with another department.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 border rounded-md">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Recurring Training</h4>
                        <p className="text-sm text-muted-foreground">
                          Set up monthly training sessions to improve adoption of underutilized features.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
