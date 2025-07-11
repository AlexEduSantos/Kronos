import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";

const MiniSchedule = () => {
  const progress = 0.75; // Example progress value (75%)
  return (
      <Card className="py-2 px-4 flex flex-row items-center justify-between bg-primary text-primary-foreground border-none shadow-none">
        <div className="flex flex-col items-start max-w-2/3 text-secondary gap-3">
          <CardTitle className="text-lg font-bold text-nowrap">
            Nome do Cronograma
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground clamp-2">
            Descrição do cronograma, incluindo detalhes sobre as atividades
            planejadas.
          </CardDescription>
          <Button className=" bg-white text-xs" variant={"ghost"}>Editar Cronograma</Button>
        </div>
        <CardContent className="relative w-[100px] h-[100px]">
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-2xl font-bold">{progress * 100}%</div>
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
        </CardContent>
      </Card>
  );
};

export default MiniSchedule;
