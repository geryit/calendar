import Calendar from "@/components/Calendar/Calendar";

export default function Home() {
  return (
    <main className="p-8 flex flex-col items-center gap-8">
      {/*<Calendar currentDateRaw={new Date(2024, 0, 12)} sort={false} />*/}
      {/*<Calendar currentDateRaw={new Date(2024, 0, 12)} />*/}
      {/*--------------------------------*/}
      {/*<Calendar currentDateRaw={new Date(2024, 0, 13)} sort={false} />*/}
      {/*<Calendar currentDateRaw={new Date(2024, 0, 13)} />*/}
      {/*--------------------------------*/}
      {/*<Calendar currentDateRaw={new Date(2024, 0, 14)} sort={false} />*/}
      {/*<Calendar currentDateRaw={new Date(2024, 0, 14)} />*/}
      {/*--------------------------------*/}
      {/*<Calendar currentDateRaw={new Date(2024, 0, 15)} sort={false} />*/}
      {/*<Calendar currentDateRaw={new Date(2024, 0, 15)} />*/}
      {/*--------------------------------*/}
      {/*<Calendar currentDateRaw={new Date(2024, 0, 16)} sort={false} />*/}
      {/*<Calendar currentDateRaw={new Date(2024, 0, 16)} />*/}
      {/*-------------------------------- --------------------------------*/}
      {/*<Calendar currentDateRaw={new Date(2024, 0, 17)} sort={false} />*/}
      {/*<Calendar currentDateRaw={new Date(2024, 0, 17)} />*/}
      {/*-------------------------------- --------------------------------*/}
      {/*<Calendar currentDateRaw={new Date(2024, 0, 18)} sort={false} />*/}
      {/*<Calendar currentDateRaw={new Date(2024, 0, 18)} />*/}
      {/*-------------------------------- --------------------------------*/}
      {/*<Calendar currentDateRaw={new Date(2024, 0, 28)} sort={false} />*/}
      {/*<Calendar currentDateRaw={new Date(2024, 0, 28)} />*/}
      {/*--------------------------------*/}
      {/*<Calendar currentDateRaw={new Date(2024, 0, 31)} sort={false} />*/}
      {/*<Calendar currentDateRaw={new Date(2024, 0, 31)} />*/}
      --------------------------------
      {/*<Calendar currentDateRaw={new Date(2024, 1, 15)} />*/}
      {Array.from({ length: 12 }).map((_, i) => (
        <Calendar key={i} currentDateRaw={new Date(2024, i, 14)} />
      ))}
    </main>
  );
}
