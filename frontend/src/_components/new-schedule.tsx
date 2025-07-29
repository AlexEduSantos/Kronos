"use client";

import { Button } from "@/_components/ui/button";
import { Calendar } from "@/_components/ui/calendar";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/_components/ui/popover";
import { Separator } from "@/_components/ui/separator";
import { ChevronDownIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { ptBR } from "date-fns/locale";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/_components/ui/form";
import { cn } from "@/_lib/utils";
import { useNewScheduleViewModel } from "@/_viewmodels/useNewScheduleViewModel";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const NewSchedule = () => {
  const {
    form,
    hoursPerDay,
    weeakDaysShort,
    handleWeekdayToggle,
    addDiscipline,
    removeDiscipline,
    isDisabledTestDay,
    isDisabledStudyStartDate,
    isDisabledStudyEndDate,
    onSubmit,
    selectedWeekdays,
    disciplines,
    testDay,
    studyRange,
    studyStartTime,
    studyEndTime,
  } = useNewScheduleViewModel();

  return (
    <div className="flex flex-col items-center justify-center bg-background sm:p-6 min-h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-lg space-y-2 p-2 sm:p-6"
        >
          {/* Nome do Cronograma */}
          <div className="w-full bg-white rounded-md p-4 flex flex-col gap-2 shadow-sm">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground text-sm font-semibold">
                    Nome do Cronograma
                  </FormLabel>
                  <Separator className="opacity-20 h-0.5 my-1" />
                  <FormControl>
                    <Input
                      placeholder="Digite o nome do cronograma"
                      className="w-full border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Data da Prova */}
          <div className="w-full bg-card rounded-md p-4 flex flex-col gap-2 shadow-sm">
            <FormField
              control={form.control}
              name="testDay"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel className="text-muted-foreground text-sm font-semibold">
                    Data da Prova
                  </FormLabel>
                  <Separator className="opacity-20 h-0.5 my-1" />
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-between font-normal bg-input border border-primary-foreground/20 min-h-12 text-foreground shadow-none",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            field.value.toLocaleDateString("pt-BR")
                          ) : (
                            <span>Selecione a data da prova</span>
                          )}
                          <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-full p-0 border-none shadow-xl"
                      align="center" // Alterado para start para melhor visualização
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={isDisabledTestDay}
                        locale={ptBR}
                        initialFocus
                        captionLayout="dropdown"
                        classNames={{
                          month_caption: "text-muted-foreground capitalize",
                          months_dropdown: "text-foreground capitalize",
                          week: "w-full flex justify-between items-center gap-2",
                          weekday: "w-full capitalize text-xs",
                          day: "w-full flex items-center justify-center rounded-full p-2",
                          today:
                            "rounded-full bg-primary/40 text-primary-foreground",
                          outside: "text-muted-foreground/50",
                          selected:
                            "bg-primary text-primary-foreground rounded-full",
                        }}
                        className="w-full"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Disciplinas e Conteúdos */}
          <div className="w-full bg-card rounded-md p-4 flex flex-col gap-2 shadow-sm">
            <h2 className="text-muted-foreground text-sm font-semibold">
              Disciplinas e Conteúdos
            </h2>
            <Separator className="opacity-20 h-0.5 my-1" />

            <FormField
              control={form.control}
              name="disciplines"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Tabs defaultValue="manual" className="w-full flex flex-col gap-2">
                      <TabsList className="p-1 gap-1 bg-transparent border border-border/20 w-full h-fit">
                        <TabsTrigger value="manual" className="h-fit">
                          <p>Manual</p>
                        </TabsTrigger>
                        <TabsTrigger value="ia" className="h-fit">
                          <p>Automático</p>
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent
                        value="manual"
                        className="flex flex-col justify-end"
                      >
                        {disciplines.map((discipline, index) => (
                          <div
                            key={index}
                            className="flex items-end gap-2 mb-2"
                          >
                            <FormField
                              control={form.control}
                              name={`disciplines.${index}.name`} // Campo dinâmico
                              render={({ field }) => (
                                <FormItem className="flex-grow">
                                  <FormLabel
                                    className={cn(index > 0 && "sr-only")}
                                  >
                                    {index === 0 ? "Nome da Disciplina" : ""}
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Ex: Português, Matemática"
                                      className="w-full border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground text-base"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`disciplines.${index}.weight`} // Campo dinâmico
                              render={({ field }) => (
                                <FormItem className="w-24">
                                  <FormLabel
                                    className={cn(index > 0 && "sr-only")}
                                  >
                                    {index === 0 ? "Peso" : ""}
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="Peso (0-100)"
                                      className="w-full border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground text-base"
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(
                                          parseInt(e.target.value) || 0
                                        )
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeDiscipline(index)}
                              className=""
                            >
                              <Trash2Icon className="h-5 w-5 text-red-500" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          onClick={addDiscipline}
                          className="bg-white text-foreground/50 border-border/20 w-2/3"
                        >
                          <PlusIcon className="mr-2 h-4 w-4" /> Adicionar
                          Disciplina
                        </Button>
                      </TabsContent>
                      <TabsContent value="ia">
                        <div className="flex flex-col gap-2">
                          {field.value.map((discipline, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <Textarea
                                {...discipline}
                                className="border border-border/20 text-sm"
                                placeholder="Cole o edital aqui ou descreva os conteúdos"
                              />{" "}
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.formState.errors.disciplines && (
              <p className="text-sm font-medium text-destructive mt-2">
                {form.formState.errors.disciplines.message}
              </p>
            )}
          </div>

          {/* Dias de Estudo */}
          <div className="w-full bg-card rounded-md p-4 flex flex-col gap-3 shadow-sm">
            <h2 className="text-muted-foreground text-sm font-semibold">
              Dias de Estudo
            </h2>
            <Separator className="opacity-20 h-0.5 my-1" />
            <FormField
              control={form.control}
              name="selectedWeekdays"
              render={() => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-wrap gap-2 justify-between">
                      {weeakDaysShort.map((day, index) => (
                        <Button
                          type="button"
                          key={index}
                          variant={
                            selectedWeekdays.includes(day)
                              ? "default"
                              : "outline"
                          }
                          className={cn(
                            "border text-xs rounded-full aspect-square min-w-[40px] h-10 flex items-center justify-center cursor-pointer",
                            selectedWeekdays.includes(day)
                              ? "bg-primary text-primary-foreground border-transparent hover:bg-primary/90"
                              : "bg-white text-foreground border-border/20 hover:bg-accent"
                          )}
                          onClick={() => handleWeekdayToggle(day)}
                        >
                          {day}
                        </Button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Range de datas de estudo */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-muted-foreground mt-4">
              <FormField
                control={form.control}
                name="studyStartDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-grow w-full sm:w-auto">
                    <FormLabel className="text-xs">Início:</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-between font-normal bg-input border border-border/20 text-foreground min-h-12",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              field.value.toLocaleDateString("pt-BR")
                            ) : (
                              <span>Selecione a data</span>
                            )}
                            <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 border-none shadow-xl"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={isDisabledStudyStartDate}
                          locale={ptBR}
                          initialFocus
                          captionLayout="dropdown"
                          classNames={{
                            month_caption: "text-muted-foreground capitalize",
                            months_dropdown: "text-foreground capitalize",
                            week: "w-full flex justify-between items-center gap-2",
                            weekday: "w-full capitalize text-xs",
                            day: "w-full flex items-center justify-center rounded-full p-2",
                            today:
                              "rounded-full bg-primary/40 text-primary-foreground",
                            outside: "text-muted-foreground/50",
                            selected:
                              "bg-primary text-primary-foreground rounded-full",
                          }}
                          className="w-full p-2"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="studyEndDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-grow w-full sm:w-auto">
                    <FormLabel className="text-xs">Final:</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-between font-normal bg-input border border-border/20 text-foreground min-h-12",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              field.value.toLocaleDateString("pt-BR")
                            ) : (
                              <span>Selecione a data</span>
                            )}
                            <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 border-none shadow-xl"
                        align="end"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={isDisabledStudyEndDate}
                          locale={ptBR}
                          initialFocus
                          captionLayout="dropdown"
                          classNames={{
                            month_caption: "text-muted-foreground capitalize",
                            months_dropdown: "text-foreground capitalize",
                            week: "w-full flex justify-between items-center gap-2",
                            weekday: "w-full capitalize text-xs",
                            day: "w-full flex items-center justify-center rounded-full p-2",
                            today:
                              "rounded-full bg-primary/40 text-primary-foreground",
                            outside: "text-muted-foreground/50",
                            selected:
                              "bg-primary text-primary-foreground rounded-full",
                          }}
                          className="w-full p-2"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Horário de Estudo */}
          <div className="flex flex-col p-4 justify-between w-full bg-card rounded-md gap-2 shadow-sm">
            <h2 className="text-muted-foreground text-sm font-semibold">
              Horário de Estudo
            </h2>
            <Separator className="opacity-20 h-0.5 my-1" />
            <div className="flex flex-col sm:flex-row items-center gap-6 text-muted-foreground">
              <FormField
                control={form.control}
                name="studyStartTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-grow w-full sm:w-auto">
                    <FormLabel className="text-xs">Início:</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger className="w-full shadow-none border border-border/20 text-foregrounds  min-h-12">
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
                control={form.control}
                name="studyEndTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-grow w-full sm:w-auto">
                    <FormLabel className="text-xs">Final:</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger className="w-full shadow-none border border-border/20 text-foregrounds  min-h-12">
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
            </div>
          </div>
          <Button type="submit" className="w-full py-3 text-lg  min-h-12">
            Gerar Cronograma
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewSchedule;
