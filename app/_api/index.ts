import { Booking } from "@/_types/booking";

// This info could be fetched from an API or such
export const PROPERTIES: string[] = [
  "Cozy Cabin in the Woods",
  "Beachfront Paradise",
  "Mountain Hideaway",
];

export const BOOKINGS: Booking[] = [
  {
    id: "b8d0c17b-9222-45ae-ae3b-b0219c03e9f4",
    property: PROPERTIES[0],
    startDate: new Date("June 12, 2024"),
    endDate: new Date("June 15, 2024"),
  },
  {
    id: "604b92be-e0e4-435a-8159-21bdb53f7262",
    property: PROPERTIES[1],
    startDate: new Date("July 5, 2024"),
    endDate: new Date("July 12, 2024"),
  },
  {
    id: "22074719-42a6-4213-af16-f93e45c51da8",
    property: PROPERTIES[2],
    startDate: new Date("August 20, 2024"),
    endDate: new Date("August 25, 2024"),
  },
];
