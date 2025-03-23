
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { DataTable } from "@/components/ui/data-table";
import { TrendChart } from "@/components/ui/trend-chart";
import { mockSaasData, mockObligations, mockContracts } from "@/lib/mockData";
import { Bot, Search, User, ArrowUpRight, Lightbulb, SendIcon } from "lucide-react";

// Message type for the chat
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: any[];
}

// Insights component to show quick insights
const QuickInsights = () => {
  const insights = [
    "Slack contract renews in 30 days - negotiation recommended based on usage",
    "Your top 3 SaaS tools by spend are Adobe Creative Cloud, Salesforce, and Microsoft 365",
    "Monday.com has 24 inactive users - potential savings of $4,320/year",
    "3 critical contract obligations due this month require attention"
  ];

  return (
    <div className="space-y-3">
      {insights.map((insight, index) => (
        <div 
          key={index} 
          className="flex items-start p-3 rounded-lg border bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-colors"
        >
          <Lightbulb className="h-5 w-5 text-amber-500 mr-2 shrink-0 mt-0.5" />
          <p className="text-sm">{insight}</p>
        </div>
      ))}
    </div>
  );
};

const AIAssistant = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your SaaS Spend Assistant. I can help you research your SaaS portfolio, analyze spending patterns, and provide insights on your contracts and obligations. What would you like to know?",
      timestamp: new Date()
    }
  ]);

  // Simulate sending a message and getting a response
  const handleSendMessage = () => {
    if (!query.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setQuery("");
    setIsSearching(true);
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      let responseContent = "";
      
      // Simple keyword-based responses for demo purposes
      if (query.toLowerCase().includes("spend")) {
        responseContent = "Your total SaaS spend is $156,780 annually. This represents a 12% increase from last year. The top 3 applications by spend are Adobe Creative Cloud ($29,880), Salesforce ($26,400), and Microsoft 365 ($18,000).";
      } else if (query.toLowerCase().includes("renewal") || query.toLowerCase().includes("renew")) {
        responseContent = "You have 3 upcoming renewals in the next 30 days: Slack (May 15), Zoom (May 22), and HubSpot (May 29). Based on usage data, I recommend negotiating the Slack contract as utilization is only at 68%.";
      } else if (query.toLowerCase().includes("obligation") || query.toLowerCase().includes("compliance")) {
        responseContent = "There are 5 pending obligations across your SaaS contracts. The most urgent is a security compliance report for Salesforce due in 7 days. This obligation has a high impact rating as non-compliance could result in service suspension.";
      } else if (query.toLowerCase().includes("usage") || query.toLowerCase().includes("utilization")) {
        responseContent = "I've analyzed your usage data and found that Monday.com has 24 inactive users (no logins in 30+ days). This represents potential savings of $4,320 annually. Would you like me to generate a detailed utilization report?";
      } else {
        responseContent = "I've analyzed your question and found relevant information in your SaaS database. Would you like me to provide specific details about contract terms, spending patterns, or usage metrics related to your query?";
      }
      
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: responseContent,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 pl-64 flex flex-col">
        <Header />
        <main className="flex-1 p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold tracking-tight">AI Research Assistant</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
            {/* Main Chat Area */}
            <div className="md:col-span-2 flex flex-col h-full">
              <Card className="flex-1 flex flex-col overflow-hidden glass-panel">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    SaaS Spend Assistant
                  </CardTitle>
                  <CardDescription>
                    Research your SaaS portfolio, analyze spending, and get insights
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1 overflow-hidden p-0">
                  <ScrollArea className="h-[calc(100vh-20rem)] px-4">
                    <div className="space-y-4 pt-2 pb-4">
                      {messages.map((message) => (
                        <div 
                          key={message.id} 
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`
                            flex gap-3 max-w-[80%] 
                            ${message.role === 'user' 
                              ? 'flex-row-reverse' 
                              : 'flex-row'
                            }`}
                          >
                            <Avatar className={`h-8 w-8 ${message.role === 'assistant' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                              {message.role === 'assistant' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                            </Avatar>
                            <div className={`
                              rounded-lg p-3 
                              ${message.role === 'user' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-muted/50 border'
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p className="text-xs mt-1 opacity-70">
                                {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                      {isSearching && (
                        <div className="flex justify-start">
                          <div className="flex gap-3 max-w-[80%]">
                            <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
                              <Bot className="h-4 w-4" />
                            </Avatar>
                            <div className="rounded-lg p-3 bg-muted/50 border">
                              <div className="flex items-center space-x-2">
                                <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-pulse"></div>
                                <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-pulse delay-150"></div>
                                <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-pulse delay-300"></div>
                                <span className="text-sm text-muted-foreground">Searching database...</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
                
                <CardFooter className="p-4 border-t">
                  <form 
                    className="flex w-full space-x-2" 
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                  >
                    <Input
                      placeholder="Ask about your SaaS spend, contracts, obligations..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      type="submit" 
                      size="icon" 
                      disabled={!query.trim() || isSearching}
                    >
                      <SendIcon className="h-4 w-4" />
                    </Button>
                  </form>
                </CardFooter>
              </Card>
            </div>
            
            {/* Sidebar - Quick Insights */}
            <div className="space-y-6">
              <Card className="glass-panel">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Quick Insights</CardTitle>
                  <CardDescription>AI-powered insights from your data</CardDescription>
                </CardHeader>
                <CardContent>
                  <QuickInsights />
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full gap-1">
                    Generate more insights
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="glass-panel">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Suggested Queries</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-sm h-auto py-2 px-3"
                    onClick={() => {
                      setQuery("What are my upcoming renewals in the next 30 days?");
                      setTimeout(() => handleSendMessage(), 100);
                    }}
                  >
                    <Search className="h-3.5 w-3.5 mr-2" />
                    What are my upcoming renewals in the next 30 days?
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-sm h-auto py-2 px-3"
                    onClick={() => {
                      setQuery("Show me SaaS tools with low utilization");
                      setTimeout(() => handleSendMessage(), 100);
                    }}
                  >
                    <Search className="h-3.5 w-3.5 mr-2" />
                    Show me SaaS tools with low utilization
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-sm h-auto py-2 px-3"
                    onClick={() => {
                      setQuery("What are my urgent contract obligations?");
                      setTimeout(() => handleSendMessage(), 100);
                    }}
                  >
                    <Search className="h-3.5 w-3.5 mr-2" />
                    What are my urgent contract obligations?
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-sm h-auto py-2 px-3"
                    onClick={() => {
                      setQuery("Analyze my total SaaS spend by department");
                      setTimeout(() => handleSendMessage(), 100);
                    }}
                  >
                    <Search className="h-3.5 w-3.5 mr-2" />
                    Analyze my total SaaS spend by department
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIAssistant;
