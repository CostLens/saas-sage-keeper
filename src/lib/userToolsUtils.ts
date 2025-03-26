
import { HrmsUser } from "@/types/hrms";
import { SaaSData } from "@/lib/mockData";

export interface UserToolMapping {
  userId: string;
  toolIds: string[];
}

// Get tools for a specific user
export const getUserTools = (userId: string, userToolMappings: UserToolMapping[], saasData: SaaSData[]) => {
  const mapping = userToolMappings.find(m => m.userId === userId);
  if (!mapping) return [];
  return saasData.filter(tool => mapping.toolIds.includes(tool.id));
};

// Export user data to CSV
export const exportUsersData = (
  filteredUsers: HrmsUser[] | undefined, 
  mockUserToolMappings: UserToolMapping[],
  saasData: SaaSData[]
) => {
  if (!filteredUsers || filteredUsers.length === 0) {
    return { success: false, message: "No data to export" };
  }

  const headers = ["Employee ID", "Name", "Email", "Department", "Position", "Status", "SaaS Tools"];
  const csvContent = filteredUsers.map(user => {
    const tools = getUserTools(user.employee_id, mockUserToolMappings, saasData);
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
  
  return { success: true, message: "Data exported successfully" };
};
