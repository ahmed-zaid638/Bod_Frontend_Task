import React, { createContext, useContext } from "react";
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
      title,
      description,
      duration: 3000,
      className:
        "border-green-500 bg-green-50 text-green-900 dark:bg-green-900 dark:text-green-50",
    });
  };

  const showError = (title: string, description?: string) => {
    toast({
      title,
      description,
      duration: 5000,
      className:
        "border-red-500 bg-red-50 text-red-900 dark:bg-red-900 dark:text-red-50",
    });
  };

  const showInfo = (title: string, description?: string) => {
    toast({
      title,
      description,
      duration: 4000,
      className:
        "border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-900 dark:text-blue-50",
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
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
}
