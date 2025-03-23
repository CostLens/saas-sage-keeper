
import React from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { HelpCircle, Mail, MessageSquare, Phone } from "lucide-react";

const Help = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
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
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => window.location.href = 'tel:+1234567890'}
                  >
                    <Phone className="h-4 w-4" />
                    Call Support
                  </Button>
                </div>
              </div>

              {/* FAQs */}
              <div className="bg-card rounded-lg p-6 border md:col-span-2">
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
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Help;
