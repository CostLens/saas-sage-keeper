
import React from "react";
import { AppDiscoveryData } from "@/hooks/useAppDiscoveryData";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart } from "lucide-react";

interface TeamsTabProps {
  app: AppDiscoveryData;
}

export function TeamsTab({ app }: TeamsTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Team Distribution</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>Engineering</span>
              </div>
              <span className="font-medium">{Math.round(app.averageUsage * 0.4)} users</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Sales</span>
              </div>
              <span className="font-medium">{Math.round(app.averageUsage * 0.3)} users</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span>Marketing</span>
              </div>
              <span className="font-medium">{Math.round(app.averageUsage * 0.2)} users</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span>Product</span>
              </div>
              <span className="font-medium">{Math.round(app.averageUsage * 0.1)} users</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Team Activity</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Engineering</span>
                <span>Active Daily</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Sales</span>
                <span>Active Weekly</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Marketing</span>
                <span>Active Monthly</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Product</span>
                <span>Inactive</span>
              </div>
              <Progress value={10} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Team Usage Trends</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Engineering</h4>
                <BarChart className="h-4 w-4 text-blue-500" />
              </div>
              <p className="text-3xl font-bold text-blue-500">+12%</p>
              <p className="text-sm text-muted-foreground">vs. last month</p>
            </div>
            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Sales</h4>
                <BarChart className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-green-500">+5%</p>
              <p className="text-sm text-muted-foreground">vs. last month</p>
            </div>
            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Marketing</h4>
                <BarChart className="h-4 w-4 text-red-500" />
              </div>
              <p className="text-3xl font-bold text-red-500">-3%</p>
              <p className="text-sm text-muted-foreground">vs. last month</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
