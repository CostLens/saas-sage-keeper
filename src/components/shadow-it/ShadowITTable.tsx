
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
import { ShadowITData } from "@/hooks/useShadowITData";
import { ShadowITDetailsDialog } from "./ShadowITDetailsDialog";
import { ShadowITUsersDialog } from "./ShadowITUsersDialog";
import { ShadowITTableRow } from "./ShadowITTableRow";
import { ShadowITTablePlaceholder } from "./ShadowITTablePlaceholder";

interface ShadowITTableProps {
  shadowITData: ShadowITData[];
  loading: boolean;
}

export function ShadowITTable({ shadowITData, loading }: ShadowITTableProps) {
  const [expandedApp, setExpandedApp] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] = useState<ShadowITData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [usersDialogOpen, setUsersDialogOpen] = useState(false);

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

  const handleOpenUsers = (app: ShadowITData) => {
    setSelectedApp(app);
    setUsersDialogOpen(true);
  };

  if (loading || shadowITData.length === 0) {
    return <ShadowITTablePlaceholder loading={loading} />;
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
                <ShadowITTableRow
                  key={app.id}
                  app={app}
                  isExpanded={expandedApp === app.id}
                  onToggleExpand={() => toggleExpand(app.id)}
                  onOpenDetails={() => handleOpenDetails(app)}
                  onOpenUsers={() => handleOpenUsers(app)}
                />
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

      {selectedApp && (
        <ShadowITUsersDialog
          app={selectedApp}
          open={usersDialogOpen}
          onOpenChange={setUsersDialogOpen}
        />
      )}
    </>
  );
}
