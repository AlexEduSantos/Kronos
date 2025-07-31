"use client";

import { Card, CardContent, CardTitle } from "@/_components/ui/card";
import { Checkbox } from "@/_components/ui/checkbox";
import { Progress } from "@/_components/ui/progress";
import { mockData } from "@/_mock/data";
import { format } from "date-fns";
import { usePathname } from "next/navigation";
import { useState } from "react";

const ScheduleDetails = () => {
  const [data, setData] = useState(mockData);
  const pathname = usePathname();
  const id = Number(pathname.split("/").pop());

  const scheduleIndex = data.findIndex((item) => item.id === id);
  const schedule = data[scheduleIndex];

  if (!schedule) return <div>Item not found</div>;

  const total = schedule.disciplines.length;
  const checkedTotal = schedule.disciplines.filter((d) => d.checked).length;
  const progress = Math.round((checkedTotal / total) * 100);

  const toggleDiscipline = (index: number) => {
    const updatedData = [...data];
    const targetDiscipline = updatedData[scheduleIndex].disciplines[index];

    updatedData[scheduleIndex].disciplines[index] = {
      ...targetDiscipline,
      checked: !targetDiscipline.checked,
    };

    setData(updatedData);
  };

  return (
    <Card className="border-none shadow-none p-4 flex flex-col gap-2">
      <CardTitle className="text-xl">{schedule.name}</CardTitle>
      <div className="flex items-center justify-between gap-2">
        <Progress value={progress} />
        <p className="text-sm">{progress}%</p>
      </div>
      <CardContent className="p-0">
        <p className="mb-4">
          Data da prova: {format(new Date(schedule.testDay), "dd/MM/yyyy")}
        </p>
        <div className="flex flex-col gap-2">
          {schedule.disciplines.map((discipline, index) => (
            <div
              key={index}
              className={`text-sm flex items-center justify-between ${
                discipline.checked ? "line-through text-muted-foreground" : ""
              }`}
            >
              <div className="flex gap-2 items-center">
                <Checkbox
                  checked={discipline.checked}
                  onCheckedChange={() => toggleDiscipline(index)}
                  className="border border-border"
                />
                <p>{discipline.name}</p>
              </div>
              <p>Peso: {discipline.weight}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleDetails;
