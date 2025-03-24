
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ObligationData } from "@/lib/mockData";

interface ObligationsTableProps {
  data: ObligationData[];
}

export function ObligationsTable({ data }: ObligationsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>SaaS</TableHead>
          <TableHead>Obligation</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((obligation) => (
          <TableRow key={obligation.id}>
            <TableCell className="font-medium">{obligation.saasName}</TableCell>
            <TableCell>{obligation.description}</TableCell>
            <TableCell>{new Date(obligation.dueDate).toLocaleDateString()}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={
                  obligation.status === "pending"
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : obligation.status === "completed"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-red-50 text-red-700 border-red-200"
                }
              >
                {obligation.status.charAt(0).toUpperCase() + obligation.status.slice(1)}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
