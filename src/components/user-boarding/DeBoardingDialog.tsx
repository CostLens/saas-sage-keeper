
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HrmsUser } from "@/types/hrms";
import { SaaSData } from "@/lib/mockData";

interface DeBoardingDialogProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  selectedUser: HrmsUser | null;
  selectedToolsToRemove: string[];
  setSelectedToolsToRemove: (tools: string[]) => void;
  mockUserToolMappings: Array<{ userId: string; toolIds: string[] }>;
  mockSaaSData: SaaSData[];
  onConfirm: () => void;
}

export function DeBoardingDialog({
  dialogOpen,
  setDialogOpen,
  selectedUser,
  selectedToolsToRemove,
  setSelectedToolsToRemove,
  mockUserToolMappings,
  mockSaaSData,
  onConfirm,
}: DeBoardingDialogProps) {
  const getUserTools = (userId: string) => {
    const mapping = mockUserToolMappings.find(m => m.userId === userId);
    if (!mapping) return [];
    return mockSaaSData.filter(tool => mapping.toolIds.includes(tool.id));
  };

  const toggleToolToRemove = (toolId: string) => {
    if (selectedToolsToRemove.includes(toolId)) {
      setSelectedToolsToRemove(selectedToolsToRemove.filter(id => id !== toolId));
    } else {
      setSelectedToolsToRemove([...selectedToolsToRemove, toolId]);
    }
  };

  const userTools = selectedUser ? getUserTools(selectedUser.employee_id) : [];

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>De-Board User from SaaS Tools</DialogTitle>
          <DialogDescription>
            {selectedUser ? `Select the SaaS tools to remove from ${selectedUser.full_name}` : 'Select the tools to remove'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Select SaaS Tools</Label>
            <div className="grid grid-cols-2 gap-4 max-h-[200px] overflow-y-auto">
              {userTools.map(tool => (
                <div key={tool.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`remove-tool-${tool.id}`} 
                    checked={selectedToolsToRemove.includes(tool.id)}
                    onCheckedChange={() => toggleToolToRemove(tool.id)}
                  />
                  <label 
                    htmlFor={`remove-tool-${tool.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {tool.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="deboardReason">Reason (Optional)</Label>
            <Input id="deboardReason" placeholder="Reason for removing access..." />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm}>Remove Access</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
