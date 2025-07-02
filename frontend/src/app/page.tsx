import Header from "@/_components/header";
import Hello from "@/_components/hello";
import MiniSchedule from "@/_components/mini-schedule";
import PomodoroTimer from "@/_components/pomodoro";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center">
      <Header />
      <div className="flex flex-col gap-4 items-center w-full">
        <Hello />
        <MiniSchedule />
        <PomodoroTimer />
      </div>
    </main>
  );
}
