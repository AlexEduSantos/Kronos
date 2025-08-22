import { apiRoute } from "@/_lib/utils";

export async function getAllSchedules() {
  const response = await fetch(apiRoute + "/schedule", {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch schedules");
  }
  return await response.json();
}
