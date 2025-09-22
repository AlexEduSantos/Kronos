"use client";

import { useDetailsSchedule, useSchedule } from "@/_viewmodels/useSchedule";
import { Skeleton } from "./ui/skeleton";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { format } from "date-fns";
import { Progress } from "./ui/progress";
import CalendarHorizontal from "./horizontal-calendar";
import { cn } from "@/_lib/utils";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { PenBoxIcon, Trash2Icon } from "lucide-react";
import AddTopicButton from "./add-topic-button";
import { Badge } from "./ui/badge";

const ScheduleDetails = () => {
  const { selectedDay, currentDayDisciplines, setSelectedDay } = useSchedule();

  const { schedule, isLoadingSchedule, progress, toggleDiscipline } =
    useDetailsSchedule({ selectedDay, setSelectedDay });

  const { getStatusText, getStatusColor } = useSchedule();

  if (isLoadingSchedule)
    return (
      <div className="p-2 flex flex-col gap-2">
        <Skeleton className="w-full h-24 bg-white" />
        <Skeleton className="w-full h-14 bg-white" />
        <div className="w-full flex gap-2">
          {Array.from({ length: 5 }, (_, i) => i).map((i) => (
            <Skeleton key={i} className="w-full h-[80px] bg-white" />
          ))}
        </div>
        <Skeleton className="w-full h-52 bg-white" />
        <Skeleton className="w-full h-10 bg-white" />
      </div>
    );

  return (
    <div className="flex flex-col gap-2 w-full p-2 sm:p-0">
      <Card className="p-0">
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <CardTitle className="p-0 text-2xl font-bold">
              {schedule?.name}
            </CardTitle>
            <Badge variant={getStatusColor(schedule!.status)}>
              {getStatusText(schedule!.status)}
            </Badge>
          </div>
          <CardDescription className="text-md ">
            Dia da prova: {format(schedule?.testDay as string, "dd/MM/yyyy")}
          </CardDescription>
        </CardHeader>
      </Card>
      {/* Seção de Progresso */}
      <Card className="flex flex-col gap-2 p-4 shadow-md bg-card border-none py-2">
        <div className="flex justify-between items-center">
          <p className="text-sm  font-bold">Progresso Geral</p>
          <p className="text-lg font-bold ">{progress}%</p>
        </div>
        <Progress value={progress} className="h-2" />
        {/* Altura menor para barra */}
      </Card>
      {/* Calendário Horizontal */}
      <CalendarHorizontal
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      {/* Lista de Disciplinas do Dia */}
      {currentDayDisciplines!.length > 0 ? (
        <div className="flex flex-col gap-2">
          {/* Use um div simples para organizar os cards */}
          {currentDayDisciplines?.map((topic: any) => (
            <Card
              key={topic.id}
              className={cn(
                "flex flex-col p-4 shadow-md transition-all duration-300",
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
                    className="h-12 w-12 p-1 text-success hover:opacity-100"
                  >
                    <PenBoxIcon className="stroke-1" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 p-1 text-destructive  hover:opacity-100"
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
    </div>
  );
};

export default ScheduleDetails;
