import { Button } from "@/_components/ui/button";
import { Card } from "@/_components/ui/card";
import { Separator } from "@/_components/ui/separator";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const CalendarPage = () => {
  return (
    <div className="relative w-full h-full flex flex-col gap-2 py-2">
      <Card className="w-full h-full flex flex-col p-2 border-none">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-primary-foreground">
            Meus cronogramas
          </h2>
          <Separator className="h-0.5 bg-primary-foreground/50" />
        </div>
        <div className="">
          <p className="text-gray-500 text-center">Nenhum cronograma encontrado.</p>
        </div>
      </Card>
      <Link href="/calendar/new">
        <Button className="rounded-full w-14 h-14 p-0 m-0 fixed bottom-20 right-4 flex items-center justify-center shadow-md z-10">
          <div className="flex items-center justify-center">
            <PlusIcon size={32} />
          </div>
        </Button>
      </Link>
    </div>
  );
};

export default CalendarPage;
