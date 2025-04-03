
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
import { X, Users, Calendar, CreditCard, BarChart2, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";

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
              <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                <span className="font-medium text-xs text-primary">{app.name.substring(0, 2).toUpperCase()}</span>
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

          <TabsContent value="teams">
            <div className="py-8 text-center text-muted-foreground">
              Team usage information will be shown here
            </div>
          </TabsContent>

          <TabsContent value="features">
            <div className="py-8 text-center text-muted-foreground">
              Features information will be shown here
            </div>
          </TabsContent>

          <TabsContent value="recommendations">
            <div className="py-8 text-center text-muted-foreground">
              Recommendations will be shown here
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
