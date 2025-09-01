"use client";

import {
  eachDayOfInterval,
  endOfMonth,
  endOfYear,
  startOfMonth,
  startOfYear,
} from "date-fns";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getScheduleById,
  toggleStatusTopic,
  updateTopic,
} from "@/_services/schedule-services";

export type Data = {
  id: string;
  name: string;
  testDay: string;
  dailyStudyTime: {
    weekdays: string[];
    startTime: string;
    endTime: string;
  }[];
  studyStartDate: Date;
  studyEndDate: Date;
  days: {
    date: Date;
    topics: {
      id: string;
      name: string;
      weight: number;
      duration: number;
      status: boolean;
    }[];
  }[];
};

export function useScheduleDetails({
  selectedDay,
  setSelectedDay,
}: {
  selectedDay: Date;
  setSelectedDay: (date: Date) => void;
}) {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const today = new Date();

  // busca o cronograma pelo id
  const {
    data: schedule,
    isLoading,
    isError,
    error,
  } = useQuery<Data>({
    queryKey: ["schedule", id],
    queryFn: () => getScheduleById(id),
    enabled: !!id,
  });

  const queryClient = useQueryClient();

  // Armazene a mutation em uma constante
  const { mutate: mutateStatusTopic } = useMutation({
    mutationFn: (topicId: string) => toggleStatusTopic(topicId),
    onSuccess: () => {
      // Invalida a query 'schedules' para forçar uma nova busca
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      queryClient.refetchQueries({ queryKey: ["schedule", id] });
    },
    onError: (error) => {
      console.error("Erro ao atualizar o tópico:", error);
    },
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null); // Ref para o contêiner de rolagem
  const todayCardRef = useRef<HTMLDivElement>(null); // Ref para o Card do dia atual

  // Gera todos os dias do mês atual
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today),
  });

  const daysInAYear = eachDayOfInterval({
    start: startOfYear(today),
    end: endOfYear(today),
  });

  useEffect(() => {
    if (scrollContainerRef.current && todayCardRef.current) {
      const container = scrollContainerRef.current;
      const todayCard = todayCardRef.current;

      const scrollTo =
        todayCard.offsetLeft -
        container.offsetWidth / 2 +
        todayCard.offsetWidth / 2;

      container.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  }, []);

  const disciplinePerDay = useMemo(() => {
    if (!schedule) {
      return [];
    }
    return schedule.days.filter((day) => {
      // Converte a string da data para um objeto Date antes de comparar
      return new Date(day.date).toDateString() === selectedDay.toDateString();
    });
  }, [schedule, selectedDay]);

  const disciplinesTotal = useMemo(() => {
    return schedule?.days
      .map((day) => day.topics.length)
      .reduce((a, b) => a + b, 0);
  }, [schedule]);
  const checkedTotal = useMemo(() => {
    return schedule?.days
      .map((day) => day.topics.filter((topic) => topic.status === true).length)
      .reduce((a, b) => a + b, 0);
  }, [schedule]);
  const progress =
    disciplinesTotal && checkedTotal !== undefined
      ? Math.round((checkedTotal / disciplinesTotal) * 100)
      : 0;

  function toggleDiscipline(topicId: string) {
    if (!schedule) return;

    mutateStatusTopic(topicId);
  }

  return {
    schedule,
    today,
    scrollContainerRef,
    todayCardRef,
    daysInMonth,
    daysInAYear,
    disciplinePerDay,
    progress,
    toggleDiscipline,
  };
}
