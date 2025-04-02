
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer, Download } from "lucide-react";

interface ITSecurityQuestionnaireProps {
  vendorName?: string;
}

export function ITSecurityQuestionnaire({ vendorName }: ITSecurityQuestionnaireProps) {
  const sections = [
    {
      title: "Company Information",
      questions: [
        { question: "Company Name", type: "text" },
        { question: "Primary Contact Name", type: "text" },
        { question: "Primary Contact Email", type: "text" },
        { question: "Primary Contact Phone", type: "text" },
        { question: "Company Address", type: "text" },
        { question: "Website", type: "text" },
      ],
    },
    {
      title: "Security Compliance",
      questions: [
        { question: "Is your organization compliant with any security frameworks (e.g., SOC 2, ISO 27001, HIPAA)? If yes, please specify.", type: "textarea" },
        { question: "When was your last security audit conducted and by whom?", type: "textarea" },
        { question: "Do you have an information security policy? If yes, please provide a copy or summary.", type: "textarea" },
        { question: "Have you experienced any security breaches in the last 3 years? If yes, please provide details.", type: "textarea" },
      ],
    },
    {
      title: "Data Protection",
      questions: [
        { question: "Where will our data be stored? Please list all geographic locations.", type: "textarea" },
        { question: "Do you use encryption for data at rest and in transit? Please describe your encryption methods.", type: "textarea" },
        { question: "How long is data retained in your systems? Do you have a data retention policy?", type: "textarea" },
        { question: "What is your data backup strategy and frequency?", type: "textarea" },
        { question: "Do you have a process for secure data disposal when requested?", type: "textarea" },
      ],
    },
    {
      title: "Access Control",
      questions: [
        { question: "Do you implement multi-factor authentication for system access?", type: "radio", options: ["Yes", "No"] },
        { question: "How do you manage user access rights and privileges?", type: "textarea" },
        { question: "Do you have a formal process for granting and revoking system access?", type: "textarea" },
        { question: "How frequently are access rights reviewed?", type: "textarea" },
      ],
    },
    {
      title: "Incident Response",
      questions: [
        { question: "Do you have a formal incident response plan?", type: "radio", options: ["Yes", "No"] },
        { question: "What is your process for notifying customers of security incidents?", type: "textarea" },
        { question: "What is your target time for responding to security incidents?", type: "text" },
        { question: "Do you conduct regular incident response drills or simulations?", type: "radio", options: ["Yes", "No"] },
      ],
    },
    {
      title: "Business Continuity",
      questions: [
        { question: "Do you have a business continuity plan?", type: "radio", options: ["Yes", "No"] },
        { question: "What is your disaster recovery strategy?", type: "textarea" },
        { question: "What is your service uptime goal?", type: "text" },
        { question: "How do you test your business continuity and disaster recovery plans?", type: "textarea" },
      ],
    },
    {
      title: "Third-Party Management",
      questions: [
        { question: "Do you use subcontractors or third-party service providers? If yes, please list them.", type: "textarea" },
        { question: "How do you assess the security of your third-party providers?", type: "textarea" },
        { question: "Do you require third parties to comply with your security policies?", type: "radio", options: ["Yes", "No"] },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          IT & Security Questionnaire {vendorName ? `for ${vendorName}` : ""}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <p className="mb-4">
            To ensure the security and compliance of our technology ecosystem, we request that you complete the following security questionnaire. This information will help us assess your security controls and data protection practices.
          </p>

          <Accordion type="multiple" className="w-full">
            {sections.map((section, sectionIndex) => (
              <AccordionItem key={sectionIndex} value={`section-${sectionIndex}`}>
                <AccordionTrigger className="font-medium">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    {section.questions.map((q, qIndex) => (
                      <div key={qIndex} className="border-b pb-4 last:border-0">
                        <p className="font-medium mb-2">{q.question}</p>
                        {q.type === "text" && (
                          <input 
                            type="text" 
                            className="w-full p-2 border rounded-md"
                            placeholder="Enter your answer"
                          />
                        )}
                        {q.type === "textarea" && (
                          <textarea 
                            className="w-full p-2 border rounded-md min-h-[100px]"
                            placeholder="Enter your answer"
                          />
                        )}
                        {q.type === "radio" && q.options && (
                          <div className="flex gap-4">
                            {q.options.map((option, optionIndex) => (
                              <label key={optionIndex} className="flex items-center gap-2">
                                <input type="radio" name={`q-${sectionIndex}-${qIndex}`} />
                                {option}
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
