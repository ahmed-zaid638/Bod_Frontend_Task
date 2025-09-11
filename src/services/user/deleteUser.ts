import { api } from "../api";

export async function deleteUser(userId: number) {
  return api(`/users/${userId}`, {
    method: "DELETE",
  });
}
