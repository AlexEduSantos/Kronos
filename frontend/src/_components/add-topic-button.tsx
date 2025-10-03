import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import NewDayForm from "./new-day-form";
import NewTopicForm from "./new-topic-form";
import { useSchedule } from "@/_viewmodels/useSchedule";

const AddTopicButton = () => {
  const { step } = useSchedule();

  const teste = () => {
    if (step === 1) {
      return (
        <>
          <NewDayForm />
        </>
      );
    } else if (step === 2) {
      return (
        <>
          <NewTopicForm />
        </>
      );
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="shadow">
          <PlusIcon />
          Adicionar Novo Tópico
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white border-none w-full">
        {teste()}
      </DialogContent>
    </Dialog>
  );
};

export default AddTopicButton;
