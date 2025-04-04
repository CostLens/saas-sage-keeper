
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Brain, SendHorizontal } from "lucide-react";
import { ChatMessage } from "@/components/ai-assistant/types";
import { ChatMessageItem } from "@/components/ai-assistant/ChatMessageItem";

interface AIChatProps {
  chatHistory: ChatMessage[];
  isLoading: boolean;
  inputMessage: string;
  setInputMessage: (message: string) => void;
  handleSendMessage: () => void;
}

export const AIChat = ({ 
  chatHistory, 
  isLoading, 
  inputMessage, 
  setInputMessage, 
  handleSendMessage 
}: AIChatProps) => {
  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="h-5 w-5 mr-2 text-primary" />
          SaaS Optimization Assistant
        </CardTitle>
        <CardDescription>
          Ask questions about procurement, cost optimization, or vendor management
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col h-[600px]">
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-1">
          {chatHistory.map((message, index) => (
            <ChatMessageItem key={index} message={message} />
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500 animate-bounce delay-75"></div>
                  <div className="h-2 w-2 rounded-full bg-blue-500 animate-bounce delay-150"></div>
                  <div className="h-2 w-2 rounded-full bg-blue-500 animate-bounce delay-300"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Input area */}
        <div className="flex items-end space-x-2">
          <Textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about procurement, optimization, or vendor management..."
            className="flex-1 min-h-[80px]"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button 
            className="mb-1 h-10 w-10 p-2" 
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
          >
            <SendHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
