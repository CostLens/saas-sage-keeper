
import React from "react";
import { 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { ShadowITData } from "@/hooks/useShadowITData";
import { ShadowITRiskBadge } from "../ShadowITRiskBadge";

interface ShadowITDialogHeaderProps {
  app: ShadowITData;
}

export function ShadowITDialogHeader({ app }: ShadowITDialogHeaderProps) {
  return (
    <DialogHeader>
      <DialogTitle className="flex items-center gap-2">
        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
          {app.name.charAt(0)}
        </div>
        {app.name}
        <span className="ml-2">
          <ShadowITRiskBadge riskLevel={app.riskLevel} />
        </span>
      </DialogTitle>
      <DialogDescription>
        {app.description}
      </DialogDescription>
    </DialogHeader>
  );
}
