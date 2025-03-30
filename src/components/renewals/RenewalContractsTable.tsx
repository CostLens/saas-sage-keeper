
import React from "react";
import { SaaSData } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";
import { NameColumn } from "@/components/saas-table/columns/NameColumn";
import { calculateRecommendation, Recommendation } from "./LicenseRecommendation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface RenewalContractsTableProps {
  contracts: SaaSData[];
}

export function RenewalContractsTable({ contracts }: RenewalContractsTableProps) {
  if (contracts.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground dark:text-slate-400">
        No contracts due for renewal in the next 90 days
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>SaaS Application</TableHead>
          <TableHead>Renewal Date</TableHead>
          <TableHead>Current Price</TableHead>
          <TableHead>License Utilization</TableHead>
          <TableHead>Recommendation</TableHead>
          <TableHead>Potential Savings</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contracts.map((saas) => {
          const recommendation = calculateRecommendation(saas);
          return (
            <TableRow key={saas.id} className="dark:border-slate-800">
              <TableCell>
                <NameColumn row={saas} />
              </TableCell>
              <TableCell>
                {new Date(saas.renewalDate).toLocaleDateString()}
              </TableCell>
              <TableCell>{formatCurrency(saas.price)}</TableCell>
              <TableCell>
                <LicenseUtilizationCell saas={saas} />
              </TableCell>
              <TableCell>
                <RecommendationCell saas={saas} recommendation={recommendation} />
              </TableCell>
              <TableCell>
                <SavingsCell recommendation={recommendation} />
              </TableCell>
              <TableCell>
                <Button size="sm" variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:text-blue-400 dark:border-blue-900 dark:hover:bg-blue-950 dark:hover:text-blue-300">
                  Plan Renewal
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

function LicenseUtilizationCell({ saas }: { saas: SaaSData }) {
  return (
    <div className="flex flex-col">
      <span>
        {saas.usage.activeUsers} / {saas.usage.totalLicenses || 'Unlimited'}
      </span>
      <Badge 
        variant={saas.usage.utilizationRate > 80 ? "outline" : "destructive"} 
        className={
          saas.usage.utilizationRate > 80 
            ? "mt-1 text-green-500 border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800 dark:text-green-400" 
            : "mt-1 dark:bg-red-900 dark:text-red-300"
        }
      >
        {saas.usage.utilizationRate}% Utilized
      </Badge>
    </div>
  );
}

function RecommendationCell({ saas, recommendation }: { saas: SaaSData; recommendation: Recommendation | null }) {
  if (saas.pricingTerms === 'User-based' && saas.usage.totalLicenses) {
    return (
      <div className="flex flex-col">
        <Badge
          variant={recommendation?.action === "Reduce" ? "destructive" : "outline"}
          className={
            recommendation?.action === "Maintain"
              ? "bg-green-50 text-green-600 border-green-200 dark:bg-green-950 dark:border-green-800 dark:text-green-400"
              : recommendation?.action === "Reduce" 
                ? "dark:bg-red-900 dark:text-red-300" 
                : ""
          }
        >
          {recommendation?.action || "N/A"}
        </Badge>
        <span className="text-xs mt-1 text-muted-foreground">
          {recommendation?.suggestion || "N/A"}
        </span>
      </div>
    );
  }
  
  return <span className="text-muted-foreground">Not applicable</span>;
}

function SavingsCell({ recommendation }: { recommendation: Recommendation | null }) {
  if (recommendation?.potentialSavings) {
    return (
      <span className="font-medium text-green-600 dark:text-green-400">
        {formatCurrency(recommendation.potentialSavings)}
      </span>
    );
  }
  
  return <span className="text-muted-foreground">-</span>;
}
