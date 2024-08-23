"use client";
import Header from "@/components/LandingPage/Header";
import ProfileSidebar from "@/components/ProfileSidebar/ProfileSidebar";
import UserProtected from "@/lib/UserProtected";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    // <UserProtected>
    <section className="flex flex-col min-h-screen">
      <section className="flex flex-grow">
        <ProfileSidebar />
        <div className="flex-1">{children}</div>
      </section>
    </section>
    // </UserProtected>
  );
};

export default Layout;
