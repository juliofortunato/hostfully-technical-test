import { Booking } from "@/_types/booking";
import { isAfter, isWithinInterval } from "date-fns";

export function validateBooking(
  booking: Pick<Booking, "property" | "startDate" | "endDate">,
  allBookings: Booking[]
) {
  const { property, startDate, endDate } = booking;

  // Check if start date if before end date
  if (isAfter(startDate, endDate)) {
    return false;
  }

  // Check for overlapping bookings for the selected property
  const overlapping = allBookings.some(
    (booking) =>
      booking.property === property &&
      (isWithinInterval(startDate, {
        start: booking.startDate,
        end: booking.endDate,
      }) ||
        isWithinInterval(endDate, {
          start: booking.startDate,
          end: booking.endDate,
        }) ||
        isWithinInterval(booking.startDate, {
          start: startDate,
          end: endDate,
        }) ||
        isWithinInterval(booking.endDate, { start: startDate, end: endDate }))
  );

  if (overlapping) {
    return false;
  }

  // If everything is valid, return true
  return true;
}
