import BookingCard from "@/_components/booking-card";

const BOOKINGS_MOCK = [
  {
    id: crypto.randomUUID(),
    property: "Cozy Cabin in the Woods",
    startDate: "June 12, 2024",
    endDate: "June 15, 2024",
  },
  {
    id: crypto.randomUUID(),
    property: "Beachfront Paradise",
    startDate: "July 5, 2024",
    endDate: "July 12, 2024",
  },
  {
    id: crypto.randomUUID(),
    property: "Mountain Hideaway",
    startDate: "August 20, 2024",
    endDate: "August 25, 2024",
  },
];

export default function BookingList() {
  return (
    <div className="grid gap-4">
      {BOOKINGS_MOCK.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
}
