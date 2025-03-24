
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { mockSaaSData } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import LicenseUtilizationChart from "@/components/charts/LicenseUtilizationChart";
import { UsageOverviewCards } from "@/components/usage/UsageOverviewCards";
import { UtilizationCategories } from "@/components/usage/UtilizationCategories";
import { calculateUsageStatistics, categorizeAppsByUsage } from "@/components/usage/UsageAnalyticsHelpers";
import { toast } from "sonner";
import { 
  Calendar, 
  Download, 
  Filter, 
  Search, 
  SlidersHorizontal
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

const Usage = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });
  
  const [timeRange, setTimeRange] = useState<"30days" | "90days" | "6months" | "1year" | "custom">("30days");
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date()
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<"all" | "high" | "optimal" | "low">("all");
  
  useEffect(() => {
    const handleSidebarChange = (event: CustomEvent) => {
      setIsSidebarCollapsed(event.detail.isCollapsed);
    };
    
    window.addEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    
    return () => {
      window.removeEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    };
  }, []);

  useEffect(() => {
    const today = new Date();
    let fromDate = new Date();
    
    switch (timeRange) {
      case "30days":
        fromDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
        break;
      case "90days":
        fromDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 90);
        break;
      case "6months":
        fromDate = new Date(today.getFullYear(), today.getMonth() - 6, today.getDate());
        break;
      case "1year":
        fromDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
        break;
      case "custom":
        // Keep existing custom date range
        return;
    }
    
    setDateRange({
      from: fromDate,
      to: new Date()
    });
  }, [timeRange]);

  const filteredData = mockSaasData.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterCategory === "all") return matchesSearch;
    
    const utilizationRate = app.usage.totalLicenses ? (app.usage.activeUsers / app.usage.totalLicenses) * 100 : 0;
    
    if (filterCategory === "high") return matchesSearch && utilizationRate > 90;
    if (filterCategory === "optimal") return matchesSearch && utilizationRate >= 50 && utilizationRate <= 90;
    if (filterCategory === "low") return matchesSearch && utilizationRate < 50;
    
    return matchesSearch;
  });

  const { totalLicenses, activeUsers, unusedLicenses, utilizationRate } = calculateUsageStatistics(filteredData);
  
  const { highUsageApps, optimalUsageApps, lowUsageApps } = categorizeAppsByUsage(filteredData);

  const handleExport = () => {
    const headers = ["Application", "Total Licenses", "Active Users", "Utilization Rate", "Renewal Date", "Cost/Month"];
    const csvRows = filteredData.map(app => [
      app.name,
      app.usage.totalLicenses || 0,
      app.usage.activeUsers,
      app.usage.totalLicenses ? Math.round((app.usage.activeUsers / app.usage.totalLicenses) * 100) + "%" : "N/A",
      app.renewalDate,
      "$" + app.price
    ]);
    
    const csvContent = [headers.join(","), ...csvRows.map(row => row.join(","))].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `usage-report-${format(new Date(), "yyyy-MM-dd")}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Usage report exported successfully");
  };

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
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>

          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search applications..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="timeRange" className="whitespace-nowrap">Time Range:</Label>
                    <Select
                      value={timeRange}
                      onValueChange={(value) => setTimeRange(value as any)}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30days">Last 30 days</SelectItem>
                        <SelectItem value="90days">Last 90 days</SelectItem>
                        <SelectItem value="6months">Last 6 months</SelectItem>
                        <SelectItem value="1year">Last year</SelectItem>
                        <SelectItem value="custom">Custom range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {timeRange === "custom" && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="h-10">
                          <Calendar className="mr-2 h-4 w-4" />
                          {dateRange.from ? (
                            dateRange.to ? (
                              <>
                                {format(dateRange.from, "LLL dd, y")} -{" "}
                                {format(dateRange.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(dateRange.from, "LLL dd, y")
                            )
                          ) : (
                            "Pick a date"
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="end">
                        <CalendarComponent
                          mode="range"
                          selected={{
                            from: dateRange.from,
                            to: dateRange.to,
                          }}
                          onSelect={(range) => {
                            if (range?.from && range?.to) {
                              setDateRange({
                                from: range.from,
                                to: range.to,
                              });
                            }
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="category" className="whitespace-nowrap">Category:</Label>
                    <Select
                      value={filterCategory}
                      onValueChange={(value) => setFilterCategory(value as any)}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="All categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All categories</SelectItem>
                        <SelectItem value="high">High utilization</SelectItem>
                        <SelectItem value="optimal">Optimal utilization</SelectItem>
                        <SelectItem value="low">Low utilization</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <UsageOverviewCards 
            utilizationRate={utilizationRate}
            activeUsers={activeUsers}
            totalLicenses={totalLicenses}
            unusedLicenses={unusedLicenses}
            lowUsageAppsCount={lowUsageApps.length}
          />

          <LicenseUtilizationChart />

          <UtilizationCategories 
            highUsageApps={highUsageApps}
            optimalUsageApps={optimalUsageApps}
            lowUsageApps={lowUsageApps}
          />
        </main>
      </div>
    </div>
  );
};

export default Usage;
