import { Booking } from "@/_types/booking";
import { ReactNode } from "react";

export interface BookingsContextData {
  bookings: Booking[];
}

export interface BookingsContextClientProviderProps {
  children: ReactNode;
}
