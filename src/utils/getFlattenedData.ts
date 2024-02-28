import type { Dayjs } from "dayjs";
import data from "@/data/program.json";
import dayjs from "@/lib/dayjs";

export type FlattenedDay = {
  day: number;
  weekday: string;
  title: string;
  completed: boolean;
};

const getWeekNumber = (weekNumber: number, firstDayOfMonth: Dayjs): number => {
  return firstDayOfMonth.day() === 1 ? weekNumber - 1 : weekNumber;
};

const getFlattenedData = (currentDate: Dayjs, sort = true): FlattenedDay[] => {
  const res = Object.entries(data)
    .map(([weekName, week]) => {
      const weekNumber = parseInt(weekName.replace(/\D/g, ""), 10);
      return week.map((date) => {
        const dayIndex = dayjs
          .weekdays(true)
          .findIndex((day) => day.toLowerCase() === date.weekday.toLowerCase());
        return {
          ...date,
          day: currentDate
            .set("date", 1)
            .add(getWeekNumber(weekNumber, currentDate.set("date", 1)), "week")
            .weekday(dayIndex)
            .get("date"),
        };
      });
    })
    .flat();
  if (sort) {
    return applyActivitySorting(res, currentDate.get("date"));
  }
  return res;
};

const applyActivitySorting = (
  days: FlattenedDay[],
  currentDayIndex: number,
) => {
  let add = 0;
  const doesCurrentDayHaveActivity = days.find(
    (d) => d.day === currentDayIndex,
  );
  console.log({ doesCurrentDayHaveActivity });
  return days.map((d) => {
    const notCompletedCount =
      days.filter((d) => !d.completed && d.day <= currentDayIndex).length +
      (!!doesCurrentDayHaveActivity ? 1 : 0);
    console.log(d.completed, d.day, currentDayIndex, notCompletedCount);

    if (!d.completed && add < notCompletedCount) {
      const newD = { ...d, day: currentDayIndex + add };
      console.log(currentDayIndex + add);
      add++;
      return newD;
    }
    return d;
  });
};

export default getFlattenedData;
