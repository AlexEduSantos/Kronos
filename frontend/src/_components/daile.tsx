import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

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
    <Tabs defaultValue="first" className="w-full">
      <TabsList className="bg-transparent border-none justify-between w-full flex gap-2">
        <TabsTrigger value="first" className="w-full">
          Disciplina Principal
        </TabsTrigger>
        <TabsTrigger value="second" className="w-full">
          Disciplina Secundária
        </TabsTrigger>
      </TabsList>
      <TabsContent value="first">
        <Card className="bg-white text-primary-foreground px-4 rounded-lg flex flex-col gap-2 border-none shadow-none py-1">
          {disciplines.map((discipline, index) => (
            <div
              key={index}
              className="bg-white text-primary-foreground gap-1 border-none space-y-2 px-2 py-1"
            >
              <div className="w-full flex items-center justify-between gap-2">
                <h2 className="text-sm font-semibold w-fit">
                  {discipline.name}
                </h2>
                <Progress value={discipline.progress} className="h-1 w-1/2" />
              </div>
              <ul className="pl-2 space-y-1">
                {discipline.contents.map((content, contentIndex) => (
                  <li
                    key={contentIndex}
                    className="text-sm flex items-center gap-2"
                  >
                    <Checkbox
                      className="w-3 h-3 shadow border border-primary-foreground"
                      id={`content-${contentIndex}`}
                    />
                    <Label
                      htmlFor={`content-${contentIndex}`}
                      className="text-sm font-light"
                    >
                      {content}
                    </Label>
                  </li>
                ))}
                <Separator className="opacity-20 mt-5" />
              </ul>
            </div>
          ))}
        </Card>
      </TabsContent>
      <TabsContent value="second"></TabsContent>
    </Tabs>
  );
};

export default Daile;
