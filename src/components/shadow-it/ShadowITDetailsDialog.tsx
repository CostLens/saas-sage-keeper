
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShadowITData } from "@/hooks/useShadowITData";
import { AlertTriangle, Shield, AlertCircle, Users, Server, FileText, CheckCircle, XCircle, Calendar, Mail } from "lucide-react";
import { toast } from "sonner";

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

  const renderRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case "High":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            High Risk
          </Badge>
        );
      case "Medium":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Medium Risk
          </Badge>
        );
      case "Low":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 flex items-center gap-1">
            <Shield className="h-3 w-3" />
            Low Risk
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              {app.name.charAt(0)}
            </div>
            {app.name}
            <span className="ml-2">{renderRiskBadge(app.riskLevel)}</span>
          </DialogTitle>
          <DialogDescription>
            {app.description}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="overview">
          <TabsList className="w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Category</p>
                <p>{app.category}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">URL</p>
                <p className="text-blue-600 dark:text-blue-400">{app.url}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">First Detected</p>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {app.firstDetected}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Data Sensitivity</p>
                <p>{app.dataSensitivity}</p>
              </div>
            </div>
            
            <div className="pt-4">
              <h4 className="text-sm font-medium mb-2">Risk Factors</h4>
              <ul className="list-disc list-inside space-y-1">
                {app.riskFactors.map((factor, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {factor}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-4">
              <h4 className="text-sm font-medium mb-2">Business Impact</h4>
              <p className="text-sm text-muted-foreground">{app.businessImpact}</p>
            </div>
          </TabsContent>
          
          <TabsContent value="compliance" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Compliance Status</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                    <span className="text-sm">Company Approved</span>
                    {app.isCompliant ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                    <span className="text-sm">GDPR Compliant</span>
                    {app.gdprCompliant ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                    <span className="text-sm">HIPAA Compliant</span>
                    {app.hipaaCompliant ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                    <span className="text-sm">Data Processing Agreement</span>
                    {app.hasDPA ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Security Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {app.certifications.map((cert, index) => (
                    <Badge key={index} variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      {cert}
                    </Badge>
                  ))}
                  {app.certifications.length === 0 && (
                    <p className="text-sm text-muted-foreground">No certifications found</p>
                  )}
                </div>
                
                <h4 className="text-sm font-medium mt-4 mb-2">Data Location</h4>
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-muted-foreground" />
                  <span>{app.dataLocation}</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-4 pt-4">
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
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => handleContactAppOwner()}>
            <Mail className="h-4 w-4 mr-2" />
            Contact Users
          </Button>
          <Button onClick={() => handleRequestOnboarding()}>
            <FileText className="h-4 w-4 mr-2" />
            Request Formal Onboarding
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
