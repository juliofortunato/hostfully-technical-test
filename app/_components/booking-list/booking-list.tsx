"use client";

import BookingCard from "@/_components/booking-card";
import { useBookings } from "@/_contexts/bookings/useBookings";

export default function BookingList() {
  const { bookings } = useBookings();

  return (
    <div className="grid gap-4">
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))
      ) : (
        <p className="mt-6 text-center text-slate-700">
          No bookings were found
        </p>
      )}
    </div>
  );
}
