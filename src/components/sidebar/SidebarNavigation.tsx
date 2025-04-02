
import React from "react";
import { useLocation } from "react-router-dom";
import { NavSection } from "./NavSection";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  BarChart3, 
  FileText, 
  LayoutDashboard, 
  Settings, 
  TrendingUp, 
  Users, 
  Bot,
  UserCog,
  Repeat2,
  LineChart,
  ShieldAlert,
  GitCompare,
  Workflow,
  PlusCircle,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NavItem } from "./NavItem";

interface SidebarNavigationProps {
  isCollapsed: boolean;
  showUsageFeatures: boolean;
  showBoardingFeatures: boolean;
  showNegotiationFeatures: boolean;
  showBenchmarkingFeatures: boolean;
  showComplianceFeatures: boolean;
  showWorkflowFeatures: boolean;
  showDuplicateAppFeatures: boolean;
  showCopilotFeatures: boolean;
  showProcurementFeatures: boolean;
}

export function SidebarNavigation({
  isCollapsed,
  showUsageFeatures,
  showBoardingFeatures,
  showNegotiationFeatures,
  showBenchmarkingFeatures,
  showComplianceFeatures,
  showWorkflowFeatures,
  showDuplicateAppFeatures,
  showCopilotFeatures,
  showProcurementFeatures
}: SidebarNavigationProps) {
  const location = useLocation();
  
  return (
    <div className="space-y-4 py-4 flex flex-col flex-1 overflow-auto">
      <NavSection isCollapsed={isCollapsed} title="Overview">
        <NavItem 
          isCollapsed={isCollapsed} 
          icon={LayoutDashboard} 
          title="Dashboard"
          href="/dashboard"
          isActive={location.pathname === '/dashboard'}
        />
        <NavItem 
          isCollapsed={isCollapsed} 
          icon={TrendingUp} 
          title="Spend Analytics"
          href="/spend-trends"
          isActive={location.pathname === '/spend-trends'}
        />
        <NavItem 
          isCollapsed={isCollapsed} 
          icon={AlertTriangle} 
          title="Shadow IT"
          href="/shadow-it"
          isActive={location.pathname === '/shadow-it'}
        />
      </NavSection>
      
      {showUsageFeatures && (
        <NavSection isCollapsed={isCollapsed} title="Usage Analytics">
          <NavItem 
            isCollapsed={isCollapsed} 
            icon={BarChart3} 
            title="Usage"
            href="/usage"
            isActive={location.pathname === '/usage'}
          />
          <NavItem 
            isCollapsed={isCollapsed} 
            icon={Repeat2} 
            title="Renewals"
            href="/renewals"
            isActive={location.pathname === '/renewals'}
          />
        </NavSection>
      )}

      {showBoardingFeatures && (
        <NavSection isCollapsed={isCollapsed} title="User Management">
          <NavItem 
            isCollapsed={isCollapsed} 
            icon={UserCog} 
            title="User Boarding"
            href="/user-boarding"
            isActive={location.pathname === '/user-boarding'}
          />
        </NavSection>
      )}

      <NavSection isCollapsed={isCollapsed} title="Contracts">
        <NavItem 
          isCollapsed={isCollapsed} 
          icon={FileText} 
          title="Repository"
          href="/contracts"
          isActive={location.pathname === '/contracts'}
        />
        {showNegotiationFeatures && (
          <NavItem 
            isCollapsed={isCollapsed} 
            icon={LineChart} 
            title="Contract Negotiation"
            href="/contract-negotiation"
            isActive={location.pathname === '/contract-negotiation'}
          />
        )}
      </NavSection>

      {showCopilotFeatures && (
        <NavSection isCollapsed={isCollapsed} title="AI">
          <NavItem 
            isCollapsed={isCollapsed} 
            icon={Bot} 
            title="AI Assistant"
            href="/ai-assistant"
            isActive={location.pathname === '/ai-assistant'}
          />
        </NavSection>
      )}

      {showBenchmarkingFeatures && (
        <NavSection isCollapsed={isCollapsed} title="Benchmarking">
          <NavItem 
            isCollapsed={isCollapsed} 
            icon={GitCompare} 
            title="Benchmarking"
            href="/benchmarking"
            isActive={location.pathname === '/benchmarking'}
          />
        </NavSection>
      )}

      {showComplianceFeatures && (
        <NavSection isCollapsed={isCollapsed} title="Compliance">
          <NavItem 
            isCollapsed={isCollapsed} 
            icon={ShieldAlert} 
            title="Compliance"
            href="/compliance"
            isActive={location.pathname === '/compliance'}
          />
        </NavSection>
      )}

      {showWorkflowFeatures && (
        <NavSection isCollapsed={isCollapsed} title="Workflow">
          <NavItem 
            isCollapsed={isCollapsed} 
            icon={Workflow} 
            title="Workflow Builder"
            href="/workflow-builder"
            isActive={location.pathname === '/workflow-builder'}
          />
        </NavSection>
      )}

      {showDuplicateAppFeatures && (
        <NavSection isCollapsed={isCollapsed} title="App Central">
          <NavItem 
            isCollapsed={isCollapsed} 
            icon={GitCompare} 
            title="Duplicate App Comparison"
            href="/duplicate-app-comparison"
            isActive={location.pathname === '/duplicate-app-comparison'}
          />
        </NavSection>
      )}
      
      {showProcurementFeatures && (
        <NavSection isCollapsed={isCollapsed} title="Procurement">
          <NavItem 
            isCollapsed={isCollapsed} 
            icon={PlusCircle} 
            title="Procurement Intake"
            href="/procurement-intake"
            isActive={location.pathname === '/procurement-intake'}
          />
        </NavSection>
      )}

      <NavSection isCollapsed={isCollapsed} title="Settings">
        <NavItem 
          isCollapsed={isCollapsed} 
          icon={Settings} 
          title="Settings"
          href="/settings"
          isActive={location.pathname === '/settings'}
        />
      </NavSection>
    </div>
  );
}
