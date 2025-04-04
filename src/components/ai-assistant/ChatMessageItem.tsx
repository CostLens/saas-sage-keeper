
import React from "react";
import { Badge } from "@/components/ui/badge";
import { ChatMessage } from "@/components/ai-assistant/types";

interface ChatMessageItemProps {
  message: ChatMessage;
}

export const ChatMessageItem = ({ message }: ChatMessageItemProps) => {
  return (
    <div 
      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
    >
      <div 
        className={`max-w-[80%] rounded-lg p-3 ${
          message.role === "user" 
            ? "bg-primary text-primary-foreground" 
            : "bg-muted"
        }`}
      >
        <div className="mb-1 flex items-center">
          <Badge variant={message.role === "user" ? "outline" : "secondary"} className="font-normal">
            {message.role === "user" ? "You" : "AI Assistant"}
          </Badge>
          <span className="text-xs ml-2 text-muted-foreground">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <div className="whitespace-pre-line text-sm">
          {message.content}
        </div>
      </div>
    </div>
  );
};
