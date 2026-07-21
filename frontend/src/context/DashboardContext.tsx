"use client";
import { createContext, useContext } from "react";

export interface User {
  id: number;
  fullName: string;
  email: string;
}

interface DashboardContextType {
	user: User | null;
}

interface DashboardProviderProps {
  user: User | null;
  children: React.ReactNode;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({
  user,
  children,
}: DashboardProviderProps) {
  return (
    <DashboardContext.Provider value={{ user }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error(
      "useDashboard must be used inside DashboardProvider"
    );
  }

  return context;
}