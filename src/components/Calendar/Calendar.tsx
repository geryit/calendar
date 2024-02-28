"use client";

import dayjs, {
  weekDaysCount,
  weekDaysShort,
  weekStartDayIndex,
} from "@/lib/dayjs";
import React from "react";
import Cell from "@/components/Calendar/Cell";
import Day from "@/components/Calendar/Day";
import getFlattenedData from "@/utils/getFlattenedData";

type Props = {
  currentDateRaw?: Date;
  sort?: boolean;
};

const Calendar = ({ currentDateRaw, sort }: Props) => {
  const currentDate = dayjs(currentDateRaw);

  // Get the days in the month (eg: 30)
  const daysInMonth = Array.from({ length: currentDate.daysInMonth() });

  // Get the days before the first day of the month
  // Eg: startOf("month").day() == 4 (Thursday) + 7 - 1 (Monday) % 7 == 3
  const prefixDays = Array.from({
    length:
      (currentDate.startOf("month").day() + weekDaysCount - weekStartDayIndex) %
      weekDaysCount,
  });

  // Get the days after the last day of the month
  // Eg: endOf("month").day() == 2 (Tuesday) + 7 - 1 (Monday) % 7 == 1
  const suffixDays = Array.from({
    length:
      (weekDaysCount -
        currentDate.endOf("month").day() -
        1 +
        weekStartDayIndex) %
      weekDaysCount,
  });

  const flattenedData = getFlattenedData(currentDate, sort);

  return (
    <div className="border-4 border-green-450 max-w-6xl mb-8">
      <h1 className="font-fjalla p-4 text-5xl leading-[1.3] text-center text-black-80">
        Weekly Program ({currentDate.format("MMM")})
      </h1>
      <ul className="grid grid-cols-7 border-t border-green-450 text-center -mr-[1px] -mb-[1px]">
        {weekDaysShort.map((day, i) => (
          <li key={i} className="border-b border-r border-green-450 p-4">
            <h2 className="font-sans text-black-80 uppercase">{day}</h2>
          </li>
        ))}
        {prefixDays.map((_, i) => (
          <Cell key={i} />
        ))}
        {daysInMonth.map((_, i) => (
          <Day
            key={i}
            currentDate={currentDate}
            dayIndex={i + 1}
            flattenedData={flattenedData}
          />
        ))}
        {suffixDays.map((_, i) => (
          <Cell key={i} />
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
