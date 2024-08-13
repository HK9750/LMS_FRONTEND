import { FaBell } from "react-icons/fa";
import { ModeToggle } from "@/components/ModeToggle/ModeToggle";

const AdminHeader = () => {
  return (
    <div className="flex justify-end items-center px-4 py-2 bg-background gap-8">
      <FaBell className="text-xl text-foreground-muted hover:text-foreground cursor-pointer" />
      <ModeToggle />
    </div>
  );
};

export default AdminHeader;
