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
    // Simulate loading delay or any initialization logic
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Adjust the delay as needed

    // Clean up the timer on unmount
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
          <div className="flex-1">
            <AdminHeader />
            {children}
          </div>
        </section>
      </section>
    </AdminProtected>
  );
};

export default Layout;
