"use client";

import { ScheduleCardProps } from "@/_components/schedule-card";
import {
  DaysFormData,
  daysFormSchema,
  ScheduleFormData,
  scheduleFormSchema,
  TopicsFormData,
  topicsFormSchema,
} from "@/_schemas/scheduleSchema";
import {
  createDay,
  createTopic,
  getAllSchedules,
  getScheduleById,
  toggleStatusTopic,
} from "@/_services/schedule-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  eachDayOfInterval,
  eachHourOfInterval,
  endOfDay,
  endOfMonth,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfYear,
} from "date-fns";
import { usePathname } from "next/navigation";
import { use, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useSchedule = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSchedules, setFilteredSchedules] = useState<
    ScheduleCardProps[]
  >([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const {
    data: schedules,
    isLoading: isScheduleLoading,
    isError: isScheduleError,
    error: scheduleError,
  } = useQuery({
    queryKey: ["schedules"],
    queryFn: () => getAllSchedules(),
  });

  useEffect(() => {
    if (schedules) {
      const filtered = schedules.filter((schedule: ScheduleCardProps) => {
        const matchesSearch = schedule.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesStatus =
          statusFilter === "all" || schedule.status === statusFilter;
        return matchesSearch && matchesStatus;
      });

      setFilteredSchedules(filtered);
    } else {
      setFilteredSchedules([]);
    }
  }, [searchTerm, schedules, statusFilter]);

  const getStatusText = (status: string) => {
    switch (status) {
      case "Active":
        return "Ativo";
      case "Finished":
        return "Concluído";
      case "Paused":
        return "Pausado";
      case "Focus":
        return "Em Foco";
      case "Cancelled":
        return "Cancelado";
      default:
        return "Indefinido";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "active";
      case "Finished":
        return "finished";
      case "Paused":
        return "paused";
      case "Focus":
        return "focus";
      case "Cancelled":
        return "cancelled";
      default:
        return "active";
    }
  };

  return {
    schedules,
    isScheduleLoading,
    isScheduleError,
    scheduleError,
    filteredSchedules,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    getStatusText,
    getStatusColor,
  };
};

export const useDetailsSchedule = ({
  selectedDay,
  setSelectedDay,
}: {
  selectedDay: Date;
  setSelectedDay: (date: Date) => void;
}) => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const today = new Date();

  const [step, setStep] = useState(1);
  const [dayId, setDayId] = useState<string | undefined>(undefined);

  const {
    data: schedule,
    isLoading: isLoadingSchedule,
    isError: isErrorSchedule,
    error: errorSchedule,
  } = useQuery<ScheduleCardProps>({
    queryKey: ["schedule", id],
    queryFn: () => getScheduleById(id),
    enabled: !!id,
  });

  const queryClient = useQueryClient();

  // ======================
  // MUTAÇÕES DO REACT QUERY
  // ======================
  const { mutate: mutateStatusTopic } = useMutation({
    mutationFn: (topicId: string) => toggleStatusTopic(topicId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      queryClient.refetchQueries({ queryKey: ["schedule", id] });
    },
    onError: (error) => {
      console.error("Erro ao alterar o status do tópico:", error);
    },
  });

  const { mutate: createTopics } = useMutation({
    mutationFn: (data: any) => {
      const { dayId, ...topicData } = data;

      console.log(topicData);

      return createTopic(dayId, topicData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      queryClient.refetchQueries({ queryKey: ["schedule", id] });
    },
    onError: (error) => {
      console.error("Erro ao criar o tópico:", error);
    },
  });

  const { mutate: createNewDay } = useMutation({
    mutationFn: (data: any) => createDay(id, data),
    onSuccess: (response) => {
      setDayId(response.id);
      setStep(2);
      toast.success("Dia cadastrado com sucesso.");

      // ✅ Invalidação correta das queries
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      queryClient.refetchQueries({ queryKey: ["schedule", id] });
    },
    onError: (error) => {
      toast.error("Erro ao criar o dia.");
    },
  });

  // ======================
  // Funções
  // ======================

  const scrollContainerRef = useRef<HTMLDivElement>(null); // Ref para o contêiner de rolagem
  const todayCardRef = useRef<HTMLDivElement>(null); // Ref para o Card do dia atual

  const hoursPerDay = eachHourOfInterval({
    start: startOfDay(today),
    end: endOfDay(today),
  });

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

  const disciplinePerDay = useMemo(() => {
    if (!schedule) {
      return [];
    }
    return schedule.days.filter((day) => {
      // Converte a string da data para um objeto Date antes de comparar
      return new Date(day.date).toDateString() === selectedDay.toDateString();
    });
  }, [schedule, selectedDay]);

  const currentDayDisciplines =
    disciplinePerDay!.length > 0 ? disciplinePerDay![0].topics : [];

  const currentDayId = useMemo(() => {
    return schedule?.days.find((day) => {
      return new Date(day.date).toDateString() === selectedDay.toDateString();
    })?.id;
  }, [schedule, selectedDay]);

  useEffect(() => {
    if (currentDayId) {
      setDayId(currentDayId);
      setStep(2); // Vai direto para a etapa 2 se o dia já existe
    } else {
      setStep(1); // Fica na etapa 1 se for um novo dia
    }
  }, [currentDayId]);

  // ======================
  // FORMS
  // ======================

  const scheduleForm = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      name: "",
      testDay: new Date(),
      studyStartDate: new Date(),
      studyEndDate: new Date(),
      days: [],
    },
  });

  const dayForm = useForm<DaysFormData>({
    resolver: zodResolver(daysFormSchema),
    defaultValues: {
      date: selectedDay,
      startTime: "",
      endTime: "",
      topics: [],
    },
  });

  const submitDay = async (data: DaysFormData) => {
    if (currentDayId !== undefined) {
      toast.error("Dia já cadastrado.");
      setStep(2);
      return;
    }
    createNewDay(data);
    dayForm.reset();
  };

  const topicForm = useForm<TopicsFormData>({
    resolver: zodResolver(topicsFormSchema),
    defaultValues: {
      name: "",
      weight: 0,
      duration: 0,
      status: false,
    },
  });

  const submitTopic = (topicData: TopicsFormData) => {
    if (dayId !== undefined) {
      const dataToSend = {
        name: topicData.name,
        weight: Number(topicData.weight),
        duration: Number(topicData.duration),
        status: topicData.status,
        dayId: dayId,
      };
      createTopics(dataToSend);
      topicForm.reset();
    } else {
      toast.error("ID do dia não encontrado. Por favor, crie o dia primeiro.");
    }
  };

  return {
    schedule,
    isLoadingSchedule,
    isErrorSchedule,
    errorSchedule,
    today,
    scrollContainerRef,
    todayCardRef,
    daysInMonth,
    daysInAYear,
    currentDayDisciplines,
    progress,
    toggleDiscipline: mutateStatusTopic,
    topicForm,
    dayForm,
    scheduleForm,
    step,
    setStep,
    submitDay,
    submitTopic,
    selectedDay,
    hoursPerDay,
    setSelectedDay,
  };
};
