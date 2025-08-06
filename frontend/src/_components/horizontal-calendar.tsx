"use client";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card } from "./ui/card";
import { useEffect, useRef } from "react";

const CalendarHorizontal = () => {
  const today = new Date();
  const scrollContainerRef = useRef<HTMLDivElement>(null); // Ref para o contêiner de rolagem
  const todayCardRef = useRef<HTMLDivElement>(null); // Ref para o Card do dia atual

  // Gera todos os dias do mês atual
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today),
  });

  useEffect(() => {
    if (scrollContainerRef.current && todayCardRef.current) {
      const container = scrollContainerRef.current;
      const todayCard = todayCardRef.current;

      const scrollTo =
        todayCard.offsetLeft -
        container.offsetWidth / 2 +
        todayCard.offsetWidth / 2;

      container.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  }, []);

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
          const isCurrentDay = isSameDay(day, today);

          return (
            <Card
              key={index}
              ref={isCurrentDay ? todayCardRef : null}
              className={`border-none shadow-none min-w-[60px] min-h-[70px] flex flex-col gap-0.5 items-center justify-between p-2 text-secondary
                ${
                  isCurrentDay
                    ? "bg-primary text-primary-foreground"
                    : "bg-white text-secondary"
                }
              `}
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
