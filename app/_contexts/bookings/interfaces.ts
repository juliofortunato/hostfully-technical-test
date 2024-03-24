import { BookingFormSchema } from "@/_components/booking-form/booking-form";
import { Booking } from "@/_types/booking";
import { ReactNode } from "react";

export interface BookingsContextData {
  bookings: Booking[];
  addBooking: ((booking: Booking) => void) | null;
  deleteBooking: ((bookingId: string) => void) | null;
  updateBooking:
    | ((bookingId: string, formValues: BookingFormSchema) => void)
    | null;
}

export interface BookingsContextProviderProps {
  children: ReactNode;
}
