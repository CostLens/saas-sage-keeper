
import React, { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ArrowDownUp, Layers, Copy, Check, Download } from "lucide-react";
import { mockSaaSData } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

interface OverlapGroup {
  category: string;
  apps: typeof mockSaaSData;
  totalSpend: number;
  potentialSavings: number;
}

const DuplicateAppComparison = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Define app categories and determine overlapping applications
  const overlapGroups: OverlapGroup[] = useMemo(() => [
    {
      category: "Communication & Collaboration",
      apps: mockSaaSData.filter(app => 
        ["Slack", "Microsoft Teams", "Zoom"].includes(app.name)
      ),
      totalSpend: 47500,
      potentialSavings: 28000
    },
    {
      category: "Project Management",
      apps: mockSaaSData.filter(app => 
        ["Asana", "Monday.com", "Trello"].includes(app.name)
      ),
      totalSpend: 34000,
      potentialSavings: 20000
    },
    {
      category: "CRM & Sales",
      apps: mockSaaSData.filter(app => 
        ["Salesforce", "HubSpot"].includes(app.name)
      ),
      totalSpend: 85000,
      potentialSavings: 35000
    },
    {
      category: "Design & Creativity",
      apps: mockSaaSData.filter(app => 
        ["Adobe Creative Cloud", "Figma", "Canva"].includes(app.name)
      ),
      totalSpend: 42000,
      potentialSavings: 18000
    },
  ], []);

  // Filter group based on search query
  const filteredGroups = searchQuery.trim() === "" 
    ? overlapGroups 
    : overlapGroups.filter(group => 
        group.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.apps.some(app => app.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
  
  const totalPotentialSavings = overlapGroups.reduce((sum, group) => sum + group.potentialSavings, 0);

  const generateReport = () => {
    toast.success("Duplicate App Report generated successfully", {
      description: "Report has been sent to your email"
    });
  };

  const consolidateApps = (category: string) => {
    toast.success(`Consolidation plan initiated for ${category}`, {
      description: "Stakeholders have been notified of the proposed plan"
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Duplicate App Comparison</h1>
            <p className="text-muted-foreground">
              Identify overlapping applications and consolidation opportunities
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={generateReport}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button>
              <Layers className="h-4 w-4 mr-2" />
              Analyze Portfolio
            </Button>
          </div>
        </div>

        {/* Summary Card */}
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-green-700 dark:text-green-400">
                  Potential Annual Savings
                </h3>
                <p className="text-muted-foreground">
                  Through app consolidation and license optimization
                </p>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-400 mt-2 md:mt-0">
                {formatCurrency(totalPotentialSavings)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters and search */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search categories or applications..." 
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <ArrowDownUp className="h-4 w-4 mr-2" />
            Sort
          </Button>
        </div>

        {/* Duplicate App Groups */}
        {filteredGroups.map((group, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>{group.category}</CardTitle>
                  <CardDescription>
                    {group.apps.length} overlapping applications, total spend: {formatCurrency(group.totalSpend)}
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  className="text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900"
                  onClick={() => consolidateApps(group.category)}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Consolidate
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application</TableHead>
                    <TableHead>Annual Cost</TableHead>
                    <TableHead>Users</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Unique Features</TableHead>
                    <TableHead>Recommendation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.apps.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-muted mr-2 flex items-center justify-center">
                            {app.name.charAt(0)}
                          </div>
                          {app.name}
                        </div>
                      </TableCell>
                      <TableCell>{formatCurrency(app.price)}</TableCell>
                      <TableCell>{app.usage.activeUsers}/{app.usage.totalLicenses || "Unlimited"}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={app.usage.utilizationRate > 70 ? "outline" : "secondary"}
                          className={
                            app.usage.utilizationRate > 70 
                              ? "text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900" 
                              : ""
                          }
                        >
                          {app.usage.utilizationRate}% Utilization
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {app.name === "Slack" && "Channel-based messaging, integrations"}
                        {app.name === "Microsoft Teams" && "Video calls, Office integration"}
                        {app.name === "Zoom" && "High quality video conferencing"}
                        {app.name === "Asana" && "Timeline views, workload management"}
                        {app.name === "Monday.com" && "Custom workflows, dashboards"}
                        {app.name === "Trello" && "Kanban boards, simplicity"}
                        {app.name === "Salesforce" && "Advanced reporting, ecosystem"}
                        {app.name === "HubSpot" && "Marketing integration, simplicity"}
                        {app.name === "Adobe Creative Cloud" && "Industry standard, desktop apps"}
                        {app.name === "Figma" && "Collaborative design, prototyping"}
                        {app.name === "Canva" && "Templates, ease of use"}
                      </TableCell>
                      <TableCell>
                        {group.category === "Communication & Collaboration" && app.name === "Microsoft Teams" && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400">
                            <Check className="h-3 w-3 mr-1" />
                            Keep
                          </Badge>
                        )}
                        {group.category === "Project Management" && app.name === "Monday.com" && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400">
                            <Check className="h-3 w-3 mr-1" />
                            Keep
                          </Badge>
                        )}
                        {group.category === "CRM & Sales" && app.name === "Salesforce" && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400">
                            <Check className="h-3 w-3 mr-1" />
                            Keep
                          </Badge>
                        )}
                        {group.category === "Design & Creativity" && app.name === "Figma" && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400">
                            <Check className="h-3 w-3 mr-1" />
                            Keep
                          </Badge>
                        )}
                        {((group.category === "Communication & Collaboration" && app.name !== "Microsoft Teams") ||
                          (group.category === "Project Management" && app.name !== "Monday.com") ||
                          (group.category === "CRM & Sales" && app.name !== "Salesforce") ||
                          (group.category === "Design & Creativity" && app.name !== "Figma")) && (
                          <Badge variant="destructive">
                            Consolidate
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default DuplicateAppComparison;
