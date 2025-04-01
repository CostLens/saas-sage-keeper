
import React from "react";
import { Ban } from "lucide-react";
import { User } from "./types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

interface UserActionMenuProps {
  user: User;
  onRevokeAccess: (user: User) => void;
}

export function UserActionMenu({ user, onRevokeAccess }: UserActionMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => onRevokeAccess(user)}
          className="text-destructive"
          disabled={!user.active}
        >
          <Ban className="mr-2 h-4 w-4" />
          Revoke Access
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
