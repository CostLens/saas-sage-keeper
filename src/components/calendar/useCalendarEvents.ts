
import { useState, useMemo } from "react";
import { format, isSameDay } from "date-fns";
import { mockSaaSData } from "@/lib/mockData";
import { 
  getUpcomingRenewals,
  getUpcomingPayments,
  getUpcomingTerminations
} from "./utils";
import { CalendarEvent } from "./CalendarEvent";

export function useCalendarEvents(date: Date | undefined) {
  // Get event data
  const { renewals } = getUpcomingRenewals(mockSaaSData);
  const { paymentsData } = getUpcomingPayments(mockSaaSData);
  const { terminationsData } = getUpcomingTerminations(mockSaaSData);
  
  // Construct calendar events from all data sources
  const allEvents: CalendarEvent[] = useMemo(() => [
    ...renewals.map(item => ({
      type: 'renewal' as const,
      date: item.renewalDateObj,
      title: `${item.name} renewal`,
      description: `Subscription renewal for ${item.name}`
    })),
    ...paymentsData.map(item => {
      if (!item.lastPayment?.date) return null;
      const nextPaymentDate = new Date(item.lastPayment.date);
      nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
      return {
        type: 'payment' as const,
        date: nextPaymentDate,
        title: `${item.name} payment`,
        description: `$${item.price} payment due for ${item.name}`
      };
    }).filter(Boolean) as CalendarEvent[],
    ...terminationsData.map(item => ({
      type: 'termination' as const,
      date: new Date(item.contract.cancellationDeadline),
      title: `${item.name} termination deadline`,
      description: `Cancellation deadline for ${item.name}`
    }))
  ], [renewals, paymentsData, terminationsData]);
  
  // Filter events for the selected date
  const selectedDateEvents = date 
    ? allEvents.filter(event => isSameDay(event.date, date)) 
    : [];
  
  // Create map of dates with events for the calendar
  const eventsByDate = useMemo(() => {
    const eventMap = new Map<string, CalendarEvent[]>();
    
    allEvents.forEach(event => {
      const key = format(event.date, 'yyyy-MM-dd');
      if (!eventMap.has(key)) {
        eventMap.set(key, []);
      }
      eventMap.get(key)!.push(event);
    });
    
    return eventMap;
  }, [allEvents]);
  
  return {
    allEvents,
    selectedDateEvents,
    eventsByDate
  };
}
