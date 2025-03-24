
import React from "react";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, Bot, SparklesIcon } from "lucide-react";

const AISection = () => {
  return (
    <section className="py-8 md:py-16 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border-2 border-primary/50 shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1675271591211-728a94dd1095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="AI assistant visualization" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-background/80 backdrop-blur-sm border border-border p-3 rounded-lg shadow-lg hidden md:block">
                <Badge variant="secondary" className="gap-1">
                  <SparklesIcon className="h-3.5 w-3.5" />
                  <span>AI-Powered</span>
                </Badge>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <Badge variant="outline" className="gap-1 px-3 py-1">
              <BrainCircuit className="h-3.5 w-3.5" />
              <span>Powered by AI</span>
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">AI-Driven SaaS Spend Optimization</h2>
            <p className="text-xl text-muted-foreground">
              Our intelligent AI system analyzes your SaaS portfolio to identify optimization opportunities that human analysis might miss.
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <Bot className="h-5 w-5 text-primary mt-0.5" />
                <span>Identifies duplicate or redundant SaaS tools with overlapping functionality</span>
              </li>
              <li className="flex items-start gap-2">
                <Bot className="h-5 w-5 text-primary mt-0.5" />
                <span>Predicts future spending trends based on historical data</span>
              </li>
              <li className="flex items-start gap-2">
                <Bot className="h-5 w-5 text-primary mt-0.5" />
                <span>Recommends tier downgrades for underutilized premium subscriptions</span>
              </li>
              <li className="flex items-start gap-2">
                <Bot className="h-5 w-5 text-primary mt-0.5" />
                <span>Alerts you before auto-renewals to prevent unwanted charges</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISection;
