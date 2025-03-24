
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Sample data for total licenses vs unused licenses
const data = [
  { name: "Slack", totalLicenses: 250, unusedLicenses: 45 },
  { name: "Office 365", totalLicenses: 500, unusedLicenses: 75 },
  { name: "Zoom", totalLicenses: 200, unusedLicenses: 62 },
  { name: "Adobe CC", totalLicenses: 100, unusedLicenses: 28 },
  { name: "Salesforce", totalLicenses: 150, unusedLicenses: 32 },
  { name: "Jira", totalLicenses: 175, unusedLicenses: 41 },
  { name: "Asana", totalLicenses: 120, unusedLicenses: 37 },
];

const LicenseUtilizationChart = () => {
  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle>License Utilization Analysis</CardTitle>
        <CardDescription>Comparing total licenses with unused licenses across applications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalLicenses" name="Total Licenses" fill="#8884d8" />
              <Bar dataKey="unusedLicenses" name="Unused Licenses" fill="#ff8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LicenseUtilizationChart;
