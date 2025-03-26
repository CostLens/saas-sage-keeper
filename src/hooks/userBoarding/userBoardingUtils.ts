
import { toast } from "sonner";
import { HrmsUser } from "@/types/hrms";
import { SaaSData, mockSaaSData } from "@/lib/mockData";
import { UserToolMapping } from "@/types/userBoarding";

// Utility function to get user tools
export const getUserTools = (userId: string, mockUserToolMappings: UserToolMapping[]): SaaSData[] => {
  const mapping = mockUserToolMappings.find(m => m.userId === userId);
  if (!mapping) return [];
  return mockSaaSData.filter(tool => mapping.toolIds.includes(tool.id));
};

// Export CSV function
export const exportUsersData = (
  filteredUsers: HrmsUser[] | undefined, 
  mockUserToolMappings: UserToolMapping[]
) => {
  if (!filteredUsers || filteredUsers.length === 0) {
    toast.error("No data to export");
    return;
  }

  const headers = ["Employee ID", "Name", "Email", "Department", "Position", "Status", "SaaS Tools"];
  const csvContent = filteredUsers.map(user => {
    const tools = getUserTools(user.employee_id, mockUserToolMappings);
    const toolNames = tools.map(t => t.name).join("; ");
    return [
      user.employee_id,
      user.full_name,
      user.email,
      user.department,
      user.position,
      user.status,
      toolNames
    ].join(",");
  });

  const csv = [headers.join(","), ...csvContent].join("\n");
  
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "user-boarding-data.csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  toast.success("Data exported successfully");
};

// Dialog action handlers
export const handleOnboardUser = (
  selectedUser: HrmsUser | null, 
  selectedTools: string[], 
  setOnboardDialogOpen: (open: boolean) => void,
  setSelectedUser: (user: HrmsUser | null) => void,
  setSelectedTools: (tools: string[]) => void
) => {
  if (!selectedUser || selectedTools.length === 0) {
    toast.error("Please select a user and at least one SaaS tool");
    return;
  }

  toast.success(`${selectedUser.full_name} has been onboarded to ${selectedTools.length} tools`);
  setOnboardDialogOpen(false);
  setSelectedUser(null);
  setSelectedTools([]);
};

export const handleDeBoardUser = (
  selectedUser: HrmsUser | null, 
  selectedToolsToRemove: string[],
  setDeBoardDialogOpen: (open: boolean) => void,
  setSelectedUser: (user: HrmsUser | null) => void,
  setSelectedToolsToRemove: (tools: string[]) => void
) => {
  if (!selectedUser || selectedToolsToRemove.length === 0) {
    toast.error("Please select a user and at least one SaaS tool to remove");
    return;
  }

  toast.success(`${selectedUser.full_name} has been de-boarded from ${selectedToolsToRemove.length} tools`);
  setDeBoardDialogOpen(false);
  setSelectedUser(null);
  setSelectedToolsToRemove([]);
};

export const handleAutoOffboardSetup = (
  automationEnabled: boolean,
  setAutoOffboardDialogOpen: (open: boolean) => void
) => {
  toast.success(`Automatic offboarding has been ${automationEnabled ? 'enabled' : 'disabled'}`);
  setAutoOffboardDialogOpen(false);
};
