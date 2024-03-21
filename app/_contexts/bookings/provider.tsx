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

  return (
    <BookingsContext.Provider value={{ bookings }}>
      {children}
    </BookingsContext.Provider>
  );
}
