
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Review {
  id: number;
  name: string;
  avatar: string;
  date: string;
  rating: number;
  comment: string;
  critical: boolean;
}

interface ReviewsProps {
  reviews: Review[];
}

export function Reviews({ reviews }: ReviewsProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-semibold mb-4">Reviews ({reviews.length})</h3>
        <div className="space-y-6">
          {reviews.map(review => (
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
  );
}
