
import { useState } from "react";
import { HrmsUser } from "@/types/hrms";
import { UserToolMapping } from "@/types/userBoarding";
import { useUserData } from "./userBoarding/useUserData";
import { useUIState } from "./userBoarding/useUIState";
import { 
  getUserTools,
  exportUsersData as exportData,
  handleOnboardUser as onboardUser,
  handleDeBoardUser as deBoardUser,
  handleAutoOffboardSetup as setupAutoOffboard
} from "./userBoarding/userBoardingUtils";

export { UserToolMapping } from "@/types/userBoarding";

export const useUserBoarding = (additionalUsers: HrmsUser[]) => {
  // Get UI state
  const { isSidebarCollapsed, showBoardingFeatures } = useUIState();
  
  // Get user data and filtering
  const {
    searchQuery,
    setSearchQuery,
    selectedDepartment,
    setSelectedDepartment,
    showOffboardedUsers,
    setShowOffboardedUsers,
    filteredUsers,
    isLoadingUsers,
    departments,
    refetchUsers
  } = useUserData(additionalUsers);
  
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

  // Wrap utility functions to include required state
  const exportUsersData = (mockUserToolMappings: UserToolMapping[]) => {
    exportData(filteredUsers, mockUserToolMappings);
  };

  const handleOnboardUser = () => {
    onboardUser(selectedUser, selectedTools, setOnboardDialogOpen, setSelectedUser, setSelectedTools);
  };

  const handleDeBoardUser = () => {
    deBoardUser(selectedUser, selectedToolsToRemove, setDeBoardDialogOpen, setSelectedUser, setSelectedToolsToRemove);
  };

  const handleAutoOffboardSetup = () => {
    setupAutoOffboard(automationEnabled, setAutoOffboardDialogOpen);
  };

  return {
    // UI state
    isSidebarCollapsed,
    // Filter state
    searchQuery,
    setSearchQuery,
    selectedDepartment,
    setSelectedDepartment,
    showOffboardedUsers,
    setShowOffboardedUsers,
    // Dialogs state
    onboardDialogOpen,
    setOnboardDialogOpen,
    deBoardDialogOpen,
    setDeBoardDialogOpen,
    autoOffboardDialogOpen,
    setAutoOffboardDialogOpen,
    // Selected data state
    selectedUser,
    setSelectedUser,
    selectedTools,
    setSelectedTools,
    selectedToolsToRemove,
    setSelectedToolsToRemove,
    // Automation state
    automationEnabled,
    setAutomationEnabled,
    // Feature visibility state
    showBoardingFeatures,
    // Data
    filteredUsers,
    isLoadingUsers,
    departments,
    // Functions
    refetchUsers,
    exportUsersData,
    getUserTools,
    handleOnboardUser,
    handleDeBoardUser,
    handleAutoOffboardSetup
  };
};
