"use client";
import { ScheduleCardProps } from "@/_components/schedule-card";
import {
  createDay,
  createSchedule,
  createTopic,
  deleteDay,
  deleteSchedule,
  deleteTopic,
  getAllSchedules,
  getDayById,
  getScheduleById,
  getTopicById,
  toggleStatusTopic,
  updateDay,
  updateSchedule,
  updateTopic,
} from "@/_services/schedule-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useSchedulesQuery = () => {
  const {
    data: schedules,
    isLoading: isScheduleLoading,
    isError: isScheduleError,
    error: scheduleError,
  } = useQuery({
    queryKey: ["schedules"],
    queryFn: () => getAllSchedules(),
  });
  return { schedules, isScheduleLoading, isScheduleError, scheduleError };
};

export const useScheduleQuery = (id: string) => {
  const {
    data: schedule,
    isLoading: isScheduleLoading,
    isError: isErrorSchedule,
    error: errorSchedule,
  } = useQuery<ScheduleCardProps>({
    queryKey: ["schedule", id],
    queryFn: () => getScheduleById(id),
    enabled: !!id,
  });

  return { schedule, isScheduleLoading, isErrorSchedule, errorSchedule };
};

export const useDayQuery = (id: string) => {
  const {
    data: day,
    isLoading: isLoadingDay,
    isError: isErrorDay,
    error: errorDay,
  } = useQuery<ScheduleCardProps>({
    queryKey: ["day", id],
    queryFn: () => getDayById(id),
    enabled: !!id,
  });

  return { day, isLoadingDay, isErrorDay, errorDay };
};

export const useTopicQuery = (id: string) => {
  const {
    data: topic,
    isLoading: isLoadingTopic,
    isError: isErrorTopic,
    error: errorTopic,
  } = useQuery<ScheduleCardProps>({
    queryKey: ["topic", id],
    queryFn: () => getTopicById(id),
    enabled: !!id,
  });

  return { topic, isLoadingTopic, isErrorTopic, errorTopic };
};

export const useScheduleMutations = () => {
  const queryClient = useQueryClient();

  const createScheduleMutation = useMutation({
    mutationFn: (data: any) => createSchedule(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
    },
  });

  const updateScheuduleMutation = useMutation({
    mutationFn: ({ scheduleId, data }: { scheduleId: string; data: any }) =>
      updateSchedule(scheduleId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
    },
  });

  const deleteScheduleMutation = useMutation({
    mutationFn: (scheduleId: string) => deleteSchedule(scheduleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
    },
  });

  const createDayMutation = useMutation({
    mutationFn: ({ scheduleId, data }: { scheduleId: string; data: any }) =>
      createDay(scheduleId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      queryClient.invalidateQueries({
        queryKey: ["schedule", variables.scheduleId],
      });
    },
  });

  const updateDayMutation = useMutation({
    mutationFn: ({ dayId, data }: { dayId: string; data: any }) =>
      updateDay(dayId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
    },
  });

  const deleteDayMutation = useMutation({
    mutationFn: (dayId: string) => deleteDay(dayId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
    },
  });

  const createTopicMutation = useMutation({
    mutationFn: ({ dayId, data }: { dayId: string; data: any }) =>
      createTopic(dayId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
    },
  });

  const updateTopicMutation = useMutation({
    mutationFn: ({ topicId, data }: { topicId: string; data: any }) =>
      updateTopic(topicId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
    },
  });

  const deleteTopicMutation = useMutation({
    mutationFn: (topicId: string) => deleteTopic(topicId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
    },
  });

  const toggleStatusTopicMutation = useMutation({
    mutationFn: ({ topicId }: { topicId: string }) =>
      toggleStatusTopic(topicId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
    },
  });

  return {
    createScheduleMutation,
    updateScheuduleMutation,
    deleteScheduleMutation,
    createDayMutation,
    updateDayMutation,
    deleteDayMutation,
    createTopicMutation,
    updateTopicMutation,
    deleteTopicMutation,
    toggleStatusTopicMutation,
  };
};
