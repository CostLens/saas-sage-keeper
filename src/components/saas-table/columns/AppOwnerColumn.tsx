
import React, { useState } from "react";
import { SaaSData } from "@/lib/mockData";
import { User, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function AppOwnerColumn({ row }: { row: SaaSData }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [ownerName, setOwnerName] = useState(row.owner || "");

  const handleAssignOwner = () => {
    // In a real application, this would make an API call to update the database
    // For this demo, we'll just update the local state
    row.owner = ownerName.trim() || null;
    setIsDialogOpen(false);
    
    if (ownerName.trim()) {
      toast.success(`Owner assigned to ${row.name}`, {
        description: `${ownerName} is now the owner of ${row.name}`
      });
    } else {
      toast.info(`Owner removed from ${row.name}`);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <User className="h-4 w-4 text-muted-foreground" />
        <div className="flex items-center gap-1">
          <span>{row.owner || "Unassigned"}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-5 w-5 rounded-full opacity-50 hover:opacity-100"
            onClick={() => setIsDialogOpen(true)}
          >
            <Edit2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Assign App Owner for {row.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="owner" className="text-right">
                Owner
              </Label>
              <Input
                id="owner"
                placeholder="Enter owner name"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssignOwner}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
