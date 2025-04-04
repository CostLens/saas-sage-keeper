
import React, { useState } from "react";
import { AppDiscoveryData } from "@/hooks/useAppDiscoveryData";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { NPSCard } from "./sentiment/NPSCard";
import { CriticalityCard } from "./sentiment/CriticalityCard";
import { RatingDistribution } from "./sentiment/RatingDistribution";
import { Reviews } from "./sentiment/Reviews";
import { SurveyQuestionsDialog } from "./sentiment/SurveyQuestionsDialog";
import { ManageSurveyDialog } from "./sentiment/ManageSurveyDialog";
import { mockSentimentData } from "./sentiment/mockData";

interface SentimentTabProps {
  app: AppDiscoveryData;
}

export function SentimentTab({ app }: SentimentTabProps) {
  const { toast } = useToast();
  const [openSurveyDialog, setOpenSurveyDialog] = useState(false);
  const [showSurveyQuestionsDialog, setShowSurveyQuestionsDialog] = useState(false);
  
  const handleExportCSV = () => {
    toast({
      title: "CSV Export Started",
      description: "Your sentiment data is being exported to CSV",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">User Sentiment</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowSurveyQuestionsDialog(true)}>
            <Eye className="h-4 w-4 mr-2" />
            View Survey Questions
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export to CSV
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => setOpenSurveyDialog(true)}
          >
            Manage Survey
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NPSCard 
          netPromoterScore={mockSentimentData.netPromoterScore} 
          respondents={mockSentimentData.respondents}
          breakdown={mockSentimentData.breakdown}
        />
        <CriticalityCard criticality={mockSentimentData.criticality} />
      </div>

      <RatingDistribution ratingDistribution={mockSentimentData.ratingDistribution} />
      <Reviews reviews={mockSentimentData.reviews} />

      {/* Survey Questions Dialog */}
      <SurveyQuestionsDialog 
        appName={app.name}
        open={showSurveyQuestionsDialog} 
        onOpenChange={setShowSurveyQuestionsDialog}
        surveyQuestions={mockSentimentData.surveyQuestions}
      />

      {/* Manage Survey Dialog */}
      <ManageSurveyDialog 
        open={openSurveyDialog}
        onOpenChange={setOpenSurveyDialog}
      />
    </div>
  );
}
