import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatsCard } from "@/components/ui/stats-card";
import { Activity, Database, UserPlus, Users } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "10",
      description: "Active users in system",
      icon: <Users className="h-4 w-4" />,
      trend: { value: 12, label: "from last month", isPositive: true },
    },
    {
      title: "New Users",
      value: "+2",
      description: "Added this week",
      icon: <UserPlus className="h-4 w-4" />,
      trend: { value: 5, label: "from last week", isPositive: true },
    },
    {
      title: "Data Entries",
      value: "100",
      description: "Total records",
      icon: <Database className="h-4 w-4" />,
    },
    {
      title: "Activity",
      value: "24",
      description: "Actions today",
      icon: <Activity className="h-4 w-4" />,
      trend: { value: 8, label: "from yesterday", isPositive: true },
    },
  ];

  const quickActions = [
    {
      title: "Manage Users",
      description: "View, edit, and manage user accounts",
      icon: <Users className="h-8 w-8 text-primary" />,
    },
    {
      title: "Add New User",
      description: "Create a new user account",
      icon: <UserPlus className="h-8 w-8 text-primary" />,
    },
    {
      title: "View Data",
      description: "Browse and search all data entries",
      icon: <Database className="h-8 w-8 text-primary" />,
    },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <StatsCard key={item.title} {...item} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks you can perform from the dashboard
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => (
            <div
              key={action.title}
              className="flex items-center space-x-4 rounded-lg border p-4 hover:bg-muted transition"
            >
              {action.icon}
              <div>
                <h3 className="font-medium">{action.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {action.description}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
