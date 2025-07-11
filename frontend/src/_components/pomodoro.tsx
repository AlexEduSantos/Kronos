"use client";

import { format, set } from "date-fns";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { Pause, Play } from "lucide-react";

const PomodoroTimer = () => {
  const [modo, setModo] = useState<"study" | "break">("study");
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const totalTime = modo === "study" ? 25 : 5;

    setMinutes(totalTime);
    setIsActive(false);
    setSeconds(0);
  }, [modo]);

  useEffect(() => {
    let intervalo: NodeJS.Timeout | null = null;

    if (isActive) {
      intervalo = setInterval(() => {
        // Decrementa os segundos
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          // Se chegou a zero, reinicia o timer
          setIsActive(false);

          if (modo === "study") {
            setModo("break");
            setMinutes(5);
            setSeconds(0);
            toast.success("Tempo de estudo concluído! Hora do descanso.");
          } else {
            setModo("study");
            setMinutes(25);
            setSeconds(0);
            toast.success("Tempo de descanso concluído! Hora de estudar.");
          }
        }
      }, 1000);
    } else if (!isActive && (minutes !== 0 || seconds !== 0)) {
      if (intervalo) clearInterval(intervalo!);
    }
    return () => {
      if (intervalo) clearInterval(intervalo!);
    };
  }, [isActive, minutes, seconds, modo]);

  const formatTime = (value: number) => String(value).padStart(2, "0");

  const totalTime = modo === "study" ? 25 * 60 : 5 * 60;
  const currentTime = minutes * 60 + seconds;
  const progress = 1 - currentTime / totalTime;

  return (
    <div
      className={`w-full rounded-md p-2 flex items-center justify-between gap-2 bg-primary text-primary-foreground`}
    >
      <div className="flex items-center gap-2">
        <Switch
          id="modo"
          aria-label="Modo Pomodoro"
          checked={modo === "break"}
          onCheckedChange={(checked) => {
            setModo(checked ? "break" : "study");
          }}
          className="rotate-90 data-[state=unchecked]:bg-white data-[state=checked]:bg-secondary"
        />
        <Label className="text-xl font-bold cursor-pointer" htmlFor="modo">
          {modo === "study" ? "Modo Estudo" : "Modo Descanso"}
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-center gap-2">
          <Button
            variant={"ghost"}
            className="w-full min-w-[100px] bg-white "
            onClick={() => {
              setIsActive(!isActive);
            }}
          >
            {isActive ? (
              <div className="flex items-center">
                <Pause className="w-4 h-4 stroke-0 fill-secondary" />
                <p className="font-light">Pausar</p>
              </div>
            ) : (
              <div className="flex items-center">
                <Play className="w-4 h-4 stroke-0 fill-secondary" />
                <p className="font-light">Iniciar</p>
              </div>
            )}
          </Button>
          <Button
            variant={"ghost"}
            className="w-full bg-white font-light "
            onClick={() => {
              setIsActive(false);
              setModo("study");
              setMinutes(25);
              setSeconds(0);
              toast.info("Timer reiniciado.");
            }}
          >
            Resetar
          </Button>
        </div>
        <div className="relative w-[100px] h-[100px]">
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-2xl font-bold">
            {`${minutes}`.padStart(2, "0")}:{`${seconds}`.padStart(2, "0")}
          </div>
          <svg
            className={`absolute top-0 left-0 rotate-270`}
            width="100"
            height="100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#000"
              strokeWidth="1"
              fill="none"
              opacity={0.3}
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#fff"
              strokeLinecap="round"
              strokeWidth="6"
              fill="none"
              strokeDasharray={2 * Math.PI * 45}
              strokeDashoffset={(1 - progress) * 2 * Math.PI * 45}
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
