
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { AppDiscoveryData } from "@/hooks/useAppDiscoveryData";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface UsersTabProps {
  app: AppDiscoveryData;
}

// Mock user activity data
const mockUserActivity = [
  {
    id: "user-1",
    full_name: "John Smith",
    email: "john.smith@company.com",
    department: "Engineering",
    status: "active",
    lastLogin: "2023-05-15",
    active7Days: true,
    active30Days: true,
    active60Days: true,
    active90Days: true,
    avatarUrl: ""
  },
  {
    id: "user-2",
    full_name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    department: "Marketing",
    status: "active",
    lastLogin: "2023-05-12",
    active7Days: true,
    active30Days: true,
    active60Days: true,
    active90Days: true,
    avatarUrl: ""
  },
  {
    id: "user-3",
    full_name: "Michael Brown",
    email: "michael.brown@company.com",
    department: "Sales",
    status: "on_leave",
    lastLogin: "2023-04-28",
    active7Days: false,
    active30Days: true,
    active60Days: true,
    active90Days: true,
    avatarUrl: ""
  },
  {
    id: "user-4",
    full_name: "Emily Davis",
    email: "emily.davis@company.com",
    department: "HR",
    status: "active",
    lastLogin: "2023-05-14",
    active7Days: true,
    active30Days: true,
    active60Days: true,
    active90Days: true,
    avatarUrl: ""
  },
  {
    id: "user-5",
    full_name: "David Wilson",
    email: "david.wilson@company.com",
    department: "Finance",
    status: "terminated",
    lastLogin: "2023-02-10",
    active7Days: false,
    active30Days: false,
    active60Days: false,
    active90Days: false,
    avatarUrl: ""
  }
];

export function UsersTab({ app }: UsersTabProps) {
  const [activeTimeFilter, setActiveTimeFilter] = useState<"7days" | "30days" | "60days" | "90days">("7days");

  // Use mock data
  const displayUsers = mockUserActivity;

  const renderActiveStatus = (user: any) => {
    let isActive = false;
    
    switch (activeTimeFilter) {
      case "7days":
        isActive = user.active7Days;
        break;
      case "30days":
        isActive = user.active30Days;
        break;
      case "60days":
        isActive = user.active60Days;
        break;
      case "90days":
        isActive = user.active90Days;
        break;
    }
    
    return isActive ? (
      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
        <CheckCircle className="h-3.5 w-3.5 mr-1" />
        Active
      </Badge>
    ) : (
      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
        <XCircle className="h-3.5 w-3.5 mr-1" />
        Inactive
      </Badge>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">User Access & Activity</h3>
        <Tabs value={activeTimeFilter} onValueChange={(value) => setActiveTimeFilter(value as any)}>
          <TabsList>
            <TabsTrigger value="7days">7 Days</TabsTrigger>
            <TabsTrigger value="30days">30 Days</TabsTrigger>
            <TabsTrigger value="60days">60 Days</TabsTrigger>
            <TabsTrigger value="90days">90 Days</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Employee Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayUsers.map((user) => {
              // Format date
              const lastLoginDate = new Date(user.lastLogin);
              
              return (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatarUrl} alt={user.full_name} />
                        <AvatarFallback>{user.full_name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.full_name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>{lastLoginDate.toLocaleDateString()}</TableCell>
                  <TableCell>
                    {renderActiveStatus(user)}
                  </TableCell>
                  <TableCell>
                    {user.status === "active" ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <CheckCircle className="h-3.5 w-3.5 mr-1" />
                        Active
                      </Badge>
                    ) : user.status === "terminated" ? (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        <XCircle className="h-3.5 w-3.5 mr-1" />
                        Terminated
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        <AlertCircle className="h-3.5 w-3.5 mr-1" />
                        On Leave
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
