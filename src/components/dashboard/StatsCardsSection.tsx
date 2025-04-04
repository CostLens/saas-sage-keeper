
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
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
        <div className="text-sm font-medium text-muted-foreground mb-2">MANAGED APPS</div>
        <div className="text-4xl font-bold text-blue-600 mb-2">74</div>
        <div className="text-sm text-green-600 flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          0 in Jan
        </div>
        
        <div className="text-sm font-medium mb-2">Authorization Status</div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Unmanaged</span>
            <span className="font-medium bg-blue-100 dark:bg-blue-800/50 px-2 py-0.5 rounded-md">96</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Restricted</span>
            <span className="font-medium bg-blue-100 dark:bg-blue-800/50 px-2 py-0.5 rounded-md">25</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Needs Review</span>
            <span className="font-medium bg-blue-100 dark:bg-blue-800/50 px-2 py-0.5 rounded-md">1695</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="font-medium">Total Applications</span>
            <span className="font-medium bg-blue-100 dark:bg-blue-800/50 px-2 py-0.5 rounded-md">1890</span>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
        <div className="text-sm font-medium text-muted-foreground mb-2">ACTIVE EMPLOYEES</div>
        <div className="text-4xl font-bold text-blue-600 mb-2">1207</div>
        <div className="text-sm text-green-600 flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          0 in Jan
        </div>
        
        <div className="text-sm font-medium mb-2">User Types</div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Group</span>
            <span className="font-medium bg-blue-100 dark:bg-blue-800/50 px-2 py-0.5 rounded-md">4</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Service</span>
            <span className="font-medium bg-blue-100 dark:bg-blue-800/50 px-2 py-0.5 rounded-md">16</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">External</span>
            <span className="font-medium bg-blue-100 dark:bg-blue-800/50 px-2 py-0.5 rounded-md">64</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="font-medium">Total Active Users</span>
            <span className="font-medium bg-blue-100 dark:bg-blue-800/50 px-2 py-0.5 rounded-md">1292</span>
          </div>
        </div>
      </div>
      
      {showUsageFeatures && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
          <div className="text-sm font-medium text-muted-foreground mb-2">AVERAGE USAGE</div>
          <div className="text-4xl font-bold text-blue-600 mb-2">21%</div>
          <div className="text-sm text-green-600 flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            0% in Jan
          </div>
          
          <Progress value={21} className="h-1.5 mb-4" />
          
          <div className="text-sm font-medium mb-2">Managed apps with low usage</div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                Alexa Marketing Stack
              </span>
              <span className="font-medium">5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-green-500"></div>
                Akaunting
              </span>
              <span className="font-medium">5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-gray-500"></div>
                AhoyTeam
              </span>
              <span className="font-medium">5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-blue-300"></div>
                Jira
              </span>
              <span className="font-medium">6%</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium text-muted-foreground">TOTAL SPEND</div>
          <div className="bg-gray-200 text-xs font-medium px-1.5 py-0.5 rounded">FY 21-22 ▼</div>
        </div>
        <div className="text-4xl font-bold text-blue-600 mb-2">$2.24M</div>
        <div className="text-sm text-green-600 flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          $0 in Jan
        </div>
        
        <div className="text-sm font-medium mb-2">Top Applications By Spend</div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              Google Workspace
            </span>
            <span className="font-medium">$1.27M</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              Airwallex
            </span>
            <span className="font-medium">$460k</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              ADP Workforce
            </span>
            <span className="font-medium">$260k</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              ServiceNow
            </span>
            <span className="font-medium">$220k</span>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
        <div className="text-sm font-medium text-muted-foreground mb-2">CONTRACT RENEWALS</div>
        <div className="text-4xl font-bold text-blue-600 mb-2">34</div>
        <div className="text-sm text-red-600 flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          -7 in Jan
        </div>
        
        <div className="text-sm font-medium mb-2">Upcoming Contract Renewals</div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              Subscription 1
            </span>
            <span className="font-medium">$0</span>
          </div>
          <div className="flex justify-between">
            <span className="invisible">Hidden</span>
            <span className="invisible">Hidden</span>
          </div>
          <div className="flex justify-between">
            <span className="invisible">Hidden</span>
            <span className="invisible">Hidden</span>
          </div>
          <div className="flex justify-between">
            <span className="invisible">Hidden</span>
            <span className="invisible">Hidden</span>
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
