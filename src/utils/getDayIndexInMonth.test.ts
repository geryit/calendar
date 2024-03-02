import getDayIndexInMonth from "./getDayIndexInMonth";
import dayjs from "@/lib/dayjs"; // Adjust the import path as necessary

describe("getDayIndexInMonth", () => {
  it("returns the correct day of the month when the month starts on a Monday", () => {
    const currentDate = dayjs("2024-01-14"); // Jan 14th, 2024, first day of the month is a Monday
    const weekIndexInMonth = 1; // The first week
    const dayIndexInWeek = 1; // Tuesday (0-indexed)
    const result = getDayIndexInMonth(
      currentDate,
      weekIndexInMonth,
      dayIndexInWeek,
    );
    expect(result).toBe(2); // Expecting September 2nd as the day
  });

  it("adjusts the week index correctly when the month starts on a day other than Monday", () => {
    const currentDate = dayjs("2022-02-14"); // Feb 14th, 2022, first day of the month is a Thursday
    const weekIndexInMonth = 1; // Testing the first week
    const dayIndexInWeek = 1; // Tuesday (0-indexed)
    const result = getDayIndexInMonth(
      currentDate,
      weekIndexInMonth,
      dayIndexInWeek,
    );
    expect(result).toBe(8); // Expecting Feb 8th as the day
  });

  it("returns the correct day for second week of the month and Monday", () => {
    const currentDate = dayjs("2022-02-14"); // Feb 14th, 2022, first day of the month is a Thursday
    const weekIndexInMonth = 2; // Second week of the month
    const dayIndexInWeek = 0; // Monday (0-indexed)
    const result = getDayIndexInMonth(
      currentDate,
      weekIndexInMonth,
      dayIndexInWeek,
    );
    expect(result).toBe(14);
  });

  it("returns the correct day of the month if the week starts on a Sunday ", () => {
    dayjs.locale("en-us"); // Apply the US locale

    const currentDate = dayjs("2022-02-14"); // Feb 14th, 2022, first day of the month is a Thursday
    const weekIndexInMonth = 2; // First week of the month
    const dayIndexInWeek = 1; // Monday (0-indexed, Start of the week is Sunday)
    const result = getDayIndexInMonth(
      currentDate,
      weekIndexInMonth,
      dayIndexInWeek,
    );
    expect(result).toBe(14);
    dayjs.locale("en-gb"); // Apply the GB locale
  });
});
