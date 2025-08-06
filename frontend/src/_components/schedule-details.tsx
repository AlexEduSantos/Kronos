"use client";

import { useScheduleDetails } from "@/_viewmodels/useScheduleDetails";
import { usePathname } from "next/navigation";
import { format } from "date-fns";
import { Card } from "./ui/card"; // Importar Card
import { Checkbox } from "./ui/checkbox";
import { PenBoxIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useState } from "react";
import CalendarHorizontal from "@/app/(pages)/calendar/_components/horizontal-calendar";
import { Progress } from "./ui/progress";
import { cn } from "@/_lib/utils"; // Importar cn para condicional de classes

const ScheduleDetails = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());

  const { schedule, disciplinePerDay, progress, toggleDiscipline } =
    useScheduleDetails({
      selectedDay,
      setSelectedDay,
    });

  if (!schedule) {
    // Se schedule for null, mostre um loading ou mensagem
    return (
      <div className="text-primary-foreground text-center mt-8">
        Carregando cronograma...
      </div>
    );
  }

  // Verificar se há disciplinas para o dia selecionado
  const currentDayDisciplines =
    disciplinePerDay!.length > 0 ? disciplinePerDay![0].topics : [];

  return (
    <div className="flex flex-col gap-2 w-full p-0 sm:p-0">
      <Card className="flex flex-col gap-3 p-4 shadow-md bg-card border-none py-2">
        <h2 className="text-2xl font-extrabold text-primary-foreground mb-1">
          {schedule.name}
        </h2>
        <p className="text-md text-muted-foreground">
          Dia da prova: {format(schedule.testDay, "dd/MM/yyyy")}
        </p>
      </Card>
      {/* Seção de Progresso */}
      <Card className="flex flex-col gap-3 p-4 shadow-md bg-card border-none py-2">
        <div className="flex justify-between items-center">
          <p className="text-sm text-primary-foreground font-bold">
            Progresso Geral
          </p>
          <p className="text-lg font-bold text-primary-foreground">
            {progress}%
          </p>
        </div>
        <Progress value={progress} className="h-2" />{" "}
        {/* Altura menor para barra */}
      </Card>
      {/* Calendário Horizontal */}
      <CalendarHorizontal
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      {/* Lista de Disciplinas do Dia */}
      {currentDayDisciplines.length > 0 ? (
        <div className="flex flex-col gap-2">
          {/* Use um div simples para organizar os cards */}
          {currentDayDisciplines.map((topic: any) => (
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
                    className="h-6 w-6 rounded-md border-border text-primary-foreground data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" // Estilo do checkbox
                    checked={topic.status}
                    onCheckedChange={
                      () => toggleDiscipline(selectedDay, topic.id) // Passe selectedDay, não discipline.date
                    }
                  />
                  <div className="flex flex-col justify-between">
                    <Label
                      htmlFor={topic.id}
                      className={cn(
                        "text-lg font-semibold text-primary-foreground cursor-pointer",
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
                    className="h-12 w-12 p-1 text-green-500 opacity-70 hover:opacity-100" // Botões menores e mais discretos
                  >
                    <PenBoxIcon className="stroke-1" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 p-1 text-destructive opacity-70 hover:opacity-100" // Botões menores e mais discretos
                  >
                    <Trash2Icon className="stroke-1" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        // Empty state para dias sem disciplinas
        <Card className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground bg-card shadow-md h-[200px]">
          <p className="text-lg font-medium">
            Uhu! Nenhum estudo programado para hoje.
          </p>
          <p className="text-sm">
            Que tal um descanso merecido ou revisar algo por conta própria?
          </p>
        </Card>
      )}
    </div>
  );
};

export default ScheduleDetails;
