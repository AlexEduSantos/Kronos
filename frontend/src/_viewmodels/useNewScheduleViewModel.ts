// src/hooks/useNewScheduleViewModel.ts
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  scheduleFormSchema,
  ScheduleFormData,
} from "../_schemas/scheduleSchema";
import { useState, useEffect } from "react";
import { isBefore, isPast, isSameDay } from "date-fns";

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
const hoursPerDay = Array.from(
  { length: 24 },
  (_, i) => `${i.toString().padStart(2, "0")}:00`
);

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
      disciplines: [], // Começa com uma disciplina vazia
      aiInputText: "",
      selectedWeekdays: [],
      studyStartDate: new Date(),
      studyEndDate: (() => {
        const date = new Date();
        date.setDate(date.getDate() + 1); // Default para amanhã
        return date;
      })(),
      studyStartTime: "",
      studyEndTime: "",
    },
  });

  // Gerenciamento de Disciplinas (Field Array)
  const {
    fields: disciplines,
    append: addDiscipline,
    remove: removeDiscipline,
  } = useFieldArray({
    control: form.control,
    name: "disciplines",
  });

  // Estado para controlar a tab ativa (você pode passá-la para o onSubmit)
  const [currentTab, setCurrentTab] = useState<"manual" | "ia">("manual");
  const handleWeekdayToggle = (day: string) => {
    const currentWeekdays = form.getValues("selectedWeekdays");
    if (currentWeekdays.includes(day)) {
      form.setValue(
        "selectedWeekdays",
        currentWeekdays.filter((d) => d !== day),
        { shouldValidate: true } // Para revalidar o campo
      );
    } else {
      form.setValue("selectedWeekdays", [...currentWeekdays, day], {
        shouldValidate: true,
      });
    }
  };

  const testDay = form.watch("testDay");
  const studyRange = {
    from: form.watch("studyStartDate"),
    to: form.watch("studyEndDate"),
  };
  const studyStartTime = form.watch("studyStartTime");
  const studyEndTime = form.watch("studyEndTime");

  // Lógica para desabilitar datas no calendário
  const isDisabledTestDay = (date: Date) =>
    isPast(date) && !isSameDay(date, new Date());
  const isDisabledStudyStartDate = (date: Date) =>
    isPast(date) && !isSameDay(date, new Date());
  const isDisabledStudyEndDate = (date: Date) =>
    (studyRange.from && isBefore(date, studyRange.from)) || // Não pode ser antes da data de início
    (testDay && !isBefore(date, testDay)) || // Não pode ser após a data da prova
    (isPast(date) && !isSameDay(date, new Date())); // E também não pode ser no passado (exceto hoje)

  // Função onSubmit
  const onSubmit = async (data: ScheduleFormData) => {
    console.log("Dados do Formulário:", data);

    // Lógica para processar os dados com base na aba ativa
    if (currentTab === "manual") {
      console.log("Modo Manual - Disciplinas:", data.disciplines);
      // Aqui você enviaria `data.disciplines` para sua API ou processaria
    } else if (currentTab === "ia") {
      console.log("Modo IA - Texto:", data.aiInputText);
      // Aqui você enviaria `data.aiInputText` para sua API de IA ou processaria
    }
    // Lógica de envio (e.g., para uma API)
    // Exemplo: await api.post("/create-schedule", data);
    alert("Cronograma gerado! Veja o console para os dados.");
  };

  return {
    form,
    hoursPerDay,
    weeakDaysShort,
    handleWeekdayToggle,
    addDiscipline: () => addDiscipline({ name: "", weight: 0 }), // Garante o formato inicial
    removeDiscipline,
    isDisabledTestDay,
    isDisabledStudyStartDate,
    isDisabledStudyEndDate,
    onSubmit,
    selectedWeekdays: form.watch("selectedWeekdays"), // Passe o watch aqui para re-renderizar
    disciplines, // Use o fields do useFieldArray
    testDay,
    studyRange,
    studyStartTime,
    studyEndTime,
    currentTab, // Exponha o estado da tab
    setCurrentTab, // Exponha a função para mudar a tab
  };
};
