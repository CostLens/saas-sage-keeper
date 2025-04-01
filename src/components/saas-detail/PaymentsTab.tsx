
import React from "react";
import { SaaSData, generatePaymentTrendData } from "@/lib/mockData";
import { TrendChart } from "@/components/ui/trend-chart";
import { Badge } from "@/components/ui/badge";
import { DollarSign } from "lucide-react";

interface PaymentsTabProps {
  saas: SaaSData;
}

export function PaymentsTab({ saas }: PaymentsTabProps) {
  // Generate chart data
  const paymentData = generatePaymentTrendData(saas.id);
  
  return (
    <div className="space-y-4">
      <div className="bg-muted/30 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Recent Payments</h3>
        <div className="space-y-4">
          {paymentData.slice(-5).reverse().map((payment, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-3 rounded-md bg-background/50 border"
            >
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">${payment.amount.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">{payment.name} payment</p>
                </div>
              </div>
              <Badge variant="outline" className="text-green-500">Paid</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
