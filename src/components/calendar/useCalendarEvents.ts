
import { useState, useMemo } from "react";
import { format, isSameDay, addDays, addWeeks, addMonths } from "date-fns";
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
  
  // Generate additional mock renewal events
  const additionalRenewals: CalendarEvent[] = [
    {
      type: 'renewal',
      date: addDays(new Date(), 7),
      title: 'Adobe Creative Cloud renewal',
      description: 'Annual subscription renewal - $14,900'
    },
    {
      type: 'renewal',
      date: addDays(new Date(), 15),
      title: 'Microsoft 365 renewal',
      description: 'Annual subscription renewal - $22,500'
    },
    {
      type: 'renewal',
      date: addDays(new Date(), 30),
      title: 'Jira renewal',
      description: 'Annual subscription renewal - $8,750'
    }
  ];
  
  // Generate additional mock payment events
  const additionalPayments: CalendarEvent[] = [
    {
      type: 'payment',
      date: addDays(new Date(), 5),
      title: 'Slack payment',
      description: '$3,200 monthly payment due'
    },
    {
      type: 'payment',
      date: addDays(new Date(), 12),
      title: 'AWS payment',
      description: '$7,850 monthly payment due'
    },
    {
      type: 'payment',
      date: addDays(new Date(), 25),
      title: 'Zoom payment',
      description: '$1,500 monthly payment due'
    }
  ];
  
  // Generate additional mock termination events
  const additionalTerminations: CalendarEvent[] = [
    {
      type: 'termination',
      date: addDays(new Date(), 10),
      title: 'Dropbox termination deadline',
      description: 'Last day to cancel without renewal'
    },
    {
      type: 'termination',
      date: addDays(new Date(), 21),
      title: 'Trello termination deadline',
      description: 'Last day to cancel without renewal'
    },
    {
      type: 'termination',
      date: addWeeks(new Date(), 6),
      title: 'Notion termination deadline',
      description: 'Last day to cancel without renewal'
    }
  ];
  
  // Generate mock meeting events
  const meetingEvents: CalendarEvent[] = [
    {
      type: 'meeting',
      date: addDays(new Date(), 2),
      title: 'SaaS Vendor Review',
      description: 'Quarterly review with Salesforce team'
    },
    {
      type: 'meeting',
      date: addDays(new Date(), 5),
      title: 'Contract Negotiation',
      description: 'Discussing renewal terms with HubSpot'
    },
    {
      type: 'meeting',
      date: addDays(new Date(), 8),
      title: 'Budget Planning',
      description: 'SaaS expenditure planning for Q3'
    }
  ];
  
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
        description: `$${item.lastPayment.amount.toLocaleString()} payment due for ${item.name}`
      };
    }).filter(Boolean) as CalendarEvent[],
    ...terminationsData.map(item => ({
      type: 'termination' as const,
      date: new Date(item.contract.cancellationDeadline),
      title: `${item.name} termination deadline`,
      description: `Cancellation deadline for ${item.name}`
    })),
    ...additionalRenewals,
    ...additionalPayments,
    ...additionalTerminations,
    ...meetingEvents
  ], [renewals, paymentsData, terminationsData, additionalRenewals, additionalPayments, additionalTerminations, meetingEvents]);
  
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
