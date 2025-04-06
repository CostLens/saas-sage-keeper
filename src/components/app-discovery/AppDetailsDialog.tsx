
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
import { FeaturesTab } from "./details/FeaturesTab";
import { useFeatureFlags } from "@/hooks/useFeatureFlags";

interface AppDetailsDialogProps {
  app: AppDiscoveryData | null;
  isOpen: boolean;
  onClose: () => void;
  source?: "discovery" | "usage";
}

export function AppDetailsDialog({ app, isOpen, onClose, source = "discovery" }: AppDetailsDialogProps) {
  const { showDiscoveryExtendedFeatures } = useFeatureFlags();
  
  if (!app) return null;

  // Don't show dialog if it's from discovery and the feature flag is off
  if (source === "discovery" && !showDiscoveryExtendedFeatures) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" hideCloseButton>
        <AppDialogHeader app={app} onClose={onClose} />

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className={`grid ${source === "usage" ? "grid-cols-4" : "grid-cols-4"} w-full`}>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {source === "usage" && <TabsTrigger value="features">Features</TabsTrigger>}
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            {source !== "usage" && <TabsTrigger value="sentiment">Sentiment</TabsTrigger>}
          </TabsList>

          <TabsContent value="overview" className="pt-4">
            <OverviewTab app={app} />
          </TabsContent>

          {source === "usage" && (
            <TabsContent value="features" className="pt-4">
              <FeaturesTab app={app} />
            </TabsContent>
          )}

          <TabsContent value="teams" className="pt-4">
            <TeamsTab app={app} />
          </TabsContent>

          <TabsContent value="recommendations" className="pt-4">
            <RecommendationsTab app={app} />
          </TabsContent>
          
          {source !== "usage" && (
            <TabsContent value="sentiment" className="pt-4">
              <SentimentTab app={app} />
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
