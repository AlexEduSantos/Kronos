"use client";
import { useNewScheduleViewModel } from "@/_viewmodels/useSchedule";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/_lib/utils";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  FileTextIcon,
  UploadIcon,
} from "lucide-react";
import { Calendar } from "./ui/calendar";
import { Label } from "./ui/label";
import { ptBR } from "date-fns/locale";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { useRouter } from "next/navigation";

const NewSchedule = () => {
  const {
    form,
    onSubmit,
    weeakDaysShort,
    selectedWeekdays,
    handleWeekdayToggle,
    hoursPerDay,
    isDisabledStudyStartDate,
    isDisabledStudyEndDate,
  } = useNewScheduleViewModel();
  const router = useRouter();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-2 p-2"
      >
        {/* Nome e data */}
        <Card className="p-2">
          <CardContent className="p-0 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div
                className="p-1 shadow-sm rounded-full"
                onClick={() => router.back()}
              >
                <ChevronLeftIcon />
              </div>
              <div>
                <h2 className="text-2xl text-center font-bold">
                  Informações do Cronograma
                </h2>
                <p className="text-muted-foreground text-md text-center">
                  Vamos começar com as informações básicas do seu cronograma
                </p>
              </div>
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Cronograma</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o nome do cronograma"
                      className="border border-background min-h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="testDay"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Data da Prova</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-between font-normal border border-background min-h-12 text-foreground shadow-none",
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
                    <PopoverContent className="w-full p-0 border-none shadow-xl">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        autoFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <Card className="p-2">
          <CardContent className="p-0 flex flex-col gap-4">
            <FormField
              control={form.control}
              name="document"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Edital do Concurso</FormLabel>
                  <FormDescription>
                    Envie o edital para que a IA identifique as disciplinas e
                    conteúdos.
                  </FormDescription>
                  <FormControl>
                    <div className="w-full flex flex-col justify-center items-center border-dashed border border-background py-4 rounded-md">
                      <input
                        type="file"
                        className="hidden"
                        accept="application/pdf"
                        id="file-upload"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            onChange(file);
                          }
                        }}
                        {...fieldProps}
                      />
                      <Button
                        variant={"ghost"}
                        className="flex flex-col items-center gap-2 h-fit"
                        asChild
                      >
                        <Label htmlFor="file-upload">
                          <div className="p-2 bg-background rounded-full">
                            <UploadIcon />
                          </div>
                          {value?.name ? (
                            <div className="flex items-center gap-2">
                              <FileTextIcon className="text-primary-foreground" />
                              <p className="text-foreground">{value.name}</p>
                            </div>
                          ) : (
                            <>
                              <p>Faça upload do edital</p>
                              <small className="text-muted-foreground text-xs">
                                São aceitos arquivos PDF de até 10Mb
                              </small>
                            </>
                          )}
                        </Label>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <Card className="p-2">
          <CardContent className="p-0 flex flex-col gap-4">
            <h2 className="text-muted-foreground text-sm font-semibold">
              Dias de Estudo
            </h2>
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
                              "w-full justify-between font-normal border border-border shadow-none text-foreground min-h-12",
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
                          autoFocus
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
                              "w-full justify-between font-normal shadow-none border border-border text-foreground min-h-12",
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
                          autoFocus
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
          </CardContent>
        </Card>

        {/* Horário de Estudo */}
        <Card className="p-2">
          <CardContent className="p-0 flex flex-col gap-4">
            <h2 className="text-muted-foreground text-sm font-semibold">
              Horário de Estudo
            </h2>
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
                        <SelectTrigger className="w-full shadow-none border border-border min-h-12">
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
                        <SelectTrigger className="w-full shadow-none border border-border min-h-12">
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
          </CardContent>
        </Card>
        <Button type="submit" className="rounded-lg">
          Criar Cronograma
        </Button>
      </form>
    </Form>
  );
};

export default NewSchedule;
