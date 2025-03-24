
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

export function UserActivityTab({ saas }: UserActivityTabProps) {
  const { data: hrmsUsers, isLoading, error } = useQuery({
    queryKey: ["hrmsUsers"],
    queryFn: getHrmsUsers,
  });

  // Filter to get only first 10 users for demo purposes
  const displayUsers = hrmsUsers ? hrmsUsers.slice(0, 10) : [];

  // Map HRMS status to activity status for demo
  const mapStatusToActivity = (status: string) => {
    if (status === 'active') return { active7Days: Math.random() > 0.3, active30Days: true };
    if (status === 'on_leave') return { active7Days: false, active30Days: Math.random() > 0.5 };
    return { active7Days: false, active30Days: false };
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading user data...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error loading user data</div>;
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
              const activityStatus = mapStatusToActivity(user.status);
              // Mock last login date
              const lastLogin = new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000));
              
              return (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" alt={user.full_name} />
                        <AvatarFallback>{user.full_name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.full_name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>{lastLogin.toLocaleDateString()}</TableCell>
                  <TableCell>
                    {activityStatus.active7Days ? (
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
                    {activityStatus.active30Days ? (
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
