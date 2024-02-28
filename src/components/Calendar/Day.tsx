import type { FlattenedDay } from "@/utils/getFlattenedData";
import Cell from "@/components/Calendar/Cell";
import React, { memo } from "react";
import type { Dayjs } from "dayjs";

type Props = {
  currentDate: Dayjs;
  dayIndex: number;
  flattenedData: FlattenedDay[];
};

// Build the actual days of the month
const Day = ({
  currentDate, // Current dayjs instance
  dayIndex, // Day of Month (eg: 14)
  flattenedData, // data to assign activities to days
}: Props) => {
  // Activity matched for the day
  const activityMatched = flattenedData.find((date) => date.day === dayIndex);

  // Check if the activity is completed, so we can make the number green
  const isCompleted = activityMatched?.completed;

  // Check if the day is today, so we can highlight it
  const isToday = currentDate.get("date") === dayIndex;

  return (
    <Cell isToday={isToday}>
      <h2
        className={`font-libre font-bold text-[4rem] 
        ${isToday ? "text-white" : isCompleted ? "text-green-450" : "text-black-80"}`}
      >
        {dayIndex}
      </h2>
      {activityMatched && (
        <h3
          className={`text-[10px] leading-[1.2] font-libre uppercase ${isToday ? "text-white" : ""}`}
        >
          {activityMatched.title}
        </h3>
      )}
    </Cell>
  );
};

export default memo(Day);
