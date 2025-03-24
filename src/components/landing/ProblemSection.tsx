
import React from "react";
import { TrendingUp, BarChart, CalendarDays } from "lucide-react";

const ProblemSection = () => {
  return (
    <section className="py-8 md:py-16 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Challenge of SaaS Spending</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Managing your company's SaaS ecosystem has become increasingly complex.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-background rounded-xl overflow-hidden shadow-sm border">
            <div className="h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Financial team analyzing costs" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Hidden Costs</h3>
              <p className="text-muted-foreground">
                Organizations often have underutilized licenses, forgotten subscriptions, and redundant tools that contribute to inefficient spending.
              </p>
            </div>
          </div>
          <div className="bg-background rounded-xl overflow-hidden shadow-sm border">
            <div className="h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1550085808-25d988056285?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Dashboard with analytics" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Limited Visibility</h3>
              <p className="text-muted-foreground">
                Without a centralized system, it's challenging to track spending patterns and identify optimization opportunities.
              </p>
            </div>
          </div>
          <div className="bg-background rounded-xl overflow-hidden shadow-sm border">
            <div className="h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Team working on laptops" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <CalendarDays className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Renewal Challenges</h3>
              <p className="text-muted-foreground">
                Missing renewal dates leads to unexpected charges, unfavorable terms, and budget overruns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
