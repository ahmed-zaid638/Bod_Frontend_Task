import { Home, Users, UserPlus, Database, Settings } from "lucide-react";

export const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Users", href: "/users", icon: Users },
  { name: "Add User", href: "/users/new", icon: UserPlus },
  { name: "Data", href: "/data", icon: Database },
  { name: "Settings", href: "/settings", icon: Settings },
];
