// lib/api.ts
export const API_URL = "http://localhost:5000";

// Ambil data users
export async function fetchUsers() {
  const res = await fetch(`${API_URL}/users`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Gagal mengambil data users");
  }
  return res.json();
}


export async function fetchRisks() {
  const res = await fetch(`${API_URL}/risks`);
  if (!res.ok) throw new Error("Gagal mengambil data risiko");
  return res.json();
}

export async function createRisk(data: any) {
  const res = await fetch(`${API_URL}/risks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Gagal menambah risiko");
  return res.json();
}

export async function updateRisk(id: number, data: any) {
  const res = await fetch(`${API_URL}/risks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Gagal mengupdate risiko");
  return res.json();
}

export async function deleteRisk(id: number) {
  const res = await fetch(`${API_URL}/risks/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Gagal menghapus risiko");
  return res.json();
}
