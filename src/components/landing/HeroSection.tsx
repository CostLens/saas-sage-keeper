
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ListChecks, User } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const HeroSection = () => {
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
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="gap-2">
                <ListChecks className="h-5 w-5" />
                Join Waiting List
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <Link to="/dashboard">
                  <User className="h-5 w-5" />
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="glass-panel p-6 rounded-xl">
              <AspectRatio ratio={16/9} className="bg-background rounded-lg overflow-hidden border">
                <div className="w-full h-full relative p-4">
                  {/* Dashboard mockup */}
                  <div className="absolute top-0 left-0 w-full h-8 bg-muted flex items-center px-4">
                    <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                    <div className="h-4 w-40 bg-muted-foreground/20 rounded ml-4"></div>
                  </div>
                  
                  <div className="pt-10 grid grid-cols-12 gap-4 h-full">
                    {/* Sidebar */}
                    <div className="col-span-3 bg-secondary/30 rounded-lg p-3">
                      <div className="h-6 w-24 bg-primary/20 rounded mb-6"></div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 rounded-full bg-primary/40"></div>
                          <div className="h-4 w-full bg-muted-foreground/20 rounded"></div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 rounded-full bg-primary/40"></div>
                          <div className="h-4 w-full bg-muted-foreground/20 rounded"></div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 rounded-full bg-primary/40"></div>
                          <div className="h-4 w-full bg-muted-foreground/20 rounded"></div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 rounded-full bg-primary/40"></div>
                          <div className="h-4 w-full bg-muted-foreground/20 rounded"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Main content */}
                    <div className="col-span-9 p-3">
                      <div className="h-8 w-full flex justify-between mb-4">
                        <div className="h-full w-40 bg-muted-foreground/20 rounded"></div>
                        <div className="h-full w-20 bg-primary/20 rounded"></div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="bg-muted rounded-lg p-3">
                          <div className="h-3 w-12 bg-muted-foreground/20 rounded mb-2"></div>
                          <div className="h-8 w-16 bg-primary/30 rounded mb-1"></div>
                          <div className="h-2 w-20 bg-muted-foreground/20 rounded"></div>
                        </div>
                        <div className="bg-muted rounded-lg p-3">
                          <div className="h-3 w-12 bg-muted-foreground/20 rounded mb-2"></div>
                          <div className="h-8 w-16 bg-green-500/30 rounded mb-1"></div>
                          <div className="h-2 w-20 bg-muted-foreground/20 rounded"></div>
                        </div>
                        <div className="bg-muted rounded-lg p-3">
                          <div className="h-3 w-12 bg-muted-foreground/20 rounded mb-2"></div>
                          <div className="h-8 w-16 bg-amber-500/30 rounded mb-1"></div>
                          <div className="h-2 w-20 bg-muted-foreground/20 rounded"></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-muted rounded-lg p-3">
                          <div className="h-3 w-full bg-gradient-to-r from-primary/30 to-primary/10 rounded mb-3"></div>
                          <div className="h-3 w-5/6 bg-gradient-to-r from-primary/30 to-primary/10 rounded mb-3"></div>
                          <div className="h-3 w-2/3 bg-gradient-to-r from-primary/30 to-primary/10 rounded mb-3"></div>
                          <div className="h-3 w-1/2 bg-gradient-to-r from-primary/30 to-primary/10 rounded"></div>
                        </div>
                        <div className="bg-muted rounded-lg p-3">
                          <div className="grid grid-cols-3 gap-1 h-full">
                            <div className="bg-green-500/20 rounded-sm"></div>
                            <div className="bg-blue-500/20 rounded-sm"></div>
                            <div className="bg-amber-500/20 rounded-sm"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
