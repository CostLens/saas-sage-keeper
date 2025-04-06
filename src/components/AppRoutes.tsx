
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useFeatureFlags } from '@/contexts/FeatureFlagsContext';

// Page imports
import Dashboard from "@/pages/Dashboard";
import SpendTrends from "@/pages/SpendTrends";
import ContractsRepository from "@/pages/ContractsRepository";
import AIAssistant from "@/pages/AIAssistant";
import Settings from "@/pages/Settings";
import Help from "@/pages/Help";
import NotFound from "@/pages/NotFound";
import Usage from "@/pages/Usage";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import UserManagement from "@/pages/UserManagement";
import UserBoarding from "@/pages/UserBoarding";
import Renewals from "@/pages/Renewals";
import Benchmarking from "@/pages/Benchmarking";
import AppDiscovery from "@/pages/AppDiscovery";
import Compliance from "@/pages/Compliance";
import WorkflowBuilder from "@/pages/WorkflowBuilder";
import DuplicateAppComparison from "@/pages/DuplicateAppComparison";
import ContractNegotiation from "@/pages/ContractNegotiation";
import ProcurementIntake from "@/pages/ProcurementIntake";
import ShadowIT from "@/pages/ShadowIT";
import OptimizationInsights from "@/pages/Insights";

export function AppRoutes() {
  const {
    showUsageFeatures,
    showBoardingFeatures,
    showNegotiationFeatures,
    showBenchmarkingFeatures,
    showComplianceFeatures,
    showWorkflowFeatures,
    showDuplicateAppFeatures,
    showCopilotFeatures,
    showProcurementFeatures,
    showShadowITFeatures,
    showInsightsFeatures
  } = useFeatureFlags();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/spend-trends" element={<SpendTrends />} />
      <Route path="/app-discovery" element={<AppDiscovery />} />
      
      {showInsightsFeatures ? (
        <Route path="/insights" element={<OptimizationInsights />} />
      ) : (
        <Route path="/insights" element={<Navigate to="/dashboard" replace />} />
      )}
      
      {showUsageFeatures ? (
        <Route path="/usage" element={<Usage />} />
      ) : (
        <Route path="/usage" element={<Navigate to="/dashboard" replace />} />
      )}
      
      <Route path="/contracts" element={<ContractsRepository />} />
      
      {showCopilotFeatures ? (
        <Route path="/ai-assistant" element={<AIAssistant />} />
      ) : (
        <Route path="/ai-assistant" element={<Navigate to="/dashboard" replace />} />
      )}
      
      {showDuplicateAppFeatures ? (
        <Route path="/duplicate-app-comparison" element={<DuplicateAppComparison />} />
      ) : (
        <Route path="/duplicate-app-comparison" element={<Navigate to="/dashboard" replace />} />
      )}
      
      {showProcurementFeatures ? (
        <Route path="/procurement-intake" element={<ProcurementIntake />} />
      ) : (
        <Route path="/procurement-intake" element={<Navigate to="/dashboard" replace />} />
      )}
      
      {showShadowITFeatures ? (
        <Route path="/shadow-it" element={<ShadowIT />} />
      ) : (
        <Route path="/shadow-it" element={<Navigate to="/dashboard" replace />} />
      )}
      
      <Route path="/contract-negotiation" element={<ContractNegotiation />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/help" element={<Help />} />
      <Route path="/user-management" element={<UserManagement />} />
      
      {showBoardingFeatures ? (
        <Route path="/user-boarding" element={<UserBoarding />} />
      ) : (
        <Route path="/user-boarding" element={<Navigate to="/dashboard" replace />} />
      )}
      
      {showNegotiationFeatures ? (
        <Route path="/renewals" element={<Renewals />} />
      ) : (
        <Route path="/renewals" element={<Navigate to="/dashboard" replace />} />
      )}
      
      {showBenchmarkingFeatures ? (
        <Route path="/benchmarking" element={<Benchmarking />} />
      ) : (
        <Route path="/benchmarking" element={<Navigate to="/dashboard" replace />} />
      )}
      
      {showComplianceFeatures ? (
        <Route path="/compliance" element={<Compliance />} />
      ) : (
        <Route path="/compliance" element={<Navigate to="/dashboard" replace />} />
      )}
      
      {showWorkflowFeatures ? (
        <Route path="/workflow-builder" element={<WorkflowBuilder />} />
      ) : (
        <Route path="/workflow-builder" element={<Navigate to="/dashboard" replace />} />
      )}
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
