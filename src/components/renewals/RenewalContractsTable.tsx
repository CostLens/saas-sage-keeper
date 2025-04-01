
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
import { Mail, CalendarClock } from "lucide-react";
import { toast } from "sonner";

interface RenewalContractsTableProps {
  contracts: SaaSData[];
}

export function RenewalContractsTable({ contracts }: RenewalContractsTableProps) {
  const handleDraftEmail = (saas: SaaSData) => {
    toast.success(`Email draft created for ${saas.name} renewal discussion`, {
      description: "Draft available in your email client"
    });
  };

  const handleStartRenewalWorkflow = (saas: SaaSData) => {
    toast.success(`Renewal workflow initiated for ${saas.name}`, {
      description: "Stakeholders have been notified"
    });
  };

  if (contracts.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
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
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contracts.map((saas) => {
          const recommendation = calculateRecommendation(saas);
          return (
            <TableRow key={saas.id}>
              <TableCell>
                <NameColumn row={saas} />
              </TableCell>
              <TableCell>{new Date(saas.renewalDate).toLocaleDateString()}</TableCell>
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
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDraftEmail(saas)}
                  >
                    <Mail className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Email</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleStartRenewalWorkflow(saas)}
                  >
                    <CalendarClock className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Workflow</span>
                  </Button>
                </div>
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
