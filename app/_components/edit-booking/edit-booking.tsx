import { Button } from "@/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/_components/ui/sheet";
import { useBookings } from "@/_contexts/bookings/useBookings";
import { Booking } from "@/_types/booking";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import BookingForm, {
  formSchema as BookingFormSchema,
} from "../booking-form/booking-form";

interface EditBookingProps {
  booking: Booking;
}

export default function EditBooking({ booking }: EditBookingProps) {
  const { updateBooking } = useBookings();
  const [sheetIsOpen, setSheetIsOpen] = useState<boolean>(false);

  function onSubmit(formValues: z.infer<typeof BookingFormSchema>) {
    updateBooking?.(booking.id, formValues);
    setSheetIsOpen(false);
    toast.success("Booking update successfully", {
      cancel: {
        label: "Dismiss",
        onClick: () => {},
      },
    });
  }

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button className="h-8" size="sm" variant="outline">
          Edit
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit booking</SheetTitle>
          <SheetDescription>Update an existing booking</SheetDescription>
        </SheetHeader>
        <BookingForm onSubmit={onSubmit} initialValues={booking} />
      </SheetContent>
    </Sheet>
  );
}
