"use client";
import PomodoroTimer from "@/_components/pomodoro-timer";
import HomeSchedule from "./home-schedule";
import ScheduleProgress from "./progress";
import StatisticCard from "./statistc-cards";
import { useUser } from "@/_viewmodels/useUser";
import Image from "next/image";
import { Card } from "@/_components/ui/card";
import Link from "next/link";
import { Button } from "@/_components/ui/button";

const HomeCheck = () => {
  const { user } = useUser();

  if (!user) return null;
  if (user.schedules.length === 0) {
    return (
      <Card className="w-full h-fit flex justify-start items-center gap-2 p-4">
        <h2 className="text-xl text-center">
          Você ainda não possui nenhum <br /> cronograma de estudos.
        </h2>
        <div className="relative w-full aspect-square">
          <Image
            src="/no-study.jpg"
            alt="Guide Image"
            priority
            fill
            className="object-contain"
          />
        </div>
        <Link href="/new-schedule" className="w-full flex justify-center">
          <Button className="text-lg w-3/4 h-12 font-semibold">Cadastrar cronograma</Button>
        </Link>
      </Card>
    );
  } else {
    return (
      <>
        <ScheduleProgress />
        <StatisticCard />
        <HomeSchedule />
        <PomodoroTimer />
      </>
    );
  }
};

export default HomeCheck;
