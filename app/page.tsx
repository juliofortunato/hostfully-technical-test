import BookingList from "@/components/booking-list";

export default function Home() {
  return (
    <div className="min-h-screen p-4 xl:p-6">
      <div className="grid gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          Manage your bookings
        </h1>
        <BookingList />
      </div>
    </div>
  );
}
