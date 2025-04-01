
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { SaaSData } from "@/lib/mockData";

interface KeyStatsProps {
  saasData: SaaSData[];
}

export const KeyStats = ({ saasData }: KeyStatsProps) => {
  // Calculate total annual spend
  const totalSpend = saasData.reduce((acc, curr) => acc + curr.price, 0);

  return (
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
          <CardTitle className="text-2xl">{formatCurrency(totalSpend / saasData.length)}</CardTitle>
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
  );
};
