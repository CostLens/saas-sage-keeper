import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockContracts, ContractDocument } from "@/lib/mockData";
import { format } from "date-fns";
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  File, 
  ReceiptText,
  Pencil
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ContractsRepository = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<ContractDocument | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Filter documents based on search term
  const filteredDocuments = mockContracts.filter(
    (doc) =>
      doc.saasName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group documents by type
  const contracts = filteredDocuments.filter(doc => doc.type === "Contract");
  const invoices = filteredDocuments.filter(doc => doc.type === "Invoice");
  const amendments = filteredDocuments.filter(doc => doc.type === "Amendment");

  const handleDocumentClick = (document: ContractDocument) => {
    setSelectedDocument(document);
    setIsViewModalOpen(true);
  };

  // Document type badge
  const getDocumentTypeBadge = (type: string) => {
    switch (type) {
      case "Contract":
        return (
          <Badge variant="outline" className="text-blue-500 bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
            <FileText className="h-3 w-3 mr-1" />
            {type}
          </Badge>
        );
      case "Invoice":
        return (
          <Badge variant="outline" className="text-green-500 bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
            <ReceiptText className="h-3 w-3 mr-1" />
            {type}
          </Badge>
        );
      case "Amendment":
        return (
          <Badge variant="outline" className="text-amber-500 bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800">
            <Pencil className="h-3 w-3 mr-1" />
            {type}
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            <File className="h-3 w-3 mr-1" />
            {type}
          </Badge>
        );
    }
  };

  // Define columns for the data table
  const documentColumns = [
    {
      id: "title",
      header: "Document",
      sortable: true,
      cell: (row: ContractDocument) => (
        <div className="flex items-center gap-2">
          <div className="p-2 bg-muted/50 rounded">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="font-medium">{row.title}</div>
            <div className="text-xs text-muted-foreground">{row.size}</div>
          </div>
        </div>
      ),
    },
    {
      id: "type",
      header: "Type",
      sortable: true,
      cell: (row: ContractDocument) => getDocumentTypeBadge(row.type),
    },
    {
      id: "saasName",
      header: "SaaS",
      sortable: true,
      cell: (row: ContractDocument) => row.saasName,
    },
    {
      id: "dateAdded",
      header: "Date Added",
      sortable: true,
      cell: (row: ContractDocument) => format(new Date(row.dateAdded), "MMM d, yyyy"),
    },
    {
      id: "actions",
      header: "",
      cell: () => (
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Download className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 pl-64 flex flex-col">
        <Header />
        <main className="flex-1 p-6 space-y-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Contracts & Invoices</h1>
            <div className="flex gap-4">
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search contracts and invoices..."
              className="pl-10 bg-background/50 backdrop-blur-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Documents Tab */}
          <Card className="glass-panel">
            <CardHeader className="pb-1">
              <CardTitle>Document Repository</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="all" className="gap-2">
                    <File className="h-4 w-4" />
                    All ({filteredDocuments.length})
                  </TabsTrigger>
                  <TabsTrigger value="contracts" className="gap-2">
                    <FileText className="h-4 w-4" />
                    Contracts ({contracts.length})
                  </TabsTrigger>
                  <TabsTrigger value="invoices" className="gap-2">
                    <ReceiptText className="h-4 w-4" />
                    Invoices ({invoices.length})
                  </TabsTrigger>
                  <TabsTrigger value="amendments" className="gap-2">
                    <Pencil className="h-4 w-4" />
                    Amendments ({amendments.length})
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="all">
                  <DataTable
                    data={filteredDocuments}
                    columns={documentColumns}
                    onRowClick={handleDocumentClick}
                    searchable={false}
                  />
                </TabsContent>
                
                <TabsContent value="contracts">
                  <DataTable
                    data={contracts}
                    columns={documentColumns}
                    onRowClick={handleDocumentClick}
                    searchable={false}
                  />
                </TabsContent>
                
                <TabsContent value="invoices">
                  <DataTable
                    data={invoices}
                    columns={documentColumns}
                    onRowClick={handleDocumentClick}
                    searchable={false}
                  />
                </TabsContent>
                
                <TabsContent value="amendments">
                  <DataTable
                    data={amendments}
                    columns={documentColumns}
                    onRowClick={handleDocumentClick}
                    searchable={false}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Document View Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl glass-panel animate-scale-in">
          {selectedDocument && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedDocument.title}</DialogTitle>
                <DialogDescription>
                  View document details and content
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">SaaS Application</div>
                    <div className="font-medium">{selectedDocument.saasName}</div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Document Type</div>
                    <div className="font-medium">{selectedDocument.type}</div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Date Added</div>
                    <div className="font-medium">
                      {format(new Date(selectedDocument.dateAdded), "MMMM d, yyyy")}
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">File Size</div>
                    <div className="font-medium">{selectedDocument.size}</div>
                  </div>
                </div>
                
                <div className="rounded-lg border border-dashed p-12 flex flex-col items-center justify-center bg-muted/30">
                  <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-center text-muted-foreground">Document preview not available</p>
                  <Button className="mt-4 gap-2">
                    <Download className="h-4 w-4" />
                    Download Document
                  </Button>
                </div>
                
                {selectedDocument.type === "Contract" && (
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-3">Related Documents</div>
                    <div className="space-y-2">
                      {mockContracts
                        .filter(doc => 
                          doc.saasId === selectedDocument.saasId && 
                          doc.id !== selectedDocument.id
                        )
                        .map((doc, index) => (
                          <div 
                            key={index} 
                            className="flex items-center justify-between p-3 rounded-md bg-background/50 hover:bg-background/80 transition-colors cursor-pointer border"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-primary" />
                              <div>
                                <p className="font-medium">{doc.title}</p>
                                <p className="text-xs text-muted-foreground">{doc.type} • {doc.size}</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContractsRepository;
