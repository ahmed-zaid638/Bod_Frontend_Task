import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { storage } from "@/utils/storage";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNotifications } from "@/context/NotificationContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotifications();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCred.user.getIdToken();

      storage.saveToken(token);
      storage.saveUser({
        uid: userCred.user.uid,
        email: userCred.user.email,
        displayName: userCred.user.displayName,
      });

      showSuccess("Login successful", `Welcome back, ${userCred.user.email}`);

      navigate("/");
    } catch (err: any) {
      const message =
        err?.code === "auth/user-not-found"
          ? "No account found with this email."
          : err?.code === "auth/wrong-password"
          ? "Incorrect password."
          : err?.message || "Login failed.";

      showError("Login failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-8">
      <div className="max-w-md w-full p-6 border rounded-md shadow-md space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">Login</h2>
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          onClick={handleLogin}
          disabled={loading}
          variant="outline"
          size="sm"
          className="text-white cursor-pointer w-full bg-black "
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </div>
    </div>
  );
}
