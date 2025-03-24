
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const WaitingListSection = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-r from-green-400/10 to-blue-500/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Book a Personalized Demo</h2>
          <p className="text-xl text-muted-foreground">
            Experience XpendIQ in action and discover how it can help your organization optimize SaaS spending.
          </p>
        </div>
        <div className="max-w-md mx-auto bg-background rounded-xl p-6 shadow-lg border">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Demo Benefits:</h3>
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
                  <span>ROI assessment for your organization</span>
                </li>
              </ul>
            </div>
            <form className="space-y-4">
              <Input type="email" placeholder="Enter your email" className="w-full" />
              <Input type="text" placeholder="Company name" className="w-full" />
              <Button className="w-full" size="lg">
                Schedule Demo
              </Button>
            </form>
            <p className="text-xs text-muted-foreground text-center mt-4">
              By scheduling a demo, you agree to our Terms of Service and Privacy Policy. We'll never share your information.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitingListSection;
