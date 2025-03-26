
import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { SaaSData } from "@/lib/mockData";
import { getTableColumns } from "./saas-table/tableColumns";

interface SaasTableProps {
  data: SaaSData[];
  onRowClick: (saas: SaaSData) => void;
  showUsage?: boolean;
}

export function SaasTable({ data, onRowClick, showUsage = true }: SaasTableProps) {
  const columns = getTableColumns(showUsage);

  return (
    <DataTable
      data={data}
      columns={columns}
      onRowClick={onRowClick}
      searchable
      searchField="name"
    />
  );
}
