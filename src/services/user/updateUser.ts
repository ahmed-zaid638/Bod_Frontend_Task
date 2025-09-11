import type { User } from "@/types/User";
import { api } from "../api";

export async function updateUser(id: number, user: User) {
  return api<User>(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(user),
  });
}
