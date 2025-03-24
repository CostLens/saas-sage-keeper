import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download, Zap } from "lucide-react";
import { toast } from "sonner";
import { mockSaaSData } from "@/lib/mockData";
import { getHrmsUsers } from "@/lib/hrmsService";
import { HrmsUser } from "@/types/hrms";
import { useQuery } from "@tanstack/react-query";
import { UserBoardingTable } from "@/components/user-boarding/UserBoardingTable";
import { UserBoardingFilters } from "@/components/user-boarding/UserBoardingFilters";
import { OnboardingDialog } from "@/components/user-boarding/OnboardingDialog";
import { DeBoardingDialog } from "@/components/user-boarding/DeBoardingDialog";
import { AutoOffboardingDialog } from "@/components/user-boarding/AutoOffboardingDialog";

const mockUserToolMappings = [
  { userId: "EMP001", toolIds: ["1", "3", "5"] },
  { userId: "EMP002", toolIds: ["2", "4"] },
  { userId: "EMP003", toolIds: ["1", "2", "3", "4"] },
  { userId: "EMP004", toolIds: ["5"] },
  { userId: "EMP005", toolIds: ["1", "2"] },
  { userId: "EMP006", toolIds: ["1", "3", "4"] },
  { userId: "EMP007", toolIds: ["2", "5"] },
  { userId: "EMP008", toolIds: ["3"] },
  { userId: "EMP009", toolIds: [] },
  { userId: "EMP010", toolIds: ["1", "2", "3", "4", "5"] },
];

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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [showOffboardedUsers, setShowOffboardedUsers] = useState(false);
  const [onboardDialogOpen, setOnboardDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<HrmsUser | null>(null);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [deBoardDialogOpen, setDeBoardDialogOpen] = useState(false);
  const [selectedToolsToRemove, setSelectedToolsToRemove] = useState<string[]>([]);
  const [autoOffboardDialogOpen, setAutoOffboardDialogOpen] = useState(false);
  const [automationEnabled, setAutomationEnabled] = useState(false);
  const [showBoardingFeatures, setShowBoardingFeatures] = useState(() => {
    const savedValue = localStorage.getItem("show-boarding-features");
    return savedValue === "true"; // Default to false if null or anything other than "true"
  });

  const { data: apiUsers, isLoading: isLoadingUsers, refetch: refetchUsers } = useQuery({
    queryKey: ["hrmsUsers"],
    queryFn: getHrmsUsers,
  });
  
  const hrmsUsers = React.useMemo(() => {
    if (!apiUsers) return additionalUsers;
    
    const existingIds = new Set(apiUsers.map(user => user.employee_id));
    
    const filteredDummyUsers = additionalUsers.filter(user => !existingIds.has(user.employee_id));
    
    return [...apiUsers, ...filteredDummyUsers];
  }, [apiUsers]);
  
  const filteredUsers = hrmsUsers?.filter(user => {
    const matchesSearch = 
      user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.employee_id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = !selectedDepartment || user.department === selectedDepartment;
    const matchesStatus = showOffboardedUsers ? true : user.status === "active";
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const departments = [...new Set(hrmsUsers?.map(user => user.department) || [])];
  
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

  const exportUsersData = () => {
    if (!filteredUsers || filteredUsers.length === 0) {
      toast.error("No data to export");
      return;
    }

    const headers = ["Employee ID", "Name", "Email", "Department", "Position", "Status", "SaaS Tools"];
    const csvContent = filteredUsers.map(user => {
      const tools = getUserTools(user.employee_id);
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

  const getUserTools = (userId: string) => {
    const mapping = mockUserToolMappings.find(m => m.userId === userId);
    if (!mapping) return [];
    return mockSaaSData.filter(tool => mapping.toolIds.includes(tool.id));
  };

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

  if (!showBoardingFeatures) {
    return (
      <div className="min-h-screen flex flex-col md:flex-row">
        <Sidebar />
        <div className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}>
          <Header />
          <main className="flex-1 p-6 space-y-8 animate-fade-in flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">User Boarding Feature is Disabled</h1>
              <p className="text-muted-foreground">Enable the "Boarding Features" flag in Settings to access this page.</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <Header />
        <main className="flex-1 p-6 space-y-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">User Boarding</h1>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => refetchUsers()}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={exportUsersData}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAutoOffboardDialogOpen(true)}
              >
                <Zap className="h-4 w-4 mr-2" />
                Setup Auto-Offboarding
              </Button>
            </div>
          </div>
          
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
        </main>
      </div>
    </div>
  );
};

export default UserBoarding;
