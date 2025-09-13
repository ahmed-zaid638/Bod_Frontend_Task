import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";

interface AuthContextType {
  user: User | null;
  token: string | null;
  loginUser: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const idToken = await firebaseUser.getIdToken();
        setToken(idToken);
      } else {
        setUser(null);
        setToken(null);
      }
    });
    return unsubscribe;
  }, [auth]);

  const loginUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await user.getIdToken();
    setUser(user);
    setToken(idToken);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
