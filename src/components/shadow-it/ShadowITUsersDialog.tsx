
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Users } from "lucide-react";
import { ShadowITData } from "@/hooks/useShadowITData";
import { toast } from "sonner";

interface ShadowITUsersDialogProps {
  app: ShadowITData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShadowITUsersDialog({ app, open, onOpenChange }: ShadowITUsersDialogProps) {
  const sendEmail = (email: string) => {
    toast.success(`Email composed to ${email}`, {
      description: "Email dialog opened in your default email client"
    });
  };

  const activeLastWeekPercent = Math.round((app.activeLastWeek / app.usersCount) * 100);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" /> 
            {app.name} Users
          </DialogTitle>
          <DialogDescription>
            {app.usersCount} total users, {app.activeLastWeek} active in the last week ({activeLastWeekPercent}% active)
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-muted/30 rounded-md text-center">
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-xl font-bold">{app.usersCount}</p>
            </div>
            <div className="p-3 bg-muted/30 rounded-md text-center">
              <p className="text-sm text-muted-foreground">Departments</p>
              <p className="text-xl font-bold">{app.departmentsCount}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Key Users</h3>
            <div className="space-y-3">
              {app.keyUsers.map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border">
                      <AvatarFallback className="bg-primary/10">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <Badge variant="outline" className="text-xs">{user.department}</Badge>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => sendEmail(user.email)}
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Departments Using {app.name}</h3>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(app.keyUsers.map(user => user.department))).map((department, index) => (
                <Badge key={index} variant="outline" className="bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  {department}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
