
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShadowITData } from "@/hooks/useShadowITData";
import { FileText, Mail } from "lucide-react";
import { toast } from "sonner";
import { ShadowITDialogHeader } from "./details/ShadowITDialogHeader";
import { ShadowITOverview } from "./details/ShadowITOverview";
import { ShadowITCompliance } from "./details/ShadowITCompliance";
import { ShadowITUsers } from "./details/ShadowITUsers";

interface ShadowITDetailsDialogProps {
  app: ShadowITData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShadowITDetailsDialog({ app, open, onOpenChange }: ShadowITDetailsDialogProps) {
  const handleRequestOnboarding = () => {
    toast.success(`Onboarding request submitted for ${app.name}`, {
      description: "IT department has been notified of this request"
    });
    onOpenChange(false);
  };

  const handleContactAppOwner = () => {
    toast.success(`Message sent to app users of ${app.name}`, {
      description: "Users have been asked to provide additional information"
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <ShadowITDialogHeader app={app} />
        
        <Tabs defaultValue="overview">
          <TabsList className="w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 pt-4">
            <ShadowITOverview app={app} />
          </TabsContent>
          
          <TabsContent value="compliance" className="space-y-4 pt-4">
            <ShadowITCompliance app={app} />
          </TabsContent>
          
          <TabsContent value="users" className="space-y-4 pt-4">
            <ShadowITUsers app={app} />
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleContactAppOwner}>
            <Mail className="h-4 w-4 mr-2" />
            Contact Users
          </Button>
          <Button onClick={handleRequestOnboarding}>
            <FileText className="h-4 w-4 mr-2" />
            Request Formal Onboarding
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
