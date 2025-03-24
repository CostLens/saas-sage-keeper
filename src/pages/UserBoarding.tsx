
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, PlusCircle, UserPlus, UserMinus } from "lucide-react";
import { CreateTaskDialog } from "@/components/user-onboarding/CreateTaskDialog";
import { TasksList } from "@/components/user-onboarding/TasksList";
import { TasksTable } from "@/components/user-onboarding/TasksTable";
import { useIsMobile } from "@/hooks/use-mobile";

const UserBoarding = () => {
  const isMobile = useIsMobile();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return isMobile ? true : localStorage.getItem("sidebar-collapsed") === "true";
  });
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [isAutomationEnabled, setIsAutomationEnabled] = useState(false);
  
  useEffect(() => {
    const handleSidebarChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      setSidebarCollapsed(customEvent.detail.isCollapsed);
    };

    window.addEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    
    return () => {
      window.removeEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    };
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'ml-0 sm:ml-16' : 'ml-0 md:ml-64'}`}>
        <Header />
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">User Boarding</h1>
                <p className="text-muted-foreground">Manage employee onboarding and offboarding processes</p>
              </div>
              <Button onClick={() => setCreateDialogOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Task
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UserPlus className="mr-2 h-5 w-5 text-primary" />
                    Setup Automatic Onboarding
                  </CardTitle>
                  <CardDescription>Configure automatic tasks for new employees</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Automatic onboarding</p>
                      <p className="text-sm text-muted-foreground">
                        {isAutomationEnabled ? "Enabled" : "Disabled"}
                      </p>
                    </div>
                    <Switch
                      checked={isAutomationEnabled}
                      onCheckedChange={setIsAutomationEnabled}
                    />
                  </div>
                  <Button variant="outline" className="w-full" size="sm">
                    Configure Onboarding Steps
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UserMinus className="mr-2 h-5 w-5 text-primary" />
                    Setup Automatic Offboarding
                  </CardTitle>
                  <CardDescription>Configure automatic tasks for departing employees</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Automatic offboarding</p>
                      <p className="text-sm text-muted-foreground">
                        {isAutomationEnabled ? "Enabled" : "Disabled"}
                      </p>
                    </div>
                    <Switch
                      checked={isAutomationEnabled}
                      onCheckedChange={setIsAutomationEnabled}
                    />
                  </div>
                  <Button variant="outline" className="w-full" size="sm">
                    Configure Offboarding Steps
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Tasks</CardTitle>
                <CardDescription>Manage onboarding and offboarding tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="list">
                  <TabsList className="mb-4">
                    <TabsTrigger value="list">List View</TabsTrigger>
                    <TabsTrigger value="table">Table View</TabsTrigger>
                  </TabsList>
                  <TabsContent value="list">
                    <TasksList />
                  </TabsContent>
                  <TabsContent value="table">
                    <TasksTable />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <CreateTaskDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
    </div>
  );
};

export default UserBoarding;
