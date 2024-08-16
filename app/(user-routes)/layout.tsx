import Header from "@/components/LandingPage/Header";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <section>
      <Header />
      {children}
    </section>
  );
};

export default Layout;
