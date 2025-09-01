"use client";
import { getAllSchedules } from "@/_services/schedule-services";
import { useQuery } from "@tanstack/react-query";

export function useSchedules() {
  const {
    data: allSchedules,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["schedules"],
    queryFn: getAllSchedules,
  });

  return { allSchedules, isLoading, isError, error };
}
