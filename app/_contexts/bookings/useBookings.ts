import { useContext } from "react";
import { BookingsContext } from "./context";

export function useBookings() {
  return useContext(BookingsContext);
}
