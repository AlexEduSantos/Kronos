"use client";
import { Card, CardContent } from "@/_components/ui/card";
import { Progress } from "@/_components/ui/progress";
import { Skeleton } from "@/_components/ui/skeleton";
import { useSchedule } from "@/_viewmodels/useSchedule";

const ScheduleProgress = () => {
  const { onFocus: schedule, isScheduleLoading, progress } = useSchedule();

  if (isScheduleLoading)
    return (
      <>
        <Skeleton className="w-full h-16 bg-white" />
      </>
    );
  return (
    <Card className="p-0 w-full">
      <CardContent className="p-4 pt-2 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Progresso atual</h2>
          <p
            className={`text-lg font-semibold ${
              progress >= 100 ? "text-accent" : "text-muted-foreground"
            }`}
          >
            {progress}%
          </p>
        </div>
        <Progress value={progress} />
      </CardContent>
    </Card>
  );
};

export default ScheduleProgress;
