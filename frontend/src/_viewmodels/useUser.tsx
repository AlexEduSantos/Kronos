"use client";

import { getProfile } from "@/_services/user-service";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getProfile(),
  });

  return { user, isLoading };
};
