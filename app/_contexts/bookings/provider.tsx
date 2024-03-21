"use client";

import { BOOKINGS } from "@/_api";
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

  return (
    <BookingsContext.Provider value={{ bookings, addBooking, deleteBooking }}>
      {children}
    </BookingsContext.Provider>
  );
}
