
import React from "react";
import { useBookDemoModal } from "@/hooks/useBookDemoModal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const HeroSection = () => {
  const { openDemoModal } = useBookDemoModal();

  return (
    <section className="py-8 md:py-16 relative bg-gradient-to-b from-background to-background/80">
      <div 
        className="absolute inset-0 bg-grid-pattern bg-secondary/5 bg-[length:20px_20px] opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 0V20M0 1H20' stroke='%23E5E7EB' stroke-width='0.5'/%3E%3C/svg%3E")`
        }}
      ></div>
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                Take Control of Your SaaS <span className="text-primary">Expenses</span>
              </h1>
              <p className="text-xl text-muted-foreground md:w-10/12 lg:w-full mx-auto lg:mx-0">
                Optimize your SaaS spending with data-driven insights, comprehensive monitoring, and practical recommendations that help you make informed decisions.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-border/50">
              <AspectRatio ratio={4/3} className="w-full">
                <img 
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="XpendIQ Dashboard" 
                  className="w-full h-full object-cover" 
                />
              </AspectRatio>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-primary/10 backdrop-blur-sm border border-primary/20 p-3 rounded-lg shadow-lg hidden md:block">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-green-600" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.75 12.75L10 15.25L16.25 8.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-sm font-medium">15-30% cost savings</p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-primary/10 backdrop-blur-sm border border-primary/20 p-3 rounded-lg shadow-lg hidden md:block">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-blue-600" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
                <p className="text-sm font-medium">Real-time monitoring</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
