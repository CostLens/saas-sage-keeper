
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function GeneralSettingsTab() {
  return (
    <div className="space-y-6">
      {/* Personal Details */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Personal Details</h3>
          <p className="text-sm text-muted-foreground">
            Update your personal information
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" defaultValue="Kanav" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" defaultValue="Hasija" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="workEmail">Work Email</Label>
            <Input
              id="workEmail"
              type="email"
              defaultValue="kanav.hasija@innovaccer.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="team">Team</Label>
            <Input id="team" defaultValue="Product" />
          </div>
        </div>
        <Button type="submit">Save Personal Details</Button>
      </div>

      <Separator className="my-6" />

      {/* Company Details */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Company Details</h3>
          <p className="text-sm text-muted-foreground">
            Manage your company profile and information
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input id="companyName" defaultValue="Acme Corp" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyWebsite">Company Website</Label>
            <Input id="companyWebsite" defaultValue="https://acme.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Input id="industry" defaultValue="Technology" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" defaultValue="San Francisco, CA" />
          </div>
        </div>
        <Button type="submit">Save Company Details</Button>
      </div>
    </div>
  );
}
