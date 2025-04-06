
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SaaSData } from "@/lib/mockData";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserActivityTabProps {
  saas?: SaaSData;
  appName?: string;
  showTimeFilters?: boolean;
}

export function UserActivityTab({ saas, appName, showTimeFilters = false }: UserActivityTabProps) {
  // State for active time filter
  const [timeFilter, setTimeFilter] = useState<"7days" | "30days" | "60days" | "90days">("7days");

  // Mock user data - in a real app this would come from API
  const mockUsers = [
    {
      id: "js",
      name: "John Smith",
      email: "john.smith@company.com",
      department: "Engineering",
      lastActive: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: "sj",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      department: "Marketing",
      lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: "mb",
      name: "Michael Brown",
      email: "michael.brown@company.com",
      department: "Sales",
      lastActive: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
    },
    {
      id: "ed",
      name: "Emily Davis",
      email: "emily.davis@company.com",
      department: "HR",
      lastActive: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
    },
    {
      id: "dw",
      name: "David Wilson",
      email: "david.wilson@company.com",
      department: "Finance",
      lastActive: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000)
    },
    {
      id: "al",
      name: "Amy Lee",
      email: "amy.lee@company.com",
      department: "Product",
      lastActive: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000)
    }
  ];

  // Filter users based on the selected time range
  const filterUsers = () => {
    let daysToFilter;
    switch (timeFilter) {
      case "7days":
        daysToFilter = 7;
        break;
      case "30days":
        daysToFilter = 30;
        break;
      case "60days":
        daysToFilter = 60;
        break;
      case "90days":
        daysToFilter = 90;
        break;
      default:
        daysToFilter = 7;
    }

    const cutoffDate = new Date(Date.now() - daysToFilter * 24 * 60 * 60 * 1000);
    return mockUsers.filter(user => user.lastActive > cutoffDate);
  };

  const filteredUsers = filterUsers();

  // Function to format relative time
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>User Activity</CardTitle>
        {showTimeFilters && (
          <div className="flex space-x-2">
            <Tabs value={timeFilter} onValueChange={(value) => setTimeFilter(value as any)}>
              <TabsList>
                <TabsTrigger value="7days">7 Days</TabsTrigger>
                <TabsTrigger value="30days">30 Days</TabsTrigger>
                <TabsTrigger value="60days">60 Days</TabsTrigger>
                <TabsTrigger value="90days">90 Days</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="grid grid-cols-12 border-b bg-muted/50 p-3">
            <div className="col-span-5 font-medium">User</div>
            <div className="col-span-3 font-medium">Department</div>
            <div className="col-span-4 font-medium">Last Active</div>
          </div>
          <div className="max-h-[400px] overflow-auto">
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <div key={user.id} className="grid grid-cols-12 items-center p-3 border-b last:border-b-0">
                  <div className="col-span-5 flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-100 text-blue-700">{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                  <div className="col-span-3">{user.department}</div>
                  <div className="col-span-4 text-muted-foreground">{formatRelativeTime(user.lastActive)}</div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                No active users found in the selected time period
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
