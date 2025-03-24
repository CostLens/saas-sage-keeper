
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { TrendChart } from "@/components/ui/trend-chart";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart,
  Bar,
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Legend,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { 
  Calendar, 
  Download, 
  Filter,
  TrendingUp, 
  PieChartIcon,
  BarChart3
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockSaasData, generateSpendByCategory } from "@/lib/mockData";
import SpendAnalyticsChart from "@/components/charts/SpendAnalyticsChart";

const SpendTrends = () => {
  // Track sidebar collapsed state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });
  
  // Listen for sidebar state changes
  useEffect(() => {
    const handleSidebarChange = (event: CustomEvent) => {
      setIsSidebarCollapsed(event.detail.isCollapsed);
    };
    
    window.addEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    
    return () => {
      window.removeEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    };
  }, []);

  // Calculate total annual spend
  const totalSpend = mockSaasData.reduce((acc, curr) => acc + curr.price, 0);
  
  // Generate data for the spend by tool chart
  const spendByTool = mockSaasData.map(saas => ({
    name: saas.name,
    value: saas.price
  })).sort((a, b) => b.value - a.value);
  
  // Generate monthly spend data
  const generateMonthlySpendData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months.map(month => {
      // Base value with some randomness to simulate monthly fluctuations
      const baseValue = totalSpend / 12;
      const variance = baseValue * 0.2; // 20% variance
      const value = baseValue + (Math.random() * variance * 2 - variance);
      
      return {
        name: month,
        amount: Math.round(value)
      };
    });
  };
  
  const monthlySpendData = generateMonthlySpendData();
  
  // Get spend by category data
  const spendByCategory = generateSpendByCategory();

  // Chart colors
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CFF'];

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className={`flex-1 flex flex-col ${isSidebarCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
        <Header />
        <main className="flex-1 p-6 space-y-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Spend Trends</h1>
            <div className="flex gap-4">
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                2023-2024
              </Button>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-panel glass-panel-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">{formatCurrency(totalSpend)}</CardTitle>
                <CardDescription>Total Annual SaaS Spend</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm flex items-center text-red-500">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>12% increase from last year</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-panel glass-panel-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">{formatCurrency(totalSpend / 12)}</CardTitle>
                <CardDescription>Average Monthly Spend</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm flex items-center text-amber-500">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>3% increase MoM</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-panel glass-panel-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">{formatCurrency(totalSpend / mockSaasData.length)}</CardTitle>
                <CardDescription>Average Cost per SaaS</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm flex items-center text-green-500">
                  <TrendingUp className="h-4 w-4 mr-1 transform rotate-180" />
                  <span>5% decrease from last quarter</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cost vs Spend Chart */}
          <SpendAnalyticsChart />

          {/* Monthly Spend Chart */}
          <div className="grid grid-cols-1 gap-6">
            <TrendChart
              title="Monthly SaaS Spend"
              description="Total spend on SaaS tools by month"
              data={monthlySpendData}
              dataKey="name"
              categories={["amount"]}
              colors={["hsl(var(--primary))"]}
              valueFormatter={(value) => formatCurrency(value)}
              height={300}
            />
          </div>

          {/* Spend Distribution Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-panel">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <PieChartIcon className="h-5 w-5" />
                    Spend by Category
                  </CardTitle>
                  <CardDescription>
                    SaaS spend distribution across categories
                  </CardDescription>
                </div>
                <Select defaultValue="value">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Show by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="value">By Value</SelectItem>
                    <SelectItem value="percentage">By Percentage</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={spendByCategory}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {spendByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => formatCurrency(value)}
                        contentStyle={{ 
                          borderRadius: '8px',
                          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                          border: '1px solid var(--border)'
                        }} 
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-panel">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Top SaaS by Spend
                  </CardTitle>
                  <CardDescription>
                    Highest spending SaaS applications
                  </CardDescription>
                </div>
                <Select defaultValue="5">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Show top" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">Top 5</SelectItem>
                    <SelectItem value="10">Top 10</SelectItem>
                    <SelectItem value="all">All</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={spendByTool.slice(0, 5)}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
                    >
                      <XAxis type="number" tickFormatter={(value) => formatCurrency(value)} />
                      <YAxis type="category" dataKey="name" width={100} />
                      <Tooltip 
                        formatter={(value: number) => formatCurrency(value)}
                        contentStyle={{ 
                          borderRadius: '8px',
                          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                          border: '1px solid var(--border)'
                        }}
                      />
                      <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SpendTrends;
