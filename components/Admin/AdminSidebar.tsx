import Link from "next/link";
import {
  FaUsers as UsersIcon,
  FaFileAlt as FileTextIcon,
  FaFileMedical as FilePlusIcon,
  FaVideo as VideoIcon,
  FaImage as ImageIcon,
  FaQuestionCircle as HelpCircleIcon,
  FaTh as GridIcon,
  FaChartBar as BarChartIcon,
  FaShoppingCart as ShoppingCartIcon,
} from "react-icons/fa";
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSelector } from "react-redux";

const AdminSidebar = () => {
  const { user } = useSelector((state: any) => state.user);
  return (
    <aside className="fixed top-0 left-0 h-full w-80 bg-background text-foreground flex flex-col border-r px-4 py-4 overflow-y-auto">
      <div>
        <nav className="space-y-2">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user?.avatar?.url} alt="User Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="text-lg font-semibold">{user?.name}</div>
              <div className="text-sm text-muted-foreground">{user?.email}</div>
            </div>
          </div>
          <div className="text-sm font-medium uppercase text-muted-foreground">
            Data
          </div>
          <SidebarLink href="/dashboard/users" icon={<UsersIcon />}>
            Users
          </SidebarLink>
          <SidebarLink href="/dashboard/orders" icon={<FileTextIcon />}>
            Orders
          </SidebarLink>
          <SidebarLink href="/dashboard/allcourses" icon={<FileTextIcon />}>
            Courses
          </SidebarLink>

          <div className="text-sm font-medium uppercase text-muted-foreground">
            Content
          </div>
          <SidebarLink href="/dashboard/create-course" icon={<FilePlusIcon />}>
            Create Course
          </SidebarLink>
          <SidebarLink href="/courses" icon={<VideoIcon />}>
            Live Courses
          </SidebarLink>

          <div className="text-sm font-medium uppercase text-muted-foreground">
            Customization
          </div>
          <SidebarLink href="/dashboard/hero" icon={<ImageIcon />}>
            Hero
          </SidebarLink>
          <SidebarLink href="/dashboard/faq" icon={<HelpCircleIcon />}>
            FAQ
          </SidebarLink>
          <SidebarLink href="/dashboard/categories" icon={<GridIcon />}>
            Categories
          </SidebarLink>

          <div className="text-sm font-medium uppercase text-muted-foreground">
            Controllers
          </div>
          <SidebarLink href="/dashboard/manageteam" icon={<UsersIcon />}>
            Manage Team
          </SidebarLink>

          <div className="text-sm font-medium uppercase text-muted-foreground">
            Analytics
          </div>
          <SidebarLink
            href="/dashboard/courseAnalytics"
            icon={<BarChartIcon />}
          >
            Courses Analytics
          </SidebarLink>
          <SidebarLink
            href="/dashboard/orderAnalytics"
            icon={<ShoppingCartIcon />}
          >
            Orders Analytics
          </SidebarLink>
          <SidebarLink href="/dashboard/userAnalytics" icon={<UsersIcon />}>
            Users Analytics
          </SidebarLink>
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SidebarLink = ({ href, icon, children }: SidebarLinkProps) => (
  <Link
    href={href}
    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
    prefetch={false}
  >
    {React.cloneElement(icon as React.ReactElement, { size: 18 })}
    {children}
  </Link>
);
