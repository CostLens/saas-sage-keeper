
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
  Plus, 
  UserPlus, 
  UserMinus, 
  Filter, 
  MoreHorizontal, 
  Download,
  RefreshCw
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
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock user-tool mappings (would come from backend in real app)
const mockUserToolMappings = [
  { userId: "EMP001", toolIds: ["1", "3", "5"] },
  { userId: "EMP002", toolIds: ["2", "4"] },
  { userId: "EMP003", toolIds: ["1", "2", "3", "4"] },
  { userId: "EMP004", toolIds: ["5"] },
  { userId: "EMP005", toolIds: ["1", "2"] },
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

  // Fetch users data
  const { data: hrmsUsers, isLoading: isLoadingUsers, refetch: refetchUsers } = useQuery({
    queryKey: ["hrmsUsers"],
    queryFn: getHrmsUsers,
  });
  
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
    
    window.addEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    
    return () => {
      window.removeEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
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

  // Handle tool selection for onboarding
  const toggleToolSelection = (toolId: string) => {
    setSelectedTools(prev => 
      prev.includes(toolId)
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId]
    );
  };

  // Handle tool selection for de-boarding
  const toggleToolToRemove = (toolId: string) => {
    setSelectedToolsToRemove(prev => 
      prev.includes(toolId)
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId]
    );
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
              <Dialog open={onboardDialogOpen} onOpenChange={setOnboardDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Onboard User
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Onboard User to SaaS Tools</DialogTitle>
                    <DialogDescription>
                      Select a user and the SaaS tools you want to provide access to.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="user">Select User</Label>
                      <select 
                        id="user"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={selectedUser?.employee_id || ""}
                        onChange={(e) => {
                          const selected = hrmsUsers?.find(u => u.employee_id === e.target.value) || null;
                          setSelectedUser(selected);
                        }}
                      >
                        <option value="">Select a user...</option>
                        {hrmsUsers?.filter(u => u.status === "active").map(user => (
                          <option key={user.employee_id} value={user.employee_id}>
                            {user.full_name} ({user.employee_id})
                          </option>
                        ))}
                      </select>
                    </div>
                    
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
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedUser(user);
                                    setSelectedTools([]);
                                    setOnboardDialogOpen(true);
                                  }}
                                >
                                  <UserPlus className="h-4 w-4 mr-2" />
                                  Onboard to Tools
                                </DropdownMenuItem>
                                {userTools.length > 0 && (
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedUser(user);
                                      setSelectedToolsToRemove([]);
                                      setDeBoardDialogOpen(true);
                                    }}
                                  >
                                    <UserMinus className="h-4 w-4 mr-2" />
                                    Remove from Tools
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
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
        </main>
      </div>
    </div>
  );
};

export default UserBoarding;
