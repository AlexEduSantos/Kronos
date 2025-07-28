// src/hooks/useNewScheduleViewModel.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  scheduleFormSchema,
  ScheduleFormData,
} from "../_schemas/scheduleSchema";
import { useState, useEffect } from "react";
import { isToday } from "date-fns";

const weeakDaysFull = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];
const weeakDaysShort = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export const useNewScheduleViewModel = () => {
  const form = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      name: "",
      testDay: (() => {
        const date = new Date();
        date.setDate(date.getDate() + 1); // Default para amanhã
        return date;
      })(),
      disciplines: [{ name: "", weight: 50 }], // Começa com uma disciplina vazia
      selectedWeekdays: [],
      studyStartDate: new Date(),
      studyEndDate: (() => {
        const date = new Date();
        date.setDate(date.getDate() + 1); // Default para amanhã
        return date;
      })(),
      studyStartTime: "09:00",
      studyEndTime: "17:00",
    },
  });

  const {
    watch,
    setValue,
    formState: { errors },
  } = form;

  // Watchers para os campos que precisam de lógica reativa
  const testDay = watch("testDay");
  const studyStartDate = watch("studyStartDate");

  // Geração das horas para os selects
  const hoursPerDay = Array.from({ length: 24 }, (_, i) => {
    const hour = i < 10 ? `0${i}` : i;
    return `${hour}:00`;
  });

  // Efeito para ajustar a data de fim de estudo automaticamente
  // A data de fim de estudo não pode ser anterior à data de início da prova
  useEffect(() => {
    if (testDay && studyStartDate) {
      if (testDay < studyStartDate) {
        // Se a data da prova for anterior ao início do estudo, ajuste a data de início do estudo
        // ou desconsidere, dependendo da sua regra de negócio.
        // Por enquanto, vamos garantir que studyEndDate não seja depois de testDay
        if (studyStartDate > testDay) {
          setValue("studyEndDate", testDay);
        }
      }
    }
  }, [testDay, studyStartDate, setValue]); // Adicionar setValue às dependências

  // Função para lidar com a seleção dos dias da semana
  const handleWeekdayToggle = (day: string) => {
    const currentSelected = form.getValues("selectedWeekdays");
    const updated = currentSelected.includes(day)
      ? currentSelected.filter((d) => d !== day)
      : [...currentSelected, day];

    // Mantém a ordem dos dias da semana
    const ordered = weeakDaysShort.filter((d) => updated.includes(d));
    setValue("selectedWeekdays", ordered);
  };

  // Funções para adicionar/remover disciplinas
  const addDiscipline = () => {
    setValue("disciplines", [
      ...form.getValues("disciplines"),
      { name: "", weight: 50 },
    ]);
  };

  const removeDiscipline = (index: number) => {
    const currentDisciplines = form.getValues("disciplines");
    setValue(
      "disciplines",
      currentDisciplines.filter((_, i) => i !== index)
    );
  };

  // Funções para disabled dates no calendário
  const isDisabledTestDay = (date: Date) => {
    return isToday(date) || date < new Date();
  };

  const isDisabledStudyStartDate = (date: Date) => {
    // Data de início do estudo não pode ser no passado
    return date.getTime() < new Date().setHours(0, 0, 0, 0); // Comparar apenas a data, ignorando hora
  };

  const isDisabledStudyEndDate = (date: Date) => {
    // Data final do estudo não pode ser anterior à data de início do estudo
    const fromDate = studyStartDate || new Date(); // Usa studyStartDate ou data atual como fallback
    return date < fromDate;
  };

  const onSubmit = (data: ScheduleFormData) => {
    console.log("Dados do formulário:", data);
    // Aqui você faria a requisição para o backend (NestJS)
    // Ex: axios.post('/api/schedules', data);
    // toast.success("Cronograma criado com sucesso!");
  };

  return {
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
    selectedWeekdays: watch("selectedWeekdays"), // Expor para renderização
    disciplines: watch("disciplines"), // Expor para renderização
    testDay: watch("testDay"),
    studyRange: { from: watch("studyStartDate"), to: watch("studyEndDate") }, // Expor para renderização
    studyStartTime: watch("studyStartTime"),
    studyEndTime: watch("studyEndTime"),
  };
};
