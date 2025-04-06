
import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppDiscoveryData } from '@/hooks/useAppDiscoveryData';
import { DialogHeader } from './details/DialogHeader';
import { OverviewTab } from './details/OverviewTab';
import { UsersTab } from './details/UsersTab';
import { TeamsTab } from './details/TeamsTab';
import { FeaturesTab } from './details/FeaturesTab';
import { useFeatureFlags } from '@/contexts/FeatureFlagsContext';
import { TeamUsageTab } from './details/TeamUsageTab';
import { FeatureUsageTab } from './details/FeatureUsageTab';

interface AppDetailsDialogProps {
  app: AppDiscoveryData;
  isOpen: boolean;
  onClose: () => void;
  source: 'discovery' | 'usage';
}

export function AppDetailsDialog({ app, isOpen, onClose, source }: AppDetailsDialogProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const { showUsageFeatures } = useFeatureFlags();
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-auto">
        <DialogHeader app={app} onClose={onClose} />
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {showUsageFeatures && <TabsTrigger value="users">Users</TabsTrigger>}
            {showUsageFeatures && <TabsTrigger value="teams">Teams</TabsTrigger>}
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <OverviewTab app={app} />
          </TabsContent>
          
          {showUsageFeatures && (
            <TabsContent value="users" className="mt-6">
              <UsersTab app={app} />
            </TabsContent>
          )}
          
          {showUsageFeatures && (
            <TabsContent value="teams" className="mt-6">
              <div className="space-y-6">
                <TeamsTab app={app} />
                <TeamUsageTab app={app} />
              </div>
            </TabsContent>
          )}
          
          <TabsContent value="features" className="mt-6">
            <div className="space-y-6">
              <FeaturesTab app={app} />
              {showUsageFeatures && <FeatureUsageTab app={app} />}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
