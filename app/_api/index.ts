import { Booking } from "@/_types/booking";

// This info could be fetched from an API or such
export const PROPERTIES: string[] = [
  "Cozy Cabin in the Woods",
  "Beachfront Paradise",
  "Mountain Hideaway",
];

export const BOOKINGS: Booking[] = [
  {
    id: crypto.randomUUID(),
    property: PROPERTIES[0],
    startDate: new Date("June 12, 2024"),
    endDate: new Date("June 15, 2024"),
  },
  {
    id: crypto.randomUUID(),
    property: PROPERTIES[1],
    startDate: new Date("July 5, 2024"),
    endDate: new Date("July 12, 2024"),
  },
  {
    id: crypto.randomUUID(),
    property: PROPERTIES[2],
    startDate: new Date("August 20, 2024"),
    endDate: new Date("August 25, 2024"),
  },
];
