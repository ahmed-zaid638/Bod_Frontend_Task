import { api } from "../api";
import type { Post } from "@/types/Post";

export async function getData() {
  return api<Post[]>("/posts");
}
