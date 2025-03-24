
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  TrendingUp, 
  BarChart, 
  CalendarDays, 
  Link as LinkIcon, 
  ListChecks, 
  User 
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Promise of the Product */}
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
                Save up to 30% on your SaaS spending with AI-driven insights, real-time monitoring, and intelligent recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="gap-2">
                  <ListChecks className="h-5 w-5" />
                  Join Waiting List
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <User className="h-5 w-5" />
                  Sign In
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="glass-panel p-6 rounded-xl">
                <div className="aspect-[16/9] rounded-lg bg-gradient-to-br from-blue-500/10 to-green-500/10 border border-white/10 flex items-center justify-center">
                  <div className="w-3/4 bg-white dark:bg-black/60 rounded-lg p-4 shadow-lg">
                    <div className="h-4 w-1/2 bg-primary/20 rounded mb-3"></div>
                    <div className="h-24 bg-gradient-to-r from-green-400/30 to-blue-500/30 rounded mb-3"></div>
                    <div className="flex gap-3">
                      <div className="h-10 w-16 bg-primary/20 rounded"></div>
                      <div className="h-10 w-16 bg-primary/20 rounded"></div>
                      <div className="h-10 w-16 bg-primary/20 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-12 md:py-20 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Challenge of SaaS Spending</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Managing your company's SaaS ecosystem has become increasingly complex.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background rounded-xl p-6 shadow-sm border">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Hidden Costs</h3>
              <p className="text-muted-foreground">
                Organizations typically waste 30% of their SaaS budget on unused licenses, forgotten subscriptions, and redundant tools.
              </p>
            </div>
            <div className="bg-background rounded-xl p-6 shadow-sm border">
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Limited Visibility</h3>
              <p className="text-muted-foreground">
                Without a centralized system, it's nearly impossible to track spending patterns and identify optimization opportunities.
              </p>
            </div>
            <div className="bg-background rounded-xl p-6 shadow-sm border">
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
      </section>

      {/* Solution Approach Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How XpendIQ Works</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI-powered platform streamlines SaaS management through intelligent automation and deep insights.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">AI-Powered Analytics</h3>
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
                    <LinkIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Seamless Integrations</h3>
                    <p className="text-muted-foreground">
                      Connect with your financial tools and email platforms to automatically track contracts and expenses.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="rounded-xl overflow-hidden shadow-lg border">
                <div className="bg-gradient-to-r from-green-400/10 to-blue-500/10 p-6">
                  <div className="h-64 bg-white dark:bg-black/60 rounded-lg p-4 shadow-lg">
                    <div className="h-4 w-1/3 bg-primary/20 rounded mb-3"></div>
                    <div className="space-y-3">
                      <div className="h-16 bg-gradient-to-r from-green-400/30 to-blue-500/30 rounded"></div>
                      <div className="h-16 bg-gradient-to-r from-blue-500/30 to-green-400/30 rounded"></div>
                      <div className="h-16 bg-gradient-to-r from-green-400/30 to-blue-500/30 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waiting List Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-green-400/10 to-blue-500/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Exclusive Waiting List</h2>
            <p className="text-xl text-muted-foreground">
              Be among the first to experience XpendIQ and start optimizing your SaaS spending. Limited slots available for early access.
            </p>
          </div>
          <div className="max-w-md mx-auto bg-background rounded-xl p-6 shadow-lg border">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Early Access Benefits:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Personalized platform demo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Custom proof of concept</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Special introductory pricing</span>
                  </li>
                </ul>
              </div>
              <form className="space-y-4">
                <Input type="email" placeholder="Enter your email" className="w-full" />
                <Input type="text" placeholder="Company name" className="w-full" />
                <Button className="w-full" size="lg">
                  Join Waiting List
                </Button>
              </form>
              <p className="text-xs text-muted-foreground text-center mt-4">
                By joining, you agree to our Terms of Service and Privacy Policy. We'll never share your information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your SaaS Spending?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join the growing list of companies optimizing their SaaS investments. Limited slots available for early access demos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <ListChecks className="h-5 w-5" />
                Join Waiting List
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <User className="h-5 w-5" />
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/30 py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 h-8 w-8 rounded-lg flex items-center justify-center">
                <span className="font-bold text-white text-sm">IQ</span>
              </div>
              <span className="font-bold text-lg">XpendIQ</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2023 XpendIQ. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
