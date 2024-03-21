import { Button } from "@/_components/ui/button";
import { Card, CardContent } from "@/_components/ui/card";
import { Separator } from "@/_components/ui/separator";
import { useBookings } from "@/_contexts/bookings/useBookings";
import { Booking } from "@/_types/booking";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface BookingProps {
  booking: Booking;
}

export default function BookingCard({
  booking: { id, property, startDate, endDate },
}: BookingProps) {
  const { deleteBooking } = useBookings();
  const dateFormatStr = "MMMM dd, yyyy";
  const formattedStartDate = format(startDate, dateFormatStr);
  const formattedEndDate = format(endDate, dateFormatStr);

  function handleDelete() {
    deleteBooking?.(id);
  }

  return (
    <Card key={id} className="w-full">
      <CardContent className="flex items-center gap-4 justify-between">
        <div className="grid gap-1">
          <h2 className="font-bold">{property}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ID: <span className="font-semibold">{id}</span>
          </p>
        </div>
        <Separator
          className="h-[100%] border-gray-200 dark:border-gray-800"
          orientation="vertical"
        />
        <div className="grid gap-1 text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Start date:
          </p>
          <p className="font-semibold">{formattedStartDate}</p>
        </div>
        <Separator
          className="h-[100%] border-gray-200 dark:border-gray-800"
          orientation="vertical"
        />
        <div className="grid gap-1 text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400">End date:</p>
          <p className="font-semibold">{formattedEndDate}</p>
        </div>
        <Separator
          className="h-[100%] border-gray-200 dark:border-gray-800"
          orientation="vertical"
        />
        <div className="flex items-center gap-2">
          <Button className="h-8" size="sm" variant="outline">
            Edit
          </Button>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button className="h-8" size="sm" variant="destructive">
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete booking</AlertDialogTitle>
                <AlertDialogDescription>
                  <p>Are you sure you want to delete this booking?</p>
                  <p> This action can not be reverted.</p>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Go back</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="uppercase bg-destructive"
                >
                  Delete booking
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
