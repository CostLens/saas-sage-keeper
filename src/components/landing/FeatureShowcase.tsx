
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
    <section className="py-8 md:py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="space-y-6">
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
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="XpendIQ Dashboard" 
                    className="w-full h-full object-cover" 
                  />
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
