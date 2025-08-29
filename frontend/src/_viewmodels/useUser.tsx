"use client";

import { getUser } from "@/_services/user-service";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useUser() {
  const [hasToken, setHasToken] = useState(false);

  // Garante que a checagem do token só aconteça no lado do cliente
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("access_token")) {
      setHasToken(true);
    }
  }, []);

  // Usa o `react-query` para buscar os dados
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: hasToken, // A busca só é executada se houver um token
  });

  return { userData, isLoading, isError, error };
}
