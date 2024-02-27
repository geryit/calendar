import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear"; // May need to use a different plugin if looking to set week
import "dayjs/locale/en-gb"; // Import more locales here if needed

// add more plugins here if needed
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekday);
dayjs.locale("en-gb"); // Monday is the first day of the week

// if firstDayOfWeek === Monday ? 1 : 0
// Use this to add prefix and suffix blocks in calendar
export const firstDayOfWeek = dayjs.localeData().firstDayOfWeek();

export default dayjs;
