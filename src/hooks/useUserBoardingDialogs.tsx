
import { useState } from "react";
import { HrmsUser } from "@/types/hrms";
import { toast } from "sonner";

export const useUserBoardingDialogs = () => {
  // Dialogs state
  const [onboardDialogOpen, setOnboardDialogOpen] = useState(false);
  const [deBoardDialogOpen, setDeBoardDialogOpen] = useState(false);
  const [autoOffboardDialogOpen, setAutoOffboardDialogOpen] = useState(false);
  
  // Selected data state
  const [selectedUser, setSelectedUser] = useState<HrmsUser | null>(null);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [selectedToolsToRemove, setSelectedToolsToRemove] = useState<string[]>([]);
  
  // Automation state
  const [automationEnabled, setAutomationEnabled] = useState(false);
  
  // Dialog action handlers
  const handleOnboardUser = () => {
    if (!selectedUser || selectedTools.length === 0) {
      toast.error("Please select a user and at least one SaaS tool");
      return;
    }

    toast.success(`${selectedUser.full_name} has been onboarded to ${selectedTools.length} tools`);
    setOnboardDialogOpen(false);
    setSelectedUser(null);
    setSelectedTools([]);
  };

  const handleDeBoardUser = () => {
    if (!selectedUser || selectedToolsToRemove.length === 0) {
      toast.error("Please select a user and at least one SaaS tool to remove");
      return;
    }

    toast.success(`${selectedUser.full_name} has been de-boarded from ${selectedToolsToRemove.length} tools`);
    setDeBoardDialogOpen(false);
    setSelectedUser(null);
    setSelectedToolsToRemove([]);
  };

  const handleAutoOffboardSetup = () => {
    toast.success(`Automatic offboarding has been ${automationEnabled ? 'enabled' : 'disabled'}`);
    setAutoOffboardDialogOpen(false);
  };

  return {
    onboardDialogOpen,
    setOnboardDialogOpen,
    deBoardDialogOpen,
    setDeBoardDialogOpen,
    autoOffboardDialogOpen,
    setAutoOffboardDialogOpen,
    selectedUser,
    setSelectedUser,
    selectedTools,
    setSelectedTools,
    selectedToolsToRemove,
    setSelectedToolsToRemove,
    automationEnabled,
    setAutomationEnabled,
    handleOnboardUser,
    handleDeBoardUser,
    handleAutoOffboardSetup
  };
};
