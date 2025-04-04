
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface AIAssistantHeaderProps {
  onNewConversation: () => void;
}

export const AIAssistantHeader = ({ onNewConversation }: AIAssistantHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
        <p className="text-muted-foreground">
          Get insights and recommendations for your SaaS portfolio
        </p>
      </div>
      <Button variant="outline" onClick={onNewConversation}>
        <PlusCircle className="h-4 w-4 mr-2" />
        New Conversation
      </Button>
    </div>
  );
};
