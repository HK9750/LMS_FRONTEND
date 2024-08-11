import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";

interface UserProtectedProps {
  children: ReactNode;
}

const UserProtected: FC<UserProtectedProps> = ({ children }) => {
  const { user } = useSelector((state: any) => state.user);

  return user ? children : redirect("/login");
};
export default UserProtected;
