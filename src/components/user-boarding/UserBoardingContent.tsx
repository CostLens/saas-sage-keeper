
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { mockSaaSData } from "@/lib/mockData";
import { UserBoardingFilters } from "@/components/user-boarding/UserBoardingFilters";
import { UserBoardingTable } from "@/components/user-boarding/UserBoardingTable";
import { OnboardingDialog } from "@/components/user-boarding/OnboardingDialog";
import { DeBoardingDialog } from "@/components/user-boarding/DeBoardingDialog";
import { AutoOffboardingDialog } from "@/components/user-boarding/AutoOffboardingDialog";
import { UserBoardingHeader } from "./UserBoardingHeader";
import { HrmsUser } from "@/types/hrms";
import { UserToolMapping } from "@/hooks/useUserBoarding";

interface UserBoardingContentProps {
  // UI state
  isSidebarCollapsed: boolean;
  // Filter state
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDepartment: string;
  setSelectedDepartment: (department: string) => void;
  showOffboardedUsers: boolean;
  setShowOffboardedUsers: (show: boolean) => void;
  // Dialogs state
  onboardDialogOpen: boolean;
  setOnboardDialogOpen: (open: boolean) => void;
  deBoardDialogOpen: boolean;
  setDeBoardDialogOpen: (open: boolean) => void;
  autoOffboardDialogOpen: boolean;
  setAutoOffboardDialogOpen: (open: boolean) => void;
  // Selected data state
  selectedUser: HrmsUser | null;
  setSelectedUser: (user: HrmsUser | null) => void;
  selectedTools: string[];
  setSelectedTools: (tools: string[]) => void;
  selectedToolsToRemove: string[];
  setSelectedToolsToRemove: (tools: string[]) => void;
  // Automation state
  automationEnabled: boolean;
  setAutomationEnabled: (enabled: boolean) => void;
  // Data
  filteredUsers: HrmsUser[] | undefined;
  isLoadingUsers: boolean;
  departments: string[];
  // Functions
  refetchUsers: () => void;
  exportUsersData: (mockUserToolMappings: UserToolMapping[]) => void;
  mockUserToolMappings: UserToolMapping[];
  handleOnboardUser: () => void;
  handleDeBoardUser: () => void;
  handleAutoOffboardSetup: () => void;
}

export function UserBoardingContent({
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
  // Data
  filteredUsers,
  isLoadingUsers,
  departments,
  // Functions
  refetchUsers,
  exportUsersData,
  mockUserToolMappings,
  handleOnboardUser,
  handleDeBoardUser,
  handleAutoOffboardSetup
}: UserBoardingContentProps) {
  return (
    <>
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
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Users & SaaS Tool Access</CardTitle>
        </CardHeader>
        <CardContent>
          <UserBoardingTable
            isLoadingUsers={isLoadingUsers}
            filteredUsers={filteredUsers}
            mockUserToolMappings={mockUserToolMappings}
            mockSaaSData={mockSaaSData}
            onOpenOnboard={(user) => {
              setSelectedUser(user);
              setSelectedTools([]);
              setOnboardDialogOpen(true);
            }}
            onOpenOffboard={(user) => {
              setSelectedUser(user);
              setSelectedToolsToRemove([]);
              setDeBoardDialogOpen(true);
            }}
          />
        </CardContent>
      </Card>
      
      <OnboardingDialog
        dialogOpen={onboardDialogOpen}
        setDialogOpen={setOnboardDialogOpen}
        selectedUser={selectedUser}
        selectedTools={selectedTools}
        setSelectedTools={setSelectedTools}
        mockSaaSData={mockSaaSData}
        onConfirm={handleOnboardUser}
      />
      
      <DeBoardingDialog
        dialogOpen={deBoardDialogOpen}
        setDialogOpen={setDeBoardDialogOpen}
        selectedUser={selectedUser}
        selectedToolsToRemove={selectedToolsToRemove}
        setSelectedToolsToRemove={setSelectedToolsToRemove}
        mockUserToolMappings={mockUserToolMappings}
        mockSaaSData={mockSaaSData}
        onConfirm={handleDeBoardUser}
      />
      
      <AutoOffboardingDialog
        open={autoOffboardDialogOpen}
        onOpenChange={setAutoOffboardDialogOpen}
        automationEnabled={automationEnabled}
        setAutomationEnabled={setAutomationEnabled}
        onSave={handleAutoOffboardSetup}
      />
    </>
  );
}
