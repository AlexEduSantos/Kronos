"use client";

import { Button } from "@/_components/ui/button";
import { Card, CardContent, CardTitle } from "@/_components/ui/card";
import { Checkbox } from "@/_components/ui/checkbox";
import { Label } from "@/_components/ui/label";
import { Progress } from "@/_components/ui/progress";
import { mockData } from "@/_mock/data";
import { format } from "date-fns";
import { PenIcon, Trash2Icon } from "lucide-react";
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
      <CardTitle className="text-xl text-nowrap">{schedule.name}</CardTitle>
      <div className="flex items-center justify-between gap-2">
        <Progress value={progress} />
        <p className="text-sm">{progress}%</p>
      </div>
      <CardContent className="p-0">
        <p className="mb-4">
          Data da prova: {format(new Date(schedule.testDay), "dd/MM/yyyy")}
        </p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm text-primary-foreground font-bold gap-2 ">
            <div className="w-10">Status</div>
            <div className="w-full">Disciplina</div>
            <div className="w-8">Peso</div>
            <div className="w-8">Ação</div>
          </div>
          {schedule.disciplines.map((discipline, index) => (
            <div
              key={index}
              className={`text-sm flex items-center gap-2 ${
                discipline.checked ? "line-through text-muted-foreground" : ""
              }`}
            >
              <div className="flex gap-2 items-center min-w-[260px] w-full">
                <div className="w-10 flex items-center justify-center">
                  <Checkbox
                    id={`discipline-${index}`}
                    checked={discipline.checked}
                    onCheckedChange={() => toggleDiscipline(index)}
                    className="border border-border"
                  />
                </div>
                <Label
                  htmlFor={`discipline-${index}`}
                  className="line-clamp-1 font-normal"
                >
                  {discipline.name}
                </Label>
              </div>
              <p className="w-8 flex items-center justify-center font-semibold">{discipline.weight}</p>
              <div className="flex items-center justify-center gap-1 w-fit">
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-0 m-0 w-fit h-fit"
                >
                  <Trash2Icon size={16} className="stroke-1 text-red-500" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-0 m-0 w-fit h-fit"
                >
                  <PenIcon size={16} className="stroke-1 text-primary-foreground" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleDetails;
