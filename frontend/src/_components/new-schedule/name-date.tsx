import { cn } from "@/_lib/utils";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { ptBR } from "date-fns/locale";
import { useSchedule } from "@/_viewmodels/useSchedule";

const NameAndDate = ({newSchedule, setNewSchedule}: any) => {
  return (
    <Card className="p-2">
      <CardContent className="p-0 flex flex-col gap-4">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-2xl text-center font-bold">
            Informações do Cronograma
          </h2>
          <p className="text-muted-foreground text-md text-center">
            Vamos começar com as informações básicas do seu cronograma
          </p>
        </div>

        <Input
          placeholder="Digite o nome do cronograma"
          className="border border-background min-h-12"
          onChange={(e) => {
            setNewSchedule({
              ...newSchedule,
              name: e.target.value,
            });
          }}
        />

        <Input
          placeholder="Digite o nome do cargo pretendido"
          className="border border-background min-h-12"
          onChange={(e) => {
            setNewSchedule({
              ...newSchedule,
              position: e.target.value,
            });
          }}
        />

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-between font-normal border border-background min-h-12 text-foreground shadow-none",
                !newSchedule.testDay && "text-muted-foreground"
              )}
            >
              {newSchedule.testDay ? (
                newSchedule.testDay.toLocaleDateString("pt-BR")
              ) : (
                <span>Selecione a data da prova</span>
              )}
              <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-screen p-2 bg-transparent border-none shadow-none">
            <div className="flex items-center justify-center w-full h-fit bg-card p-2 ring ring-primary rounded-md shadow-md">
              <Calendar
                mode="single"
                selected={newSchedule.testDay}
                onSelect={(e) => setNewSchedule({ ...newSchedule, testDay: e })}
                captionLayout="dropdown"
                autoFocus
                startMonth={new Date()}
                endMonth={new Date(2050, 12)}
                locale={ptBR}
                classNames={{
                  month_caption: "text-muted-foreground capitalize",
                  months_dropdown: "text-foreground capitalize",
                  week: "w-full flex justify-between items-center gap-2",
                  weekday: "w-full capitalize text-xs",
                  day: "w-full flex items-center justify-center rounded-full p-2",
                  today: "rounded-full bg-secondary text-secondary-foreground",
                  outside: "text-muted-foreground/50",
                  selected: "bg-primary text-primary-foreground rounded-full",
                }}
              />
            </div>
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  );
};

export default NameAndDate;
