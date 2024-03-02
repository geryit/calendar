/**
 * Home Page Component
 *
 * This module defines the Home page of the application, showcasing a weekly calendar.
 *
 * Imports:
 * - `Calendar` component from "@/components/Calendar/Calendar" to display a calendar view.
 * - Program data from "@/data/program.json" which contains the information to be displayed in the calendar.
 *
 * Component:
 * - `Home`: A functional component representing the Home page.
 *   - Renders a `<main>` element with Tailwind CSS classes for padding and layout:
 *     - `p-8`: Adds padding of 8 units on all sides of the main element.
 *     - `flex flex-col items-center gap-8`: Sets up a flex container with vertical orientation,
 *       center alignment of items, and a gap of 8 units between each item.
 *   - Within the main element, it renders the `Calendar` component, passing it two props:
 *     - `weeklyProgram`: The data imported from `program.json`, used to populate the calendar.
 *     - `currentDateRaw`: A hardcoded date string representing the current date. This is used
 *       by the Calendar component to determine the week to display.
 *
 * Usage:
 * - This component should be used as the primary page component for the home route in a Next.js or React application.
 * - It can be imported and used in routing configurations or directly rendered in the application's entry point.
 *
 * Example:
 * In a Next.js application, this would typically be placed in the `pages/index.tsx` file:
 * ```tsx
 * import Home from '@/app/page';
 *
 * export default function IndexPage() {
 *   return <Home />;
 * }
 * ```
 *
 * Note:
 * - Ensure that the `Calendar` component and the `program.json` data file are correctly implemented and located at the specified paths.
 * - The `currentDateRaw` prop is currently hardcoded. In a real-world application, this might be dynamically determined based on the current date or user input.
 */
import Calendar from "@/components/Calendar/Calendar";
import program from "@/data/program.json";

export default function Home() {
  return (
    <main className="p-8 flex flex-col items-center gap-8">
      <Calendar weeklyProgram={program} currentDateRaw="2024-03-14" />
    </main>
  );
}
