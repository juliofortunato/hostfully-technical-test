import { BookingsContext } from "@/_contexts/bookings/context";
import BookingsContextProvider from "@/_contexts/bookings/provider";
import { Booking } from "@/_types/booking";
import "@testing-library/jest-dom";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { addDays } from "date-fns";

function TestingComponent() {
  const booking1: Booking = {
    id: "1",
    property: "Property 1",
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
  };

  return (
    <BookingsContextProvider>
      <BookingsContext.Consumer>
        {({ addBooking, updateBooking, deleteBooking, bookings }) => (
          <>
            <button onClick={() => addBooking?.(booking1)}>Add booking</button>
            {bookings.map((booking) => (
              <div key={booking.id}>
                {booking.property}
                <button
                  onClick={() =>
                    updateBooking?.(booking.id, {
                      ...booking,
                      property: "Property 2",
                    })
                  }
                >
                  Edit booking {booking.id}
                </button>
                <button onClick={() => deleteBooking?.(booking.id)}>
                  Delete booking {booking.id}
                </button>
              </div>
            ))}
          </>
        )}
      </BookingsContext.Consumer>
    </BookingsContextProvider>
  );
}

describe("BookingsContextProvider", () => {
  afterEach(cleanup);

  test("addBooking", async () => {
    const { getByRole, getByText } = render(<TestingComponent />);

    fireEvent.click(getByRole("button", { name: "Add booking" }));

    await waitFor(() => expect(getByText("Property 1")).toBeInTheDocument());
  });

  test("updateBooking", async () => {
    const { getByRole, getByText } = render(<TestingComponent />);

    fireEvent.click(getByRole("button", { name: "Add booking" }));
    fireEvent.click(getByRole("button", { name: "Edit booking 1" }));

    await waitFor(() => expect(getByText("Property 2")).toBeInTheDocument());
  });

  test("deleteBooking", async () => {
    const { getByRole, getByText, queryByText } = render(<TestingComponent />);

    fireEvent.click(getByRole("button", { name: "Add booking" }));

    await waitFor(() => expect(getByText("Property 1")).toBeInTheDocument());

    fireEvent.click(getByRole("button", { name: "Delete booking 1" }));

    await waitFor(() =>
      expect(queryByText("Property 1")).not.toBeInTheDocument()
    );
  });
});
