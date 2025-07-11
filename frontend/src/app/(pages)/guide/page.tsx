import { Button } from "@/_components/ui/button";
import Image from "next/image";

const Guide = () => {
  return (
    <div className="flex flex-col items-center justify-around h-screen text-secondary py-12">
      <Image src="/guide.png" alt="Guide Image" width={300} height={300} />
      <div className="w-full flex flex-col items-center">
        <h2 className="text-2xl text-center">
          Olá, <strong>Usuário.</strong>
        </h2>
        <p className="text-center w-2/3">
          Você não possui nenhum cronograma de estudos ativo. Vamos cadastrar um
          juntos!
        </p>
      </div>
      <Button className="text-lg w-2/4">Cadastrar</Button>
    </div>
  );
};

export default Guide;
