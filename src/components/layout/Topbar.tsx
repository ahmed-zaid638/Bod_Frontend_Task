import { Menu, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/context/NotificationContext";

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const { logout } = useAuth();
  const { showSuccess } = useNotifications();
  const navigate = useNavigate();

  const handleLogout = async () => {
    showSuccess(
      "Logged out",
      "You will be redirected to the login page in a few seconds…"
    );
    setTimeout(async () => {
      await logout();
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="ml-0 lg:ml-64 sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-border bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <Button
        variant="ghost"
        size="sm"
        className="lg:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1 items-center">
          <h2 className="text-lg font-semibold text-foreground hidden sm:block">
            Welcome to your Dashboard
          </h2>
        </div>

        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/profile")}
            className="cursor-pointer"
          >
            Profile
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-1 cursor-pointer bg-red-600 text-white hover:bg-red-700"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
