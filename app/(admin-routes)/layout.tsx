"use client";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import React, { useState, useEffect } from "react";
import AdminProtected from "@/lib/AdminProtected";
import Loader from "@/components/Loader/Loader";
import AdminHeader from "@/components/Admin/AdminHeader";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <section className="h-screen w-full flex justify-center items-center">
        <Loader />
      </section>
    );
  }

  return (
    <AdminProtected>
      <section className="flex flex-col min-h-screen">
        <section className="flex flex-grow">
          <AdminSidebar />
          <div className="flex-1 ml-80 overflow-y-auto">
            <AdminHeader />
            {children}
          </div>
        </section>
      </section>
    </AdminProtected>
  );
};

export default Layout;
