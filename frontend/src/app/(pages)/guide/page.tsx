import { Button } from "@/_components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Guide = () => {
  return (
    <div className="flex flex-col items-center justify-around h-screen text-secondary py-12">
      <div className="relative w-full aspect-square ">
        <Image
          src="/guide.png"
          alt="Guide Image"
          fill
          className="object-contain"
        />
      </div>
      <div className="w-full flex flex-col items-center">
        <h2 className="text-2xl text-center">
          Olá, <strong>Usuário.</strong>
        </h2>
        <p className="text-center w-2/3">
          Você não possui nenhum cronograma de estudos ativo. Vamos cadastrar um
          juntos!
        </p>
      </div>
      <Link href="/guide/new-schedule" className="w-full flex justify-center">
        <Button className="text-lg w-2/4 h-12 font-bold">Cadastrar</Button>
      </Link>
    </div>
  );
};

export default Guide;
