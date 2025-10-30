"use client";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { format } from "date-fns";
import { useSchedule } from "@/_viewmodels/useSchedule";
import { Badge } from "./ui/badge";

export type ScheduleCardProps = {
  id: string;
  name: string;
  testDay: string;
  studyStartDate: string;
  studyEndDate: string;
  status: string;
  progress: string;
  days: [
    {
      id: string;
      date: string;
      startTime: string;
      endTime: string;
      topics: [
        {
          id: string;
          name: string;
          weight: number;
          duration: number;
          status: boolean;
        }
      ];
    }
  ];
};

const ScheduleCard = ({ schedule }: { schedule: ScheduleCardProps }) => {
  const router = useRouter();
  const { getStatusText, getStatusColor } = useSchedule();

  return (
    <Card
      className="p-4 gap-2"
      onClick={() => {
        router.push(`/schedules/${schedule.id}`);
      }}
    >
      <CardHeader className="p-0 flex flex-row justify-between items-center">
        <CardTitle className="text-lg">{schedule.name}</CardTitle>
        <Badge variant={getStatusColor(schedule.status)}>
          {getStatusText(schedule.status)}
        </Badge>
      </CardHeader>
      <CardContent className="p-0">
        <p>Data da prova: {format(new Date(schedule.testDay), "dd/MM/yyyy")}</p>
      </CardContent>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progresso</span>
          <span className="font-medium">{schedule.progress}%</span>
        </div>
        <div className="w-full bg-background overflow-hidden py-1 rounded-full h-2 flex items-center justify-start">
          <div
            className="bg-gradient-to-r from-primary to-accent rounded-full h-2 transition-all duration-300"
            style={{ width: `${schedule.progress}%` }}
          />
        </div>
      </div>
    </Card>
  );
};

export default ScheduleCard;
