
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface CriticalityCardProps {
  criticality: number;
}

export function CriticalityCard({ criticality }: CriticalityCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Product Criticality</h3>
            <div className="text-2xl font-bold">{criticality}%</div>
          </div>
          
          <div className="relative h-32 w-32 mx-auto">
            <div className="absolute inset-0 rounded-full border-8 border-gray-100"></div>
            <div 
              className="absolute inset-0 rounded-full border-8 border-blue-500" 
              style={{ 
                clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(criticality * 0.01 * 2 * Math.PI)}% ${50 - 50 * Math.sin(criticality * 0.01 * 2 * Math.PI)}%, ${criticality > 75 ? '100% 0, 100% 50%' : ''})` 
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">{criticality}%</span>
            </div>
          </div>
          
          <p className="text-center text-sm text-muted-foreground">
            Consider this product<br />critical to their work
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
