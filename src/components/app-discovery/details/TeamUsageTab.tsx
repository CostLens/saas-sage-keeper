
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppDiscoveryData } from '@/hooks/useAppDiscoveryData';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface TeamUsageTabProps {
  app: AppDiscoveryData;
}

// Mock team usage data
const mockTeamUsage = [
  { team: "Engineering", activeUsers: 42, totalLicenses: 50, usage: 84 },
  { team: "Marketing", activeUsers: 18, totalLicenses: 25, usage: 72 },
  { team: "Sales", activeUsers: 28, totalLicenses: 30, usage: 93 },
  { team: "Design", activeUsers: 12, totalLicenses: 15, usage: 80 },
  { team: "Product", activeUsers: 15, totalLicenses: 20, usage: 75 },
  { team: "Customer Support", activeUsers: 22, totalLicenses: 30, usage: 73 },
  { team: "Finance", activeUsers: 8, totalLicenses: 10, usage: 80 },
  { team: "HR", activeUsers: 6, totalLicenses: 10, usage: 60 },
];

// Chart data transformation
const teamChartData = mockTeamUsage.map(item => ({
  name: item.team,
  activeUsers: item.activeUsers,
  totalLicenses: item.totalLicenses
}));

export function TeamUsageTab({ app }: TeamUsageTabProps) {
  // Get usage color based on percentage
  const getUsageColor = (usage: number) => {
    if (usage >= 80) return "bg-green-500";
    if (usage >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Team Usage Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={teamChartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="activeUsers" name="Active Users" fill="#82ca9d" />
                <Bar dataKey="totalLicenses" name="Total Licenses" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team License Utilization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTeamUsage.map((team) => (
              <div key={team.team} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{team.team}</span>
                  <span className="font-medium">{team.activeUsers} of {team.totalLicenses} ({team.usage}%)</span>
                </div>
                <Progress
                  value={team.usage}
                  className="h-2"
                  indicatorClassName={getUsageColor(team.usage)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
