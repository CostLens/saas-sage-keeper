
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Shield, AlertCircle, Users } from "lucide-react";
import { ShadowITData } from "@/hooks/useShadowITData";

interface ShadowITStatusCardsProps {
  shadowITData: ShadowITData[];
}

export function ShadowITStatusCards({ shadowITData }: ShadowITStatusCardsProps) {
  // Calculate statistics
  const highRiskCount = shadowITData.filter(app => app.riskLevel === "High").length;
  const mediumRiskCount = shadowITData.filter(app => app.riskLevel === "Medium").length;
  const lowRiskCount = shadowITData.filter(app => app.riskLevel === "Low").length;
  const totalUsers = shadowITData.reduce((sum, app) => sum + app.usersCount, 0);
  
  const statusCards = [
    {
      title: "High Risk Apps",
      value: highRiskCount,
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
      bgColor: "bg-red-50 dark:bg-red-950/30",
      textColor: "text-red-700 dark:text-red-400"
    },
    {
      title: "Medium Risk Apps",
      value: mediumRiskCount,
      icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
      bgColor: "bg-amber-50 dark:bg-amber-950/30",
      textColor: "text-amber-700 dark:text-amber-400"
    },
    {
      title: "Low Risk Apps",
      value: lowRiskCount,
      icon: <Shield className="h-5 w-5 text-green-500" />,
      bgColor: "bg-green-50 dark:bg-green-950/30",
      textColor: "text-green-700 dark:text-green-400"
    },
    {
      title: "Total Users",
      value: totalUsers,
      icon: <Users className="h-5 w-5 text-blue-500" />,
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
      textColor: "text-blue-700 dark:text-blue-400"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {statusCards.map((card, index) => (
        <Card key={index} className={`${card.bgColor} border-0 shadow-sm`}>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </p>
                <p className={`text-2xl font-bold ${card.textColor}`}>
                  {card.value}
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm">
                {card.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
