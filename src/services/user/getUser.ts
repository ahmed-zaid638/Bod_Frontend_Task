import type { User } from "@/types/User";
import { api } from "../api";

export async function getUser(id: number) {
  return api<User>(`/users/${id}`);
}
