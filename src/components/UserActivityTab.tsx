
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { SaaSData } from "@/lib/mockData";
import { getHrmsUsers } from "@/lib/hrmsService";
import { HrmsUser } from "@/types/hrms";
import { useQuery } from "@tanstack/react-query";

interface UserActivityTabProps {
  saas: SaaSData;
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
    avatarUrl: ""
  },
  {
    id: "user-6",
    full_name: "Jennifer Taylor",
    email: "jennifer.taylor@company.com",
    department: "Product",
    status: "active",
    lastLogin: "2023-05-10",
    active7Days: true,
    active30Days: true,
    avatarUrl: ""
  },
  {
    id: "user-7",
    full_name: "Robert Martin",
    email: "robert.martin@company.com",
    department: "Engineering",
    status: "active",
    lastLogin: "2023-05-01",
    active7Days: false,
    active30Days: true,
    avatarUrl: ""
  },
  {
    id: "user-8",
    full_name: "Jessica Anderson",
    email: "jessica.anderson@company.com",
    department: "Customer Support",
    status: "on_leave",
    lastLogin: "2023-04-15",
    active7Days: false,
    active30Days: false,
    avatarUrl: ""
  }
];

export function UserActivityTab({ saas }: UserActivityTabProps) {
  const { data: hrmsUsers, isLoading } = useQuery({
    queryKey: ["hrmsUsers"],
    queryFn: getHrmsUsers,
  });

  // Use mock data instead of API data for this demo
  const displayUsers = mockUserActivity;

  if (isLoading) {
    return <div className="p-4 text-center">Loading user data...</div>;
  }

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">User Access & Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Active (7 Days)</TableHead>
              <TableHead>Active (30 Days)</TableHead>
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
                    {user.active7Days ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <CheckCircle className="h-3.5 w-3.5 mr-1" />
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        <XCircle className="h-3.5 w-3.5 mr-1" />
                        Inactive
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {user.active30Days ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <CheckCircle className="h-3.5 w-3.5 mr-1" />
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        <XCircle className="h-3.5 w-3.5 mr-1" />
                        Inactive
                      </Badge>
                    )}
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
      </CardContent>
    </Card>
  );
}
