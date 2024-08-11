import Header from "@/components/LandingPage/Header";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      <section className="flex flex-grow">
        <AdminSidebar />
        <div className="flex-1">{children}</div>
      </section>
    </section>
  );
};

export default Layout;
