
import React from "react";
import { StatCard } from "@/components/ui/stat-card";
import { DollarSign, Users, TrendingDown, LayoutGrid, UserCheck } from "lucide-react";
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
  // Create more visually appealing KPI cards at the top based on design
  const renderKpiCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
      <StatCard
        key="managed-apps"
        title="MANAGED APPS"
        value={totalApps}
        icon={<LayoutGrid className="h-5 w-5" />}
        description={`${0} in ${new Date().toLocaleString('default', { month: 'short' })}`}
        className="h-full bg-blue-50 dark:bg-blue-900/20"
      >
        <div className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Unmanaged</span>
            <span className="font-medium bg-blue-100 dark:bg-blue-800/50 px-2 py-0.5 rounded-md">96</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Restricted</span>
            <span className="font-medium bg-blue-100 dark:bg-blue-800/50 px-2 py-0.5 rounded-md">25</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Needs Review</span>
            <span className="font-medium bg-blue-100 dark:bg-blue-800/50 px-2 py-0.5 rounded-md">1695</span>
          </div>
          <div className="flex justify-between items-center font-semibold pt-1">
            <span>Total Applications</span>
            <span className="bg-blue-100 dark:bg-blue-800/50 px-2 py-0.5 rounded-md">1890</span>
          </div>
        </div>
      </StatCard>
      
      <StatCard
        key="active-employees"
        title="ACTIVE EMPLOYEES"
        value={activeEmployees}
        icon={<UserCheck className="h-5 w-5" />}
        description={`${0} in ${new Date().toLocaleString('default', { month: 'short' })}`}
        className="h-full bg-blue-50 dark:bg-blue-900/20"
      >
        <div className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Group</span>
            <span className="font-medium bg-blue-100 dark:bg-blue-800/50 px-2 py-0.5 rounded-md">4</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Service</span>
            <span className="font-medium bg-blue-100 dark:bg-blue-800/50 px-2 py-0.5 rounded-md">16</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">External</span>
            <span className="font-medium bg-blue-100 dark:bg-blue-800/50 px-2 py-0.5 rounded-md">64</span>
          </div>
          <div className="flex justify-between items-center font-semibold pt-1">
            <span>Total Active Users</span>
            <span className="bg-blue-100 dark:bg-blue-800/50 px-2 py-0.5 rounded-md">1292</span>
          </div>
        </div>
      </StatCard>
      
      {showUsageFeatures && (
        <StatCard
          key="average-usage"
          title="AVERAGE USAGE"
          value={`${overallUtilization}%`}
          icon={<Users className="h-5 w-5" />}
          description={`${0}% in ${new Date().toLocaleString('default', { month: 'short' })}`}
          className="h-full bg-blue-50 dark:bg-blue-900/20"
        >
          <div className="mt-2">
            <Progress value={overallUtilization} className="h-1.5" />
          </div>
          
          <div className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                Alexa Marketing Stack
              </span>
              <span className="font-medium">5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-green-500"></div>
                Akaunting
              </span>
              <span className="font-medium">5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-gray-500"></div>
                AhoyTeam
              </span>
              <span className="font-medium">5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-blue-300"></div>
                Jira
              </span>
              <span className="font-medium">6%</span>
            </div>
          </div>
        </StatCard>
      )}
      
      <StatCard
        key="total-spend"
        title="TOTAL SPEND"
        value={`$${(totalSpend/1000).toFixed(2)}M`}
        icon={<DollarSign className="h-5 w-5" />}
        description={`$0 in ${new Date().toLocaleString('default', { month: 'short' })}`}
        className="h-full bg-blue-50 dark:bg-blue-900/20"
      >
        <div className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              Google Workspace
            </span>
            <span className="font-medium">$1.27M</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              Airwallex
            </span>
            <span className="font-medium">$460k</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              ADP Workforce
            </span>
            <span className="font-medium">$260k</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              ServiceNow
            </span>
            <span className="font-medium">$220k</span>
          </div>
        </div>
      </StatCard>
      
      <StatCard
        key="contract-renewals"
        title="CONTRACT RENEWALS"
        value={upcomingRenewals.length}
        icon={<DollarSign className="h-5 w-5" />}
        trend={{ value: 7, isPositive: false }}
        description={`-7 in ${new Date().toLocaleString('default', { month: 'short' })}`}
        className="h-full bg-blue-50 dark:bg-blue-900/20"
      >
        <div className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              Subscription 1
            </span>
            <span className="font-medium">$0</span>
          </div>
          <div className="flex justify-between items-center pt-1">
            <span className="text-muted-foreground invisible">Hidden</span>
            <span className="invisible">Hidden</span>
          </div>
          <div className="flex justify-between items-center pt-1">
            <span className="text-muted-foreground invisible">Hidden</span>
            <span className="invisible">Hidden</span>
          </div>
          <div className="flex justify-between items-center pt-1">
            <span className="text-muted-foreground invisible">Hidden</span>
            <span className="invisible">Hidden</span>
          </div>
        </div>
      </StatCard>
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
