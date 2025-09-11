import type { User } from "@/types/User";
import { api } from "../api";

export async function createUser(user: User) {
  return api<User>("/users", {
    method: "POST",
    body: JSON.stringify(user),
  });
}
