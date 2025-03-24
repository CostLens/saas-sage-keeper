
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useBookDemoModal } from "@/hooks/useBookDemoModal";

const HeroSection = () => {
  const { openDemoModal } = useBookDemoModal();
  
  return (
    <section className="relative pt-16 md:pt-24 pb-10 md:pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-16">
          <div className="lg:w-1/2 space-y-6">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 h-12 w-12 rounded-xl flex items-center justify-center mb-6">
              <span className="font-bold text-white text-2xl">IQ</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Intelligent SaaS Expense Management
            </h1>
            <p className="text-xl text-muted-foreground">
              Optimize your SaaS spending with data-driven insights, comprehensive monitoring, and practical recommendations that help you make informed decisions.
            </p>
          </div>
          <div className="lg:w-1/2">
            <div className="glass-panel p-6 rounded-xl">
              <AspectRatio ratio={16/9} className="bg-background rounded-lg overflow-hidden border">
                <div className="w-full h-full relative p-4">
                  {/* Using SVG representation of the dashboard */}
                  <svg width="100%" height="100%" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Dashboard header */}
                    <rect width="800" height="50" fill="#F1F5F9" />
                    <rect x="20" y="15" width="180" height="20" rx="4" fill="#64748B" />
                    <circle cx="750" cy="25" r="15" fill="#38BDF8" />
                    
                    {/* Sidebar */}
                    <rect width="200" height="400" y="50" fill="#F8FAFC" />
                    <rect x="20" y="80" width="160" height="12" rx="2" fill="#94A3B8" />
                    <rect x="20" y="110" width="160" height="12" rx="2" fill="#94A3B8" />
                    <rect x="20" y="140" width="160" height="12" rx="2" fill="#94A3B8" />
                    <rect x="20" y="170" width="160" height="12" rx="2" fill="#94A3B8" />
                    <rect x="20" y="200" width="160" height="12" rx="2" fill="#94A3B8" />
                    
                    {/* Main content area */}
                    <rect x="220" y="70" width="560" height="30" rx="4" fill="#E2E8F0" />
                    
                    {/* Stats cards */}
                    <rect x="220" y="120" width="170" height="100" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
                    <rect x="235" y="135" width="100" height="16" rx="2" fill="#64748B" />
                    <rect x="235" y="165" width="70" height="24" rx="2" fill="#3B82F6" />
                    
                    <rect x="410" y="120" width="170" height="100" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
                    <rect x="425" y="135" width="100" height="16" rx="2" fill="#64748B" />
                    <rect x="425" y="165" width="70" height="24" rx="2" fill="#10B981" />
                    
                    <rect x="600" y="120" width="170" height="100" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
                    <rect x="615" y="135" width="100" height="16" rx="2" fill="#64748B" />
                    <rect x="615" y="165" width="70" height="24" rx="2" fill="#F59E0B" />
                    
                    {/* Data table */}
                    <rect x="220" y="240" width="560" height="190" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
                    <rect x="240" y="260" width="520" height="30" rx="2" fill="#F8FAFC" />
                    <rect x="240" y="300" width="520" height="30" rx="2" fill="#FFFFFF" />
                    <rect x="240" y="340" width="520" height="30" rx="2" fill="#F8FAFC" />
                    <rect x="240" y="380" width="520" height="30" rx="2" fill="#FFFFFF" />
                  </svg>
                </div>
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
