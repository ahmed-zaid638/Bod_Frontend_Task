"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUser } from "@/services/user/getUser";
import type { User } from "@/types/User";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { LoadingState } from "../ui/loading-spinner";

export default function UserPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getUser(Number(id))
      .then((data) => setUser(data))
      .catch(() => setError("Failed to fetch user"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="p-6 text-center text-muted-foreground">
        <LoadingState message="Loading user data..." />
      </div>
    );
  if (error)
    return <div className="p-6 text-center text-destructive">{error}</div>;
  if (!user)
    return (
      <div className="p-6 text-center text-muted-foreground">
        User not found
      </div>
    );

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <Button variant="outline" onClick={() => navigate("/users")}>
          Back to Users
        </Button>
      </div>

      {/* User Info Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Username</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{user.username}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{user.email}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Phone</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{user.phone || "-"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Website</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{user.website || "-"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Company</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{user.company?.name || "-"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Address</CardTitle>
            <CardDescription>Street, City, Zipcode</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              {user.address?.street}, {user.address?.city},{" "}
              {user.address?.zipcode}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
