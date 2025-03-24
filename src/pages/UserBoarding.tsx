
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table";
import { mockSaasData } from "@/lib/mockData";
import { toast } from "sonner";
import { getHrmsUsers } from "@/lib/hrmsService";
import { HrmsUser } from "@/types/hrms";
import { useQuery } from "@tanstack/react-query";
import { Filter, Download, RefreshCw } from "lucide-react";

const UserBoarding = () => {
  // Sidebar collapse state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });
  
  // Users and tools state
  const [userSaasTools, setUserSaasTools] = useState<Record<string, string[]>>({});
  const [searchTerm, setSearchTerm] = useState("");
  
  // Fetch users data
  const { data: hrmsUsers, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["hrmsUsers"],
    queryFn: getHrmsUsers,
  });
  
  // Initialize user tools mapping (mock data for demonstration)
  useEffect(() => {
    if (hrmsUsers) {
      const initialMapping: Record<string, string[]> = {};
      hrmsUsers.forEach(user => {
        // Randomly assign 1-3 SaaS tools to each user for demonstration
        const randomTools = mockSaasData
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 3) + 1)
          .map(tool => tool.id);
        
        initialMapping[user.employee_id] = randomTools;
      });
      setUserSaasTools(initialMapping);
    }
  }, [hrmsUsers]);
  
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
  
  // Toggle tool for a user
  const toggleToolForUser = (userId: string, toolId: string) => {
    setUserSaasTools(prev => {
      const userTools = prev[userId] || [];
      const updatedTools = userTools.includes(toolId)
        ? userTools.filter(id => id !== toolId)
        : [...userTools, toolId];
      
      return {
        ...prev,
        [userId]: updatedTools
      };
    });
    
    const user = hrmsUsers?.find(u => u.employee_id === userId);
    const tool = mockSaasData.find(t => t.id === toolId);
    
    if (user && tool) {
      const action = userSaasTools[userId]?.includes(toolId) ? "offboarded from" : "onboarded to";
      toast.success(`${user.full_name} ${action} ${tool.name}`);
    }
  };
  
  // Filter users based on search term
  const filteredUsers = hrmsUsers?.filter(user => 
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Define columns for the data table
  const columns = [
    {
      id: "employee",
      header: "Employee",
      cell: (user: HrmsUser) => (
        <div className="flex flex-col">
          <span className="font-medium">{user.full_name}</span>
          <span className="text-sm text-muted-foreground">{user.email}</span>
        </div>
      ),
      sortable: true
    },
    {
      id: "department",
      header: "Department",
      cell: (user: HrmsUser) => user.department,
      sortable: true
    },
    {
      id: "position",
      header: "Position",
      cell: (user: HrmsUser) => user.position,
      sortable: true
    },
    {
      id: "tools",
      header: "SaaS Tools",
      cell: (user: HrmsUser) => (
        <div className="space-y-2 max-w-md">
          {mockSaasData.map(tool => (
            <div key={tool.id} className="flex items-center space-x-2">
              <Checkbox 
                id={`user-${user.employee_id}-tool-${tool.id}`}
                checked={userSaasTools[user.employee_id]?.includes(tool.id)}
                onCheckedChange={() => toggleToolForUser(user.employee_id, tool.id)}
              />
              <Label 
                htmlFor={`user-${user.employee_id}-tool-${tool.id}`}
                className="text-sm cursor-pointer"
              >
                {tool.name}
              </Label>
            </div>
          ))}
        </div>
      )
    }
  ];
  
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
                size="sm" 
                variant="outline" 
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button size="sm" variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>User Tool Management</CardTitle>
              <CardDescription>
                Manage which SaaS tools each user has access to
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              
              {isLoadingUsers ? (
                <div className="py-12 text-center text-muted-foreground">Loading users...</div>
              ) : (
                <DataTable 
                  data={filteredUsers || []}
                  columns={columns}
                  searchable={false}
                />
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default UserBoarding;
