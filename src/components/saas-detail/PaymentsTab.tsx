
import React from "react";
import { SaaSData, generatePaymentTrendData } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface PaymentsTabProps {
  saas: SaaSData;
}

export function PaymentsTab({ saas }: PaymentsTabProps) {
  // Generate chart data
  const paymentData = generatePaymentTrendData(saas.id);
  
  return (
    <div className="space-y-4">
      <Card className="bg-muted/30 rounded-lg">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Payment History</CardTitle>
          <CardDescription>Recent payments for this application</CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
}
