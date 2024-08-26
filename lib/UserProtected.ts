"use client";
import { FC, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import UseAuth from "./UseAuth";

interface UserProtectedProps {
  children: ReactNode;
}

const UserProtected: FC<UserProtectedProps> = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = UseAuth();

  useEffect(() => {
    // Redirect to login if not authenticated and loading is complete
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  return isAuthenticated ? (children as JSX.Element) : null;
};

export default UserProtected;
