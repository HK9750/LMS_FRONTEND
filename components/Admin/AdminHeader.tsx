import { FaBell } from "react-icons/fa";
import { ModeToggle } from "@/components/ModeToggle/ModeToggle";
import Link from "next/link";
import { useGetNotificationsQuery } from "@/redux/features/notification/notificationapi";

const AdminHeader = () => {
  const { data, isLoading } = useGetNotificationsQuery({});
  console.log(data);
  return (
    <div className="flex justify-center items-center px-4 py-3 bg-background gap-8">
      <Link
        href="/"
        className="text-lg text-foreground hover:text-muted-foreground"
      >
        Home
      </Link>
      <Link
        href="/profile"
        className="text-lg text-foreground hover:text-muted-foreground"
      >
        Profile
      </Link>
      <FaBell className="text-xl text-foreground-muted hover:text-foreground cursor-pointer" />
      <ModeToggle />
    </div>
  );
};

export default AdminHeader;
