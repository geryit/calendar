import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear"; // May need to use a different plugin if looking to set week
import "dayjs/locale/en-gb"; // Import more locales here if needed

// add more plugins here if needed
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekday);
dayjs.locale("en-gb"); // Monday is the first day of the week. Default is Sunday

// if weekStartDayIndex === Monday ? 1 : 0
// Use this to add empty prefix and suffix blocks in calendar for UI
export const weekStartDayIndex = dayjs.localeData().firstDayOfWeek();

// pass `true` to get locale aware weekdays (eg: start from Monday if locale is en-gb)
export const weekDaysShort = dayjs.weekdaysShort(true); // ["Mon", "Tue",...]

// pass `true` to get locale aware weekdays (eg: start from Monday if locale is en-gb)
export const weekDays = dayjs.weekdays(true); // ["Monday", "Tuesday",...]

export const weekDaysCount = weekDaysShort.length; // 7

export default dayjs;
