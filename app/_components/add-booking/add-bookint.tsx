import { Button } from "@/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/_components/ui/sheet";
import BookingForm from "../booking-form/booking-form";

export default function AddBooking() {
  return (
    <Sheet>
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
        <BookingForm />
      </SheetContent>
    </Sheet>
  );
}
