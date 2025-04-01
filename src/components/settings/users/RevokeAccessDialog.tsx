
import React from "react";
import { User } from "./types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface RevokeAccessDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: () => void;
  onConfirm: () => void;
}

export function RevokeAccessDialog({ 
  user, 
  open, 
  onOpenChange, 
  onConfirm 
}: RevokeAccessDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Revoke user access</AlertDialogTitle>
          <AlertDialogDescription>
            This will immediately remove access for {user?.name}. They will no longer be able to log in or access any resources.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-destructive text-destructive-foreground">
            Revoke access
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
