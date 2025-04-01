
import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { UserTable } from "./users/UserTable";
import { UserManagementHeader } from "./users/UserManagementHeader";
import { useUserManagement } from "./users/useUserManagement";

export function UserManagementTab() {
  const { users, handleRoleChange, handleUserStatusChange, handleInviteUser } = useUserManagement();

  return (
    <Card>
      <CardHeader>
        <UserManagementHeader onInviteUser={handleInviteUser} />
      </CardHeader>
      <CardContent>
        <UserTable 
          users={users} 
          onRoleChange={handleRoleChange} 
          onStatusChange={handleUserStatusChange} 
        />
      </CardContent>
    </Card>
  );
}
