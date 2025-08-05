"use client";

import { mockData } from "@/_mock/data";
import { eachDayOfInterval, endOfMonth, startOfMonth } from "date-fns";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type Data = {
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

interface ScheduleDetailsProps {
  id: string;
}

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

  const [schedule, setData] = useState<Data | undefined>(() => {
    const item = mockData.find((item) => item.id === parseInt(id));
    if (!item) return undefined;
    return {
      ...item,
      id: String(item.id),
      studyStartDate: new Date(item.studyStartDate),
      studyEndDate: new Date(item.studyEndDate),
      days: item.days.map((day) => ({
        ...day,
        date: new Date(day.date),
        topics: day.topics.map((topic) => ({
          ...topic,
          id: String(topic.id),
        })),
      })),
    };
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null); // Ref para o contêiner de rolagem
  const todayCardRef = useRef<HTMLDivElement>(null); // Ref para o Card do dia atual

  // Gera todos os dias do mês atual
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today),
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
    return schedule?.days.filter(
      (day) => day.date.toDateString() === selectedDay.toDateString()
    );
  }, [schedule, selectedDay]);

  return {
    schedule,
    today,
    scrollContainerRef,
    todayCardRef,
    daysInMonth,
    disciplinePerDay,
  };
}
