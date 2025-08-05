import { id } from "date-fns/locale";
import { date } from "zod";

export const mockData = [
  {
    id: 1,
    name: "Cronograma de ENEM 2025",
    testDay: "2025-11-03T03:00:00.000Z",
    dailyStudyTime: [
      {
        weekdays: [
          "segunda-feira",
          "terça-feira",
          "quarta-feira",
          "quinta-feira",
          "sexta-feira",
        ],
        startTime: "08:00",
        endTime: "10:00",
      },
    ],
    studyStartDate: "2025-09-01T03:00:00.000Z",
    studyEndDate: "2025-11-03T03:00:00.000Z",
    days: [
      {
        date: "2025-08-05T03:00:00.000Z",
        topics: [
          {
            id: 1,
            name: "Matemática",
            weight: 50,
            duration: 90,
            status: true,
          },
          {
            id: 2,
            name: "Português",
            weight: 50,
            duration: 30,
            status: false,
          },
        ],
      },
      {
        date: "2025-08-06T03:00:00.000Z",
        topics: [
          {
            id: 1,
            name: "Geografia",
            weight: 50,
            duration: 90,
            status: true,
          },
          {
            id: 2,
            name: "História",
            weight: 50,
            duration: 30,
            status: false,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Cronograma de ENEM 2024",
    testDay: "2024-11-03T03:00:00.000Z",
    dailyStudyTime: [
      {
        weekdays: [
          "segunda-feira",
          "terça-feira",
          "quarta-feira",
          "quinta-feira",
          "sexta-feira",
        ],
        startTime: "08:00",
        endTime: "10:00",
      },
    ],
    studyStartDate: "2024-09-01T03:00:00.000Z",
    studyEndDate: "2024-11-03T03:00:00.000Z",
    days: [
      {
        date: "2024-08-05T03:00:00.000Z",
        topics: [
          {
            id: 1,
            name: "Matemática",
            weight: 50,
            duration: 90,
            status: true,
          },
          {
            id: 2,
            name: "Português",
            weight: 50,
            duration: 30,
            status: false,
          },
        ],
      },
      {
        date: "2024-08-06T03:00:00.000Z",
        topics: [
          {
            id: 1,
            name: "Matemática",
            weight: 50,
            duration: 90,
            status: true,
          },
          {
            id: 2,
            name: "Português",
            weight: 50,
            duration: 30,
            status: false,
          },
        ],
      },
    ],
  },
];
