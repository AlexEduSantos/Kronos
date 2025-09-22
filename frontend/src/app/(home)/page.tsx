import PomodoroTimer from "@/_components/pomodoro-timer";
import HomeSchedule from "./_components/home-schedule";
import ScheduleProgress from "./_components/progress";
import StatisticCard from "./_components/statistc-cards";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center gap-2 p-2">
      <ScheduleProgress />
      <StatisticCard />
      <HomeSchedule />
      <PomodoroTimer />
    </main>
  );
}
