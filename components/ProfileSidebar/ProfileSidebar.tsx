"use client";
import Link from "next/link";
import {
  FaUser as UserIcon,
  FaLock as LockIcon,
  FaBookOpen as BookOpenIcon,
  FaSignOutAlt as LogOutIcon,
} from "react-icons/fa";
import React from "react";
import { MdDashboard as DashboardIcon } from "react-icons/md";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useLogoutMutation } from "@/redux/features/auth/authApi";

const ProfileSidebar = () => {
  const { user } = useSelector((state: any) => state.user);
  const isAdmin = user?.role === "admin";
  const router = useRouter();
  const { toast } = useToast();

  // Use mutation hook for logout
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      toast({
        title: "Logged Out",
        description: "You have successfully logged out.",
      });
      router.push("/login");
    } catch (err) {
      toast({
        title: "Logout Failed",
        description: "There was an issue logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex overflow-hidden bg-background">
      <aside className="flex flex-col items-start justify-between border-r bg-background px-6 py-8 shadow-sm">
        <div className="flex flex-col items-start gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user?.avatar?.url || ""} alt="User Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="text-lg font-semibold">{user?.name}</div>
              <div className="text-sm text-muted-foreground">{user?.email}</div>
            </div>
          </div>
          <nav className="space-y-2">
            <SidebarLink href="/profile" icon={<UserIcon />}>
              Profile
            </SidebarLink>
            {isAdmin && (
              <SidebarLink href="/dashboard" icon={<DashboardIcon />}>
                Dashboard
              </SidebarLink>
            )}
            <SidebarLink href="/profile/changepassword" icon={<LockIcon />}>
              Change Password
            </SidebarLink>
            <SidebarLink
              href="/profile/enrolledcourses"
              icon={<BookOpenIcon />}
            >
              Enrolled Courses
            </SidebarLink>
          </nav>
        </div>
        <Button
          variant="ghost"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
          onClick={handleLogout}
          disabled={isLoading}
        >
          <LogOutIcon className="h-5 w-5" />
          Logout
        </Button>
      </aside>
    </div>
  );
};

export default ProfileSidebar;

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
