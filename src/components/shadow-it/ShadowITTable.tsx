
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Shield, AlertCircle, Users, ChevronDown, ChevronUp, FileText, CheckCircle, XCircle } from "lucide-react";
import { ShadowITData } from "@/hooks/useShadowITData";
import { ShadowITDetailsDialog } from "./ShadowITDetailsDialog";

interface ShadowITTableProps {
  shadowITData: ShadowITData[];
  loading: boolean;
}

export function ShadowITTable({ shadowITData, loading }: ShadowITTableProps) {
  const [expandedApp, setExpandedApp] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] = useState<ShadowITData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleExpand = (appId: string) => {
    if (expandedApp === appId) {
      setExpandedApp(null);
    } else {
      setExpandedApp(appId);
    }
  };

  const handleOpenDetails = (app: ShadowITData) => {
    setSelectedApp(app);
    setDialogOpen(true);
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

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center items-center h-40">
            <p className="text-muted-foreground">Loading Shadow IT data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (shadowITData.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center items-center h-40">
            <p className="text-muted-foreground">No Shadow IT applications found</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Shadow IT Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Application</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Compliance</TableHead>
                <TableHead>Data Sensitivity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shadowITData.map((app) => (
                <React.Fragment key={app.id}>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                          {app.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{app.name}</div>
                          <div className="text-xs text-muted-foreground">{app.url}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{app.category}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {app.usersCount}
                      </div>
                    </TableCell>
                    <TableCell>{renderRiskBadge(app.riskLevel)}</TableCell>
                    <TableCell>
                      {app.isCompliant ? (
                        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          Compliant
                        </Badge>
                      ) : (
                        <Badge variant="destructive">Non-Compliant</Badge>
                      )}
                    </TableCell>
                    <TableCell>{app.dataSensitivity}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => toggleExpand(app.id)}
                        >
                          {expandedApp === app.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleOpenDetails(app)}
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  
                  {expandedApp === app.id && (
                    <TableRow>
                      <TableCell colSpan={7} className="bg-muted/30">
                        <div className="p-4">
                          <h4 className="font-medium mb-2">Certifications and Compliance</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <p className="text-sm font-medium">Security Certifications</p>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {app.certifications.map((cert, index) => (
                                  <Badge key={index} variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                    {cert}
                                  </Badge>
                                ))}
                                {app.certifications.length === 0 && (
                                  <span className="text-sm text-muted-foreground">None</span>
                                )}
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Data Processing</p>
                              <div className="flex flex-col gap-1 mt-1">
                                <div className="flex items-center gap-1">
                                  {app.gdprCompliant ? (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <XCircle className="h-4 w-4 text-red-500" />
                                  )}
                                  <span className="text-sm">GDPR Compliant</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  {app.hipaaCompliant ? (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <XCircle className="h-4 w-4 text-red-500" />
                                  )}
                                  <span className="text-sm">HIPAA Compliant</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Risk Factors</p>
                              <ul className="list-disc list-inside mt-1">
                                {app.riskFactors.map((factor, index) => (
                                  <li key={index} className="text-sm text-muted-foreground">
                                    {factor}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          
                          <h4 className="font-medium mb-2">Key Users</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {app.keyUsers.map((user, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs">
                                  {user.name.charAt(0)}
                                </div>
                                <div>
                                  <div className="text-sm font-medium">{user.name}</div>
                                  <div className="text-xs text-muted-foreground">{user.department}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {selectedApp && (
        <ShadowITDetailsDialog 
          app={selectedApp}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      )}
    </>
  );
}
