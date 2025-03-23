
import React from "react";
import { SaaSData } from "@/lib/mockData";
import { RenewalCard } from "./calendar/RenewalCard";
import { PaymentsCard } from "./calendar/PaymentsCard";
import { TerminationsCard } from "./calendar/TerminationsCard";
import { 
  getUpcomingRenewals,
  getUpcomingPayments,
  getUpcomingTerminations
} from "./calendar/utils";

interface RenewalCalendarProps {
  saasData: SaaSData[];
}

export function RenewalCalendar({ saasData }: RenewalCalendarProps) {
  // Get all the data we need for our cards
  const { renewals, upcomingRenewalAmount } = getUpcomingRenewals(saasData);
  const { paymentsData, paymentsAmount } = getUpcomingPayments(saasData);
  const { terminationsData } = getUpcomingTerminations(saasData);

  return (
    <div className="flex gap-4 w-full">
      {/* Renewals Card */}
      <RenewalCard 
        renewals={renewals}
        upcomingRenewalAmount={upcomingRenewalAmount}
      />

      {/* Payments Due Card */}
      <PaymentsCard 
        paymentsData={paymentsData} 
        paymentsAmount={paymentsAmount} 
      />

      {/* Termination Deadlines Card */}
      <TerminationsCard 
        terminationsData={terminationsData}
      />
    </div>
  );
}
