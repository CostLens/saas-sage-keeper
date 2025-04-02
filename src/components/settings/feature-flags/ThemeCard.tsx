
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "./ThemeToggle";

interface ThemeCardProps {
  darkThemeEnabled: boolean;
  onThemeToggle: (enabled: boolean) => void;
}

export function ThemeCard({ darkThemeEnabled, onThemeToggle }: ThemeCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Settings</CardTitle>
        <CardDescription>
          Customize the appearance of the application
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ThemeToggle 
          darkThemeEnabled={darkThemeEnabled}
          onToggle={onThemeToggle}
        />
      </CardContent>
    </Card>
  );
}
