import Link from "next/link";

const AdminSidebar = () => {
  return (
    <aside className="flex flex-col h-screen bg-background text-foreground">
      <div className="flex flex-col justify-between h-full border-r px-6 py-8">
        <div>
          <div className="mb-8">
            <Link href="/admin/dashboard" className="text-xl font-semibold">
              - Admin
            </Link>
          </div>
          <nav className="space-y-4">
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
            <SidebarLink href="/admin/create-course" icon={<FilePlusIcon />}>
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
  icon: any;
  children: any;
}

const SidebarLink = ({ href, icon, children }: SidebarLinkProps) => (
  <Link
    href={href}
    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
    prefetch={false}
  >
    {icon}
    {children}
  </Link>
);

const UsersIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const FileTextIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 22h16V2H4v20zM8 2v20M8 6h8M8 10h8M8 14h8M8 18h8" />
  </svg>
);

const FilePlusIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 8v8M8 12h8M4 22h16V2H4v20zM8 2v20" />
  </svg>
);

const VideoIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M23 7l-7 5 7 5V7z" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

const ImageIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M21 15l-5-5L5 21" />
  </svg>
);

const HelpCircleIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.82 0c0 1.66-1.5 3-3 3h-1v2" />
    <line x1="12" y1="17" x2="12" y2="17" />
  </svg>
);

const GridIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const BarChartIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
  </svg>
);

const ShoppingCartIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l1.68 8.39a1 1 0 0 0 1 0.61h12.72a1 1 0 0 0 1-.78l3.22-12.24a1 1 0 0 0-1-.61H6" />
  </svg>
);

const SettingsIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51v.1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-.1a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1h-.1a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h.1a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v.1a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1h.1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-.1a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
