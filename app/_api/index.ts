import { Booking } from "@/_types/booking";

// This info could be fetched from an API or such
export const BOOKINGS: Booking[] = [
  {
    id: crypto.randomUUID(),
    property: "Cozy Cabin in the Woods",
    startDate: new Date("June 12, 2024"),
    endDate: new Date("June 15, 2024"),
  },
  {
    id: crypto.randomUUID(),
    property: "Beachfront Paradise",
    startDate: new Date("July 5, 2024"),
    endDate: new Date("July 12, 2024"),
  },
  {
    id: crypto.randomUUID(),
    property: "Mountain Hideaway",
    startDate: new Date("August 20, 2024"),
    endDate: new Date("August 25, 2024"),
  },
];
