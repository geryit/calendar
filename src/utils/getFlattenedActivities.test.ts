import getFlattenedActivities from "@/utils/getFlattenedActivities";
import dayjs from "@/lib/dayjs";

describe("getFlattenedActivities", () => {
  // Test case to check if the function correctly flattens activities and calculates the correct day of the month.
  it("correctly flattens activities and calculates the day of the month", () => {
    const currentDate = dayjs("2024-03-14"); // Assuming current day is March 14

    const weeklyProgram = {
      week1: [
        { weekday: "MONDAY", title: "activity1", completed: true },
        { weekday: "WEDNESDAY", title: "activity2", completed: true },
      ],
      week2: [
        { weekday: "MONDAY", title: "activity3", completed: true },
        { weekday: "WEDNESDAY", title: "activity4", completed: false },
      ],
    };

    const result = getFlattenedActivities(weeklyProgram, currentDate);
    // Assuming week1 should start on March 4, 2024, because March 1 is a Friday
    // Expecting a specific flattened structure with correct dates assigned to each activity.
    expect(result).toEqual([
      { completed: true, day: 4, title: "activity1", weekday: "MONDAY" },
      { completed: true, day: 6, title: "activity2", weekday: "WEDNESDAY" },
      { completed: true, day: 11, title: "activity3", weekday: "MONDAY" },
      { completed: false, day: 14, title: "activity4", weekday: "" },
    ]);
  });

  // Similar test case for a month that starts with a full week.
  it("correctly flattens activities and calculates the day of the month for a month starts with full week", () => {
    const currentDate = dayjs("2024-01-14"); // Assuming current day is January 14 (Jan starts with full week)

    const weeklyProgram = {
      week1: [
        { weekday: "MONDAY", title: "activity1", completed: true },
        { weekday: "WEDNESDAY", title: "activity2", completed: true },
      ],
      week2: [
        { weekday: "MONDAY", title: "activity3", completed: true },
        { weekday: "WEDNESDAY", title: "activity4", completed: false },
      ],
    };

    const result = getFlattenedActivities(weeklyProgram, currentDate);
    // Assuming week1 should start on Jan 1, 2024, because Jan 1 is a Monday
    expect(result).toEqual([
      { completed: true, day: 1, title: "activity1", weekday: "MONDAY" },
      { completed: true, day: 3, title: "activity2", weekday: "WEDNESDAY" },
      { completed: true, day: 8, title: "activity3", weekday: "MONDAY" },
      { completed: false, day: 14, title: "activity4", weekday: "" },
    ]);
  });

  it("correctly flattens activities and calculates the day of the month for complex weekly programs", () => {
    const currentDate = dayjs("2024-03-14"); // Assuming the current day is March 14

    const weeklyProgram = {
      week1: [
        { weekday: "MONDAY", title: "activity1", completed: true },
        { weekday: "WEDNESDAY", title: "activity2", completed: false },
      ],
      week2: [
        { weekday: "MONDAY", title: "activity3", completed: true },
        { weekday: "WEDNESDAY", title: "activity4", completed: false },
        { weekday: "THURSDAY", title: "activity5", completed: false },
        { weekday: "SATURDAY", title: "activity6", completed: false },
      ],
      week3: [
        { weekday: "MONDAY", title: "activity7", completed: false },
        { weekday: "TUESDAY", title: "activity8", completed: false },
        { weekday: "FRIDAY", title: "activity9", completed: false },
      ],
    };

    const result = getFlattenedActivities(weeklyProgram, currentDate);

    expect(result).toEqual([
      { completed: true, day: 4, title: "activity1", weekday: "MONDAY" },
      { completed: false, day: 14, title: "activity2", weekday: "" },
      { completed: true, day: 11, title: "activity3", weekday: "MONDAY" },
      { completed: false, day: 15, title: "activity4", weekday: "" },
      { completed: false, day: 16, title: "activity5", weekday: "" },
      { completed: false, day: 17, title: "activity6", weekday: "" },
      { completed: false, day: 18, title: "activity7", weekday: "MONDAY" },
      { completed: false, day: 19, title: "activity8", weekday: "TUESDAY" },
      { completed: false, day: 22, title: "activity9", weekday: "FRIDAY" },
    ]);
  });

  // Test case to check the behavior when incomplete activities should not be moved to the current date.
  it("returns unmodified activities when shouldMoveIncompleteActivitiesToPresent is false", () => {
    const currentDate = dayjs("2024-03-07"); // Assuming the current day is March 7

    const weeklyProgram = {
      week1: [
        { weekday: "MONDAY", title: "activity1", completed: false }, // March 4
        { weekday: "WEDNESDAY", title: "activity2", completed: false }, // March 6
      ],
    };

    // shouldMoveIncompleteActivitiesToPresent is explicitly set to false
    const result = getFlattenedActivities(weeklyProgram, currentDate, false);

    // Expect that the incomplete activities are not moved to the current date
    expect(result).toEqual([
      { completed: false, day: 4, title: "activity1", weekday: "MONDAY" },
      { completed: false, day: 6, title: "activity2", weekday: "WEDNESDAY" },
    ]);
  });
});
