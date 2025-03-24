
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { SaaSData } from "@/lib/mockData";

interface UserActivityTabProps {
  saas: SaaSData;
}

export function UserActivityTab({ saas }: UserActivityTabProps) {
  // This would be fetched from your HRMS integration in a real app
  const mockUsers = [
    { 
      id: "1", 
      name: "Jane Cooper", 
      email: "jane@example.com", 
      avatar: "", 
      active7Days: true, 
      active30Days: true, 
      employeeStatus: "active",
      lastLogin: "2023-04-21T09:30:00Z",
      department: "Engineering"
    },
    { 
      id: "2", 
      name: "Alex Johnson", 
      email: "alex@example.com", 
      avatar: "", 
      active7Days: false, 
      active30Days: true, 
      employeeStatus: "active",
      lastLogin: "2023-04-15T14:20:00Z",
      department: "Product"
    },
    { 
      id: "3", 
      name: "Michael Brown", 
      email: "michael@example.com", 
      avatar: "", 
      active7Days: false, 
      active30Days: false, 
      employeeStatus: "terminated",
      lastLogin: "2023-03-30T10:15:00Z",
      department: "Sales"
    },
    { 
      id: "4", 
      name: "Sarah Williams", 
      email: "sarah@example.com", 
      avatar: "", 
      active7Days: true, 
      active30Days: true, 
      employeeStatus: "active",
      lastLogin: "2023-04-22T16:45:00Z",
      department: "Marketing"
    },
    { 
      id: "5", 
      name: "David Miller", 
      email: "david@example.com", 
      avatar: "", 
      active7Days: false, 
      active30Days: false, 
      employeeStatus: "on_leave",
      lastLogin: "2023-03-25T11:10:00Z",
      department: "Finance"
    },
  ];

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
            {mockUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>{new Date(user.lastLogin).toLocaleDateString()}</TableCell>
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
                  {user.employeeStatus === "active" ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <CheckCircle className="h-3.5 w-3.5 mr-1" />
                      Active
                    </Badge>
                  ) : user.employeeStatus === "terminated" ? (
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
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
