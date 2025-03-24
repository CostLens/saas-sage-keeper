
import React from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const ScreenCarousel = () => {
  return (
    <div className="mb-16">
      <Carousel className="max-w-4xl mx-auto">
        <CarouselContent>
          <CarouselItem>
            <AspectRatio ratio={16/9} className="bg-background rounded-lg overflow-hidden border">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Dashboard Overview" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-white/80 dark:bg-black/80 px-3 py-1 rounded text-sm font-medium">
                Dashboard Overview
              </div>
            </AspectRatio>
          </CarouselItem>
          
          <CarouselItem>
            <AspectRatio ratio={16/9} className="bg-background rounded-lg overflow-hidden border">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Spend Analytics" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-white/80 dark:bg-black/80 px-3 py-1 rounded text-sm font-medium">
                Spend Analytics
              </div>
            </AspectRatio>
          </CarouselItem>

          <CarouselItem>
            <AspectRatio ratio={16/9} className="bg-background rounded-lg overflow-hidden border">
              <img 
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Usage Analytics" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-white/80 dark:bg-black/80 px-3 py-1 rounded text-sm font-medium">
                Usage Analytics
              </div>
            </AspectRatio>
          </CarouselItem>
          
          <CarouselItem>
            <AspectRatio ratio={16/9} className="bg-background rounded-lg overflow-hidden border">
              <img 
                src="https://images.unsplash.com/photo-1434626881859-194d67b2b86f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Contract Repository" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-white/80 dark:bg-black/80 px-3 py-1 rounded text-sm font-medium">
                Contract Repository
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
