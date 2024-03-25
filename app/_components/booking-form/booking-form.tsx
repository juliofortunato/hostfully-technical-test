import { PROPERTIES } from "@/_api";
import { Calendar } from "@/_components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/_components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/_components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";
import { useBookings } from "@/_contexts/bookings/useBookings";
import { cn } from "@/_lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format, isBefore } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { validateBooking } from "./validate-booking";

export const bookingFormSchema = z
  .object({
    property: z
      .string()
      .min(1, { message: "Please select a property to book" }),
    startDate: z.date({ required_error: "Please select the start date" }),
    endDate: z.date({ required_error: "Please select the end date" }),
  })
  .refine((schema) => isBefore(schema.startDate, schema.endDate), {
    message: "The end date must be after the start date",
    path: ["endDate"],
  });

export type BookingFormSchema = z.infer<typeof bookingFormSchema>;

interface BookingFormProps {
  onSubmit: (values: BookingFormSchema) => void;
  initialValues?: BookingFormSchema;
}

export default function BookingForm({
  onSubmit,
  initialValues,
}: BookingFormProps) {
  const { bookings } = useBookings();
  const [showOverlapModal, setShowOverlapModal] = useState<boolean>(false);
  const defaultValues: BookingFormSchema = {
    property: initialValues?.property || "",
    startDate: initialValues?.startDate || new Date(),
    endDate: initialValues?.endDate || addDays(new Date(), 1),
  };

  const form = useForm<BookingFormSchema>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues,
  });

  function handleSubmitWithValidation(formValues: BookingFormSchema) {
    const isBookingValid = validateBooking(formValues, bookings);

    return isBookingValid ? onSubmit(formValues) : setShowOverlapModal(true);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitWithValidation)}
          className="mt-6 space-y-8"
        >
          <FormField
            control={form.control}
            name="property"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a property to book" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PROPERTIES.map((property, idx) => (
                      <SelectItem key={idx} value={property}>
                        {property}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  The property that is being booked for.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  The starting date for the booking.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  The ending date for the booking.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>

      <AlertDialog open={showOverlapModal} onOpenChange={setShowOverlapModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>⚠️ Overlapping dates</AlertDialogTitle>
            <AlertDialogDescription>
              The selected dates overlap with an existing booking for this
              property. Please select different ones.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>OK</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
