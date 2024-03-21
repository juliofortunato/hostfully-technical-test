import { formSchema as BookingFormSchema } from "@/_components/booking-form/booking-form";
import { Booking } from "@/_types/booking";
import { ReactNode } from "react";
import { z } from "zod";

export interface BookingsContextData {
  bookings: Booking[];
  addBooking: ((booking: Booking) => void) | null;
  deleteBooking: ((bookingId: string) => void) | null;
  updateBooking:
    | ((
        bookingId: string,
        formValues: z.infer<typeof BookingFormSchema>
      ) => void)
    | null;
}

export interface BookingsContextClientProviderProps {
  children: ReactNode;
}
