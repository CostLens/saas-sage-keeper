
export interface CalendarEvent {
  type: 'renewal' | 'payment' | 'termination';
  date: Date;
  title: string;
  description?: string;
}
