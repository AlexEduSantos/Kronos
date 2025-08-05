"use client";
import { format } from "date-fns";
import { ptBR, se } from "date-fns/locale";
import { Card } from "./ui/card";
import { useScheduleDetails } from "@/_viewmodels/useScheduleDetails";

const CalendarHorizontal = ({
  selectedDay,
  setSelectedDay,
}: {
  selectedDay: Date;
  setSelectedDay: (date: Date) => void;
}) => {
  const {
    today,
    scrollContainerRef,
    todayCardRef,
    daysInMonth,
  } = useScheduleDetails({ selectedDay, setSelectedDay });

  return (
    <div className="w-full  flex gap-2">
      <div
        className="flex overflow-x-auto scrollbar-hide gap-2"
        ref={scrollContainerRef}
      >
        {daysInMonth.map((day, index) => {
          const dia = day.getDate();
          const mes = format(day, "LLL", { locale: ptBR });
          const semana = format(day, "EEE", { locale: ptBR })
            .replace(".", "")
            .slice(0, 3);

          return (
            <Card
              key={index}
              ref={
                day.toDateString() === today.toDateString()
                  ? todayCardRef
                  : null
              }
              className={`border-none shadow-none min-w-[60px] min-h-[70px] flex flex-col gap-0.5 items-center justify-between p-2 text-secondary
                ${
                  selectedDay.toDateString() === day.toDateString()
                    ? "bg-primary text-primary-foreground"
                    : "bg-white text-secondary"
                }
              `}
              onClick={() => {
                setSelectedDay(day);
              }}
            >
              <p className="text-xs">{mes}</p>
              <p className="text-lg font-bold">{dia}</p>
              <p className="text-xs">{semana}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarHorizontal;
