"use client";
import { useScheduleDetails } from "@/_viewmodels/useScheduleDetails";
import { useNewScheduleViewModel } from "@/_viewmodels/useNewScheduleViewModel";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { Button } from "./ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

const NewDayForm = ({
  selectedDay,
  setSelectedDay,
}: {
  selectedDay: Date;
  setSelectedDay: (date: Date) => void;
}) => {
  const { dayForm, submitDay } = useScheduleDetails({
    selectedDay,
    setSelectedDay,
  });
  const { hoursPerDay } = useNewScheduleViewModel();

  return (
    <div>
      <DialogHeader>
        <DialogTitle>Configura horário de estudo</DialogTitle>
        <DialogDescription>
          Defina o horário de estudo para o dia selecionado.
        </DialogDescription>

        <Form {...dayForm}>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              submitDay(dayForm.getValues());
            }}
          >
            <div className="flex gap-2">
              <FormField
                control={dayForm.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-grow w-full sm:w-auto">
                    <FormLabel className="text-sm font-normal">
                      Início:
                    </FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger className="w-full shadow-none border border-border/20 text-foregrounds  min-h-12">
                          <span className="text-foreground">
                            {field.value || "Selecione o horário"}
                          </span>
                        </SelectTrigger>
                        <SelectContent>
                          {hoursPerDay.map((hour) => (
                            <SelectItem key={hour} value={hour}>
                              {hour}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={dayForm.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-grow w-full sm:w-auto">
                    <FormLabel className="text-sm font-normal">Fim:</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger className="w-full shadow-none border border-border/20 text-foregrounds  min-h-12">
                          <span className="text-foreground">
                            {field.value || "Selecione o horário"}
                          </span>
                        </SelectTrigger>
                        <SelectContent>
                          {hoursPerDay.map((hour) => (
                            <SelectItem key={hour} value={hour}>
                              {hour}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>{" "}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Adicionar</Button>
          </form>
        </Form>
      </DialogHeader>
    </div>
  );
};

export default NewDayForm;
