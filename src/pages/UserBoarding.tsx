
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { mockSaaSData } from "@/lib/mockData";
import { UserBoardingLayout } from "@/components/user-boarding/UserBoardingLayout";
import { UserBoardingHeader } from "@/components/user-boarding/UserBoardingHeader";
import { UserBoardingFilters } from "@/components/user-boarding/UserBoardingFilters";
import { UserBoardingTable } from "@/components/user-boarding/UserBoardingTable";
import { OnboardingDialog } from "@/components/user-boarding/OnboardingDialog";
import { DeBoardingDialog } from "@/components/user-boarding/DeBoardingDialog";
import { AutoOffboardingDialog } from "@/components/user-boarding/AutoOffboardingDialog";
import { useUserBoarding } from "@/hooks/useUserBoarding";
import { HrmsUser } from "@/types/hrms";

// Mock user tool mappings data with more complete mappings
const mockUserToolMappings = [
  { userId: "EMP001", toolIds: ["salesforce1", "slack1", "asana1"] },
  { userId: "EMP002", toolIds: ["hubspot1", "zoom1"] },
  { userId: "EMP003", toolIds: ["salesforce1", "hubspot1", "slack1", "zoom1"] },
  { userId: "EMP004", toolIds: ["zoom1", "salesforce1"] },
  { userId: "EMP005", toolIds: ["salesforce1", "hubspot1"] },
  { userId: "EMP006", toolIds: ["salesforce1", "slack1", "zoom1"] },
  { userId: "EMP007", toolIds: ["hubspot1", "zoom1", "slack1"] },
  { userId: "EMP008", toolIds: ["slack1", "asana1"] },
  { userId: "EMP009", toolIds: ["salesforce1"] },
  { userId: "EMP010", toolIds: ["salesforce1", "hubspot1", "slack1", "zoom1", "asana1"] },
  { userId: "EMP011", toolIds: ["salesforce1", "zoom1"] },
  { userId: "EMP012", toolIds: ["slack1", "hubspot1", "asana1"] },
];

// Additional users data
const additionalUsers: HrmsUser[] = [
  {
    id: "dummy1",
    employee_id: "EMP006",
    full_name: "Olivia Johnson",
    email: "olivia.johnson@example.com",
    department: "Marketing",
    position: "Marketing Specialist",
    status: "active",
    join_date: "2022-05-15",
    created_at: "2022-05-15T00:00:00.000Z",
    updated_at: "2022-05-15T00:00:00.000Z"
  },
  {
    id: "dummy2",
    employee_id: "EMP007",
    full_name: "William Taylor",
    email: "william.taylor@example.com",
    department: "Engineering",
    position: "Software Engineer",
    status: "active",
    join_date: "2022-06-01",
    created_at: "2022-06-01T00:00:00.000Z",
    updated_at: "2022-06-01T00:00:00.000Z"
  },
  {
    id: "dummy3",
    employee_id: "EMP008",
    full_name: "Emma Brown",
    email: "emma.brown@example.com",
    department: "HR",
    position: "HR Coordinator",
    status: "active",
    join_date: "2022-07-12",
    created_at: "2022-07-12T00:00:00.000Z",
    updated_at: "2022-07-12T00:00:00.000Z"
  },
  {
    id: "dummy4",
    employee_id: "EMP009",
    full_name: "James Wilson",
    email: "james.wilson@example.com",
    department: "Finance",
    position: "Financial Analyst",
    status: "active",
    join_date: "2022-08-03",
    created_at: "2022-08-03T00:00:00.000Z",
    updated_at: "2022-08-03T00:00:00.000Z"
  },
  {
    id: "dummy5",
    employee_id: "EMP010",
    full_name: "Sophia Davis",
    email: "sophia.davis@example.com",
    department: "Product",
    position: "Product Manager",
    status: "active",
    join_date: "2022-09-20",
    created_at: "2022-09-20T00:00:00.000Z",
    updated_at: "2022-09-20T00:00:00.000Z"
  },
  {
    id: "dummy6",
    employee_id: "EMP011",
    full_name: "Lucas Garcia",
    email: "lucas.garcia@example.com",
    department: "Sales",
    position: "Sales Representative",
    status: "terminated",
    join_date: "2021-04-15",
    exit_date: "2023-01-10",
    created_at: "2021-04-15T00:00:00.000Z",
    updated_at: "2023-01-10T00:00:00.000Z"
  },
  {
    id: "dummy7",
    employee_id: "EMP012",
    full_name: "Mia Martinez",
    email: "mia.martinez@example.com",
    department: "Customer Support",
    position: "Customer Support Lead",
    status: "on_leave",
    join_date: "2021-10-05",
    created_at: "2021-10-05T00:00:00.000Z",
    updated_at: "2021-10-05T00:00:00.000Z"
  }
];

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
    </UserBoardingLayout>
  );
};

export default UserBoarding;
