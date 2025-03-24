
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

export function SecurityTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription>
          Manage your security settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium">Change Password</h4>
          <Button>Update Password</Button>
        </div>
        <Separator />
        <div className="space-y-2">
          <h4 className="font-medium">Two-Factor Authentication</h4>
          <Button variant="outline">Enable 2FA</Button>
        </div>
      </CardContent>
    </Card>
  );
}
