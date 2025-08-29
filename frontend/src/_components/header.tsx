"use client";
import { useUser } from "@/_viewmodels/useUser";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { BellDot, Loader2, User2Icon } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

const Header = () => {
  const { userData: user, isLoading, isError, error } = useUser();

  if (isLoading || isError || user === undefined) {
    return (
      <div className="w-full flex items-center justify-between bg-white fixed top-0 z-50">
        <Skeleton className="w-full h-16 bg-background/20 rounded-none flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin opacity-20" />
        </Skeleton>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center px-6 justify-between bg-white py-3 fixed top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full border border-solid text-primary-foreground flex items-center justify-center overflow-hidden relative">
          <Image
            src={user?.avatar}
            alt="Avatar"
            className="w-full h-full object-cover"
            fill
            loading="eager"
          />
        </div>
        <div className="leading-none">
          <span className="text-md text-primary-foreground leading-none">
            Olá, {user?.name}
          </span>
          <h1 className="text-lg font-semibold text-primary-foreground leading-none"></h1>
        </div>
      </div>
      <span className="w-10 h-10 rounded-full text-primary-foreground flex items-center justify-center overflow-hidden">
        <BellDot size={24} className=" " />
      </span>
    </div>
  );
};

export default Header;
