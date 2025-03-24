
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { HrmsUser } from "@/types/hrms";
import { SaaSData, mockSaaSData } from "@/lib/mockData";
import { getHrmsUsers } from "@/lib/hrmsService";
import { toast } from "sonner";

// Define the user-tool mapping type
export interface UserToolMapping {
  userId: string;
  toolIds: string[];
}

export const useUserBoarding = (additionalUsers: HrmsUser[]) => {
  // UI state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });
  
  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [showOffboardedUsers, setShowOffboardedUsers] = useState(false);
  
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
  
  // Feature visibility state 
  const [showBoardingFeatures, setShowBoardingFeatures] = useState(() => {
    const savedValue = localStorage.getItem("show-boarding-features");
    return savedValue === "true"; // Default to false if null or anything other than "true"
  });

  // Fetch users data
  const { 
    data: apiUsers, 
    isLoading: isLoadingUsers, 
    refetch: refetchUsers 
  } = useQuery({
    queryKey: ["hrmsUsers"],
    queryFn: getHrmsUsers,
  });
  
  // Combine API users with additional users
  const hrmsUsers = React.useMemo(() => {
    if (!apiUsers) return additionalUsers;
    
    const existingIds = new Set(apiUsers.map(user => user.employee_id));
    const filteredDummyUsers = additionalUsers.filter(user => !existingIds.has(user.employee_id));
    
    return [...apiUsers, ...filteredDummyUsers];
  }, [apiUsers, additionalUsers]);
  
  // Filter users based on search query, department and status
  const filteredUsers = hrmsUsers?.filter(user => {
    const matchesSearch = 
      user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.employee_id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = !selectedDepartment || user.department === selectedDepartment;
    const matchesStatus = showOffboardedUsers ? true : user.status === "active";
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Extract unique departments
  const departments = [...new Set(hrmsUsers?.map(user => user.department) || [])];
  
  // Handle sidebar state changes
  useEffect(() => {
    const handleSidebarChange = (event: CustomEvent) => {
      setIsSidebarCollapsed(event.detail.isCollapsed);
    };
    
    const handleStorageChange = () => {
      const boardingValue = localStorage.getItem("show-boarding-features");
      setShowBoardingFeatures(boardingValue === "true");
    };
    
    window.addEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('boardingFeaturesToggled', handleStorageChange);
    
    return () => {
      window.removeEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('boardingFeaturesToggled', handleStorageChange);
    };
  }, []);

  // Export CSV function
  const exportUsersData = (mockUserToolMappings: UserToolMapping[]) => {
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

  // Utility function to get user tools
  const getUserTools = (userId: string, mockUserToolMappings: UserToolMapping[]) => {
    const mapping = mockUserToolMappings.find(m => m.userId === userId);
    if (!mapping) return [];
    return mockSaaSData.filter(tool => mapping.toolIds.includes(tool.id));
  };

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
