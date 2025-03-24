
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AutoOffboardingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  automationEnabled: boolean;
  setAutomationEnabled: (enabled: boolean) => void;
  onSave: () => void;
}

export function AutoOffboardingDialog({
  open,
  onOpenChange,
  automationEnabled,
  setAutomationEnabled,
  onSave
}: AutoOffboardingDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Setup Automatic Offboarding</DialogTitle>
          <DialogDescription>
            Configure automated offboarding for employees who leave the organization
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Enable Automation</h3>
                <p className="text-xs text-muted-foreground">
                  Turn on automatic offboarding when employees leave
                </p>
              </div>
              <Switch 
                checked={automationEnabled}
                onCheckedChange={setAutomationEnabled}
                id="automation-toggle"
              />
            </div>
            
            <div className="space-y-2 pt-2">
              <Label className={!automationEnabled ? 'text-muted-foreground' : ''}>Offboarding delay:</Label>
              <select 
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                disabled={!automationEnabled}
              >
                <option value="0">Immediately</option>
                <option value="1">After 1 day</option>
                <option value="7">After 7 days</option>
                <option value="14">After 14 days</option>
                <option value="30">After 30 days</option>
              </select>
              <p className="text-xs text-muted-foreground">Time to wait after employee status change before removing access</p>
            </div>
            
            <div className="space-y-2 pt-2">
              <Label className={!automationEnabled ? 'text-muted-foreground' : ''}>Notification recipients:</Label>
              <Input 
                placeholder="Email addresses (separated by commas)" 
                disabled={!automationEnabled}
              />
              <p className="text-xs text-muted-foreground">Who should be notified when automatic offboarding occurs</p>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onSave}>Save Configuration</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
