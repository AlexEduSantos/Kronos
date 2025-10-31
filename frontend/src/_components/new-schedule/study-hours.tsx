import { format } from "date-fns";
import { Card, CardContent } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";

type Props = {
  hoursPerDay: Date[];
  newSchedule: any;
  setNewSchedule: (v: any) => void;
};

const StudyHours = ({ hoursPerDay, newSchedule, setNewSchedule }: Props) => {
  return (
    <Card className="p-2 py-4 w-full">
      <CardContent className="p-0 flex flex-col gap-4">
        <h2 className="text-sm font-semibold">Horário de Estudo</h2>
        <div className="flex  sm:flex-row items-center gap-6 text-muted-foreground">
          <Select
            onValueChange={(e) =>
              setNewSchedule({ ...newSchedule, studyStartTime: e })
            }
          >
            <SelectTrigger className="w-full shadow-none border border-border min-h-12">
              <span className="text-foreground">
                {newSchedule.studyStartTime || "Selecione o horário"}
              </span>
            </SelectTrigger>
            <SelectContent>
              {hoursPerDay.map((hour) => (
                <SelectItem key={hour.getTime()} value={format(hour, "HH:mm")} >
                  {format(hour, "HH:mm")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(e) =>
              setNewSchedule({ ...newSchedule, studyEndTime: e })
            }
          >
            <SelectTrigger className="w-full shadow-none border border-border min-h-12">
              <span className="text-foreground">
                {newSchedule.studyEndTime || "Selecione o horário"}
              </span>
            </SelectTrigger>
            <SelectContent>
              {hoursPerDay.map((hour, index) => (
                <SelectItem key={index} value={format(hour, "HH:mm")}>
                  {format(hour, "HH:mm")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyHours;
