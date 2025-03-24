
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockContracts, ContractDocument } from "@/lib/mockData";
import { Filter, File, Building } from "lucide-react";
import { getSaasApplications } from "@/lib/supabaseService";
import { useQuery } from "@tanstack/react-query";
import { DocumentSearch } from "@/components/contracts/DocumentSearch";
import { DocumentGroupByType } from "@/components/contracts/DocumentGroupByType";
import { DocumentsBySaas } from "@/components/contracts/DocumentsBySaas";
import { DocumentViewModal } from "@/components/contracts/DocumentViewModal";

const ContractsRepository = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<ContractDocument | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedSaas, setSelectedSaas] = useState<string | null>(null);
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

  // Group documents by SaaS
  const getDocumentsBySaasId = () => {
    const result: Record<string, { saasName: string, documents: ContractDocument[] }> = {};
    
    mockContracts.forEach(doc => {
      if (!result[doc.saasId]) {
        result[doc.saasId] = {
          saasName: doc.saasName,
          documents: []
        };
      }
      result[doc.saasId].documents.push(doc);
    });
    
    return result;
  };

  const documentsBySaas = getDocumentsBySaasId();
  
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

          <Tabs defaultValue="bySaas" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="bySaas" className="gap-2">
                <Building className="h-4 w-4" />
                By SaaS Tool
              </TabsTrigger>
              <TabsTrigger value="byType" className="gap-2">
                <File className="h-4 w-4" />
                By Document Type
              </TabsTrigger>
            </TabsList>
            
            {/* By SaaS Tool View */}
            <TabsContent value="bySaas">
              <DocumentsBySaas 
                saasApplications={saasApplications}
                isLoading={saasLoading}
                documentsBySaas={documentsBySaas}
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
