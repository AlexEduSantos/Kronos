export async function getAllSchedules() {
  const response = await fetch("http://localhost:3001/schedule/all", {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch schedules");
  }
  return await response.json();
}
