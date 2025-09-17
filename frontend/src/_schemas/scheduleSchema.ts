// src/schemas/scheduleSchema.ts
import { date, z } from "zod";

export const newScheduleFormSchema = z
  .object({
    name: z.string().min(1, "Nome do cronograma é obrigatório."),
    testDay: z
      .date({
        error: "A data da prova é obrigatória.",
      })
      .min(new Date(), "A data da prova não pode ser no passado."), // Garante que a data não seja anterior ao dia atual
    document: z
      .file()
      .mime("application/pdf", { error: "O arquivo deve ser PDF." }),
    selectedWeekdays: z
      .array(z.string())
      .min(1, "Selecione pelo menos um dia de estudo."),
    studyStartDate: z
      .date({
        error: "A data de início do estudo é obrigatória.",
      })
      .min(new Date(), "A data de início não pode ser no passado."), // Garante que não seja no passado
    studyEndDate: z.date({
      error: "A data final do estudo é obrigatória.",
    }),
    studyStartTime: z.string().min(1, "Horário de início é obrigatório."),
    studyEndTime: z.string().min(1, "Horário final é obrigatório."),
  })
  .refine((data) => data.studyEndDate >= data.studyStartDate, {
    message: "A data final do estudo não pode ser anterior à data de início.",
    path: ["studyEndDate"], // Caminho do campo para o erro
  })
  .refine(
    (data) => {
      // Validação de horário, se a data for a mesma, o horário de início deve ser antes do final
      const startDate = data.studyStartDate.toDateString();
      const endDate = data.studyEndDate.toDateString();

      if (startDate === endDate) {
        // Assume formato "HH:MM" e compara como string (simples) ou converte para número
        return data.studyStartTime < data.studyEndTime;
      }
      return true; // Se datas diferentes, a validação de horário já é coberta pela data
    },
    {
      message:
        "O horário final deve ser depois do horário de início no mesmo dia.",
      path: ["studyEndTime"],
    }
  );

export type NewScheduleFormData = z.infer<typeof newScheduleFormSchema>;

export const topicsFormSchema = z.object({
  name: z.string().min(1, "O nome da disciplina é obrigatório."),
  weight: z
    .number()
    .min(0, "O peso deve ter no mínimo 0.")
    .max(100, "O peso deve ter no máximo 100."),
  duration: z.number().min(10, "A duração deve ter no mínimo 10 minutos."),
  status: z.boolean(),
  dayId: z.string(),
});

export type TopicsFormData = z.infer<typeof topicsFormSchema>;

export const daysFormSchema = z.object({
  date: z.date().min(new Date(), "A data deve ser no futuro."),
  startTime: z.string().min(1, "O horário de início é obrigatório."),
  endTime: z.string().min(1, "O horário final é obrigatório."),
  topics: z.array(topicsFormSchema).optional(),
});

export type DaysFormData = z.infer<typeof daysFormSchema>;

export const scheduleFormSchema = z.object({
  name: z.string().min(1, "O nome do cronograma é obrigatório."),
  testDay: z.date().min(new Date(), "A data da prova deve ser no futuro."),
  studyStartDate: z
    .date()
    .min(new Date(), "A data de início do estudo é obrigatória."),
  studyEndDate: z
    .date()
    .min(new Date(), "A data final do estudo é obrigatória."),
  days: z.array(daysFormSchema).optional(),
});

export type ScheduleFormData = z.infer<typeof scheduleFormSchema>;
