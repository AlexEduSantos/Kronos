"use client";
import { Form, FormField } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useDetailsSchedule } from "@/_viewmodels/useSchedule";

const NewTopicForm = ({
  selectedDay,
  setSelectedDay,
}: {
  selectedDay: Date;
  setSelectedDay: (date: Date) => void;
}) => {
  const { topicForm, submitTopic } = useDetailsSchedule({
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
            <DialogClose asChild>
              <Button type="submit">Adicionar</Button>
            </DialogClose>
          </form>
        </Form>
      </DialogHeader>
    </div>
  );
};

export default NewTopicForm;
