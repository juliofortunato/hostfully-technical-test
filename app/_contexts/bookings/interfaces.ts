import { Booking } from "@/_types/booking";
import { ReactNode } from "react";

export interface BookingsContextData {
  bookings: Booking[];
  addBooking: ((booking: Booking) => void) | null;
  deleteBooking: ((bookingId: string) => void) | null;
}

export interface BookingsContextClientProviderProps {
  children: ReactNode;
}
