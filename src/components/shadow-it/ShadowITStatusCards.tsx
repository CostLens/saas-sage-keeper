
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Eye, Grid2X2 } from "lucide-react";

interface ShadowITStatusCardsProps {
  total: number;
  unmanaged: number;
  risky: number;
}

export function ShadowITStatusCards({ total, unmanaged, risky }: ShadowITStatusCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 border-blue-200 dark:border-blue-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
            <Grid2X2 className="h-4 w-4 mr-2 text-blue-500" />
            Total Shadow IT Apps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total}</div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/50 dark:to-amber-900/30 border-amber-200 dark:border-amber-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
            <Eye className="h-4 w-4 mr-2 text-amber-500" />
            Unmanaged Apps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{unmanaged}</div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/30 border-red-200 dark:border-red-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
            High Risk Apps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{risky}</div>
        </CardContent>
      </Card>
    </div>
  );
}
