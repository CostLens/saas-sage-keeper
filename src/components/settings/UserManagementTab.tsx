
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { UserCog, UserPlus, Mail, UserX } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

type UserRole = "admin" | "editor" | "viewer";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
  lastLogin: string;
}

export function UserManagementTab() {
  // Mock data for users
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "admin",
      active: true,
      lastLogin: "2023-09-12",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "editor",
      active: true,
      lastLogin: "2023-09-10",
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      role: "viewer",
      active: false,
      lastLogin: "2023-08-28",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      role: "editor",
      active: true,
      lastLogin: "2023-09-11",
    },
    {
      id: "5",
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      role: "viewer",
      active: true,
      lastLogin: "2023-09-05",
    },
  ]);

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
    toast.success(`User role updated to ${newRole}`);
  };

  const handleUserStatusChange = (userId: string, active: boolean) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, active } : user
      )
    );
    toast.success(`User status updated to ${active ? 'active' : 'inactive'}`);
  };

  const handleInviteUser = () => {
    toast.info("Invite user functionality not implemented in this demo");
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case "admin":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300";
      case "editor":
        return "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300";
      case "viewer":
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center space-y-2 sm:space-y-0">
        <div>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            Manage users and their access levels
          </CardDescription>
        </div>
        <Button onClick={handleInviteUser} className="gap-2">
          <UserPlus className="h-4 w-4" />
          Invite User
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="hidden md:table-cell">Last Login</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
                        <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{user.name}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select
                      defaultValue={user.role}
                      onValueChange={(value: UserRole) => handleRoleChange(user.id, value)}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{user.lastLogin}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        checked={user.active} 
                        onCheckedChange={(checked) => handleUserStatusChange(user.id, !!checked)} 
                      />
                      <Badge variant={user.active ? "outline" : "secondary"} className="font-normal">
                        {user.active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost" onClick={() => toast.info(`Email sent to ${user.email}`)}>
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => toast.info(`User settings for ${user.name}`)}>
                        <UserCog className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
