"use client";
import { Card, CardContent, CardTitle } from "@/_components/ui/card";
import { Form, FormField } from "@/_components/ui/form";
import { useAuth } from "@/_viewmodels/useAuth";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";

const RegisterForm = () => {
  const { registerForm, onsubmitRegister } = useAuth();

  return (
    <>
      <Card className="w-full md:w-1/3 p-2 pb-4 flex flex-col gap-2">
        <CardTitle className="text-center text-primary-foreground">
          <h2 className="text-2xl font-bold">Faça seu Registro</h2>
          <p className="text-sm font-normal">Vamos iniciar sua jornada!</p>
        </CardTitle>
        <CardContent className="w-full">
          <Form {...registerForm}>
            <form
              className="flex flex-col gap-2 w-full"
              onSubmit={() => onsubmitRegister()}
            >
              <FormField
                control={registerForm.control}
                name="username"
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <Label
                      htmlFor="name"
                      className="text-md font-light text-primary-foreground/50"
                    >
                      Nome
                    </Label>
                    <Input
                      {...field}
                      type="text"
                      id="name"
                      className="border border-border/20"
                    />
                  </div>
                )}
              />
              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <Label
                      htmlFor="email"
                      className="text-md font-light text-primary-foreground/50"
                    >
                      Email
                    </Label>
                    <Input
                      {...field}
                      type="email"
                      id="email"
                      className="border border-border/20"
                    />
                  </div>
                )}
              />
              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <Label
                      htmlFor="password"
                      className="text-md font-light text-primary-foreground/50"
                    >
                      Senha
                    </Label>
                    <Input
                      {...field}
                      type="password"
                      id="password"
                      className="border border-border/20"
                    />
                  </div>
                )}
              />
              <FormField
                control={registerForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-md font-light text-primary-foreground/50"
                    >
                      Confirmar Senha
                    </Label>
                    <Input
                      {...field}
                      type="password"
                      id="confirmPassword"
                      className="border border-border/20"
                    />
                  </div>
                )}
              />
              <div className="flex gap-2 w-[98%] pt-2">
                <Button className="w-1/2" type="submit">
                  Registrar
                </Button>
                <Button
                  className="w-1/2 border border-border/20"
                  type="reset"
                  variant="ghost"
                >
                  Limpar
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default RegisterForm;
