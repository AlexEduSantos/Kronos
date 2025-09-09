"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  console.log("isAuthenticated", isAuthenticated);

  useEffect(() => {
    // Verifique o token no localStorage ou cookies
    const token = localStorage.getItem("access_token");
    console.log("token", token);
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      // Redireciona para o login se não houver token e a rota não for pública
      if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/register"
      ) {
        router.push("/login");
      }
    }
  }, [router]);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
