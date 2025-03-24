import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { mockSaaSData } from "@/lib/mockData";
import { getHrmsUsers, getUserOnboardingTasks, createOnboardingTask, updateTaskStatus } from "@/lib/hrmsService";
import { HrmsUser, OnboardingTask } from "@/types/hrms";
import { RefreshCw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { TasksList } from "@/components/user-onboarding/TasksList";
import { TasksTable } from "@/components/user-onboarding/TasksTable";
import { CreateTaskDialog } from "@/components/user-onboarding/CreateTaskDialog";

const UserOnboarding = () => {
  // Sidebar collapse state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });
  
  // Form and task management state
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [selectedSaasTools, setSelectedSaasTools] = useState<string[]>([]);
  const [taskType, setTaskType] = useState<"onboarding" | "offboarding">("onboarding");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [notes, setNotes] = useState<string>("");
  
  // Fetch users and tasks data
  const { data: hrmsUsers, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["hrmsUsers"],
    queryFn: getHrmsUsers,
  });
  
  const { data: tasks, isLoading: isLoadingTasks, refetch: refetchTasks } = useQuery({
    queryKey: ["onboardingTasks", selectedEmployee],
    queryFn: () => selectedEmployee ? getUserOnboardingTasks(selectedEmployee) : Promise.resolve([]),
    enabled: !!selectedEmployee
  });
  
  // Filter users based on task type
  const filteredUsers = hrmsUsers?.filter(user => 
    (taskType === "onboarding" && user.status === "active") || 
    (taskType === "offboarding" && (user.status === "terminated" || user.status === "on_leave"))
  );
  
  // Organize tasks by status
  const pendingTasks = tasks?.filter(task => task.status === "pending" && task.task_type === taskType) || [];
  const inProgressTasks = tasks?.filter(task => task.status === "in_progress" && task.task_type === taskType) || [];
  const completedTasks = tasks?.filter(task => task.status === "completed" && task.task_type === taskType) || [];
  
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
  
  // Create onboarding or offboarding tasks
  const handleCreateTasks = async () => {
    if (!selectedEmployee || selectedSaasTools.length === 0) {
      toast.error("Please select an employee and at least one SaaS tool");
      return;
    }
    
    try {
      const employee = hrmsUsers?.find(user => user.employee_id === selectedEmployee);
      if (!employee) throw new Error("Employee not found");
      
      for (const saasId of selectedSaasTools) {
        const saas = mockSaaSData.find(s => s.id === saasId);
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
  
  // Update task status
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
  
  // Helper function to get user by ID
  const getUserById = (employeeId: string) => {
    return hrmsUsers?.find(user => user.employee_id === employeeId);
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
              
              <CreateTaskDialog
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                taskType={taskType}
                selectedEmployee={selectedEmployee}
                setSelectedEmployee={setSelectedEmployee}
                selectedSaasTools={selectedSaasTools}
                setSelectedSaasTools={setSelectedSaasTools}
                priority={priority}
                setPriority={setPriority}
                notes={notes}
                setNotes={setNotes}
                handleCreateTasks={handleCreateTasks}
                filteredUsers={filteredUsers}
                isLoadingUsers={isLoadingUsers}
                saasData={mockSaaSData}
              />
            </div>
          </div>
          
          <Tabs defaultValue="onboarding" onValueChange={(value) => setTaskType(value as "onboarding" | "offboarding")}>
            <TabsList>
              <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
              <TabsTrigger value="offboarding">Offboarding</TabsTrigger>
            </TabsList>
            
            <TabsContent value="onboarding" className="space-y-6">
              <TasksList 
                pendingTasks={pendingTasks}
                inProgressTasks={inProgressTasks}
                completedTasks={completedTasks}
                isLoadingTasks={isLoadingTasks}
                getUserById={getUserById}
                onUpdateTaskStatus={handleUpdateTaskStatus}
              />
              
              <TasksTable
                tasks={tasks || []}
                taskType="onboarding"
                isLoadingTasks={isLoadingTasks}
                getUserById={getUserById}
                onUpdateTaskStatus={handleUpdateTaskStatus}
              />
            </TabsContent>
            
            <TabsContent value="offboarding" className="space-y-6">
              <TasksList 
                pendingTasks={pendingTasks}
                inProgressTasks={inProgressTasks}
                completedTasks={completedTasks}
                isLoadingTasks={isLoadingTasks}
                getUserById={getUserById}
                onUpdateTaskStatus={handleUpdateTaskStatus}
              />
              
              <TasksTable
                tasks={tasks || []}
                taskType="offboarding"
                isLoadingTasks={isLoadingTasks}
                getUserById={getUserById}
                onUpdateTaskStatus={handleUpdateTaskStatus}
              />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default UserOnboarding;
