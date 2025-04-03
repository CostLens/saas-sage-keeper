
import React from "react";
import { AppDiscoveryData } from "@/hooks/useAppDiscoveryData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, BarChart, CreditCard } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface RecommendationsTabProps {
  app: AppDiscoveryData;
}

export function RecommendationsTab({ app }: RecommendationsTabProps) {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-md">
              <Users className="h-5 w-5 text-blue-700 dark:text-blue-300" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-800 dark:text-blue-300">License Optimization</h3>
              <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                You can save approximately {formatCurrency(app.totalPayments * 0.2)} by removing {Math.round(app.averageUsage * 0.2)} unused licenses.
              </p>
              <div className="mt-3">
                <Button className="bg-blue-600 hover:bg-blue-700">Optimize Licenses</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-md">
              <BarChart className="h-5 w-5 text-purple-700 dark:text-purple-300" />
            </div>
            <div>
              <h3 className="font-semibold text-purple-800 dark:text-purple-300">Feature Adoption</h3>
              <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">
                Increase feature adoption by scheduling training sessions for underutilized features like API Integration 
                and Automation that have less than 50% usage.
              </p>
              <div className="mt-3">
                <Button className="bg-purple-600 hover:bg-purple-700">Schedule Training</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-800 rounded-md">
              <CreditCard className="h-5 w-5 text-green-700 dark:text-green-300" />
            </div>
            <div>
              <h3 className="font-semibold text-green-800 dark:text-green-300">Contract Negotiation</h3>
              <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                Your contract renewal is coming up in {app.renewalDate ? Math.ceil((new Date(app.renewalDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) : 90} days. 
                Based on your usage patterns, you could negotiate a better rate and save up to {formatCurrency(app.totalPayments * 0.15)} annually.
              </p>
              <div className="mt-3">
                <Button className="bg-green-600 hover:bg-green-700">Prepare for Negotiation</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Additional Recommendations</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 border rounded-md">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Downgrade Plan</h4>
                <p className="text-sm text-muted-foreground">
                  Consider downgrading to a lower-tier plan since premium features aren't being fully utilized.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 border rounded-md">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Consolidate Teams</h4>
                <p className="text-sm text-muted-foreground">
                  Marketing team shows low usage. Consider consolidating their access with another department.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 border rounded-md">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Recurring Training</h4>
                <p className="text-sm text-muted-foreground">
                  Set up monthly training sessions to improve adoption of underutilized features.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
