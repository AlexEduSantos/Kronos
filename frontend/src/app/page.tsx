import Header from "@/_components/header";
import Hello from "@/_components/hello";
import MiniSchedule from "@/_components/mini-schedule";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center">
      <Header />
      <Hello />
      <MiniSchedule />
    </main>
  );
}
