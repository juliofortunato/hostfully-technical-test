import { Button } from "@/_components/ui/button";
import { Card, CardContent } from "@/_components/ui/card";
import { Separator } from "@/_components/ui/separator";

interface Booking {
  id: string;
  property: string;
  startDate: string;
  endDate: string;
}

interface BookingProps {
  booking: Booking;
}

export default function BookingCard({
  booking: { id, property, startDate, endDate },
}: BookingProps) {
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
          <p className="font-semibold">{startDate}</p>
        </div>
        <Separator
          className="h-[100%] border-gray-200 dark:border-gray-800"
          orientation="vertical"
        />
        <div className="grid gap-1 text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400">End date:</p>
          <p className="font-semibold">{endDate}</p>
        </div>
        <Separator
          className="h-[100%] border-gray-200 dark:border-gray-800"
          orientation="vertical"
        />
        <div className="flex items-center gap-2">
          <Button className="h-8" size="sm" variant="outline">
            Edit
          </Button>
          <Button className="h-8" size="sm" variant="destructive">
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
