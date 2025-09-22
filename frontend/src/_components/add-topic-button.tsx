import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useDetailsSchedule } from "@/_viewmodels/useSchedule";
import NewDayForm from "./new-day-form";
import NewTopicForm from "./new-topic-form";

const AddTopicButton = ({
  selectedDay,
  setSelectedDay,
}: {
  selectedDay: Date;
  setSelectedDay: (date: Date) => void;
}) => {
  const { step } = useDetailsSchedule({ selectedDay, setSelectedDay });

  const teste = () => {
    if (step === 1) {
      return (
        <>
          <NewDayForm
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="shadow" >
          <PlusIcon />
          Adicionar Novo Tópico
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white border-none w-full">{teste()}</DialogContent>
    </Dialog>
  );
};

export default AddTopicButton;
