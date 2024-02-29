import type { Dayjs } from "dayjs";
import data from "@/data/program.json";
import { weekDays } from "@/lib/dayjs";

export type FlattenedDay = {
  day: number;
  weekday: string;
  title: string;
  completed: boolean;
};

/*
  Normally, we wouldn't need this if we didn't care about starting on the first full week of the month.
  But since we care, we need to check if month starts on a Monday and subtract 1 from the weekIndexInMonth
  to move the block to the previous week.
  Without this adjustment, if the month starts on a Monday,
  the program will start on the second week of the month (8th instead of 1st).
*/
const getAdjustedWeekIndexInMonth = (
  weekIndexInMonth: number,
  currentDate: Dayjs,
) => {
  return currentDate.set("date", 1).day() === 1
    ? weekIndexInMonth - 1
    : weekIndexInMonth;
};

// Convert `week1": [{ "weekday": "TUESDAY" }` to 9
const getDayIndexInMonth = (
  currentDate: Dayjs,
  weekIndexInMonth: number,
  dayIndexInWeek: number,
) => {
  return currentDate // eg: 14-03-2024
    .set("date", 1) // Set to the first day of the month. For March: 01-03-2024
    .add(getAdjustedWeekIndexInMonth(weekIndexInMonth, currentDate), "week") // Add weekIndex * 7 days to date. Eg: For week 1: 08-03-2024
    .weekday(dayIndexInWeek) // For Tuesday, add 1 day. E.g.: 09-03-2024
    .get("date"); // Get the day of the month. E.g.: 9
};

// Build the flatted activity data, so we can use it in the calendar to add activities to days
const getFlattenedData = (currentDate: Dayjs, sort = true): FlattenedDay[] => {
  const res = Object.entries(data)
    // eg: [week1, {"weekday": "MONDAY","title"...}]
    .map(([weekName, week]) => {
      // parse the week number from week name
      const weekIndexInMonth = parseInt(weekName.replace(/\D/g, ""), 10);

      // rebuild the data with the day number, so we can match in the UI
      return week.map((date) => {
        // Find the index of the day in the week. For Monday: 0
        const dayIndexInWeek = weekDays.findIndex(
          (day) => day.toLowerCase() === date.weekday.toLowerCase(),
        );

        // Find the day of the month. E.g.: 14
        const dayIndexInMonth = getDayIndexInMonth(
          currentDate, // Current day's dayjs instance
          weekIndexInMonth, // Week index in month. For week1: 1
          dayIndexInWeek, // For Monday: 0
        );

        return {
          ...date,
          day: dayIndexInMonth, // add the day of the month
        };
      });
    })
    .flat();
  if (sort) {
    return applyActivitySorting(res, currentDate.get("date"));
  }
  return res;
};

/**
  Add activies to the flatted days organize by activity "completed" status
  Scan the days in the past and move them to present starting from the current day

  Assuming today is 14th:
  Input: [{day: 10, completed: false, title: "title1"},{day: 12, completed: false, title: "title2"}]
  Output:[{day: 14, completed: false, title: "title1"},{day: 15, completed: false, title: "title2"}]
*/
const applyActivitySorting = (
  days: FlattenedDay[],
  currentDayIndex: number,
) => {
  // Days in the present to be replaced with the days in the past. E.g.: [14, 15]
  const modifiedDaysInPresent: number[] = [];

  return days.map((d) => {
    // Calculate the new day index. E.g.: 14, 15, 16
    const newDayIndex = currentDayIndex + modifiedDaysInPresent.length;

    /**
     * If the activity is not completed and the day is in the past. E.g.: 10, 12
     * Update the "day" with the new day index. E.g.: 14, 15
     */
    if (!d.completed && d.day <= currentDayIndex) {
      modifiedDaysInPresent.push(newDayIndex);
      return { ...d, day: newDayIndex };
    }

    /**
     * If above modify the day in the present with activity, update the "day" with the new day index.
     * E.g.: 15th had activity, so it should be moved to 16th
     */
    if (modifiedDaysInPresent.includes(d.day)) {
      return {
        ...d,
        day: newDayIndex,
        title: d.completed ? "" : d.title, //
        completed: false,
      };
    }
    return d;
  });
};

export default getFlattenedData;
