"use client";

// Mock SessionProvider that does nothing
export default function SessionProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}