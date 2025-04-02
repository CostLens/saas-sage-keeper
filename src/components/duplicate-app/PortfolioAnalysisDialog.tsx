
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Loader2, Download, Mail } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

interface PortfolioAnalysisDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: string[];
  totalApps: number;
  duplicateApps: number;
  potentialSavings: number;
}

export function PortfolioAnalysisDialog({ 
  open, 
  onOpenChange,
  categories,
  totalApps,
  duplicateApps,
  potentialSavings
}: PortfolioAnalysisDialogProps) {
  const [analyzing, setAnalyzing] = useState(true);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  
  // Simulate analysis progress
  React.useEffect(() => {
    if (open && analyzing) {
      const interval = setInterval(() => {
        setAnalysisProgress((prev) => {
          const newProgress = prev + 20;
          if (newProgress >= 100) {
            clearInterval(interval);
            setAnalyzing(false);
            return 100;
          }
          return newProgress;
        });
      }, 600);
      
      return () => clearInterval(interval);
    }
    
    return () => {};
  }, [open, analyzing]);
  
  // Reset state when dialog closes
  React.useEffect(() => {
    if (!open) {
      setAnalyzing(true);
      setAnalysisProgress(0);
    }
  }, [open]);
  
  const handleExportReport = () => {
    toast.success("Portfolio analysis report exported", {
      description: "The detailed report has been sent to your email"
    });
    onOpenChange(false);
  };
  
  const handleShareResults = () => {
    toast.success("Analysis results shared", {
      description: "Results have been shared with the IT and Finance teams"
    });
  };
  
  // Mock data for visualizations
  const categoryData = [
    { name: "Communication", count: 3, spend: 47500, duplicates: 2 },
    { name: "Project Management", count: 4, spend: 34000, duplicates: 3 },
    { name: "CRM", count: 2, spend: 85000, duplicates: 1 },
    { name: "Design", count: 3, spend: 42000, duplicates: 2 },
    { name: "Data Storage", count: 2, spend: 25000, duplicates: 1 },
    { name: "Analytics", count: 2, spend: 30000, duplicates: 1 },
    { name: "HR", count: 1, spend: 18000, duplicates: 0 },
  ];
  
  const duplicateData = [
    { name: "Duplicate Apps", value: duplicateApps },
    { name: "Unique Apps", value: totalApps - duplicateApps }
  ];
  
  const COLORS = ['#FF8042', '#0088FE'];
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>SaaS Portfolio Analysis</DialogTitle>
          <DialogDescription>
            Comprehensive analysis of your SaaS portfolio to identify duplication and optimization opportunities
          </DialogDescription>
        </DialogHeader>
        
        {analyzing ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-6">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <div className="text-center space-y-2">
              <h3 className="text-lg font-medium">Analyzing your SaaS portfolio</h3>
              <p className="text-muted-foreground">
                Examining applications across {categories.length} categories
              </p>
            </div>
            <div className="w-full max-w-md space-y-2">
              <Progress value={analysisProgress} className="w-full" />
              <p className="text-sm text-right text-muted-foreground">{analysisProgress}% complete</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                    <p className="text-3xl font-bold mt-1">{totalApps}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <p className="text-sm font-medium text-muted-foreground">Duplicate Applications</p>
                    <p className="text-3xl font-bold mt-1">{duplicateApps}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <p className="text-sm font-medium text-muted-foreground">Potential Annual Savings</p>
                    <p className="text-3xl font-bold mt-1 text-green-700 dark:text-green-400">
                      {formatCurrency(potentialSavings)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="spend">
              <TabsList className="w-full">
                <TabsTrigger value="spend">Spend by Category</TabsTrigger>
                <TabsTrigger value="duplication">Duplication Rate</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="spend" className="pt-4">
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={categoryData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                      <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Annual Spend']} />
                      <Bar dataKey="spend" fill="#8884d8" name="Annual Spend" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              
              <TabsContent value="duplication" className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={duplicateData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {duplicateData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [value, 'Applications']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Duplication by Category</h4>
                      <div className="space-y-3">
                        {categoryData.map((category, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">{category.name}</span>
                              <span className="text-sm font-medium">{category.duplicates} duplicates</span>
                            </div>
                            <Progress value={(category.duplicates / category.count) * 100} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="recommendations" className="pt-4">
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-2">Key Recommendations</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li className="text-sm">Consolidate communication tools by standardizing on Microsoft Teams</li>
                      <li className="text-sm">Eliminate redundant project management tools (Asana, Trello) in favor of Monday.com</li>
                      <li className="text-sm">Centralize CRM functions within Salesforce</li>
                      <li className="text-sm">Standardize on Figma for design work and phase out Canva licenses</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-2">Implementation Timeline</h3>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Phase 1: Communication Tools</span>
                          <span className="text-sm text-muted-foreground">30 days</span>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Phase 2: Project Management</span>
                          <span className="text-sm text-muted-foreground">60 days</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Phase 3: Design Tools</span>
                          <span className="text-sm text-muted-foreground">45 days</span>
                        </div>
                        <Progress value={30} className="h-2" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Phase 4: CRM Consolidation</span>
                          <span className="text-sm text-muted-foreground">90 days</span>
                        </div>
                        <Progress value={10} className="h-2" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-2">Projected Savings</h3>
                    <p className="text-sm mb-4">
                      Implementing these recommendations is expected to yield annual savings of {formatCurrency(potentialSavings)}.
                    </p>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { quarter: 'Q1', savings: potentialSavings * 0.2 },
                            { quarter: 'Q2', savings: potentialSavings * 0.5 },
                            { quarter: 'Q3', savings: potentialSavings * 0.8 },
                            { quarter: 'Q4', savings: potentialSavings }
                          ]}
                          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="quarter" />
                          <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                          <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Projected Savings']} />
                          <Bar dataKey="savings" fill="#4ade80" name="Projected Savings" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
        
        <DialogFooter className="gap-2">
          {!analyzing && (
            <>
              <Button variant="outline" onClick={handleShareResults}>
                <Mail className="h-4 w-4 mr-2" />
                Share Results
              </Button>
              <Button onClick={handleExportReport}>
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
