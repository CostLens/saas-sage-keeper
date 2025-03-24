
import React from "react";
import { 
  LayoutDashboard, 
  CalendarDays, 
  Table, 
  PieChart, 
  LineChart, 
  BarChart
} from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const FeatureShowcase = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <LayoutDashboard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Comprehensive Dashboard</h3>
                  <p className="text-muted-foreground">
                    Get actionable insights into your SaaS spending patterns and identify opportunities for optimization.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CalendarDays className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Renewal Management</h3>
                  <p className="text-muted-foreground">
                    Never miss a renewal date again with automated alerts and contract management tools.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Table className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Contract Repository</h3>
                  <p className="text-muted-foreground">
                    Centralize all your SaaS contracts in one place for easy access and management.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="rounded-xl overflow-hidden shadow-lg border">
              <div className="bg-gradient-to-r from-green-400/10 to-blue-500/10 p-6">
                <AspectRatio ratio={4/3} className="bg-background rounded-lg overflow-hidden border">
                  <div className="w-full h-full p-4">
                    <div className="h-6 w-48 bg-muted-foreground/20 rounded mb-6"></div>
                    
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="bg-muted rounded p-2">
                        <div className="h-4 w-16 bg-muted-foreground/30 rounded mb-2"></div>
                        <div className="h-8 flex items-end justify-center">
                          <LineChart className="h-8 w-8 text-primary/60" />
                        </div>
                      </div>
                      <div className="bg-muted rounded p-2">
                        <div className="h-4 w-16 bg-muted-foreground/30 rounded mb-2"></div>
                        <div className="h-8 flex items-end justify-center">
                          <BarChart className="h-8 w-8 text-green-500/60" />
                        </div>
                      </div>
                      <div className="bg-muted rounded p-2">
                        <div className="h-4 w-16 bg-muted-foreground/30 rounded mb-2"></div>
                        <div className="h-8 flex items-end justify-center">
                          <PieChart className="h-8 w-8 text-amber-500/60" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="h-8 bg-muted rounded p-2 flex items-center">
                        <div className="h-4 w-4 rounded-full bg-primary/30 mr-3"></div>
                        <div className="h-3 w-40 bg-muted-foreground/20 rounded"></div>
                        <div className="ml-auto h-3 w-16 bg-muted-foreground/20 rounded"></div>
                      </div>
                      <div className="h-8 bg-muted rounded p-2 flex items-center">
                        <div className="h-4 w-4 rounded-full bg-green-500/30 mr-3"></div>
                        <div className="h-3 w-32 bg-muted-foreground/20 rounded"></div>
                        <div className="ml-auto h-3 w-16 bg-muted-foreground/20 rounded"></div>
                      </div>
                      <div className="h-8 bg-muted rounded p-2 flex items-center">
                        <div className="h-4 w-4 rounded-full bg-blue-500/30 mr-3"></div>
                        <div className="h-3 w-36 bg-muted-foreground/20 rounded"></div>
                        <div className="ml-auto h-3 w-16 bg-muted-foreground/20 rounded"></div>
                      </div>
                    </div>
                  </div>
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
