
export type Holiday = {
  id: string;
  date: Date;
  name: string;
  type: 'religious' | 'national' | 'observance';
  color?: string;
};

// Mock holidays data for 2025
export const holidays2025: Holiday[] = [
  {
    id: '1',
    date: new Date(2025, 3, 1), // April 1, 2025
    name: 'April Fool\'s Day',
    type: 'observance',
  },
  {
    id: '2',
    date: new Date(2025, 2, 30), // March 30, 2025
    name: 'Eid ul-Fitr',
    type: 'religious',
    color: 'bg-purple-100 dark:bg-purple-900/30',
  },
  {
    id: '3',
    date: new Date(2025, 2, 30), // March 30, 2025
    name: 'Ugadi / Chaitra Sukladi',
    type: 'religious',
    color: 'bg-purple-100 dark:bg-purple-900/30',
  },
  {
    id: '4',
    date: new Date(2025, 3, 6), // April 6, 2025
    name: 'Ram Navami',
    type: 'religious',
    color: 'bg-purple-100 dark:bg-purple-900/30',
  },
  {
    id: '5',
    date: new Date(2025, 3, 10), // April 10, 2025
    name: 'Mahavir Jayanti',
    type: 'religious',
    color: 'bg-purple-100 dark:bg-purple-900/30',
  },
  {
    id: '6',
    date: new Date(2025, 3, 14), // April 14, 2025
    name: 'Vishu / Vaisakhi',
    type: 'religious',
    color: 'bg-purple-100 dark:bg-purple-900/30',
  },
  {
    id: '7',
    date: new Date(2025, 3, 15), // April 15, 2025
    name: 'Vaisakhi / Baisakhi',
    type: 'religious',
    color: 'bg-purple-100 dark:bg-purple-900/30',
  },
  {
    id: '8',
    date: new Date(2025, 3, 18), // April 18, 2025
    name: 'Good Friday',
    type: 'religious',
    color: 'bg-purple-100 dark:bg-purple-900/30',
  },
  {
    id: '9',
    date: new Date(2025, 3, 20), // April 20, 2025
    name: 'Easter',
    type: 'religious',
    color: 'bg-purple-100 dark:bg-purple-900/30',
  },
  {
    id: '10',
    date: new Date(2025, 4, 9), // May 9, 2025
    name: 'Rabindranath Tagore Jayanti',
    type: 'observance',
    color: 'bg-purple-100 dark:bg-purple-900/30',
  },
];

// Function to get holidays for a specific month
export function getHolidaysForMonth(month: Date): Holiday[] {
  return holidays2025.filter(
    (holiday) => 
      holiday.date.getMonth() === month.getMonth() || 
      // Include holidays from previous and next month that might appear in the calendar view
      (holiday.date.getMonth() === month.getMonth() - 1 && holiday.date.getDate() >= 20) ||
      (holiday.date.getMonth() === month.getMonth() + 1 && holiday.date.getDate() <= 10)
  );
}

// Function to get holidays for a specific date
export function getHolidaysForDate(date: Date): Holiday[] {
  return holidays2025.filter(
    (holiday) => 
      holiday.date.getDate() === date.getDate() && 
      holiday.date.getMonth() === date.getMonth() &&
      holiday.date.getFullYear() === date.getFullYear()
  );
}
