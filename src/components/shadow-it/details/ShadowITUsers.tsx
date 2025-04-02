
import React from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShadowITData } from "@/hooks/useShadowITData";

interface ShadowITUsersProps {
  app: ShadowITData;
}

export function ShadowITUsers({ app }: ShadowITUsersProps) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Key Users</h4>
        <div className="space-y-3">
          {app.keyUsers.map((user, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.department}</div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        
        <div className="pt-4">
          <h4 className="text-sm font-medium mb-2">Usage Statistics</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 bg-muted/30 rounded-md text-center">
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-xl font-bold">{app.usersCount}</p>
            </div>
            <div className="p-3 bg-muted/30 rounded-md text-center">
              <p className="text-sm text-muted-foreground">Active Last Week</p>
              <p className="text-xl font-bold">{app.activeLastWeek}</p>
            </div>
            <div className="p-3 bg-muted/30 rounded-md text-center">
              <p className="text-sm text-muted-foreground">Departments</p>
              <p className="text-xl font-bold">{app.departmentsCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
