import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function login(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const token = await userCredential.user.getIdToken();
  return { user: userCredential.user, token };
}
