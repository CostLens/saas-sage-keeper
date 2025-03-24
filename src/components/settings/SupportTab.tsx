
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export function SupportTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Support</CardTitle>
        <CardDescription>
          Get help and support
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium">Documentation</h4>
          <p className="text-sm text-muted-foreground">
            View our documentation to learn more about our features
          </p>
          <Button variant="outline">View Documentation</Button>
        </div>
        <Separator />
        <div className="space-y-2">
          <h4 className="font-medium">Contact Support</h4>
          <p className="text-sm text-muted-foreground">
            Get in touch with our support team
          </p>
          <Button>Contact Support</Button>
        </div>
      </CardContent>
    </Card>
  );
}
