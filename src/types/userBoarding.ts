
import { HrmsUser } from "@/types/hrms";
import { SaaSData } from "@/lib/mockData";

// Define the user-tool mapping type
export interface UserToolMapping {
  userId: string;
  toolIds: string[];
}

// Utility function types
export type GetUserToolsFunction = (userId: string, mockUserToolMappings: UserToolMapping[]) => SaaSData[];

// Hook state interface
export interface UserBoardingState {
  // UI state
  isSidebarCollapsed: boolean;
  // Filter state
  searchQuery: string;
  selectedDepartment: string;
  showOffboardedUsers: boolean;
  // Dialogs state
  onboardDialogOpen: boolean;
  deBoardDialogOpen: boolean;
  autoOffboardDialogOpen: boolean;
  // Selected data state
  selectedUser: HrmsUser | null;
  selectedTools: string[];
  selectedToolsToRemove: string[];
  // Automation state
  automationEnabled: boolean;
  // Feature visibility state
  showBoardingFeatures: boolean;
}
