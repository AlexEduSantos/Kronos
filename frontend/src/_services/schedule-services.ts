import { apiRoute } from "@/_lib/utils";

// ======================
// SCHEDULE
// ======================
export async function getAllSchedules() {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Token de acesso ausente.");
  }

  try {
    const response = await fetch(apiRoute + "/schedule/my-schedules", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Sessão expirada. Por favor, faça login novamente.");
      }
      if (response.status === 404) {
        throw new Error("Nenhum cronograma encontrado.");
      }
      throw new Error("Falha ao buscar cronogramas do usuário.");
    }
    return await response.json();
  } catch (error) {
    throw new Error("Falha ao buscar cronogramas do usuário.");
  }
}

export async function getScheduleById(id: string) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("Token de acesso ausente.");
  }

  const response = await fetch(`${apiRoute}/schedule/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Falha ao buscar agendamento.");
  }

  return await response.json();
}

export async function createSchedule(data: any) {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Token de acesso ausente.");

  const response = await fetch(`${apiRoute}/schedule`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Falha ao criar agendamento.");
  return await response.json();
}

export async function updateSchedule(scheduleId: string, data: any) {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Token de acesso ausente.");

  const response = await fetch(`${apiRoute}/schedule/${scheduleId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Falha ao atualizar agendamento.");
  return await response.json();
}

export async function deleteSchedule(scheduleId: string) {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Token de acesso ausente.");

  const response = await fetch(`${apiRoute}/schedule/${scheduleId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error("Falha ao deletar agendamento.");
}

// ======================
// DAY
// ======================
export async function getDayById(dayId: string) {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Token de acesso ausente.");

  const response = await fetch(`${apiRoute}/schedule/days/${dayId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error("Falha ao buscar dia.");
  return await response.json();
}

export async function createDay(scheduleId: string, data: any) {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Token de acesso ausente.");

  const response = await fetch(`${apiRoute}/schedule/${scheduleId}/days`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Falha ao criar dia.");
  return await response.json();
}

export async function updateDay(dayId: string, data: any) {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Token de acesso ausente.");

  const response = await fetch(`${apiRoute}/schedule/days/${dayId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Falha ao atualizar dia.");
  return await response.json();
}

export async function deleteDay(dayId: string) {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Token de acesso ausente.");

  const response = await fetch(`${apiRoute}/schedule/days/${dayId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error("Falha ao deletar dia.");
}

// ======================
// TOPIC
// ======================
export async function getTopicById(topicId: string) {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Token de acesso ausente.");

  const response = await fetch(`${apiRoute}/schedule/topics/${topicId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error("Falha ao buscar tópico.");
  return await response.json();
}

export async function createTopic(dayId: string, data: any) {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Token de acesso ausente.");

  const response = await fetch(`${apiRoute}/schedule/days/${dayId}/topics`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Falha ao criar tópico.");
  return await response.json();
}

export async function updateTopic(topicId: string, data: any) {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Token de acesso ausente.");

  const response = await fetch(`${apiRoute}/schedule/topics/${topicId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Falha ao atualizar tópico.");
  return await response.json();
}

export async function toggleStatusTopic(topicId: string) {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Token de acesso ausente.");

  const response = await fetch(
    `${apiRoute}/schedule/topics/${topicId}/status`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ topicId: topicId }),
    }
  );
}

export async function deleteTopic(topicId: string) {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Token de acesso ausente.");

  const response = await fetch(`${apiRoute}/schedule/topics/${topicId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error("Falha ao deletar tópico.");
}
