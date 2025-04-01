
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

interface UserStatusProps {
  active: boolean;
  onStatusChange: (active: boolean) => void;
}

export function UserStatus({ active, onStatusChange }: UserStatusProps) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox 
        checked={active} 
        onCheckedChange={(checked) => onStatusChange(!!checked)} 
      />
      <Badge variant={active ? "outline" : "secondary"} className="font-normal">
        {active ? "Active" : "Inactive"}
      </Badge>
    </div>
  );
}
