import Calendar from "@/components/Calendar/Calendar";

export default function Home() {
  return (
    <main className="p-8 flex flex-col items-center gap-8">
      <Calendar now={new Date(2024, 0, 12)} sort={false} />
      <Calendar now={new Date(2024, 0, 12)} />
      --------------------------------
      <Calendar now={new Date(2024, 0, 13)} sort={false} />
      <Calendar now={new Date(2024, 0, 13)} />
      {/*--------------------------------*/}
      {/*<Calendar now={new Date(2024, 0, 14)} sort={false} />*/}
      {/*<Calendar now={new Date(2024, 0, 14)} />*/}
      {/*--------------------------------*/}
      {/*<Calendar now={new Date(2024, 0, 15)} sort={false} />*/}
      {/*<Calendar now={new Date(2024, 0, 15)} />*/}
      {/*<Calendar now={new Date(2024, 1, 15)} />*/}
      {/*{Array.from({ length: 12 }).map((_, i) => (*/}
      {/*  <Calendar key={i} now={new Date(2024, i, 14)} />*/}
      {/*))}*/}
    </main>
  );
}
