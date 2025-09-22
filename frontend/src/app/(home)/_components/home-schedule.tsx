"use client";

import AddTopicButton from "@/_components/add-topic-button";
import CalendarHorizontal from "@/_components/horizontal-calendar";
import { Button } from "@/_components/ui/button";
import { Card } from "@/_components/ui/card";
import { Checkbox } from "@/_components/ui/checkbox";
import { Label } from "@/_components/ui/label";
import { Skeleton } from "@/_components/ui/skeleton";
import { cn } from "@/_lib/utils";
import { useDetailsSchedule, useSchedule } from "@/_viewmodels/useSchedule";
import { se } from "date-fns/locale";
import { PenBoxIcon, Trash2Icon } from "lucide-react";

const HomeSchedule = () => {
  const {
    onFocus: schedule,
    isScheduleLoading,
    selectedDay,
    currentDayDisciplines,
    setSelectedDay,
  } = useSchedule();

  const { toggleDiscipline } = useDetailsSchedule({
    selectedDay,
    setSelectedDay,
  });

  if (isScheduleLoading)
    return (
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex gap-2">
          {Array.from({ length: 6 }, (_, i) => i).map((i) => (
            <Skeleton key={i} className="w-full h-[80px] bg-white" />
          ))}
        </div>
        <Skeleton className="w-full h-52 bg-white" />
        <Skeleton className="w-full h-10 bg-white" />
      </div>
    );

  return (
    <>
      <CalendarHorizontal
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      {currentDayDisciplines!.length > 0 ? (
        <div className="w-full flex flex-col gap-2">
          {/* Use um div simples para organizar os cards */}
          {currentDayDisciplines?.map((topic: any) => (
            <Card
              key={topic.id}
              className={cn(
                "flex flex-col p-4 shadow-md transition-all duration-300 w-full",
                topic.status
                  ? "bg-card/70 border-l-4 border-primary"
                  : "bg-card border-l-4 border-primary-foreground/50"
              )}
            >
              <div className="flex gap-3 items-center justify-between">
                <div className="flex gap-3 items-center">
                  <Checkbox
                    id={topic.id}
                    className="h-6 w-6 rounded-md border-border data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" // Estilo do checkbox
                    checked={topic.status}
                    onCheckedChange={() =>
                      toggleDiscipline({
                        topicId: topic.id,
                        scheduleId: schedule!.id,
                      })
                    }
                  />
                  <div className="flex flex-col justify-between">
                    <Label
                      htmlFor={topic.id}
                      className={cn(
                        "text-lg font-semibold cursor-pointer",
                        topic.status && "line-through text-muted-foreground"
                      )}
                    >
                      {topic.name}
                    </Label>
                    <div className="flex items-center gap-4">
                      {topic.duration && ( // Exibir duração se existir
                        <p className="text-xs text-muted-foreground mt-1">
                          Duração: {topic.duration}
                        </p>
                      )}
                      {topic.weight && ( // Exibir duração se existir
                        <p className="text-xs text-muted-foreground mt-1">
                          Peso: {topic.weight}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 items-center">
                  <Button
                    variant="ghost"
                    className="h-12 w-12 p-1 text-success hover:opacity-100" // Botões menores e mais discretos
                  >
                    <PenBoxIcon className="stroke-1" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 p-1 text-destructive  hover:opacity-100" // Botões menores e mais discretos
                  >
                    <Trash2Icon className="stroke-1" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          <AddTopicButton
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <Card className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground bg-card shadow-md h-[200px]">
            <p className="text-lg font-medium">
              Nenhum estudo programado para hoje.
            </p>
            <p className="text-sm">
              Que tal um descanso merecido ou revisar algo por conta própria?
            </p>
          </Card>
          <AddTopicButton
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
        </div>
      )}
    </>
  );
};

export default HomeSchedule;
