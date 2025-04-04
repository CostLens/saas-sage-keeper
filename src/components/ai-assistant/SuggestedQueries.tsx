
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";

interface SuggestedQueriesProps {
  queries: string[];
  onQuerySelect: (query: string) => void;
}

export const SuggestedQueries = ({ queries, onQuerySelect }: SuggestedQueriesProps) => {
  return (
    <Card className="lg:col-span-1 h-fit">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
          Suggested Queries
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 overflow-hidden">
        {queries.map((prompt, index) => (
          <Button 
            key={index} 
            variant="outline" 
            className="w-full justify-start text-left h-auto py-2 text-wrap break-words whitespace-normal"
            onClick={() => onQuerySelect(prompt)}
          >
            {prompt}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};
