"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useNotifications } from "@/context/notification-context";
import { UserForm } from "@/components/ui/user-form";
import type { User } from "@/types/User";
import { getUser } from "@/services/user/getUser";
import { updateUser } from "@/services/user/updateUser";

export default function EditUserPage() {
  const { id } = useParams(); // get user id from route
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotifications();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    getUser(Number(id))
      .then(setUser)
      .catch(() => showError("Error", "Failed to load user"));
  }, [id]);

  const handleUpdateUser = async (data: User) => {
    if (!id) return;
    setIsLoading(true);
    try {
      await updateUser(Number(id), data);
      showSuccess("User Updated", "The user has been successfully updated.");
      navigate("/users");
    } catch (err) {
      showError("Error", "Could not update user");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit User</h1>
      <p className="text-muted-foreground">Update user account information.</p>

      <UserForm
        user={user}
        onSubmit={handleUpdateUser}
        onCancel={() => navigate("/users")}
        isLoading={isLoading}
      />
    </div>
  );
}
