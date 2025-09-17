"use client";
import { useSchedule } from "@/_viewmodels/useSchedule";
import ScheduleCard, { ScheduleCardProps } from "./schedule-card";
import { PlusIcon, SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const ScheduleList = () => {
  const {
    isScheduleLoading,
    searchTerm,
    setSearchTerm,
    filteredSchedules,
    statusFilter,
    setStatusFilter,
  } = useSchedule();

  const router = useRouter();

  if (isScheduleLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-2 p-2 w-full">
      <div className="relative flex-1">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar cronogramas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-none bg-white rounded-lg shadow"
        />
      </div>
      <div className="w-full grid grid-cols-4 gap-2">
        <Button
          variant={statusFilter === "all" ? "secondary" : "outline"}
          size="sm"
          onClick={() => setStatusFilter("all")}
        >
          Todos
        </Button>
        <Button
          variant={statusFilter === "Active" ? "secondary" : "outline"}
          size="sm"
          onClick={() => setStatusFilter("Active")}
        >
          Ativos
        </Button>
        <Button
          variant={statusFilter === "Finished" ? "secondary" : "outline"}
          size="sm"
          onClick={() => setStatusFilter("Finished")}
        >
          Finalizados
        </Button>
        <Button
          variant={statusFilter === "Paused" ? "secondary" : "outline"}
          size="sm"
          onClick={() => setStatusFilter("Paused")}
        >
          Pausados
        </Button>
      </div>
      {filteredSchedules?.map((schedule: ScheduleCardProps) => (
        <ScheduleCard key={schedule.id} schedule={schedule} />
      ))}
      <Button
        className="bg-transparent shadow-none border-dashed border border-muted-foreground text-muted-foreground h-30"
        onClick={() => router.push("/new-schedule")}
      >
        <PlusIcon />
        <p>Criar cronograma</p>
      </Button>
    </div>
  );
};

export default ScheduleList;
