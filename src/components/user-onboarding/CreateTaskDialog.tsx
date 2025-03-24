
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { HrmsUser } from "@/types/hrms";
import { SaaSData } from "@/lib/mockData";
import { UserPlus, UserX } from "lucide-react";

interface CreateTaskDialogProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  taskType: "onboarding" | "offboarding";
  selectedEmployee: string;
  setSelectedEmployee: (employeeId: string) => void;
  selectedSaasTools: string[];
  setSelectedSaasTools: (saasIds: string[]) => void;
  priority: "low" | "medium" | "high";
  setPriority: (priority: "low" | "medium" | "high") => void;
  notes: string;
  setNotes: (notes: string) => void;
  handleCreateTasks: () => Promise<void>;
  filteredUsers: HrmsUser[] | undefined;
  isLoadingUsers: boolean;
  saasData: SaaSData[];
}

export function CreateTaskDialog({ 
  dialogOpen, setDialogOpen, taskType, selectedEmployee, setSelectedEmployee,
  selectedSaasTools, setSelectedSaasTools, priority, setPriority, notes, setNotes,
  handleCreateTasks, filteredUsers, isLoadingUsers, saasData
}: CreateTaskDialogProps) {
  
  const handleSelectAllSaasTools = () => {
    if (selectedSaasTools.length === saasData.length) {
      setSelectedSaasTools([]);
    } else {
      setSelectedSaasTools(saasData.map(saas => saas.id));
    }
  };
  
  const toggleSaasSelection = (id: string) => {
    setSelectedSaasTools(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };
  
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          {taskType === "onboarding" ? (
            <UserPlus className="h-4 w-4 mr-2" />
          ) : (
            <UserX className="h-4 w-4 mr-2" />
          )}
          New {taskType === "onboarding" ? "Onboarding" : "Offboarding"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create New {taskType === "onboarding" ? "Onboarding" : "Offboarding"} Tasks</DialogTitle>
          <DialogDescription>
            Select an employee and the SaaS tools to {taskType === "onboarding" ? "onboard" : "offboard"} them to.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="employee" className="text-right">
              Employee
            </Label>
            <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select an employee" />
              </SelectTrigger>
              <SelectContent>
                {isLoadingUsers ? (
                  <SelectItem value="loading" disabled>Loading employees...</SelectItem>
                ) : (
                  filteredUsers?.map(user => (
                    <SelectItem key={user.employee_id} value={user.employee_id}>
                      {user.full_name} ({user.department})
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">
              Priority
            </Label>
            <Select value={priority} onValueChange={(value) => setPriority(value as "low" | "medium" | "high")}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="notes" className="text-right pt-2">
              Notes
            </Label>
            <Input
              id="notes"
              placeholder="Add any additional notes"
              className="col-span-3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">
              SaaS Tools
            </Label>
            <div className="col-span-3 border rounded-md p-4 max-h-48 overflow-y-auto">
              <div className="flex items-center space-x-2 mb-4 pb-2 border-b">
                <Checkbox 
                  id="select-all" 
                  checked={selectedSaasTools.length === saasData.length}
                  onCheckedChange={handleSelectAllSaasTools}
                />
                <label htmlFor="select-all" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Select All
                </label>
              </div>
              
              <div className="space-y-2">
                {saasData.map(saas => (
                  <div key={saas.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`saas-${saas.id}`} 
                      checked={selectedSaasTools.includes(saas.id)}
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
          <Button type="submit" onClick={handleCreateTasks}>
            Create Tasks
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
