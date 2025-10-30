import { apiRoute } from "@/_lib/utils";

interface UpdateProfilePayload {
  name: string;
  email: string;
  avatar?: File | undefined;
}

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

export async function updateProfile(data: UpdateProfilePayload) {
  let avatarUrl: string | null = null;

  // Se veio um File, envia primeiro o avatar e obtém a url
  if (data.avatar instanceof File) {
    avatarUrl = await uploadAvatar(data.avatar);
  }

  const response = await fetch(apiRoute + "/auth/profile", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      avatar: avatarUrl,
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => null);
    let errorMessage = "Falha ao atualizar perfil";
    try {
      const errorData = text ? JSON.parse(text) : null;
      errorMessage = errorData?.message || errorMessage;
    } catch {
      errorMessage = text || errorMessage;
    }
    throw new Error(errorMessage);
  }
  return await response.json();
}

export async function uploadAvatar(file: File): Promise<string> {
  const formData = new FormData();

  // IMPORTANTE: nome do campo deve ser 'avatar' para bater com FileInterceptor('avatar')
  formData.append("avatar", file);

  const response = await fetch(apiRoute + "/auth/profile/avatar", {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Falha ao enviar avatar");
  }

  const result = await response.json();
  // Agora o backend retorna { avatar: "/uploads/xxx" }
  return result.avatar;
}
