import ProfileSidebar from "@/components/ProfileSidebar/ProfileSidebar";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <section>
      <ProfileSidebar />
    </section>
  );
};

export default Layout;
