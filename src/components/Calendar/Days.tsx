import getFlattenedData from "@/utils/getFlattenedData";
import Cell from "@/components/Calendar/Cell";
import React, { memo, useMemo } from "react";
import type { Dayjs } from "dayjs";

const Days = ({ today, index }: { today: Dayjs; index: number }) => {
  const dayIndex = useMemo(() => index + 1, [index]);
  const match = useMemo(
    () => getFlattenedData(today).find((date) => date.day === dayIndex),
    [today, dayIndex],
  );
  const isCompleted = useMemo(() => match?.completed, [match?.completed]);
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
      {match && (
        <h3 className={`text-[10px] leading-[1.2] font-libre uppercase ${isToday ? "text-white" : ""}`}>
          {match?.title}
        </h3>
      )}
    </Cell>
  );
};

export default memo(Days);
