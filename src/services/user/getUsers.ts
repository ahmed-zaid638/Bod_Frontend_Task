import type { User } from "@/types/User";
import { api } from "../api";

export async function getUsers() {
  return api<User[]>("/users");
}
