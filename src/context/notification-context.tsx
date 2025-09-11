"use client";

import type React from "react";
import { createContext, useContext } from "react";
import { useToast } from "@/hooks/use-toast";

interface NotificationContextType {
  showSuccess: (title: string, description?: string) => void;
  showError: (title: string, description?: string) => void;
  showInfo: (title: string, description?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toast } = useToast();

  const showSuccess = (title: string, description?: string) => {
    toast({
      variant: "success",
      title,
      description,
    });
  };

  const showError = (title: string, description?: string) => {
    toast({
      variant: "destructive",
      title,
      description,
    });
  };

  const showInfo = (title: string, description?: string) => {
    toast({
      variant: "default",
      title,
      description,
    });
  };

  return (
    <NotificationContext.Provider value={{ showSuccess, showError, showInfo }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
}
