
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ShadowITTablePlaceholderProps {
  loading: boolean;
}

export function ShadowITTablePlaceholder({ loading }: ShadowITTablePlaceholderProps) {
  const message = loading 
    ? "Loading Shadow IT data..." 
    : "No Shadow IT applications found";
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-center items-center h-40">
          <p className="text-muted-foreground">{message}</p>
        </div>
      </CardContent>
    </Card>
  );
}
