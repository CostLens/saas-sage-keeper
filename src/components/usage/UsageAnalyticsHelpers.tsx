
import { SaaSData } from "@/lib/mockData";

// Helper functions to calculate usage statistics
export function calculateUsageStatistics(saasData: SaaSData[]) {
  // Calculate totals
  const totalLicenses = saasData.reduce((sum, saas) => sum + (saas.usage.totalLicenses || 0), 0);
  const activeUsers = saasData.reduce((sum, saas) => sum + saas.usage.activeUsers, 0);
  const unusedLicenses = totalLicenses - activeUsers;
  const utilizationRate = (activeUsers / totalLicenses) * 100;

  return {
    totalLicenses,
    activeUsers,
    unusedLicenses,
    utilizationRate
  };
}

// Helper function to categorize apps by usage level
export function categorizeAppsByUsage(saasData: SaaSData[]) {
  // Create usage status categories
  const highUsageApps = saasData.filter(
    app => app.usage.totalLicenses && (app.usage.activeUsers / app.usage.totalLicenses) > 0.9
  );
  
  const lowUsageApps = saasData.filter(
    app => app.usage.totalLicenses && (app.usage.activeUsers / app.usage.totalLicenses) < 0.5
  );
  
  const optimalUsageApps = saasData.filter(
    app => app.usage.totalLicenses && 
      (app.usage.activeUsers / app.usage.totalLicenses) >= 0.5 && 
      (app.usage.activeUsers / app.usage.totalLicenses) <= 0.9
  );

  return {
    highUsageApps,
    optimalUsageApps,
    lowUsageApps
  };
}
