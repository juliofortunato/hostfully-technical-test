import { PROPERTIES } from "@/_api";
import { Button } from "@/_components/ui/button";
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
import { cn } from "@/_lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, isBefore } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const bookingFormSchema = z
  .object({
    property: z.string({ required_error: "Plase select a property to book" }),
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
  const form = useForm<BookingFormSchema>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: initialValues,
  });
  const {
    watch,
    formState: { isValid },
  } = form;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-8">
        <FormField
          control={form.control}
          name="property"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
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
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
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

        <Button type="submit" data-disabled={!isValid}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
