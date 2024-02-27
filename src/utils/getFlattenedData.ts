import type { Dayjs } from "dayjs";
import data from "@/data/program.json";
import dayjs, { firstDayOfWeek } from "@/lib/dayjs";

const getFlattenedData = (currentDate: Dayjs) => {
  return Object.entries(data)
    .map(([weekName, week]) => {
      const weekNumber = parseInt(weekName.replace(/\D/g, ""), 10);
      return week.map((date) => {
        const dayIndex = dayjs
          .weekdays()
          .findIndex((day) => day.toLowerCase() === date.weekday.toLowerCase());

        return {
          ...date,
          day: currentDate
            .set("date", 1)
            .add(weekNumber, "week")
            .weekday(dayIndex - firstDayOfWeek)
            .get("date"),
        };
      });
    })
    .flat();
};

export default getFlattenedData;
