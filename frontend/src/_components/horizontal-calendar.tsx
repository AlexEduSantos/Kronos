import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card } from "./ui/card";

const CalendarHorizontal = () => {
  const today = new Date();

  // Gera todos os dias do mês atual
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today),
  });

  return (
    <div className="w-full  flex gap-2">
      <div className="flex overflow-x-auto scrollbar-hide gap-2">
        {daysInMonth.map((day, index) => {
          const dia = day.getDate();
          const mes = format(day, "LLL", { locale: ptBR });
          const semana = format(day, "EEE", { locale: ptBR })
            .replace(".", "")
            .slice(0, 3);
          return (
            <Card
              key={index}
              className={`border-none shadow-none min-w-[60px] min-h-[70px] flex flex-col gap-0.5 items-center justify-between p-2 text-secondary
                ${
                  dia === today.getDate()
                    ? "bg-primary text-primary-foreground"
                    : ""
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
