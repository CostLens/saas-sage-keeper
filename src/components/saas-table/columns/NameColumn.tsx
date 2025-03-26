
import React from "react";
import { SaaSData } from "@/lib/mockData";

export function NameColumn({ row }: { row: SaaSData }) {
  return <div className="font-medium">{row.name}</div>;
}
