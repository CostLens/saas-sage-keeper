
import React from "react";
import { Bot, Cpu, Sparkles } from "lucide-react";

const AISection = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-r from-green-400/5 to-blue-500/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Intelligence</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform leverages advanced AI and autonomous agents to transform your SaaS management experience.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-background rounded-xl p-6 shadow-sm border">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              <Bot className="h-6 w-6 text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Intelligent Agents</h3>
            <p className="text-muted-foreground">
              Autonomous agents scan your SaaS ecosystem, identify optimization opportunities, and proactively alert you about critical events.
            </p>
          </div>
          <div className="bg-background rounded-xl p-6 shadow-sm border">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <Cpu className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Predictive Analytics</h3>
            <p className="text-muted-foreground">
              Our AI models analyze spending patterns to forecast future costs and identify potential savings opportunities before they arise.
            </p>
          </div>
          <div className="bg-background rounded-xl p-6 shadow-sm border">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Smart Recommendations</h3>
            <p className="text-muted-foreground">
              Receive personalized recommendations based on your specific usage patterns and business requirements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISection;
