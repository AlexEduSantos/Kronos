"use client";
import { Card, CardContent, CardTitle } from "@/_components/ui/card";
import { Form, FormField } from "@/_components/ui/form";
import { useAuth } from "@/_viewmodels/useAuth";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";

const LoginForm = () => {
  const { loginForm, onsubmitLogin } = useAuth();
  const { isSubmitting } = loginForm.formState;

  return (
    <>
      <Card className="w-full md:w-1/3 p-2 pb-4 flex flex-col gap-2">
        <CardTitle className="text-center text-primary-foreground">
          <h2 className="text-2xl font-bold">Faça seu Login</h2>
          <p className="text-sm font-normal">Bem-vindo de volta!</p>
        </CardTitle>
        <CardContent className="w-full">
          <Form {...loginForm}>
            <form
              className="flex flex-col gap-2 w-full"
              onSubmit={(e) => {
                e.preventDefault();
                onsubmitLogin();
              }}
            >
              <FormField
                control={loginForm.control}
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
                control={loginForm.control}
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
              <div className="w-full text-end">
                <Link href="/forgot-password">
                  <p className="text-sm md:text-xs text-primary-foreground">
                    Esqueceu sua senha?
                  </p>
                </Link>
              </div>
              <div className="flex gap-2 w-[98%]">
                <Button className="w-1/2" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Entrando..." : "Entrar"}
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

export default LoginForm;
