
import React from "react";
import { StatCard } from "@/components/ui/stat-card";
import { DollarSign, Users, TrendingDown, LayoutGrid, UserCheck, ArrowUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { RenewalCard } from "@/components/calendar/RenewalCard";
import { PaymentsCard } from "@/components/calendar/PaymentsCard";
import { TerminationsCard } from "@/components/calendar/TerminationsCard";
import { SaaSData } from "@/lib/mockData";

interface StatsCardsSectionProps {
  showUsageFeatures: boolean;
  totalSpend: number;
  overallUtilization: number;
  activeUsers: number;
  totalLicenses: number;
  unusedLicenses: number;
  potentialSavings: number;
  upcomingRenewals: Array<SaaSData & { renewalDateObj: Date }>;
  upcomingRenewalAmount: number;
  paymentsData: SaaSData[];
  paymentsAmount: number;
  terminationsData: SaaSData[];
  totalApps: number;
  activeEmployees: number;
}

export function StatsCardsSection({
  showUsageFeatures,
  totalSpend,
  overallUtilization,
  activeUsers,
  totalLicenses,
  unusedLicenses,
  potentialSavings,
  upcomingRenewals,
  upcomingRenewalAmount,
  paymentsData,
  paymentsAmount,
  terminationsData,
  totalApps,
  activeEmployees,
}: StatsCardsSectionProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Updated KPI cards at the top based on the screenshot
  const renderKpiCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
      {/* Total Annual SaaS Spend Card */}
      <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-normal text-muted-foreground mb-1">
              Total Annual SaaS Spend
            </h3>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold">{formatCurrency(totalSpend)}</p>
              <span className="text-sm font-medium text-red-500">-12%</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              12% increase from last year
            </p>
          </div>
          <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
            <DollarSign className="h-5 w-5 text-blue-500" />
          </div>
        </div>
      </div>

      {/* License Utilization Card */}
      <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-sm font-normal text-muted-foreground mb-1">
              License Utilization
            </h3>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold">{overallUtilization}%</p>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {activeUsers} active of {totalLicenses} total licenses
            </p>
          </div>
          <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
            <Users className="h-5 w-5 text-blue-500" />
          </div>
        </div>
        <Progress value={overallUtilization} className="h-2" />
      </div>

      {/* Potential Cost Savings Card */}
      <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-normal text-muted-foreground mb-1">
              Potential Cost Savings
            </h3>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold">{formatCurrency(potentialSavings)}</p>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {unusedLicenses} unused licenses across all apps
            </p>
          </div>
          <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
            <TrendingDown className="h-5 w-5 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Total Apps Card */}
      <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-normal text-muted-foreground mb-1">
              Total Apps
            </h3>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold">{totalApps}</p>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Across all departments
            </p>
          </div>
          <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
            <LayoutGrid className="h-5 w-5 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Active People Card */}
      <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-normal text-muted-foreground mb-1">
              Total Active People
            </h3>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold">{activeEmployees}</p>
              <span className="text-sm font-medium text-green-500">+5%</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              5% growth since last quarter
            </p>
          </div>
          <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
            <UserCheck className="h-5 w-5 text-blue-500" />
          </div>
        </div>
      </div>
    </div>
  );
  
  // Render the cards section
  return (
    <>
      {renderKpiCards()}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6">
        <div className="h-full">
          <RenewalCard 
            renewals={upcomingRenewals} 
            upcomingRenewalAmount={upcomingRenewalAmount} 
          />
        </div>
        <div className="h-full">
          <PaymentsCard 
            paymentsData={paymentsData} 
            paymentsAmount={paymentsAmount} 
          />
        </div>
        <div className="h-full">
          <TerminationsCard 
            terminationsData={terminationsData} 
          />
        </div>
      </div>
    </>
  );
}
