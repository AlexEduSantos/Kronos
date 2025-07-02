import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

const MiniSchedule = () => {
  return (
    <div className="w-full h-44 px-6 flex flex-col gap-2">
      <div className="w-full h-full border border-primary rounded-md p-4 flex flex-col gap-2 justify-between">
        <div className="w-full  flex items-center justify-between">
          <h2 className="text-lg">TJ-PR</h2>
          <Button
            variant={"secondary"}
            className="rounded-full h-8 px-4 text-xs"
          >
            Editar
          </Button>
        </div>
        <div>
          <div className="w-full flex justify-between items-end">
            <p>Progresso</p>
            <small>50%</small>
          </div>
          <Progress value={50} className="w-full " />
        </div>
        <div className="w-full flex gap-2">
          <h2 className="font-semibold">Data da prova:</h2>
          <p>28 de Agosto de 2025</p>
        </div>
      </div>
    </div>
  );
};

export default MiniSchedule;
