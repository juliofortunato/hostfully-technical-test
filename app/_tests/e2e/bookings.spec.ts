import { Page, expect, test } from "@playwright/test";
import { format } from "date-fns";

async function createBooking(
  page: Page,
  startDay: string,
  endDay: string,
  property: string
) {
  // Click the 'New booking' button
  await page.getByRole("button", { name: "New booking" }).click();

  // Select a property
  await page.getByLabel("Property").click();
  await page.getByLabel(property).click();

  // Select the start date
  await page.getByLabel("Start date").click();
  await page.getByText(startDay, { exact: true }).first().click();
  await page.getByLabel("Start date").click();

  // Select the end date
  await page.getByLabel("End date").click();
  await page.getByText(endDay, { exact: true }).first().click();
  await page.getByLabel("End date").click();

  // Submit the form
  await page.getByRole("button", { name: "Submit" }).click();
}

test("create new booking", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Create a new booking
  await createBooking(page, "10", "15", "Beachfront Paradise");

  // New booking must be visible
  await expect(
    page.getByRole("heading", { name: "Beachfront Paradise" })
  ).toHaveCount(2);
});

test("create new booking - overlapping date", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Create a new booking
  await createBooking(page, "10", "15", "Beachfront Paradise");

  // Create another booking with overlapping dates
  await createBooking(page, "12", "14", "Beachfront Paradise");

  // Overlapping dates error must be bisible
  await expect(
    page.getByRole("heading", { name: /Overlapping dates/i })
  ).toBeVisible();
});

test("edit a booking", async ({ page }) => {
  const currentYear = format(new Date(), "yyyy");
  const currentMonth = format(new Date(), "MMMM");

  await page.goto("http://localhost:3000/");

  // Click to edit a booking
  await page.getByRole("button", { name: "Edit" }).first().click();

  // Change its property
  await page.getByLabel("Property").click();
  await page.getByLabel("Mountain Hideaway").click();

  // Change its start date
  await page.getByLabel("Start date").click();
  await page.getByText("5", { exact: true }).first().click();
  await page.getByLabel("Start date").click();

  // Change its end date
  await page.getByLabel("End date").click();
  await page.getByText("7", { exact: true }).first().click();
  await page.getByLabel("End date").click();

  // Submit the form
  await page.getByRole("button", { name: "Submit" }).click();

  // The updated data must be visible
  await expect(
    page.getByRole("heading", { name: /Mountain Hideaway/i }).first()
  ).toBeVisible();
  await expect(
    await page.getByText(`${currentMonth} 05, ${currentYear}`).first()
  ).toBeVisible();
  await expect(
    await page.getByText(`${currentMonth} 07, ${currentYear}`).first()
  ).toBeVisible();
});

test("delete a booking", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Click to delete a booking
  await page.getByRole("button", { name: "Delete" }).first().click();

  // Confirm deletion on modal
  await page.getByRole("button", { name: "Delete booking" }).click();

  // Delete booking should not be visible
  await expect(
    page.getByRole("heading", { name: /Cozy Cabin in the Woods/i }).first()
  ).not.toBeVisible();
});
