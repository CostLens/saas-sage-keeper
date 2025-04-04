
import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIChat } from "@/components/ai-assistant/AIChat";
import { SuggestedQueries } from "@/components/ai-assistant/SuggestedQueries";
import { useAIAssistant } from "@/components/ai-assistant/useAIAssistant";
import { AIAssistantHeader } from "@/components/ai-assistant/AIAssistantHeader";

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
        <AIAssistantHeader onNewConversation={handleNewConversation} />

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
