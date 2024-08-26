"use client";
import ProfileSidebar from "@/components/ProfileSidebar/ProfileSidebar";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <section className="flex flex-col min-h-screen">
      <section className="flex flex-grow">
        <ProfileSidebar />
        <div className="flex-1">{children}</div>
      </section>
    </section>
  );
};

export default Layout;
