import Header from "@/components/LandingPage/Header";
import React from "react";
import UserProtected from "@/lib/UserProtected";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <UserProtected>
      <section>
        <Header />
        {children}
      </section>
      //{" "}
    </UserProtected>
  );
};

export default Layout;
