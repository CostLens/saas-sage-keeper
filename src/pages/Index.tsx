
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  BarChart, 
  CalendarDays, 
  Link as LinkIcon, 
  ListChecks, 
  User,
  LayoutDashboard,
  PieChart,
  LineChart,
  Table
} from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

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
                Organizations often have underutilized licenses, forgotten subscriptions, and redundant tools that contribute to inefficient spending.
              </p>
            </div>
            <div className="bg-background rounded-xl p-6 shadow-sm border">
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Limited Visibility</h3>
              <p className="text-muted-foreground">
                Without a centralized system, it's challenging to track spending patterns and identify optimization opportunities.
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
              Our platform streamlines SaaS management through intelligent automation and practical insights.
            </p>
          </div>
          
          <div className="mb-16">
            <Carousel className="max-w-4xl mx-auto">
              <CarouselContent>
                <CarouselItem>
                  <AspectRatio ratio={16/9} className="bg-background rounded-lg overflow-hidden border">
                    <div className="w-full h-full p-4">
                      <div className="h-8 w-full bg-muted flex items-center px-4 rounded-t-lg mb-4">
                        <div className="h-4 w-24 bg-primary/20 rounded"></div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex flex-col space-y-2">
                          <div className="h-6 w-36 bg-muted-foreground/20 rounded"></div>
                          <div className="h-24 bg-muted rounded p-3">
                            <div className="flex justify-between items-center mb-3">
                              <div className="h-3 w-16 bg-muted-foreground/20 rounded"></div>
                              <div className="h-6 w-6 rounded-full bg-primary/20"></div>
                            </div>
                            <div className="h-4 w-36 bg-muted-foreground/20 rounded mb-2"></div>
                            <div className="h-4 w-24 bg-muted-foreground/20 rounded"></div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                          <div className="h-6 w-36 bg-muted-foreground/20 rounded"></div>
                          <div className="h-24 bg-muted rounded p-3">
                            <div className="flex justify-between items-center mb-3">
                              <div className="h-3 w-16 bg-muted-foreground/20 rounded"></div>
                              <div className="h-6 w-6 rounded-full bg-green-500/20"></div>
                            </div>
                            <div className="h-4 w-36 bg-muted-foreground/20 rounded mb-2"></div>
                            <div className="h-4 w-24 bg-muted-foreground/20 rounded"></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="h-40 bg-muted rounded p-3">
                        <div className="h-6 w-48 bg-muted-foreground/20 rounded mb-4"></div>
                        <div className="h-24 w-full flex items-end justify-between px-4">
                          <div className="h-12 w-12 bg-primary/20 rounded"></div>
                          <div className="h-16 w-12 bg-primary/30 rounded"></div>
                          <div className="h-20 w-12 bg-primary/40 rounded"></div>
                          <div className="h-14 w-12 bg-primary/30 rounded"></div>
                          <div className="h-10 w-12 bg-primary/20 rounded"></div>
                          <div className="h-18 w-12 bg-primary/50 rounded"></div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-white/80 dark:bg-black/80 px-3 py-1 rounded text-sm font-medium">
                      Dashboard Overview
                    </div>
                  </AspectRatio>
                </CarouselItem>
                
                <CarouselItem>
                  <AspectRatio ratio={16/9} className="bg-background rounded-lg overflow-hidden border">
                    <div className="w-full h-full p-4">
                      <div className="h-8 w-full bg-muted flex items-center px-4 rounded-t-lg mb-4">
                        <div className="h-4 w-40 bg-muted-foreground/20 rounded"></div>
                      </div>
                      
                      <div className="h-[calc(100%-48px)] overflow-hidden">
                        <div className="flex items-center justify-between mb-4">
                          <div className="h-8 w-48 bg-muted-foreground/20 rounded"></div>
                          <div className="h-8 w-24 bg-primary/20 rounded"></div>
                        </div>
                        
                        <div className="h-full w-full bg-muted rounded p-3">
                          <div className="grid grid-cols-5 gap-4 mb-3">
                            <div className="h-6 bg-muted-foreground/10 rounded"></div>
                            <div className="h-6 bg-muted-foreground/10 rounded"></div>
                            <div className="h-6 bg-muted-foreground/10 rounded"></div>
                            <div className="h-6 bg-muted-foreground/10 rounded"></div>
                            <div className="h-6 bg-muted-foreground/10 rounded"></div>
                          </div>
                          
                          {/* Table rows */}
                          {[1, 2, 3, 4].map(i => (
                            <div key={i} className="grid grid-cols-5 gap-4 mb-3">
                              <div className="h-10 bg-background rounded flex items-center p-2">
                                <div className="h-6 w-6 rounded-full bg-muted-foreground/20 mr-2"></div>
                                <div className="h-4 w-16 bg-muted-foreground/20 rounded"></div>
                              </div>
                              <div className="h-10 bg-background rounded p-2">
                                <div className="h-4 w-full bg-muted-foreground/20 rounded"></div>
                              </div>
                              <div className="h-10 bg-background rounded p-2">
                                <div className="h-4 w-full bg-muted-foreground/20 rounded"></div>
                              </div>
                              <div className="h-10 bg-background rounded p-2">
                                <div className="h-4 w-full bg-muted-foreground/20 rounded"></div>
                              </div>
                              <div className="h-10 bg-background rounded p-2">
                                <div className="h-6 w-6 bg-muted-foreground/20 rounded-full mx-auto"></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-white/80 dark:bg-black/80 px-3 py-1 rounded text-sm font-medium">
                      Contract Management
                    </div>
                  </AspectRatio>
                </CarouselItem>
                
                <CarouselItem>
                  <AspectRatio ratio={16/9} className="bg-background rounded-lg overflow-hidden border">
                    <div className="w-full h-full p-4">
                      <div className="h-8 w-full bg-muted flex items-center px-4 rounded-t-lg mb-4">
                        <div className="h-4 w-32 bg-muted-foreground/20 rounded"></div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="bg-muted rounded p-3">
                          <div className="flex justify-between items-center mb-2">
                            <div className="h-4 w-20 bg-muted-foreground/20 rounded"></div>
                            <div className="h-6 w-6 rounded-full flex items-center justify-center bg-primary/10">
                              <div className="h-3 w-3 rounded-full bg-primary/40"></div>
                            </div>
                          </div>
                          <div className="h-6 w-16 bg-muted-foreground/30 rounded mb-1"></div>
                          <div className="h-3 w-12 bg-muted-foreground/20 rounded"></div>
                        </div>
                        
                        <div className="bg-muted rounded p-3">
                          <div className="flex justify-between items-center mb-2">
                            <div className="h-4 w-20 bg-muted-foreground/20 rounded"></div>
                            <div className="h-6 w-6 rounded-full flex items-center justify-center bg-green-500/10">
                              <div className="h-3 w-3 rounded-full bg-green-500/40"></div>
                            </div>
                          </div>
                          <div className="h-6 w-16 bg-muted-foreground/30 rounded mb-1"></div>
                          <div className="h-3 w-12 bg-muted-foreground/20 rounded"></div>
                        </div>
                        
                        <div className="bg-muted rounded p-3">
                          <div className="flex justify-between items-center mb-2">
                            <div className="h-4 w-20 bg-muted-foreground/20 rounded"></div>
                            <div className="h-6 w-6 rounded-full flex items-center justify-center bg-amber-500/10">
                              <div className="h-3 w-3 rounded-full bg-amber-500/40"></div>
                            </div>
                          </div>
                          <div className="h-6 w-16 bg-muted-foreground/30 rounded mb-1"></div>
                          <div className="h-3 w-12 bg-muted-foreground/20 rounded"></div>
                        </div>
                      </div>
                      
                      <div className="h-[calc(100%-132px)] grid grid-cols-2 gap-4">
                        <div className="bg-muted rounded p-3">
                          <div className="h-5 w-40 bg-muted-foreground/20 rounded mb-3"></div>
                          <div className="h-[calc(100%-28px)] w-full flex justify-center items-center">
                            <div className="h-32 w-32 rounded-full border-8 border-primary/30 flex items-center justify-center">
                              <div className="h-24 w-24 rounded-full border-8 border-green-500/30 flex items-center justify-center">
                                <div className="h-16 w-16 rounded-full border-8 border-amber-500/30"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-muted rounded p-3">
                          <div className="h-5 w-32 bg-muted-foreground/20 rounded mb-3"></div>
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <div className="h-4 w-4 rounded-full bg-primary/40 mr-2"></div>
                              <div className="h-4 w-24 bg-muted-foreground/20 rounded mr-2"></div>
                              <div className="h-2 w-full bg-muted-foreground/10 rounded"></div>
                            </div>
                            <div className="flex items-center">
                              <div className="h-4 w-4 rounded-full bg-green-500/40 mr-2"></div>
                              <div className="h-4 w-20 bg-muted-foreground/20 rounded mr-2"></div>
                              <div className="h-2 w-2/3 bg-muted-foreground/10 rounded"></div>
                            </div>
                            <div className="flex items-center">
                              <div className="h-4 w-4 rounded-full bg-amber-500/40 mr-2"></div>
                              <div className="h-4 w-28 bg-muted-foreground/20 rounded mr-2"></div>
                              <div className="h-2 w-1/3 bg-muted-foreground/10 rounded"></div>
                            </div>
                            <div className="flex items-center">
                              <div className="h-4 w-4 rounded-full bg-blue-500/40 mr-2"></div>
                              <div className="h-4 w-16 bg-muted-foreground/20 rounded mr-2"></div>
                              <div className="h-2 w-1/4 bg-muted-foreground/10 rounded"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-white/80 dark:bg-black/80 px-3 py-1 rounded text-sm font-medium">
                      Spend Analytics
                    </div>
                  </AspectRatio>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

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
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <Link to="/dashboard">
                  <User className="h-5 w-5" />
                  Sign In
                </Link>
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

