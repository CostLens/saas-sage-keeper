
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { HrmsUser } from "@/types/hrms";
import { SaaSData } from "@/lib/mockData";

interface OnboardingDialogProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  selectedUser: HrmsUser | null;
  selectedTools: string[];
  setSelectedTools: (tools: string[]) => void;
  mockSaaSData: SaaSData[];
  onConfirm: () => void;
}

export function OnboardingDialog({
  dialogOpen,
  setDialogOpen,
  selectedUser,
  selectedTools,
  setSelectedTools,
  mockSaaSData,
  onConfirm,
}: OnboardingDialogProps) {
  const handleSelectAllSaasTools = () => {
    if (selectedTools.length === mockSaaSData.length) {
      setSelectedTools([]);
    } else {
      setSelectedTools(mockSaaSData.map(saas => saas.id));
    }
  };

  const toggleSaasSelection = (id: string) => {
    if (selectedTools.includes(id)) {
      setSelectedTools(selectedTools.filter(item => item !== id));
    } else {
      setSelectedTools([...selectedTools, id]);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Onboard User to SaaS Tools</DialogTitle>
          <DialogDescription>
            {selectedUser ? `Select the SaaS tools to provide to ${selectedUser.full_name}` : 'Select the tools to provide'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Select SaaS Tools</Label>
            <div className="border rounded-md p-4 max-h-48 overflow-y-auto">
              <div className="flex items-center space-x-2 mb-4 pb-2 border-b">
                <Checkbox 
                  id="select-all" 
                  checked={selectedTools.length === mockSaaSData.length}
                  onCheckedChange={handleSelectAllSaasTools}
                />
                <label htmlFor="select-all" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Select All
                </label>
              </div>
              
              <div className="space-y-2">
                {mockSaaSData.map(saas => (
                  <div key={saas.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`saas-${saas.id}`} 
                      checked={selectedTools.includes(saas.id)}
                      onCheckedChange={() => toggleSaasSelection(saas.id)}
                    />
                    <label htmlFor={`saas-${saas.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {saas.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={onConfirm}>Onboard User</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
