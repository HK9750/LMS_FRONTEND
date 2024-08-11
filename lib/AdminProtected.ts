import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";

interface AdminProtectedProps {
  children: ReactNode;
}

const AdminProtected: FC<AdminProtectedProps> = ({ children }) => {
  const { user } = useSelector((state: any) => state.user);

  const isAdmin = user && user.role === "admin";
  return isAdmin ? children : redirect("/");
};
export default AdminProtected;
