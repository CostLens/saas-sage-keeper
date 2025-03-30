
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SaaSData } from "@/lib/mockData";

interface RenewalStatusCardsProps {
  renewalContracts: SaaSData[];
}

export function RenewalStatusCards({ renewalContracts }: RenewalStatusCardsProps) {
  // Renewal workflow statuses
  const workflowStatuses = [
    { name: "Due in 30 Days", count: renewalContracts.filter(c => {
      const renewalDate = new Date(c.renewalDate);
      const now = new Date();
      const days = Math.floor((renewalDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return days <= 30 && days >= 0;
    }).length, color: "bg-red-100 text-red-800" },
    { name: "Due in 60 Days", count: renewalContracts.filter(c => {
      const renewalDate = new Date(c.renewalDate);
      const now = new Date();
      const days = Math.floor((renewalDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return days <= 60 && days > 30;
    }).length, color: "bg-amber-100 text-amber-800" },
    { name: "Due in 90 Days", count: renewalContracts.filter(c => {
      const renewalDate = new Date(c.renewalDate);
      const now = new Date();
      const days = Math.floor((renewalDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return days <= 90 && days > 60;
    }).length, color: "bg-blue-100 text-blue-800" },
    { name: "Optimization Opportunities", count: renewalContracts.filter(saas => {
      return saas.usage.utilizationRate < 80 && saas.pricingTerms === 'User-based';
    }).length, color: "bg-green-100 text-green-800" }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {workflowStatuses.map((status, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <p className="font-medium">{status.name}</p>
              <Badge className={status.color}>{status.count}</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
