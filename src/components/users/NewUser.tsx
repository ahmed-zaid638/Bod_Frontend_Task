"use client";

import { useNotifications } from "@/context/notification-context";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserForm } from "../ui/user-form";
import type { User } from "@/types/User";
import { createUser } from "@/services/user/createUser";

export default function NewUserPage() {
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateUser = async (data: User) => {
    setIsLoading(true);
    try {
      await createUser(data);
      showSuccess("User created!", "The new user was successfully added.");
      navigate("/users");
    } catch (err) {
      showError("Error", "Could not create user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Add New User</h1>
      <p className="text-muted-foreground">
        Create a new user account in the system.
      </p>

      <UserForm
        onSubmit={handleCreateUser}
        onCancel={() => navigate("/users")}
        isLoading={isLoading}
      />
    </div>
  );
}
