"use client";
import { useEffect, useState, FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

interface AdminProtectedProps {
  children: ReactNode;
}

const AdminProtected: FC<AdminProtectedProps> = ({ children }) => {
  const { user } = useSelector((state: any) => state.user);
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // Adding a delay to allow time for fetching the user's role
    const timer = setTimeout(() => {
      if (user && user.role === "admin") {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
        router.push("/");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [user, router]);

  if (isAuthorized === null) {
    return null;
  }

  return children as JSX.Element;
};

export default AdminProtected;
