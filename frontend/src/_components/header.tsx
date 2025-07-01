import { MenuIcon, User2Icon } from "lucide-react";

const Header = () => {
  return (
    <div className="w-full h-20 flex items-center p-4 justify-between shadow-md">
      <MenuIcon className=" cursor-pointer" size={24} />
      <span className="w-10 h-10 rounded-full border border-primary flex items-center justify-center overflow-hidden">
        <User2Icon size={40} className="stroke-1 " />
      </span>
    </div>
  );
};

export default Header;
