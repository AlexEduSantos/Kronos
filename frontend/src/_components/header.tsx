import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { BellDot, CalendarDaysIcon, MenuIcon, User2Icon } from "lucide-react";

const Header = () => {
  const today = format(new Date(), `dd ' de ' MMMM`, { locale: ptBR });

  return (
    <div className="w-full flex items-center px-6 justify-between bg-white py-3 fixed top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full border border-solid text-primary-foreground flex items-center justify-center overflow-hidden">
          <User2Icon size={40} className="stroke-1"/>
        </div>
        <div className="leading-none">
          <span className="text-md text-primary-foreground leading-none">Olá,</span>
          <h1 className="text-lg font-semibold text-primary-foreground leading-none">Alex</h1>
        </div>
      </div>
      <span className="w-10 h-10 rounded-full text-primary-foreground flex items-center justify-center overflow-hidden">
        <BellDot size={24} className=" "/>
      </span>
    </div>
  );
};

export default Header;
