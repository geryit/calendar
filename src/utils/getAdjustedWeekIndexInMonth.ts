import type { Dayjs } from "dayjs";

/**
 Normally, we wouldn't need this if we didn't care about starting on the first full week of the month.
 But since we care, we need to check if month starts on a Monday and subtract 1 from the weekIndexInMonth
 to move the block to the previous week.
 Without this adjustment, if the month starts on a Monday,
 the program will start on the second week of the month (8th instead of 1st).
 @param weekNumber - Week index in month
 @param currentDate - Current dayjs instance
 */
export const getAdjustedWeekIndexInMonth = (
  weekNumber: number,
  currentDate: Dayjs,
) => {
  // Get the index of the first day of the month. 1 is Monday.
  // If the first day of the month is a Monday, decrement the weekNumber by 1
  const isFullWeek = currentDate.startOf("month").day() === 1;
  return isFullWeek ? weekNumber - 1 : weekNumber;
};
