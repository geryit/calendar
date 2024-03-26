import React from "react";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import Calendar from "@/components/Calendar/Calendar";

describe("Calendar Component", () => {
  // Test case for ensuring correct rendering with a given weekly program and current date.
  it("renders correctly with given weekly program and current date", () => {
    // Setting a specific date for testing.
    const currentDateRaw = new Date(2024, 2, 14); // March 14, 2024

    // Mock data representing a weekly program.
    const weeklyProgram = {
      week1: [
        { weekday: "MONDAY", title: "activity1", completed: true }, // March 4
        { weekday: "WEDNESDAY", title: "activity2", completed: true }, // March 6
      ],
      week2: [
        { weekday: "MONDAY", title: "activity3", completed: true }, // March 11
        { weekday: "WEDNESDAY", title: "activity4", completed: false }, // March 13
      ],
    };

    // Rendering the Calendar component with the mock data.
    const { container } = render(
      <Calendar
        weeklyProgram={weeklyProgram}
        currentDateRaw={currentDateRaw}
      />,
    );

    // Finding the element representing the current day and performing checks.
    const currentDayElement = screen
      .getByText("14", { selector: "h2" })
      .closest("li");

    // Checking if the current day element has the expected background color.
    expect(currentDayElement).toHaveClass("completed-cell");

    // Additional checks within the current day element.
    if (currentDayElement) {
      // Ensuring the text color of the current day number is white.
      expect(
        within(currentDayElement).getByRole("heading", { level: 2 }),
      ).toHaveClass("current");

      // Verifying the presence of a specific activity on the current day.
      within(currentDayElement).getByText("activity4");
    }

    // Checking the number of completed activities based on text color.
    expect(container.getElementsByClassName("completed").length).toBe(3);

    // Ensuring the correct number of days in March.
    expect(container.getElementsByTagName("h2").length).toBe(31);

    // Checking the starting day of March and its alignment with weekdays.
    const firstDayOfMonthIndex = screen
      .getAllByRole("listitem")
      .findIndex((li) => li.textContent === "1");
    const fridayIndex = screen
      .getAllByRole("listitem")
      .findIndex((li) => li.textContent === "Fri");
    expect(firstDayOfMonthIndex % 7).toBe(fridayIndex % 7);

    // Verifying the number of empty cells for days not in the current month.
    expect(
      screen.getAllByRole("listitem").filter((li) => li.textContent === "")
        .length,
    ).toBe(4);
  });

  // Test case for checking the rendering of activities without moving incomplete ones.
  it("renders activities without moving incomplete ones when shouldMoveIncompleteActivitiesToPresent is false", () => {
    // Setting a specific date for this test case.
    const currentDateRaw = new Date(2024, 2, 14); // March 14, 2024

    // Mock data for weekly program with both completed and incomplete activities.
    const weeklyProgram = {
      week1: [
        { weekday: "MONDAY", title: "activity1", completed: true }, // March 4
        { weekday: "WEDNESDAY", title: "activity2", completed: true }, // March 6
      ],
      week2: [
        { weekday: "MONDAY", title: "activity3", completed: false }, // March 11
        { weekday: "WEDNESDAY", title: "activity4", completed: false }, // March 13
      ],
    };

    // Rendering the Calendar component with the mock data and specific prop.
    render(
      <Calendar
        weeklyProgram={weeklyProgram}
        currentDateRaw={currentDateRaw}
        shouldMoveIncompleteActivitiesToPresent={false}
      />,
    );

    // Assertions to confirm that incomplete activities are not moved.
    // Checking for the presence of a specific activity on a specific day.
    const firstIncompleteDay = screen
      .getByText("13", {
        selector: "h2",
      })
      .closest("li");

    expect(firstIncompleteDay).toHaveTextContent("activity4");
  });

  // Test case for rendering a more complex program correctly.
  it("renders more complex program correctly", () => {
    const currentDateRaw = new Date(2024, 0, 11); // Jan 11, 2024

    const weeklyProgram = {
      week1: [
        { weekday: "MONDAY", title: "activity1", completed: true }, // Jan 1
        { weekday: "WEDNESDAY", title: "activity2", completed: false }, // Jan 3
      ],
      week2: [
        { weekday: "MONDAY", title: "activity3", completed: false }, // Jan 8
        { weekday: "WEDNESDAY", title: "activity4", completed: false }, // Jan 10
        { weekday: "THURSDAY", title: "activity5", completed: true }, // Jan 11
        { weekday: "FRIDAY", title: "activity6", completed: false }, // Jan 12
      ],
    };

    render(
      <Calendar
        weeklyProgram={weeklyProgram}
        currentDateRaw={currentDateRaw}
      />,
    );

    // Since current day is Jan 11 and activity5 is completed, we dont move this activity
    expect(
      screen.getByText("11", { selector: "h2" }).closest("li"),
    ).toHaveTextContent("activity5");

    // First incomplete activity is activity2, so it should be moved to Jan 12
    expect(
      screen.getByText("12", { selector: "h2" }).closest("li"),
    ).toHaveTextContent("activity2");

    // Next incomplete activity is activity4, so it should be moved to Jan 13
    expect(
      screen.getByText("13", { selector: "h2" }).closest("li"),
    ).toHaveTextContent("activity3");

    expect(
      screen.getByText("14", { selector: "h2" }).closest("li"),
    ).toHaveTextContent("activity4");

    // Jan 12 activity is pushed to the end as Jan 15
    expect(
      screen.getByText("15", { selector: "h2" }).closest("li"),
    ).toHaveTextContent("activity6");
  });
});
