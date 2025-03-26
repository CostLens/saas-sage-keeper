
import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRenewalContracts } from "@/hooks/useRenewalContracts";
import { SavingsSummaryCard } from "@/components/contract-negotiation/SavingsSummaryCard";
import { RenewalContractsTable } from "@/components/contract-negotiation/RenewalContractsTable";
import { calculateTotalPotentialSavings } from "@/components/contract-negotiation/LicenseRecommendation";
import { Search, Filter, DownloadCloud, Upload, CheckCircle, Clock, AlertCircle } from "lucide-react";

const ContractNegotiation = () => {
  const renewalContracts = useRenewalContracts();
  const totalPotentialSavings = calculateTotalPotentialSavings(renewalContracts);

  // Mock negotiation workflow statuses
  const workflowStatuses = [
    { name: "In Progress", count: 4, color: "bg-amber-100 text-amber-800" },
    { name: "Ready for Review", count: 2, color: "bg-blue-100 text-blue-800" },
    { name: "Negotiation Completed", count: 3, color: "bg-green-100 text-green-800" },
    { name: "Escalated", count: 1, color: "bg-red-100 text-red-800" }
  ];

  // Mock recent actions
  const recentActions = [
    { action: "Contract review completed", vendor: "Adobe", user: "Sarah Johnson", time: "2 hours ago", icon: <CheckCircle className="h-4 w-4 text-green-500" /> },
    { action: "Counteroffer submitted", vendor: "Microsoft", user: "Tom Wilson", time: "Yesterday", icon: <Upload className="h-4 w-4 text-blue-500" /> },
    { action: "New proposal received", vendor: "Salesforce", user: "Jessica Lee", time: "2 days ago", icon: <DownloadCloud className="h-4 w-4 text-amber-500" /> },
    { action: "Negotiation deadline approaching", vendor: "Slack", user: "System", time: "Just now", icon: <Clock className="h-4 w-4 text-red-500" /> },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Contract Negotiation</h1>
            <p className="text-muted-foreground">
              Review contracts due for renewal and identify cost-saving opportunities
            </p>
          </div>
          <SavingsSummaryCard totalSavings={totalPotentialSavings} />
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {workflowStatuses.map((status, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{status.name}</p>
                  <Badge className={status.color}>{status.count}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contracts Table */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="upcoming">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="upcoming">Upcoming Renewals</TabsTrigger>
                  <TabsTrigger value="inProgress">In Progress</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                <div className="flex gap-2">
                  <div className="relative w-[180px]">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search" className="pl-8 h-9" />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              <TabsContent value="upcoming" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Contracts Due for Renewal (Next 90 Days)</CardTitle>
                    <CardDescription>
                      Review and prepare for upcoming contract renewals.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RenewalContractsTable contracts={renewalContracts} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="inProgress" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Contracts In Negotiation</CardTitle>
                    <CardDescription>
                      Contracts currently in the negotiation process.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      4 contracts currently in negotiation
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="completed" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Completed Negotiations</CardTitle>
                    <CardDescription>
                      Recently completed contract negotiations.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      3 negotiations completed in the last 30 days
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Recent Activity */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest actions in contract negotiation workflows
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActions.map((item, index) => (
                    <div key={index} className="flex gap-3 pb-3 border-b last:border-0">
                      <div className="mt-0.5">{item.icon}</div>
                      <div>
                        <p className="font-medium">{item.action}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.vendor} • {item.user}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ContractNegotiation;
