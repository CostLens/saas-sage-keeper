
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CreditCard } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export function SubscriptionTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Details</CardTitle>
        <CardDescription>
          Manage your subscription and billing information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Current Plan</h4>
              <p className="text-sm text-muted-foreground">Enterprise</p>
            </div>
            <Button variant="outline">Change Plan</Button>
          </div>
          <Separator />
          <div className="space-y-2">
            <h4 className="font-medium">Billing Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Next billing date</p>
                <p className="text-sm text-muted-foreground">
                  March 1, 2024
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Amount</p>
                <p className="text-sm text-muted-foreground">$499/month</p>
              </div>
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <h4 className="font-medium">Payment Method</h4>
            <div className="flex items-center space-x-4">
              <CreditCard className="h-6 w-6" />
              <div>
                <p className="text-sm font-medium">Visa ending in 4242</p>
                <p className="text-sm text-muted-foreground">
                  Expires 12/2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
