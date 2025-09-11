"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { LoadingState } from "@/components/ui/loading-spinner";
import { ErrorState } from "@/components/ui/error-state";
import type { Post } from "@/types/Post";
import { getData } from "@/services/data/getData";

const columns = [
  {
    key: "id" as keyof Post,
    label: "ID",
  },
  {
    key: "userId" as keyof Post,
    label: "User ID",
  },
  {
    key: "title" as keyof Post,
    label: "Title",
    render: (value: string) => (
      <div className="max-w-xs truncate" title={value}>
        {value}
      </div>
    ),
  },
  {
    key: "body" as keyof Post,
    label: "Content",
    render: (value: string) => (
      <div className="max-w-md truncate" title={value}>
        {value}
      </div>
    ),
  },
];

export default function DataPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getData();
      setPosts(data);
    } catch (err: any) {
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground text-balance">
          Data Management
        </h2>
        <p className="mt-2 text-muted-foreground text-pretty">
          Browse and manage all data entries from the JSONPlaceholder API.
        </p>
      </div>

      {loading ? (
        <LoadingState message="Loading posts..." />
      ) : error ? (
        <ErrorState
          title="Failed to load data"
          message={error}
          onRetry={fetchPosts}
        />
      ) : (
        <DataTable
          data={posts}
          columns={columns}
          title="Posts"
          description="All posts from the JSONPlaceholder API"
          searchPlaceholder="Search posts..."
          itemsPerPage={9}
        />
      )}
    </div>
  );
}
