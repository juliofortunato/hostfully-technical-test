"use client";

import BookingForm, {
  formSchema as BookingFormSchema,
} from "@/_components/booking-form";
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

export default function AddBooking() {
  const { addBooking } = useBookings();
  const [sheetIsOpen, setSheetIsOpen] = useState<boolean>(false);

  function onSubmit(formValues: z.infer<typeof BookingFormSchema>) {
    const newBooking: Booking = {
      id: crypto.randomUUID(),
      ...formValues,
    };

    addBooking?.(newBooking);
    setSheetIsOpen(false);
    toast.success("Booking created successfully", {
      cancel: {
        label: "Dismiss",
        onClick: () => {},
      },
    });
  }

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button>New booking</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add a booking</SheetTitle>
          <SheetDescription>
            Create a new booking to a property
          </SheetDescription>
        </SheetHeader>
        <BookingForm onSubmit={onSubmit} />
      </SheetContent>
    </Sheet>
  );
}
