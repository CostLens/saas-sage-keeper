
import React, { useState } from "react";
import { AppDiscoveryData } from "@/hooks/useAppDiscoveryData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, MessageSquare, Star, Download, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea"; 
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";

interface SentimentTabProps {
  app: AppDiscoveryData;
}

// Mock sentiment data
const mockSentimentData = {
  netPromoterScore: -41,
  respondents: 22,
  breakdown: {
    detractors: { count: 11, percentage: 50 },
    passives: { count: 9, percentage: 41 },
    promoters: { count: 2, percentage: 9 }
  },
  criticality: 73,
  reviews: [
    { 
      id: 1, 
      name: "Adrianna Hegmann", 
      avatar: "", 
      date: "Nov 13, 2024", 
      rating: 6,
      comment: "",
      critical: false 
    },
    { 
      id: 2, 
      name: "Zakary Olson", 
      avatar: "", 
      date: "Nov 11, 2024", 
      rating: 3,
      comment: "Indicated that they don't use this product",
      critical: false 
    },
    { 
      id: 3, 
      name: "Sydni Kirlin", 
      avatar: "", 
      date: "Nov 11, 2024", 
      rating: 4,
      comment: "",
      critical: false 
    }
  ],
  ratingDistribution: [
    { rating: 0, percentage: 0 },
    { rating: 1, percentage: 0 },
    { rating: 2, percentage: 0 },
    { rating: 3, percentage: 0 },
    { rating: 4, percentage: 5 },
    { rating: 5, percentage: 14 },
    { rating: 6, percentage: 32 },
    { rating: 7, percentage: 9 },
    { rating: 8, percentage: 32 },
    { rating: 9, percentage: 9 },
    { rating: 10, percentage: 0 }
  ],
  // Added survey questions
  surveyQuestions: [
    {
      id: 1,
      question: "How likely are you to recommend this app to a colleague?",
      type: "rating",
      scale: "0-10",
      required: true
    },
    {
      id: 2,
      question: "How critical is this app to your daily work?",
      type: "rating",
      scale: "1-5",
      required: true
    },
    {
      id: 3,
      question: "Which features do you use most frequently?",
      type: "multi-select",
      options: ["Dashboard", "Reporting", "Analytics", "Automation", "API Integration"],
      required: true
    },
    {
      id: 4,
      question: "What improvements would you like to see?",
      type: "text",
      required: false
    },
    {
      id: 5,
      question: "How satisfied are you with the app's performance?",
      type: "rating",
      scale: "1-5",
      required: true
    }
  ]
}

export function SentimentTab({ app }: SentimentTabProps) {
  const { toast } = useToast();
  const [openSurveyDialog, setOpenSurveyDialog] = useState(false);
  const [surveyFrequency, setSurveyFrequency] = useState("quarterly");
  const [surveyDate, setSurveyDate] = useState<Date | undefined>(new Date());
  const [showSurveyQuestionsDialog, setShowSurveyQuestionsDialog] = useState(false);
  
  const handleExportCSV = () => {
    toast({
      title: "CSV Export Started",
      description: "Your sentiment data is being exported to CSV",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">User Sentiment</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowSurveyQuestionsDialog(true)}>
            <Eye className="h-4 w-4 mr-2" />
            View Survey Questions
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export to CSV
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => setOpenSurveyDialog(true)}
          >
            Manage Survey
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Net Promoter Score</h3>
                <Badge variant={mockSentimentData.netPromoterScore > 0 ? "success" : "destructive"}>
                  {mockSentimentData.netPromoterScore}
                </Badge>
              </div>
              
              <div className="relative h-16 overflow-hidden rounded-full">
                <div className="absolute inset-0 flex">
                  <div className="bg-red-500 h-full flex-grow" style={{ flex: mockSentimentData.breakdown.detractors.percentage }}></div>
                  <div className="bg-gray-300 h-full flex-grow" style={{ flex: mockSentimentData.breakdown.passives.percentage }}></div>
                  <div className="bg-green-500 h-full flex-grow" style={{ flex: mockSentimentData.breakdown.promoters.percentage }}></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white drop-shadow-md">{mockSentimentData.netPromoterScore}</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground text-center">
                Net Promoter Score<br />
                Based on {mockSentimentData.respondents} responses
              </p>

              <div className="flex justify-between gap-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span>Detractors {mockSentimentData.breakdown.detractors.count} ({mockSentimentData.breakdown.detractors.percentage}%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
                  <span>Passives {mockSentimentData.breakdown.passives.count} ({mockSentimentData.breakdown.passives.percentage}%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>Promoters {mockSentimentData.breakdown.promoters.count} ({mockSentimentData.breakdown.promoters.percentage}%)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Product Criticality</h3>
                <div className="text-2xl font-bold">{mockSentimentData.criticality}%</div>
              </div>
              
              <div className="relative h-32 w-32 mx-auto">
                <div className="absolute inset-0 rounded-full border-8 border-gray-100"></div>
                <div 
                  className="absolute inset-0 rounded-full border-8 border-blue-500" 
                  style={{ 
                    clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(mockSentimentData.criticality * 0.01 * 2 * Math.PI)}% ${50 - 50 * Math.sin(mockSentimentData.criticality * 0.01 * 2 * Math.PI)}%, ${mockSentimentData.criticality > 75 ? '100% 0, 100% 50%' : ''})` 
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{mockSentimentData.criticality}%</span>
                </div>
              </div>
              
              <p className="text-center text-sm text-muted-foreground">
                Consider this product<br />critical to their work
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Rating Distribution</h3>
          <div className="space-y-2">
            {mockSentimentData.ratingDistribution.map(item => (
              <div key={item.rating} className="flex items-center gap-2">
                <div className="w-8 text-right">{item.rating}</div>
                <Progress value={item.percentage} className="h-6" />
                <div className="w-8 text-left">{item.percentage}%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Reviews ({mockSentimentData.reviews.length})</h3>
          <div className="space-y-6">
            {mockSentimentData.reviews.map(review => (
              <div key={review.id} className="flex gap-4 pb-4 border-b last:border-b-0 last:pb-0">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.avatar} />
                  <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div className="font-medium">{review.name}</div>
                    <div className="text-sm text-muted-foreground">{review.date}</div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <div className="text-sm text-muted-foreground">
                      {review.comment || "Comment not added"}
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={review.critical ? "destructive" : "secondary"}>
                        {review.critical ? "Critical" : "Not Critical"}
                      </Badge>
                      <Badge variant="outline" className="flex items-center">
                        <Star className="h-3 w-3 mr-1 fill-yellow-400 stroke-yellow-400" />
                        Rating: {review.rating}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Survey Questions Dialog - FIXED to properly display content */}
      <Dialog open={showSurveyQuestionsDialog} onOpenChange={setShowSurveyQuestionsDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{app.name} Survey Questions</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="current" className="w-full">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="current" className="flex-1">Current Questions</TabsTrigger>
              <TabsTrigger value="edit" className="flex-1">Edit Questions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="current">
              <div className="space-y-4">
                {mockSentimentData.surveyQuestions.map((q, index) => (
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
                {mockSentimentData.surveyQuestions.map((q, index) => (
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
            <Button variant="outline" onClick={() => setShowSurveyQuestionsDialog(false)}>
              Close
            </Button>
            <Button onClick={() => {
              setShowSurveyQuestionsDialog(false);
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

      {/* Manage Survey Dialog */}
      <Dialog open={openSurveyDialog} onOpenChange={setOpenSurveyDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Manage User Survey</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="frequency" className="col-span-1">
                Frequency
              </Label>
              <div className="col-span-3">
                <Select 
                  value={surveyFrequency} 
                  onValueChange={setSurveyFrequency}
                >
                  <SelectTrigger id="frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="biannually">Bi-annually</SelectItem>
                    <SelectItem value="annually">Annually</SelectItem>
                    <SelectItem value="oneTime">One-time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="col-span-1">Start Date</Label>
              <Popover>
                <PopoverTrigger asChild className="col-span-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {surveyDate ? format(surveyDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={surveyDate}
                    onSelect={setSurveyDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="recipients" className="col-span-1">
                Recipients
              </Label>
              <Input
                id="recipients"
                defaultValue="All active users"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenSurveyDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => {
                setOpenSurveyDialog(false);
                toast({
                  title: "Survey settings saved",
                  description: `Survey will be sent ${surveyFrequency} starting ${surveyDate ? format(surveyDate, "PPP") : "today"}`,
                });
              }}
            >
              Save Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
