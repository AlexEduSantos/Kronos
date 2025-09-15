"use client";
import { useSchedule } from "@/_viewmodels/useSchedule";
import ScheduleCard, { ScheduleCardProps } from "./schedule-card";

const ScheduleList = () => {
  const { schedules, isScheduleLoading, isScheduleError, scheduleError } =
    useSchedule();

  if (isScheduleLoading) return <div>Loading...</div>;

  return (
    <div className="p-2">
      {schedules.map((schedule: ScheduleCardProps) => (
        <ScheduleCard key={schedule.id} schedule={schedule} />
      ))}
    </div>
  );
};

export default ScheduleList;
