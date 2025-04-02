
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "@/components/ui/toggle"; 
import { Label } from "@/components/ui/label";
import { Moon } from "lucide-react";

interface ThemeToggleProps {
  darkThemeEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export function ThemeToggle({ darkThemeEnabled, onToggle }: ThemeToggleProps) {
  return (
    <div className="flex items-center justify-between space-x-2">
      <div className="flex flex-col space-y-1">
        <Label htmlFor="dark-theme-toggle" className="font-medium">
          Dark Theme
        </Label>
        <p className="text-sm text-muted-foreground">
          Enable dark mode for the application
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Toggle
          pressed={darkThemeEnabled}
          onPressedChange={() => onToggle(!darkThemeEnabled)}
          className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
        >
          <Moon className="h-4 w-4" />
        </Toggle>
        <Switch
          id="dark-theme-toggle"
          checked={darkThemeEnabled}
          onCheckedChange={onToggle}
        />
      </div>
    </div>
  );
}
