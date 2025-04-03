
import React from "react";
import { AppDiscoveryData } from "@/hooks/useAppDiscoveryData";
import { DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface DialogHeaderProps {
  app: AppDiscoveryData;
}

export function DialogHeader({ app }: DialogHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
          <span className="font-medium text-xl text-primary">{app.name.substring(0, 2).toUpperCase()}</span>
        </div>
        <div>
          <DialogTitle className="text-xl">{app.name}</DialogTitle>
          <DialogDescription>{app.category}</DialogDescription>
        </div>
      </div>
      <DialogClose asChild>
        <Button variant="ghost" size="icon">
          <X className="h-4 w-4" />
        </Button>
      </DialogClose>
    </div>
  );
}
