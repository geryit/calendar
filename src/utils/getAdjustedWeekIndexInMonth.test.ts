import { getAdjustedWeekIndexInMonth } from "@/utils/getAdjustedWeekIndexInMonth";
import dayjs from "@/lib/dayjs";

describe("getAdjustedWeekIndexInMonth", () => {
  it("should decrement weekIndexInMonth by 1 if the first day of the month is a Monday", () => {
    const weekNumber = 3;
    // Set to a date where the first day of the month is a Monday
    const currentDate = dayjs("2024-01-14"); // For January 14th, 2024, the first day is a Monday
    const adjustedIndex = getAdjustedWeekIndexInMonth(weekNumber, currentDate);
    expect(adjustedIndex).toBe(weekNumber - 1);
  });

  it("should return the same weekIndexInMonth if the first day of the month is not a Monday", () => {
    const weekNumber = 3;
    // Set to a date where the first day of the month is not a Monday
    const currentDate = dayjs("2022-02-14"); // For February 14th, 2022, the first day is a Thursday
    const adjustedIndex = getAdjustedWeekIndexInMonth(weekNumber, currentDate);
    expect(adjustedIndex).toBe(weekNumber);
  });
});
