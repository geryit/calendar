import type { FlattenedDay } from "@/utils/getFlattenedData";
import Cell from "@/components/Calendar/Cell";
import React, { memo, useMemo } from "react";
import type { Dayjs } from "dayjs";

const Day = ({
  today,
  index,
  flattenedData,
}: {
  today: Dayjs;
  index: number;
  flattenedData: FlattenedDay[];
}) => {
  const dayIndex = useMemo(() => index + 1, [index]);
  const activityFound = useMemo(
    () => flattenedData.find((date) => date.day === dayIndex),
    [flattenedData, dayIndex],
  );
  const isCompleted = useMemo(
    () => activityFound?.completed,
    [activityFound?.completed],
  );

  const isToday = useMemo(
    () => today.get("date") === dayIndex,
    [dayIndex, today],
  );

  return (
    <Cell isToday={isToday}>
      <h2
        className={`font-libre font-bold text-[4rem]  
                ${isToday ? "text-white" : isCompleted ? "text-green-450" : "text-black-80"}`}
      >
        {dayIndex}
      </h2>
      {activityFound && (
        <h3
          className={`text-[10px] leading-[1.2] font-libre uppercase ${isToday ? "text-white" : ""}`}
        >
          {activityFound.title}
        </h3>
      )}
    </Cell>
  );
};

export default memo(Day);
