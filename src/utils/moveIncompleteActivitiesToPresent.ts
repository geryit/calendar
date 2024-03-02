import { FlattenedActivity } from "@/utils/getFlattenedActivities";

/**
 * For all below, we assume today is 14th.
 Add activities to the flatted days organized by activity "completed" status
 Scan the days in the past and move them to present starting from the current day

 Input program: [{day: 10, completed: false, title: "title1"},{day: 12, completed: false, title: "title2"}]
 Output program:[{day: 14, completed: false, title: "title1"},{day: 15, completed: false, title: "title2"}]
 */
const moveIncompleteActivitiesToPresent = (
  flattenedActivities: FlattenedActivity[],
  currentDayIndex: number,
) => {
  // Days in the present to be replaced with the days in the past. E.g.: [14, 15]
  const modifiedDaysInPresent: number[] = [];

  /**
   Assuming we don't want to touch the completed current day actitivy. E.g.: 14th is completed.
   If the current day is completed, add 1 to the index, so start from 15th instead of 14th.
   This variable will be used to calculate the new day index.
  */
  const isCurrentDayCompletedIndex = flattenedActivities.find(
    (activity) => activity.day === currentDayIndex,
  )?.completed
    ? 1
    : 0;

  return flattenedActivities.map((activity) => {
    // Calculate the new day index. E.g.: 14, 15, 16
    const newDayIndex =
      currentDayIndex +
      modifiedDaysInPresent.length +
      isCurrentDayCompletedIndex;

    /**
     * If the activity is not completed and the day is in the past. E.g.: 10, 12
     * Update the "day" with the new day index. E.g.: 14, 15
     * Empty weekdays, because it will be a different day of the week
     */
    if (!activity.completed && activity.day <= currentDayIndex) {
      modifiedDaysInPresent.push(newDayIndex);
      return { ...activity, day: newDayIndex, weekday: "" };
    }

    /**
     * If above modify the day in the present with activity, update the "day" with the new day index.
     * E.g.: 15th had activity, so it should be moved to 16th
     * Empty weekdays, because it will be a different day of the week
     */
    if (modifiedDaysInPresent.includes(activity.day)) {
      return {
        ...activity,
        day: newDayIndex,
        weekday: "",
      };
    }
    return activity;
  });
};

export default moveIncompleteActivitiesToPresent;
