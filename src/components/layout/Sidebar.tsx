import { Link, useLocation } from "react-router-dom";
import { Home, Users, UserPlus, Database, Settings } from "lucide-react";
import { cn } from "@/libs/utils";

export default function Sidebar({ className = "" }: { className?: string }) {
  const { pathname } = useLocation();
  const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Users", href: "/users", icon: Users },
    { name: "Add User", href: "/users/new", icon: UserPlus },
    { name: "Data", href: "/data", icon: Database },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside
      className={cn(
        " w-64 min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-lg",
        className
      )}
    >
      <div className="p-4 mt-5 border-b border-gray-700">
        <h2 className="text-xl font-bold tracking-wide text-blue-400">
          Mini Dashboard
        </h2>
      </div>

      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200",
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-300 hover:bg-blue-500 hover:text-white"
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-5 w-5 transition-colors duration-200",
                      isActive
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    )}
                  />
                  <div
                    className={cn(
                      isActive
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-300 hover:bg-blue-500 hover:text-white"
                    )}
                  >
                    {item.name}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
