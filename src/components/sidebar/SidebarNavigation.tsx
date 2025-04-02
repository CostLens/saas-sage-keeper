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
      <NavSection isCollapsed={isCollapsed} label="Overview">
        <NavItem 
          isCollapsed={isCollapsed} 
          icon={LayoutDashboard} 
          label="Dashboard"
          href="/dashboard"
          isActive={location.pathname === '/dashboard'}
        />
        <NavItem 
          isCollapsed={isCollapsed} 
          icon={TrendingUp} 
          label="Spend Analytics"
          href="/spend-trends"
          isActive={location.pathname === '/spend-trends'}
        />
        <NavItem 
          isCollapsed={isCollapsed} 
          icon={AlertTriangle} 
          label="Shadow IT"
          href="/shadow-it"
          isActive={location.pathname === '/shadow-it'}
        />
      </NavSection>
      
      {showUsageFeatures && (
        <NavSection isCollapsed={isCollapsed} label="Usage Analytics">
          <NavItem 
            isCollapsed={isCollapsed} 
            icon={BarChart3} 
            label="Usage"
            href="/usage"
            isActive={location.pathname === '/usage'}
          />
          <NavItem 
            isCollapsed={isCollapsed} 
            icon={Repeat2} 
            label="Renewals"
            href="/renewals"
            isActive={location.pathname === '/renewals'}
          />
        </NavSection>
      )}

      {showBoardingFeatures && (
        <NavSection isCollapsed={isCollapsed} label="User Management">
          <NavItem 
            isCollapsed={isCollapsed} 
            icon={UserCog} 
            label="User Boarding"
            href="/user-boarding"
            isActive={location.pathname === '/user-boarding'}
          />
        </NavSection>
      )}

      <NavSection isCollapsed={isCollapsed} label="Contracts">
        <NavItem 
          isCollapsed={isCollapsed} 
          icon={FileText} 
          label="Repository"
          href="/contracts"
          isActive={location.pathname === '/contracts'}
        />
        {showNegotiationFeatures && (
          <NavItem 
            isCollapsed={isCollapsed} 
            icon={LineChart} 
            label="Contract Negotiation"
            href="/contract-negotiation"
            isActive={location.pathname === '/contract-negotiation'}
          />
        )}
      </NavSection>

      {showCopilotFeatures && (
        <NavSection isCollapsed={isCollapsed} label="AI">
          <NavItem 
            isCollapsed={isCollapsed} 
            icon={Bot} 
            label="AI Assistant"
            href="/ai-assistant"
            isActive={location.pathname === '/ai-assistant'}
          />
        </NavSection>
      )}

      {showBenchmarkingFeatures && (
        <NavSection isCollapsed={isCollapsed} label="Benchmarking">
          <NavItem 
            isCollapsed={isCollapsed} 
            icon={GitCompare} 
            label="Benchmarking"
            href="/benchmarking"
            isActive={location.pathname === '/benchmarking'}
          />
        </NavSection>
      )}

      {showComplianceFeatures && (
        <NavSection isCollapsed={isCollapsed} label="Compliance">
          <NavItem 
            isCollapsed={isCollapsed} 
            icon={ShieldAlert} 
            label="Compliance"
            href="/compliance"
            isActive={location.pathname === '/compliance'}
          />
        </NavSection>
      )}

      {showWorkflowFeatures && (
        <NavSection isCollapsed={isCollapsed} label="Workflow">
          <NavItem 
            isCollapsed={isCollapsed} 
            icon={Workflow} 
            label="Workflow Builder"
            href="/workflow-builder"
            isActive={location.pathname === '/workflow-builder'}
          />
        </NavSection>
      )}

      {showDuplicateAppFeatures && (
        <NavSection isCollapsed={isCollapsed} label="App Central">
          <NavItem 
            isCollapsed={isCollapsed} 
            icon={GitCompare} 
            label="Duplicate App Comparison"
            href="/duplicate-app-comparison"
            isActive={location.pathname === '/duplicate-app-comparison'}
          />
        </NavSection>
      )}
      
      {showProcurementFeatures && (
        <NavSection isCollapsed={isCollapsed} label="Procurement">
          <NavItem 
            isCollapsed={isCollapsed} 
            icon={PlusCircle} 
            label="Procurement Intake"
            href="/procurement-intake"
            isActive={location.pathname === '/procurement-intake'}
          />
        </NavSection>
      )}

      <NavSection isCollapsed={isCollapsed} label="Settings">
        <NavItem 
          isCollapsed={isCollapsed} 
          icon={Settings} 
          label="Settings"
          href="/settings"
          isActive={location.pathname === '/settings'}
        />
      </NavSection>
    </div>
  );
}
