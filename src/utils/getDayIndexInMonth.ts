import type { Dayjs } from "dayjs";
import { getAdjustedWeekIndexInMonth } from "@/utils/getAdjustedWeekIndexInMonth";

/**
 * Convert the weekIndexInMonth and dayOfWeekIndex to the day of the month
 * @param currentDate - Current dayjs instance
 * @param weekNumber - Week index in month
 * @param dayOfWeekIndex - Day index in week (0-indexed)
 */
const getDayIndexInMonth = (
  currentDate: Dayjs,
  weekNumber: number,
  dayOfWeekIndex: number,
) => {
  return (
    currentDate // eg: March 14th Thursday
      // Set to the first day of the month. For March: March 1st
      .startOf("month")
      // Add week. E.g.: For week 1: March 8th Friday
      // Exceptions: If month starts with a full week (eg: January 2024),
      // subtract 1 from weekIndexInMonth: Jan 1st Monday
      .add(getAdjustedWeekIndexInMonth(weekNumber, currentDate), "week")
      // Set to the day of the week. eg: For Monday (dayOfWeekIndex=0), set to: March 4th Monday
      .weekday(dayOfWeekIndex)
      .get("date") // Get the day of the month. E.g.: 4
  );
};

export default getDayIndexInMonth;
