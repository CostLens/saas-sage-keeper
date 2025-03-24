
import React from "react";
import { mockSaaSData } from "@/lib/mockData";
import { 
  BarChart, 
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  Legend,
  CartesianGrid
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const LicenseUtilizationChart = () => {
  // Generate utilization data for the chart
  const utilizationData = mockSaaSData
    .filter(app => app.usage.totalLicenses && app.usage.totalLicenses > 0)
    .map(app => ({
      name: app.name,
      totalLicenses: app.usage.totalLicenses || 0,
      activeUsers: app.usage.activeUsers,
      unusedLicenses: (app.usage.totalLicenses || 0) - app.usage.activeUsers,
      utilizationRate: Math.round((app.usage.activeUsers / (app.usage.totalLicenses || 1)) * 100)
    }))
    .sort((a, b) => b.utilizationRate - a.utilizationRate);

  // Generate time-based usage trend data (last 6 months)
  const generateTimeSeriesData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map(month => {
      // Base total value
      const totalLicenses = mockSaasData.reduce(
        (sum, app) => sum + (app.usage.totalLicenses || 0), 0
      );
      
      // Random variation for active users (with a general upward trend)
      const randomFactor = 0.85 + (months.indexOf(month) * 0.02) + (Math.random() * 0.05);
      const activeUsers = Math.round(totalLicenses * randomFactor);
      const unusedLicenses = totalLicenses - activeUsers;
      
      return {
        month,
        totalLicenses,
        activeUsers,
        unusedLicenses,
        utilizationRate: Math.round((activeUsers / totalLicenses) * 100)
      };
    });
  };
  
  const timeSeriesData = generateTimeSeriesData();

  // Generate overview data for pie chart
  const overviewData = [
    { name: 'Active Licenses', value: mockSaasData.reduce((sum, app) => sum + app.usage.activeUsers, 0) },
    { name: 'Unused Licenses', value: mockSaasData.reduce((sum, app) => sum + ((app.usage.totalLicenses || 0) - app.usage.activeUsers), 0) }
  ];

  // Colors
  const colors = {
    active: "#4ade80", // green-400
    unused: "#94a3b8", // slate-400
    utilization: "#3b82f6", // blue-500
    piePalette: ["#4ade80", "#94a3b8"] // green and slate
  };

  // Format number with comma separator
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle>License Utilization</CardTitle>
        <CardDescription>
          Breakdown of license utilization across applications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="apps">By Application</TabsTrigger>
            <TabsTrigger value="time">Over Time</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="h-[400px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={overviewData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {overviewData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors.piePalette[index % colors.piePalette.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${formatNumber(value as number)} licenses`, '']}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col justify-center space-y-6">
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium mb-2">License Utilization Summary</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Total Licenses:</span>
                      <span className="font-medium">{formatNumber(overviewData[0].value + overviewData[1].value)}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Active Licenses:</span>
                      <span className="font-medium text-green-600">{formatNumber(overviewData[0].value)}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Unused Licenses:</span>
                      <span className="font-medium text-slate-500">{formatNumber(overviewData[1].value)}</span>
                    </li>
                    <li className="flex justify-between border-t pt-2 mt-2">
                      <span className="text-muted-foreground">Overall Utilization:</span>
                      <span className="font-medium">
                        {Math.round((overviewData[0].value / (overviewData[0].value + overviewData[1].value)) * 100)}%
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="apps" className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={utilizationData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 80,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  yAxisId="left" 
                  orientation="left" 
                  tickFormatter={(value) => formatNumber(value)}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === "utilizationRate") return [`${value}%`, "Utilization Rate"];
                    return [formatNumber(value as number), name === "activeUsers" ? "Active Users" : "Unused Licenses"];
                  }}
                  labelFormatter={(label) => `Application: ${label}`}
                />
                <Legend />
                <Bar 
                  yAxisId="left" 
                  dataKey="activeUsers" 
                  name="Active Users" 
                  fill={colors.active} 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  yAxisId="left" 
                  dataKey="unusedLicenses" 
                  name="Unused Licenses" 
                  fill={colors.unused} 
                  radius={[4, 4, 0, 0]}
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="utilizationRate" 
                  name="Utilization Rate (%)" 
                  stroke={colors.utilization} 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="time" className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={timeSeriesData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" />
                <YAxis 
                  yAxisId="left" 
                  orientation="left" 
                  tickFormatter={(value) => formatNumber(value)} 
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === "utilizationRate") return [`${value}%`, "Utilization Rate"];
                    return [formatNumber(value as number), name === "activeUsers" ? "Active Users" : name === "unusedLicenses" ? "Unused Licenses" : "Total Licenses"];
                  }}
                />
                <Legend />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="activeUsers" 
                  name="Active Users" 
                  stroke={colors.active} 
                  strokeWidth={2}
                  dot={{ fill: colors.active, r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="unusedLicenses" 
                  name="Unused Licenses" 
                  stroke={colors.unused} 
                  strokeWidth={2}
                  dot={{ fill: colors.unused, r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="utilizationRate" 
                  name="Utilization Rate (%)" 
                  stroke={colors.utilization} 
                  strokeWidth={2}
                  dot={{ fill: colors.utilization, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LicenseUtilizationChart;
