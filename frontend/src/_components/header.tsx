import { User2Icon } from "lucide-react";

const Header = () => {
  return (
    <div className="w-full h-20 bg-primary flex items-center p-4 justify-between">
      <h2 className="text-2xl font-bold text-white">LOGO</h2>
      <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
        <User2Icon />
      </span>
    </div>
  );
};

export default Header;
