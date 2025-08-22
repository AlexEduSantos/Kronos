import { apiRoute } from "@/_lib/utils";
import { NextRequest } from "next/server";

export async function login(data: any) {
  const response = await fetch(apiRoute + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Falha ao fazer login");
  }
  return await response.json();
}

export async function register(data: any) {
  const response = await fetch(apiRoute + "/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.username,
      email: data.email,
      password: data.password,
    }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Falha ao registrar");
  }
  return await response.json();
}
