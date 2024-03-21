import { Booking } from "@/_types/booking";
import { isAfter, isWithinInterval } from "date-fns";

export function validateBooking(
  property: string,
  startDate: Date,
  endDate: Date,
  bookings: Booking[]
) {
  // Check if start date if before end date
  if (isAfter(startDate, endDate)) {
    return "End date must be after start date.";
  }

  // Check for overlapping bookings for the selected property
  const overlapping = bookings.some(
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
    return "The selected dates overlap with an existing booking for this property.";
  }

  // If everything is valid, return true
  return true;
}
