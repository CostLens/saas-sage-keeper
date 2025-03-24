
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { SaaSData, generateUsageTrendData, generatePaymentTrendData } from "@/lib/mockData";
import { TrendChart } from "@/components/ui/trend-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  DollarSign,
  FileText,
  CheckCircle,
  AlertCircle,
  Activity,
  Users as UsersIcon
} from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface SaasDetailModalProps {
  saas: SaaSData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Generate mock user data
const generateMockUsers = (saasId: string, totalUsers: number) => {
  const users = [];
  const roles = ["Admin", "Editor", "Viewer", "User"];
  const departments = ["Marketing", "Sales", "Engineering", "Product", "Finance", "HR"];
  
  for (let i = 0; i < totalUsers; i++) {
    const isActive7d = Math.random() > 0.3;
    const isActive30d = isActive7d || Math.random() > 0.5;
    
    users.push({
      id: `user-${saasId}-${i}`,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: roles[Math.floor(Math.random() * roles.length)],
      department: departments[Math.floor(Math.random() * departments.length)],
      lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)),
      isActive7d,
      isActive30d
    });
  }
  
  return users;
};

export function SaasDetailModal({ saas, open, onOpenChange }: SaasDetailModalProps) {
  if (!saas) return null;

  // Generate chart data
  const paymentData = generatePaymentTrendData(saas.id);
  const usageData = generateUsageTrendData(saas.id);
  
  // Generate user data
  const userData = generateMockUsers(saas.id, saas.usage.activeUsers);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (active: boolean) => {
    if (active) {
      return (
        <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Active
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800">
          <AlertCircle className="h-3 w-3 mr-1" />
          Decommissioned
        </Badge>
      );
    }
  };

  const getActivityBadge = (isActive: boolean) => {
    if (isActive) {
      return (
        <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Active
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800">
          <AlertCircle className="h-3 w-3 mr-1" />
          Inactive
        </Badge>
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-auto glass-panel animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-2xl">{saas.name}</DialogTitle>
          <DialogDescription>
            View detailed information and analytics about this SaaS application.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-6 py-4">
          {/* Key Information Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-muted/30 p-4 rounded-lg flex flex-col">
              <div className="text-xs text-muted-foreground mb-1 flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                Renewal Date
              </div>
              <div className="font-medium">
                {saas.renewalDate === "N/A" 
                  ? "N/A" 
                  : format(new Date(saas.renewalDate), "MMMM d, yyyy")}
              </div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg flex flex-col">
              <div className="text-xs text-muted-foreground mb-1 flex items-center">
                <DollarSign className="h-3 w-3 mr-1" />
                Annual Cost
              </div>
              <div className="font-medium">{formatCurrency(saas.price)}</div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg flex flex-col">
              <div className="text-xs text-muted-foreground mb-1 flex items-center">
                <Activity className="h-3 w-3 mr-1" />
                Status
              </div>
              <div className="font-medium">
                {getStatusBadge(saas.active)}
              </div>
            </div>
          </div>

          {/* Tabs for different data views */}
          <Tabs defaultValue="analytics" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="contract">Contract Details</TabsTrigger>
              <TabsTrigger value="payments">Payment History</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>
            
            <TabsContent value="analytics" className="space-y-6">
              {/* Spend Trend Chart */}
              <TrendChart
                title="Spend Trend"
                description="Monthly spend for this application"
                data={paymentData}
                dataKey="name"
                categories={["amount"]}
                colors={["hsl(var(--primary))"]}
                valueFormatter={(value) => `$${value.toFixed(2)}`}
                height={300}
              />
            </TabsContent>
            
            <TabsContent value="contract" className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Contract Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Contract Signed</h4>
                    <p className="font-medium">{format(new Date(saas.contract.signedDate), "MMMM d, yyyy")}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Term</h4>
                    <p className="font-medium">{saas.contract.term}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Auto-Renewal</h4>
                    <p className="font-medium">{saas.contract.autoRenewal ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Cancellation Deadline</h4>
                    <p className="font-medium">
                      {saas.contract.cancellationDeadline 
                        ? format(new Date(saas.contract.cancellationDeadline), "MMMM d, yyyy")
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Associated Documents</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-md bg-background/50 hover:bg-background/80 transition-colors cursor-pointer border">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{saas.name} Contract</p>
                        <p className="text-xs text-muted-foreground">PDF • 1.2MB</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-md bg-background/50 hover:bg-background/80 transition-colors cursor-pointer border">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Latest Invoice</p>
                        <p className="text-xs text-muted-foreground">PDF • 450KB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="payments" className="space-y-4">
              <TrendChart
                title="Payment History"
                description="Monthly payment amounts over time"
                data={paymentData}
                dataKey="name"
                categories={["amount"]}
                colors={["hsl(var(--primary))"]}
                valueFormatter={(value) => `$${value.toFixed(2)}`}
                height={300}
              />
              
              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Recent Payments</h3>
                <div className="space-y-4">
                  {paymentData.slice(-5).reverse().map((payment, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 rounded-md bg-background/50 border"
                    >
                      <div className="flex items-center gap-3">
                        <DollarSign className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">${payment.amount.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">{payment.name} payment</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-green-500">Paid</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="users" className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <UsersIcon className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-medium">Licensed Users</h3>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {saas.usage.activeUsers} users
                  </div>
                </div>
                
                <div className="overflow-auto max-h-[400px] border rounded-md">
                  <Table>
                    <TableHeader className="bg-muted/50 sticky top-0">
                      <TableRow>
                        <TableHead className="w-[180px]">Name</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead>Active (7d)</TableHead>
                        <TableHead>Active (30d)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userData.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.department}</TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>{format(user.lastLogin, "MMM d, yyyy")}</TableCell>
                          <TableCell>{getActivityBadge(user.isActive7d)}</TableCell>
                          <TableCell>{getActivityBadge(user.isActive30d)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
