import { validateBooking } from "@/_components/booking-form/validate-booking"; // Replace 'your-module-name' with the actual module name
import { Booking } from "@/_types/booking";

describe("validateBooking function", () => {
  const mockAllBookings: Booking[] = [
    {
      id: "1",
      property: "TestProperty",
      startDate: new Date("2024-03-29"),
      endDate: new Date("2024-04-02"),
    },
    {
      id: "2",
      property: "TestProperty",
      startDate: new Date("2024-04-06"),
      endDate: new Date("2024-04-10"),
    },
  ];

  it("should return true if booking is valid", () => {
    const mockBooking: Booking = {
      id: "3",
      property: "TestProperty",
      startDate: new Date("2024-05-01"),
      endDate: new Date("2024-05-05"),
    };

    expect(validateBooking(mockBooking, mockAllBookings)).toBe(true);
  });

  it("should return false if start date is after end date", () => {
    const bookingWithInvalidDate: Booking = {
      id: "3",
      property: "TestProperty",
      startDate: new Date("2024-04-10"),
      endDate: new Date("2024-04-05"),
    };
    expect(validateBooking(bookingWithInvalidDate, mockAllBookings)).toBe(
      false
    );
  });

  it("should return false if there are overlapping bookings", () => {
    const bookingWithOverlap: Booking = {
      id: "3",
      property: "TestProperty",
      startDate: new Date("2024-04-02"),
      endDate: new Date("2024-04-06"),
    };
    expect(validateBooking(bookingWithOverlap, mockAllBookings)).toBe(false);
  });
});
