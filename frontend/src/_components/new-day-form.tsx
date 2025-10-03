"use client";
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
import { useSchedule } from "@/_viewmodels/useSchedule";

const NewDayForm = () => {
  const { hoursPerDay, dayForm, submitDay, dayId } = useSchedule();

  return (
    <div>
      <DialogHeader>
        <DialogTitle>Configura horário de estudo</DialogTitle>
        <DialogDescription>
          Defina o horário de estudo para o dia selecionado.
        </DialogDescription>

        <div className="">
          <Form {...dayForm}>
            <form
              className="flex flex-col gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                submitDay(dayForm.getValues(), dayId!);
              }}
            >
              <FormField
                control={dayForm.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-grow w-full sm:w-auto">
                    <FormLabel
                      htmlFor="startTime"
                      className="text-sm font-normal"
                    >
                      Início:
                    </FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger className="w-full shadow-none border border-border text-foregrounds min-h-12">
                          <span className="text-foreground">
                            {field.value || "Selecione o horário"}
                          </span>
                        </SelectTrigger>
                        <SelectContent>
                          {hoursPerDay.map((hour, index) => (
                            <SelectItem
                              key={index}
                              value={hour.toLocaleTimeString()}
                            >
                              {hour.toTimeString().slice(0, 5)}
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
                        <SelectTrigger className="w-full shadow-none border border-border text-foregrounds  min-h-12">
                          <span className="text-foreground">
                            {field.value || "Selecione o horário"}
                          </span>
                        </SelectTrigger>
                        <SelectContent>
                          {hoursPerDay.map((hour, index) => (
                            <SelectItem
                              key={index}
                              value={hour.toLocaleTimeString()}
                            >
                              {hour.toTimeString().slice(0, 5)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>{" "}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Adicionar
              </Button>
            </form>
          </Form>
        </div>
      </DialogHeader>
    </div>
  );
};

export default NewDayForm;
