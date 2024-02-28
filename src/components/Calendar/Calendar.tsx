"use client";

import dayjs, { firstDayOfWeek } from "@/lib/dayjs";
import React, { useMemo } from "react";
import Cell from "@/components/Calendar/Cell";
import Day from "@/components/Calendar/Day";
import getFlattenedData from "@/utils/getFlattenedData";

const daysInAWeek = 7;

const Calendar = ({ now, sort }: { now?: Date; sort?: boolean }) => {
  const today = useMemo(() => dayjs(now), [now]);

  // Get the days in the month (eg: 30)
  const daysInMonth = useMemo(
    () => Array.from({ length: today.daysInMonth() }),
    [today],
  );

  // Get the days before the first day of the month
  // Eg: startOf("month").day() == 4 (Thursday) + 7 - 1 (Monday) % 7 == 3
  const prefixDays = useMemo(
    () =>
      Array.from({
        length:
          (today.startOf("month").day() + daysInAWeek - firstDayOfWeek) %
          daysInAWeek,
      }),
    [today],
  );

  // Get the days after the last day of the month
  // Eg: endOf("month").day() == 2 (Tuesday) + 7 - 1 (Monday) % 7 == 1
  const suffixDays = useMemo(
    () =>
      Array.from({
        length:
          (daysInAWeek - today.endOf("month").day() - 1 + firstDayOfWeek) %
          daysInAWeek,
      }),
    [today],
  );

  const flattenedData = getFlattenedData(today, sort);
  console.log(flattenedData);

  return (
    <div className="border-4 border-green-450 max-w-6xl mb-8">
      <h1 className="font-fjalla p-4 text-5xl leading-[1.3] text-center text-black-80">
        Weekly Program ({today.format("MMM")})
      </h1>
      <ul className="grid grid-cols-7 border-t border-green-450 text-center -mr-[1px] -mb-[1px]">
        {dayjs.weekdaysShort(true).map((day, i) => (
          <li key={i} className="border-b border-r border-green-450 p-4">
            <h2 className="font-sans text-black-80 uppercase">{day}</h2>
          </li>
        ))}
        {prefixDays.map((_, i) => (
          <Cell key={i} />
        ))}
        {daysInMonth.map((_, i) => (
          <Day key={i} today={today} index={i} flattenedData={flattenedData} />
        ))}
        {suffixDays.map((_, i) => (
          <Cell key={i} />
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
