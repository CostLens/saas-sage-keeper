
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download, Zap } from "lucide-react";
import { UserToolMapping } from "@/hooks/useUserBoarding";

interface UserBoardingHeaderProps {
  refetchUsers: () => void;
  exportUsersData: (mockUserToolMappings: UserToolMapping[]) => void;
  openAutoOffboardingDialog: () => void;
  mockUserToolMappings: UserToolMapping[];
}

export function UserBoardingHeader({
  refetchUsers,
  exportUsersData,
  openAutoOffboardingDialog,
  mockUserToolMappings
}: UserBoardingHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold tracking-tight">User Boarding</h1>
      <div className="flex items-center gap-3">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => refetchUsers()}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => exportUsersData(mockUserToolMappings)}
        >
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={openAutoOffboardingDialog}
        >
          <Zap className="h-4 w-4 mr-2" />
          Setup Auto-Offboarding
        </Button>
      </div>
    </div>
  );
}
