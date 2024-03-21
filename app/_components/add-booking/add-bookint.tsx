"use client";

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
import { z } from "zod";
import BookingForm, { formSchema } from "../booking-form/booking-form";

export default function AddBooking() {
  const { addBooking } = useBookings();
  const [sheetIsOpen, setSheetIsOpen] = useState<boolean>(false);

  function onSubmit(formValues: z.infer<typeof formSchema>) {
    const newBooking: Booking = {
      id: crypto.randomUUID(),
      ...formValues,
    };

    addBooking?.(newBooking);
    setSheetIsOpen(false);
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
