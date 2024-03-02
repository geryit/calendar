"use client";

import dayjs, {
  weekDaysCount,
  weekDaysShort,
  weekStartDayIndex,
} from "@/lib/dayjs";
import React, { useMemo } from "react";
import Cell from "@/components/Calendar/Cell";
import Day from "@/components/Calendar/Day";

import getFlattenedActivities, {
  WeeklyActivities,
} from "@/utils/getFlattenedActivities";

type Props = {
  weeklyProgram: WeeklyActivities; // Monthly program data
  currentDateRaw?: string | number | Date | dayjs.Dayjs | null | undefined; // Current date to display. Defaults to today's date. Eg: "2024-03-14"
  shouldMoveIncompleteActivitiesToPresent?: boolean; // Should move past incomplete activities to present? Defaults to true
};

/**
 * Calendar Component - Renders a calendar with weekly program activities.
 *
 * Props:
 * - weeklyProgram: WeeklyActivities - Object containing the activities for the week.
 * - currentDateRaw: string | number | Date | dayjs.Dayjs | null | undefined - Optional. The current date to display.
 * - shouldMoveIncompleteActivitiesToPresent: boolean - Optional. Flag to determine if incomplete activities
 *   should be moved to the current date. Defaults to true.
 */
const Calendar = ({
  weeklyProgram,
  currentDateRaw,
  shouldMoveIncompleteActivitiesToPresent = true,
}: Props) => {
  const currentDate = dayjs(currentDateRaw);

  // Get the days in the month (eg: 30)
  const daysInMonth = Array.from({ length: currentDate.daysInMonth() });

  /**
   * Generates an array of empty days at the start of the month.
   * Eg: startOf("month").day() == 4 (Thursday) + 7 - 1 (Monday) % 7 == 3
   */
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

  // Heavy calculation, so we memoize it
  const flattenedActivities = useMemo(
    () =>
      getFlattenedActivities(
        weeklyProgram,
        currentDate,
        shouldMoveIncompleteActivitiesToPresent,
      ),
    [currentDate, shouldMoveIncompleteActivitiesToPresent, weeklyProgram],
  );

  return (
    <div className="border-4 border-green-450 max-w-6xl mb-8">
      {/* Added Month name to heading. Can help to identify the month. */}
      <h1 className="font-fjalla font-bold p-4 text-5xl leading-[1.3] text-center text-black-80">
        Weekly Program ({currentDate.format("MMM")})
      </h1>
      <ul className="grid grid-cols-7 border-t-2 border-green-450 text-center -mr-[2px] -mb-[2px]">
        {/* Render the headers for each day of the week */}
        {weekDaysShort.map((day, i) => (
          <li key={i} className="border-b-2 border-r-2 border-green-450 p-4">
            <h3 className="font-sans text-black-80 uppercase">{day}</h3>
          </li>
        ))}

        {/* Render empty cells for days before the start of the month */}
        {prefixDays.map((_, i) => (
          <Cell key={i} />
        ))}

        {/*Actual Days*/}
        {daysInMonth.map((_, i) => (
          <Day
            key={i}
            currentDate={currentDate}
            dayIndex={i + 1}
            flattenedActivities={flattenedActivities}
          />
        ))}

        {/*Fill the rest of the month with empty cells*/}
        {suffixDays.map((_, i) => (
          <Cell key={i} />
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
