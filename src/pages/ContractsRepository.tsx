
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockContracts, ContractDocument } from "@/lib/mockData";
import { Filter, File, Building, Calendar, FileText, ChevronDown, ChevronRight, Download } from "lucide-react";
import { getSaasApplications } from "@/lib/supabaseService";
import { useQuery } from "@tanstack/react-query";
import { DocumentSearch } from "@/components/contracts/DocumentSearch";
import { DocumentGroupByType } from "@/components/contracts/DocumentGroupByType";
import { DocumentsBySaas } from "@/components/contracts/DocumentsBySaas";
import { DocumentViewModal } from "@/components/contracts/DocumentViewModal";
import { format } from "date-fns";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ContractsRepository = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<ContractDocument | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedSaas, setSelectedSaas] = useState<string | null>(null);
  const [expandedContracts, setExpandedContracts] = useState<string[]>([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });
  
  // Fetch SaaS applications from Supabase
  const { data: saasApplications, isLoading: saasLoading } = useQuery({
    queryKey: ['saasApplications'],
    queryFn: getSaasApplications,
  });
  
  // Listen for sidebar state changes
  useEffect(() => {
    const handleSidebarChange = (event: CustomEvent) => {
      setIsSidebarCollapsed(event.detail.isCollapsed);
    };
    
    window.addEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    
    return () => {
      window.removeEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    };
  }, []);

  // Filter documents based on search term
  const filteredDocuments = mockContracts.filter(
    (doc) =>
      (doc.saasName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       doc.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedSaas === null || doc.saasId === selectedSaas)
  );

  const handleDocumentClick = (document: ContractDocument) => {
    setSelectedDocument(document);
    setIsViewModalOpen(true);
  };

  // Group contracts by SaaS and organize them hierarchically
  const getHierarchicalContractsBySaas = () => {
    const result: Record<string, { 
      saasName: string, 
      contracts: Record<string, ContractDocument[]> 
    }> = {};
    
    // First, separate contracts from other document types
    const contracts = mockContracts.filter(doc => doc.type === "Contract");
    const otherDocs = mockContracts.filter(doc => doc.type !== "Contract");
    
    // Group contracts by SaaS and by year
    contracts.forEach(contract => {
      if (!result[contract.saasId]) {
        result[contract.saasId] = {
          saasName: contract.saasName,
          contracts: {}
        };
      }
      
      if (contract.contractPeriod) {
        const year = new Date(contract.contractPeriod.start).getFullYear().toString();
        
        if (!result[contract.saasId].contracts[year]) {
          result[contract.saasId].contracts[year] = [];
        }
        
        result[contract.saasId].contracts[year].push(contract);
      }
    });
    
    // Sort contracts within each year by date (most recent first)
    Object.keys(result).forEach(saasId => {
      Object.keys(result[saasId].contracts).forEach(year => {
        result[saasId].contracts[year].sort((a, b) => {
          const dateA = new Date(a.dateAdded);
          const dateB = new Date(b.dateAdded);
          return dateB.getTime() - dateA.getTime();
        });
      });
    });
    
    return { hierarchicalContracts: result, otherDocuments: otherDocs };
  };

  const { hierarchicalContracts, otherDocuments } = getHierarchicalContractsBySaas();

  const toggleContract = (contractId: string) => {
    setExpandedContracts(prev => 
      prev.includes(contractId) 
        ? prev.filter(id => id !== contractId) 
        : [...prev, contractId]
    );
  };

  // Function to get related documents for a contract
  const getRelatedDocuments = (contractId: string) => {
    return mockContracts.filter(doc => 
      doc.type !== "Contract" && doc.relatedContractId === contractId
    );
  };

  // Function to render hierarchical contracts for a SaaS
  const renderHierarchicalContracts = (saasId: string, saasName: string, contractsByYear: Record<string, ContractDocument[]>) => {
    return (
      <Card key={saasId} className="glass-panel">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center">
            <Building className="h-5 w-5 mr-2 text-primary" />
            {saasName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.keys(contractsByYear)
              .sort((a, b) => parseInt(b) - parseInt(a)) // Sort years in descending order
              .map(year => (
                <div key={`${saasId}-${year}`} className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-medium text-lg">{year}</h3>
                  </div>
                  
                  <div className="space-y-3 pl-4">
                    {contractsByYear[year].map(contract => {
                      const relatedDocs = getRelatedDocuments(contract.id);
                      return (
                        <Collapsible 
                          key={contract.id}
                          open={expandedContracts.includes(contract.id)}
                          onOpenChange={() => toggleContract(contract.id)}
                          className="border rounded-lg overflow-hidden"
                        >
                          <CollapsibleTrigger asChild>
                            <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-background rounded">
                                  <FileText className="h-5 w-5 text-blue-500" />
                                </div>
                                <div>
                                  <p className="font-medium">{contract.title}</p>
                                  <div className="flex items-center gap-2">
                                    {contract.contractPeriod && (
                                      <p className="text-xs text-muted-foreground">
                                        {format(new Date(contract.contractPeriod.start), "MMM d, yyyy")} - {format(new Date(contract.contractPeriod.end), "MMM d, yyyy")}
                                      </p>
                                    )}
                                    {contract.isRenewal && (
                                      <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-200">
                                        Renewal
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDocumentClick(contract);
                                  }}
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                                {expandedContracts.includes(contract.id) ? (
                                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                ) : (
                                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                )}
                              </div>
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            {relatedDocs.length > 0 ? (
                              <div className="p-3 pl-10 space-y-2 border-t bg-muted/10">
                                <p className="text-sm font-medium mb-2">Associated Documents</p>
                                {relatedDocs.map(doc => (
                                  <div 
                                    key={doc.id} 
                                    className="flex items-center justify-between p-2 rounded-md hover:bg-background cursor-pointer"
                                    onClick={() => handleDocumentClick(doc)}
                                  >
                                    <div className="flex items-center gap-3">
                                      <File className={
                                        doc.type === "Invoice" 
                                          ? "h-4 w-4 text-green-500" 
                                          : "h-4 w-4 text-amber-500"
                                      } />
                                      <div>
                                        <p className="text-sm">{doc.title}</p>
                                        <p className="text-xs text-muted-foreground">
                                          {format(new Date(doc.dateAdded), "MMM d, yyyy")} • {doc.size}
                                        </p>
                                      </div>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-7 w-7 p-0"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        // Download functionality would go here
                                      }}
                                    >
                                      <Download className="h-3.5 w-3.5" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="p-3 pl-10 border-t bg-muted/10">
                                <p className="text-sm text-muted-foreground">No associated documents found</p>
                              </div>
                            )}
                          </CollapsibleContent>
                        </Collapsible>
                      );
                    })}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className={`flex-1 flex flex-col ${isSidebarCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
        <Header />
        <main className="flex-1 p-6 space-y-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Contracts & Documents Repository</h1>
            <div className="flex gap-4">
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          {/* Search */}
          <DocumentSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <Tabs defaultValue="hierarchical" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="hierarchical" className="gap-2">
                <Calendar className="h-4 w-4" />
                By Year & Renewal
              </TabsTrigger>
              <TabsTrigger value="bySaas" className="gap-2">
                <Building className="h-4 w-4" />
                By SaaS Tool
              </TabsTrigger>
              <TabsTrigger value="byType" className="gap-2">
                <File className="h-4 w-4" />
                By Document Type
              </TabsTrigger>
            </TabsList>
            
            {/* Hierarchical Contract View */}
            <TabsContent value="hierarchical">
              <div className="space-y-6">
                {Object.keys(hierarchicalContracts).map(saasId => 
                  renderHierarchicalContracts(
                    saasId, 
                    hierarchicalContracts[saasId].saasName, 
                    hierarchicalContracts[saasId].contracts
                  )
                )}
              </div>
            </TabsContent>
            
            {/* By SaaS Tool View */}
            <TabsContent value="bySaas">
              <DocumentsBySaas 
                saasApplications={saasApplications}
                isLoading={saasLoading}
                documentsBySaas={Object.entries(hierarchicalContracts).reduce((acc, [saasId, { saasName }]) => {
                  acc[saasId] = { 
                    saasName, 
                    documents: mockContracts.filter(doc => doc.saasId === saasId)
                  };
                  return acc;
                }, {} as Record<string, { saasName: string; documents: ContractDocument[] }>)}
                onDocumentClick={handleDocumentClick}
              />
            </TabsContent>
            
            {/* By Document Type View */}
            <TabsContent value="byType">
              <DocumentGroupByType 
                documents={filteredDocuments} 
                onDocumentClick={handleDocumentClick} 
              />
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Document View Modal */}
      <DocumentViewModal 
        isOpen={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
        document={selectedDocument}
        onDocumentClick={handleDocumentClick}
      />
    </div>
  );
};

export default ContractsRepository;
