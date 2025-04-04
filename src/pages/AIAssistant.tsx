
import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AIChat } from "@/components/ai-assistant/AIChat";
import { SuggestedQueries } from "@/components/ai-assistant/SuggestedQueries";
import { useAIAssistant } from "@/components/ai-assistant/useAIAssistant";

const AIAssistant = () => {
  const {
    inputMessage,
    setInputMessage,
    isLoading,
    chatHistory,
    suggestedPrompts,
    handleSendMessage,
    handlePromptClick,
    handleNewConversation
  } = useAIAssistant();

  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
            <p className="text-muted-foreground">
              Get insights and recommendations for your SaaS portfolio
            </p>
          </div>
          <Button variant="outline" onClick={handleNewConversation}>
            <PlusCircle className="h-4 w-4 mr-2" />
            New Conversation
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <SuggestedQueries 
            queries={suggestedPrompts} 
            onQuerySelect={handlePromptClick}
          />
          <AIChat 
            chatHistory={chatHistory}
            isLoading={isLoading}
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            handleSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIAssistant;
