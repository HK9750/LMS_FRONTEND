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
  FaCog as SettingsIcon,
} from "react-icons/fa";
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSelector } from "react-redux";

const AdminSidebar = () => {
  const { user } = useSelector((state: any) => state.user);
  return (
    <aside className="flex flex-col bg-background text-foreground">
      <div className="flex flex-col justify-between h-full border-r px-4 py-4">
        <div>
          <nav className="space-y-2">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.avatar?.url} alt="User Avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="text-lg font-semibold">{user.name}</div>
                <div className="text-sm text-muted-foreground">
                  {user.email}
                </div>
              </div>
            </div>
            <div className="text-sm font-medium uppercase text-muted-foreground">
              Data
            </div>
            <SidebarLink href="/admin/users" icon={<UsersIcon />}>
              Users
            </SidebarLink>
            <SidebarLink href="/admin/invoices" icon={<FileTextIcon />}>
              Invoices
            </SidebarLink>

            <div className="text-sm font-medium uppercase text-muted-foreground">
              Content
            </div>
            <SidebarLink
              href="/dashboard/create-course"
              icon={<FilePlusIcon />}
            >
              Create Course
            </SidebarLink>
            <SidebarLink href="/admin/live-courses" icon={<VideoIcon />}>
              Live Courses
            </SidebarLink>

            <div className="text-sm font-medium uppercase text-muted-foreground">
              Customization
            </div>
            <SidebarLink href="/admin/hero" icon={<ImageIcon />}>
              Hero
            </SidebarLink>
            <SidebarLink href="/admin/faq" icon={<HelpCircleIcon />}>
              FAQ
            </SidebarLink>
            <SidebarLink href="/admin/categories" icon={<GridIcon />}>
              Categories
            </SidebarLink>

            <div className="text-sm font-medium uppercase text-muted-foreground">
              Controllers
            </div>
            <SidebarLink href="/admin/manage-team" icon={<UsersIcon />}>
              Manage Team
            </SidebarLink>

            <div className="text-sm font-medium uppercase text-muted-foreground">
              Analytics
            </div>
            <SidebarLink href="/admin/course-analytics" icon={<BarChartIcon />}>
              Courses Analytics
            </SidebarLink>
            <SidebarLink
              href="/admin/orders-analytics"
              icon={<ShoppingCartIcon />}
            >
              Orders Analytics
            </SidebarLink>
            <SidebarLink href="/admin/users-analytics" icon={<UsersIcon />}>
              Users Analytics
            </SidebarLink>
          </nav>
        </div>
        <div className="mt-8">
          <SidebarLink href="/admin/settings" icon={<SettingsIcon />}>
            Settings
          </SidebarLink>
        </div>
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
