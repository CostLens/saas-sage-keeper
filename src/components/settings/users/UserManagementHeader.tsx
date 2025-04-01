
import React from "react";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

interface UserManagementHeaderProps {
  onInviteUser: () => void;
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
      <Button onClick={onInviteUser} className="gap-2">
        <UserPlus className="h-4 w-4" />
        Invite User
      </Button>
    </div>
  );
}
