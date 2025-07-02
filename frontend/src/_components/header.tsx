import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { BellDot, CalendarDaysIcon, MenuIcon, User2Icon } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  const today = format(new Date(), `dd ' de ' MMMM`, { locale: ptBR });

  return (
    <div className="w-full h-20 flex items-center px-6 justify-between">
      <div className="flex items-center gap-4 rounded-full bg-primary/30 p-1">
        <p className="w-full text-center pl-4">{today}</p>
        <Button variant={"secondary"} className="aspect-square w-10 h-10 rounded-full ">
          <CalendarDaysIcon />
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <span className="w-10 h-10 rounded-full border border-primary flex items-center justify-center overflow-hidden">
          <BellDot size={24} className="stroke-1 " />
        </span>
        <span className="w-10 h-10 rounded-full border border-primary flex items-center justify-center overflow-hidden">
          <User2Icon size={40} className="stroke-1 " />
        </span>
      </div>
    </div>
  );
};

export default Header;
