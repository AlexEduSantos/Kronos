import { id } from "date-fns/locale";

export const mockData = [
  {
    id: 1,
    name: "Cronograma de ENEM 2025",
    testDay: "2025-11-03T03:00:00.000Z",
    disciplines: [
      {
        name: "Matemática e suas Tecnologias",
        weight: 80,
        checked: true,
      },
      {
        name: "Linguagens, Códigos e suas Tecnologias",
        weight: 60,
        checked: false,
      },
      {
        name: "Ciências da Natureza e suas Tecnologias",
        weight: 75,
        checked: true,
      },
      {
        name: "Ciências Humanas e suas Tecnologias",
        weight: 50,
        checked: false,
      },
      {
        name: "Redação",
        weight: 90,
        checked: true,
      },
    ],
    aiInputText: "",
    selectedWeekdays: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    studyStartDate: "2025-08-01T03:00:00.000Z",
    studyEndDate: "2025-10-31T03:00:00.000Z",
    studyStartTime: "08:00",
    studyEndTime: "12:00",
    status: "true",
  },
  {
    id: 2,
    name: "Preparatório Concurso Polícia Civil",
    testDay: "2026-02-15T03:00:00.000Z",
    disciplines: [
      {
        name: "Direito Penal",
        weight: 90,
        checked: true,
      },
      {
        name: "Direito Processual Penal",
        weight: 85,
        checked: true,
      },
      {
        name: "Direito Constitucional",
        weight: 70,
        checked: true,
      },
      {
        name: "Língua Portuguesa",
        weight: 65,
        checked: true,
      },
      {
        name: "Informática",
        weight: 55,
        checked: true,
      },
    ],
    aiInputText: "",
    selectedWeekdays: ["Ter", "Qui", "Sáb"],
    studyStartDate: "2025-09-01T03:00:00.000Z",
    studyEndDate: "2026-02-10T03:00:00.000Z",
    studyStartTime: "19:00",
    studyEndTime: "22:00",
    status: "false",
  },
  {
    id: 3,
    name: "Revisão Final de TCC",
    testDay: "2025-09-10T03:00:00.000Z",
    disciplines: [
      {
        name: "Metodologia Científica",
        weight: 70,
        checked: false,
      },
      {
        name: "Formatação ABNT",
        weight: 80,
        checked: false,
      },
      {
        name: "Coesão e Coerência Textual",
        weight: 95,
        checked: false,
      },
    ],
    aiInputText:
      "Foco na revisão bibliográfica e argumentação de resultados. Necessário cobrir as normas da ABNT mais recentes para citações e referências. Preparar apresentação para defesa em 2 dias.",
    selectedWeekdays: ["Seg", "Qua", "Sex"],
    studyStartDate: "2025-08-25T03:00:00.000Z",
    studyEndDate: "2025-09-08T03:00:00.000Z",
    studyStartTime: "14:00",
    studyEndTime: "17:00",
    status: "false",
  },
];
