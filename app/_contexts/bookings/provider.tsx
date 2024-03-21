"use client";

import { Booking } from "@/_types/booking";
import { useState } from "react";
import { BookingsContext } from "./context";
import { BookingsContextClientProviderProps } from "./interfaces";

export default function BookingsContextClientProvider({
  children,
}: BookingsContextClientProviderProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  return (
    <BookingsContext.Provider value={{ bookings }}>
      {children}
    </BookingsContext.Provider>
  );
}
