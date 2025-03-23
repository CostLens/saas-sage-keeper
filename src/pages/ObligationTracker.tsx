
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { ObligationCard } from "@/components/ObligationCard";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { format, isAfter, isBefore, isToday } from "date-fns";
import { mockObligations, mockSaasData, ObligationData } from "@/lib/mockData";
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Search,
  Filter,
  XCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";

const ObligationTracker = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedObligation, setSelectedObligation] = useState<ObligationData | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Filter the obligations based on search term
  const filteredObligations = mockObligations.filter(
    (obligation) =>
      obligation.saasName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      obligation.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group obligations by status
  const pendingObligations = filteredObligations.filter(
    (obligation) => obligation.status === "Pending"
  );
  
  const overdueObligations = filteredObligations.filter(
    (obligation) => 
      obligation.status === "Overdue" || 
      (obligation.status === "Pending" && isAfter(new Date(), new Date(obligation.dueDate)))
  );
  
  const completedObligations = filteredObligations.filter(
    (obligation) => obligation.status === "Completed"
  );

  // Group obligations by urgency for the pending tab
  const urgentObligations = pendingObligations.filter(
    (obligation) => isAfter(new Date(obligation.dueDate), new Date()) && 
                    isBefore(new Date(obligation.dueDate), new Date(new Date().setDate(new Date().getDate() + 7)))
  );
  
  const upcomingObligations = pendingObligations.filter(
    (obligation) => isAfter(new Date(obligation.dueDate), new Date(new Date().setDate(new Date().getDate() + 7)))
  );
  
  const todayObligations = pendingObligations.filter(
    (obligation) => isToday(new Date(obligation.dueDate))
  );

  const handleObligationClick = (obligation: ObligationData) => {
    setSelectedObligation(obligation);
    setIsDetailModalOpen(true);
  };

  // Find the associated SaaS for the selected obligation
  const associatedSaas = selectedObligation 
    ? mockSaasData.find(saas => saas.id === selectedObligation.saasId)
    : null;

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 pl-64 flex flex-col">
        <Header />
        <main className="flex-1 p-6 space-y-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Obligation Management</h1>
            <Button>Add New Obligation</Button>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search obligations..."
                className="pl-10 bg-background/50 backdrop-blur-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Obligations by Status Tabs */}
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="pending" className="gap-2">
                <Clock className="h-4 w-4" />
                Pending ({pendingObligations.length})
              </TabsTrigger>
              <TabsTrigger value="overdue" className="gap-2">
                <AlertTriangle className="h-4 w-4" />
                Overdue ({overdueObligations.length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="gap-2">
                <CheckCircle className="h-4 w-4" />
                Completed ({completedObligations.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="pending" className="space-y-6">
              {todayObligations.length > 0 && (
                <>
                  <h2 className="text-lg font-medium flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Due Today
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {todayObligations.map((obligation) => (
                      <ObligationCard
                        key={obligation.id}
                        obligation={obligation}
                        onClick={() => handleObligationClick(obligation)}
                      />
                    ))}
                  </div>
                </>
              )}
              
              {urgentObligations.length > 0 && (
                <>
                  <h2 className="text-lg font-medium flex items-center gap-2 mt-8">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    Due This Week
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {urgentObligations.map((obligation) => (
                      <ObligationCard
                        key={obligation.id}
                        obligation={obligation}
                        onClick={() => handleObligationClick(obligation)}
                      />
                    ))}
                  </div>
                </>
              )}
              
              {upcomingObligations.length > 0 && (
                <>
                  <h2 className="text-lg font-medium flex items-center gap-2 mt-8">
                    <Calendar className="h-5 w-5" />
                    Upcoming
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingObligations.map((obligation) => (
                      <ObligationCard
                        key={obligation.id}
                        obligation={obligation}
                        onClick={() => handleObligationClick(obligation)}
                      />
                    ))}
                  </div>
                </>
              )}
              
              {pendingObligations.length === 0 && (
                <div className="text-center py-12 bg-muted/30 rounded-lg">
                  <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">No pending obligations</h3>
                  <p className="text-muted-foreground">All your tasks are currently completed.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="overdue">
              {overdueObligations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {overdueObligations.map((obligation) => (
                    <ObligationCard
                      key={obligation.id}
                      obligation={{ ...obligation, status: "Overdue" }}
                      onClick={() => handleObligationClick(obligation)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-muted/30 rounded-lg">
                  <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">No overdue obligations</h3>
                  <p className="text-muted-foreground">You're on track with all your tasks.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="completed">
              {completedObligations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedObligations.map((obligation) => (
                    <ObligationCard
                      key={obligation.id}
                      obligation={obligation}
                      onClick={() => handleObligationClick(obligation)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-muted/30 rounded-lg">
                  <XCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">No completed obligations</h3>
                  <p className="text-muted-foreground">You haven't completed any obligations yet.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Obligation Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-2xl glass-panel animate-scale-in">
          {selectedObligation && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedObligation.saasName} Obligation</DialogTitle>
                <DialogDescription>{selectedObligation.description}</DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Due Date</div>
                    <div className="font-medium">
                      {format(new Date(selectedObligation.dueDate), "MMMM d, yyyy")}
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Status</div>
                    <div className="font-medium flex items-center gap-2">
                      {selectedObligation.status === "Completed" ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Completed
                        </>
                      ) : isAfter(new Date(), new Date(selectedObligation.dueDate)) ? (
                        <>
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          Overdue
                        </>
                      ) : (
                        <>
                          <Clock className="h-4 w-4 text-amber-500" />
                          Pending
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                {associatedSaas && (
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-3">Related SaaS Information</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground">Renewal Date</div>
                        <div className="font-medium">
                          {associatedSaas.renewalDate === "N/A" 
                            ? "N/A" 
                            : format(new Date(associatedSaas.renewalDate), "MMMM d, yyyy")}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-muted-foreground">Annual Cost</div>
                        <div className="font-medium">
                          ${associatedSaas.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-3">Obligation Details</div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Type</div>
                      <div className="font-medium">{selectedObligation.type}</div>
                    </div>
                    
                    <div>
                      <div className="text-xs text-muted-foreground">Priority</div>
                      <div className="font-medium">{selectedObligation.priority}</div>
                    </div>
                    
                    <div>
                      <div className="text-xs text-muted-foreground">Description</div>
                      <div className="font-medium">{selectedObligation.description}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  {selectedObligation.status !== "Completed" && (
                    <Button className="gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Mark as Completed
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ObligationTracker;
