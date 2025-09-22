"use client";
import { Card, CardContent } from "@/_components/ui/card";
import { Skeleton } from "@/_components/ui/skeleton";
import { useSchedule } from "@/_viewmodels/useSchedule";
import { BookCheckIcon, BookCopyIcon, Calendar1Icon } from "lucide-react";

const StatisticCard = () => {
  const { daysUntilExam, totalTopics, checkedTopics, isScheduleLoading } =
    useSchedule();

  if (isScheduleLoading)
    return (
      <div className="w-full flex gap-2">
        <Skeleton className="w-full h-16 bg-white" />
        <Skeleton className="w-full h-16 bg-white" />
      </div>
    );

  return (
    <div className="w-full grid grid-cols-2 grid-auto-rows gap-2">
      <Card className="w-full p-0 col">
        <CardContent className="p-4 grid grid-cols-5 items-center">
          <p className="text-sm text-muted-foreground col-span-3">
            Dias até a prova
          </p>
          <div className="flex justify-end">
            <Calendar1Icon className="text-primary" />
          </div>
          <h3 className="text-3xl text-primary text-end font-semibold">
            {daysUntilExam}
          </h3>
        </CardContent>
      </Card>
      <Card className="w-full p-0">
        <CardContent className="p-4 grid grid-cols-5 items-center">
          <p className="text-sm text-muted-foreground col-span-3">
            Disciplinas finalizadas
          </p>
          <div className="flex justify-end">
            <BookCheckIcon className="text-accent" />
          </div>
          <h3 className="text-3xl text-accent text-end font-semibold">
            {checkedTopics}
          </h3>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticCard;
