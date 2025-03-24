
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ObligationsTable } from "@/components/ObligationsTable";
import { SaasDetail } from "@/components/SaasDetail";
import { mockSaaSData, mockObligations } from "@/lib/mockData";
import { useIsMobile } from "@/hooks/use-mobile";
import { Separator } from "@/components/ui/separator";
import { OverviewChart } from "@/components/OverviewChart";

const UserManagement = () => {
  const isMobile = useIsMobile();
  const [selectedSaas, setSelectedSaas] = useState(mockSaaSData[0]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem("sidebar-collapsed") === "true";
  });

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

  // Prepare chart data for user management overview
  const departmentSpendData = [
    { category: "Engineering", amount: 120000 },
    { category: "Marketing", amount: 75000 },
    { category: "Sales", amount: 65000 },
    { category: "Product", amount: 45000 },
    { category: "HR", amount: 25000 },
  ];

  // Transform the data to match the OverviewChart component's expected format
  const chartData = departmentSpendData.map(item => ({
    name: item.category,
    value: item.amount,
    color: getColorForDepartment(item.category),
  }));

  // Helper function to assign colors to departments
  function getColorForDepartment(department: string): string {
    const colors = {
      "Engineering": "#8884d8",
      "Marketing": "#82ca9d",
      "Sales": "#ffc658",
      "Product": "#ff8042",
      "HR": "#0088fe",
      "default": "#8884d8"
    };
    
    return colors[department as keyof typeof colors] || colors.default;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'ml-0 sm:ml-16' : 'ml-0 md:ml-64'}`}>
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 space-y-6 max-w-7xl">
            <div className="flex items-center justify-between py-4">
              <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="col-span-1 lg:col-span-2">
                <CardHeader>
                  <CardTitle>Department Expenses</CardTitle>
                  <CardDescription>SaaS expenses by department</CardDescription>
                </CardHeader>
                <CardContent>
                  <OverviewChart data={chartData} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>License Optimization</CardTitle>
                  <CardDescription>Opportunity to reduce costs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* License optimization content */}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Obligations</CardTitle>
                <CardDescription>Upcoming obligations and deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <ObligationsTable data={mockObligations.slice(0, 5)} />
              </CardContent>
            </Card>

            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">SaaS Details</TabsTrigger>
                <TabsTrigger value="users">User Assignments</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="p-4 bg-background rounded-md mt-4">
                <SaasDetail saas={selectedSaas} onClose={() => {}} />
              </TabsContent>
              <TabsContent value="users" className="p-4 bg-background rounded-md mt-4">
                <h2 className="text-xl font-semibold mb-4">User Assignments</h2>
                <p>User assignment data will be displayed here.</p>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserManagement;
