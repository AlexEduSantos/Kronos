"use client";

import NewDayForm from "@/_components/new-day-form";
import NewTopicForm from "@/_components/new-topic-form";
import { useScheduleDetails } from "@/_viewmodels/useScheduleDetails";
import { use, useEffect, useState } from "react";

const CalendarPagination = ({
  selectedDay,
  setSelectedDay,
}: {
  selectedDay: Date;
  setSelectedDay: (date: Date) => void;
}) => {
  const { step } = useScheduleDetails({
    selectedDay,
    setSelectedDay,
  });

  if (step === 1) {
    return (
      <>
        <NewDayForm selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      </>
    );
  } else if (step === 2) {
    return (
      <>
        <NewTopicForm
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
      </>
    );
  }
};

export default CalendarPagination;
