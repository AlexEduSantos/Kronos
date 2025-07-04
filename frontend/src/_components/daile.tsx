import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";

const Daile = () => {
      const disciplines = [
    {
      name: "Disciplina 01",
      contents: ["Conteúdo 1", "Conteúdo 2", "Conteúdo 3"],
      progress: 0,
    },
    {
      name: "Disciplina 02",
      contents: ["Conteúdo 1", "Conteúdo 2", "Conteúdo 3"],
      progress: 0,
    },
  ];

  // Simulate progress for each discipline
  disciplines.forEach((discipline) => {
    const totalContents = discipline.contents.length;
    const completedContents = Math.floor(Math.random() * totalContents);
    discipline.progress = (completedContents / totalContents) * 100;
  });

  return (
    <div className="w-full px-6">
      <Card className="bg-primary text-primary-foreground p-4 rounded-lg shadow-md flex flex-col gap-2">
        <p className="">Disciplinas do dia</p>
        {disciplines.map((discipline, index) => (
          <Card
            key={index}
            className="bg-primary p-2 text-primary-foreground gap-1"
          >
            <div className="w-full flex items-center justify-between gap-2">
              <h2 className="text-lg font-bold w-fit">{discipline.name}</h2>
              <Progress value={discipline.progress} className="h-1 w-1/2" />
            </div>
            <ul className="pl-2 space-y-2">
              {discipline.contents.map((content, contentIndex) => (
                <li
                  key={contentIndex}
                  className="text-sm flex items-center gap-2"
                >
                  <Checkbox
                    className="rounded-full w-3 h-3 shadow border border-primary-foreground"
                    id={`content-${contentIndex}`}
                  />
                  <Label htmlFor={`content-${contentIndex}`}>{content}</Label>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </Card>
    </div>
  );
};

export default Daile;
