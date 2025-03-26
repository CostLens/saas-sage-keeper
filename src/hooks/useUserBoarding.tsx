
import { SaaSData, mockSaaSData } from "@/lib/mockData";
import { HrmsUser } from "@/types/hrms";
import { toast } from "sonner";
import { useUIState } from "./useUIState";
import { useUserFilters } from "./useUserFilters";
import { useUserBoardingDialogs } from "./useUserBoardingDialogs";
import { useUsersData } from "./useUsersData";
import { UserToolMapping, exportUsersData as exportUsersDataUtil, getUserTools as getUserToolsUtil } from "@/lib/userToolsUtils";

export { UserToolMapping } from "@/lib/userToolsUtils";

export const useUserBoarding = (additionalUsers: HrmsUser[]) => {
  // Get UI state from custom hook
  const { isSidebarCollapsed, showBoardingFeatures } = useUIState();
  
  // Get users data from custom hook
  const { hrmsUsers, isLoadingUsers, refetchUsers } = useUsersData(additionalUsers);
  
  // Get filters and filtered users from custom hook
  const { 
    searchQuery, setSearchQuery,
    selectedDepartment, setSelectedDepartment,
    showOffboardedUsers, setShowOffboardedUsers,
    departments, filteredUsers
  } = useUserFilters(hrmsUsers);
  
  // Get dialogs state and handlers from custom hook
  const {
    onboardDialogOpen, setOnboardDialogOpen,
    deBoardDialogOpen, setDeBoardDialogOpen,
    autoOffboardDialogOpen, setAutoOffboardDialogOpen,
    selectedUser, setSelectedUser,
    selectedTools, setSelectedTools,
    selectedToolsToRemove, setSelectedToolsToRemove,
    automationEnabled, setAutomationEnabled,
    handleOnboardUser, handleDeBoardUser, handleAutoOffboardSetup
  } = useUserBoardingDialogs();

  // Wrapper functions that use the utility functions
  const getUserTools = (userId: string, mockUserToolMappings: UserToolMapping[]) => {
    return getUserToolsUtil(userId, mockUserToolMappings, mockSaaSData);
  };

  const exportUsersData = (mockUserToolMappings: UserToolMapping[]) => {
    const result = exportUsersDataUtil(filteredUsers, mockUserToolMappings, mockSaaSData);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
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
