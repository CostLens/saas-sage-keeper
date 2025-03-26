
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { mockSaaSData, SaaSData } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, X, AlertTriangle, DollarSign } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const ContractNegotiation = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem("sidebar-collapsed") === "true";
  });
  
  const [renewalContracts, setRenewalContracts] = useState<SaaSData[]>([]);
  
  useEffect(() => {
    // Get contracts due for renewal in the next 90 days
    const now = new Date();
    const ninetyDaysFromNow = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
    
    const dueForRenewal = mockSaaSData.filter(saas => {
      if (saas.renewalDate === "N/A") return false;
      const renewalDate = new Date(saas.renewalDate);
      return renewalDate <= ninetyDaysFromNow && renewalDate >= now;
    });
    
    setRenewalContracts(dueForRenewal);
    
    const handleSidebarChange = (event: CustomEvent) => {
      setSidebarCollapsed(event.detail.isCollapsed);
    };
    
    window.addEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    
    return () => {
      window.removeEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    };
  }, []);
  
  // Calculate recommendation for license optimization
  const calculateRecommendation = (saas: SaaSData) => {
    if (saas.pricingTerms !== 'User-based' || !saas.usage.totalLicenses) {
      return null;
    }
    
    const utilizationRate = saas.usage.utilizationRate;
    const activeUsers = saas.usage.activeUsers;
    const totalLicenses = saas.usage.totalLicenses;
    
    if (utilizationRate >= 80) {
      return {
        action: "Maintain",
        suggestion: "Current utilization is optimal",
        newLicenses: totalLicenses,
        potentialSavings: 0
      };
    }
    
    // Recommend 20% buffer above current active users
    const recommendedLicenses = Math.ceil(activeUsers * 1.2);
    const licenseReduction = totalLicenses - recommendedLicenses;
    
    // Calculate savings based on price per license
    const pricePerLicense = saas.price / totalLicenses;
    const potentialSavings = licenseReduction * pricePerLicense;
    
    return {
      action: "Reduce",
      suggestion: `Reduce licenses from ${totalLicenses} to ${recommendedLicenses} (includes 20% buffer)`,
      newLicenses: recommendedLicenses,
      potentialSavings: potentialSavings
    };
  };

  // Calculate total potential savings
  const totalPotentialSavings = renewalContracts.reduce((total, saas) => {
    const recommendation = calculateRecommendation(saas);
    return total + (recommendation?.potentialSavings || 0);
  }, 0);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'ml-0 md:ml-16' : 'ml-0 md:ml-64'}`}>
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 md:p-6 space-y-6 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Contract Negotiation</h1>
                <p className="text-muted-foreground">
                  Review contracts due for renewal and identify cost-saving opportunities
                </p>
              </div>
              <Card className="w-full md:w-auto">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Potential Savings</p>
                      <p className="text-xl font-bold text-green-600">
                        {formatCurrency(totalPotentialSavings)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Contracts Due for Renewal (Next 90 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                {renewalContracts.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No contracts due for renewal in the next 90 days
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>SaaS Application</TableHead>
                        <TableHead>Renewal Date</TableHead>
                        <TableHead>Current Price</TableHead>
                        <TableHead>License Utilization</TableHead>
                        <TableHead>Recommendation</TableHead>
                        <TableHead>Potential Savings</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {renewalContracts.map((saas) => {
                        const recommendation = calculateRecommendation(saas);
                        return (
                          <TableRow key={saas.id}>
                            <TableCell className="font-medium">{saas.name}</TableCell>
                            <TableCell>{new Date(saas.renewalDate).toLocaleDateString()}</TableCell>
                            <TableCell>{formatCurrency(saas.price)}</TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span>
                                  {saas.usage.activeUsers} / {saas.usage.totalLicenses || 'Unlimited'}
                                </span>
                                <Badge 
                                  variant={saas.usage.utilizationRate > 80 ? "outline" : "destructive"} 
                                  className={
                                    saas.usage.utilizationRate > 80 
                                      ? "mt-1 text-green-500 border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800" 
                                      : "mt-1"
                                  }
                                >
                                  {saas.usage.utilizationRate}% Utilized
                                </Badge>
                              </div>
                            </TableCell>
                            <TableCell>
                              {saas.pricingTerms === 'User-based' && saas.usage.totalLicenses ? (
                                <div className="flex flex-col">
                                  <Badge
                                    variant={recommendation?.action === "Reduce" ? "destructive" : "outline"}
                                    className={
                                      recommendation?.action === "Maintain"
                                        ? "bg-green-50 text-green-600 border-green-200 dark:bg-green-950 dark:border-green-800"
                                        : ""
                                    }
                                  >
                                    {recommendation?.action || "N/A"}
                                  </Badge>
                                  <span className="text-xs mt-1 text-muted-foreground">
                                    {recommendation?.suggestion || "N/A"}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-muted-foreground">Not applicable</span>
                              )}
                            </TableCell>
                            <TableCell>
                              {recommendation?.potentialSavings ? (
                                <span className="font-medium text-green-600">
                                  {formatCurrency(recommendation.potentialSavings)}
                                </span>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ContractNegotiation;
