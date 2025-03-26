
import React from "react";
import { UserBoardingLayout } from "@/components/user-boarding/UserBoardingLayout";
import { UserBoardingHeader } from "@/components/user-boarding/UserBoardingHeader";
import { UserBoardingFilters } from "@/components/user-boarding/UserBoardingFilters";
import { UserBoardingContent } from "@/components/user-boarding/UserBoardingContent";
import { useUserBoarding } from "@/hooks/useUserBoarding";
import { additionalUsers } from "@/data/additionalUsers";
import { mockUserToolMappings } from "@/data/mockUserToolMappings";

const UserBoarding = () => {
  const {
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
  } = useUserBoarding(additionalUsers);

  return (
    <UserBoardingLayout 
      isSidebarCollapsed={isSidebarCollapsed}
      showBoardingFeatures={showBoardingFeatures}
    >
      <UserBoardingHeader
        refetchUsers={refetchUsers}
        exportUsersData={exportUsersData}
        openAutoOffboardingDialog={() => setAutoOffboardDialogOpen(true)}
        mockUserToolMappings={mockUserToolMappings}
      />
      
      <UserBoardingFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        showOffboardedUsers={showOffboardedUsers}
        setShowOffboardedUsers={setShowOffboardedUsers}
        departments={departments}
      />
      
      <UserBoardingContent 
        filteredUsers={filteredUsers}
        isLoadingUsers={isLoadingUsers}
        onboardDialogOpen={onboardDialogOpen}
        setOnboardDialogOpen={setOnboardDialogOpen}
        deBoardDialogOpen={deBoardDialogOpen}
        setDeBoardDialogOpen={setDeBoardDialogOpen}
        autoOffboardDialogOpen={autoOffboardDialogOpen}
        setAutoOffboardDialogOpen={setAutoOffboardDialogOpen}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        selectedTools={selectedTools}
        setSelectedTools={setSelectedTools}
        selectedToolsToRemove={selectedToolsToRemove}
        setSelectedToolsToRemove={setSelectedToolsToRemove}
        automationEnabled={automationEnabled}
        setAutomationEnabled={setAutomationEnabled}
        mockUserToolMappings={mockUserToolMappings}
        handleOnboardUser={handleOnboardUser}
        handleDeBoardUser={handleDeBoardUser}
        handleAutoOffboardSetup={handleAutoOffboardSetup}
      />
    </UserBoardingLayout>
  );
};

export default UserBoarding;
