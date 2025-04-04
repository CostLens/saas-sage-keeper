
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader
} from "@/components/ui/dialog";
import { AppDiscoveryData } from "@/hooks/useAppDiscoveryData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DialogHeader as AppDialogHeader } from "./details/DialogHeader";
import { OverviewTab } from "./details/OverviewTab";
import { TeamsTab } from "./details/TeamsTab";
import { RecommendationsTab } from "./details/RecommendationsTab";
import { SentimentTab } from "./details/SentimentTab";

interface AppDetailsDialogProps {
  app: AppDiscoveryData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AppDetailsDialog({ app, isOpen, onClose }: AppDetailsDialogProps) {
  if (!app) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <AppDialogHeader app={app} />
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="pt-4">
            <OverviewTab app={app} />
          </TabsContent>

          <TabsContent value="teams" className="pt-4">
            <TeamsTab app={app} />
          </TabsContent>

          <TabsContent value="recommendations" className="pt-4">
            <RecommendationsTab app={app} />
          </TabsContent>
          
          <TabsContent value="sentiment" className="pt-4">
            <SentimentTab app={app} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
