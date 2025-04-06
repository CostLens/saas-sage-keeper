
import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppDiscoveryData } from '@/hooks/useAppDiscoveryData';
import { DialogHeader } from './details/DialogHeader';
import { OverviewTab } from './details/OverviewTab';
import { UsersTab } from './details/UsersTab';
import { TeamsTab } from './details/TeamsTab';
import { RecommendationsTab } from './details/RecommendationsTab';
import { SentimentTab } from './details/SentimentTab';
import { FeaturesTab } from './details/FeaturesTab';
import { FeatureUsageTab } from './details/FeatureUsageTab';
import { TeamUsageTab } from './details/TeamUsageTab';
import { useFeatureFlags } from '@/contexts/FeatureFlagsContext';

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
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 lg:grid-cols-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {showUsageFeatures && <TabsTrigger value="users">Users</TabsTrigger>}
            {showUsageFeatures && <TabsTrigger value="teams">Teams</TabsTrigger>}
            {showUsageFeatures && <TabsTrigger value="feature-usage">Feature Usage</TabsTrigger>}
            {showUsageFeatures && <TabsTrigger value="team-usage">Team Usage</TabsTrigger>}
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
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
              <TeamsTab app={app} />
            </TabsContent>
          )}
          
          {showUsageFeatures && (
            <TabsContent value="feature-usage" className="mt-6">
              <FeatureUsageTab app={app} />
            </TabsContent>
          )}
          
          {showUsageFeatures && (
            <TabsContent value="team-usage" className="mt-6">
              <TeamUsageTab app={app} />
            </TabsContent>
          )}
          
          <TabsContent value="features" className="mt-6">
            <FeaturesTab app={app} />
          </TabsContent>
          
          <TabsContent value="recommendations" className="mt-6">
            <RecommendationsTab app={app} />
          </TabsContent>
          
          <TabsContent value="sentiment" className="mt-6">
            <SentimentTab app={app} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
