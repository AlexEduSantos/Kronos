import Daile from "@/_components/daile";
import CalendarHorizontal from "@/_components/horizontal-calendar";
import MiniSchedule from "@/_components/mini-schedule";
import PomodoroTimer from "@/_components/pomodoro";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center gap-2">      
      <div className="flex flex-col gap-2 items-center w-full p-2">
        <MiniSchedule />
        <CalendarHorizontal />
        <Daile />
        <PomodoroTimer />        
      </div>
    </main>
  );
}
