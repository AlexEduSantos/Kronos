"use client";
import { useUser } from "@/_viewmodels/useUser";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { BellDot, User2Icon } from "lucide-react";
import Image from "next/image";

const Header = () => {
  const { data, isLoading, isError, error } = useUser();

  if (isLoading) {
    return <div>Carregando dados do usuário...</div>;
  }

  if (isError) {
    console.error("Erro ao carregar dados do usuário:", error);
    return <div>Erro ao carregar dados. Por favor, tente novamente.</div>;
  }

  console.log("Dados do usuário:", data);

  return (
    <div className="w-full flex items-center px-6 justify-between bg-white py-3 fixed top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full border border-solid text-primary-foreground flex items-center justify-center overflow-hidden relative">
          <Image
            src={data?.avatar}
            alt="Avatar"
            className="w-full h-full object-cover"
            fill
            loading="eager"
          />
        </div>
        <div className="leading-none">
          <span className="text-md text-primary-foreground leading-none">
            Olá, {data?.name}
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
