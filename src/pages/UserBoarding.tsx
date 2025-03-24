
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { 
  Search, 
  UserPlus, 
  UserMinus, 
  Filter, 
  MoreHorizontal, 
  Download,
  RefreshCw,
  Check,
  X,
  Zap
} from "lucide-react";
import { mockSaasData } from "@/lib/mockData";
import { getHrmsUsers } from "@/lib/hrmsService";
import { HrmsUser } from "@/types/hrms";
import { useQuery } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Enhanced mock user-tool mappings with more dummy data
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

// Additional dummy HRMS users (will be merged with API data)
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
  const [showBoardingFeatures, setShowBoardingFeatures] = useState(() => {
    const savedValue = localStorage.getItem("show-boarding-features");
    return savedValue === "true"; // Default to false if null or anything other than "true"
  });

  // Fetch users data
  const { data: apiUsers, isLoading: isLoadingUsers, refetch: refetchUsers } = useQuery({
    queryKey: ["hrmsUsers"],
    queryFn: getHrmsUsers,
  });
  
  // Combine API users with additional dummy users
  const hrmsUsers = React.useMemo(() => {
    if (!apiUsers) return additionalUsers;
    
    // Create a Set of employee_ids from API users to avoid duplicates
    const existingIds = new Set(apiUsers.map(user => user.employee_id));
    
    // Filter out dummy users that would duplicate API users
    const filteredDummyUsers = additionalUsers.filter(user => !existingIds.has(user.employee_id));
    
    return [...apiUsers, ...filteredDummyUsers];
  }, [apiUsers]);
  
  // Filter users based on search, department, and status
  const filteredUsers = hrmsUsers?.filter(user => {
    const matchesSearch = 
      user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.employee_id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = !selectedDepartment || user.department === selectedDepartment;
    const matchesStatus = showOffboardedUsers ? true : user.status === "active";
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Get unique departments for filter
  const departments = [...new Set(hrmsUsers?.map(user => user.department) || [])];
  
  // Listen for sidebar state changes
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

  // Helper function to get tools for a user
  const getUserTools = (userId: string) => {
    const mapping = mockUserToolMappings.find(m => m.userId === userId);
    if (!mapping) return [];
    return mockSaasData.filter(tool => mapping.toolIds.includes(tool.id));
  };

  // Handle user onboarding (to SaaS tools)
  const handleOnboardUser = () => {
    if (!selectedUser || selectedTools.length === 0) {
      toast.error("Please select a user and at least one SaaS tool");
      return;
    }

    // In a real app, this would call an API to update the user-tool mappings
    toast.success(`${selectedUser.full_name} has been onboarded to ${selectedTools.length} tools`);
    setOnboardDialogOpen(false);
    setSelectedUser(null);
    setSelectedTools([]);
  };

  // Handle user de-boarding (from SaaS tools)
  const handleDeBoardUser = () => {
    if (!selectedUser || selectedToolsToRemove.length === 0) {
      toast.error("Please select a user and at least one SaaS tool to remove");
      return;
    }

    // In a real app, this would call an API to update the user-tool mappings
    toast.success(`${selectedUser.full_name} has been de-boarded from ${selectedToolsToRemove.length} tools`);
    setDeBoardDialogOpen(false);
    setSelectedUser(null);
    setSelectedToolsToRemove([]);
  };

  // Handle automatic offboarding setup
  const handleAutoOffboardSetup = () => {
    toast.success("Automatic offboarding has been set up for terminated employees");
    setAutoOffboardDialogOpen(false);
  };
  
  // Handle tool selection for onboarding
  const toggleToolSelection = (toolId: string) => {
    if (selectedTools.includes(toolId)) {
      setSelectedTools(selectedTools.filter(id => id !== toolId));
    } else {
      setSelectedTools([...selectedTools, toolId]);
    }
  };

  // Handle tool selection for de-boarding
  const toggleToolToRemove = (toolId: string) => {
    if (selectedToolsToRemove.includes(toolId)) {
      setSelectedToolsToRemove(selectedToolsToRemove.filter(id => id !== toolId));
    } else {
      setSelectedToolsToRemove([...selectedToolsToRemove, toolId]);
    }
  };

  // Helper function to export users data as CSV
  const exportUsersData = () => {
    if (!filteredUsers || filteredUsers.length === 0) {
      toast.error("No data to export");
      return;
    }

    // Create CSV content
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

    // Combine headers and content
    const csv = [headers.join(","), ...csvContent].join("\n");
    
    // Create download link
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
          
          {/* Filters and search */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="department" className="min-w-[80px]">Department:</Label>
                    <select 
                      id="department"
                      className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                    >
                      <option value="">All</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="showOffboarded">Show Offboarded:</Label>
                    <Switch 
                      id="showOffboarded" 
                      checked={showOffboardedUsers}
                      onCheckedChange={setShowOffboardedUsers}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Users Table */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Users & SaaS Tool Access</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>SaaS Tools</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoadingUsers ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">Loading...</TableCell>
                    </TableRow>
                  ) : filteredUsers?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">No users found</TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers?.map(user => {
                      const userTools = getUserTools(user.employee_id);
                      return (
                        <TableRow key={user.employee_id}>
                          <TableCell className="font-medium">{user.employee_id}</TableCell>
                          <TableCell>{user.full_name}</TableCell>
                          <TableCell>{user.department}</TableCell>
                          <TableCell>{user.position}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              user.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : user.status === 'terminated' 
                                ? 'bg-red-100 text-red-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {user.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {userTools.length > 0 ? (
                                userTools.map(tool => (
                                  <span 
                                    key={tool.id} 
                                    className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800"
                                  >
                                    {tool.name}
                                  </span>
                                ))
                              ) : (
                                <span className="text-sm text-muted-foreground">No tools assigned</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setSelectedTools([]);
                                  setOnboardDialogOpen(true);
                                }}
                              >
                                <UserPlus className="h-4 w-4 mr-1" />
                                Onboard
                              </Button>
                              {userTools.length > 0 && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => {
                                    setSelectedUser(user);
                                    setSelectedToolsToRemove([]);
                                    setDeBoardDialogOpen(true);
                                  }}
                                >
                                  <UserMinus className="h-4 w-4 mr-1" />
                                  Offboard
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {/* Onboard Dialog */}
          <Dialog open={onboardDialogOpen} onOpenChange={setOnboardDialogOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Onboard User to SaaS Tools</DialogTitle>
                <DialogDescription>
                  {selectedUser ? `Select the SaaS tools to provide to ${selectedUser.full_name}` : 'Select the tools to provide'}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Select SaaS Tools</Label>
                  <div className="grid grid-cols-2 gap-4 max-h-[200px] overflow-y-auto">
                    {mockSaasData.map(tool => (
                      <div key={tool.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`tool-${tool.id}`} 
                          checked={selectedTools.includes(tool.id)}
                          onCheckedChange={() => toggleToolSelection(tool.id)}
                        />
                        <label 
                          htmlFor={`tool-${tool.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {tool.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setOnboardDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleOnboardUser}>Onboard User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* De-Board Dialog */}
          <Dialog open={deBoardDialogOpen} onOpenChange={setDeBoardDialogOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>De-Board User from SaaS Tools</DialogTitle>
                <DialogDescription>
                  {selectedUser ? `Select the SaaS tools to remove from ${selectedUser.full_name}` : 'Select the tools to remove'}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Remove Access to SaaS Tools</Label>
                  <div className="grid grid-cols-2 gap-4 max-h-[200px] overflow-y-auto">
                    {selectedUser && getUserTools(selectedUser.employee_id).map(tool => (
                      <div key={tool.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`remove-tool-${tool.id}`} 
                          checked={selectedToolsToRemove.includes(tool.id)}
                          onCheckedChange={() => toggleToolToRemove(tool.id)}
                        />
                        <label 
                          htmlFor={`remove-tool-${tool.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {tool.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="deboardReason">Reason (Optional)</Label>
                  <Input id="deboardReason" placeholder="Reason for removing access..." />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeBoardDialogOpen(false)}>Cancel</Button>
                <Button variant="destructive" onClick={handleDeBoardUser}>Remove Access</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Auto-Offboarding Dialog */}
          <Dialog open={autoOffboardDialogOpen} onOpenChange={setAutoOffboardDialogOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Setup Automatic Offboarding</DialogTitle>
                <DialogDescription>
                  Configure automated offboarding for employees who leave the organization
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="auto-offboard-terminated" defaultChecked />
                    <label htmlFor="auto-offboard-terminated" className="text-sm font-medium">
                      Automatically offboard terminated employees
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="auto-offboard-leave" />
                    <label htmlFor="auto-offboard-leave" className="text-sm font-medium">
                      Automatically offboard employees on extended leave
                    </label>
                  </div>
                  
                  <div className="space-y-2 pt-2">
                    <Label>Offboarding delay:</Label>
                    <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <option value="0">Immediately</option>
                      <option value="1">After 1 day</option>
                      <option value="7">After 7 days</option>
                      <option value="14">After 14 days</option>
                      <option value="30">After 30 days</option>
                    </select>
                    <p className="text-xs text-muted-foreground">Time to wait after employee status change before removing access</p>
                  </div>
                  
                  <div className="space-y-2 pt-2">
                    <Label>Notification recipients:</Label>
                    <Input placeholder="Email addresses (separated by commas)" />
                    <p className="text-xs text-muted-foreground">Who should be notified when automatic offboarding occurs</p>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setAutoOffboardDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAutoOffboardSetup}>Save Configuration</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default UserBoarding;
