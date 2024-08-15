"use client";
import { FC, ReactNode } from "react";
import { redirect } from "next/navigation";
import UseAuth from "./UseAuth";

interface UserProtectedProps {
  children: ReactNode;
}

const UserProtected: FC<UserProtectedProps> = ({ children }) => {
  const user = UseAuth();

  return user ? (children as JSX.Element) : redirect("/login");
};
export default UserProtected;
