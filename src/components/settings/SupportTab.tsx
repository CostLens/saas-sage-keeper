
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle, MessageSquare, Star, Send } from "lucide-react";
import { toast } from "sonner";

export function SupportTab() {
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");

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
    <Card>
      <CardHeader>
        <CardTitle>Support</CardTitle>
        <CardDescription>
          Get help and support
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium">Documentation</h4>
          <p className="text-sm text-muted-foreground">
            View our documentation to learn more about our features
          </p>
          <Button variant="outline" className="gap-2">
            <HelpCircle className="h-4 w-4" />
            View Documentation
          </Button>
        </div>
        <Separator />
        <div className="space-y-2">
          <h4 className="font-medium">Community Forum</h4>
          <p className="text-sm text-muted-foreground">
            Join our community forum to discuss features and get help
          </p>
          <Button variant="outline" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Community Forum
          </Button>
        </div>
        <Separator />
        <div className="space-y-4">
          <h4 className="font-medium">Rate and Provide Feedback</h4>
          <p className="text-sm text-muted-foreground">
            Your feedback helps us improve our product
          </p>
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
      </CardContent>
    </Card>
  );
}
