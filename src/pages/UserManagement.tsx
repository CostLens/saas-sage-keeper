
import React, { useState } from "react";
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

const UserManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem("sidebar-collapsed") === "true";
  });
  const [activeTab, setActiveTab] = useState("onboarding");
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);

  // This would be fetched from your HRMS and SaaS integrations in a real app
  const mockOnboardingTasks = [
    {
      id: "1",
      employeeId: "emp001",
      employeeName: "Jane Cooper",
      employeeEmail: "jane@example.com",
      saasName: "Salesforce",
      taskType: "onboarding",
      status: "completed",
      createdAt: "2023-04-10T09:30:00Z",
      completedAt: "2023-04-12T14:20:00Z",
      assignedTo: "IT Admin",
      priority: "high",
    },
    {
      id: "2",
      employeeId: "emp002",
      employeeName: "Alex Johnson",
      employeeEmail: "alex@example.com",
      saasName: "Slack",
      taskType: "onboarding",
      status: "in_progress",
      createdAt: "2023-04-15T10:30:00Z",
      completedAt: null,
      assignedTo: "IT Admin",
      priority: "medium",
    },
    {
      id: "3",
      employeeId: "emp003",
      employeeName: "Michael Brown",
      employeeEmail: "michael@example.com",
      saasName: "Microsoft 365",
      taskType: "offboarding",
      status: "pending",
      createdAt: "2023-04-18T11:30:00Z",
      completedAt: null,
      assignedTo: null,
      priority: "high",
    },
  ];

  const mockSaasTools = [
    { id: "1", name: "Salesforce" },
    { id: "2", name: "Microsoft 365" },
    { id: "3", name: "Slack" },
    { id: "4", name: "Asana" },
    { id: "5", name: "Zoom" },
    { id: "6", name: "Notion" },
  ];

  const mockEmployees = [
    { id: "emp001", name: "Jane Cooper", email: "jane@example.com", status: "active" },
    { id: "emp002", name: "Alex Johnson", email: "alex@example.com", status: "active" },
    { id: "emp003", name: "Michael Brown", email: "michael@example.com", status: "terminated" },
    { id: "emp004", name: "Sarah Williams", email: "sarah@example.com", status: "active" },
    { id: "emp005", name: "David Miller", email: "david@example.com", status: "on_leave" },
  ];

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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // Here you would call the API to create a new task
    setIsNewTaskOpen(false);
    form.reset();
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

  React.useEffect(() => {
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

  const filteredTasks = mockOnboardingTasks.filter(
    task => activeTab === "all" || task.taskType === activeTab
  );

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
                              {mockEmployees.map(employee => (
                                <SelectItem key={employee.id} value={employee.id}>
                                  {employee.name} ({employee.email})
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
                              {mockSaasTools.map(tool => (
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
                      <Button type="submit">Create Task</Button>
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
                          rightIcon={<Search className="h-4 w-4" />}
                        />
                        <Button variant="outline" size="icon">
                          <Filter className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <TabsContent value="all" className="space-y-4">
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
                          {filteredTasks.map(task => (
                            <TableRow key={task.id}>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback>{task.employeeName.substring(0, 2)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{task.employeeName}</div>
                                    <div className="text-xs text-muted-foreground">{task.employeeEmail}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{task.saasName}</TableCell>
                              <TableCell>
                                <Badge variant={task.taskType === "onboarding" ? "default" : "destructive"}>
                                  {task.taskType === "onboarding" ? "Onboarding" : "Offboarding"}
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
                              <TableCell>{new Date(task.createdAt).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm">Update</Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TabsContent>

                    <TabsContent value="onboarding" className="space-y-4">
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
                          {filteredTasks.map(task => (
                            <TableRow key={task.id}>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback>{task.employeeName.substring(0, 2)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{task.employeeName}</div>
                                    <div className="text-xs text-muted-foreground">{task.employeeEmail}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{task.saasName}</TableCell>
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
                              <TableCell>{new Date(task.createdAt).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm">Update</Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TabsContent>

                    <TabsContent value="offboarding" className="space-y-4">
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
                          {filteredTasks.map(task => (
                            <TableRow key={task.id}>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback>{task.employeeName.substring(0, 2)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{task.employeeName}</div>
                                    <div className="text-xs text-muted-foreground">{task.employeeEmail}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{task.saasName}</TableCell>
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
                              <TableCell>{new Date(task.createdAt).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm">Update</Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
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
