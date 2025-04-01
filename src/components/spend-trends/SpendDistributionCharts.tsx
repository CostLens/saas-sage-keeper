
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
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
import { SaaSData } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";

interface SpendDistributionChartsProps {
  saasData: SaaSData[];
}

export const SpendDistributionCharts = ({ saasData }: SpendDistributionChartsProps) => {
  // Generate data for the spend by tool chart
  const spendByTool = saasData.map(saas => ({
    name: saas.name,
    value: saas.price
  })).sort((a, b) => b.value - a.value);
  
  // Updated spend by category data with more realistic values
  const spendByCategory = [
    { name: "CRM", value: 35000, color: "#0088FE" },
    { name: "Communication", value: 28000, color: "#00C49F" },
    { name: "Marketing", value: 22000, color: "#FFBB28" },
    { name: "Project Management", value: 18000, color: "#FF8042" },
    { name: "IT Infrastructure", value: 15000, color: "#A28CFF" }
  ];

  return (
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
                    <Cell key={`cell-${index}`} fill={entry.color} />
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
  );
};
