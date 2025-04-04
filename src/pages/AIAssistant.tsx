
import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Brain, Lightbulb, SendHorizontal, PlusCircle } from "lucide-react";
import { toast } from "sonner";

const AIAssistant = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
  }>>([
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
          <Button variant="outline" onClick={() => {
            setChatHistory([{
              role: "assistant",
              content: "Hello! I'm your SaaS procurement and optimization assistant. How can I help you today?",
              timestamp: new Date()
            }]);
          }}>
            <PlusCircle className="h-4 w-4 mr-2" />
            New Conversation
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Suggestions panel */}
          <Card className="lg:col-span-1 h-fit">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
                Suggested Queries
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 overflow-hidden">
              {suggestedPrompts.map((prompt, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  className="w-full justify-start text-left h-auto py-2 text-wrap break-words whitespace-normal"
                  onClick={() => handlePromptClick(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Chat interface */}
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
                  <div 
                    key={index} 
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
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIAssistant;
