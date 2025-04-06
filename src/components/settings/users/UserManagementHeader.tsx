
import React from "react";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { InviteUserDialog, InviteUserFormValues } from "./InviteUserDialog";

interface UserManagementHeaderProps {
  onInviteUser: (userData: InviteUserFormValues) => void;
}

export function UserManagementHeader({ onInviteUser }: UserManagementHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center w-full">
      <div>
        <CardTitle>User Management</CardTitle>
        <CardDescription>
          Manage users and their access levels
        </CardDescription>
      </div>
      <div className="mt-3 sm:mt-0">
        <InviteUserDialog onInviteUser={onInviteUser} />
      </div>
    </div>
  );
}
