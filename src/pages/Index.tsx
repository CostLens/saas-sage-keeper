
import React from "react";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import AISection from "@/components/landing/AISection";
import ScreenCarousel from "@/components/landing/ScreenCarousel";
import FeatureShowcase from "@/components/landing/FeatureShowcase";
import WaitingListSection from "@/components/landing/WaitingListSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ProblemSection />
      <AISection />
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">See XpendIQ in Action</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our intuitive dashboards and powerful analytics tools designed to give you complete control over your SaaS spending.
            </p>
          </div>
          <ScreenCarousel />
          <FeatureShowcase />
        </div>
      </section>
      <WaitingListSection />
      <Footer />
    </div>
  );
};

export default Index;
