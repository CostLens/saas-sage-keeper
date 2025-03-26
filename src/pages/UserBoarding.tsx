
import React from "react";
import { UserBoardingLayout } from "@/components/user-boarding/UserBoardingLayout";
import { useUserBoarding } from "@/hooks/useUserBoarding";
import { UserBoardingContent } from "@/components/user-boarding/UserBoardingContent";
import { mockUserToolMappings, additionalUsers } from "@/components/user-boarding/MockData";

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
      {showBoardingFeatures && (
        <UserBoardingContent 
          isSidebarCollapsed={isSidebarCollapsed}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
          showOffboardedUsers={showOffboardedUsers}
          setShowOffboardedUsers={setShowOffboardedUsers}
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
          filteredUsers={filteredUsers}
          isLoadingUsers={isLoadingUsers}
          departments={departments}
          refetchUsers={refetchUsers}
          exportUsersData={exportUsersData}
          mockUserToolMappings={mockUserToolMappings}
          handleOnboardUser={handleOnboardUser}
          handleDeBoardUser={handleDeBoardUser}
          handleAutoOffboardSetup={handleAutoOffboardSetup}
        />
      )}
    </UserBoardingLayout>
  );
};

export default UserBoarding;
