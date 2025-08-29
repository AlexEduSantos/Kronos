"use client";

import { getUser } from "@/_services/user-service";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser, // agora a assinatura bate com o esperado
  });

  return { userData, isLoading, isError, error };
}
