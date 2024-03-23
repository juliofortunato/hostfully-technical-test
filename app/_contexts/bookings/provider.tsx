"use client";

import { BOOKINGS } from "@/_api";
import { BookingFormSchema } from "@/_components/booking-form/booking-form";
import { Booking } from "@/_types/booking";
import { useState } from "react";
import { BookingsContext } from "./context";
import { BookingsContextClientProviderProps } from "./interfaces";

export default function BookingsContextClientProvider({
  children,
}: BookingsContextClientProviderProps) {
  const [bookings, setBookings] = useState<Booking[]>(BOOKINGS);

  function addBooking(booking: Booking) {
    setBookings([...bookings, booking]);
  }

  function deleteBooking(bookingId: string) {
    const newBookings = bookings.filter((booking) => booking.id !== bookingId);
    setBookings(newBookings);
  }

  function updateBooking(bookingId: string, formValues: BookingFormSchema) {
    setBookings(
      bookings.map((booking) => {
        if (booking.id === bookingId) {
          return {
            id: bookingId,
            property: formValues.property,
            startDate: formValues.startDate,
            endDate: formValues.endDate,
          };
        }

        return booking;
      })
    );
  }

  return (
    <BookingsContext.Provider
      value={{ bookings, addBooking, deleteBooking, updateBooking }}
    >
      {children}
    </BookingsContext.Provider>
  );
}
