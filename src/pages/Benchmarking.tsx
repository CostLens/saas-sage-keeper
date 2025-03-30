
import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, TrendingDown, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { mockSaaSData } from "@/lib/mockData";
import { BenchmarkingTable } from "@/components/benchmarking/BenchmarkingTable";
import { formatCurrency } from "@/lib/utils";

const Benchmarking = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Filter SaaS data based on search and category
  const filteredSaasData = mockSaaSData.filter(saas => {
    const matchesSearch = saas.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || saas.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Get unique categories for filtering
  const categories = ["all", ...Array.from(new Set(mockSaaSData.map(saas => saas.category)))];
  
  // Mock benchmark data - normally this would come from a real API or database
  const benchmarkData = filteredSaasData.map(saas => {
    // Generate mock benchmark metrics
    const industryAvgPrice = saas.price * (0.7 + Math.random() * 0.6); // Random between 70% and 130% of current price
    const priceDifference = ((saas.price - industryAvgPrice) / industryAvgPrice) * 100;
    
    return {
      ...saas,
      benchmarking: {
        industryAvgPrice,
        priceDifference,
        pricingStatus: priceDifference <= -10 ? "below" : priceDifference >= 10 ? "above" : "average",
        similarCompanies: Math.floor(Math.random() * 50) + 20,
        potentialSavings: priceDifference > 0 ? (saas.price - industryAvgPrice) : 0
      }
    };
  });
  
  // Calculate total potential savings
  const totalPotentialSavings = benchmarkData.reduce((sum, saas) => {
    return sum + (saas.benchmarking.potentialSavings || 0);
  }, 0);
  
  // Count items in each pricing status
  const aboveMarketCount = benchmarkData.filter(saas => saas.benchmarking.pricingStatus === "above").length;
  const averageMarketCount = benchmarkData.filter(saas => saas.benchmarking.pricingStatus === "average").length;
  const belowMarketCount = benchmarkData.filter(saas => saas.benchmarking.pricingStatus === "below").length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Price Benchmarking</h1>
            <p className="text-muted-foreground">
              Compare your SaaS pricing against industry averages and identify savings opportunities
            </p>
          </div>
          <Card className="w-full md:w-auto">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Potential Savings</p>
                  <p className="text-xl font-bold text-green-600">
                    {formatCurrency(totalPotentialSavings)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <p className="font-medium">Above Market Price</p>
                <Badge className="bg-red-100 text-red-800">{aboveMarketCount}</Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <p className="font-medium">At Market Price</p>
                <Badge className="bg-blue-100 text-blue-800">{averageMarketCount}</Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <p className="font-medium">Below Market Price</p>
                <Badge className="bg-green-100 text-green-800">{belowMarketCount}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <CardTitle>SaaS Price Benchmarking</CardTitle>
                <CardDescription>
                  Compare your SaaS contracts against industry averages
                </CardDescription>
              </div>
              <div className="flex flex-col md:flex-row gap-2 mt-2 md:mt-0">
                <div className="relative w-full md:w-[180px]">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search" 
                    className="pl-8 h-9" 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
                <select
                  className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <BenchmarkingTable benchmarkData={benchmarkData} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Benchmarking;
