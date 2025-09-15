"use client";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { format } from "date-fns";
import { useSchedule } from "@/_viewmodels/useSchedule";

export type ScheduleCardProps = {
  id: string;
  name: string;
  testDay: string;
  studyStartDate: string;
  studyEndDate: string;
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

  return (
    <Card
      className="p-4 gap-2"
      onClick={() => {
        router.push(`/schedules/${schedule.id}`);
      }}
    >
      <CardHeader className="p-0">
        <CardTitle className="text-lg">{schedule.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <p>Data da prova: {format(new Date(schedule.testDay), "dd/MM/yyyy")}</p>
      </CardContent>
    </Card>
  );
};

export default ScheduleCard;
