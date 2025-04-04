
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface SurveyQuestion {
  id: number;
  question: string;
  type: string;
  scale?: string;
  options?: string[];
  required: boolean;
}

interface SurveyQuestionsDialogProps {
  appName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  surveyQuestions: SurveyQuestion[];
}

export function SurveyQuestionsDialog({ 
  appName, 
  open, 
  onOpenChange, 
  surveyQuestions 
}: SurveyQuestionsDialogProps) {
  const { toast } = useToast();
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{appName} Survey Questions</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="current" className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="current" className="flex-1">Current Questions</TabsTrigger>
            <TabsTrigger value="edit" className="flex-1">Edit Questions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current">
            <div className="space-y-4">
              {surveyQuestions.map((q, index) => (
                <div key={q.id} className="p-4 border rounded-md">
                  <div className="flex justify-between items-start">
                    <div className="font-medium">Q{index + 1}: {q.question}</div>
                    <Badge variant="outline">{q.required ? "Required" : "Optional"}</Badge>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Type: {q.type.charAt(0).toUpperCase() + q.type.slice(1)}
                    {q.scale && <span> (Scale: {q.scale})</span>}
                    {q.options && (
                      <div className="mt-1">
                        Options: {q.options.join(", ")}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="edit">
            <div className="space-y-4">
              {surveyQuestions.map((q, index) => (
                <div key={q.id} className="p-4 border rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <Label htmlFor={`question-${q.id}`}>Question {index + 1}</Label>
                    <Select defaultValue={q.required ? "required" : "optional"}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="required">Required</SelectItem>
                        <SelectItem value="optional">Optional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Input id={`question-${q.id}`} defaultValue={q.question} className="mb-2" />
                  <div className="flex gap-2 items-center mt-2">
                    <Select defaultValue={q.type}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rating">Rating</SelectItem>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="multi-select">Multi-select</SelectItem>
                        <SelectItem value="single-select">Single-select</SelectItem>
                      </SelectContent>
                    </Select>
                    {q.type === "rating" && (
                      <Select defaultValue={q.scale}>
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-10">Scale 0-10</SelectItem>
                          <SelectItem value="1-5">Scale 1-5</SelectItem>
                          <SelectItem value="1-7">Scale 1-7</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                    <Button variant="destructive" size="sm" className="ml-auto">Remove</Button>
                  </div>
                </div>
              ))}
              <Button className="w-full">+ Add Question</Button>
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={() => {
            onOpenChange(false);
            toast({
              title: "Survey questions saved",
              description: "Your changes to the survey have been saved"
            });
          }}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
