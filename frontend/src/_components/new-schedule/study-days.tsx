import { cn } from "@/_lib/utils";
import { ptBR } from "date-fns/locale";
import { ChevronDownIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";

type Props = {
  newSchedule: any;
  setNewSchedule: (v: any) => void;
  weeakDaysShort: string[];
  selectedWeekdays: string[];
  handleWeekdayToggle: (day: string) => void;
};

const StudyDays = ({
  newSchedule,
  setNewSchedule,
  weeakDaysShort,
  selectedWeekdays,
  handleWeekdayToggle,
}: Props) => {
  return (
    <Card className="p-2 py-4 w-full">
      <CardContent className="p-0 flex flex-col gap-2">
        <div className="flex flex-wrap gap-2 justify-between">
          {weeakDaysShort.map((day) => (
            <Button
              type="button"
              key={day}
              variant={selectedWeekdays.includes(day) ? "default" : "outline"}
              className={cn(
                " text-xs rounded-full aspect-square shadow-md min-w-[40px] h-10 flex items-center justify-center cursor-pointer",
                selectedWeekdays.includes(day)
                  ? "bg-primary text-primary-foreground hover:bg-primary"
                  : "bg-white text-foreground hover:bg-accent"
              )}
              onClick={() => handleWeekdayToggle(day)}
            >
              {day}
            </Button>
          ))}
        </div>

        {/* Range de datas de estudo */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-muted-foreground mt-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-between font-normal border border-border shadow-none text-foreground min-h-12",
                  !newSchedule.studyDate.from && "text-muted-foreground" // Use 'from' para verificar se há valor
                )}
              >
                {newSchedule.studyDate.from ? (
                  // Exibe o intervalo de datas, se ambas existirem
                  <span>
                    {newSchedule.studyDate.from.toLocaleDateString("pt-BR")}
                    {newSchedule.studyDate.to
                      ? ` - ${newSchedule.studyDate.to.toLocaleDateString(
                          "pt-BR"
                        )}`
                      : ""}
                  </span>
                ) : (
                  <span>Selecione o intervalo de estudo</span>
                )}
                <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-screen p-2 bg-transparent border-none shadow-none">
              <div className="flex items-center justify-center w-full h-fit bg-card p-2 ring ring-primary rounded-md shadow-md">
                <Calendar
                  mode="range"
                  selected={newSchedule.studyDate}
                  required
                  onSelect={(e) => {
                    setNewSchedule({
                      ...newSchedule,
                      studyDate: e,
                    });
                  }}
                  //   disabled={(date) => date < new Date()}
                  locale={ptBR}
                  startMonth={new Date()}
                  endMonth={newSchedule.testDay}
                  autoFocus
                  fixedWeeks={true}
                  captionLayout="dropdown"
                  classNames={{
                    root: "w-full bg-blue-500",
                    month_caption: "text-muted-foreground capitalize",
                    months_dropdown: "text-foreground capitalize",
                    week: "w-full flex items-center",
                    weekday: "w-full capitalize text-xs",
                    day: "w-full flex items-center justify-center ",
                    today:
                      "bg-secondary text-secondary-foreground rounded-full",
                    outside: "text-muted-foreground",
                    range_start: "",
                    range_end: "",
                    range_middle: "",
                    selected: "",
                  }}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyDays;
