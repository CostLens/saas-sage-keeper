
import React from "react";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { InviteUserDialog, InviteUserFormValues } from "./InviteUserDialog";

interface UserManagementHeaderProps {
  onInviteUser: (userData: InviteUserFormValues) => void;
}

export function UserManagementHeader({ onInviteUser }: UserManagementHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center space-y-2 sm:space-y-0">
      <div>
        <CardTitle>User Management</CardTitle>
        <CardDescription>
          Manage users and their access levels
        </CardDescription>
      </div>
      <InviteUserDialog onInviteUser={onInviteUser} />
    </div>
  );
}
