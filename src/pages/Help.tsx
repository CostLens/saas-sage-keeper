
import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { HelpCircle, Mail, MessageSquare, Star, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

const Help = () => {
  // Track sidebar collapsed state
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(() => {
    // On mobile devices, sidebar should be collapsed by default
    return localStorage.getItem("sidebar-collapsed") === "true";
  });
  
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    // Update sidebar state when mobile status changes
    const handleSidebarChange = (event: CustomEvent) => {
      setSidebarCollapsed(event.detail.isCollapsed);
    };

    // Listen for sidebar state changes
    window.addEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    
    return () => {
      window.removeEventListener('sidebarStateChanged', handleSidebarChange as EventListener);
    };
  }, []);

  const handleRating = (value: number) => {
    setRating(value);
  };

  const handleSubmitFeedback = () => {
    if (!rating) {
      toast.error("Please provide a rating");
      return;
    }

    if (!feedback.trim()) {
      toast.error("Please provide feedback");
      return;
    }

    // Here you would submit feedback to your backend
    console.log({ rating, feedback });
    
    toast.success("Thank you for your feedback!");
    setRating(null);
    setFeedback("");
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className={`flex-1 flex flex-col ${isSidebarCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Help & Support</h1>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Quick Help */}
              <div className="bg-card rounded-lg p-6 border">
                <h2 className="text-lg font-semibold mb-4">Quick Help</h2>
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => window.open('https://docs.costlens.com', '_blank')}
                  >
                    <HelpCircle className="h-4 w-4" />
                    Documentation
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => window.open('https://community.costlens.com', '_blank')}
                  >
                    <MessageSquare className="h-4 w-4" />
                    Community Forum
                  </Button>
                </div>
              </div>

              {/* Contact Support */}
              <div className="bg-card rounded-lg p-6 border">
                <h2 className="text-lg font-semibold mb-4">Contact Support</h2>
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => window.location.href = 'mailto:support@costlens.com'}
                  >
                    <Mail className="h-4 w-4" />
                    Email Support
                  </Button>
                </div>
              </div>

              {/* Feedback Section */}
              <div className="bg-card rounded-lg p-6 border md:col-span-2">
                <h2 className="text-lg font-semibold mb-4">Rate Our Product</h2>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">We appreciate your feedback to help improve our product</p>
                  
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Button
                        key={value}
                        variant="ghost"
                        size="sm"
                        className={`p-1 ${rating && rating >= value ? 'text-amber-500' : 'text-muted-foreground'}`}
                        onClick={() => handleRating(value)}
                      >
                        <Star className="h-6 w-6" />
                      </Button>
                    ))}
                  </div>
                  
                  <Textarea
                    placeholder="Share your thoughts, suggestions or report an issue..."
                    className="min-h-[100px]"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                  
                  <Button onClick={handleSubmitFeedback} className="gap-2">
                    <Send className="h-4 w-4" />
                    Submit Feedback
                  </Button>
                </div>
              </div>

              {/* FAQs */}
              <Card className="p-6 md:col-span-2">
                <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    {
                      q: "How do I add a new SaaS subscription?",
                      a: "Navigate to the Dashboard and click on the 'Add New' button to enter your subscription details."
                    },
                    {
                      q: "How are costs calculated?",
                      a: "Costs are calculated based on the subscription price and billing frequency you provide."
                    },
                    {
                      q: "Can I export my data?",
                      a: "Yes, you can export your data in CSV format from the Dashboard using the export button."
                    }
                  ].map((faq, index) => (
                    <div key={index} className="border-b pb-4">
                      <h3 className="font-medium mb-2">{faq.q}</h3>
                      <p className="text-sm text-muted-foreground">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Help;
