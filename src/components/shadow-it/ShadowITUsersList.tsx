
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShadowITData } from "@/hooks/useShadowITData";
import { Badge } from "@/components/ui/badge";

interface ShadowITUsersListProps {
  app: ShadowITData;
}

export function ShadowITUsersList({ app }: ShadowITUsersListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Users & Certifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Users</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Access Level</TableHead>
                <TableHead>Last Activity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {app.users.map((user, index) => (
                <TableRow key={`${user}-${index}`}>
                  <TableCell>{user}</TableCell>
                  <TableCell>
                    {Math.random() > 0.5 ? 'Admin' : 'User'}
                  </TableCell>
                  <TableCell>
                    {new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Certifications</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Certification</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Checked</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {app.certifications.map((cert, index) => (
                <TableRow key={`${cert.name}-${index}`}>
                  <TableCell>{cert.name}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={cert.status === 'Verified' ? 'success' : cert.status === 'Failed' ? 'destructive' : 'outline'}
                    >
                      {cert.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {cert.lastChecked 
                      ? new Date(cert.lastChecked).toLocaleDateString() 
                      : 'N/A'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
