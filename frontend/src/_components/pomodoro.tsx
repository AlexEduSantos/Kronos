"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";

const PomodoroTimer = () => {
  const [modo, setModo] = useState<"study" | "break">("study");

  useEffect(() => {
    const totalTime = modo === "study" ? 25 : 5;
    setMinutes(totalTime);
    setSeconds(0);
  }, [modo]);

  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="w-full px-6">
      <div className="w-full rounded-md bg-primary text-primary-foreground p-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Switch
            checked={modo === "break"}
            onCheckedChange={(checked) => {
              setModo(checked ? "break" : "study");
            }}
            className="rotate-90"
          />
          <h2 className="text-2xl font-bold">
            {modo === "study" ? "Modo Estudo" : "Modo Descanso"}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center gap-2">
            <Button variant={"secondary"} className="w-full">
              Iniciar
            </Button>
            <Button variant={"secondary"} className="w-full">
              Pausar
            </Button>
          </div>
          <h2 className="text-2xl font-bold aspect-square min-w-[100px] rounded-full border border-primary-foreground/20 flex items-center justify-center p-4">
            {minutes}:{format(seconds, "00")}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
