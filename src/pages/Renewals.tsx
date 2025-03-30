
import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRenewalContracts } from "@/hooks/useRenewalContracts";
import { SavingsSummaryCard } from "@/components/renewals/SavingsSummaryCard";
import { RenewalContractsTable } from "@/components/renewals/RenewalContractsTable";
import { calculateTotalPotentialSavings } from "@/components/renewals/LicenseRecommendation";
import { Search, Filter, CheckCircle, Clock, AlertCircle, TrendingDown, Download, FileText, Upload } from "lucide-react";
import { toast } from "sonner";

const Renewals = () => {
  const renewalContracts = useRenewalContracts();
  const [searchQuery, setSearchQuery] = useState("");
  const totalPotentialSavings = calculateTotalPotentialSavings(renewalContracts);

  // Renewal workflow statuses
  const workflowStatuses = [
    { name: "Due in 30 Days", count: renewalContracts.filter(c => {
      const renewalDate = new Date(c.renewalDate);
      const now = new Date();
      const days = Math.floor((renewalDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return days <= 30 && days >= 0;
    }).length, color: "bg-red-100 text-red-800" },
    { name: "Due in 60 Days", count: renewalContracts.filter(c => {
      const renewalDate = new Date(c.renewalDate);
      const now = new Date();
      const days = Math.floor((renewalDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return days <= 60 && days > 30;
    }).length, color: "bg-amber-100 text-amber-800" },
    { name: "Due in 90 Days", count: renewalContracts.filter(c => {
      const renewalDate = new Date(c.renewalDate);
      const now = new Date();
      const days = Math.floor((renewalDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return days <= 90 && days > 60;
    }).length, color: "bg-blue-100 text-blue-800" },
    { name: "Optimization Opportunities", count: renewalContracts.filter(saas => {
      return saas.usage.utilizationRate < 80 && saas.pricingTerms === 'User-based';
    }).length, color: "bg-green-100 text-green-800" }
  ];

  // Recent optimization activities
  const recentActivities = [
    { action: "License optimization identified", vendor: "Adobe", savings: "$12,500", time: "2 days ago", icon: <TrendingDown className="h-4 w-4 text-green-500" /> },
    { action: "Renewal strategy prepared", vendor: "Microsoft", savings: "$8,200", time: "Yesterday", icon: <CheckCircle className="h-4 w-4 text-blue-500" /> },
    { action: "Critical renewal approaching", vendor: "Salesforce", savings: "$15,000", time: "Due in 10 days", icon: <Clock className="h-4 w-4 text-amber-500" /> },
    { action: "Utilization alert", vendor: "Slack", savings: "$4,750", time: "30% utilized", icon: <AlertCircle className="h-4 w-4 text-red-500" /> },
  ];

  // Available actions users can take on renewals
  const availableActions = [
    { 
      name: "Generate Renewal Report", 
      icon: <FileText className="h-4 w-4" />,
      onClick: () => {
        toast.success("Renewal report generated! Check your email for the report.");
      }
    },
    { 
      name: "Export License Data", 
      icon: <Download className="h-4 w-4" />,
      onClick: () => {
        toast.success("License data exported successfully!");
      }
    },
    { 
      name: "Upload Vendor Quote", 
      icon: <Upload className="h-4 w-4" />,
      onClick: () => {
        toast.success("Quote upload form opened. Please select your file.");
      }
    }
  ];

  // Filter contracts based on search
  const filteredContracts = renewalContracts.filter(contract => 
    contract.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Renewals & Optimization</h1>
            <p className="text-muted-foreground">
              Optimize license costs for upcoming renewals based on usage analysis
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

        {/* Actions Section */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Take action on your upcoming renewals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {availableActions.map((action, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={action.onClick}
                >
                  {action.icon}
                  {action.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contracts Table */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="upcoming">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="upcoming">Due in 90 Days</TabsTrigger>
                  <TabsTrigger value="optimized">Optimization Opportunities</TabsTrigger>
                </TabsList>
                <div className="flex gap-2">
                  <div className="relative w-[180px]">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search" 
                      className="pl-8 h-9" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
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
                    <CardTitle>Contracts Due for Renewal</CardTitle>
                    <CardDescription>
                      Review optimization strategies for upcoming renewals
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RenewalContractsTable contracts={filteredContracts} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="optimized" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>License Optimization Opportunities</CardTitle>
                    <CardDescription>
                      Contracts with low utilization that can be optimized
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RenewalContractsTable 
                      contracts={filteredContracts.filter(saas => 
                        saas.usage.utilizationRate < 80 && saas.pricingTerms === 'User-based'
                      )} 
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Recent Activity */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Optimization Insights</CardTitle>
                <CardDescription>
                  Recent cost-saving opportunities identified
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((item, index) => (
                    <div key={index} className="flex gap-3 pb-3 border-b last:border-0">
                      <div className="mt-0.5">{item.icon}</div>
                      <div>
                        <p className="font-medium">{item.action}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.vendor} • Potential savings: <span className="text-green-600 font-medium">{item.savings}</span>
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

export default Renewals;
