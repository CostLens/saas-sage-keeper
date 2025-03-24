import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, UserPlus, UserMinus, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Form, FormControl, FormDescription, 
  FormField, FormItem, FormLabel 
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getHrmsUsers, getUserOnboardingTasks, createOnboardingTask, updateTaskStatus } from "@/lib/hrmsService";
import { mockSaasData } from "@/lib/mockData";
import { toast } from "@/components/ui/use-toast";
import { OnboardingTask } from "@/types/hrms";

const UserManagement = () => {
  const queryClient = useQueryClient();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem("sidebar-collapsed") === "true";
  });
  const [activeTab, setActiveTab] = useState("onboarding");
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: hrmsUsers = [], isLoading: isLoadingUsers } = useQuery({
    queryKey: ["hrmsUsers"],
    queryFn: getHrmsUsers
  });
  
  const { data: onboardingTasks = [], isLoading: isLoadingTasks } = useQuery({
    queryKey: ["onboardingTasks"],
    queryFn: async () => {
      if (hrmsUsers.length > 0) {
        return await getUserOnboardingTasks(hrmsUsers[0].employee_id);
      }
      return [];
    },
    enabled: hrmsUsers.length > 0
  });

  const createTaskMutation = useMutation({
    mutationFn: createOnboardingTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["onboardingTasks"] });
      toast({
        title: "Task created",
        description: "The onboarding task has been created successfully.",
      });
    }
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({id, status}: {id: string, status: string}) => 
      updateTaskStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["onboardingTasks"] });
      toast({
        title: "Task updated",
        description: "The task status has been updated successfully.",
      });
    }
  });

  const formSchema = z.object({
    employeeId: z.string().min(1, { message: "Please select an employee" }),
    saasId: z.string().min(1, { message: "Please select a SaaS tool" }),
    taskType: z.enum(["onboarding", "offboarding"]),
    priority: z.enum(["low", "medium", "high"]),
    notes: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskType: "onboarding",
      priority: "medium",
      notes: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const selectedEmployee = hrmsUsers.find(user => user.employee_id === values.employeeId);
      const selectedSaas = mockSaasData.find(saas => saas.id === values.saasId);
      
      if (!selectedEmployee || !selectedSaas) {
        toast({
          title: "Error",
          description: "Selected employee or SaaS tool not found.",
          variant: "destructive",
        });
        return;
      }
      
      const newTask = {
        employee_id: selectedEmployee.employee_id,
        saas_id: selectedSaas.id,
        saas_name: selectedSaas.name,
        task_type: values.taskType,
        status: "pending",
        priority: values.priority,
        notes: values.notes || null,
        assigned_to: null
      };
      
      await createTaskMutation.mutateAsync(newTask);
      setIsNewTaskOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error creating task:", error);
      toast({
        title: "Error",
        description: "Failed to create the task. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateTaskStatus = async (taskId: string, newStatus: string) => {
    try {
      await updateTaskMutation.mutateAsync({ id: taskId, status: newStatus });
    } catch (error) {
      console.error("Error updating task status:", error);
      toast({
        title: "Error",
        description: "Failed to update task status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            Completed
          </Badge>
        );
      case "in_progress":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Clock className="h-3.5 w-3.5 mr-1" />
            In Progress
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <AlertCircle className="h-3.5 w-3.5 mr-1" />
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="h-3.5 w-3.5 mr-1" />
            Failed
          </Badge>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setSidebarCollapsed(localStorage.getItem("sidebar-collapsed") === "true");
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('sidebarStateChanged', (event: Event) => {
      const customEvent = event as CustomEvent;
      setSidebarCollapsed(customEvent.detail.isCollapsed);
    });
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('sidebarStateChanged', handleStorageChange as EventListener);
    };
  }, []);

  const filteredTasks = onboardingTasks.filter(
    (task: OnboardingTask) => {
      const matchesTab = activeTab === "all" || task.task_type === activeTab;
      const matchesSearch = searchTerm === "" || 
        task.saas_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hrmsUsers.find(u => u.employee_id === task.employee_id)?.full_name.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesTab && matchesSearch;
    }
  );

  if (isLoadingUsers || isLoadingTasks) {
    return (
      <div className="min-h-screen flex flex-col md:flex-row">
        <Sidebar />
        <div 
          className={`flex-1 flex flex-col transition-all duration-300 ${
            sidebarCollapsed ? 'ml-0 md:ml-16' : 'ml-0 md:ml-64'
          }`}
        >
          <Header />
          <main className="flex-1 p-6">
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'ml-0 md:ml-16' : 'ml-0 md:ml-64'
        }`}
      >
        <Header />
        <main className="flex-1 p-4 md:p-6 space-y-6 md:space-y-8 animate-fade-in overflow-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">User Management</h1>
            <Dialog open={isNewTaskOpen} onOpenChange={setIsNewTaskOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  New Task
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Create New User Task</DialogTitle>
                  <DialogDescription>
                    Create a new onboarding or offboarding task for an employee.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="employeeId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Employee</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an employee" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {hrmsUsers.map(employee => (
                                <SelectItem key={employee.employee_id} value={employee.employee_id}>
                                  {employee.full_name} ({employee.email})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            The employee for whom this task is being created.
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="saasId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SaaS Tool</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a SaaS tool" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {mockSaasData.map(tool => (
                                <SelectItem key={tool.id} value={tool.id}>
                                  {tool.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            The SaaS tool for this onboarding/offboarding task.
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="taskType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Task Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="onboarding">Onboarding</SelectItem>
                              <SelectItem value="offboarding">Offboarding</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Priority</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notes</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Add any additional notes here" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button type="submit" disabled={createTaskMutation.isPending}>
                        {createTaskMutation.isPending ? "Creating..." : "Create Task"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>User Onboarding & Offboarding</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <Tabs defaultValue="onboarding" className="w-full" onValueChange={setActiveTab}>
                    <TabsList>
                      <TabsTrigger value="all" className="flex items-center gap-2">
                        All Tasks
                      </TabsTrigger>
                      <TabsTrigger value="onboarding" className="flex items-center gap-2">
                        <UserPlus className="h-4 w-4" />
                        Onboarding
                      </TabsTrigger>
                      <TabsTrigger value="offboarding" className="flex items-center gap-2">
                        <UserMinus className="h-4 w-4" />
                        Offboarding
                      </TabsTrigger>
                    </TabsList>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input 
                          type="search" 
                          placeholder="Search tasks..." 
                          className="flex-1"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="outline" size="icon">
                          <Filter className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <TabsContent value="all" className="space-y-4">
                      <div className="rounded-md border overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Employee</TableHead>
                              <TableHead>SaaS Tool</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Priority</TableHead>
                              <TableHead>Created</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredTasks.length > 0 ? (
                              filteredTasks.map((task: OnboardingTask) => {
                                const employee = hrmsUsers.find(u => u.employee_id === task.employee_id);
                                return (
                                  <TableRow key={task.id}>
                                    <TableCell>
                                      <div className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                          <AvatarFallback>
                                            {employee?.full_name.substring(0, 2) || "??"}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <div className="font-medium">{employee?.full_name || "Unknown"}</div>
                                          <div className="text-xs text-muted-foreground">{employee?.email || "No email"}</div>
                                        </div>
                                      </div>
                                    </TableCell>
                                    <TableCell>{task.saas_name}</TableCell>
                                    <TableCell>
                                      <Badge variant={task.task_type === "onboarding" ? "default" : "destructive"}>
                                        {task.task_type === "onboarding" ? "Onboarding" : "Offboarding"}
                                      </Badge>
                                    </TableCell>
                                    <TableCell>{getStatusBadge(task.status)}</TableCell>
                                    <TableCell>
                                      <Badge 
                                        variant="outline" 
                                        className={
                                          task.priority === "high" 
                                            ? "bg-red-50 text-red-700 border-red-200" 
                                            : task.priority === "medium" 
                                              ? "bg-amber-50 text-amber-700 border-amber-200" 
                                              : "bg-green-50 text-green-700 border-green-200"
                                        }
                                      >
                                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                      </Badge>
                                    </TableCell>
                                    <TableCell>{new Date(task.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                      <Select
                                        defaultValue={task.status}
                                        onValueChange={(value) => handleUpdateTaskStatus(task.id, value)}
                                        disabled={updateTaskMutation.isPending}
                                      >
                                        <SelectTrigger className="h-8 w-28">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="pending">Pending</SelectItem>
                                          <SelectItem value="in_progress">In Progress</SelectItem>
                                          <SelectItem value="completed">Completed</SelectItem>
                                          <SelectItem value="failed">Failed</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </TableCell>
                                  </TableRow>
                                );
                              })
                            ) : (
                              <TableRow>
                                <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                                  No tasks found. Create a new task to get started.
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>

                    <TabsContent value="onboarding" className="space-y-4">
                      <div className="rounded-md border overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Employee</TableHead>
                              <TableHead>SaaS Tool</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Priority</TableHead>
                              <TableHead>Created</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredTasks.length > 0 ? (
                              filteredTasks.map((task: OnboardingTask) => {
                                const employee = hrmsUsers.find(u => u.employee_id === task.employee_id);
                                return (
                                  <TableRow key={task.id}>
                                    <TableCell>
                                      <div className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                          <AvatarFallback>
                                            {employee?.full_name.substring(0, 2) || "??"}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <div className="font-medium">{employee?.full_name || "Unknown"}</div>
                                          <div className="text-xs text-muted-foreground">{employee?.email || "No email"}</div>
                                        </div>
                                      </div>
                                    </TableCell>
                                    <TableCell>{task.saas_name}</TableCell>
                                    <TableCell>{getStatusBadge(task.status)}</TableCell>
                                    <TableCell>
                                      <Badge 
                                        variant="outline" 
                                        className={
                                          task.priority === "high" 
                                            ? "bg-red-50 text-red-700 border-red-200" 
                                            : task.priority === "medium" 
                                              ? "bg-amber-50 text-amber-700 border-amber-200" 
                                              : "bg-green-50 text-green-700 border-green-200"
                                        }
                                      >
                                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                      </Badge>
                                    </TableCell>
                                    <TableCell>{new Date(task.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                      <Select
                                        defaultValue={task.status}
                                        onValueChange={(value) => handleUpdateTaskStatus(task.id, value)}
                                        disabled={updateTaskMutation.isPending}
                                      >
                                        <SelectTrigger className="h-8 w-28">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="pending">Pending</SelectItem>
                                          <SelectItem value="in_progress">In Progress</SelectItem>
                                          <SelectItem value="completed">Completed</SelectItem>
                                          <SelectItem value="failed">Failed</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </TableCell>
                                  </TableRow>
                                );
                              })
                            ) : (
                              <TableRow>
                                <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                                  No onboarding tasks found. Create a new task to get started.
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>

                    <TabsContent value="offboarding" className="space-y-4">
                      <div className="rounded-md border overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Employee</TableHead>
                              <TableHead>SaaS Tool</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Priority</TableHead>
                              <TableHead>Created</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredTasks.length > 0 ? (
                              filteredTasks.map((task: OnboardingTask) => {
                                const employee = hrmsUsers.find(u => u.employee_id === task.employee_id);
                                return (
                                  <TableRow key={task.id}>
                                    <TableCell>
                                      <div className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                          <AvatarFallback>
                                            {employee?.full_name.substring(0, 2) || "??"}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <div className="font-medium">{employee?.full_name || "Unknown"}</div>
                                          <div className="text-xs text-muted-foreground">{employee?.email || "No email"}</div>
                                        </div>
                                      </div>
                                    </TableCell>
                                    <TableCell>{task.saas_name}</TableCell>
                                    <TableCell>{getStatusBadge(task.status)}</TableCell>
                                    <TableCell>
                                      <Badge 
                                        variant="outline" 
                                        className={
                                          task.priority === "high" 
                                            ? "bg-red-50 text-red-700 border-red-200" 
                                            : task.priority === "medium" 
                                              ? "bg-amber-50 text-amber-700 border-amber-200" 
                                              : "bg-green-50 text-green-700 border-green-200"
                                        }
                                      >
                                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                      </Badge>
                                    </TableCell>
                                    <TableCell>{new Date(task.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                      <Select
                                        defaultValue={task.status}
                                        onValueChange={(value) => handleUpdateTaskStatus(task.id, value)}
                                        disabled={updateTaskMutation.isPending}
                                      >
                                        <SelectTrigger className="h-8 w-28">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="pending">Pending</SelectItem>
                                          <SelectItem value="in_progress">In Progress</SelectItem>
                                          <SelectItem value="completed">Completed</SelectItem>
                                          <SelectItem value="failed">Failed</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </TableCell>
                                  </TableRow>
                                );
                              })
                            ) : (
                              <TableRow>
                                <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                                  No offboarding tasks found. Create a new task to get started.
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default UserManagement;
