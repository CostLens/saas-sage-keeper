
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, FileText, Users } from "lucide-react";
import { ShadowITData } from "@/hooks/useShadowITData";
import { ShadowITRiskBadge } from "./ShadowITRiskBadge";
import { ShadowITExpandedRow } from "./ShadowITExpandedRow";

interface ShadowITTableRowProps {
  app: ShadowITData;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onOpenDetails: () => void;
  onOpenUsers: () => void;
}

export function ShadowITTableRow({ 
  app, 
  isExpanded, 
  onToggleExpand, 
  onOpenDetails,
  onOpenUsers
}: ShadowITTableRowProps) {
  return (
    <>
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
          <div 
            className="flex items-center gap-1 hover:text-primary hover:underline cursor-pointer"
            onClick={onOpenUsers}
          >
            <Users className="h-4 w-4 text-muted-foreground" />
            {app.usersCount}
          </div>
        </TableCell>
        <TableCell><ShadowITRiskBadge riskLevel={app.riskLevel} /></TableCell>
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
              onClick={onToggleExpand}
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onOpenDetails}
            >
              <FileText className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
      
      {isExpanded && <ShadowITExpandedRow app={app} />}
    </>
  );
}
