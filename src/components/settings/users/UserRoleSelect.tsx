
import React from "react";
import { UserRole } from "./types";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface UserRoleSelectProps {
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export function UserRoleSelect({ role, onRoleChange }: UserRoleSelectProps) {
  return (
    <Select
      defaultValue={role}
      onValueChange={(value: UserRole) => onRoleChange(value)}
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
  );
}
