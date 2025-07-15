"use client";
import { Button } from "@/_components/ui/button";
import { Calendar } from "@/_components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/_components/ui/popover";
import { Separator } from "@/_components/ui/separator";
import { isToday } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";

const NewSchedule = () => {
  const [selectedWeekday, setSelectedWeekday] = useState<string[]>([]);
  const [testDay, setTestDay] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date;
  });
  const [studyRange, setStudyRange] = useState<{ from: Date; to: Date }>({
    from: new Date(),
    to: testDay,
  });
  const [open, setOpen] = useState(false);
  const weeakDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  useEffect(() => {
    if (testDay) {
      setStudyRange({
        from: new Date(),
        to: testDay,
      });
    }
  }, [testDay]);

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
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className="w-full justify-between font-normal bg-white border-none min-h-14 text-primary-foreground"
              >
                {testDay ? testDay.toLocaleDateString() : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-full overflow-hidden p-0 border-none shadow-xl "
              align="end"
              draggable="true"
            >
              <Calendar
                mode="single"
                required
                disabled={(date) => {
                  return isToday(date) || date < new Date();
                }}
                locale={ptBR}
                selected={testDay}
                onSelect={(date) => {
                  setTestDay(date);
                  setOpen(false);
                }}
                captionLayout="dropdown"
                classNames={{
                  month_caption: "text-secondary/70 capitalize",
                  months_dropdown: "text-primary-foreground capitalize",
                  week: "w-full flex justify-between items-center gap-2",
                  weekday: "w-full capitalize text-xs",
                  day: "w-full  flex items-center justify-center rounded-full p-2",
                  today: "rounded-full bg-primary text-primary-foreground",
                  outside: "text-muted-foreground/50",
                  selected: "bg-primary text-primary-foreground rounded-full",
                }}
                className="w-full p-2 "
              />
            </PopoverContent>
          </Popover>
          <textarea
            className="bg-white rounded-md w-full p-4 appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
            id="name"
            placeholder="Disciplinas e conteúdos"
          />
          <div className="w-full bg-white rounded-md p-4 flex flex-col gap-2">
            <h2 className="text-secondary/70">Dias de Estudo</h2>
            <Separator className="opacity-20 h-0.5" />
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
              locale={ptBR}
              selected={studyRange}
              excludeDisabled={true}
              captionLayout="dropdown"
              classNames={{
                month_caption: "text-secondary/70 capitalize",
                months_dropdown: "text-primary-foreground capitalize",
                week: "w-full flex justify-between items-center",
                weekday: "w-full capitalize text-xs",
                day: "w-full  flex items-center justify-center rounded-full",
                today: "rounded-full bg-primary text-primary-foreground",
                outside: "text-muted-foreground/50",
              }}
              className="w-full bg-transparent rounded-lg p-0 "
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewSchedule;
