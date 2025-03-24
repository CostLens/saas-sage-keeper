
import React, { useState } from "react";
import { SaaSData } from "@/lib/mockData";
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

interface ContractTabProps {
  saas: SaaSData;
}

export function ContractTab({ saas }: ContractTabProps) {
  // Mock data for contract history with clearer hierarchy
  const contractHistory = [
    {
      id: "contract-1",
      title: `${saas.name} Original Contract`,
      dateRange: "Jan 2021 - Dec 2021",
      signedDate: "2020-12-15",
      term: "Annual",
      isRenewal: false,
      isOriginal: true,
      year: 2021,
      invoices: [
        { id: "inv-1", title: "Invoice Q1 2021", date: "2021-01-15", amount: saas.price / 4 },
        { id: "inv-2", title: "Invoice Q2 2021", date: "2021-04-15", amount: saas.price / 4 },
        { id: "inv-3", title: "Invoice Q3 2021", date: "2021-07-15", amount: saas.price / 4 },
        { id: "inv-4", title: "Invoice Q4 2021", date: "2021-10-15", amount: saas.price / 4 },
      ]
    },
    {
      id: "contract-2",
      title: `${saas.name} Renewal Contract`,
      dateRange: "Jan 2022 - Dec 2022",
      signedDate: "2021-12-10",
      term: "Annual",
      isRenewal: true,
      isOriginal: false,
      year: 2022,
      invoices: [
        { id: "inv-5", title: "Invoice Q1 2022", date: "2022-01-15", amount: saas.price / 4 },
        { id: "inv-6", title: "Invoice Q2 2022", date: "2022-04-15", amount: saas.price / 4 },
        { id: "inv-7", title: "Invoice Q3 2022", date: "2022-07-15", amount: saas.price / 4 },
        { id: "inv-8", title: "Invoice Q4 2022", date: "2022-10-15", amount: saas.price / 4 },
      ]
    },
    {
      id: "contract-3",
      title: `${saas.name} Current Contract`,
      dateRange: "Jan 2023 - Dec 2023",
      signedDate: saas.contract.signedDate,
      term: saas.contract.term,
      isRenewal: true,
      isOriginal: false,
      year: 2023,
      invoices: [
        { id: "inv-9", title: "Invoice Q1 2023", date: "2023-01-15", amount: saas.price / 4 },
        { id: "inv-10", title: "Invoice Q2 2023", date: "2023-04-15", amount: saas.price / 4 },
        { id: "inv-11", title: "Invoice Q3 2023", date: "2023-07-15", amount: saas.price / 4 },
      ]
    },
  ];

  // Group contracts by year for better display
  const contractsByYear = contractHistory.reduce((acc, contract) => {
    if (!acc[contract.year]) {
      acc[contract.year] = [];
    }
    acc[contract.year].push(contract);
    return acc;
  }, {} as Record<number, typeof contractHistory>);

  const [openContracts, setOpenContracts] = useState<string[]>([contractHistory[contractHistory.length - 1].id]);

  const toggleContract = (contractId: string) => {
    setOpenContracts(prev => 
      prev.includes(contractId) 
        ? prev.filter(id => id !== contractId) 
        : [...prev, contractId]
    );
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="bg-muted/30 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Current Contract Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Contract Signed</h4>
            <p className="font-medium">{format(new Date(saas.contract.signedDate), "MMMM d, yyyy")}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Term</h4>
            <p className="font-medium">{saas.contract.term}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Auto-Renewal</h4>
            <p className="font-medium">{saas.contract.autoRenewal ? "Yes" : "No"}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Cancellation Deadline</h4>
            <p className="font-medium">
              {saas.contract.cancellationDeadline 
                ? format(new Date(saas.contract.cancellationDeadline), "MMMM d, yyyy")
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-muted/30 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Contract History</h3>
        <div className="space-y-6">
          {Object.keys(contractsByYear)
            .sort((a, b) => parseInt(a) - parseInt(b)) // Sort years in ascending order
            .map(year => (
              <div key={year} className="space-y-4">
                <h4 className="font-medium text-lg">{year}</h4>
                {contractsByYear[parseInt(year)].map(contract => (
                  <Collapsible 
                    key={contract.id}
                    open={openContracts.includes(contract.id)}
                    onOpenChange={() => toggleContract(contract.id)}
                    className="border rounded-md"
                  >
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-background rounded-md">
                            <FileText className={`h-5 w-5 ${contract.isOriginal ? 'text-emerald-500' : 'text-primary'}`} />
                          </div>
                          <div>
                            <div className="font-medium flex items-center gap-2">
                              {contract.title}
                              {contract.isOriginal ? (
                                <span className="text-xs bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded dark:bg-emerald-900 dark:text-emerald-200">
                                  Original
                                </span>
                              ) : (
                                <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-200">
                                  Renewal
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">{contract.dateRange}</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Download className="h-4 w-4" />
                          </Button>
                          {openContracts.includes(contract.id) ? (
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
                            <p className="font-medium">{format(new Date(contract.signedDate), "MMMM d, yyyy")}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Term</h4>
                            <p className="font-medium">{contract.term}</p>
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
                            {contract.invoices.map(invoice => (
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
                ))}
              </div>
            ))}
        </div>
      </div>
      
      <div className="bg-muted/30 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Associated Documents</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-md bg-background/50 hover:bg-background/80 transition-colors cursor-pointer border">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">{saas.name} Contract</p>
                <p className="text-xs text-muted-foreground">PDF • 1.2MB</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 rounded-md bg-background/50 hover:bg-background/80 transition-colors cursor-pointer border">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Latest Invoice</p>
                <p className="text-xs text-muted-foreground">PDF • 450KB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
