import EditBooking from "@/_components/edit-booking";
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
} from "@/_components/ui/alert-dialog";
import { Button } from "@/_components/ui/button";
import { Card, CardContent } from "@/_components/ui/card";
import { useBookings } from "@/_contexts/bookings/useBookings";
import { Booking } from "@/_types/booking";
import { format } from "date-fns";
import { toast } from "sonner";

interface BookingProps {
  booking: Booking;
}

export default function BookingCard({ booking }: BookingProps) {
  const { id, property, startDate, endDate } = booking;
  const { deleteBooking } = useBookings();
  const dateFormatStr = "MMMM dd, yyyy";
  const formattedStartDate = format(startDate, dateFormatStr);
  const formattedEndDate = format(endDate, dateFormatStr);

  function handleDelete() {
    deleteBooking?.(id);
    toast("The booking has been deleted", {
      cancel: {
        label: "Dismiss",
        onClick: () => {},
      },
    });
  }

  return (
    <Card key={id} className="w-full">
      <CardContent className="grid grid-cols-2 grid-rows-3 lg:grid-cols-4 lg:grid-rows-1 gap-4 ">
        <div className="col-span-2 lg:col-span-1 grid gap-1 lg:min-w-max">
          <h3 className="font-bold">{property}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ID: <span className="font-semibold">{id}</span>
          </p>
        </div>
        <div className="row-start-2 lg:row-start-1 lg:col-start-2 grid gap-1 lg:text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Start date:
          </p>
          <p className="font-semibold">{formattedStartDate}</p>
        </div>
        <div className="row-start-2 lg:row-start-1 lg:col-start-3 grid gap-1 text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400">End date:</p>
          <p className="font-semibold">{formattedEndDate}</p>
        </div>
        <div className="col-span-2 lg:col-span-1 flex items-center gap-2 justify-end">
          <EditBooking booking={booking} />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="h-8" size="sm" variant="destructive">
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete booking</AlertDialogTitle>
                <AlertDialogDescription>
                  <span>Are you sure you want to delete this booking?</span>
                  <span className="block">
                    Please note that this action can not be reverted.
                  </span>
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
