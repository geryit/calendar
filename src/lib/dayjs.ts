import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import "dayjs/locale/en-gb"; // Import more locales here if needed

// add more plugins here if needed
dayjs.extend(localeData); // so that we can use dayjs().weekdays()
dayjs.extend(weekday); // so that we can use dayjs().weekday()

// Changing locale globally
// Monday is the first day of the week for GB.
// Default is Sunday
dayjs.locale("en-gb");

// if weekStartDayIndex === Monday? 1 : 0
// Use this to add empty prefix and suffix blocks in calendar for UI
export const weekStartDayIndex = dayjs.localeData().firstDayOfWeek();

// pass `true` to get locale aware weekdays (eg: start from Monday if locale is en-gb)
export const weekDaysShort = dayjs.weekdaysShort(true); // ["Mon", "Tue",...]

// pass `true` to get locale aware weekdays (eg: start from Monday if locale is en-gb)
export const weekDays = dayjs.weekdays(true); // ["Monday", "Tuesday",...]

export const weekDaysCount = weekDaysShort.length; // 7

export default dayjs;
