
import React from "react";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import AISection from "@/components/landing/AISection";
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
      <FeatureShowcase />
      <WaitingListSection />
      <Footer />
    </div>
  );
};

export default Index;
