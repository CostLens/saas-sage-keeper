
import React from "react";
import { format } from "date-fns";
import { FileText, ChevronDown, ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Invoice {
  id: string;
  title: string;
  date: string;
  amount: number;
}

interface ContractItemProps {
  id: string;
  title: string;
  dateRange: string;
  signedDate: string;
  term: string;
  isRenewal: boolean;
  isOriginal: boolean;
  invoices: Invoice[];
  isOpen: boolean;
  onToggle: (contractId: string) => void;
  formatCurrency: (amount: number) => string;
}

export function ContractItem({
  id,
  title,
  dateRange,
  signedDate,
  term,
  isRenewal,
  isOriginal,
  invoices,
  isOpen,
  onToggle,
  formatCurrency
}: ContractItemProps) {
  return (
    <Collapsible 
      key={id}
      open={isOpen}
      onOpenChange={() => onToggle(id)}
      className="border rounded-md"
    >
      <CollapsibleTrigger asChild>
        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-background rounded-md">
              <FileText className={`h-5 w-5 ${isOriginal ? 'text-emerald-500' : 'text-primary'}`} />
            </div>
            <div>
              <div className="font-medium flex items-center gap-2">
                {title}
                {isOriginal ? (
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded dark:bg-emerald-900 dark:text-emerald-200">
                    Original
                  </span>
                ) : (
                  <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-200">
                    Renewal
                  </span>
                )}
              </div>
              <div className="text-xs text-muted-foreground">{dateRange}</div>
            </div>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Download className="h-4 w-4" />
            </Button>
            {isOpen ? (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="p-4 border-t">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pb-4 border-b">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Contract Signed</h4>
              <p className="font-medium">{format(new Date(signedDate), "MMMM d, yyyy")}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Term</h4>
              <p className="font-medium">{term}</p>
            </div>
          </div>
          
          <h4 className="font-medium mb-3">Associated Invoices</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map(invoice => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.title}</TableCell>
                  <TableCell>{format(new Date(invoice.date), "MMM d, yyyy")}</TableCell>
                  <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
