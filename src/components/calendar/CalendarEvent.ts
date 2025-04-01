
import { EventType } from './EventType';

export interface CalendarEvent {
  type: EventType;
  date: Date;
  title: string;
  description?: string;
}
