import type { FlattenedActivity } from "@/utils/getFlattenedActivities";
import Cell from "@/components/Calendar/Cell";
import React, { memo, useMemo } from "react";
import type { Dayjs } from "dayjs";

type Props = {
  currentDate: Dayjs;
  dayIndex: number;
  flattenedActivities: FlattenedActivity[];
};

/**
 * Day Component - Represents a single day in the calendar.
 *
 * Props:
 * - currentDate: Dayjs - Instance of the current day.
 * - dayIndex: number - Day of the month (e.g., 14).
 * - flattenedActivities: FlattenedActivity[] - List of activities for the calendar days.
 */
const Day = ({
  currentDate, // Current dayjs instance
  dayIndex, // Day of Month (eg: 14)
  flattenedActivities, // data to assign activities to days
}: Props) => {
  // Activity matched for the day
  const activityMatched = useMemo(
    () => flattenedActivities.find((date) => date.day === dayIndex),
    [dayIndex, flattenedActivities],
  );

  // Check if the activity is completed, so we can make the number green
  const isCompleted = activityMatched?.completed;

  // Check if the day is today, so we can highlight it
  const isToday = currentDate.date() === dayIndex;

  const dayClassName = `font-libre font-bold text-[4rem] ${
    isToday ? "text-white" : isCompleted ? "text-green-450" : "text-black-80"
  }`;

  const activityTitleClassName = `text-[10px] leading-[1.2] font-libre uppercase ${
    isToday ? "text-white" : ""
  }`;

  return (
    <Cell isToday={isToday}>
      <h2 className={dayClassName}>{dayIndex}</h2>
      {activityMatched && (
        <h3 className={activityTitleClassName}>{activityMatched.title}</h3>
      )}
    </Cell>
  );
};

export default memo(Day);
