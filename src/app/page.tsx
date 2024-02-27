import Calendar from "@/components/Calendar/Calendar";

export default function Home() {
  return (
    <main className="p-24 flex flex-col items-center gap-8">

      {Array.from({ length: 12 }).map((_, i) => (
        <Calendar key={i} now={new Date(2024, i, 14)} />
      ))}
    </main>
  );
}
