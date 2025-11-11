"use client";

import { useSchedulesQuery } from "@/_queries/useScheduleQuery";
import { useEffect, useMemo, useState } from "react";

export const useHomeSchedule = () => {
  const [totalTopics, setTotalTopics] = useState(0);
  const [checkedTopics, setCheckedTopics] = useState(0);
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());

  const {
    focusSchedule,
    isFocusScheduleLoading,
    isFocusScheduleError,
    focusScheduleError,
  } = useSchedulesQuery();

  useEffect(() => {
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

  const daysUntilExam = useMemo(() => {
    const testDay = focusSchedule?.testDay;
    const today = new Date();
    const examDate = new Date(testDay as string);
    const daysUntilExam = Math.ceil(
      (examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysUntilExam;
  }, [focusSchedule]);

  const disciplinesInFocusTotal = useMemo(() => {
    const days = focusSchedule?.days ?? [];
    return days.map((day) => day.topics.length).reduce((a, b) => a + b, 0);
  }, [focusSchedule]);

  const checkedInFocusTotal = useMemo(() => {
    const days = focusSchedule?.days ?? [];
    return days
      .map((day) => day.topics.filter((topic) => topic.status === true).length)
      .reduce((a, b) => a + b, 0);
  }, [focusSchedule]);

  const progressInFocus =
    disciplinesInFocusTotal && checkedInFocusTotal !== undefined
      ? Math.round((checkedInFocusTotal / disciplinesInFocusTotal) * 100)
      : 0;

  const disciplinePerDay = useMemo(() => {
    if (!focusSchedule) {
      return [];
    }
    const days = focusSchedule.days ?? [];
    return days.filter((day) => {
      // Converte a string da data para um objeto Date antes de comparar
      return new Date(day.date).toDateString() === selectedDay.toDateString();
    });
  }, [focusSchedule, selectedDay]);

  const currentDayDisciplines =
    disciplinePerDay!.length > 0 ? disciplinePerDay![0].topics : [];

  const currentDayId = useMemo(() => {
    const days = focusSchedule?.days ?? [];
    return days.find((day) => {
      return new Date(day.date).toDateString() === selectedDay.toDateString();
    })?.id;
  }, [focusSchedule, selectedDay]);

  return {
    focusSchedule,
    isFocusScheduleLoading,
    isFocusScheduleError,
    focusScheduleError,
    totalTopics,
    checkedTopics,
    selectedDay,
    setSelectedDay,
    daysUntilExam,
    progressInFocus,
    currentDayDisciplines,
    currentDayId,
  };
};
