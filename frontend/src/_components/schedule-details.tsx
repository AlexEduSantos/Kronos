"use client";

import { useScheduleDetails } from "@/_viewmodels/useScheduleDetails";
import { usePathname } from "next/navigation";
import CalendarHorizontal from "./horizontal-calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { PenBoxIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useState } from "react";

const ScheduleDetails = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());

  const { schedule, disciplinePerDay } = useScheduleDetails({
    selectedDay,
    setSelectedDay,
  });

  if (!schedule || !disciplinePerDay) return null;

  console.log(disciplinePerDay, format(selectedDay, "dd/MM/yyyy"));

  return (
    <div className="flex flex-col gap-2 w-full">
      <h2 className="text-2xl font-bold text-primary-foreground">
        {schedule?.name}
      </h2>
      <p className="text-primary-foreground">
        Dia da prova: {format(schedule.testDay, "dd/MM/yyyy")}
      </p>
      <CalendarHorizontal
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      {disciplinePerDay.length > 0 ? (
        <Card className="w-full flex flex-col gap-2 p-2 border-none shadow-none">
          {disciplinePerDay.map((discipline) => (
            <div
              key={discipline.date.toDateString()}
              className="flex flex-col gap-2"
            >
              {discipline.topics.map((topic: any) => (
                <div
                  key={topic.id}
                  className="flex gap-2 items-center justify-between px-1"
                >
                  <div className="flex gap-2 items-center">
                    <Checkbox id={topic.id} className="borber border-border" />
                    <Label
                      htmlFor={topic.id}
                      className="text-primary-foreground text-md font-normal"
                    >
                      {topic.name}
                    </Label>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-fit w-fit aspect-square p-1 text-green-500"
                    >
                      <PenBoxIcon className="stroke-1" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-fit w-fit aspect-square p-1 text-destructive"
                    >
                      <Trash2Icon className="stroke-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </Card>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ScheduleDetails;
