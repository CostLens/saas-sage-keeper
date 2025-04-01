
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, UserRole } from "@/components/settings/users/types";

interface UserTableProps {
  users: User[];
  onRoleChange: (userId: string, newRole: UserRole) => void;
  onStatusChange: (userId: string, active: boolean) => void;
}

export function UserTable({ users, onRoleChange, onStatusChange }: UserTableProps) {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="hidden md:table-cell">Last Login</TableHead>
            <TableHead>Status</TableHead>
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
                  onValueChange={(value: UserRole) => onRoleChange(user.id, value)}
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
                    onCheckedChange={(checked) => onStatusChange(user.id, !!checked)} 
                  />
                  <Badge variant={user.active ? "outline" : "secondary"} className="font-normal">
                    {user.active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
