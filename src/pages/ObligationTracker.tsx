import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { mockSaaSData, mockObligations, ObligationData } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { 
  Search, 
  FileText, 
  Filter, 
  MoreHorizontal, 
  Download,
  RefreshCw,
  Check,
  X,
  AlertTriangle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ObligationTracker = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [showCompleted, setShowCompleted] = useState(false);
  const [obligations, setObligations] = useState<ObligationData[]>(mockObligations);
  const [isAddObligationDialogOpen, setIsAddObligationDialogOpen] = useState(false);
  const [newObligation, setNewObligation] = useState<Omit<ObligationData, 'id'>>({
    saasId: "",
    saasName: "",
    type: "Payment",
    description: "",
    dueDate: new Date().toISOString().split('T')[0],
    status: "Pending",
    priority: "Medium"
  });

  // Filter obligations based on search, type, and status
  const filteredObligations = obligations.filter(obligation => {
    const matchesSearch = 
      obligation.saasName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      obligation.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = !selectedType || obligation.type === selectedType;
    const matchesStatus = showCompleted ? true : obligation.status !== "Completed";
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Get unique types for filter
  const types = [...new Set(obligations.map(obligation => obligation.type))];
  
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

  // Handle obligation completion
  const handleCompleteObligation = (id: string) => {
    setObligations(obligations.map(obligation => 
      obligation.id === id ? { ...obligation, status: "Completed" } : obligation
    ));
    toast.success("Obligation marked as completed");
  };

  // Handle obligation removal
  const handleRemoveObligation = (id: string) => {
    setObligations(obligations.filter(obligation => obligation.id !== id));
    toast.success("Obligation removed");
  };

  // Handle adding a new obligation
  const handleAddObligation = () => {
    if (!newObligation.saasId || !newObligation.saasName || !newObligation.description || !newObligation.dueDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newId = Math.random().toString(36).substring(2, 15);
    setObligations([...obligations, { id: newId, ...newObligation }]);
    setIsAddObligationDialogOpen(false);
    setNewObligation({
      saasId: "",
      saasName: "",
      type: "Payment",
      description: "",
      dueDate: new Date().toISOString().split('T')[0],
      status: "Pending",
      priority: "Medium"
    });
    toast.success("New obligation added");
  };

  // Helper function to export obligations data as CSV
  const exportObligationsData = () => {
    if (!filteredObligations || filteredObligations.length === 0) {
      toast.error("No data to export");
      return;
    }

    // Create CSV content
    const headers = ["SaaS Name", "Type", "Description", "Due Date", "Status", "Priority"];
    const csvContent = filteredObligations.map(obligation => [
      obligation.saasName,
      obligation.type,
      obligation.description,
      obligation.dueDate,
      obligation.status,
      obligation.priority
    ].join(","));

    // Combine headers and content
    const csv = [headers.join(","), ...csvContent].join("\n");
    
    // Create download link
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "obligations-data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Data exported successfully");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <Header />
        <main className="flex-1 p-6 space-y-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Obligation Tracker</h1>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setObligations(mockObligations)}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset Data
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={exportObligationsData}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button onClick={() => setIsAddObligationDialogOpen(true)}>
                <FileText className="h-4 w-4 mr-2" />
                Add Obligation
              </Button>
            </div>
          </div>
          
          {/* Filters and search */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search obligations..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="type" className="min-w-[80px]">Type:</Label>
                    <select 
                      id="type"
                      className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                    >
                      <option value="">All</option>
                      {types.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="showCompleted">Show Completed:</Label>
                    <Switch 
                      id="showCompleted" 
                      checked={showCompleted}
                      onCheckedChange={setShowCompleted}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Obligations Table */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Obligations</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SaaS Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredObligations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">No obligations found</TableCell>
                    </TableRow>
                  ) : (
                    filteredObligations.map(obligation => (
                      <TableRow key={obligation.id}>
                        <TableCell className="font-medium">{obligation.saasName}</TableCell>
                        <TableCell>{obligation.type}</TableCell>
                        <TableCell>{obligation.description}</TableCell>
                        <TableCell>{obligation.dueDate}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            obligation.status === 'Pending' 
                              ? 'bg-amber-100 text-amber-800' 
                              : obligation.status === 'Completed' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {obligation.status}
                          </span>
                        </TableCell>
                        <TableCell>{obligation.priority}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleCompleteObligation(obligation.id)}>
                                <Check className="h-4 w-4 mr-2" />
                                Mark as Completed
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleRemoveObligation(obligation.id)}>
                                <X className="h-4 w-4 mr-2" />
                                Remove
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {/* Add Obligation Dialog */}
          <Dialog open={isAddObligationDialogOpen} onOpenChange={setIsAddObligationDialogOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Obligation</DialogTitle>
                <DialogDescription>
                  Create a new obligation for tracking purposes
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="saasName">SaaS Name</Label>
                    <Input 
                      id="saasName" 
                      placeholder="SaaS Name" 
                      value={newObligation.saasName}
                      onChange={(e) => setNewObligation({ ...newObligation, saasName: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="saasId">SaaS ID</Label>
                    <Input 
                      id="saasId" 
                      placeholder="SaaS ID"
                      value={newObligation.saasId}
                      onChange={(e) => setNewObligation({ ...newObligation, saasId: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input 
                    id="description" 
                    placeholder="Description" 
                    value={newObligation.description}
                    onChange={(e) => setNewObligation({ ...newObligation, description: e.target.value })}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <select 
                      id="type"
                      className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={newObligation.type}
                      onChange={(e) => setNewObligation({ ...newObligation, type: e.target.value as any })}
                    >
                      <option value="Payment">Payment</option>
                      <option value="Review">Review</option>
                      <option value="Cancellation">Cancellation</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input 
                      type="date" 
                      id="dueDate" 
                      className="h-10"
                      value={newObligation.dueDate}
                      onChange={(e) => setNewObligation({ ...newObligation, dueDate: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <select 
                      id="priority"
                      className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={newObligation.priority}
                      onChange={(e) => setNewObligation({ ...newObligation, priority: e.target.value as any })}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddObligationDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddObligation}>Add Obligation</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default ObligationTracker;
