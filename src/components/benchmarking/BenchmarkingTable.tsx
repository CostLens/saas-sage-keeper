
import React from "react";
import { SaaSData } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";
import { NameColumn } from "@/components/saas-table/columns/NameColumn";
import { TrendingDown, TrendingUp, MinusIcon, Database, Tag, Users } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PricingTermsColumn } from "@/components/saas-table/columns/PricingTermsColumn";

export interface BenchmarkProps {
  industryAvgPrice: number;
  priceDifference: number;
  pricingStatus: "below" | "above" | "average";
  similarCompanies: number;
  potentialSavings: number;
}

export interface BenchmarkSaaSData extends SaaSData {
  benchmarking: BenchmarkProps;
}

interface BenchmarkingTableProps {
  benchmarkData: BenchmarkSaaSData[];
}

export function BenchmarkingTable({ benchmarkData }: BenchmarkingTableProps) {
  if (benchmarkData.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No SaaS applications found
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>SaaS Application</TableHead>
          <TableHead>Your Price</TableHead>
          <TableHead>Pricing Terms</TableHead>
          <TableHead>Market Average</TableHead>
          <TableHead className="text-center">Price Comparison</TableHead>
          <TableHead>Potential Savings</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {benchmarkData.map((saas) => (
          <TableRow key={saas.id}>
            <TableCell>
              <NameColumn row={saas} />
            </TableCell>
            <TableCell className="font-medium">
              {formatCurrency(saas.price)}
            </TableCell>
            <TableCell>
              <PricingTermsColumn row={saas} />
            </TableCell>
            <TableCell>
              {formatCurrency(saas.benchmarking.industryAvgPrice)}
            </TableCell>
            <TableCell className="text-center">
              <PriceComparisonCell benchmarking={saas.benchmarking} />
            </TableCell>
            <TableCell>
              {saas.benchmarking.potentialSavings > 0 ? (
                <span className="font-medium text-green-600">
                  {formatCurrency(saas.benchmarking.potentialSavings)}
                </span>
              ) : (
                <span className="text-muted-foreground">-</span>
              )}
            </TableCell>
            <TableCell>
              <ActionBadge pricingStatus={saas.benchmarking.pricingStatus} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function PriceComparisonCell({ benchmarking }: { benchmarking: BenchmarkProps }) {
  const difference = Math.abs(benchmarking.priceDifference).toFixed(1);
  
  if (benchmarking.pricingStatus === "above") {
    return (
      <div className="flex items-center justify-center gap-1 text-red-600">
        <TrendingUp className="h-4 w-4" />
        <span>{difference}% Above Market</span>
      </div>
    );
  } else if (benchmarking.pricingStatus === "below") {
    return (
      <div className="flex items-center justify-center gap-1 text-green-600">
        <TrendingDown className="h-4 w-4" />
        <span>{difference}% Below Market</span>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center gap-1 text-blue-600">
        <MinusIcon className="h-4 w-4" />
        <span>At Market Price</span>
      </div>
    );
  }
}

function ActionBadge({ pricingStatus }: { pricingStatus: "below" | "above" | "average" }) {
  if (pricingStatus === "above") {
    return (
      <Badge className="bg-red-100 text-red-800 hover:bg-red-200 cursor-pointer">
        Negotiate
      </Badge>
    );
  } else if (pricingStatus === "average") {
    return (
      <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100 cursor-pointer">
        Review
      </Badge>
    );
  } else {
    return (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer">
        Maintain
      </Badge>
    );
  }
}
