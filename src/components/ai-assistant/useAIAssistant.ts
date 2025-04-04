
import { useState } from "react";
import { toast } from "sonner";
import { ChatMessage } from "./types";

export function useAIAssistant() {
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hello! I'm your SaaS procurement and optimization assistant. How can I help you today? You can ask me about cost optimization strategies, vendor negotiations, licensing recommendations, or any other SaaS management queries.",
      timestamp: new Date()
    }
  ]);

  const suggestedPrompts = [
    "How can I optimize our Slack licenses?",
    "What negotiation tactics work with Salesforce?",
    "Compare Microsoft vs Google Workspace costs",
    "Identify unused SaaS applications",
    "Draft a vendor negotiation email"
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message to chat
    setChatHistory([
      ...chatHistory, 
      { role: "user", content: inputMessage, timestamp: new Date() }
    ]);
    
    // Clear input and show loading
    setInputMessage("");
    setIsLoading(true);
    
    // Simulate AI response (would be replaced with actual API call)
    setTimeout(() => {
      let response = "";
      
      // Basic pattern matching for demo purposes
      if (inputMessage.toLowerCase().includes("optimize") || inputMessage.toLowerCase().includes("license")) {
        response = "Based on our analysis, you have several opportunities for license optimization:\n\n1. Your Slack instance shows 200 inactive users that haven't logged in for over 90 days\n2. Adobe Creative Cloud has 15 unused licenses\n3. Consider moving some Salesforce Professional licenses to lower-tier options for occasional users\n\nImplementing these changes could save approximately $35,000 annually.";
      } else if (inputMessage.toLowerCase().includes("negotiation") || inputMessage.toLowerCase().includes("salesforce")) {
        response = "For Salesforce negotiations, consider these tactics:\n\n1. Multi-year commitment: Lock in current rates with a 3-year contract\n2. Bundle products: Combine Sales Cloud with Service Cloud for better pricing\n3. Renewal timing: Start negotiations 4-6 months before renewal\n4. Right-sizing: Analyze user activity to identify opportunity for downgrading licenses\n\nClients typically achieve 15-25% savings with these approaches.";
      } else if (inputMessage.toLowerCase().includes("compare") || inputMessage.toLowerCase().includes("microsoft") || inputMessage.toLowerCase().includes("google")) {
        response = "Microsoft 365 vs Google Workspace comparison:\n\nPricing (per user/month):\n- Microsoft: Basic ($5), Standard ($12.50), Premium ($22)\n- Google: Business Starter ($6), Business Standard ($12), Business Plus ($18)\n\nKey differences:\n- Microsoft offers better desktop application integration\n- Google provides superior collaboration features\n- Microsoft has more comprehensive security in base packages\n- Google's storage options are more cost-effective at lower tiers\n\nBased on your company profile, Microsoft 365 would cost approximately $45,600/year while Google Workspace would be $39,600/year.";
      } else {
        response = "Thank you for your question. I'll analyze our SaaS portfolio data to provide you with insights and recommendations. For the most detailed analysis, consider specifying the application name, time period, or specific optimization goal you're interested in.";
      }

      setChatHistory([
        ...chatHistory,
        { role: "user", content: inputMessage, timestamp: new Date() },
        { role: "assistant", content: response, timestamp: new Date() }
      ]);
      
      setIsLoading(false);
    }, 1500);
  };

  const handlePromptClick = (prompt: string) => {
    setInputMessage(prompt);
  };

  const handleNewConversation = () => {
    setChatHistory([{
      role: "assistant",
      content: "Hello! I'm your SaaS procurement and optimization assistant. How can I help you today?",
      timestamp: new Date()
    }]);
    toast.success("Started a new conversation");
  };

  return {
    inputMessage,
    setInputMessage,
    isLoading,
    chatHistory,
    suggestedPrompts,
    handleSendMessage,
    handlePromptClick,
    handleNewConversation
  };
}
