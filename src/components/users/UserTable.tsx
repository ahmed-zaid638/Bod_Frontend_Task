"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getUsers } from "@/services/user/getUsers";
import type { User } from "@/types/User";
import { LoadingState } from "../ui/loading-spinner";
import { deleteUser } from "@/services/user/deleteUser";

const columns = [
  { key: "id" as const, label: "ID" },
  { key: "name" as const, label: "Name" },
  { key: "username" as const, label: "Username" },
  { key: "email" as const, label: "Email" },
  { key: "phone" as const, label: "Phone" },
  {
    key: "company" as const,
    label: "Company",
    render: (company: User["company"]) => company?.name || "-",
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    user: User | null;
  }>({
    open: false,
    user: null,
  });
  const navigate = useNavigate();
  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = (user: User) => {
    navigate(`/users/${user.id}/edit`);
  };
  const handleDelete = (user: User) => {
    setDeleteModal({ open: true, user });
  };

  const handleRowClick = (user: User) => {
    navigate(`/users/${user.id}`);
  };
  const confirmDelete = async () => {
    if (!deleteModal.user) return;

    try {
      await deleteUser(deleteModal.user.id);
      setUsers((prev) => prev.filter((u) => u.id !== deleteModal.user!.id));
      setDeleteModal({ open: false, user: null });
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  if (loading)
    return (
      <div className="p-4">
        <LoadingState message="Loading user data..." />
      </div>
    );
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex-col  sm:flex sm:flex-row justify-between items-start">
        <div>
          <h2 className="text-xl md:text-3xl font-bold text-foreground">
            User Management
          </h2>
          <p className="mt-2 text-muted-foreground ">
            Manage user accounts and their information.
          </p>
        </div>
        <Link to="/users/new" className="block w-full sm:w-auto mt-3 sm:mt-0">
          <Button className="cursor-pointer w-full " >
            <UserPlus className=" w-4 mr-2" />
            Add User
          </Button>
        </Link>
      </div>

      <DataTable
        data={users}
        columns={columns}
        title="Users"
        description="All registered users in the system"
        searchPlaceholder="Search users..."
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRowClick={handleRowClick}
        itemsPerPage={7}
      />

      <ConfirmationModal
        open={deleteModal.open}
        onOpenChange={(open) => setDeleteModal({ open, user: null })}
        title="Delete User"
        description={`Are you sure you want to delete ${deleteModal.user?.name}? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        variant="destructive"
      />
    </div>
  );
}
