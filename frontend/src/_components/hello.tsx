const Hello = () => {
  const today = new Date();

  const welcomeMessage = () => {
    if (today.getHours() < 12) {
      return "Bom dia!";
    } else if (today.getHours() < 18) {
      return "Boa tarde!";
    } else {
      return "Boa noite!";
    }
  };


  return (
    <div className="flex flex-col items-start justify-start w-full px-6 leading-none">
      <h2 className="">Olá, usuário!</h2>
      <p className="text-3xl">{welcomeMessage()}</p>
    </div>
  );
};

export default Hello;
