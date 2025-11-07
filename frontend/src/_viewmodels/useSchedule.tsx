"use client";
import { ScheduleCardProps } from "@/_components/schedule-card";
import {
  useScheduleMutations,
  useScheduleQuery,
  useSchedulesQuery,
} from "@/_queries/useScheduleQuery";
import {
  DaysFormData,
  daysFormSchema,
  NewScheduleFormData,
  newScheduleFormSchema,
  ScheduleFormData,
  scheduleFormSchema,
  TopicsFormData,
  topicsFormSchema,
} from "@/_schemas/scheduleSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  eachDayOfInterval,
  eachHourOfInterval,
  endOfDay,
  endOfMonth,
  endOfYear,
  isBefore,
  isPast,
  isSameDay,
  startOfDay,
  startOfMonth,
  startOfYear,
} from "date-fns";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export type Topic = {
  name: string;
  dayId: string;
  weight: number;
  duration: number;
};
type Days = {
  date: Date;
  scheduleId: string;
  topics: Topic[];
  endTime: string;
  startTime: string;
};

export type NewScheduleType = {
  name: string;
  position: string;
  testDay: Date | undefined;
  document: File;
  studyStartTime: string;
  studyEndTime: string;
  studyDate: {
    from: Date | undefined;
    to?: Date | undefined;
  };
  selectedWeekdays: string[];
};

export const useSchedule = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSchedules, setFilteredSchedules] = useState<
    ScheduleCardProps[]
  >([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [scheduleInFocus, setScheduleInFocus] = useState<boolean>(false);
  const [totalTopics, setTotalTopics] = useState(0);
  const [checkedTopics, setCheckedTopics] = useState(0);
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [step, setStep] = useState(1);
  const [dayId, setDayId] = useState<string | undefined>(undefined);
  const [newSchedule, setNewSchedule] = useState<NewScheduleType>({
    name: "",
    position: "",
    testDay: new Date(),
    document: {} as File,
    studyStartTime: "",
    studyEndTime: "",
    studyDate: { from: new Date(), to: new Date() },
    selectedWeekdays: [],
  } as NewScheduleType);

  // -------------- //
  //    QUERIES   //
  // -------------- //
  const { schedules } = useSchedulesQuery();
  const {
    focusSchedule,
    isFocusScheduleLoading,
    isFocusScheduleError,
    focusScheduleError,
  } = useSchedulesQuery();
  const { createTopicMutation, createDayMutation, toggleStatusTopicMutation } =
    useScheduleMutations();

  const { mutate: createTopic, isPending: isCreateTopicPending } =
    createTopicMutation;
  const { mutate: createDay, isPending: isCreateDayPending } =
    createDayMutation;
  const { mutate: toggleStatusTopic, isPending: isToggleStatusTopicPending } =
    toggleStatusTopicMutation;

  // -------------- //
  //     FUNÇÕES    //
  // -------------- //

  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const today = new Date();
  const { schedule, isScheduleLoading } = useScheduleQuery(id);

  // Calcular quantidade de tópicos e tópicos completados
  useEffect(() => {
    // checar se existe algum schedule em focus

    const inFocus = schedules?.map((schedule: ScheduleCardProps) => {
      return schedule.status === "Focus";
    });

    if (focusSchedule === null || inFocus?.includes(false)) {
      setScheduleInFocus(true);
    } else {
      setTotalTopics(0);
      setCheckedTopics(0);
      return;
    }

    const days = focusSchedule?.days ?? [];

    const totalTopics = days
      .map((day) => day.topics.length)
      .reduce((a, b) => a + b, 0);

    setTotalTopics(totalTopics);

    const checkedTopics = days
      .map((day) => day.topics.filter((topic) => topic.status).length)
      .reduce((a, b) => a + b, 0);

    setCheckedTopics(checkedTopics);
  }, [focusSchedule]);

  // Quantidade de dias até a prova
  const daysUntilExam = useMemo(() => {
    if (scheduleInFocus) {
      const testDay = focusSchedule?.testDay;
      const today = new Date();
      const examDate = new Date(testDay as string);
      const daysUntilExam = Math.ceil(
        (examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );
      return daysUntilExam;
    } else {
      return 0;
    }
    return null;
  }, [focusSchedule]);

  // Pesquisa
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

  // Scroll para o dia atual
  const scrollContainerRef = useRef<HTMLDivElement>(null); // Ref para o contêiner de rolagem
  const todayCardRef = useRef<HTMLDivElement>(null); // Ref para o Card do dia atual

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

  // Progresso
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

  const disciplinesInFocusTotal = useMemo(() => {
    if (scheduleInFocus) {
      return focusSchedule?.days
        .map((day) => day.topics.length)
        .reduce((a, b) => a + b, 0);
    }
  }, [focusSchedule]);
  const checkedInFocusTotal = useMemo(() => {
    if (scheduleInFocus) {
      return focusSchedule?.days
        .map(
          (day) => day.topics.filter((topic) => topic.status === true).length
        )
        .reduce((a, b) => a + b, 0);
    }
  }, [focusSchedule]);

  const progressInFocus =
    disciplinesInFocusTotal && checkedInFocusTotal !== undefined
      ? Math.round((checkedInFocusTotal / disciplinesInFocusTotal) * 100)
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

  const handleNextStep = async () => {
    // Valida apenas os campos do passo atual
    let isValid = false;
    if (step === 1) {
      isValid = await form.trigger(["name", "testDay"]);
    } else if (step === 2) {
      isValid = await form.trigger("document");
    } else if (step === 3) {
      isValid = await form.trigger([
        "selectedWeekdays",
        "studyRange",
        "studyStartTime",
        "studyEndTime",
      ]);
    }

    if (isValid) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step === 1) {
      return;
    } else {
      setStep(step - 1);
    }
  };

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

  // ======================
  // FORMS
  // ======================

  const form = useForm<NewScheduleFormData>({
    resolver: zodResolver(newScheduleFormSchema),
    defaultValues: {
      name: "",
      position: "",
      testDay: (() => {
        const date = new Date();
        date.setDate(date.getDate() + 1); // Default para amanhã
        return date;
      })(),
      document: {} as File, // Começa com uma disciplina vazia
      selectedWeekdays: [],
      studyRange: {
        from: new Date(),
        to: (() => {
          const date = new Date();
          date.setDate(date.getDate() + 1);
          return date;
        })(),
      },
      studyStartTime: "",
      studyEndTime: "",
    },
  });

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

  const submitDay = async (data: DaysFormData, scheduleId: string) => {
    if (currentDayId !== undefined) {
      toast.error("Dia já cadastrado.");
      setStep(2);
      return;
    }
    createDay({ scheduleId, data });
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
      const data = {
        name: topicData.name,
        weight: Number(topicData.weight),
        duration: Number(topicData.duration),
        status: topicData.status,
      };
      createTopic({ dayId, data });
      topicForm.reset();
    } else {
      toast.error("ID do dia não encontrado. Por favor, crie o dia primeiro.");
    }
  };

  const testDay = form.watch("testDay");
  const studyRange = {
    from: form.watch("studyRange.from"),
    to: form.watch("studyRange.to"),
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

  const onSubmit = async (data: NewScheduleFormData) => {
    const WEBHOOK_URL =
      "http://localhost:5677/webhook/aff2962c-c933-4487-8e47-b1ca7ea6ba6c";
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("position", data.position);
      formData.append("testDay", data.testDay.toISOString());
      formData.append("studyRangeFrom", data.studyRange.from.toISOString());
      formData.append("studyRangeTo", data.studyRange.to.toISOString());
      formData.append(
        "selectedWeekdays",
        JSON.stringify(data.selectedWeekdays)
      );
      formData.append("studyStartTime", data.studyStartTime);
      formData.append("studyEndTime", data.studyEndTime);
      formData.append("document", data.document);

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
      }

      // setLoading(true);

      const result = await response.json();

      if (!result) {
        toast.error("Erro ao criar agendamento.");
        throw new Error("Erro ao criar agendamento.");
      } else {
      }
    } catch (error) {
      console.error("Erro ao enviar dados para o n8n:", error);
      toast.error("Erro ao enviar dados para o n8n.");
    }
  };

  // Submit usando o estado local `newSchedule` (útil quando o formulário foi removido)
  const submitNewSchedule = async () => {
    const data = newSchedule as NewScheduleType;
    const WEBHOOK_URL =
      "http://localhost:5677/webhook/aff2962c-c933-4487-8e47-b1ca7ea6ba6c";
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("position", data.position);
      if (data.testDay) formData.append("testDay", data.testDay.toISOString());
      if (data.studyDate?.from)
        formData.append("studyRangeFrom", data.studyDate.from.toISOString());
      if (data.studyDate?.to)
        formData.append("studyRangeTo", data.studyDate.to.toISOString());
      formData.append(
        "selectedWeekdays",
        JSON.stringify(data.selectedWeekdays || [])
      );
      formData.append("studyStartTime", data.studyStartTime || "");
      formData.append("studyEndTime", data.studyEndTime || "");
      if (data.document) formData.append("document", data.document);

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
      }

      const result = await response.json();

      if (!result) {
        toast.error("Erro ao criar agendamento.");
        throw new Error("Erro ao criar agendamento.");
      } else {
        toast.success("Agendamento enviado com sucesso.");
      }
    } catch (error) {
      console.error("Erro ao enviar dados para o n8n:", error);
      toast.error("Erro ao enviar dados para o n8n.");
    }
  };

  return {
    today,
    searchTerm,
    setSearchTerm,
    filteredSchedules,
    statusFilter,
    setStatusFilter,
    totalTopics,
    checkedTopics,
    selectedDay,
    setSelectedDay,
    step,
    setStep,
    dayId,
    setDayId,
    newSchedule,
    setNewSchedule,
    schedule,
    isScheduleLoading,
    focusSchedule,
    daysUntilExam,
    getStatusText,
    getStatusColor,
    hoursPerDay,
    daysInMonth,
    daysInAYear,
    weeakDaysFull,
    weeakDaysShort,
    scrollContainerRef,
    todayCardRef,
    progress,
    disciplinePerDay,
    currentDayDisciplines,
    currentDayId,
    handleNextStep,
    handlePreviousStep,
    handleWeekdayToggle,
    form,
    selectedWeekdays: form.watch("selectedWeekdays"),
    scheduleForm,
    dayForm,
    submitDay,
    topicForm,
    submitTopic,
    studyStartTime,
    studyEndTime,
    isDisabledTestDay,
    isDisabledStudyStartDate,
    isDisabledStudyEndDate,
    onSubmit,
    submitNewSchedule,
    toggleStatusTopic,
    progressInFocus,
  };
};
