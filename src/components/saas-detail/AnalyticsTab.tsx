
import React from "react";
import { TrendChart } from "@/components/ui/trend-chart";
import { SaaSData, generatePaymentTrendData } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DollarSign } from "lucide-react";

interface AnalyticsTabProps {
  saas: SaaSData;
}

export function AnalyticsTab({ saas }: AnalyticsTabProps) {
  // Generate chart data
  const paymentData = generatePaymentTrendData(saas.id);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Spend Trend Chart */}
      <TrendChart
        title="Spend Trend"
        description="Monthly spend for this application"
        data={paymentData}
        dataKey="name"
        categories={["amount"]}
        colors={["hsl(var(--primary))"]}
        valueFormatter={(value) => `$${value.toFixed(2)}`}
        height={300}
      />
      
      {/* Payment History */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-xl">Payment History</CardTitle>
            <CardDescription>
              Recent payment transactions
            </CardDescription>
          </div>
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
