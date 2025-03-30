
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export function RenewalStrategySection() {
  // Mock renewal actions
  const renewalActions = [
    {
      title: "Cost Optimization",
      description: "Reduce costs by optimizing licenses",
      steps: [
        "Review utilization rates across all licenses",
        "Identify unused or underutilized licenses",
        "Downgrade or remove excess licenses",
        "Negotiate volume discounts based on actual usage"
      ]
    },
    {
      title: "Vendor Negotiation",
      description: "Strategic approach for better terms",
      steps: [
        "Collect competitive market pricing data",
        "Prepare negotiation strategy with fallback options",
        "Schedule negotiation meeting with vendor",
        "Document all commitments and new terms"
      ]
    },
    {
      title: "Contract Analysis",
      description: "Evaluate terms and conditions",
      steps: [
        "Review auto-renewal clauses and termination rights",
        "Analyze price increase limitations",
        "Evaluate service level agreements (SLAs)",
        "Check support and maintenance terms"
      ]
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Renewal Strategy Framework</CardTitle>
        <CardDescription>Recommended actions for successful renewals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {renewalActions.map((action, index) => (
            <Card key={index} className="bg-muted/40">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{action.title}</CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-5 text-sm space-y-1">
                  {action.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
