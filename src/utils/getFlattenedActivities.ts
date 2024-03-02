import type { Dayjs } from "dayjs";
import { weekDays } from "@/lib/dayjs";
import getDayIndexInMonth from "@/utils/getDayIndexInMonth";
import moveIncompleteActivitiesToPresent from "@/utils/moveIncompleteActivitiesToPresent";

type Activity = {
  weekday: string;
  title: string;
  completed: boolean;
};

export type WeeklyActivities = {
  [key: string]: Activity[];
};

export type FlattenedActivity = Activity & {
  day: number;
};

/**
 * Transforms a structured weekly activities object into a flattened array of activities adjusted for specific dates.
 * This is particularly useful for displaying activities on a calendar interface, allowing activities from past dates
 * to be optionally moved to the current date or later.
 *
 * @param {WeeklyActivities} weeklyProgram - The input program structured by week, with each week containing an array
 *                                      of activities. Each activity has a 'day' indicating its scheduled day in the
 *                                      month, a 'completed' flag indicating if the activity has been completed, and
 *                                      a 'title' for the activity's description.
 *                                      Example format:
 *                                      {"week1": [{day: 10, completed: false, title: "title1"}, {day: 12, completed: false, title: "title2"}]}
 *
 * @param {Dayjs} currentDate - A Dayjs object representing the current date. This is used to calculate the
 *                              current day of the month and adjust activities accordingly.
 *
 * @param {boolean} [shouldMoveIncompleteActivitiesToPresent=true] - Optional. If true, incomplete activities scheduled
 *                                                                    for past dates are moved to the current date, ensuring
 *                                                                    they are visible in the present or future calendar view.
 *
 * @returns {FlattenedActivity[]} A flattened array of activities where each activity is adjusted based on the current date
 *                                 and potentially moved if it's incomplete and scheduled in the past. Each activity now
 *                                 includes a 'day' field representing the adjusted day of the month for display purposes.
 *                                 Example output:
 *                                 [{day: 14, completed: false, title: "title1"}, {day: 15, completed: false, title: "title2"}]
 *
 * The function operates as follows:
 * 1. Iterates through each week in the input 'program', extracting the week number and the activities scheduled for that week.
 * 2. For each activity, calculates its scheduled day of the month based on the current date, week number, and the day of the week
 *    it's planned for. This adjustment is crucial for matching activities in the UI calendar accurately.
 * 3. If 'shouldMoveIncompleteActivitiesToPresent' is true, any incomplete activities scheduled before the current date are shifted
 *    to start from today, ensuring that all tasks are visible and accounted for in the present or future.
 */
const getFlattenedActivities = (
  weeklyProgram: WeeklyActivities,
  currentDate: Dayjs,
  shouldMoveIncompleteActivitiesToPresent: boolean = true,
): FlattenedActivity[] => {
  const flattenedActivities = Object.entries(weeklyProgram)
    // eg: [week1, {"weekday": "MONDAY","title"...}]
    .map(([weekName, activities]) => {
      // Parse the week number from week name. Eg for week1: 1
      const weekNumber = parseInt(weekName.replace(/\D/g, ""), 10);

      // rebuild the data with the day number, so we can match them in the UI
      return activities.map((activity) => {
        // Find the index of the day in the week. For Monday: 0 (0-indexed)
        const dayIndexInWeek = weekDays.findIndex(
          (day) => day.toLowerCase() === activity.weekday.toLowerCase(),
        );

        // Find the day of the month. E.g.: 14
        const dayIndexInMonth = getDayIndexInMonth(
          currentDate, // Current day's dayjs instance
          weekNumber, // Week index in month. For week1: 1
          dayIndexInWeek, // For Monday: 0 (0-indexed)
        );

        return {
          ...activity,
          day: dayIndexInMonth, // add the day of the month
        };
      });
    })
    .flat();

  // If we should move incomplete activities to present, do it
  if (shouldMoveIncompleteActivitiesToPresent) {
    return moveIncompleteActivitiesToPresent(
      flattenedActivities,
      currentDate.get("date"),
    );
  }
  return flattenedActivities;
};

export default getFlattenedActivities;
