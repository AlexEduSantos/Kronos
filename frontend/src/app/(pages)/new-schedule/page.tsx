"use client";
import { Calendar } from "@/_components/ui/calendar";
import { Separator } from "@/_components/ui/separator";
import { useState } from "react";

const NewSchedule = () => {
  const [selectedWeekday, setSelectedWeekday] = useState<string[]>([]);
  const weeakDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  console.log(selectedWeekday);

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <form className="w-full max-w-md">
        <div className="flex flex-col gap-4">
          <input
            className="bg-white rounded-md w-full p-4 appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
            id="name"
            type="text"
            placeholder="Nome do Cronograma"
          />
          <input
            className="bg-white rounded-md w-full p-4 appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
            id="name"
            type="text"
            placeholder="Data da prova"
          />
          <textarea
            className="bg-white rounded-md w-full p-4 appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
            id="name"
            placeholder="Disciplinas e conteúdos"
          />
          <div className="w-full bg-white rounded-md p-4 flex flex-col gap-2">
            <h2 className="text-secondary/70">Dias de Estudo</h2>
            <Separator />
            <div className="flex gap-2 w-full">
              {weeakDays.map((day, index) => (
                <div
                  key={index}
                  className={` border text-secondary txt-xs rounded-full aspect-square w-full flex items-center justify-center cursor-pointer ${
                    selectedWeekday.includes(day)
                      ? "bg-primary border-transparent"
                      : "bg-white"
                  }`}
                  onClick={() => {
                    setSelectedWeekday((prev) => {
                      const updated = prev.includes(day)
                        ? prev.filter((d) => d !== day)
                        : [...prev, day];

                      // ordena conforme ordem original
                      return weeakDays.filter((d) => updated.includes(d));
                    });
                  }}
                >
                  {day}
                </div>
              ))}
            </div>
            <Calendar
              mode="range"
              min={2}
              excludeDisabled={true}
              captionLayout="dropdown"
              classNames={{
                caption: "text-secondary",
                table: "text-secondary",
                day: "text-secondary",
                cell: "text-secondary",
              }}
              className="w-full bg-transparent border-none p-0"
              locale={{ code: "pt-BR" }}
              styles={{
                day: {
                  backgroundColor: "white",
                  color: "black",
                },
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewSchedule;
