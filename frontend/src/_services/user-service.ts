import { apiRoute } from "@/_lib/utils";

export async function getUser() {
  try {
    const response = await fetch(apiRoute + "/user/user-by-id", {
      method: "GET",
      credentials: "include", // 👈 pega automaticamente o cookie "access_token"
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Sessão expirada. Por favor, faça login novamente.");
      }
      throw new Error("Falha ao buscar dados do usuário.");
    }

    return await response.json();
  } catch (error) {
    throw new Error("Falha ao buscar dados do usuário.");
  }
}
