// src/schemas/scheduleSchema.ts
import { z } from "zod";

// Define o schema principal para o formulário de cronograma
export const scheduleFormSchema = z
  .object({
    name: z.string().min(1, "Nome do cronograma é obrigatório."),
    testDay: z
      .date({
        error: "A data da prova é obrigatória.",
      })
      .min(new Date(), "A data da prova não pode ser no passado."), // Garante que a data não seja anterior ao dia atual
    disciplines: z
      .array(
        z.object({
          name: z.string().min(1, "O nome da disciplina é obrigatório."),
          weight: z
            .number()
            .min(0, "O peso deve ser no mínimo 0.")
            .max(100, "O peso deve ser no máximo 100."),
        })
      )
      .optional(), // Permite que o campo seja opcional, mas se estiver presente, deve ter pelo menos uma disciplina
    aiInputText: z.string().optional(), // Campo de texto opcional
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

// Define o tipo TypeScript a partir do schema Zod
export type ScheduleFormData = z.infer<typeof scheduleFormSchema>;
