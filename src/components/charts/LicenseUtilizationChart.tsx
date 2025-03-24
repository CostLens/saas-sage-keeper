
import React from "react";
import { mockSaasData } from "@/lib/mockData";
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Cell, 
  ComposedChart,
  Legend, 
  Line,
  LineChart,
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const LicenseUtilizationChart = () => {
  // Generate utilization data for the chart
  const utilizationData = mockSaasData
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

  // Colors
  const colors = {
    active: "hsl(var(--primary))",
    unused: "hsl(var(--muted-foreground))"
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
        <Tabs defaultValue="apps">
          <TabsList className="mb-4">
            <TabsTrigger value="apps">By Application</TabsTrigger>
            <TabsTrigger value="time">Over Time</TabsTrigger>
          </TabsList>
          
          <TabsContent value="apps" className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={utilizationData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 120,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  tick={{ fontSize: 12 }}
                />
                <YAxis yAxisId="left" orientation="left" label={{ value: 'Licenses', angle: -90, position: 'insideLeft' }} />
                <YAxis yAxisId="right" orientation="right" label={{ value: 'Utilization %', angle: 90, position: 'insideRight' }} />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === "utilizationRate") return [`${value}%`, "Utilization Rate"];
                    return [value, name === "activeUsers" ? "Active Users" : name === "unusedLicenses" ? "Unused Licenses" : "Total Licenses"];
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="activeUsers" stackId="a" fill={colors.active} name="Active Users" />
                <Bar yAxisId="left" dataKey="unusedLicenses" stackId="a" fill={colors.unused} name="Unused Licenses" />
                <Line yAxisId="right" type="monotone" dataKey="utilizationRate" stroke="#ff7300" name="Utilization Rate" />
              </ComposedChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="time" className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
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
                <YAxis yAxisId="left" orientation="left" label={{ value: 'Licenses', angle: -90, position: 'insideLeft' }} />
                <YAxis yAxisId="right" orientation="right" label={{ value: 'Utilization %', angle: 90, position: 'insideRight' }} />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === "utilizationRate") return [`${value}%`, "Utilization Rate"];
                    return [value, name === "activeUsers" ? "Active Users" : name === "unusedLicenses" ? "Unused Licenses" : "Total Licenses"];
                  }}
                />
                <Legend />
                <Area yAxisId="left" type="monotone" dataKey="activeUsers" stackId="1" stroke={colors.active} fill={colors.active} fillOpacity={0.8} name="Active Users" />
                <Area yAxisId="left" type="monotone" dataKey="unusedLicenses" stackId="1" stroke={colors.unused} fill={colors.unused} fillOpacity={0.3} name="Unused Licenses" />
                <Line yAxisId="right" type="monotone" dataKey="utilizationRate" stroke="#ff7300" strokeWidth={2} name="Utilization Rate" />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LicenseUtilizationChart;
