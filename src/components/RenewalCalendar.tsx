
import React from "react";
import { SaaSData } from "@/lib/mockData";
import { Card } from "@/components/ui/card";
import { 
  getUpcomingRenewals,
  getUpcomingPayments,
  getUpcomingTerminations
} from "./calendar/utils";

interface RenewalCalendarProps {
  saasData: SaaSData[];
}

// This component is kept only for compatibility, but is not currently used on the dashboard
export function RenewalCalendar({ saasData }: RenewalCalendarProps) {
  return (
    <Card className="p-4">
      <div className="text-center text-sm text-muted-foreground">
        This component has been replaced by direct implementation in the Dashboard.
      </div>
    </Card>
  );
}
