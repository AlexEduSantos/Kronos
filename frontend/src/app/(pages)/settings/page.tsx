"use client";

import { useState } from "react";
import { Card } from "@/_components/ui/card";
import { Label } from "@/_components/ui/label";
import { Switch } from "@/_components/ui/switch";
import { Separator } from "@/_components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/_components/ui/radio-group";
import { Button } from "@/_components/ui/button";
import { ChevronRightIcon } from "lucide-react"; // Ícone para "mais detalhes" ou navegação

const SettingsPage = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dailyReminders, setDailyReminders] = useState(false);
  const [reminderTime, setReminderTime] = useState("18:00");
  const [examReminder, setExamReminder] = useState(true);
  const [daysBeforeExam, setDaysBeforeExam] = useState("3");
  const [appTheme, setAppTheme] = useState("system"); // 'light', 'dark', 'system'

  // Simula horários para lembretes
  const hoursOptions = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`
  );

  return (
    <div className="flex flex-col gap-2 p-2 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-primary-foreground">
        Configurações
      </h1>

      {/* Seção: Aparência */}
      <Card className="p-4 shadow-md bg-card flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-primary-foreground">
          Aparência
        </h2>
        <Separator className="opacity-20 m-0" />

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="theme-setting" className="text-primary-foreground">
              Tema do Aplicativo
            </Label>
            <RadioGroup
              value={appTheme}
              onValueChange={setAppTheme}
              className="flex gap-2 p-1 bg-input rounded-md"
              id="theme-setting"
            >
              <RadioGroupItem
                value="light"
                id="theme-light"
                className="sr-only"
              />
              <Label
                htmlFor="theme-light"
                className="px-3 py-1 text-sm rounded-sm cursor-pointer data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              >
                Claro
              </Label>
              <RadioGroupItem
                value="dark"
                id="theme-dark"
                className="sr-only"
              />
              <Label
                htmlFor="theme-dark"
                className="px-3 py-1 text-sm rounded-sm cursor-pointer data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              >
                Escuro
              </Label>
              <RadioGroupItem
                value="system"
                id="theme-system"
                className="sr-only"
              />
              <Label
                htmlFor="theme-system"
                className="px-3 py-1 text-sm rounded-sm cursor-pointer data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              >
                Sistema
              </Label>
            </RadioGroup>
          </div>
          {/* Você pode adicionar mais opções de aparência aqui, como esquema de cores */}
        </div>
      </Card>

      {/* Seção: Notificações */}
      <Card className="p-4 shadow-md bg-card flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-primary-foreground">
          Notificações
        </h2>
        <Separator className="opacity-20" />

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="notifications-enable"
              className="text-primary-foreground"
            >
              Ativar Notificações
            </Label>
            <Switch
              id="notifications-enable"
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          </div>

          {notificationsEnabled && (
            <>
              <div className="flex items-center justify-between mt-2">
                <Label
                  htmlFor="daily-reminders"
                  className="text-primary-foreground"
                >
                  Lembretes Diários de Estudo
                </Label>
                <Switch
                  id="daily-reminders"
                  checked={dailyReminders}
                  onCheckedChange={setDailyReminders}
                />
              </div>
              {dailyReminders && (
                <div className="flex items-center justify-between ml-6 mt-2">
                  <Label
                    htmlFor="reminder-time"
                    className="text-muted-foreground text-sm"
                  >
                    Horário do Lembrete
                  </Label>
                  <Select value={reminderTime} onValueChange={setReminderTime}>
                    <SelectTrigger className="w-[120px] bg-input text-foreground border-border/20">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {hoursOptions.map((hour) => (
                        <SelectItem key={hour} value={hour}>
                          {hour}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex items-center justify-between mt-2">
                <Label
                  htmlFor="exam-reminder"
                  className="text-primary-foreground"
                >
                  Lembrete de Dia da Prova
                </Label>
                <Switch
                  id="exam-reminder"
                  checked={examReminder}
                  onCheckedChange={setExamReminder}
                />
              </div>
              {examReminder && (
                <div className="flex items-center justify-between ml-6 mt-2">
                  <Label
                    htmlFor="days-before-exam"
                    className="text-muted-foreground text-sm"
                  >
                    Dias Antes da Prova
                  </Label>
                  <Select
                    value={daysBeforeExam}
                    onValueChange={setDaysBeforeExam}
                  >
                    <SelectTrigger className="w-[120px] bg-input text-foreground border-border/20">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 dia</SelectItem>
                      <SelectItem value="3">3 dias</SelectItem>
                      <SelectItem value="7">1 semana</SelectItem>
                      <SelectItem value="15">15 dias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </>
          )}
        </div>
      </Card>

      {/* Seção: Dados e Armazenamento */}
      <Card className="p-4 shadow-md bg-card flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-primary-foreground">
          Dados e Armazenamento
        </h2>
        <Separator className="opacity-20" />

        <div className="flex flex-col gap-2">
          <Button
            variant="ghost"
            className="justify-between text-primary-foreground hover:bg-accent"
          >
            Exportar Cronogramas
            <ChevronRightIcon className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button
            variant="ghost"
            className="justify-between text-primary-foreground hover:bg-accent"
          >
            Importar Cronogramas
            <ChevronRightIcon className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button
            variant="ghost"
            className="justify-between text-destructive hover:bg-accent"
          >
            Limpar Cache
            <ChevronRightIcon className="h-5 w-5 text-muted-foreground" />
          </Button>
          {/* Adicione um indicador de sincronização na nuvem se aplicável */}
          
          <div className="flex items-center justify-between">
            <Label htmlFor="cloud-sync" className="text-primary-foreground">Sincronização na Nuvem</Label>
            <Switch id="cloud-sync" checked={false} onCheckedChange={() => alert('Implementar sincronização!')} />
          </div>
          <p className="text-sm text-muted-foreground mt-1">Última sincronização: 5 min atrás</p>
         
        </div>
      </Card>

      {/* Seção: Geral / Sobre */}
      <Card className="p-4 shadow-md bg-card flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-primary-foreground">
          Geral
        </h2>
        <Separator className="opacity-20" />

        <div className="flex flex-col gap-4">
          <Button
            variant="ghost"
            className="justify-between text-primary-foreground hover:bg-accent"
          >
            Ajuda e Suporte
            <ChevronRightIcon className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button
            variant="ghost"
            className="justify-between text-primary-foreground hover:bg-accent"
          >
            Avalie o Aplicativo
            <ChevronRightIcon className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button
            variant="ghost"
            className="justify-between text-primary-foreground hover:bg-accent"
          >
            Política de Privacidade
            <ChevronRightIcon className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button
            variant="ghost"
            className="justify-between text-primary-foreground hover:bg-accent"
          >
            Termos de Serviço
            <ChevronRightIcon className="h-5 w-5 text-muted-foreground" />
          </Button>
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">Versão: 1.0.0</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;
