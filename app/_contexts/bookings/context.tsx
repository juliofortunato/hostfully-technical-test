"use client";

import { createContext } from "react";
import { BookingsContextData } from "./interfaces";

export const BookingsContext = createContext<BookingsContextData>({
  bookings: [],
  addBooking: null,
  deleteBooking: null,
  updateBooking: null,
});
