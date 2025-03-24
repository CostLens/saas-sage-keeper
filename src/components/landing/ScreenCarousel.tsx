
import React from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Bot, Cpu, Sparkles } from "lucide-react";

const ScreenCarousel = () => {
  return (
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

          <CarouselItem>
            <AspectRatio ratio={16/9} className="bg-background rounded-lg overflow-hidden border">
              <div className="w-full h-full p-4">
                <div className="h-8 w-full bg-muted flex items-center px-4 rounded-t-lg mb-4">
                  <div className="h-4 w-36 bg-muted-foreground/20 rounded"></div>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-4">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex justify-between items-center mb-3">
                      <div className="h-5 w-32 bg-muted-foreground/20 rounded"></div>
                      <div className="h-6 w-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <Bot className="h-3 w-3 text-purple-500" />
                      </div>
                    </div>
                    <div className="space-y-2 mb-2">
                      <div className="h-4 w-full bg-muted-foreground/10 rounded"></div>
                      <div className="h-4 w-5/6 bg-muted-foreground/10 rounded"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-7 bg-background rounded flex items-center justify-center">
                        <div className="h-3 w-12 bg-primary/30 rounded"></div>
                      </div>
                      <div className="h-7 bg-background rounded flex items-center justify-center">
                        <div className="h-3 w-16 bg-muted-foreground/20 rounded"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex justify-between items-center mb-3">
                      <div className="h-5 w-32 bg-muted-foreground/20 rounded"></div>
                      <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Sparkles className="h-3 w-3 text-green-500" />
                      </div>
                    </div>
                    <div className="space-y-2 mb-2">
                      <div className="h-4 w-full bg-muted-foreground/10 rounded"></div>
                      <div className="h-4 w-5/6 bg-muted-foreground/10 rounded"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-7 bg-background rounded flex items-center justify-center">
                        <div className="h-3 w-12 bg-primary/30 rounded"></div>
                      </div>
                      <div className="h-7 bg-background rounded flex items-center justify-center">
                        <div className="h-3 w-16 bg-muted-foreground/20 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted rounded-lg p-3 h-[calc(100%-124px)]">
                  <div className="flex justify-between items-center mb-3">
                    <div className="h-5 w-48 bg-muted-foreground/20 rounded"></div>
                    <div className="h-6 w-24 bg-primary/20 rounded"></div>
                  </div>
                  
                  <div className="space-y-3 mt-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="bg-background rounded-lg p-3 flex items-center">
                        <div className="h-8 w-8 rounded-full bg-muted-foreground/20 mr-3 flex items-center justify-center">
                          <Cpu className="h-4 w-4 text-primary/50" />
                        </div>
                        <div className="flex-1">
                          <div className="h-4 w-36 bg-muted-foreground/20 rounded mb-1"></div>
                          <div className="h-3 w-full bg-muted-foreground/10 rounded"></div>
                        </div>
                        <div className="h-7 w-20 bg-primary/10 rounded-full ml-3 flex items-center justify-center">
                          <div className="h-3 w-12 bg-primary/30 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute bottom-3 left-3 bg-white/80 dark:bg-black/80 px-3 py-1 rounded text-sm font-medium">
                AI Assistant Dashboard
              </div>
            </AspectRatio>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ScreenCarousel;
