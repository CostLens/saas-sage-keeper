
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface RatingDistributionProps {
  ratingDistribution: Array<{
    rating: number;
    percentage: number;
  }>;
}

export function RatingDistribution({ ratingDistribution }: RatingDistributionProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-semibold mb-4">Rating Distribution</h3>
        <div className="space-y-2">
          {ratingDistribution.map(item => (
            <div key={item.rating} className="flex items-center gap-2">
              <div className="w-8 text-right">{item.rating}</div>
              <Progress value={item.percentage} className="h-6" />
              <div className="w-8 text-left">{item.percentage}%</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
