
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NPSCardProps {
  netPromoterScore: number;
  respondents: number;
  breakdown: {
    detractors: { count: number, percentage: number };
    passives: { count: number, percentage: number };
    promoters: { count: number, percentage: number };
  };
}

export function NPSCard({ netPromoterScore, respondents, breakdown }: NPSCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Net Promoter Score</h3>
            <Badge variant={netPromoterScore > 0 ? "success" : "destructive"}>
              {netPromoterScore}
            </Badge>
          </div>
          
          <div className="relative h-16 overflow-hidden rounded-full">
            <div className="absolute inset-0 flex">
              <div className="bg-red-500 h-full flex-grow" style={{ flex: breakdown.detractors.percentage }}></div>
              <div className="bg-gray-300 h-full flex-grow" style={{ flex: breakdown.passives.percentage }}></div>
              <div className="bg-green-500 h-full flex-grow" style={{ flex: breakdown.promoters.percentage }}></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-white drop-shadow-md">{netPromoterScore}</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            Net Promoter Score<br />
            Based on {respondents} responses
          </p>

          <div className="flex justify-between gap-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span>Detractors {breakdown.detractors.count} ({breakdown.detractors.percentage}%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
              <span>Passives {breakdown.passives.count} ({breakdown.passives.percentage}%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span>Promoters {breakdown.promoters.count} ({breakdown.promoters.percentage}%)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
