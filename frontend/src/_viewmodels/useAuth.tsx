"use client";
import {
  LoginFormData,
  loginFormSchema,
  RegisterFormData,
  registerFormSchema,
} from "@/_schemas/authSchema";
import { login, register } from "@/_services/auth-service";
import { useAuthStore } from "@/_store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useAuth = () => {
  const { login: storeLogin } = useAuthStore();

  const router = useRouter();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
    },
  });

  function onsubmitLogin() {
    loginForm.handleSubmit(async (data) => {
      try {
        const response = await login(data);
        toast.success("Login bem-sucedido!");

        storeLogin(response.access_token, response.user);

        router.push("/");
      } catch (error) {
        console.error("Erro no login:", error);
        toast.error("Erro no login");
      }
    })();
  }

  function onsubmitRegister() {
    registerForm.handleSubmit(async (data) => {
      try {
        const response = await register(data);
        toast.success("Registro bem-sucedido!");

        router.push("/login");
      } catch (error) {
        console.error("Erro no registro:", error);
        toast.error("Erro no registro");
      }
    })();
  }

  return { loginForm, registerForm, onsubmitLogin, onsubmitRegister };
};
