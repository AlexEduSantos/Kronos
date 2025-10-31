"use client";
import { Button } from "./ui/button";
import NameAndDate from "./new-schedule/name-date";
import Documents from "./new-schedule/document";
import StudyDays from "./new-schedule/study-days";
import StudyHours from "./new-schedule/study-hours";
import { useSchedule } from "@/_viewmodels/useSchedule";

const NewSchedule = () => {
  const {
    newSchedule,
    setNewSchedule,
    weeakDaysShort,
    selectedWeekdays,
    handleWeekdayToggle,
    hoursPerDay,
    submitNewSchedule,
    step,
    setStep,
  } = useSchedule();

  const today = new Date();

  // Validações por etapa
  const invalidStep1 =
    !newSchedule.name || !newSchedule.position || (newSchedule.testDay && newSchedule.testDay < today);
  const invalidStep2 = !newSchedule.document || !newSchedule.document?.name;
  const invalidStep3 =
    !(newSchedule.selectedWeekdays && newSchedule.selectedWeekdays.length > 0) ||
    !newSchedule.studyDate?.from ||
    !newSchedule.studyDate?.to;
  const invalidStep4 = !newSchedule.studyStartTime || !newSchedule.studyEndTime;

  switch (step) {
    case 1:
      return (
        <div className="w-full">
          <NameAndDate
            newSchedule={newSchedule}
            setNewSchedule={setNewSchedule}
          />
          <Button
            onClick={() => setStep(2)}
            disabled={invalidStep1}
            className="rounded-lg w-full mt-4"
          >
            Avançar
          </Button>
          {invalidStep1 && (
            <p className="text-red-500 text-sm mt-2">Preencha o nome, cargo e selecione uma data de prova válida.</p>
          )}
        </div>
      );
    case 2:
      return (
        <div className="w-full">
          <Documents newSchedule={newSchedule}
            setNewSchedule={setNewSchedule}/>
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button onClick={() => setStep(1)} className="rounded-lg mt-4">
              Voltar
            </Button>
            <Button
              onClick={() => setStep(3)}
              disabled={invalidStep2}
              className="rounded-lg mt-4"
            >
              Avançar
            </Button>
          {invalidStep2 && (
            <p className="text-red-500 text-sm mt-2 col-span-2">Faça o upload do edital (PDF) para continuar.</p>
          )}
          </div>
        </div>
      );
    case 3:
      return (
        <div className="w-full">
          <StudyDays
            newSchedule={newSchedule}
            setNewSchedule={setNewSchedule}
            weeakDaysShort={weeakDaysShort}
            selectedWeekdays={selectedWeekdays}
            handleWeekdayToggle={handleWeekdayToggle}
          />
          <Button
            onClick={() => setStep(4)}
            className="rounded-lg w-full mt-4"
          >
            Avançar
          </Button>
          {invalidStep3 && (
            <p className="text-red-500 text-sm mt-2">Selecione dias da semana e o intervalo de estudo.</p>
          )}
        </div>
      );
    case 4:
      return (
        <div className="w-full">
          <StudyHours hoursPerDay={hoursPerDay} newSchedule={newSchedule} setNewSchedule={setNewSchedule} />
          <Button onClick={() => submitNewSchedule()} disabled={invalidStep4} className="rounded-lg w-full mt-4">Criar Cronograma</Button>
          {invalidStep4 && (
            <p className="text-red-500 text-sm mt-2">Selecione horário de início e fim do estudo.</p>
          )}
        </div>
      );
  }
};

export default NewSchedule;
