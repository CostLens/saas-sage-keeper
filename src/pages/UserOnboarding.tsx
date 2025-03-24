
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { mockSaasData } from "@/lib/mockData";
import { getHrmsUsers, getUserOnboardingTasks, createOnboardingTask, updateTaskStatus } from "@/lib/hrmsService";
import { HrmsUser, OnboardingTask } from "@/types/hrms";
import { UserPlus, UserX, RefreshCw, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const UserOnboarding = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });
  
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [selectedSaasTools, setSelectedSaasTools] = useState<string[]>([]);
  const [taskType, setTaskType] = useState<"onboarding" | "offboarding">("onboarding");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [notes, setNotes] = useState<string>("");
  
  const { data: hrmsUsers, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["hrmsUsers"],
    queryFn: getHrmsUsers,
  });
  
  const { data: tasks, isLoading: isLoadingTasks, refetch: refetchTasks } = useQuery({
    queryKey: ["onboardingTasks", selectedEmployee],
    queryFn: () => selectedEmployee ? getUserOnboardingTasks(selectedEmployee) : Promise.resolve([]),
    enabled: !!selectedEmployee
  });
  
  // Filter active users for onboarding, non-active for offboarding
  const filteredUsers = hrmsUsers?.filter(user => 
    (taskType === "onboarding" && user.status === "active") || 
    (taskType === "offboarding" && (user.status === "terminated" || user.status === "on_leave"))
  );
  
  // Group tasks by status for better organization
  const pendingTasks = tasks?.filter(task => task.status === "pending" && task.task_type === taskType) || [];
  const inProgressTasks = tasks?.filter(task => task.status === "in_progress" && task.task_type === taskType) || [];
  const completedTasks = tasks?.filter(task => task.status === "completed" && task.task_type === taskType) || [];
  
  useEffect(() => {
    const handleSidebarChange = (event: CustomEvent) => {
      setIsSidebarCollapsed(event.detail.isCollapsed);
    };
    
    window.addEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    
    return () => {
      window.removeEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    };
  }, []);
  
  const handleSelectAllSaasTools = () => {
    if (selectedSaasTools.length === mockSaasData.length) {
      setSelectedSaasTools([]);
    } else {
      setSelectedSaasTools(mockSaasData.map(saas => saas.id));
    }
  };
  
  const toggleSaasSelection = (id: string) => {
    setSelectedSaasTools(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };
  
  const handleCreateTasks = async () => {
    if (!selectedEmployee || selectedSaasTools.length === 0) {
      toast.error("Please select an employee and at least one SaaS tool");
      return;
    }
    
    try {
      // Get employee details
      const employee = hrmsUsers?.find(user => user.employee_id === selectedEmployee);
      if (!employee) throw new Error("Employee not found");
      
      // Create tasks for each selected tool
      for (const saasId of selectedSaasTools) {
        const saas = mockSaasData.find(s => s.id === saasId);
        if (!saas) continue;
        
        await createOnboardingTask({
          employee_id: selectedEmployee,
          saas_id: saasId,
          saas_name: saas.name,
          task_type: taskType,
          status: "pending",
          priority,
          notes
        });
      }
      
      toast.success(`Successfully created ${taskType} tasks for ${employee.full_name}`);
      setDialogOpen(false);
      setSelectedSaasTools([]);
      setNotes("");
      setPriority("medium");
      refetchTasks();
    } catch (error) {
      console.error("Error creating tasks:", error);
      toast.error("Failed to create tasks");
    }
  };
  
  const handleUpdateTaskStatus = async (taskId: string, newStatus: "pending" | "in_progress" | "completed" | "failed") => {
    try {
      await updateTaskStatus(taskId, newStatus);
      toast.success("Task status updated successfully");
      refetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Failed to update task status");
    }
  };
  
  const getUserById = (employeeId: string) => {
    return hrmsUsers?.find(user => user.employee_id === employeeId);
  };
  
  const getSaasById = (saasId: string) => {
    return mockSaasData.find(saas => saas.id === saasId);
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
            <h1 className="text-3xl font-bold tracking-tight">User {taskType === "onboarding" ? "Onboarding" : "Offboarding"}</h1>
            <div className="flex items-center gap-3">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => refetchTasks()}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    {taskType === "onboarding" ? (
                      <UserPlus className="h-4 w-4 mr-2" />
                    ) : (
                      <UserX className="h-4 w-4 mr-2" />
                    )}
                    New {taskType === "onboarding" ? "Onboarding" : "Offboarding"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Create New {taskType === "onboarding" ? "Onboarding" : "Offboarding"} Tasks</DialogTitle>
                    <DialogDescription>
                      Select an employee and the SaaS tools to {taskType === "onboarding" ? "onboard" : "offboard"} them to.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="employee" className="text-right">
                        Employee
                      </Label>
                      <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select an employee" />
                        </SelectTrigger>
                        <SelectContent>
                          {isLoadingUsers ? (
                            <SelectItem value="loading" disabled>Loading employees...</SelectItem>
                          ) : (
                            filteredUsers?.map(user => (
                              <SelectItem key={user.employee_id} value={user.employee_id}>
                                {user.full_name} ({user.department})
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="priority" className="text-right">
                        Priority
                      </Label>
                      <Select value={priority} onValueChange={(value) => setPriority(value as "low" | "medium" | "high")}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor="notes" className="text-right pt-2">
                        Notes
                      </Label>
                      <Input
                        id="notes"
                        placeholder="Add any additional notes"
                        className="col-span-3"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label className="text-right pt-2">
                        SaaS Tools
                      </Label>
                      <div className="col-span-3 border rounded-md p-4 max-h-48 overflow-y-auto">
                        <div className="flex items-center space-x-2 mb-4 pb-2 border-b">
                          <Checkbox 
                            id="select-all" 
                            checked={selectedSaasTools.length === mockSaasData.length}
                            onCheckedChange={handleSelectAllSaasTools}
                          />
                          <label htmlFor="select-all" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Select All
                          </label>
                        </div>
                        
                        <div className="space-y-2">
                          {mockSaasData.map(saas => (
                            <div key={saas.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`saas-${saas.id}`} 
                                checked={selectedSaasTools.includes(saas.id)}
                                onCheckedChange={() => toggleSaasSelection(saas.id)}
                              />
                              <label htmlFor={`saas-${saas.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                {saas.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button type="submit" onClick={handleCreateTasks}>
                      Create Tasks
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <Tabs defaultValue="onboarding" onValueChange={(value) => setTaskType(value as "onboarding" | "offboarding")}>
            <TabsList>
              <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
              <TabsTrigger value="offboarding">Offboarding</TabsTrigger>
            </TabsList>
            
            <TabsContent value="onboarding" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Pending</CardTitle>
                    <CardDescription>{pendingTasks.length} tasks awaiting action</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoadingTasks ? (
                      <div className="py-8 text-center text-muted-foreground">Loading tasks...</div>
                    ) : pendingTasks.length === 0 ? (
                      <div className="py-8 text-center text-muted-foreground">No pending tasks</div>
                    ) : (
                      <div className="space-y-4">
                        {pendingTasks.map(task => {
                          const user = getUserById(task.employee_id);
                          return (
                            <div key={task.id} className="border rounded-md p-3 space-y-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{user?.full_name}</h4>
                                  <p className="text-sm text-muted-foreground">{task.saas_name}</p>
                                </div>
                                <Badge variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "outline"}>
                                  {task.priority}
                                </Badge>
                              </div>
                              {task.notes && (
                                <p className="text-xs text-muted-foreground">{task.notes}</p>
                              )}
                              <div className="flex justify-end space-x-2 pt-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleUpdateTaskStatus(task.id, "in_progress")}
                                >
                                  Start
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>In Progress</CardTitle>
                    <CardDescription>{inProgressTasks.length} tasks in progress</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoadingTasks ? (
                      <div className="py-8 text-center text-muted-foreground">Loading tasks...</div>
                    ) : inProgressTasks.length === 0 ? (
                      <div className="py-8 text-center text-muted-foreground">No tasks in progress</div>
                    ) : (
                      <div className="space-y-4">
                        {inProgressTasks.map(task => {
                          const user = getUserById(task.employee_id);
                          return (
                            <div key={task.id} className="border rounded-md p-3 space-y-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{user?.full_name}</h4>
                                  <p className="text-sm text-muted-foreground">{task.saas_name}</p>
                                </div>
                                <Badge variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "outline"}>
                                  {task.priority}
                                </Badge>
                              </div>
                              {task.notes && (
                                <p className="text-xs text-muted-foreground">{task.notes}</p>
                              )}
                              <div className="flex justify-end space-x-2 pt-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleUpdateTaskStatus(task.id, "failed")}
                                >
                                  Failed
                                </Button>
                                <Button 
                                  size="sm"
                                  onClick={() => handleUpdateTaskStatus(task.id, "completed")}
                                >
                                  Complete
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Completed</CardTitle>
                    <CardDescription>{completedTasks.length} tasks completed</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoadingTasks ? (
                      <div className="py-8 text-center text-muted-foreground">Loading tasks...</div>
                    ) : completedTasks.length === 0 ? (
                      <div className="py-8 text-center text-muted-foreground">No completed tasks</div>
                    ) : (
                      <div className="space-y-4">
                        {completedTasks.map(task => {
                          const user = getUserById(task.employee_id);
                          return (
                            <div key={task.id} className="border rounded-md p-3 space-y-2 opacity-80">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{user?.full_name}</h4>
                                  <p className="text-sm text-muted-foreground">{task.saas_name}</p>
                                </div>
                                <Badge variant="success" className="bg-green-100 text-green-800 border-green-200">
                                  Completed
                                </Badge>
                              </div>
                              {task.completed_at && (
                                <p className="text-xs text-muted-foreground">
                                  Completed on {new Date(task.completed_at).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>All Onboarding Tasks</CardTitle>
                  <CardDescription>View and manage all onboarding tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingTasks ? (
                    <div className="py-8 text-center text-muted-foreground">Loading tasks...</div>
                  ) : tasks?.filter(t => t.task_type === "onboarding").length === 0 ? (
                    <div className="py-8 text-center text-muted-foreground">No onboarding tasks found</div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Employee</TableHead>
                          <TableHead>SaaS Tool</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Priority</TableHead>
                          <TableHead>Created At</TableHead>
                          <TableHead>Completed At</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tasks?.filter(task => task.task_type === "onboarding").map(task => {
                          const user = getUserById(task.employee_id);
                          return (
                            <TableRow key={task.id}>
                              <TableCell>{user?.full_name || task.employee_id}</TableCell>
                              <TableCell>{task.saas_name}</TableCell>
                              <TableCell>
                                {task.status === "pending" && (
                                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                    <AlertCircle className="h-3.5 w-3.5 mr-1" />
                                    Pending
                                  </Badge>
                                )}
                                {task.status === "in_progress" && (
                                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                    <RefreshCw className="h-3.5 w-3.5 mr-1" />
                                    In Progress
                                  </Badge>
                                )}
                                {task.status === "completed" && (
                                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                    Completed
                                  </Badge>
                                )}
                                {task.status === "failed" && (
                                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                    <XCircle className="h-3.5 w-3.5 mr-1" />
                                    Failed
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                <Badge variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "outline"}>
                                  {task.priority}
                                </Badge>
                              </TableCell>
                              <TableCell>{new Date(task.created_at).toLocaleDateString()}</TableCell>
                              <TableCell>{task.completed_at ? new Date(task.completed_at).toLocaleDateString() : "-"}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  {task.status === "pending" && (
                                    <Button size="sm" variant="outline" onClick={() => handleUpdateTaskStatus(task.id, "in_progress")}>
                                      Start
                                    </Button>
                                  )}
                                  {task.status === "in_progress" && (
                                    <Button size="sm" variant="outline" onClick={() => handleUpdateTaskStatus(task.id, "completed")}>
                                      Complete
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="offboarding" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Pending</CardTitle>
                    <CardDescription>{pendingTasks.length} tasks awaiting action</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoadingTasks ? (
                      <div className="py-8 text-center text-muted-foreground">Loading tasks...</div>
                    ) : pendingTasks.length === 0 ? (
                      <div className="py-8 text-center text-muted-foreground">No pending tasks</div>
                    ) : (
                      <div className="space-y-4">
                        {pendingTasks.map(task => {
                          const user = getUserById(task.employee_id);
                          return (
                            <div key={task.id} className="border rounded-md p-3 space-y-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{user?.full_name}</h4>
                                  <p className="text-sm text-muted-foreground">{task.saas_name}</p>
                                </div>
                                <Badge variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "outline"}>
                                  {task.priority}
                                </Badge>
                              </div>
                              {task.notes && (
                                <p className="text-xs text-muted-foreground">{task.notes}</p>
                              )}
                              <div className="flex justify-end space-x-2 pt-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleUpdateTaskStatus(task.id, "in_progress")}
                                >
                                  Start
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>In Progress</CardTitle>
                    <CardDescription>{inProgressTasks.length} tasks in progress</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoadingTasks ? (
                      <div className="py-8 text-center text-muted-foreground">Loading tasks...</div>
                    ) : inProgressTasks.length === 0 ? (
                      <div className="py-8 text-center text-muted-foreground">No tasks in progress</div>
                    ) : (
                      <div className="space-y-4">
                        {inProgressTasks.map(task => {
                          const user = getUserById(task.employee_id);
                          return (
                            <div key={task.id} className="border rounded-md p-3 space-y-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{user?.full_name}</h4>
                                  <p className="text-sm text-muted-foreground">{task.saas_name}</p>
                                </div>
                                <Badge variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "outline"}>
                                  {task.priority}
                                </Badge>
                              </div>
                              {task.notes && (
                                <p className="text-xs text-muted-foreground">{task.notes}</p>
                              )}
                              <div className="flex justify-end space-x-2 pt-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleUpdateTaskStatus(task.id, "failed")}
                                >
                                  Failed
                                </Button>
                                <Button 
                                  size="sm"
                                  onClick={() => handleUpdateTaskStatus(task.id, "completed")}
                                >
                                  Complete
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Completed</CardTitle>
                    <CardDescription>{completedTasks.length} tasks completed</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoadingTasks ? (
                      <div className="py-8 text-center text-muted-foreground">Loading tasks...</div>
                    ) : completedTasks.length === 0 ? (
                      <div className="py-8 text-center text-muted-foreground">No completed tasks</div>
                    ) : (
                      <div className="space-y-4">
                        {completedTasks.map(task => {
                          const user = getUserById(task.employee_id);
                          return (
                            <div key={task.id} className="border rounded-md p-3 space-y-2 opacity-80">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{user?.full_name}</h4>
                                  <p className="text-sm text-muted-foreground">{task.saas_name}</p>
                                </div>
                                <Badge variant="success" className="bg-green-100 text-green-800 border-green-200">
                                  Completed
                                </Badge>
                              </div>
                              {task.completed_at && (
                                <p className="text-xs text-muted-foreground">
                                  Completed on {new Date(task.completed_at).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>All Offboarding Tasks</CardTitle>
                  <CardDescription>View and manage all offboarding tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingTasks ? (
                    <div className="py-8 text-center text-muted-foreground">Loading tasks...</div>
                  ) : tasks?.filter(t => t.task_type === "offboarding").length === 0 ? (
                    <div className="py-8 text-center text-muted-foreground">No offboarding tasks found</div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Employee</TableHead>
                          <TableHead>SaaS Tool</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Priority</TableHead>
                          <TableHead>Created At</TableHead>
                          <TableHead>Completed At</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tasks?.filter(task => task.task_type === "offboarding").map(task => {
                          const user = getUserById(task.employee_id);
                          return (
                            <TableRow key={task.id}>
                              <TableCell>{user?.full_name || task.employee_id}</TableCell>
                              <TableCell>{task.saas_name}</TableCell>
                              <TableCell>
                                {task.status === "pending" && (
                                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                    <AlertCircle className="h-3.5 w-3.5 mr-1" />
                                    Pending
                                  </Badge>
                                )}
                                {task.status === "in_progress" && (
                                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                    <RefreshCw className="h-3.5 w-3.5 mr-1" />
                                    In Progress
                                  </Badge>
                                )}
                                {task.status === "completed" && (
                                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                    Completed
                                  </Badge>
                                )}
                                {task.status === "failed" && (
                                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                    <XCircle className="h-3.5 w-3.5 mr-1" />
                                    Failed
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                <Badge variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "outline"}>
                                  {task.priority}
                                </Badge>
                              </TableCell>
                              <TableCell>{new Date(task.created_at).toLocaleDateString()}</TableCell>
                              <TableCell>{task.completed_at ? new Date(task.completed_at).toLocaleDateString() : "-"}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  {task.status === "pending" && (
                                    <Button size="sm" variant="outline" onClick={() => handleUpdateTaskStatus(task.id, "in_progress")}>
                                      Start
                                    </Button>
                                  )}
                                  {task.status === "in_progress" && (
                                    <Button size="sm" variant="outline" onClick={() => handleUpdateTaskStatus(task.id, "completed")}>
                                      Complete
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default UserOnboarding;
