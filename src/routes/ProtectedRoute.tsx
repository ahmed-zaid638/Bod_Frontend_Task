import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute: React.FC = () => {
  const { token } = useAuth();
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};
