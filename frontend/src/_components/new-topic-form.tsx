"use client";
import { useScheduleDetails } from "@/_viewmodels/useScheduleDetails";
import { useNewScheduleViewModel } from "@/_viewmodels/useNewScheduleViewModel";
import { Form, FormField } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

const NewTopicForm = ({
  selectedDay,
  setSelectedDay,
}: {
  selectedDay: Date;
  setSelectedDay: (date: Date) => void;
}) => {
  const { topicForm, submitTopic } = useScheduleDetails({
    selectedDay,
    setSelectedDay,
  });

  return (
    <div>
      <DialogHeader>
        <DialogTitle>Adicionar Tópico</DialogTitle>
        <DialogDescription>
          Adicione um tópico para o dia selecionado.
        </DialogDescription>

        <Form {...topicForm}>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              submitTopic(topicForm.getValues());
            }}
          >
            <FormField
              control={topicForm.control}
              name="name"
              render={({ field }) => (
                <Input
                  type="text"
                  id="name"
                  placeholder="Nome da disciplina"
                  {...field}
                />
              )}
            />
            <FormField
              control={topicForm.control}
              name="duration"
              render={({ field }) => (
                <Input
                  type="number"
                  id="name"
                  placeholder="Duração em minutos"
                  {...field}
                />
              )}
            />
            <FormField
              control={topicForm.control}
              name="weight"
              render={({ field }) => (
                <Input
                  type="number"
                  id="weight"
                  placeholder="Peso da disciplina"
                  {...field}
                />
              )}
            />
            <Button type="submit">Adicionar</Button>
          </form>
        </Form>
      </DialogHeader>
    </div>
  );
};

export default NewTopicForm;
