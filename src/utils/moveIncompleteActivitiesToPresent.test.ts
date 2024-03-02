import moveIncompleteActivitiesToPresent from "@/utils/moveIncompleteActivitiesToPresent";
import { FlattenedActivity } from "@/utils/getFlattenedActivities";

describe("moveIncompleteActivitiesToPresent", () => {
  it("moves incomplete activities to start from the current day, adjusting future activities", () => {
    const activities: FlattenedActivity[] = [
      { day: 10, completed: false, title: "activity1", weekday: "MONDAY" },
      { day: 12, completed: false, title: "activity2", weekday: "WEDNESDAY" },
    ];
    const currentDayIndex = 14;
    const updatedActivities = moveIncompleteActivitiesToPresent(
      activities,
      currentDayIndex,
    );

    const expectedOutput: FlattenedActivity[] = [
      { day: 14, completed: false, title: "activity1", weekday: "" },
      { day: 15, completed: false, title: "activity2", weekday: "" },
    ];

    expect(updatedActivities).toEqual(expectedOutput);
  });

  it("moves Incomplete Activities Including Current Day to Sequential Days Starting from Current Day", () => {
    const activities: FlattenedActivity[] = [
      { day: 10, completed: false, title: "activity1", weekday: "MONDAY" },
      { day: 12, completed: false, title: "activity2", weekday: "WEDNESDAY" },
      { day: 14, completed: false, title: "activity3", weekday: "FRIDAY" },
    ];
    const currentDayIndex = 14;
    const updatedActivities = moveIncompleteActivitiesToPresent(
      activities,
      currentDayIndex,
    );

    const expectedOutput: FlattenedActivity[] = [
      { day: 14, completed: false, title: "activity1", weekday: "" },
      { day: 15, completed: false, title: "activity2", weekday: "" },
      { day: 16, completed: false, title: "activity3", weekday: "" },
    ];

    expect(updatedActivities).toEqual(expectedOutput);
  });

  it("starts Sequential Days from Tomorrow for Incomplete Activities When Current Day Is Completed", () => {
    const activities: FlattenedActivity[] = [
      { day: 10, completed: false, title: "activity1", weekday: "MONDAY" },
      { day: 12, completed: false, title: "activity2", weekday: "WEDNESDAY" },
      { day: 14, completed: true, title: "activity3", weekday: "FRIDAY" },
    ];
    const currentDayIndex = 14;
    const updatedActivities = moveIncompleteActivitiesToPresent(
      activities,
      currentDayIndex,
    );

    const expectedOutput: FlattenedActivity[] = [
      { completed: false, day: 15, title: "activity1", weekday: "" },
      { completed: false, day: 16, title: "activity2", weekday: "" },
      { completed: true, day: 14, title: "activity3", weekday: "FRIDAY" },
    ];

    expect(updatedActivities).toEqual(expectedOutput);
  });

  it("aligns Incomplete Activities to Current and Following Days Regardless of Initial Schedule", () => {
    const activities: FlattenedActivity[] = [
      { day: 10, completed: false, title: "activity1", weekday: "MONDAY" },
      { day: 12, completed: false, title: "activity2", weekday: "WEDNESDAY" },
      { day: 15, completed: false, title: "activity3", weekday: "FRIDAY" },
    ];
    const currentDayIndex = 14;
    const updatedActivities = moveIncompleteActivitiesToPresent(
      activities,
      currentDayIndex,
    );

    const expectedOutput: FlattenedActivity[] = [
      { completed: false, day: 14, title: "activity1", weekday: "" },
      { completed: false, day: 15, title: "activity2", weekday: "" },
      { completed: false, day: 16, title: "activity3", weekday: "" }, // activity3 moved from 15 to 16
    ];

    expect(updatedActivities).toEqual(expectedOutput);
  });
});
