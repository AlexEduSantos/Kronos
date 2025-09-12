import { apiRoute } from "@/_lib/utils";

export async function getProfile() {
  const response = await fetch(apiRoute + "/auth/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Falha ao buscar perfil");
  }
  return await response.json();
}
